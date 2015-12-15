import json
import nmap


# assemble the msg
def assemble_server_msg(server_group, host, nm_entity):
        host_name = nm_entity['scan'][host]['hostnames']
        host_ip = host
        server_status = nm_entity['scan'][host]['status']['state']
        ret_msg = "<h2>"
        ret_msg += "group name: %s " % server_group
        ret_msg += "host_ip: %s " % host_ip
        ret_msg += "server_status: %s" % server_status
        ret_msg += "</h2>\n"
        return ret_msg

# read a json file
def read_config(cfg_file):
        with open(cfg_file,"r") as cfg_file:
                data = json.load(cfg_file)
        return data

# scan a host with port_range and white_list
def scan_host_portrange(nmhandler, hosts, port_range, white_list):
        ret_msg = ""
        for host in hosts:
                t_nm = nmhandler.scan(host, port_range)
                ret_msg += assemble_server_msg(group_name, host, t_nm)
                if 'tcp' in t_nm['scan'][host]:
                        open_ports =  t_nm['scan'][host]['tcp'].keys()
                if 'udp' in t_nm['scan'][host]:
                        open_ports += t_nm['scan'][host]['udp'].keys()
                # open_ports is none
                if not open_ports:
                        if not white_list:
                                ret_msg += '<p>none white_list</p>\n'
                        else:
                                ret_msg += '<p>need to scan %s</p>\n' % ','.join(white_list)
                # open_ports is not none
                else:
                        # check the opened ports
                        for port in open_ports:
                                if port in white_list:
                                        ret_msg += '<p>port %s opened OK!</p>\n' % port
                                else:
                                        ret_msg += '<p>port %s should closed!</p>\n' % port
                        # check the white list
                        for white_port in white_list:
                                if white_port not in open_ports:
                                        ret_msg += '<p>port %s should opened</p>\n' % white_port
        return ret_msg

# write into the file
def write_to_html(input_str, file_name):
        # wrap the file info
        html_wrap = '<html>\n<head>Port Scan Result</head>\n<body>\n' + input_str + '</body></html>\n'
        with open(file_name, 'w') as html_file:
                html_file.write(html_wrap)



if __name__ == "__main__":
	# read the config
        data = read_config('config.txt')
	# read tasks
	tasks = data["tasks"]
        nm = nmap.PortScanner()
        ret_msg = ""
	for i in range(len(tasks)):
		group_name = tasks[i]["group_name"]
		hosts = map(str, tasks[i]["ip_list"])
		port_range = tasks[i]["port_range"]
		white_list = map(int, tasks[i]["white_list"])
                ret_msg += scan_host_portrange(nm, hosts, port_range, white_list)
        # write the html
        write_to_html(ret_msg, 'scan_res.html')