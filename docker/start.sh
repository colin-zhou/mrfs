#!/bin/bash

docker start bc0080904c1c   #    gitlab-runner
docker start 603a499a2c34   #    zabbix|mysql:5.7                        
docker start df72a24e07b1   #    zabbix/zabbix-java-gateway:latest 
docker start f1c6bd1c4a63   #    zabbix/zabbix-server-mysql:latest 
docker start 07c4efb30bae   #    zabbix/zabbix-web-nginx-mysql:latest 
docker start c59986aaec0d   #    sentry|postgres                   
docker start f428998673e0   #    sentry|redis                     
docker start 84a67071dde2   #    sentry                     
docker start a1e9abde7317   #    sentry                    
docker start 4b9b4baef529   #    sentry                      
docker start 4f53ec686a1b   #    jupyter/datascience-notebook  

#docker start 1808d3db04cd   #    centos                          
##docker start 76398bbf7edd   #    no_vnc_demo                    
#docker start 98c3883c0725   #    centos                        
#docker start c719b1ab5d6e   #    google/cadvisor:latest       
#docker start c8dd8239e63a   #    jenserat/seafile            

