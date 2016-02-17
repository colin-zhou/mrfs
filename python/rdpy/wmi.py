import wmi
ip = "192.168.0.111"
username = r"colin"
password = "zhou"
try:
    print "Establishing connection to %s" %ip
    connection = wmi.WMI(ip, user=username, password=password)
    print "Connection established"
except Exception:
    print "Your Username and Password of "+ ip +" are wrong."