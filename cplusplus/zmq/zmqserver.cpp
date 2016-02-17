#include <zmq.hpp>
#include <string>
#include <iostream>
#include <unistd.h>

int main() {
    zmq::context_t context(1);
    zmq::socket_t socket(context, ZMQ_REP);
    socket.bing("tcp://*:5555");
    while(true) {
        zmq::message_t request;
        socket.recv(&request);
        std::cout << "Received Hello" << std::endl;
        sleep(1);
        zmq::message_t reply(5);
        memcpy((void *) reply.data(), "world", 5);
        socket.send(reply);
    }
    return 0;
}
