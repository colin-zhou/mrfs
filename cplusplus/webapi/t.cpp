#include <iostream>
#include <string>
#include <mxml.h>
#include "web_api.h"

using namespace std;

void * web_api_thread (void *args)
{
  web_api_init ();
  web_api_register_hdl (0, test_hdl);
  web_api_run ();
  return NULL;
}

int
main ()
{
  pthread_t pid;
  pthread_create (&pid, NULL, web_api_thread, NULL);
  pthread_detach (pid);
  getchar ();
  return 0;
}
