# encoding=utf-8
# copy from: http://zoulc001.iteye.com/blog/1186962

import urllib2
import urllib
import cookielib


def renren_brower(url, user, password):
    # 登陆页面，可以通过抓包工具分析获得，如fiddler，wireshark
    login_page = "http://www.renren.com/PLogin.do"
    try:
        # 获得一个cookieJar实例
        cj = cookielib.CookieJar()
        # cookieJar作为参数，获得一个opener的实例
        opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
        # 伪装成一个正常的浏览器，避免有些web服务器拒绝访问。
        opener.addheaders = [('User-agent', 'Mozilla/4.0 (compatible; MSIE 6.0;\
                             Windows NT 5.1)')]
        # 生成Post数据，含有登陆用户名密码。
        data = urllib.urlencode({"email": user, "password": password})
        # 以post的方法访问登陆页面，访问之后cookieJar会自定保存cookie
        opener.open(login_page, data)
        # 以带cookie的方式访问页面
        op = opener.open(url)
        # 读取页面源码
        data = op.read()
        print data
        return data
    except Exception, e:
        print str(e)

# 访问某用户的个人主页，其实这已经实现了人人网的签到功能。
if __name__ == "__main__":
    print renren_brower("http://www.renren.com/home", "15116333446",
                        "66961891zcl")
