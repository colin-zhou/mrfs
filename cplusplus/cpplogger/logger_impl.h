#ifndef _LOG_IMPL_H_
#define _LOG_IMPL_H_
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>
#include <stdarg.h>
#include <sys/types.h>
#include <sys/time.h>
#include <sys/stat.h>
#include <string.h>
#include <syslog.h>

#define LOG_ENTRY_MAX 10000
#define LOG_ENTRY_SIZE 1024
#define LOG_ENTRY_NUM LOG_ENTRY_MAX
#define MAX_PATH 256

typedef struct _log_entry{
        unsigned long seq_no;
        struct timespec ts;
        unsigned char mod_id;
        unsigned char priority;
        char *buff;
} log_entry_t;

/**
 * [log_seq_no] [Date & Time] [prog_name]/(proc_id) [module_name] [level] [msg]
 */
class my_log
{
public:
        static my_log *instance(const char *file, int size = 0, int num = 0);
        int log(int mod_id, int priority, const char *format, ...);
        int log(int mod_id, int priority, const char *format, va_list list);

        int shutdown(void);
        int set_log_entry_size(int size) {return 0;}
        int set_log_entries_num(int num) {return 0;}
        int set_log_file(const char *file, const char *path = NULL);
        int set_log_level(int level)
        {
                return _level = level;
        }
        int get_log_level(void) const
        {
                return _level;
        }
        FILE *get_log_file(void);
protected:
        int is_empty(void) const
        {
                if(_next == _written) {
                        return 1;
                }
                return 0;
        }
        int is_full(void) const
        {
                if((((_next + 1) - _written) % _entries_num) == 0) {
                        return 1;
                }
                return 0;
        }
        unsigned int log_count(void) const {return 0;}
        int get_proc(void);
        void split_log(void);
private:
        my_log(void):_log_file(NULL), _state(0), _level(LOG_PRI_DEBUG) {}
        ~my_log(void) {}
        void destroy(void);
        static void *_log_worker(void *args);
private:
        static my_log *_log_inst;
        FILE *_log_file;
        char _log_path[MAX_PATH];
        pthread_t _log_thd_id;
        pthread_mutex_t _log_mutex;

        log_entry_t *_log_entries;
        log_entry_t *_written;
        log_entry_t *_next;

        int _entries_num;
        int _entry_size;

        pid_t _log_pid;
        char _log_proc[32];

        int _state;
        int _level;
};

#endif