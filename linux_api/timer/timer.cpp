#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <signal.h>
#include <time.h>

// int timer_create(clockid_t clockid, struct sigevent *sevp,
//                  timer_t *timerid);

#define CLOCKID CLOCK_REALTIME
#define SIG SIGRTMIN

#define errExit(msg) do {perror(msg); exit(EXIT_FAILURE);\
		     } while(0)

static void
print_siginfo(siginfo_t *si)
{
	timer_t *tidp;
	int aor;
	tidp = &(si->si_value.sival_ptr);

	printf("sival_ptr = %p; ", si->si_value.sival_ptr);
	printf("*sival_ptr = 0x%lx\n", (long) tidp);
	
	aor = timer_getoverrun(*tidp);
	if (aor == -1)
		errExit("timer_getoverrun");
	else
		printf("overrun count = %d\n", aor);
}

static void
handler(int sig, siginfo_t *si, void *uc)
{
	printf("caught signal %d\n", sig);
	print_siginfo(si);
	signal(sig, SIG_IGN); // ignore this sig
}

int
main(int argc, char *argv[])
{
	timer_t timerid;
	struct sigevent sev;
	struct itimerspec its;
	long long freq_nanosecs;
	sigset_t mask;
	struct sigaction sa;

	if (argc != 3) {
		fprintf(stderr, "usage: %s sleep-secs freq-nanosecs", argv[0]);
		exit(EXIT_FAILURE);
	}

	printf("establishing handler for signal %d\n", SIG);
	sa.sa_flags = SA_SIGINFO;
	sa.sa_sigaction = handler;
	sigemptyset(&sa.sa_mask);
	if (sigaction(SIG, &sa, NULL) == -1)
		errExit("sigaction");

	printf("Blocking signal %d\n", SIG);
	sigemptyset(&mask);
	sigaddset(&mask, SIG);
	if (sigprocmask(SIG_SETMASK, &mask, NULL) == -1)
		errExit("sigprocmask");

	sev.sigev_notify = SIGEV_SIGNAL;
	sev.sigev_signo = SIG;
	sev.sigev_value.sival_ptr = &timerid;

	if (timer_create(CLOCKID, &sev, &timerid) == -1)
		errExit("timer_create");

	printf("timer ID is 0x%lx\n", (long) timerid);

	freq_nanosecs = atoll(argv[2]);
	its.it_value.tv_sec = freq_nanosecs / 1000000000;
	its.it_value.tv_nsec = freq_nanosecs % 1000000000;
	its.it_interval.tv_sec = its.it_value.tv_sec;
	its.it_interval.tv_nsec = its.it_value.tv_nsec;

	if (timer_settime(timerid, 0, &its, NULL) == -1)
		errExit("timer_settime");
	printf("sleeping for %d seconds\n", atoi(argv[1]));
	sleep(atoi(argv[1]));

	printf("Unblocking signal %d\n", SIG);
	if (sigprocmask(SIG_UNBLOCK, &mask, NULL) == -1)
		errExit("sigprocmask");

	while(1) {
		sleep(1);
	}
	exit(EXIT_SUCCESS);
}