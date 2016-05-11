# -*- coding: utf-8 -*-


import redis
import json
import sys
import pprint

redis_config = {
    "host": "192.168.3.10",
    "port": 6379,
    "db": 0
}

task_num = 0
total_task = []
json_task = []
download = []


def usage():
        print "python restart_task_from_log.py N [N >= 0 && N <= 500]"
        sys.exit(0)


def param_check():
    if len(sys.argv) != 2:
            usage()
    else:
        try:
            global task_num
            task_num = int(sys.argv[1])
            if task_num < 0 or task_num > 500:
                usage()
        except Exception:
            usage()


def get_start_task():
    st_fields = ["name", "file", "max_pos", "param_cfg_path"]
    l_cnt = 0
    with open("bss-agent.log") as f:
        start = False
        end = False
        strategy = False
        total_cnt = -1
        st_cnt = 0
        task_obj = {}
        strategy_obj = {}
        for line in f:
            if end and task_obj:
                # print task_obj
                if l_cnt == task_num:
                    break
                total_task.append(task_obj)
                start = False
                end = False
                total_cnt = -1
                st_cnt = 0
                l_cnt += 1

            # start or not
            if not start:
                if line.find("[P]Strategy BackTesting Transfered") != -1:
                    start = True
                    end = False
                    task_obj = {}
                    strategy = False
                continue

            # finish or not
            if start and strategy and line == "}\n":
                start = False
                strategy = False
                end = True

            # in task and it contains data
            elif line.find("=") != -1:
                item = line.strip(' \t\n\r')
                key, value = item.split("=")
                if key in st_fields:
                    if len(strategy_obj) < 4:
                        strategy_obj[key] = value
                        done = True
                    else:
                        done = False
                    if len(strategy_obj) == 4:
                        if "strategy" not in task_obj:
                            task_obj["strategy"] = []
                        task_obj["strategy"].append(strategy_obj)
                        st_cnt += 1
                        strategy_obj = {}
                    if not done:
                        strategy_obj[key] = value
                else:
                    task_obj[key] = value

                if key == "st_cnt":
                    total_cnt = int(value)

                if total_cnt == st_cnt:
                    strategy = True


def inner_to_json_task(in_task, out_task):
    l_cnt = 0
    task_demo = {
        "data": {
            "task": {
                "all_trd_ratio": 1,
                "date_end": 20160429,
                "date_start": 20160201,
                "day_night": 0,
                "delete_path": "~/agent_download/2/30500",
                "exchange": "A",
                "fee_mode": 1,
                "next_tick_trd_radio": 0.300000,
                "product": "shni",
                "quote_seq": 1,
                "simu_fee": 0.000212,
                "strategy": [{
                    "cfg": "/home/dev/agent_download/2/41699/10_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
                    "file": "/home/dev/agent_download/2/41699/10_28fbb28ecb54d2ef961e7a8ee1abf2fbce281c00f055749d5df105d9c044bd00",
                    "max_pos": 30,
                    "name": "hi85"},
                ],
                "strategy_cnt": 11,
                "taskid": 30500,
                "tick_size": 0.0050000000000000001,
                "trade_unit": 10000,
                "trd_ratio": 1.000000,
                "type": 2,
                "user": "14"
            }
        },
        "seq": 36064,
        "type": 100
    }
    for task in in_task:
        if l_cnt == task_num:
            break
        task_demo["data"]["task"]["all_trd_ratio"] = float(task['all_trd_ratio'])
        task_demo["data"]["task"]["date_start"] = int(task["beg_date"])
        task_demo["data"]["task"]["data_end"] = int(task["end_date"])
        task_demo["data"]["task"]["day_night"] = int(task["day_night"])
        task_demo["data"]["task"]["exchange"] = task["xchg_code"]
        # task_demo["task"]["fee_mode"] = 1
        task_demo["data"]["task"]["next_tick_trd_radio"] = float(task["next_tick_trd_ratio"])
        task_demo["data"]["task"]["product"] = task["product"]
        task_demo["data"]["task"]["quote_seq"] = int(task["rank"])
        # task_demo["task"]["simu_fee"] = 0.000212
        task_demo["data"]["task"]["strategy_cnt"] = len(task["strategy"])
        # task_demo["task"]["tick_size"] =  0.005
        # task_demo["task"]["trade_unit"] = 10000
        task_demo["data"]["task"]["trd_ratio"] = float(task["trd_ratio"])
        for idx in range(len(task["strategy"])):
            tmp = {}
            tmp["file"] = task["strategy"][idx]["file"]
            tmp["cfg"] = task["strategy"][idx]["param_cfg_path"]
            tmp["name"] = task["strategy"][idx]["name"]
            tmp["max_pos"] = task["strategy"][idx]["max_pos"]
            task_demo["data"]["task"]["strategy"].append(tmp)
        print task_demo, "\n"
        out_task.append(task_demo)
        l_cnt += 1

# def stop_all_task():
#     data = {'type': 102,
#             'seq': 1,
#             'data': {
#                 'user': '14',
#                 'type': 2,
#                 'taskid': [1, 2, 3]
#             }
#         }

def start_task():
        redis_key1 = "a:rss:cmd:192.168.1.16(debian)"
        redis_key2 = "a:rss:cmd:192.168.3.10(debian-rss)"

        print "%s task to write to redis: %s %s, %s" % \
            (task_num, redis_config["host"], redis_key1, redis_key2)

        mconn = redis.client.StrictRedis(**redis_config)
        mconn.delete(redis_key1)
        mconn.delete(redis_key2)

        for idx in range(len(json_task)):
                if idx >= task_num:
                        print "task restart has finished"
                        break
                the_obj = json_task[idx]
                the_obj["data"]["task"]["date_start"] = 20160201
                the_obj["data"]["task"]["taskid"] = idx
                the_obj["seq"] = idx
                print the_obj
                real_task = json.dumps(the_obj)
                mconn.rpush(redis_key1, real_task)
                mconn.rpush(redis_key2, real_task)


if __name__ == "__main__":
        param_check()
        get_start_task()
        inner_to_json_task(total_task, json_task)
        start_task()
