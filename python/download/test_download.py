# -*- coding: utf-8 -*-

from remote_file_operation import main
import json

ser_cfg = {
    "host": "192.168.3.10",
    "port": 22,
    "user": "rss",
    "password": ""
}

dl_cmd1 = {
     "type": 102,
     "seq": 2,
     "data" : {
      "local_files" : [
         "~/agent_download/1/207/0_hi85test_shcu_day.so",
         "~/agent_download/1/207/1_hi76test_shcu_day.so",
         "~/agent_download/1/207/2_hi75test_shcu_day.so",
         "~/agent_download/1/207/3_hi73test_shcu_day.so",
         "~/agent_download/1/207/4_hi52atest_shcu_day.so",
         "~/agent_download/1/207/5_hi51atest_shcu_day.so",
         "~/agent_download/1/207/6_hi5atest_shcu_day.so",
         "~/agent_download/1/207/7_hi55test_shcu_day.so",
         "~/agent_download/1/207/8_hi52test_shcu_day.so",
         "~/agent_download/1/207/9_hi51test_shcu_day.so",
         "~/agent_download/1/207/10_hi5test_shcu_day.so"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shcu/hi85test_shcu_day.so",
         "/mnt/data/LiveSo/20160428/shcu/hi76test_shcu_day.so",
         "/mnt/data/LiveSo/20160428/shcu/hi75test_shcu_day.so",
         "/mnt/data/LiveSo/20160428/shcu/hi73test_shcu_day.so",
         "/mnt/data/LiveSo/20160428/shcu/hi52atest_shcu_day.so",
         "/mnt/data/LiveSo/20160428/shcu/hi51atest_shcu_day.so",
         "/mnt/data/LiveSo/20160428/shcu/hi5atest_shcu_day.so",
         "/mnt/data/LiveSo/20160428/shcu/hi55test_shcu_day.so",
         "/mnt/data/LiveSo/20160428/shcu/hi52test_shcu_day.so",
         "/mnt/data/LiveSo/20160428/shcu/hi51test_shcu_day.so",
         "/mnt/data/LiveSo/20160428/shcu/hi5test_shcu_day.so"
      ]
   }
}
dl_cmd2 = {
     "type": 102,
     "seq": 2,
     "data" : {
      "local_files" : [
         "~/agent_download/1/207/0_hi85test_shcu_day.so",
         "~/agent_download/1/207/0_a410f29e-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/207/1_hi76test_shcu_day.so",
         "~/agent_download/1/207/1_a410f29e-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/207/2_hi75test_shcu_day.so",
         "~/agent_download/1/207/2_a410f29e-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/207/3_hi73test_shcu_day.so",
         "~/agent_download/1/207/3_a410f29e-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/207/4_hi52atest_shcu_day.so",
         "~/agent_download/1/207/4_a410f29e-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/207/5_hi51atest_shcu_day.so",
         "~/agent_download/1/207/5_a410f29e-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/207/6_hi5atest_shcu_day.so",
         "~/agent_download/1/207/6_a410f29e-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/207/7_hi55test_shcu_day.so",
         "~/agent_download/1/207/7_a410f29e-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/207/8_hi52test_shcu_day.so",
         "~/agent_download/1/207/8_a410f29e-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/207/9_hi51test_shcu_day.so",
         "~/agent_download/1/207/9_a410f29e-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/207/10_hi5test_shcu_day.so",
         "~/agent_download/1/207/10_a410f29e-0d38-11e6-9545-c4346b7b583d"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shcu/hi85test_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shcu/hi76test_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shcu/hi75test_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shcu/hi73test_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shcu/hi52atest_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shcu/hi51atest_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shcu/hi5atest_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shcu/hi55test_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shcu/hi52test_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shcu/hi51test_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shcu/hi5test_shcu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a410f29e-0d38-11e6-9545-c4346b7b583d"
      ]
   }
}

dl_cmd3 = {
     "type": 102,
     "seq": 3,
     "data" : {
      "local_files" : [
         "~/agent_download/1/208/0_hi52atest_shbu_day.so",
         "~/agent_download/1/208/0_a41e5402-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/208/1_hi51atest_shbu_day.so",
         "~/agent_download/1/208/1_a41e5402-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/208/2_hi5atest_shbu_day.so",
         "~/agent_download/1/208/2_a41e5402-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/208/3_hi55test_shbu_day.so",
         "~/agent_download/1/208/3_a41e5402-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/208/4_hi52test_shbu_day.so",
         "~/agent_download/1/208/4_a41e5402-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/208/5_hi51test_shbu_day.so",
         "~/agent_download/1/208/5_a41e5402-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/208/6_hi50test_shbu_day.so",
         "~/agent_download/1/208/6_a41e5402-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/208/7_hi5test_shbu_day.so",
         "~/agent_download/1/208/7_a41e5402-0d38-11e6-9545-c4346b7b583d"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shbu/hi52atest_shbu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a41e5402-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shbu/hi51atest_shbu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a41e5402-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shbu/hi5atest_shbu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a41e5402-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shbu/hi55test_shbu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a41e5402-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shbu/hi52test_shbu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a41e5402-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shbu/hi51test_shbu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a41e5402-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shbu/hi50test_shbu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a41e5402-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shbu/hi5test_shbu_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a41e5402-0d38-11e6-9545-c4346b7b583d"
      ]
   }
}
dl_cmd4 = {
     "type": 102,
     "seq": 4,
     "data" : {
      "local_files" : [
         "~/agent_download/1/209/0_hi85test_shrb_day.so",
         "~/agent_download/1/209/0_a42ee826-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/209/1_hi84test_shrb_day.so",
         "~/agent_download/1/209/1_a42ee826-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/209/2_hi52atest_shrb_day.so",
         "~/agent_download/1/209/2_a42ee826-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/209/3_hi51atest_shrb_day.so",
         "~/agent_download/1/209/3_a42ee826-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/209/4_hi55test_shrb_day.so",
         "~/agent_download/1/209/4_a42ee826-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/209/5_hi52test_shrb_day.so",
         "~/agent_download/1/209/5_a42ee826-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/209/6_hi51test_shrb_day.so",
         "~/agent_download/1/209/6_a42ee826-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/209/7_hi50test_shrb_day.so",
         "~/agent_download/1/209/7_a42ee826-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/209/8_hi5test_shrb_day.so",
         "~/agent_download/1/209/8_a42ee826-0d38-11e6-9545-c4346b7b583d"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shrb/hi85test_shrb_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a42ee826-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shrb/hi84test_shrb_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a42ee826-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shrb/hi52atest_shrb_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a42ee826-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shrb/hi51atest_shrb_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a42ee826-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shrb/hi55test_shrb_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a42ee826-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shrb/hi52test_shrb_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a42ee826-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shrb/hi51test_shrb_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a42ee826-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shrb/hi50test_shrb_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a42ee826-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shrb/hi5test_shrb_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a42ee826-0d38-11e6-9545-c4346b7b583d"
      ]
   }

}
dl_cmd5 = {
     "type": 102,
     "seq": 5,
     "data" : {
      "local_files" : [
         "~/agent_download/1/210/0_hi76test_shau_day.so",
         "~/agent_download/1/210/0_a43b357c-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/210/1_hi72test_shau_day.so",
         "~/agent_download/1/210/1_a43b357c-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/210/2_hi52atest_shau_day.so",
         "~/agent_download/1/210/2_a43b357c-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/210/3_hi51atest_shau_day.so",
         "~/agent_download/1/210/3_a43b357c-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/210/4_hi5atest_shau_day.so",
         "~/agent_download/1/210/4_a43b357c-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/210/5_hi51test_shau_day.so",
         "~/agent_download/1/210/5_a43b357c-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/210/6_hi5test_shau_day.so",
         "~/agent_download/1/210/6_a43b357c-0d38-11e6-9545-c4346b7b583d"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shau/hi76test_shau_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a43b357c-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shau/hi72test_shau_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a43b357c-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shau/hi52atest_shau_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a43b357c-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shau/hi51atest_shau_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a43b357c-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shau/hi5atest_shau_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a43b357c-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shau/hi51test_shau_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a43b357c-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shau/hi5test_shau_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a43b357c-0d38-11e6-9545-c4346b7b583d"
      ]
   }
}
dl_cmd6 = {
     "type": 102,
     "seq": 6,
     "data" : {
      "local_files" : [
         "~/agent_download/1/211/0_hi86test_shzn_day.so",
         "~/agent_download/1/211/0_a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/211/1_hi76test_shzn_day.so",
         "~/agent_download/1/211/1_a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/211/2_hi74test_shzn_day.so",
         "~/agent_download/1/211/2_a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/211/3_hi72test_shzn_day.so",
         "~/agent_download/1/211/3_a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/211/4_hi51atest_shzn_day.so",
         "~/agent_download/1/211/4_a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/211/5_hi5atest_shzn_day.so",
         "~/agent_download/1/211/5_a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/211/6_hi55test_shzn_day.so",
         "~/agent_download/1/211/6_a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/211/7_hi52test_shzn_day.so",
         "~/agent_download/1/211/7_a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/211/8_hi5test_shzn_day.so",
         "~/agent_download/1/211/8_a44aabe2-0d38-11e6-9545-c4346b7b583d"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shzn/hi86test_shzn_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shzn/hi76test_shzn_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shzn/hi74test_shzn_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shzn/hi72test_shzn_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shzn/hi51atest_shzn_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shzn/hi5atest_shzn_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shzn/hi55test_shzn_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shzn/hi52test_shzn_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a44aabe2-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shzn/hi5test_shzn_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a44aabe2-0d38-11e6-9545-c4346b7b583d"
      ]
   }
}
dl_cmd7 = {
     "type": 102,
     "seq": 7,
     "data" : {
      "local_files" : [
         "~/agent_download/1/212/0_hi52atest_shru_day.so",
         "~/agent_download/1/212/0_a45ad274-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/212/1_hi51atest_shru_day.so",
         "~/agent_download/1/212/1_a45ad274-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/212/2_hi55test_shru_day.so",
         "~/agent_download/1/212/2_a45ad274-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/212/3_hi52test_shru_day.so",
         "~/agent_download/1/212/3_a45ad274-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/212/4_hi51test_shru_day.so",
         "~/agent_download/1/212/4_a45ad274-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/212/5_hi50test_shru_day.so",
         "~/agent_download/1/212/5_a45ad274-0d38-11e6-9545-c4346b7b583d"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shru/hi52atest_shru_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a45ad274-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shru/hi51atest_shru_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a45ad274-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shru/hi55test_shru_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a45ad274-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shru/hi52test_shru_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a45ad274-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shru/hi51test_shru_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a45ad274-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shru/hi50test_shru_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a45ad274-0d38-11e6-9545-c4346b7b583d"
      ]
   }
}
dl_cmd8 = {
     "type": 102,
     "seq": 8,
     "data" : {
      "local_files" : [
         "~/agent_download/1/213/0_hi76test_shag_day.so",
         "~/agent_download/1/213/0_a467a986-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/213/1_hi51atest_shag_day.so",
         "~/agent_download/1/213/1_a467a986-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/213/2_hi52test_shag_day.so",
         "~/agent_download/1/213/2_a467a986-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/213/3_hi51test_shag_day.so",
         "~/agent_download/1/213/3_a467a986-0d38-11e6-9545-c4346b7b583d"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shag/hi76test_shag_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a467a986-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shag/hi51atest_shag_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a467a986-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shag/hi52test_shag_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a467a986-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shag/hi51test_shag_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a467a986-0d38-11e6-9545-c4346b7b583d"
      ]
   }
}

dl_cmd9 = {
     "type": 102,
     "seq": 9,
     "data" : {
      "local_files" : [
         "~/agent_download/1/214/0_hi85test_shhc_day.so",
         "~/agent_download/1/214/0_a476aada-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/214/1_hi5atest_shhc_day.so",
         "~/agent_download/1/214/1_a476aada-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/214/2_hi55test_shhc_day.so",
         "~/agent_download/1/214/2_a476aada-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/214/3_hi52test_shhc_day.so",
         "~/agent_download/1/214/3_a476aada-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/214/4_hi51test_shhc_day.so",
         "~/agent_download/1/214/4_a476aada-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/214/5_hi5test_shhc_day.so",
         "~/agent_download/1/214/5_a476aada-0d38-11e6-9545-c4346b7b583d"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shhc/hi85test_shhc_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a476aada-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shhc/hi5atest_shhc_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a476aada-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shhc/hi55test_shhc_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a476aada-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shhc/hi52test_shhc_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a476aada-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shhc/hi51test_shhc_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a476aada-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shhc/hi5test_shhc_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a476aada-0d38-11e6-9545-c4346b7b583d"
      ]
   }
}

dl_cmd10 = {
     "type": 102,
     "seq": 10,
     "data" : {
      "local_files" : [
         "~/agent_download/1/215/0_hi86test_shni_day.so",
         "~/agent_download/1/215/0_a4870880-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/215/1_hi85test_shni_day.so",
         "~/agent_download/1/215/1_a4870880-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/215/2_hi55test_shni_day.so",
         "~/agent_download/1/215/2_a4870880-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/215/3_hi52test_shni_day.so",
         "~/agent_download/1/215/3_a4870880-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/215/4_hi51test_shni_day.so",
         "~/agent_download/1/215/4_a4870880-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/215/5_hi27test_shni_day.so",
         "~/agent_download/1/215/5_a4870880-0d38-11e6-9545-c4346b7b583d"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shni/hi86test_shni_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a4870880-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shni/hi85test_shni_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a4870880-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shni/hi55test_shni_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a4870880-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shni/hi52test_shni_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a4870880-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shni/hi51test_shni_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a4870880-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shni/hi27test_shni_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a4870880-0d38-11e6-9545-c4346b7b583d"
      ]
   }
}
dl_cmd11 = {
     "type": 102,
     "seq": 11,
     "data" : {
      "local_files" : [
         "~/agent_download/1/216/0_hi86test_shal_day.so",
         "~/agent_download/1/216/0_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/1_hi84test_shal_day.so",
         "~/agent_download/1/216/1_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/2_hi76test_shal_day.so",
         "~/agent_download/1/216/2_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/3_hi75test_shal_day.so",
         "~/agent_download/1/216/3_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/4_hi73test_shal_day.so",
         "~/agent_download/1/216/4_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/5_hi52atest_shal_day.so",
         "~/agent_download/1/216/5_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/6_hi51atest_shal_day.so",
         "~/agent_download/1/216/6_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/7_hi5atest_shal_day.so",
         "~/agent_download/1/216/7_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/8_hi55test_shal_day.so",
         "~/agent_download/1/216/8_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/9_hi52test_shal_day.so",
         "~/agent_download/1/216/9_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/10_hi51test_shal_day.so",
         "~/agent_download/1/216/10_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/11_hi50test_shal_day.so",
         "~/agent_download/1/216/11_a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "~/agent_download/1/216/12_hi5test_shal_day.so",
         "~/agent_download/1/216/12_a49a38ce-0d38-11e6-9545-c4346b7b583d"
      ],
      "remote_files" : [
         "/mnt/data/LiveSo/20160428/shal/hi86test_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi84test_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi76test_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi75test_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi73test_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi52atest_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi51atest_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi5atest_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi55test_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi52test_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi51test_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi50test_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d",
         "/mnt/data/LiveSo/20160428/shal/hi5test_shal_day.so",
         "/home/rss/colin/rss/src/rss/site/media/so_config/8/1/a49a38ce-0d38-11e6-9545-c4346b7b583d"
      ]
   }
}


import os
import re
def delete_file_folder(src):  
    '''delete files and folders'''
    if os.path.isfile(src):
        try:
            os.remove(src)
        except:
            pass
    elif os.path.isdir(src):
        for item in os.listdir(src):
            itemsrc=os.path.join(src,item)
            delete_file_folder(itemsrc)
        try:
            os.rmdir(src)
        except:
            pass

def file_exsit_check(files):
    for f in files:
        f = re.sub('^~', os.path.expanduser("~"), f)
        if os.path.isfile(f):
            print f, "exsit"
        else:
            print f, "not exist"

# print "delete all local files"
# delete_file_folder("/home/rss/workspace/download/")

# print "before download task check"
# file_exsit_check(dl_cmd["data"]["local_files"])

def test_download_py():
    for idx in range(1, 660):
        for ydx in range(0, 22):
            dl_cmd1["data"]["local_files"][ydx] = "{0}{1}".format(dl_cmd2["data"]["local_files"][ydx], idx)
        print dl_cmd1["data"]["local_files"][0]

        ret = main(json.dumps(ser_cfg), json.dumps(dl_cmd1))
        js = json.loads(ret)
        print js["data"]["msg"], "idx=", idx


def func_write_test():
    import redis
    redis_config = {
        "host": "192.168.3.10",
        "port": 6379,
        "db": 0
    }
    reids_key = "a:rss:cmd:192.168.3.10(debian-rss)"

    mconn = redis.client.StrictRedis(**redis_config)

    for idx in range(1, 600):
        for ydx in range(0, 11):
            dl_cmd1["data"]["local_files"][ydx] = "{0}{1}".format(dl_cmd2["data"]["local_files"][ydx], idx)
        print dl_cmd1["data"]["local_files"][0]
        mconn.rpush(reids_key, json.dumps(dl_cmd1))


if __name__ == "__main__":
    func_write_test()
