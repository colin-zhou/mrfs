#include <iostream>
#include "json.h"

using namespace std;

int main(int argc, char **argv)
{
  Json::Value change;
  Json::Value minParameters;
  Json::Value minParametersAnm;
 
  minParameters["MinimumRMS"] = 0.2;
  minParameters["sgbUpdated"] = true;
  change["Minimizer"] = minParameters;
  minParametersAnm["MinimumRMS"] = 0.5;
  minParametersAnm["sgbUpdated"] = false;
  change["Minimizer::ANM"] = minParametersAnm;
 
  Json::Value::Members memberNames = change.getMemberNames();

  cout<<"Traverse members of: "<<endl
    <<"\"change\":"<<endl
    <<change.toStyledString()<<endl<<endl;
 
  cout<<"List of members:"<<endl;
  for(unsigned int i=0; i<memberNames.size(); ++i)
  {
    string memberName = memberNames[i];
    Json::Value value = change[memberName];
    cout<<"Key: "<<memberName<<endl;
    cout<<"Value: "<<value.toStyledString()<<endl;
  }
  return 0;
}