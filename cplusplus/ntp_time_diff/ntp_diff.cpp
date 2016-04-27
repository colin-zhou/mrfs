#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <time.h>
#include <string.h>
#include <iostream>

void ntpdate();
 
int main() {
	ntpdate();
	return 0;
}
 
void ntpdate() {
	// can be any timing server
	// you might have to change the IP if the server is no longer available
	char *hostname=(char *)"192.168.0.91";
	// ntp uses port 123
	int portno=123;
	int maxlen=1024;
	int i;
	// buffer for the socket request
	unsigned char msg[48]={010,0,0,0,0,0,0,0,0};
	// buffer for the reply
	unsigned long buf[maxlen];
	//struct in_addr ipaddr;
	struct protoent *proto; //
	struct sockaddr_in server_addr;
	int s; // socket
	long tmit; // the time -- This is a time_t sort of
	 
	// open a UDP socket
	proto=getprotobyname("udp");
	s=socket(PF_INET, SOCK_DGRAM, proto->p_proto);
	 
	//here you can convert hostname to ipaddress if needed
	//$ipaddr = inet_aton($HOSTNAME);
	 
	memset( &server_addr, 0, sizeof( server_addr ));
	server_addr.sin_family=AF_INET;
	server_addr.sin_addr.s_addr = inet_addr(hostname);
	server_addr.sin_port=htons(portno);
	 
	/*
	 * build a message. Our message is all zeros except for a one in the
	 * protocol version field
	 * msg[] in binary is 00 001 000 00000000
	 * it should be a total of 48 bytes long
	*/
	 
	// send the data to the timing server
	i=sendto(s,msg,sizeof(msg),0,(struct sockaddr *)&server_addr,sizeof(server_addr));
	// get the data back
	struct sockaddr saddr;
	socklen_t saddr_l = sizeof (saddr);
	// here we wait for the reply and fill it into our buffer
	i=recvfrom(s, buf, 48,0, &saddr, &saddr_l);
	 
	//We get 12 long words back in Network order
	 
	/*
	 * The high word of transmit time is the 4th word we get back
	 * tmit is the time in seconds not accounting for network delays which
	 * should be way less than a second if this is a local NTP server
	 */
	 
	 tmit=ntohl((time_t)buf[4]); //# get transmit time
	 
	 tmit-= 2208988800U;
	 std::cout << "NTP time is " << ctime(&tmit) << std::endl;
	 i=time(0);
	 long tt = time(0);
	 std::cout << "local time is " << ctime(&tt) << std::endl;
	 std::cout << "System time is " << (i-tmit) << " seconds off" << std::endl;
}