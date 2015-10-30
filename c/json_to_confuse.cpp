#include <iostream>
#include <json/json.h>
#include <fstream>

using namespace std;

int
add_n_space(string &str, int n = 0) 
{
    for(int i=0; i<n; i++) {
        str += " ";
    }
}
/*
 * Convert the json -> confuse config
 * This function is Based on jsoncpp and dfs
 * Important: It takes a "name" field as array mark
 * example:
 * input  -> b:[{"name":1, "one":2},{"name":2, "two":3}]
 * output -> b 1 {
 *                one=2
 *           } 
 */
void
traverse_value(Json::Value x, string &str, int spaceNums = 0, bool nameUsed = false)
{
    Json::Value::Members mn = x.getMemberNames();
    string tostr;
    for (int i = 0; i < mn.size(); ++i) {
        string nodename = mn[i];
        Json::Value value = x[nodename];
        // if(value.isObject()) {
        //   cout<<"object "<< nodename << endl;
        // } else if(value.isArray()) {
        //   cout<<"array " << nodename << endl;
        // } else {
        //   cout<<"value or string " << nodename << endl;
        // }
        if (value.isObject()) {                            // type is a object
            add_n_space(str, spaceNums);
            str += nodename;
            str += " {\n";
            traverse_value(value, str, spaceNums + nodename.size());
            add_n_space(str, spaceNums);
            str += "}\n";
        } 
        else if (value.isArray()) {                       // type is array
          if(value[0].isObject()) {                       // the array container are objects
            for (int i = 0; i < value.size(); i++) {
              add_n_space(str, spaceNums);
              str += nodename;
              if (value[i].isMember("name")) {
                tostr = value[i]["name"].toStyledString();
                if (value[i]["name"].isString() || value[i]["name"].isBool()) {
                  tostr = tostr.substr(1, tostr.size() - 3);  // delete quotation mark and the line break
                } else {
                  tostr = tostr.substr(0, tostr.size() - 1);
                }
                str += (" " + tostr);
                str += " {\n";
                traverse_value(value[i], str, spaceNums + nodename.size() + tostr.size(), true);
              } else {
                str += " {\n";
                traverse_value(value[i], str, spaceNums + nodename.size() + tostr.size());
              }
              add_n_space(str, spaceNums);
              str += "}\n";
            }
          } else {                                        // array container are not objects
            add_n_space(str, spaceNums);
            str += nodename;
            str += "={";
            for (int i = 0; i < value.size(); i++) {
              tostr = value[i].toStyledString();
              tostr = tostr.substr(0, tostr.size()-1);    // delete the line break
              if (value[i].isBool()) {
                str += ("\"" + tostr + "\"");             // add quotation mark
              } else {
                str += tostr;
              }
              if (i != value.size() - 1) {
                str += ", ";
              }
            }
            str +="}\n";
          }
        } else {                                          // type is not a array or a object
          if (nameUsed && nodename == "name") {           // ignore the used "name" field
            continue;
          }
          tostr = value.toStyledString();
          add_n_space(str, spaceNums);
          str += nodename;
          // if the value is a string
          if (value.isBool()) {
            tostr.insert(tostr.size()-1, "\"");
            str += ("=\"" + tostr);
          } else {
            str += ("=" + tostr);
          }
        }

    }
}

int main(int argc, char **argv)
{
  Json::Value change;
  Json::Reader reader;

  string strValue = "{\"abc\":[{\"name\":\"Colin\",\"path\":\"/usr/include/\"},{\"name\":\"Heather\",\"path\":\"/usr/bin/\"}]}";
  if (!reader.parse(strValue, change))  
  {
    return -1;  
  }
 
  Json::Value::Members memberNames = change.getMemberNames();
  cout << change << endl;
  string hh;
  
  traverse_value(change, hh);
  cout<<hh<<endl;
  return 0;
}
