#include <iostream>
#include <json/json.h>
#include <fstream>
#include <confuse.h>


/*
 * Convert the confuse config -> json
 * This function is Based on libconfuse, jsoncpp and dfs, It takes a "name" field as Array mark
 * Example:
 * input  -> b 1 {
 *                one=2
 *           }
 *           b 2 {
 *                two=3
 *           }
 * output -> b:[{"name":1, "one":2},{"name":2, "two":3}]
 */

static int
traverse_confuse(cfg_t *cfg, cfg_opt_t *opts, std::vector<Json::Value> &nodes, int curnode = 0) {
    if(cfg == NULL || opts == NULL) {
        log_error("Convert trader rc to redis failed: cfg or opts is null.");
        return -1;
    }
    if(nodes.size() == 0) {
        Json::Value t;
        nodes.push_back(t);
    }
    int i, j, t;
    int n = cfg_numopts(opts);
    for(i = 0; i < n; i++)
    {
        if(opts[i].type == CFGT_SEC && opts[i].subopts) {                                       // it is multi ones with title
            if(is_set(CFGF_MULTI, opts[i].flags) && is_set(CFGF_TITLE, opts[i].flags)) {
                for(j = 0; j < cfg_size(cfg, opts[i].name); j++) {
                    cfg_t *subcfg = cfg_getnsec(cfg, opts[i].name, j);
                    Json::Value sub_root;
                    int nodeid = nodes.size();
                    nodes.push_back(sub_root);
                    // std::cout<<"name = "<<opts[i].name<<" node_id = "<<nodeid << std::endl;
                    t = traverse_confuse(subcfg, opts[i].subopts, nodes, nodeid);
                    nodes[nodeid]["name"] = cfg_title(subcfg);
                    nodes[curnode][opts[i].name].append(nodes[nodeid]);                         // splice the new node to his father(must be later than recursion)
                    if(t < 0)
                        return t;
                }
            } else {                                                                            // only one element
                cfg_t *subcfg = cfg_getsec(cfg, opts[i].name);
                Json::Value sub_root;
                int nodeid = nodes.size();
                nodes.push_back(sub_root);
                // std::cout<<"name = "<<opts[i].name<<" node_id = "<<nodeid << std::endl;
                t = traverse_confuse(subcfg, opts[i].subopts, nodes, nodeid);
                nodes[curnode][opts[i].name] = nodes[nodeid];                                   // splice the new node to his father
                if(t < 0)
                        return t;

            }
        } else if(is_set(CFGF_LIST, opts[i].flags)) {                                           // it is a list
            switch(opts[i].type) {
                case CFGT_BOOL:
                    for(j = 0; j < cfg_size(cfg, opts[i].name); j++) {
                        nodes[curnode][opts[i].name].append(cfg_getnbool(cfg, opts[i].name, j));
                    }
                    break;
                case CFGT_STR:
                    for(j = 0; j < cfg_size(cfg, opts[i].name); j++) {
                        nodes[curnode][opts[i].name].append(cfg_getnstr(cfg, opts[i].name, j));
                    }
                    break;
                case CFGT_FLOAT:
                    for(j = 0; j < cfg_size(cfg, opts[i].name); j++) {
                        nodes[curnode][opts[i].name].append(cfg_getnfloat(cfg, opts[i].name, j));
                    }
                    break;
                case CFGT_INT:
                    for(j = 0; j < cfg_size(cfg, opts[i].name); j++) {
                        nodes[curnode][opts[i].name].append(Json::Value::Int(cfg_getnint(cfg, opts[i].name, j)));
                    }
                    break;
                default:
                    log_error("Convert trader rc to redis failed: CFGF_LIST type %d.", opts[i].type);
                    break;
            }
        } else {                                                                                // value type
            switch(opts[i].type) {
                case CFGT_STR:
                    nodes[curnode][opts[i].name] = cfg_getstr(cfg, opts[i].name);
                    break;
                case CFGT_BOOL:
                    nodes[curnode][opts[i].name] = cfg_getbool(cfg, opts[i].name);
                    break;
                case CFGT_FLOAT:
                    nodes[curnode][opts[i].name] = cfg_getfloat(cfg, opts[i].name);
                    break;
                case CFGT_INT:
                    nodes[curnode][opts[i].name] = Json::Value::Int(cfg_getint(cfg, opts[i].name));
                    break;
                default:
                    log_error("Convert trader rc to redis failed: CFGT type %d.", opts[i].type);
                    break;
            }
        }
    }
    return 0;
}