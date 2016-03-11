import random, sys, time

while True:
    r = random.randint(1, 6)
    if r == 1:
        sys.exit()
    elif r == 2 or r == 3:
        print "bad"
        sys.stdout.flush()
    else:
        print "good"
        sys.stdout.flush()
    time.sleep(1)
