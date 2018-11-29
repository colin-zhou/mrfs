# -*- coding: utf-8 -*-

import datetime


def fmt_alchemy_attr(self):
    """
    convert each column of sql alchemy orm table to dictionary(drop the decimal field)
    """
    dump_dict = {}
    for attr in [attr for attr in dir(self) if not attr.startswith('_') and not attr.startswith('get_')]:
        value = getattr(self, attr)
        if isinstance(value, float):
            value = round(value, 3)
        if isinstance(value, decimal.Decimal):
            value = round(float(value), 3)
        dump_dict.update({attr: value})
    return dump_dict


def fmt_ctp_datetime(ctp_date, ctp_time):
    """
    ctp_date in 20180101 fmt and ctp_time in %H:%M:%S format, this will convert
    them into a python datetime.datetime data type and return it or return ''
    """
    try:
        if isinstance(ctp_date, bytes):
            ctp_date = ctp_date.decode()
        if isinstance(ctp_time, bytes):
            ctp_time = ctp_time.decode()
        ctp_datetime = '%s %s' % (ctp_date, ctp_time)
        fmt_datetime = datetime.datetime.strptime(ctp_datetime, '%Y%m%d %H:%M:%S')
        return fmt_datetime
    except ValueError:
        return ''
