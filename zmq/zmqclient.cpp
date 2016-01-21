#include <zmq.hpp>
#include <string>
#include <iostream>

int main()
{
    zmq::context_t context(1);
    zmq::socket_t socket(context, ZMQ_REQ);
    std::cout << "Connecting to hello world server..." <<std::endl;

    for (int request_nbr = 0; request_nbr != 10; request_nbr++) {
        zmq::message_t request(6);
        memcpy((void *)request.data(), "hello", 5);
        std::cout << "Sending hello" << request_nbr << "..." <<std::endsocket.send(request);
        socket.send(request);
        zmq::message_t reply;
        socket.recv (&reply);
        std::cout << "Received World" << request_nbr << std::endl;
    }
    return 0;
}
