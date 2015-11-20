import json
import nmap
# assemble the msg
def assemble_msg(server_group, host_name, host_ip, status):
	pass

# write into the file




if __name__ == "__main__":
	# read the config
	with open("config.txt","r") as cfg_file:
		data = json.load(cfg_file)
	# read tasks
	tasks = data["tasks"]
	for i in range(len(tasks)):
		group_name = task[i]["group_name"]
		hosts = tasks[i]["ip_list"]
		port_range = tasks[i]["port_range"]
		white_list = tasks[i]["white_list"]
		for host in hosts:
			nm = nmap.PortScanner()
			tmp = nm.scan(host, port_range)
			assemble_msg(group_name, tmp['scan'][host]['hostname'], host, tmp['scan'][host]['status']['state'])
			try:
				ports = tmp['scan'][host]['tcp'].keys()
			except KeyError, e:
				if white_list:
					white_str = ','.join(white_list)
					ret_msg = "None opened port"
				else:
					ret_msg = "Without any Problem"







def nmScan(hostlist,portrange,whitelist): 
    p = re.compile("^(\d*)\-(\d*)$") 
    if type(hostlist) != list: 
            help() 
        portmatch = re.match(p,portrange) 
    if not portmatch: 
            help() 
        l = [] 
        for host in hostlist: 
            result = '' 
        nm = nmap.PortScanner() 
            tmp = nm.scan(host,portrange) 
            result = result + "<h2>ip地址:%s 主机名:[%s]  ......  %s</h2><hr>" %(host,tmp['scan'][host]['hostname'],tmp['scan'][host]['status']['state']) 
            try: 
                ports = tmp['scan'][host]['tcp'].keys() 
            except KeyError,e: 
                if whitelist: 
                    whitestr = ','.join(whitelist) 
                    result = result + "未扫到开放端口!请检查%s端口对应的服务状态" %whitestr  
                else: 
                    result = result + "扫描结果正常，无暴漏端口"
                    continue
            for port in ports: 
              info = '' 
              if port not in whitelist: 
                  info = '<strong><font color=red>Alert:非预期端口</font><strong>&nbsp;&nbsp;' 
              else: 
                  info = '<strong><font color=green>Info:正常开放端口</font><strong>&nbsp;&nbsp;'
              portinfo = "%s <strong>port</strong> : %s &nbsp;&nbsp;<strong>state</strong> : %s &nbsp;&nbsp;<strong>product<strong/> : %s <br>" %(info,port,tmp['scan'][host]['tcp'][port]['state'], 
                                                                        tmp['scan'][host]['tcp'][port]['product']) 
              result = result + portinfo 
            l.append([host,str(result)]) 