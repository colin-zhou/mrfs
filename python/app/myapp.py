# -*- coding: utf-8 -*-


import Queue
import hashlib
import json
import os
import subprocess
import threading
from collections import OrderedDict

from data.config import QSERVER_ROOT_PATH, APPTOOL_FILE_PATH
from data.mysql.base_table import AppTool


class AsynchronousFileReader(threading.Thread):
    """
    Helper class to implement asynchronous reading of a file
    in a separate thread. Pushes read lines on a queue to
    be consumed in another thread.
    """

    def __init__(self, fd, queue):
        assert isinstance(queue, Queue.Queue)
        assert callable(fd.readline)
        threading.Thread.__init__(self)
        self._fd = fd
        self._queue = queue

    def run(self):
        """The body of the tread: read lines and put them on the queue."""
        for line in iter(self._fd.readline, ''):
            self._queue.put(line)

    def eof(self):
        """Check whether there is no more content to expect."""
        return not self.is_alive() and self._queue.empty()


class AppLoader(object):
    """
    load app tool and execute it with subprocess and capture the print info return to the invoker
    """
    type_argu_map = {
        "r": {"workpath": QSERVER_ROOT_PATH, "command": "Rscript"},
        "php": {"workpath": APPTOOL_FILE_PATH, "command": "php"},
        "py": {"workpath": APPTOOL_FILE_PATH, "command": "python"}
    }

    def __init__(self, mysql_session):
        self.mysql_session = mysql_session
        self.result = {}
        self.print_info = ""

    @staticmethod
    def get_md5(chunksize, filename):
        hash_md5 = hashlib.md5()
        with open(filename, "rb") as f:
            for chunk in iter(lambda: f.read(chunksize), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()

    def _async_run(self, command, cwd):
        """
        Example of how to consume standard output and standard error of
        a subprocess asynchronously without risk on deadlocking.
        """
        data_lines = []
        # Launch the command as subprocess.
        process = subprocess.Popen(command, stdout=subprocess.PIPE, cwd=cwd)
        # Launch the asynchronous readers of the process' stdout and stderr.
        stdout_queue = Queue.Queue()
        stdout_reader = AsynchronousFileReader(process.stdout, stdout_queue)
        stdout_reader.start()
        # Check the queues if we received some output (until there is nothing more to get).
        while not stdout_reader.eof():
            # Show what we received from standard output.
            while not stdout_queue.empty():
                line = stdout_queue.get()
                data_lines.append(line)
            yield True # just return now
        # Let's be tidy and join the threads we've started.
        self.print_info = "".join(data_lines)
        stdout_reader.join()
        # Close subprocess' file descriptors.
        process.stdout.close()

    def get_result(self):
        return self.result

    def _arrange_result(self, file_type):
        try:
            json_data = json.loads(self.print_info, object_pairs_hook=OrderedDict)
        except Exception as err:
            return self._fill_result(False, "APP print info with error format: %s" % str(err))
        if file_type == "py":
            data = OrderedDict()
            for key in json_data.keys():
                data[key] = json_data[key].values()
                self.result['data'] = data
        else:
            if not isinstance(json_data[json_data.keys()[0]], list):
                data = OrderedDict()
                for key in json_data.keys():
                    data[key] = [json_data[key]]
                self.result['data'] = data
        self.result['code'] = 0

    def _fill_result(self, code, err_msg):
        self.result['code'] = code
        self.result['data'] = err_msg
        if code != 0:
            raise RuntimeError("app execute failed")

    # reference： http://stefaanlippens.net/python-asynchronous-subprocess-pipe-reading/
    def run(self, method_id, dates, arguments):
        """
        :param method_id: the app id
        :param dates: run date, it is a list
        :param arguments: arguments pass to the app script, it is a list a~s well
        :return result: fill the result info into json
        :return: it is a iterable object
        """
        try:
            app = self.mysql_session.query(AppTool).filter(AppTool.id == method_id).all()
            if not app:
                self._fill_result(False, "APP not found in mysql id: %d" % method_id)
            else:
                app = app[0]
            if app.file_type not in AppLoader.type_argu_map:
                self._fill_result(False, "APP type not support")
            file_path = os.path.join(APPTOOL_FILE_PATH, app.checksum)
            exec_arguments = AppLoader.type_argu_map[app.file_type]
            print ("mycommand:", exec_arguments["command"])
            exec_cmd = [exec_arguments["command"], file_path] + dates + arguments
            try:
                # print_info = subprocess.check_output(exec_cmd, universal_newlines=True, \
                #                                       cwd=exec_arguments["workpath"])
                for _ in self._async_run(exec_cmd, exec_arguments['workpath']):
                    yield 1
            except Exception as err:
                self._fill_result(False, "APP Runs failed: %s" % err)
            if len(self.result) == 0 or '[]' in self.result or '{}' in self.result:
                self._fill_result(False, "APP print info error")
            self._arrange_result(app.file_type)
        except RuntimeError:
            pass


if __name__ == "__main__":
    # os.chdir("/Users/colin/Git/bss_server/data/upload/AnalysisTool")
    # print AppLoader.get_md5(4096, "model_setting_converter.py")
    from data.mysql.mysql_hdl import session
    sc = session()
    al = AppLoader(sc)
    for x in al.run(1, ['2017.04.27'], ['0']):
        pass
    print (al.get_result())
