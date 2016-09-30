/**
 * Master agent process running in research mode
 * feature:
 *  1. file lock keep one master entity alive
 *  2. auto detach current session to escape user terminal signals
 *  3. change the uid/gid of process to some normal user
 *  4. restart monitored process if it dies
 *  5. records those exit event in logs
 */

#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/file.h>
#include <fcntl.h>
#include <wait.h>
#include <libgen.h>
#include <signal.h>
#include <limits.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <stdio.h>

#include <logger.h>

#ifndef VERSION
#define VERSION "0.1"
#endif

#define MAX_PROC 100

typedef struct {
    volatile int flag; // 1 means running, 0 means not
	pid_t pid;
} agent_proc_t;

typedef struct {
	agent_proc_t agents[MAX_PROC];
	char path[NAME_MAX];
} all_proc_t;

static int proc_num;
static char agent_file[NAME_MAX];
static all_proc_t procs;

/**
 * cmdline option parse
 */
int
cmdline_parse(int argc, char **argv)
{
	int arg, file_exist = 0;
    set_log_level(5);
	log_info("start agent-master");
    if ((realpath (argv[0], agent_file)) && (!access (agent_file, F_OK))) {
        dirname(agent_file);
        strcat(agent_file, "/");
    } else {
        goto failed;
    }
	while((arg= getopt(argc, argv, "vn:f:")) != -1) {
		switch(arg) {
			case 'v':
				fprintf(stdout, "Routine version: %s.\n", VERSION);
                exit(EXIT_SUCCESS);
				break;
			case 'n':
				proc_num = atoi(optarg);
				log_info("input process cnt: %d.", proc_num);
				break;
            case 'f':
                file_exist = 1;
                strncat(agent_file, optarg, sizeof(agent_file) - 2 - strlen(agent_file));
                break;
			default: /* '?' */
				log_info("unknown option: %c.", optopt);
                goto failed;
		}
	}
    log_info("agent-path:%s, agent-num:%d", agent_file, proc_num);
    if (file_exist == 0 || proc_num <= 0 || access(agent_file, F_OK)) {
        goto failed;
    }
    return 0;

failed:
    fprintf(stderr, "Usage: ./master -f filename -n proc_num[1-50]\n");
    fprintf(stderr, "Agent-path : %s or num: %d\n", agent_file, proc_num);
    exit(EXIT_FAILURE);
}

/**
 * get formal user in special order
 */
void
get_formal_userid(uid_t *usrid, gid_t *grpid)
{
	*usrid = 1000;
	*grpid = 1000;
}

/**
 * if launch by root drop root privilege
 */
void
deal_with_privilege()
{
	uid_t uid;
	gid_t gid;
	// it run as root
	if(getuid() == 0) {
        get_formal_userid(&uid, &gid);
        /* should setgid firstly */
		if(setgid(gid) != 0) {
			fprintf(stderr, "setgid failed. err=%s\n", strerror(errno));
			exit(EXIT_FAILURE);
		}
		if(setuid(uid) != 0) {
			fprintf(stderr, "setuid failed. err=%s\n", strerror(errno));
			exit(EXIT_FAILURE);
		}
	    umask(S_IWGRP | S_IWOTH); // 022
        log_info("set uid and gid success");
	}
}

/**
 * mark specified process exit already
 */
int
reset_proc(pid_t pid)
{
    int i;
    for(i = i; i <= proc_num; i++) {
        if (procs.agents[i].pid == pid) {
            procs.agents[i].flag = 0;
            return i;
        }
    }
    return -1;
}

/**
 * child process exit signal handler
 */
void
sigchld_handler(int sig)
{
	pid_t pid;
	int status;
	while(1) {
		pid = waitpid(WAIT_ANY, &status, WNOHANG);
		if(pid < 0) {
			break;
		}
		if(pid == 0) { break; }
        int ret = reset_proc(pid);
		log_error("process exit. pid=%d, status=%d, idx=%d", pid, status, ret);
	}
}

/**
 * specified sig and its handler
 */
void sig_catch(int sig, void (*f)(int))
{
	struct sigaction sa;
	sa.sa_handler = f;
	sa.sa_flags = 0;
	sigemptyset(&sa.sa_mask);
	sigaction(sig,&sa,(struct sigaction *) 0);
}

/**
 * start process with index
 */
int
start_process(int idx)
{
    log_info("start process idx: %d", idx);
	if(idx < 0 || idx > 50) {
		return -1;
	}
	char arg2[10] = {0};
	snprintf(arg2, sizeof(arg2)-1, "%d", idx);
	pid_t pid = fork();
	if(pid < 0) {
		log_error("fork error. err=%s\n", strerror(errno));
		exit(EXIT_FAILURE);
	}
	if(pid == 0) {
        deal_with_privilege();
		execl(agent_file, agent_file, "-i", arg2, 0);
	}
    procs.agents[idx].pid = pid;
    procs.agents[idx].flag = 1;
	return 0;
}

void
lock_check(const char *fn)
{ 
    int fd = open(fn, O_WRONLY | O_NDELAY | O_APPEND | O_CREAT, 0600); 
    if (fd < 0) {
        log_error("open lock file failed");
        exit(EXIT_FAILURE);
    }
    if (flock(fd, LOCK_EX | LOCK_NB) == -1) {
        log_error("master process exist, routine exit!");
        exit(EXIT_FAILURE);
    }
}

int
main(int argc, char *argv[])
{
    pid_t pid = fork();
    if(pid != 0) {
        exit(EXIT_SUCCESS);
    }
    if(setsid() == -1) {
        exit(EXIT_FAILURE);
    }
    lock_check("mlock");
	cmdline_parse(argc, argv);
    bzero(&procs, sizeof(procs));
    sig_catch(SIGCHLD, sigchld_handler); 
    while(1) {
        int i, ret;
        for (i = 1; i <= proc_num; i++) {
            if (procs.agents[i].flag == 0) {
                ret = start_process(i);
                if (ret != 0) {
                    // start process failed
                    log_error("start process failed");
                    exit(EXIT_FAILURE);
                }
            }
        }
        sleep(5); 
    }
	return 0;
}
