import os
import pwd
import grp

def set_privileges():
    if os.getuid() != 0:
        # We're not root so, like, whatever dude
        print("permission not correct")
        return
    param = os.sched_param(os.sched_get_priority_max(os.SCHED_FIFO))
    os.sched_setscheduler(0, os.SCHED_FIFO, param)


def drop_privileges(uid_name='rss', gid_name='rss'):
    if os.getuid() != 0:
        # We're not root so, like, whatever dude
        return

    # Get the uid/gid from the name
    running_uid = pwd.getpwnam(uid_name).pw_uid
    running_gid = grp.getgrnam(gid_name).gr_gid

    # Remove group privileges
    os.setgroups([])
    # Try setting the new uid/gid
    os.setgid(running_gid)
    os.setuid(running_uid)
