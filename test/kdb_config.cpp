int
read_kdb_to_conf_handler(kdb_connector_conf_t *kdb_conn,const char *trader_config)
{
	int ret, count, row, col;
	char sql_buf[SQL_MAX_LEN];
	unsigned long res_set;
	char local_host[NAME_MAX];
	get_agent_ip(local_host, sizeof(local_host));
	sprintf(sql_buf,
			"select from TradeConfig where host=`%s,ref_conf_path=~%s"
            "time=(max;time) fby conf_path ",
			trader_config, local_host);

	pthread_mutex_lock(&my_write_conf.lock);
	kc_exec_sql_(&kdb_conn->handler, sql_buf, &res_set, &ret);
	if(ret == 0) {
		kc_res_count_(&res_set, &count);
		my_write_conf.count = 0;
		for(row = 0; row < count; row++) {
			trade_conf_kdb_item_t *item = &my_write_conf.items[row];
			col = 0;
			fprintf(stdout, "time = %ld ", kc_get_table_timestamp_(&res_set, &row, &col));
			col++;
			fprintf(stdout, "symbol = %s ", kc_get_table_symbol_(&res_set, &row, &col));
			col++;
			fprintf(stdout, "backupdate = %d ", kc_get_table_date_(&res_set, &row, &col));
			col++;
			fprintf(stdout, "backuptime = %d ", kc_get_table_time_(&res_set, &row, &col));
			col++;
			fprintf(stdout, "day_night = %hd ", kc_get_table_short_(&res_set, &row, &col));
			col++;
			fprintf(stdout, "trade_type = %hd ", kc_get_table_short_(&res_set, &row, &col));
			col++;
			fprintf(stdout, "host = %s ", kc_get_table_symbol_(&res_set, &row, &col));
			col++;
			fprintf(stdout, "conf_path = %s ", kc_get_table_string_(&res_set, &row, &col));
			snprintf(item->conf_path, sizeof(item->conf_path),
					 kc_get_table_string_(&res_set, &row, &col));
			col++;
			fprintf(stdout, "conf_type = %hd ", kc_get_table_short_(&res_set, &row, &col));
			col++;
			fprintf(stdout, "ref_conf_path = %s ", kc_get_table_string_(&res_set, &row,
					&col));
			col++;
			fprintf(stdout, "ref_conf_field = %s ", kc_get_table_string_(&res_set, &row,
					&col));
			col++;
			fprintf(stdout, "conf_content = %s\n\n", kc_get_table_string_(&res_set, &row,
					&col));
			char *content = (char *)malloc(sizeof(char) * MAX_CONFIG_SIZE);
			sprintf(content, "%s", kc_get_table_string_(&res_set, &row, &col));
			item->conf_content = content;
			my_write_conf.count++;
		}
		kc_res_put_(&res_set);
	} else {
		log_error("kc_query tradeconfig failed, ret= %d", ret);
	}
	printf("out of the function\n");
	trader_conf_write(my_write_conf.items, &my_write_conf.count);
	pthread_mutex_unlock(&my_write_conf.lock);
}

