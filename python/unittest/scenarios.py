import mock
import requests
import testscenarios

class WhereIsPythonError(Exception):
    pass

def is_python_still_a_programming_language():
    r = requests.get("http://python.org")
    if r.status_code == 200:
        return 'Python is a programming language' in r.content
    raise WhereIsPythonError("something bad happened")

def get_fake_get(status_code, content):
    m = mock.Mock()
    m.status_code = status_code
    m.content = content
    def fake_get(url):
        return m
    return fake_get

class TestPythonErrorCode(testscenarios.TestWithScenarios):
    scenarios = [
            ('not found', dict(status=404)),
            ('client error', dict(status=400)),
            ('server error', dict(status=500)),
            ]
    def test_python_status_code_handling(self):
        with mock.patch('requests.get', get_fake_get(
                        self.status,
                        'python is programming language for sure')):
            self.assertRaises(WhereIsPythonError,
                              is_python_still_a_programming_language)
