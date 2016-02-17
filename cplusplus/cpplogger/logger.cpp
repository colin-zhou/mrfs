#include "logger.h"
#include "logger_impl.h"

#define __100MB 104857600

const char *log_mod_name[LOG_MOD_MAX] = {
        "exchange",
        "tunnel",
        "quote",
        "signal",
        "oss",
        "rss"
};

const char *log_pri_name[LOG_PRI_MAX] = {
        "CRITICAL",
        "ERROR",
        "WARN",
        "INFO",
        "DEBUG",
        "TRACE"
};

my_log *my_log::_log_inst = NULL;

/* get the name of this process*/
int my_log::get_proc(void)
{
        _log_pid = getpid();
        char buff[128];
        FILE *fp;
        snprintf(buff, sizeof(buff), "/proc/%d/status", _log_pid);
        fp = fopen(buff, "r");
        if(fp == NULL) {
                return 1;
        }
        fgets(buff, sizeof(buff), fp);
        char *p = strstr(buff, "Name:");
        p += strlen("Name:");
        while(*p == '\t' || *p == ' ')    // filter front space or tab
        {
                p++;
        }
        char *q = _log_proc;
        while(*p != '\n' || *p != '\0') { // end of a string
                *q = *p++;
                q++;
        }
        *q = '\0';
        return 0;
}

my_log *my_log::instance(const char *file, int size, int num)
{
        int idx;
        if(_log_inst != NULL) {
                return _log_inst;
        }
        my_log *local_log = new my_log();
        if(local_log == NULL) {
                return NULL;
        }
        if (file) {
                local_log->set_log_file(file);
        }
        local_log->get_proc();
        local_log->_entry_size = (size == 0)? LOG_ENTRY_SIZE: size;
        local_log->_entries_num = (num == 0)? LOG_ENTRY_NUM: num;
        local_log->get_log_file();
        log_entry_t *log_entries = new log_entry_t[local_log->_entries_num];
        if(log_entries == NULL) {
                syslog(LOG_ERR, "No enough memeory for program %s(%d)\n",
                        local_log->_log_proc, local_log->_log_pid);
                goto ERROR;
        }
        local_log->_log_entries = log_entries;
        for(idx = 0; idx < local_log->_entries_num; idx++) {
                log_entries[idx].buff = new char[local_log->_entry_size];
                if(log_entries[idx].buff == NULL) {
                        syslog(LOG_ERR, "No enough memeory for program %s(%d)\n",
                                local_log->_log_proc, local_log->_log_pid);
                        goto ERROR;
                }
        }
        local_log->_next = local_log->_written = log_entries;
        if(pthread_mutex_init(&local_log->_log_mutex, NULL)) {
                syslog(LOG_ERR,
                        "Failed to initialize the mutex for program %s(%d)\n",
                        local_log->_log_proc, local_log->_log_pid);
                goto ERROR;
        }
        idx = pthread_create(&local_log->_log_thd_id, NULL, my_log::_log_worker,
                             local_log);
        if(idx != 0) {
                syslog(LOG_ERR, "Failed to create log thread for program %s(%d)\n",
                        local_log->_log_proc, local_log->_log_pid);
                goto ERROR;
        }
        _log_inst = local_log;
        return _log_inst;
ERROR:
        if(log_entries != NULL) {
                for(idx = 0; idx < _log_inst->_entries_num; idx++) {
                        delete log_entries[idx].buff;
                        log_entries[idx].buff = NULL;
                }
                delete log_entries;
                log_entries = NULL;
        }
        return NULL;
}

int my_log::set_log_file(const char *file, const char *path)
{
        int len;
        if(path == NULL) {
                bzero(_log_path, sizeof(_log_path));
                if(getcwd(_log_path, sizeof(_log_path)) == NULL) {
                        return 1;
                }
        } else {
                strncpy(_log_path, path, sizeof(_log_path));
        }
        len = strlen(_log_path);
        snprintf(_log_path + len, sizeof(_log_path)-len, "/%s.log", file);
        FILE *log_file = fopen(_log_path, "a+");
        if(log_file == NULL) {
                return 1;
        }
        fseek(log_file, 0, SEEK_END);
        if(_log_file != NULL) {
                fclose(_log_file);
        }
        _log_file = log_file;
        return 0;
}

FILE *my_log::get_log_file(void)
{
        if(_log_file == NULL) {
                if(set_log_file(_log_proc, NULL) != 0) {
                        return NULL;
                }
        }
        return _log_file;
}

void my_log::split_log(void)
{
        struct stat st;
        char new_file[256];
        char buf[32];
        struct timespec ts;
        bzero(&st, sizeof(struct stat));
        if(fstat(fileno(_log_file), &st) != 0) {
                return;
        }
        clock_gettime(CLOCK_REALTIME, &ts);
        strftime(buf, sizeof(buf), "%Y%m%H%M%S", localtime(&ts.tv_sec));
        snprintf(new_file, sizeof(new_file), "%s-%s", _log_path, buf);
        if(st.st_size >= __100MB) {
                fclose(_log_file);
                rename(_log_path, new_file);
                _log_file = fopen(_log_path, "a+");
                if(_log_file == NULL) {
                        syslog(LOG_ERR, "failed to open log file %s\n", _log_path);
                }
        }
}

void *my_log::_log_worker(void *arg)
{
        my_log *log_p = reinterpret_cast<my_log *>(arg);
        char tm_buff[32];
        register int count = 0;
        if(log_p == NULL || log_p->_log_entries == NULL) {
                return NULL;
        }
        log_p->_state = LOG_STATE_RUN;
        while(1) {
                if(log_p->_state == LOG_STATE_LASTCHANCE) {
                        break;
                }
                if(log_p->is_empty()) {
                        usleep(100);
                        continue;
                }
                while((log_p->_written != log_p->_next) && (count++ < LOG_ENTRY_MAX)) {
                        strftime(tm_buff, 32, "%Y-%m-%d %T",
                                localtime(&log_p->_written->ts.tv_sec));
                        fprintf(log_p->_log_file, "%s.%09lu %s/%d %s %s %s\n",
                                tm_buff,
                                log_p->_written->ts.tv_nsec,
                                log_p->_log_proc, log_p->_log_pid,
                                log_mod_name[log_p->_written->mod_id],
                                log_pri_name[log_p->_written->priority],
                                log_p->_written->buff);
                        if(++log_p->_written >= log_p->_log_entries + log_p->_entries_num){
                                log_p->_written = log_p->_log_entries;
                        }
                }
                fflush(log_p->_log_file); /* flush the data into disk. */
                count = 0;
                log_p->split_log();
                usleep(100);
        }
        /* last chance to write the log into syslog. */
        while(log_p->_written != log_p->_next) {
                strftime(tm_buff, 32, "%Y-%m-%d %T",
                        localtime(&log_p->_written->ts.tv_sec));
                fprintf(log_p->_log_file, "%s.%lu %s/%d %s %s %s\n",
                        tm_buff,
                        log_p->_written->ts.tv_nsec,
                        log_p->_log_proc, log_p->_log_pid,
                        log_mod_name[log_p->_written->mod_id],
                        log_pri_name[log_p->_written->priority],
                        log_p->_written->buff);
                if(++log_p->_written >= log_p->_log_entries + log_p->_entries_num) {
                        log_p->_written = log_p->_log_entries;
                }
        }
        fflush(log_p->_log_file);
        log_p->_state = LOG_STATE_STOPPED;
        log_p->destroy();
        return NULL;
}

void my_log::destroy(void)
{
        int idx;
        // pthread_join(_log_thd_id, NULL);
        if(_log_entries != NULL) {
                for(idx = 0; idx < _entries_num; idx++) {
                        if(_log_entries[idx].buff != NULL) {
                                delete _log_entries[idx].buff;
                                _log_entries[idx].buff = NULL;
                        }
                }
                delete _log_entries;
                _log_entries = NULL;
        }
        if(_log_file != NULL) {
                fclose(_log_file);
        }
        pthread_mutex_destroy(&_log_mutex);
        delete _log_inst;
}

int my_log::log(int mod_id, int priority, const char *format, va_list list)
{
        struct timespec ts;
        log_entry_t *entry;
        if(priority > _level) {
                return 0;
        }
        clock_gettime(CLOCK_REALTIME, &ts);
        if(_state >= LOG_STATE_LASTCHANCE) {
                return LOG_ERR_HAS_STOPPED;
        }
        if(is_full()) {
                return LOG_ERR_CACHEFULL;
        }
        pthread_mutex_lock(&_log_mutex);
        entry = _next;
        vsnprintf(entry->buff, _entry_size, format, list);
        entry->ts.tv_sec = ts.tv_sec;
        entry->ts.tv_nsec = ts.tv_nsec;
        entry->mod_id = mod_id;
        entry->priority = priority;
        entry->seq_no++;
        if(++_next >= _log_entries + _entries_num) {
                _next = _log_entries;
        }
        pthread_mutex_unlock(&_log_mutex);
        return LOG_SUCCESS;
}
int my_log::shutdown(void)
{
        _state = LOG_STATE_LASTCHANCE;
        return 0;
}

void log_impl(int pri, const char *format, ...)
{
        va_list va;
        va_start(va, format);
        my_log::instance(NULL)->log(LOG_MOD_OSS, pri, format, va);
        va_end(va);
}
void
set_log_level(int level)
{
        my_log::instance(NULL)->set_log_level(level);
}
