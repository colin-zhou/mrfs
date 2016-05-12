cdef char *my_cstr
    # day_night
    if my_capital_path.find("night") != -1:
        item[0].day_night = day_type
    else
        item[0].day_night = night_type
    
    # date and time
    now = datetime.datetime.now()
    time = now.time()
    py_date = now.strftime("%Y.%m.%d")
    py_time = "{0}:{1}.{2}".format(time.strftime("%H:%M"),time.second,time.microsecond / 1000)
    my_cstr = py_date
    strncpy(item[0].date, my_cstr, sizeof(item[0].date))
    my_cstr = py_time
    strncpy(item[0].time, my_cstr, sizeof(item[0].time))
    # trade_type
    if py_obj["MyExchange"]["strategies"]["strategy"][0]["@isOption"] == "0":
        if py_obj["MyExchange"]["quote"]["source"]["@category"] == "stock":
            item[0].trade_type = trade_type_stock
        else:
            item[0].trade_type = trade_type_futures
    else:
        item[0].trade_type = trade_type_option