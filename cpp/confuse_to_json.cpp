#include <iostream>
#include <confuse.h>
#include <json/json.h>
#include <string.h>
#include <string>
#include <vector>

#define is_set(f, x) (((f) & (x)) == (f))
/* valid values for the auto-create-bookmark option */
#define ACB_YES 1
#define ACB_NO  2
#define ACB_ASK 3

/* called on alias() functions in the config file */
/* copied from official document */
int
conf_alias (cfg_t * cfg, cfg_opt_t * opt, int argc, const char **argv)
{
  if (argc < 2)
    {
      cfg_error (cfg, "function '%s' requires 2 arguments",
		 cfg_opt_name (opt));
      return -1;
    }
  printf ("got alias '%s' = '%s'\n", argv[0], argv[1]);
  return 0;
}

/* parse values for the auto-create-bookmark option */
/* copied from official document */
int
conf_parse_acb (cfg_t * cfg, cfg_opt_t * opt, const char *value, void *result)
{
  if (strcmp (value, "yes") == 0)
    *(int *) result = ACB_YES;
  else if (strcmp (value, "no") == 0)
    *(int *) result = ACB_NO;
  else if (strcmp (value, "ask") == 0)
    *(int *) result = ACB_ASK;
  else
    {
      cfg_error (cfg, "invalid value for option '%s': %s",
		 cfg_opt_name (opt), value);
      return -1;
    }
  return 0;
}

/* validates a port option (must be positive) */
/* copied from official document */
int
conf_validate_port (cfg_t * cfg, cfg_opt_t * opt)
{
  int value = cfg_opt_getnint (opt, 0);
  if (value <= 0)
    {
      cfg_error (cfg, "invalid port %d in section '%s'", value,
		 cfg_name (cfg));
      return -1;
    }
  return 0;
}

/* validates a bookmark section (host option required) */
/* copied from official document */
int
conf_validate_bookmark (cfg_t * cfg, cfg_opt_t * opt)
{
  cfg_t *bookmark = cfg_opt_getnsec (opt, cfg_opt_size (opt) - 1);
  if (cfg_size (bookmark, "host") == 0)
    {
      cfg_error (cfg, "missing required option 'host' in bookmark");
      return -1;
    }
  return 0;
}

/* fethch the cfg_t of ftp_conf */
/* copied from official document */

static cfg_opt_t *
get_ftp_conf ()
{
  char default_str[] = "{xterm, rxvt}";
  static cfg_opt_t bookmark_opts[] = {
    CFG_STR ("host", 0, CFGF_NODEFAULT),
    CFG_INT ("port", 21, CFGF_NONE),
    CFG_STR ("login", "anonymous", CFGF_NONE),
    CFG_STR ("password", "anonymous@", CFGF_NONE),
    CFG_STR ("directory", 0, CFGF_NONE),
    CFG_END ()
  };
  static cfg_opt_t opts[] = {
    CFG_SEC ("bookmark", bookmark_opts, CFGF_MULTI | CFGF_TITLE),
    CFG_BOOL ("passive-mode", cfg_false, CFGF_NONE),
    CFG_BOOL ("remote-completion", cfg_true, CFGF_NONE),
    CFG_FUNC ("alias", conf_alias),
    CFG_STR_LIST ("xterm-terminals", default_str, CFGF_NONE),
    CFG_INT_CB ("auto-create-bookmark", ACB_YES, CFGF_NONE, conf_parse_acb),
    CFG_FUNC ("include-file", cfg_include),
    CFG_END ()
  };
  return opts;
}

/*
 * Convert the confuse config -> json
 * This function is Based on libconfuse, jsoncpp and dfs, It takes a "name" field as Array mark
 * Example:
 * input  -> b 1 {
 *                one=2
 *           }
 *           b 2 {
 *        two=3
 *       }
 * output -> b:[{"name":1, "one":2},{"name":2, "two":3}](it is in nodes[0])
 */

static int
traverse_confuse (cfg_t * cfg, cfg_opt_t * opts,
		  std::vector < Json::Value > &nodes, int curnode = 0)
{
  if (cfg == NULL || opts == NULL)
    {
      printf ("Convert trader rc to redis failed: cfg or opts is null.\n");
      return -1;
    }
  if (nodes.size () == 0)
    {
      Json::Value t;
      nodes.push_back (t);
    }
  unsigned int i, j, n;
  int ret;
  n = cfg_numopts (opts);
  for (i = 0; i < n; i++)
    {
      if (opts[i].type == CFGT_SEC && opts[i].subopts)	// it is multi sets with title
	{
	  if (is_set (CFGF_MULTI, opts[i].flags)
	      && is_set (CFGF_TITLE, opts[i].flags))
	    {
	      for (j = 0; j < cfg_size (cfg, opts[i].name); j++)
		{
		  cfg_t *subcfg = cfg_getnsec (cfg, opts[i].name, j);
		  Json::Value sub_root;
		  int nodeid = nodes.size ();
		  nodes.push_back (sub_root);
		  ret =
		    traverse_confuse (subcfg, opts[i].subopts, nodes, nodeid);
		  nodes[nodeid]["name"] = cfg_title (subcfg);
		  nodes[curnode][opts[i].name].append (nodes[nodeid]);	// splice the new node to his father(must be later than recursion)
		  if (ret < 0)
		    return ret;
		}
	    }
	  else			// only one set
	    {
	      cfg_t *subcfg = cfg_getsec (cfg, opts[i].name);
	      Json::Value sub_root;
	      int nodeid = nodes.size ();
	      nodes.push_back (sub_root);
	      ret = traverse_confuse (subcfg, opts[i].subopts, nodes, nodeid);
	      nodes[curnode][opts[i].name] = nodes[nodeid];	// splice the new node to his father
	      if (ret < 0)
		return ret;

	    }
	}
      else if (is_set (CFGF_LIST, opts[i].flags))	// it is a list
	{
	  Json::Value * tnode = &nodes[curnode][opts[i].name];
	  switch (opts[i].type)
	    {
	    case CFGT_BOOL:
	      for (j = 0; j < cfg_size (cfg, opts[i].name); j++)
		{
		  tnode->append (cfg_getnbool (cfg, opts[i].name, j));
		}
	      break;
	    case CFGT_STR:
	      for (j = 0; j < cfg_size (cfg, opts[i].name); j++)
		{
		  tnode->append (cfg_getnstr (cfg, opts[i].name, j));
		}
	      break;
	    case CFGT_FLOAT:
	      for (j = 0; j < cfg_size (cfg, opts[i].name); j++)
		{
		  tnode->append (cfg_getnfloat (cfg, opts[i].name, j));
		}
	      break;
	    case CFGT_INT:
	      for (j = 0; j < cfg_size (cfg, opts[i].name); j++)
		{
		  tnode->
		    append (Json::Value::
			    Int (cfg_getnint (cfg, opts[i].name, j)));
		}
	      break;
	    default:
	      printf
		("Convert trader rc to redis failed: CFGF_LIST type %d.\n",
		 opts[i].type);
	      break;
	    }
	}
      else
	{			// value type
	  switch (opts[i].type)
	    {
	    case CFGT_STR:
	      nodes[curnode][opts[i].name] = (cfg_getstr (cfg, opts[i].name));
	      break;
	    case CFGT_BOOL:
	      nodes[curnode][opts[i].name] = (cfg_getbool
					      (cfg, opts[i].name));
	      break;
	    case CFGT_FLOAT:
	      nodes[curnode][opts[i].name] = cfg_getfloat (cfg, opts[i].name);
	      break;
	    case CFGT_INT:
	      nodes[curnode][opts[i].name] =
		Json::Value::Int (cfg_getint (cfg, opts[i].name));
	      break;
	    default:
	      printf ("Convert trader rc to redis failed: CFGT type %d.\n",
		      opts[i].type);
	      break;
	    }
	}
    }
  return 0;
}

int
confuse_to_json (cfg_opt_t * opt, const char *conf_file,
		 std::string & redis_str)
{
  if (!conf_file)
    {
      printf ("conf_file is NULL\n");
      return -1;
    }
  if (!opt)
    {
      printf ("opt is NULL\n");
    }
  int ret = 0;
  cfg_t *cfg = cfg_init (opt, CFGF_NONE);
  cfg_set_validate_func (cfg, "bookmark|port", conf_validate_port);
  cfg_set_validate_func (cfg, "bookmark", conf_validate_bookmark);
  if (!cfg)
    {
      printf ("Trader confuse to redis cfg_init failed\n");
      return -1;
    }
  ret = cfg_parse (cfg, conf_file);
  /*  check parse result */
  if (ret == CFG_FILE_ERROR)
    {
      printf ("Configuration file do not exist.\n");
      return -1;
    }
  else if (ret == CFG_PARSE_ERROR)
    {
      printf ("Configuration file parse failed.\n");
      return -1;
    }
  std::vector < Json::Value > valueArray;
  ret = traverse_confuse (cfg, opt, valueArray, 0);
  if (ret != 0 || valueArray.size () == 0)
    {
      printf ("traverse_confuse failed!\n");
      return -1;
    }
  cfg_free (cfg);
  Json::FastWriter fast_writer;
  redis_str = fast_writer.write (valueArray[0]);
  redis_str = valueArray[0].toStyledString ();
  return 0;
}

int
main (int argc, char const *argv[])
{
  (void) argc;
  (void) argv;
  cfg_opt_t *opt = get_ftp_conf ();
  char const *file = "/home/rss/Git/reserve/conf/ftp.conf";
  std::string sout;
  confuse_to_json (opt, file, sout);
  std::cout << sout << std::endl;
  return 0;
}
