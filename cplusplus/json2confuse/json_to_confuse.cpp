#include <iostream>
#include <vector>
#include <json/json.h>

/*
 * Add specified numbers of space in a string
 */
static void
add_n_space (std::string & str, int n = 0)
{
  for (int i = 0; i < n; i++)
    {
      str += " ";
    }
}

/*
 * Convert the json -> confuse config
 * This function is Based on jsoncpp and dfs, It takes a "name" field as Array mark
 * Example:
 * input  -> b:[{"name":1, "one":2},{"name":2, "two":3}]
 * output -> b 1 {
 *                one=2
 *           }
 *           b 2 {
 *      two=3
 *       }
 */

static void
traverse_value (Json::Value x, std::string & str, int spaceNums =
		0, bool nameUsed = false)
{
  Json::Value::Members mn = x.getMemberNames ();
  std::string tostr;
  Json::UInt first = 0;
  for (int i = 0; i < mn.size (); ++i)
    {
      std::string nodename = mn[i];
      Json::Value value = x[nodename];
      if (value.isObject ())
	{			// type is a object
	  add_n_space (str, spaceNums);
	  str += nodename;
	  str += " {\n";
	  traverse_value (value, str, spaceNums + nodename.size ());
	  add_n_space (str, spaceNums);
	  str += "}\n";
	}
      else if (value.isArray ())
	{			// type is array
	  if (value[first].isObject ())
	    {			// the array container are objects
	      for (int i = 0; i < value.size (); i++)
		{
		  add_n_space (str, spaceNums);
		  str += nodename;
		  if (value[i].isMember ("name"))
		    {
		      tostr = value[i]["name"].toStyledString ();
		      if (value[i]["name"].isString ()
			  || value[i]["name"].isBool ())
			{
			  tostr = tostr.substr (1, tostr.size () - 3);	// delete quotation mark and the line break
			}
		      else
			{
			  tostr = tostr.substr (0, tostr.size () - 1);
			}
		      str += (" " + tostr);
		      str += " {\n";
		      traverse_value (value[i], str,
				      spaceNums + nodename.size () +
				      tostr.size (), true);
		    }
		  else
		    {
		      str += " {\n";
		      traverse_value (value[i], str,
				      spaceNums + nodename.size () +
				      tostr.size ());
		    }
		  add_n_space (str, spaceNums);
		  str += "}\n";
		}
	    }
	  else
	    {			// array container are not objects
	      add_n_space (str, spaceNums);
	      str += nodename;
	      str += "={";
	      for (int i = 0; i < value.size (); i++)
		{
		  tostr = value[i].toStyledString ();
		  tostr = tostr.substr (0, tostr.size () - 1);	// delete the line break
		  if (value[i].isBool ())
		    {
		      str += ("\"" + tostr + "\"");	// add quotation mark
		    }
		  else
		    {
		      str += tostr;
		    }
		  if (i != value.size () - 1)
		    {
		      str += ", ";
		    }
		}
	      str += "}\n";
	    }
	}
      else
	{			// type is not a array or a object
	  if (nameUsed && nodename == "name")
	    {			// ignore the used "name" field
	      continue;
	    }
	  tostr = value.toStyledString ();
	  add_n_space (str, spaceNums);
	  str += nodename;
	  if (value.isBool ())
	    {
	      tostr.insert (tostr.size () - 1, "\"");
	      str += ("=\"" + tostr);
	    }
	  else
	    {
	      str += ("=" + tostr);
	    }
	}
    }
}

/*
 * convert json to libconfuse type string
 * this function used Json::Reader to convert json_str to json
 */

int
json_to_confuse (const std::string & json_str, std::string & confuse_str)
{
  Json::Reader read;
  Json::Value root;
  if (!read.parse (json_str, root))
    {
      printf ("parse the json_str error\n");
      return -1;
    }
  traverse_value (root, confuse_str);
  return 0;
}


int
main (int argc, char **argv)
{
  Json::Value change;
  Json::Reader reader;

  std::string strValue =
    "{\"abc\":[{\"name\":\"Colin\",\"path\":\"/usr/include/\"},{\"name\":\"Heather\",\"path\":\"/usr/bin/\"}]}";
  if (!reader.parse (strValue, change))
    {
      return -1;
    }
  std::cout << change.toStyledString () << std::endl;
  std::string confuse_str;
  json_to_confuse (strValue, confuse_str);
  std::cout << confuse_str << std::endl;
  return 0;
}
