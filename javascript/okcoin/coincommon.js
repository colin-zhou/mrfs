//多语言
//多语言获取币种符号
function getCurrencySymbol(){
    var tmp=1;
    if(typeof site_flag=="undefined"||!site_flag){
        tmp= +jQuery("#footsetFlag").val();
        site_flag=tmp;
    }else{
        tmp=site_flag;
    }
    return tmp==2?"$":"￥";
}
var cnyOrUsdSymbol = getCurrencySymbol();
var cnyOrUsdStr = cnyOrUsdSymbol == "$"?"USD":"CNY";
//点击按钮后的动态效果定时策略
var circulatePointTimer = null;

function get$(id){
	if(languageJson==null){
        return "";

	}else{
        if(languageJson[id]!=null){
            return languageJson[id];
        }else{
             if(document.getElementById(id)!=null){
                 return document.getElementById(id).value;
             }
        }
	}
};
//account-fin.js
var minimum1000 = get$("minimum1000"),//最小充值金额为1000元
pleaseselectabank = get$("pleaseselectabank"),//请选择银行
thedepositinvalid = get$("thedepositinvalid"),//充值金额不合法
pleaseentertheamount = get$("pleaseentertheamount"),//请输入金额
areyousureremittedus = get$("areyousureremittedus"),//您确定已经登陆网银给我们汇款了么？
completeinformation = get$("completeinformation"),//请填写完整信息！
remarkbeenused = get$("remarkbeenused"),//这个备注已经被使用！
forremitting = get$("forremitting"),//进行汇款
go = get$("go"),//前往
thecodeformatincorrect = get$("thecodeformatincorrect"),//验证码格式不正确
adminandlogincantmatch = get$("adminandlogincantmatch"),//资金密码与登陆密码不能相同！

rechargeusdamount = get$("rechargeusdamount"),//金额不能为空
rechargeusdsubsuccess = get$("rechargeusdsubsuccess"),//提交成功
rechargeusdsubfailure = get$("rechargeusdsubfailure"),//提交失败
rechargeusdillegal = get$("rechargeusdillegal"),//参数错误，非法请求
rechargeusdcertificate = get$("rechargeusdcertificate"),//身份认证未通过，不能充值
rechargeusdmaxlimit = get$("rechargeusdmaxlimit"),//充值金额大于每日充值限制
rechargeusdcancel = get$("rechargeusdcancel"),//取消充值成功
rechargeusdfailure = get$("rechargeusdfailure"),//充值失败
rechargeusdsuccess = get$("rechargeusdsuccess"),//充值成功
waitDeal = get$("waitDeal"),//等待成交
trade_entrust_ten_partfulfilled =get$("trade_entrust_ten_partfulfilled"),//部分成交
details =get$("details"),//查看
emptytaleentrust =get$("emptytaleentrust"),//查看
trade_entrust_ten_cancel = get$("trade_entrust_ten_cancel"),//撤销
rechargeusdsubmitted = get$("rechargeusdsubmitted"),//提交成功。请您到新打开第三方支付页面上进行支付。
rechargeusdcheck = get$("rechargeusdcheck"),//若未见新打开的支付页面，为已被浏览器拦截，请检查。
trade_entrust_ten_fulfilled=get$("trade_entrust_ten_fulfilled"),
//account-index.js
available1	= get$("available1"),//可用
balanceinsufficient	= get$("balanceinsufficient"),//您的余额不足！
setwithdrawaladdress = get$("setwithdrawaladdress"),//请设置提现地址
setwithdrawaladdressbtc = get$("setwithdrawaladdressbtc"),//请设置币地址
settheminerfee = get$("settheminerfee"),//请设置网络服务费
reenteramount = get$("reenteramount"),//请重新输入金额
feecantincludecharacters = get$("feecantincludecharacters"),//您输入的手续费有误，手续费不能包含字母，特殊符号！
minimumcoinwithdrawal = get$("minimumcoinwithdrawal"),//最小提币金额为
entertransactionpassword = get$("entertransactionpassword"),//请输入资金密码
maximumfee = get$("maximumfee"),//最高手续费为
minimumfee = get$("minimumfee"),//最低手续费为
entergooglecode = get$("entergooglecode"),//请输入谷歌验证码
entersmscode = get$("entersmscode"),//请输入短信验证码
linkedphonegoogletoaccount = get$("linkedphonegoogletoaccount"),//您没有绑定手机或谷歌验证，请去安全中心绑定手机或谷歌验证后提现。
toomanyincorrectattempts = get$("toomanyincorrectattempts"),//资金密码错误多次，请2小时后再试！
transactionpasswordwrong = get$("transactionpasswordwrong"),//资金密码不正确！
youhave = get$("youhave"),//您还有
chancesleft = get$("chancesleft"),//次机会
counterspl = get$("counterspl"),//您还有
countersplr = get$("countersplr"),//次机会
withdrawaladdresscannotempty = get$("withdrawaladdresscannotempty"),//提现地址不能为空！
exceededdailywithdrawallimit = get$("exceededdailywithdrawallimit"),//您的提现金额已超过今日提现限额，请重新输入
exceededgooglecodeattempts = get$("exceededgooglecodeattempts"),//谷歌验证码错误多次，请2小时后再试！
googlecodeincorrect = get$("googlecodeincorrect"),//谷歌验证码错误！
smscodewrongmuchtime = get$("smscodewrongmuchtime"),//短信验证码错误多次，请2小时后再试！
smsisincorrect = get$("smsisincorrect"),//短信验证码错误！
googlecodeformatincorrect = get$("googlecodeformatincorrect"),//谷歌验证码格式不正确
smscodeformatincorrect = get$("smscodeformatincorrect"),//短信验证码格式不正确
accountlockedsecurityreasons = get$("accountlockedsecurityreasons"),//账户出现安全隐患已被冻结，请尽快联系客服处理
accounthasopenloans = get$("accounthasopenloans"),//账户有借款，请撤消借款或者还清借款后提现。
maximumminerfee = get$("maximumminerfee"),//最高网络手续费为
minimumminerfee = get$("minimumminerfee"),//最低网络手续费为
insufficient = get$("insufficient"),//不足
notprocesswithdrawal = get$("notprocesswithdrawal"),//无法进行提币操作
googlecodebeenused = get$("googlecodebeenused"),//此谷歌验证码已使用,请稍后再试
fillinbankcardx = get$("fillinbankcardx"),//请设置银行卡提现信息
enterwithdrawalamount = get$("enterwithdrawalamount"),//请输入提现金额
minimumwithdrawa100 = get$("minimumwithdrawa100"),//最小提现金额为：￥100元
minimumwithdrawa100_com = get$("minimumwithdrawa100_com"),//最小提现金额为：$20
selectwithdrawalmethod = get$("selectwithdrawalmethod"),//请选择提现方式
bankaccountcannotempty = get$("bankaccountcannotempty"),//账户名称不能为空！
namesdontmatch = get$("namesdontmatch"),//提现姓名与实名姓名不符
withdrawalbankaccountslow = get$("withdrawalbankaccountslow"),//您所绑定的银行卡提现到账缓慢，我们建议您更换银行卡。
withdrawalbankaccountslow2 = get$("withdrawalbankaccountslow2"),
pleaseonlyenternumbers = get$("pleaseonlyenternumbers"),//请输入数字，您输入的不是纯数字
useup8decimalplaces = get$("useup8decimalplaces"),//小数点后面仅可以保留八位小数
oopsmadeamistake = get$("oopsmadeamistake"),//您输入的网络手续费有误，网络手续费中不能包含字母，特殊字符！
withdrawalamountisinvalid= get$("withdrawalamountisinvalid"),//你输入的提币金额不合法，应该大于0！
minerfeedeductedfromwithdrawal= get$("minerfeedeductedfromwithdrawal"),//手续费将从提现金额中扣除，实际提币金额为
availabletowithdraw = get$("availabletowithdraw"),//可提取的
minimumofminwithdrawa = get$("minimumofminwithdrawa"),//小于最小提币金额
withdrawalnotbeprocessed = get$("withdrawalnotbeprocessed"),//无法提币
availablecnyisinsufficient = get$("availablecnyisinsufficient"),//可用CNY不足，无法完成提现操作
notavalidbtcaddress = get$("notavalidbtcaddress"),//输入的地址不是一个合法的btc地址
notavalidltcaddress = get$("notavalidltcaddress"),//输入的地址不是一个合法的ltc地址
surecancelwithdrawal = get$("surecancelwithdrawal"),//确定撤销提现么？
recipientsnamenotvalid = get$("recipientsnamenotvalid"),//收款人姓名不合法
reenterbanknumber = get$("reenterbanknumber"),//请再次输入银行卡账号:
nothavephonelinked = get$("nothavephonelinked"),//您没有绑定手机
getverificationcodetimedout = get$("getverificationcodetimedout"),//验证码获取超时，请稍后再试。
resendin5sec = get$("resendin5sec"),//秒后可重发
selectbanktype = get$("selectbanktype"),//请选择银行类型
enterwithdrawbankaccount = get$("enterwithdrawbankaccount"),//请输入提现帐户
bankaccountsnotmatch = get$("bankaccountsnotmatch"),//两次输入的帐户不一致
enterholdersname = get$("enterholdersname"),//请输入收款人姓名
havephoneorgooglelinkedaccount = get$("havephoneorgooglelinkedaccount"),//您没有绑定谷歌或者手机不允许操作
alreadywithdrawnaddress = get$("alreadywithdrawnaddress"),//您已经存在提现地址，不允许再次添加
didntsavewithdrawaladdress = get$("didntsavewithdrawaladdress"),//您没保存提现地址，不能修改
operationfailed = get$("operationfailed"),//操作失败，请刷新页面重试
exceededmaximumrequests = get$("exceededmaximumrequests"),//请求过于频繁，请30分钟后重试。
buypriceonepercent = get$("buypriceonepercent"),//您当前买单价格高于卖一价1%，您是否确定下单？
sellpriceonepercent = get$("sellpriceonepercent"),//您当前卖单价格低于买一价1%，您是否确定下单？
ensureexpottoexcel = get$("ensureexpottoexcel"),
//account-rechargeCode.js

rechargecodeacantempty= get$("rechargecodeacantempty"),//充值码A段不能为空！
rechargecodeincorrect= get$("rechargecodeincorrect"),//充值码错误
youhaveonly= get$("youhaveonly"),//您剩余
attemptsleft= get$("attemptsleft"),//次机会
indexNoData= get$("indexNoData"),//次机会
rechargecodebeenchecked= get$("rechargecodebeenchecked"),//该OK充值码一小时内有过查询记录，目前为查询冻结状态，暂无查询信息！
rechargecodeused= get$("rechargecodeused"),//该OK充值码已充值！
accountbeenfrozen= get$("accountbeenfrozen"),//该用户已被冻结！
muchtimewrongquery= get$("muchtimewrongquery"),//由于多次错误查询，您已被冻结查询，请2小时后尝试查询！
rechargecodeacannotempty= get$("rechargecodeacannotempty"),//充值码A不能为空！
rechargecodebcannotempty= get$("rechargecodebcannotempty"),//充值码B不能为空！
filloutallinformation= get$("filloutallinformation"),//请填写完整信息！
rechargecodeisincorrect= get$("rechargecodeisincorrect"),//充值码错误，充值失败，您剩余2次机会
depositfailedfrozen= get$("depositfailedfrozen"),//充值失败。该充值码当前为查询冻结状态，您非查询用户，不能进行充值！
depositfailedused= get$("depositfailedused"),//充值失败，该充值码已充值
depositsuccessful= get$("depositsuccessful"),//您已成功充值
yuan= get$("yuan"),//元
contactsellerconfirm= get$("contactsellerconfirm"),//请联系卖家确认充值！
suretodeposit= get$("suretodeposit"),//是否确认充值！
depositunvaible= get$("depositunvaible"),//该充值无效！
transactionpasswordcantempty= get$("transactionpasswordcantempty"),//资金密码不能为空！
smscannotempty= get$("smscannotempty"),//短信验证码不能为空！
googlecannotempty= get$("googlecannotempty"),//谷歌验证码不能为空！
notrepeatedlyconfirm= get$("notrepeatedlyconfirm"),//请勿重复确认！
rechargecodenotexist= get$("rechargecodenotexist"),//该充值码不存在！
rechargecodeinvalid= get$("rechargecodeinvalid"),//该充值码无效！
depositfailedcontact= get$("depositfailedcontact"),//充值失败，请联系客服人员！
wrongmuchtimelater= get$("wrongmuchtimelater"),//您的交易密码错误次数过多，请稍后再试！
transactionpasswordisincorrect= get$("transactionpasswordisincorrect"),//交易密码错误！
googlecodeisincorrect= get$("googlecodeisincorrect"),//谷歌验证码错误
smscodeisincorrect= get$("smscodeisincorrect"),//短信验证码错误
remaining= get$("remaining"),//剩余
chances3= get$("chances3"),//次
googlecodesformatincorrect= get$("googlecodesformatincorrect"),//谷歌验证码格式错误！
sscodesformatincorrect= get$("sscodesformatincorrect"),//短信验证码格式错误！
withdrawalcantexceedbalance= get$("withdrawalcantexceedbalance"),//提现金额不能大于人民币余额！
transactionpasswordcantempty= get$("transactionpasswordcantempty"),//交易密码不能为空！
smscodecantempty= get$("smscodecantempty"),//手机验证码不能为空！
transactionpasswordisincorrect= get$("transactionpasswordisincorrect"),//资金密码错误！
accounthasbeenfrozen= get$("accounthasbeenfrozen"),//该用户被冻结！
haveoutstandingloans= get$("haveoutstandingloans"),//您还存在借款未还清，暂不能提现！
withdrawalexceedsbalance= get$("withdrawalexceedsbalance"),//取现金额大于账户剩余金额！
maximumwithdrawal100w= get$("maximumwithdrawal100w"),//最大提现金额为1000000！
minimumwithdrawalq100yuan= get$("minimumwithdrawalq100yuan"),//最小提现金额为100！
googlecodealreadyused= get$("googlecodealreadyused"),//此谷歌验证码已使用,请稍后再试
successful= get$("successful"),//生成成功
googlecodecantempty= get$("googlecodecantempty"),//谷歌验证码不能为空！
noinformationaboutvendor= get$("noinformationaboutvendor"),//暂无代理商相关信息！
usdcouldnotbeempty = get$("usdcouldnotbeempty"),//不能为空！
benificiaryaddress = get$("benificiaryaddress"),//benificiary address！
usdnameofbank = get$("usdnameofbank"),//usd提现银行名称
usdbankaddress = get$("usdbankaddress"),//usd提现银行地址
usdcouldnotpassthrough = get$("usdcouldnotpassthrough"),//非法请求,不能通过
minimumwithdrawa15_com = get$("minimumwithdrawa15_com"),//usd最小$15
//coincommon.js
coincommonjs1=get$("coincommonjs1"),//提示
coincommonjs2=get$("coincommonjs2"),//关闭
coincommonjs3=get$("coincommonjs3"),//取消
coincommonjs4=get$("coincommonjs4"),//用户名或密码错误
coincommonjs5=get$("coincommonjs5"),//此ip登录频繁，请2小时后再试
youhave = get$("youhave"),//您还有
chancesleft = get$("chancesleft"),//次机会
coincommonjs7=get$("coincommonjs7"),//您的浏览器还未开启COOKIE,请设置启用COOKIE功能
coincommonjs8=get$("coincommonjs8"),//账户出现安全隐患被冻结，请尽快联系客服。
coincommonjs9=get$("coincommonjs9"),//邮箱格式不正确
coincommonjs10=get$("coincommonjs10"),//邮箱不能为空
coincommonjs11=get$("coincommonjs11"),//密码不能为空
coincommonjs12=get$("coincommonjs12"),//密码长度不能小于6！
coincommonjs13=get$("coincommonjs13"),//手机号
coincommonjs14=get$("coincommonjs14"),//没有手机号？
coincommonjs15=get$("coincommonjs15"),//用邮箱注册
coincommonjs16=get$("coincommonjs16"),//请输入11位数字
coincommonjs17=get$("coincommonjs17"),//电子邮箱:
coincommonjs18=get$("coincommonjs18"),//没有电子邮箱？
coincommonjs19=get$("coincommonjs19"),//用手机注册
coincommonjs20=get$("coincommonjs20"),//请输入你的常用邮箱
coincommonjs21=get$("coincommonjs21"),//手机号包含空格!
coincommonjs22=get$("coincommonjs22"),//请您输入手机号!
coincommonjs23=get$("coincommonjs23"),//手机号格式不正确
coincommonjs24=get$("coincommonjs24"),//邮箱不能包含空格!
coincommonjs25=get$("coincommonjs25"),//请您输入邮箱!
coincommonjs26=get$("coincommonjs26"),//邮箱格式不正确,请重新输入
coincommonjs27=get$("coincommonjs27"),//含有非法字符
coincommonjs28=get$("coincommonjs28"),//邮箱长度应小于100个字符
coincommonjs29=get$("coincommonjs29"),//请输入真实邮箱
coincommonjs30=get$("coincommonjs30"),//您的手机号已存在，如果这是您自己的手机号
coincommonjs31=get$("coincommonjs31"),//请
coincommonjs32=get$("coincommonjs32"),//联系QQ:2260505979
coincommonjs33=get$("coincommonjs33"),//联系客服
coincommonjs34=get$("coincommonjs34"),//邮箱已存在
coincommonjs35=get$("coincommonjs35"),//请输入密码！
coincommonjs36=get$("coincommonjs36"),//密码长度不能大于16！
coincommonjs37=get$("coincommonjs37"),//再输入一遍新密码！
coincommonjs38=get$("coincommonjs38"),//输入的密码不一致！
coincommonjs39=get$("coincommonjs39"),//这个邮箱名字可能不正确，您确定么？
coincommonjs40=get$("coincommonjs40"),//请填写真实邮箱
coincommonjs41=get$("coincommonjs41"),//实时行情
coincommonjs42=get$("coincommonjs42"),//最小提现金额为
coincommonjs43=get$("coincommonjs43"),//2秒后可重发
coincommonjs44=get$("coincommonjs44"),//发送验证码
coincommonjs45=get$("coincommonjs45"),//为了您的账户安全，请绑定手机或设置谷歌身份验证器！如果您不绑定，您丢失密码后可能会对您的财产造成不必要的损失，本站概不负责。
coincommonjs46=get$("coincommonjs46"),//前往安全中心
coincommonjs47=get$("coincommonjs47"),//请输入邮箱地址
coincommonjs48=get$("coincommonjs48"),//请设置启用COOKIE功能
coincommonjs49=get$("coincommonjs49"),//请正确输入谷歌验证码。
coincommonjs50=get$("coincommonjs50"),//登录验证错误多次，请2小时后再试
coincommonjs51=get$("coincommonjs51"),//登录验证错误
coincommonjs52=get$("coincommonjs52"),//您还有3次机会
coincommonjs53=get$("coincommonjs53"),//此谷歌验证码已使用,请稍后再试
coincommonjs54=get$("coincommonjs54"),//发送语音验证
coincommonjs55=get$("coincommonjs55"),//切换短信验证码
coincommonjs56=get$("coincommonjs56"),//发送验证码
coincommonjs57=get$("coincommonjs57"),//切换语音验证码
cancelAllFutureComfirm=get$("cancelAllFutureComfirm"),//全部撤单确认
enterwithdrawalamount=get$("enterwithdrawalamount"),//请输入提现金额
minimumwithdrawalq100yuan= get$("minimumwithdrawalq100yuan"),//最小提现金额为100！
yuan= get$("yuan"),//元
balanceinsufficient	= get$("balanceinsufficient"),//您的余额不足！
setwithdrawaladdress	= get$("setwithdrawaladdress"),//请设置提现地址
exceededdailywithdrawallimit	= get$("exceededdailywithdrawallimit"),//您的提现金额已超过今日提现限额，请重新输入
smscodewrongmuchtime	= get$("smscodewrongmuchtime"),//短信验证码错误多次，请2小时后再试！
exceededgooglecodeattempts	= get$("exceededgooglecodeattempts"),//谷歌验证码错误多次，请2小时后再试！
accounthasopenloans	= get$("accounthasopenloans"),//账户有借款，请撤消借款或者还清借款后提现.
fillinbankcardx	= get$("fillinbankcardx"),//账户有借款，请撤消借款或者还清借款后提现.
pleaseenteryouremail	= get$("pleaseenteryouremail"),//请输入邮箱地址
googlecodebeenused	= get$("googlecodebeenused"),//此谷歌验证码已使用,请稍后再试
getsmsverificationcode	= get$("getsmsverificationcode"),//发送验证码
invalidusernamepassword	= get$("invalidusernamepassword"),//用户名或密码错误
oksure= get$("oksure"),//确定

//lend-lend.js
lendjs1=get$('lendjs1'),//还款金额不能为0
lendjs2=get$("lendjs2"),//放款账户
lendjs3=get$("lendjs3"),//余额不足
lendjs4=get$("lendjs4"),//公测中，仅供部分用户测试。
lendjs5=get$("lendjs5"),//转入交易账户
lendjs6=get$("lendjs6"),//转入放款账户
lendjs7=get$("lendjs7"),//低于最低转入金额
lendjs8=get$("lendjs8"),//账户出现安全隐患被冻结，请尽快联系客服。
lendjs9=get$("lendjs9"),//您有借款订单未还清或撤销
lendjs10=get$("lendjs10"),//可借
lendjs11=get$("lendjs11"),//放款账户
lendjs12=get$("lendjs12"),//数量不能低于
lendjs13=get$("lendjs13"),//利率低小0
lendjs14=get$("lendjs14"),
    lendjs14_100 =  lendjs14 + "100%",//利率不能高于100%
    lendjs14_50 =   lendjs14 + "1%",//利率不能高于1%
lendjs15=get$("lendjs15"),//借入数量超过最大值
lendjs16=get$("lendjs16"),//根据市场行情波动和风控参数，已经暂时停止新的
lendjs17=get$("lendjs17"),//BTC融币
lendjs18=get$("lendjs18"),//LTC融币
lendjs19=get$("lendjs19"),//CNY融资
lendjs20=get$("lendjs20"),//您目前设置的借款日利率为
lendjs21=get$("lendjs21"),//高于利率
lendjs22=get$("lendjs22"),//低于利率
lendjs23=get$("lendjs23"),//是否确定下单？
lendjs24=get$("lendjs24"),//利率低于0.01%
lendjs25=get$("lendjs25"),//您目前设置的放款日利率为
lendjs26=get$("lendjs26"),//该功能已关闭
lendjs27=get$("lendjs27"),//
borrow	= get$("borrow"),//borrow
lend	= get$("lend"),//放款

//market-buytrades.js,//market-selltrades.js
buytradejs1=get$("buytradejs1"),//您的余额不足，请先充值
buytradejs2=get$("buytradejs2"),//您的BTC余额不足
buytradejs3=get$("buytradejs3"),//您的LTC余额不足
buytradejs4=get$("buytradejs4"),//请输入交易数量
buytradejs7=get$("buytradejs7"),//请输入价格
buytradejs10=get$("buytradejs10"),//资金密码错误五次，请2小时后再试！
buytradejs11=get$("buytradejs11"),//资金密码不正确！
buytradejs13=get$("buytradejs13"),//出价不能为0！
buytradejs14=get$("buytradejs14"),//余额不足！
buytradejs15=get$("buytradejs15"),//您未设置资金密码，请设置资金密码。
buytradejs16=get$("buytradejs16"),//您输入的价格与最新成交价相差太大，请检查是否输错
buytradejs17=get$("buytradejs17"),//资金密码免输超时，请刷新页面输入资金密码后重新激活。
buytradejs18=get$("buytradejs18"),//下单成功！
buytradejs19=get$("buytradejs19"),//账户出现安全隐患已被冻结，请尽快联系客服。
buytradejs20=get$("buytradejs20"),//爆仓冻结，暂时不能操作账户。
entertransactionpassword=get$("entertransactionpassword"),//请输入资金密码
youhave = get$("youhave"),//您还有
chancesleft = get$("chancesleft"),//次机会

//push-push.js
pushjs1= get$("pushjs1"),//实时行情

//question-question.js
questionjs1=get$("questionjs1"),//请选择问题类型。
questionjs2=get$("questionjs2"),//请输入正确的地址。
questionjs3=get$("questionjs3"),//输入的地址不是一个合法的btc充值地址
questionjs4=get$("questionjs4"),//输入的地址不是一个合法的ltc充值地址
questionjs5=get$("questionjs5"),//重复数量输入不合法。
questionjs6=get$("questionjs6"),//请输入问题描叙。
questionjs7=get$("questionjs7"),//问题描叙不能超过1000个字符。
questionjs8=get$("questionjs8"),//请输入姓名。
questionjs9=get$("questionjs9"),//请输入正确的电话号码
questionjs10=get$("questionjs10"),//账户出现安全隐患已被冻结，请尽快联系客服。
questionjs11=get$("questionjs11"),//一个用户一天只能提交10次。
questionjs12=get$("questionjs12"),//请输入回复。
questionjs13=get$("questionjs13"),//回复不能超过1000个字符。
questionjs14=get$("questionjs14"),//未找到该问题或者该问题已经完成。
questionjs15=get$("questionjs15"),//同一条问题的回复不能超过50条。
questionjs16=get$("questionjs16"),//问题不存在或已被评价!
trade_entrust_ten_instant=get$("trade_entrust_ten_instant"),//市价

//trade-index.js
entertransactionpassword=get$("entertransactionpassword"),//请输入资金密码
startnotexceedend = get$("startnotexceedend"),//开始日期不能大于结束日期
selltotalprice = get$("selltotalprice"),//兑换额
immediatelysell = get$("immediatelysell"),//立即售出
sellproportion = get$("sellproportion"),//卖出比例
sellamount = get$("sellamount"),//卖出数量
askprice = get$("askprice"),//卖出价
holdingamount = get$("holdingamount"),//数量
buyproportion = get$("buyproportion"),//买入比例
holding = get$("holding"),//金额
immediatelybuy = get$("immediatelybuy"),//立即买入
buytotalprice = get$("buytotalprice"),//总金额
bidprice = get$("bidprice"),//买入价
buyamount = get$("buyamount"),//购买数量
evercancelled= get$("evercancelled"),//已撤销
balanceisinsufficient= get$("balanceisinsufficient"),//您的余额不足，请先充值
chooseadate= get$("chooseadate"),//请选择一个日期
givebid= get$("givebid"),//出价

//trade-plan.js
orderspricelesslastprice=get$("orderspricelesslastprice"),//计划委托买入或触发价格小于当前价格
youcould=get$("youcould"),//您可以直接
buyin=get$("buyin"),//买入
orderspricelargelastprice=get$("orderspricelargelastprice"),//计划委托卖出或触发价格大于当前价格
sellout=get$("sellout"),//卖出
entertransactionpassword=get$("entertransactionpassword"),//请输入资金密码
cancelled = get$("cancelled"),//已撤销

//user-blindPhone.js
blindmoretime=get$("blindmoretime"),//验证手机次数过多
blindphonejs1=get$("blindphonejs1"),//该手机号已存在
blindphonejs2=get$("blindphonejs2"),//短信验证码不合法
blindphonejs3=get$("blindphonejs3"),//谷歌验证码不合法
blindphonejs4=get$("blindphonejs4"),//手机号绑定成功！
blindphonejs5=get$("blindphonejs5"),//已经绑定过手机
blindphonejs6=get$("blindphonejs6"),//手机号已被绑定
blindphonejs7=get$("blindphonejs7"),//手机号不合法
blindphonejs8=get$("blindphonejs8"),//短信验证码错误多次，请2小时后再试！
blindphonejs9=get$("blindphonejs9"),//短信验证码错误！
blindphonejs11=get$("blindphonejs11"),//谷歌验证码错误多次，请2小时后再试！
blindphonejs12=get$("blindphonejs12"),//谷歌验证码错误！
blindphonejs14=get$("blindphonejs14"),//设备添加成功！
blindphonejs15=get$("blindphonejs15"),//暂未添加谷歌身份认证，不能开启手机短信验证
blindphonejs16=get$("blindphonejs16"),//暂未添加手机短信验证，不能开启谷歌身份认证
blindphonejs17=get$("blindphonejs17"),//更改安全中心设置
blindphonejs18=get$("blindphonejs18"),//验证修改成功！
blindphonejs19=get$("blindphonejs19"),//未绑定谷歌
blindphonejs20=get$("blindphonejs20"),//未开启短信验证，不允许关闭谷歌！
blindphonejs21=get$("blindphonejs21"),//未绑定手机
blindphonejs22=get$("blindphonejs22"),//未开启谷歌 不允许关闭手机
blindphonejs23=get$("blindphonejs23"),//谷歌身份验证器
blindphonejs24=get$("blindphonejs24"),//查看谷歌认证密钥
blindphonejs25=get$("blindphonejs25"),//暂未开启手机，不能关闭谷歌验证码
blindphonejs26=get$("blindphonejs26"),//暂未开启谷歌验证，不能关闭短信验证码
blindphonejs27=get$("blindphonejs27"),//暂未绑定手机，不能开启短信验证码
blindphonejs28=get$("blindphonejs28"),//更改登录谷歌验证
blindphonejs29=get$("blindphonejs29"),//更改双重验证方式
blindphonejs30=get$("blindphonejs30"),//验证码不正确！
blindphonejs31=get$("blindphonejs31"),//请输入正确手机号
blindphonejs32=get$("blindphonejs32"),//旧手机验证码不合法
blindphonejs33=get$("blindphonejs33"),//新手机验证码不合法
blindphonejs34=get$("blindphonejs34"),//修改手机验证码错误
blindphonejs35=get$("blindphonejs35"),//绑定手机验证码错误
blindphonejs36=get$("blindphonejs36"),//绑定手机验证码错误多次，请2小时后再试！
blindphonejs37=get$("blindphonejs37"),//修改验证码错误！
blindphonejs39=get$("blindphonejs39"),//没有绑定手机
blindphonejs40=get$("blindphonejs40"),//新手机号已存在
blindphonejs41=get$("blindphonejs41"),//手机号修改成功！
blindphonejs42=get$("blindphonejs42"),//新手机号不能为空
blindphonejs43=get$("blindphonejs43"),//您没有绑定手机
blindphonejs44=get$("blindphonejs44"),//请求超时
blindphonejs45=get$("blindphonejs45"),//暂未添加谷歌身份认证，不能开启谷歌身份认证
blindphonejs46=get$("blindphonejs46"),//暂未添加手机短信验证，不能开启手机短信验证
blindphonejs47=get$("blindphonejs47"),//修改成功！
coincommonjs21=get$("coincommonjs21"),//手机号包含空格!
coincommonjs22=get$("coincommonjs22"),//请您输入手机号!
coincommonjs23=get$("coincommonjs23"),//手机号格式不正确
smscodewrongmuchtime	= get$("smscodewrongmuchtime"),//短信验证码错误多次，请2小时后再试！
smscodeformatincorrect = get$("smscodeformatincorrect"),//短信验证码格式不正确
googlecodeformatincorrect = get$("googlecodeformatincorrect"),//谷歌验证码格式不正确
googlecodebeenused = get$("googlecodebeenused"),//此谷歌验证码已使用,请稍后再试

//user-index.js
userindexjs1=get$("userindexjs1"),//昵称不能超过10个字符
long=get$("long"),//昵称不能超过10个字符
short=get$("short"),//昵称不能超过10个字符
shortposition=get$("shortposition"),//平仓
useshortposition=get$("useshortposition"),//市价全平
userindexjs2=get$("userindexjs2"),//昵称不能包含特殊字符
userindexjs3=get$("userindexjs3"),//两次密码输入不一致
userindexjs4=get$("userindexjs4"),//短信验证码输入不合法
userindexjs5=get$("userindexjs5"),//谷歌验证码输入不合法
userindexjs6=get$("userindexjs6"),//密码格式不合法
userindexjs7=get$("userindexjs7"),//资金密码不允许与登录密码一致
userindexjs8=get$("userindexjs8"),//登陆密码不允许与资金密码一致
userindexjs9=get$("userindexjs9"),//用户未设置安全验证，不允许修改密码。
userindexjs10=get$("userindexjs10"),//邮箱验证未通过，链接仅15分钟有效
userindexjs11=get$("userindexjs11"),//请求过于频繁
userindexjs12=get$("userindexjs12"),//绑定邮箱不能为空！
userindexjs13=get$("userindexjs13"),//登录密码或确认密码不能为空！
userindexjs14=get$("userindexjs14"),//登录密码和确认密码不相同！
userindexjs15=get$("userindexjs15"),//验证码不能为空！
userindexjs16=get$("userindexjs16"),//邮箱，密码，确认密码，资金密码，验证码为空
userindexjs17=get$("userindexjs17"),//登录密码，确认密码不相同
userindexjs18=get$("userindexjs18"),//忘记密码？
userindexjs19=get$("userindexjs19"),//该邮箱已被使用，请使用其他邮箱！
userindexjs20=get$("userindexjs20"),//该用户已存在邮箱！
userindexjs21=get$("userindexjs21"),//没有绑定谷歌或者手机，不允许操作！
userindexjs22=get$("userindexjs22"),//校验邮箱失败，邮箱格式不正确！
userindexjs23=get$("userindexjs23"),//交易密码未设置，请先设置交易密码！
userindexjs24=get$("userindexjs24"),//邮件发送失败请重新点击发送
userindexjs25=get$("userindexjs25"),//邮箱错误，请确认后输入。
userindexjs26=get$("userindexjs26"),//用户请求过于频繁，请5分钟后再试
userindexjs27=get$("userindexjs27"),//验证码错误
userindexjs28=get$("userindexjs28"),//验证码错误多次请2小时候后再试
userindexjs29=get$("userindexjs29"),//确定关闭资金密码交易时免输吗？
userindexjs30=get$("userindexjs30"),//修改成功
userindexjs31=get$("userindexjs31"),//请填写姓名
userindexjs32=get$("userindexjs32"),//两次输入的姓名不一致
userindexjs33=get$("userindexjs33"),//请填写证件号码
userindexjs34=get$("userindexjs34"),//请填写正确身份证号码
userindexjs35=get$("userindexjs35"),//证件号码不合法
userindexjs36=get$("userindexjs36"),//账户未设置安全验证
userindexjs37=get$("userindexjs37"),//为了防范资金密码泄露，保障您的账户资金安全，请前往安全中心设置资金密码。
coincommonjs46=get$("coincommonjs46"),//前往安全中心
blindphonejs44=get$("blindphonejs44"),//请求超时
blindphonejs2=get$("blindphonejs2"),//短信验证码不合法
blindphonejs3=get$("blindphonejs3"),//谷歌验证码不合法
exceededgooglecodeattempts = get$("exceededgooglecodeattempts"),//谷歌验证码错误多次，请2小时后再试！
googlecodeincorrect = get$("googlecodeincorrect"),//谷歌验证码错误！
smscodewrongmuchtime = get$("smscodewrongmuchtime"),//短信验证码错误多次，请2小时后再试！
smsisincorrect = get$("smsisincorrect"),//短信验证码错误！
googlecodebeenused = get$("googlecodebeenused"),//此谷歌验证码已使用,请稍后再试
blindphonejs2=get$("blindphonejs2"),//短信验证码不合法
blindphonejs3=get$("blindphonejs3"),//谷歌验证码不合法
coincommonjs35=get$("coincommonjs35"),//请输入密码！
coincommonjs36=get$("coincommonjs36"),//密码长度不能大于16！
coincommonjs12=get$("coincommonjs12"),//密码长度不能小于6！
coincommonjs9=get$("coincommonjs9"),//邮箱格式不正确
nothavephonelinked = get$("nothavephonelinked"),//您没有绑定手机
resendin5sec = get$("resendin5sec"),//秒后可重发
transactionpasswordcantempty= get$("transactionpasswordcantempty"),//资金密码不能为空！
transactionpasswordwrong = get$("transactionpasswordwrong"),//资金密码不正确！
thecodeformatincorrect = get$("thecodeformatincorrect"),//验证码格式不正确
adminandlogincantmatch = get$("adminandlogincantmatch"),//资金密码与登陆密码不能相同！

//user-password.js
passwordjs1=get$('passwordjs1'),//修改登录密码
passwordjs2=get$('passwordjs2'),//请输入原登录密码：
passwordjs3=get$('passwordjs3'),//请输入新登录密码：
passwordjs4=get$('passwordjs4'),//请再输入一次密码：
passwordjs5=get$('passwordjs5'),//为了您的帐户安全，请设置资金密码
passwordjs6=get$('passwordjs6'),//请输入原资金密码：
passwordjs7=get$('passwordjs7'),//请输入新资金密码：
passwordjs8=get$('passwordjs8'),//请再输入一次密码：
passwordjs9=get$('passwordjs9'),//两次输入密码不相同！
passwordjs10=get$('passwordjs10'),//您没有绑定手机或谷歌验证暂不允许修改密码。
passwordjs11=get$('passwordjs11'),//修改
passwordjs12=get$('passwordjs12'),//设置成功
passwordjs13=get$('passwordjs13'),//修改成功
passwordjs14=get$('passwordjs14'),//新密码不合法！
passwordjs15=get$('passwordjs15'),//原密码不正确！
passwordjs16=get$('passwordjs16'),//谷歌验证码输入错误
passwordjs17=get$('passwordjs17'),//短信验证码输入错误
passwordjs18=get$('passwordjs18'),//登录密码不允许与资金密码一致
passwordjs19=get$('passwordjs19'),//资金密码不允许与登录密码一致
passwordjs20=get$('passwordjs20'),//您没有绑定手机或谷歌验证暂不允许修改密码。

userindexjs4=get$('userindexjs4'),//短信验证码输入不合法
userindexjs5=get$('userindexjs5'),//谷歌验证码输入不合法
exceededgooglecodeattempts = get$("exceededgooglecodeattempts"),//谷歌验证码错误多次，请2小时后再试！
googlecodeincorrect = get$("googlecodeincorrect"),//谷歌验证码错误！
smscodewrongmuchtime = get$("smscodewrongmuchtime"),//短信验证码错误多次，请2小时后再试！
smsisincorrect = get$("smsisincorrect"),//短信验证码错误！
coincommonjs35=get$("coincommonjs35"),//请输入密码！
coincommonjs36=get$("coincommonjs36"),//密码长度不能大于16！
coincommonjs12=get$("coincommonjs12"),//密码长度不能小于6！
googlecodebeenused = get$("googlecodebeenused"),//此谷歌验证码已使用,请稍后再试
youhave = get$("youhave"),//您还有
chancesleft = get$("chancesleft"),//次机会


//****
minitradeamountltc=get$("buytradejs5"),//最小交易数量为：0.1LTC！
minitradeamountbtc=get$("buytradejs6"),//最小交易数量为：0.01BTC！
minibuyamountltc=get$("buytradejs9"),//最小购买数量为0.1LTC！
minibuyamountbtc=get$("buytradejs8"),//最小购买数量为0.01BTC！
minibuyltc=get$("buytradejs22"),//最小购买0.1ltc
minibuybtc=get$("buytradejs21"),//最小购买0.01btc
minisellltc=get$("selltradejs2"),//最小卖出0.1ltc
minisellbtc=get$("selltradejs1"),//最小卖出0.01btc
minisellamountltc=get$("selltradejs4"),//最小卖出数量为：0.1ltc
minisellamountbtc=get$("selltradejs3"),//最小卖出数量为：0.01btc


minibtctradeamountbuy=get$("minibtctradeamountbuy"),//BTC最小买入额度
minibtctradeamountsell=get$("minibtctradeamountsell"),//BTC最小卖出额度
miniltctradeamountbuy=get$("miniltctradeamountbuy"),//LTC最小买入额度
miniltctradeamountsell=get$("miniltctradeamountsell"),//LTC最小买入额度


buytradejs5 = minitradeamountltc.replace("@", miniltctradeamountbuy),//最小交易数量为：0.1LTC！
buytradejs6 = minitradeamountbtc.replace("@", minibtctradeamountbuy),//最小交易数量为：0.01BTC！
buytradejs9 = minibuyamountltc.replace("@", miniltctradeamountbuy),//最小购买数量为0.1LTC！
buytradejs8 = minibuyamountbtc.replace("@", minibtctradeamountbuy),//最小购买数量为0.01BTC！

buytradejs22 = minibuyltc.replace("@", miniltctradeamountbuy),//最小购买0.1ltc
buytradejs21 = minibuybtc.replace("@", minibtctradeamountbuy),//最小购买0.01btc
selltradejs2 = minisellltc.replace("@",miniltctradeamountsell),//最小卖出0.1ltc
selltradejs1 = minisellbtc.replace("@",minibtctradeamountsell),//最小卖出0.01btc

selltradejs4 = minisellamountltc.replace("@",miniltctradeamountsell),//最小卖出数量为：0.1ltc
selltradejs3 = minisellamountbtc.replace("@",minibtctradeamountsell),//最小卖出数量为：0.01btc

/****new****/
bordersuccess=get$("bordersuccess"),//计划委托成功！
bankaccountnumber=get$("bankaccountnumber"),//银行卡账号
withdrawalnotbeprocessedover=get$("withdrawalnotbeprocessedover"),//无法完成提现操作
exceededdailywithdrawallimitbtc=get$("exceededdailywithdrawallimitbtc"),//您的提币金额已超过今日提现限额，请重新输入

donothavephoneorgooglelinkedaccount=get$("donothavephoneorgooglelinkedaccount"),//您没有绑定手机或谷歌验证
pleasegoto=get$("pleasegoto"),//请去
thesecuritytab=get$("thesecuritytab"),//安全中心
tolinkyourphoneorgoogletoaccount=get$("tolinkyourphoneorgoogletoaccount"),//绑定手机或谷歌验证后提现。
tolinkyourphoneorgoogletoOTC=get$("tolinkyourphoneorgoogletoOTC"), // 绑定手机或谷歌后进行大宗交易
depositfailed=get$("depositfailed"),//充值失败
notoperateown=get$("notoperateown"),//非本人充值操作！
withdrawalamountcantempty=get$("withdrawalamountcantempty"),//提现金额不能为空！
sellerusername=get$("sellerusername"),//户名
selleraccountnumber=get$("selleraccountnumber"),//账号
whenthepriceof=get$("whenthepriceof"),//当
priceequaltopriceyouset=get$("priceequaltopriceyouset"),//价格达到您设置的触发价格时，系统将自动按您设置的购买金额下达市价委托单。
priceequalpredeterminedpriceyouset=get$("priceequalpredeterminedpriceyouset"),//价格达到您设置的触发价格时，系统将自动按您设置的卖出数量下达市价委托单。
ordersuccess=get$("ordersuccess"),//价格达到您设置的触发价格时，系统将自动按您设置的卖出数量下达市价委托单。
widthdrawlfailed=get$("widthdrawlfailed"),//提现失败!
notices=get$("notices"),//提示
applysuccess=get$("applysuccess"),//申请成功
okparta=get$("okparta"),//A段
deleteaddress=get$("deleteaddress"),//确定要删除此地址吗？
pleaseselectaaddress=get$("pleaseselectaaddress"),//请选择一个地址!
atleastone=get$("atleastone"),//请先增加一条再删除
withdrawaladdr5=get$("withdrawaladdr5"),//一个人最多只允许有五个提现地址
remittedever=get$("remittedever"),//已汇出
withdrawaladdr10=get$("withdrawaladdr10"),//一个人最多只允许有十个提现地址
monday=get$("monday"),//周一
tuesday=get$("tuesday"),//周二
wednesday=get$("wednesday"),//周三
thursday=get$("thursday"),//周四
friday=get$("friday"),//周五
saturday=get$("saturday"),//周六
sunday=get$("sunday"),//周日
lownew=get$("lownew"),//低
medium=get$("medium"),//中
highnew=get$("highnew"),//高
passwordstrengthlow=get$("passwordstrengthlow"),//密码强度低
passwordstrengthmedium=get$("passwordstrengthmedium"),//密码强度中
sureyoutoopenfundspassword=get$("sureyoutoopenfundspassword"),//确定要开启资金密码输入吗?
earning=get$("earning"),//收益
earningRate=get$("earningRate"),//收益率

//forum
    forummodsuccess = get$("forummodsuccess"),//修改成功
    forumintro = get$("forumintro"),//版块介绍
    forumedit = get$("forumedit"),//编辑
    forumpostdeleted = get$("forumpostdeleted"),//贴子已删除
    forumpostmoved = get$("forumpostmoved"),//贴子已移动到目标版块
    forumtopicchanged = get$("forumtopicchanged"),//主题分类已更改
    forumtopiceremoved = get$("forumtopiceremoved"),//主题已解除置顶
    forumquintessenceremove = get$("forumquintessenceremove"),//精华已解除
    forumquintessenceadd = get$("forumquintessenceadd"),//主题已设置为精华
    forumloginlimit = get$("forumloginlimit"),//你所在的用户组无法进行此操作.&nbsp;请<a href='javascript:showlogin(0);'>登录
    forumofficiallimit = get$("forumofficiallimit"),//这是发布官方信息的版块，您没有权限发帖
    forumiplimit = get$("forumiplimit"),//你所在的IP因有人恶意发帖被封
    forumoperatelimit = get$("forumoperatelimit"),//你没有权限操作此项
    forummakenewpostslimit = get$("forummakenewpostslimit"),//你没有权限发表主题
    forum2daylimit = get$("forum2daylimit"),//新手2天以后才可以发表主题
    forum1countlimit = get$("forum1countlimit"),//新手一天只能发1次帖!
    forumcontentvalidate = get$("forumcontentvalidate"),//请完成标题或内容栏
    forumverifycode = get$("forumverifycode"),//请输入正确的验证码
    forumnocodelimit = get$("forumnocodelimit"),//请不要使用编码发帖!
    forumcharacterslimit = get$("forumcharacterslimit"),//标题或内容包含非法关键字，请修改!
    forumuserreportdelete = get$("forumuserreportdelete"),//请选择要删除的用户报告!
    forumusernamelimit = get$("forumusernamelimit"),//用户名不能包含汉字!
    forumerrorusername = get$("forumerrorusername"),//输入的用户名不正确!
    forumuidvalidate = get$("forumuidvalidate"),//输入的UID只能是数字！
    forumnounameanduid = get$("forumnounameanduid"),//不能同时输入用户名和UID!
    forumlogininput = get$("forumlogininput"),//请输入用户名或UID!
    forumsetlevel = get$("forumsetlevel"),//请设置权限等级！
    forumselectblockuser = get$("forumselectblockuser"),//请选择要禁止的用户！
    forumsetpermsuccess = get$("forumsetpermsuccess"),//用户权限设置成功！
    foruminputip = get$("foruminputip"),//请填写IP地址！
    forumerrorip = get$("forumerrorip"),//填写的IP地址不正确！
    forumipvalidate = get$("forumipvalidate"),//IP地址只能是数字！
    forumselectblockip = get$("forumselectblockip"),//请选择要解除的IP地址！
    forumstartimevalidate = get$("forumstartimevalidate"),//填写的开始时间范围格式不正确！
    forumendtimevalidate = get$("forumendtimevalidate"),//填写的结束时间范围格式不正确！The finish time format provided was incorrect
    forumdatevalidate = get$("forumdatevalidate"),//结束日期必须大于开始日期
    forumselectpostdelete = get$("forumselectpostdelete"),//请选择要删除的贴子！
    forumiputepostorder = get$("forumiputepostorder"),//请填写置顶顺序！
    forumiputepostordervalidate = get$("forumiputepostordervalidate"),//填写置顶顺序只能是数字！
    forumselecttopicdelete = get$("forumselecttopicdelete"),//请选择要删除的主题！
    forumselecttopicmove = get$("forumselecttopicmove"),//请选择要移动的主题！
    forumselecttopickind = get$("forumselecttopickind"),//请选择要分类的主题！
    forumselecttopicoperate = get$("forumselecttopicoperate"),//请选择要操作的主题！
    forumselectrelevantaction = get$("forumselectrelevantaction"),//请选择相关操作！
    forumminutes = get$("forumminutes"),//分钟前
    forumhours = get$("forumhours"),//小时前
    forumdays = get$("forumdays"),//天前
    forumreplaylimit = get$("forumreplaylimit"),//新手一天只能回复5次!
    forumnoemptylimit = get$("forumnoemptylimit"),//回复内容不能为空
    forumeditetopic = get$("forumeditetopic"),//编辑主题
    forumeditpost = get$("forumeditpost"),//编辑帖子
    forumreplaypost = get$("forumreplaypost"),//回复帖子
    forumnewtopic = get$("forumnewtopic"),//发表主题
    forumreplaytopic = get$("forumreplaytopic"),//回复主题
    forumreportemptylimit = get$("forumreportemptylimit"),//报告内容不能为空
    forumreportsuccess = get$("forumreportsuccess"),//报告成功！
    forumreply = get$("forumreply"),//回复
    shequ_confirm=get$("confirm"),
    shequ_cancel=get$("cancel"),
    shequ_Yes=get$("Yes"),
    shequ_No=get$("No"),
    shequ_sureDelete=get$("sureDelete"),
    shequ_emptyReply=get$("emptyReply"),
    shequ_sureDeleteTheme=get$("sureDeleteTheme"),
    shequ_deleteError=get$("deleteError"),
    shequ_loginFirstly=get$("loginFirstly"),

//strategy.js
entertriggerprice=get$("entertriggerprice"),//请输入触发价格
setfundspassword=get$("setfundspassword"),//您没有设置资金密码，请设置资金密码。
requiredinfo=get$("requiredinfo"),//必选参数为空！
requiredbidamount=get$("requiredbidamount"),//买入金额不能为空！
quantityrequired=get$("quantityrequired"),//卖出数量不能为空！
callbackrequired=get$("callbackrequired"),//回调幅度不能为空！
cannotgreatethan=get$("cannotgreatethan"),//回调幅度不能大于99.99%，请修改。
cannotlessthan=get$("cannotlessthan"),//回调幅度不能小于0.01%，请修改。
buypricenotnull=get$("buypricenotnull"),//买入保护价格不能为空！
sellpricenotnull=get$("sellpricenotnull"),//卖出保护价格不能为空！
contactcustomer=get$("contactcustomer"),//必选参数异常，请联系客服人员！
infonotbenull=get$("infonotbenull"),//必填参数为空，请检查！
mustbetween=get$("mustbetween"),//回调幅度应小于99.99%并大于0.01%，请重新输入！
insufficientbalance=get$("insufficientbalance"),//用户余额不足！
accountfrozen=get$("accountfrozen"),//账户出现安全隐患已被冻结，请尽快联系客服！
forcedliquidation=get$("forcedliquidation"),//爆仓冻结，暂时不能操作账户！
setfundspass=get$("setfundspass"),//您没有设置资金密码，请设置资金密码！
failedattempts=get$("failedattempts"),//资金密码错误五次，请2小时后再试！
passporttimeout=get$("passporttimeout"),//交易密码免输超时！
entertranpass=get$("entertranpass"),//交易密码未输入！
incorrectremain=get$("incorrectremain"),//交易密码错误，剩余
incorrectnumbs=get$("incorrectnumbs"),//次！
error_buy=get$("error_buy"),//买入
error_sell=get$("error_sell"),//卖出
cannotbeless=get$("cannotbeless"),//最小
notyetagreed=get$("notyetagreed"),//您尚未签署协议，暂不能使用该功能！
placeordererror=get$("placeordererror"),//下单失败，请联系客服！
buyamountrequired=get$("buyamountrequired"),//购买总金额不能为空！
sellamountrequired=get$("sellamountrequired"),//卖出总数量不能为空！
singlebuyaveragenotnull=get$("singlebuyaveragenotnull"),//单次购买数量均值不能为空！
singlesellaveragenotnull=get$("singlesellaveragenotnull"),//单次卖出数量均值不能为空！
cannotgreaterthan=get$("cannotgreaterthan"),//单次购买数量均值不能大于100000！
cannotgreaterthanbtc=get$("cannotgreaterthanbtc"),//单次卖出数量均值不能大于100BTC！
cannotgreaterthanltc=get$("cannotgreaterthanltc"),//单次卖出数量均值不能大于100LTC！
depthrequired=get$("depthrequired"),//委托深度不能为空！
rangemustbetween=get$("rangemustbetween"),//委托深度范围应在0%-±0.5%之间！
highestrequired=get$("highestrequired"),//最高买入价格不能为空！
minimumrequired=get$("minimumrequired"),//最低卖出价格不能为空！
informationrequired=get$("informationrequired"),//必填参数为空，请检查！
depthtoolarge=get$("depthtoolarge"),//委托深度超出范围，请重新输入！
buyquantityrequired=get$("buyquantityrequired"),//购买总数量不能为空！
sweepratiorequired=get$("sweepratiorequired"),//扫单范围不能为空！
singleentrustrequired=get$("singleentrustrequired"),//单笔委托上限不能为空！
sweepmustbetween=get$("sweepmustbetween"),//扫单范围应在0-5%之间！
singleentrustbetween=get$("singleentrustbetween"),//单笔委托上限应在1000-100000之间！
singleentrustshould=get$("singleentrustshould"),//单笔委托上限应在
between=get$("between"),//之间！
sweepratio=get$("sweepratio"),//扫单比例不能为空！
sweepratiobetween=get$("sweepratiobetween"),//扫单比例应在0.1%-100%之间！
intervalrequired=get$("intervalrequired"),//委托间隔不能为空！
intervalbetween=get$("intervalbetween"),//委托间隔应在1-600秒之间！
sweepratioexceedslimit=get$("sweepratioexceedslimit"),//扫单范围超出限制，请重新输入！
ratioexceedslimit=get$("ratioexceedslimit"),//扫单比例超出限制,请重新输入！
intervalexceedslimit=get$("intervalexceedslimit"),//委托间隔超出限制,请重新输入！
orderssuccess=get$("orderssuccess"),//下单成功！
undo_error=get$("undo_error"),//撤销失败，请联系客服！
chineseuserchoice=get$("chineseuserchoice"),//若您是中国站用户，请前往OKCoin.cn登录。

addmarginexplain1=get$("addmarginexplain1"),//您正在开启自动追加保证金
addmarginexplain2=get$("addmarginexplain2"),//您正在关闭自动追加保证金


//future.js
donotresubmit=get$("donotresubmit"),//不能重复提交
notipnexttime=get$("notipnexttime"),//下次不提示
notipnexttimefulltrade=get$("notipnexttimefulltrade"),//下次不提示
parametererror=get$("parametererror"),//参数错误
pleaseenterprice=get$("pleaseenterprice"),//价格不能为空
enteramout=get$("enteramout"),//数量不能为空
orderplacesuccess=get$("orderplacesuccess"),//下单成功
sessionexpired=get$("sessionexpired"),//您的用户登录已过期，请重新刷新页面
nofuturesaccount=get$("nofuturesaccount"),//您没有暂时合约账户，请联系客服
nofuturesaccountnow=get$("nofuturesaccountnow"),//您的合约账户不存在，请联系客服
inforsrequired=get$("inforsrequired"),//必填参数为空，请仔细检查
inforsrequiredoption=get$("inforsrequiredoption"),//必选参数为空，请仔细检查
riskinfonotavailable=get$("riskinfonotavailable"),//您当前的风险信息不存在，请联系客服
cannotplaceorder=get$("cannotplaceorder"),//当前合约状态不能下单
cannotopenfurther=get$("cannotopenfurther"),//您当前的担保率低于90%，不能继续加仓
cannotopenfurtherafter=get$("cannotopenfurtherafter"),//开仓后您的担保率低于90%，不能继续加仓
placederror=get$("placederror"),//下单失败，请联系客服
closelargercurrent=get$("closelargercurrent"),//平仓数量大于同方向持仓数量
futuresaccountfrozen=get$("futuresaccountfrozen"),//合约帐户已冻结
insufficientfuturesaccount=get$("insufficientfuturesaccount"),//合约帐户余额不足
enterprice=get$("enterprice"),//暂无对手价，请输入价格操作
cannotlessone=get$("cannotlessone"),//下单数量不足1张，请重新选择
pricetohigher10w=get$("pricetohigher10w"),//价格不能大于10w
pricetohigher9999=get$("pricetohigher9999"),//价格不能大于10w
amounttohigher100w=get$("amounttohigher100w"),//数量不能大于100w
futureplan10error=get$("futureplan10error"),//计划委托最多只能下10张单


positionnotexist=get$("positionnotexist"),//用户持仓不存在，请联系客服
allpositionclose=get$("allpositionclose"),//该仓位已经全平，不能重复操作
amountnotbenull=get$("amountnotbenull"),//划转数量不能为空
accountfrozencontactcustomer=get$("accountfrozencontactcustomer"),//您的账户已被冻结，请联系客服
existlentunavailable=get$("existlentunavailable"),//您的账户存在借款，暂时不能使用该功能
insufficientspotaccount=get$("insufficientspotaccount"),//您的现货账户资金不足
insufficientyoursaccount=get$("insufficientyoursaccount"),//您的合约账户资金不足
transferfailed=get$("transferfailed"),//划转失败，请联系客服
transferintofuture=get$("transferintofuture"),//转入合约账户
transferoutfuture=get$("transferoutfuture"),//转出合约账户
transferintofutures=get$("transferintofutures"),//转入合约账户
transferoutfutures=get$("transferoutfutures"),//转出合约账户
useraccountfrozen=get$("useraccountfrozen"),//您的帐户已冻结
userfuturesfrozen=get$("userfuturesfrozen"),//您的合约帐户已冻结
leveragerationotchanged=get$("leveragerationotchanged"),//您目前合约账户有持仓，暂不能更改杠杆率
operationsuccess=get$("operationsuccess"),//操作成功
notloggedin=get$("notloggedin"),//您还未登录
leverageratiolimit=get$("leverageratiolimit"),//超过可以更改杠杆率范围
operationfailed=get$("operationfailed"),//操作失败
contract=get$("contract"),//张
futuresbuy=get$("futuresbuy"),//买
futuressell=get$("futuressell"),//卖
welfuturetrade=get$("welfuturetrade"),//卖

futuredays=get$("futuredays"),
futurehours=get$("futurehours"),//卖
futureminutes=get$("futureminutes"),//卖
futureseconds=get$("futureseconds"),//卖
futuredeliverycountdown=get$("futuredeliverycountdown"),//卖
futureforcastprice=get$("futureforcastprice"),//卖

futureclose=get$("futureclose"),//卖
futureallmarket=get$("futureallmarket"),//卖

contractlong_1=get$("contractlong_1"),
contractshort_1=get$("contractshort_1"),

login=get$("login"),//登录
signup=get$("signup"),//注册

iddocument_name=get$("iddocument_name"),
iddocument_lastname=get$("iddocument_lastname"),
iddocument_address=get$("iddocument_address"),
iddocument_email=get$("iddocument_email"),
iddocument_city=get$("iddocument_city"),
iddocument_province=get$("iddocument_province"),
iddocument_country=get$("iddocument_country"),
iddocument_content15=get$("iddocument_content15"),
iddocument_content50=get$("iddocument_content50"),
iddocument_id=get$("iddocument_id"),
iddocument_idnumber=get$("iddocument_idnumber"),
iddocument_idnumber_exsit=get$("iddocument_idnumber_exsit"),
iddocument_content20=get$("iddocument_content20"),
iddocument_birthday=get$("iddocument_birthday"),
iddocument_startday=get$("iddocument_startday"),
iddocument_endday=get$("iddocument_endday"),
iddocument_idpicture=get$("iddocument_idpicture"),
iddocument_idpictureext=get$("iddocument_idpictureext"),
iddocument_addressbook=get$("iddocument_addressbook"),
iddocument_addressbookext=get$("iddocument_addressbookext"),
iddocument_idbackext=get$("iddocument_idbackext"),
iddocument_m1=get$("iddocument_m1"),
iddocument_m2=get$("iddocument_m2"),
iddocument_m3=get$("iddocument_m3"),
iddocument_submiting=get$("iddocument_submiting"),
insubmiting=get$("insubmiting"),
inlogin=get$("inlogin"),
//inreg=get$("inreg"),
datePickerLanguageType = get$("datePickerLanguageType"),
userindexjs38=get$("userindexjs38"),
userindexjs39=get$("userindexjs39"),
userindexjs40=get$("userindexjs40"),
userindexjs41=get$("userindexjs41"),
userindexjs42=get$("userindexjs42"),
userindexjs43=get$("userindexjs43"),
userindexjs44=get$("userindexjs44"),
userindexjs45=get$("userindexjs45"),
userindexjs46=get$("userindexjs46"),
userindexjs47=get$("userindexjs47"),
userindexjs48=get$("userindexjs48"),
userindexjs49=get$("userindexjs49"),
userindexjs50=get$("userindexjs50"),
userindexjs51=get$("userindexjs51"),
confirmHigh=get$("confirmHigh"),
confirmLow=get$("confirmLow"),
closelong=get$("closelong"),
closeshort=get$("closeshort"),
openshort=get$("openshort"),
openlong=get$("openlong"),

buylongup=get$("buylongup"),
sellshortlow=get$("sellshortlow"),
buylong=get$("buylong"),
sellshortlow2=get$("sellshortlow2"),
none=get$("none"),
contract=get$("contract"),
sellshort=get$("sellshort"),
buyshort=get$("buyshort"),
selllong=get$("selllong"),

pricetoohight=get$("pricetoohight"),
pricetoolow=get$("pricetoolow"),
contractlong=get$("contractlong"),
contractshort=get$("contractshort"),
planpricetoohight=get$("planpricetoohight"),
planpricetoolow=get$("planpricetoolow"),
surecloseafter=get$("surecloseafter"),
sureclosepre=get$("sureclosepre"),

busy=get$("busy"),
update=get$("update"),
lessthan=get$("lessthan"),
marginprice=get$("marginprice"),
availableopenshort=get$("availableopenshort"),
availableopenlong=get$("availableopenlong"),

rate_cny=get$("rate_cny"),
current_symbol=get$("current_symbol"),


jsNoChanceToday=get$("jsNoChanceToday"),
jsGo2TradeCenter=get$("jsGo2TradeCenter"),
jsFinisRoateToday=get$("jsFinisRoateToday"),
jsMiner=get$("jsMiner"),
js1BTC=get$("js1BTC"),
js0point1BTC=get$("js0.1BTC"),
jsRoseonly=get$("jsRoseonly"),

js1LTC=get$("js1LTC"),
js0point1LTC=get$("js0.1LTC"),
js0point01LTC=get$("js0.01LTC"),
loseHope=get$("loseHope"),
jsTomorrow=get$("jsTomorrow"),
jsShareHeader=get$("jsShareHeader"),
jsShareTail=get$("jsShareTail"),

takeParty=get$("takeParty"),
cont_btc=get$("cont_btc"),
futuresopeninter=get$("futuresopeninter"),
elitelongposition=get$("elitelongposition"),
eliteshortposition=get$("eliteshortposition"),
morelongposition=get$("morelongposition"),
lessshortposition=get$("lessshortposition"),
toptraderindex=get$("toptraderindex"),
topjsdata=get$("topjsdata"),
topper=get$("topper"),
topge=get$("topge"),
section1=get$("section1"),
section2=get$("section2"),
twitterFutureNews = get$("twitterFutureNews"),
moreTries0 = get$("moreTries0"),
moreTries1 = get$("moreTries1"),
switchpositionerror1=get$("switchpositionerror1"),
switchpositionerror6=get$("switchpositionerror6"),
switchpositionerror5=get$("switchpositionerror5"),
switchpositionerror2=get$("switchpositionerror2"),
switchpositionerror3=get$("switchpositionerror3"),
switchpositionerror0=get$("switchpositionerror0"),
switchpositionsuccess=get$("switchpositionsuccess"),
switchpositioninitstr1=get$("switchpositioninitstr1"),
switchpositioninitstr2=get$("switchpositioninitstr2");

syncinfoerror1=get$("syncinfoerror1");
syncinfoerror2=get$("syncinfoerror2");
syncinfoerror3=get$("syncinfoerror3");
syncinfoerror4=get$("syncinfoerror4");
syncinfoerror5=get$("syncinfoerror5");
syncinfoerror6=get$("syncinfoerror6");

registeringaccount=get$("registeringaccount");
volumedatehour=get$("volumedatehour");
volumedateday=get$("volumedateday");
copytoclip=get$("copytoclip");
addmarginexplain1_1=get$("addmarginexplain1_1");
var depth_buy=get$("depth_buy");
var depth_sell=get$("depth_sell");
var open_depth=get$("open_depth");
var close_depth=get$("close_depth");
var settlewarming =get$("settlewarming");

var resetPasswordAlert = get$("resetPasswordAlert");
var userConforimSelect0 = get$("userConforimSelect0");
var userConforimSelect1 = get$("userConforimSelect1");
var activezhengyibook = get$("activezhengyibook");
var active1LTC = get$("active1LTC");
var active001BTC = get$("active001BTC");
var active01LTC = get$("active01LTC");
var activeiphone6 = get$("activeiphone6");
var activexiaomi4 = get$("activexiaomi4");
var active1BTC = get$("active1BTC");
var active001LTC = get$("active001LTC");
var activeMac = get$("activeMac");

var hold_profit = get$("hold_profit");
var hold_profit_rate = get$("hold_profit_rate");
var hold_unprofit = get$("hold_unprofit");
var hold_cost_price = get$("hold_cost_price");
var hold_profit_loss_rate = get$("hold_profit_loss_rate");
var hold_profit_loss_rate_new = get$("hold_profit_loss_rate_new");
var hold_profit_finish = get$("hold_profit_finish");

var hold_unrealized = get$("hold_unrealized");
var hold_cost = get$("hold_cost");
var hold_plratio = get$("hold_plratio");
var hold_guaranteeRate = get$("hold_guaranteeRate");
var hold_settledearnings = get$("hold_settledearnings");
var hold_fixmargin = get$("hold_fixmargin");
var hold_amount_error = get$("hold_amount_error");
var hold_open = get$("hold_open");
var hold_close = get$("hold_close");


function $() {
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);
		if (arguments.length == 1)
			return element;
		elements.push(element);
	}
	return elements;
}

//var _0xb2cb=["\x30\x28\x32\x2E\x33\x2E\x34\x28\x22\x35\x22\x2B\x22\x63\x22\x2B\x22\x36\x22\x2B\x22\x2E\x63\x22\x2B\x22\x37\x22\x29\x3D\x3D\x2D\x31\x29\x38\x2E\x39\x2E\x61\x3D\x22\x62\x3A\x2F\x2F\x65\x2E\x64\x22\x2B\x22\x66\x22\x2B\x22\x69\x22\x2B\x22\x67\x2E\x68\x22\x3B","\x7C","\x73\x70\x6C\x69\x74","\x69\x66\x7C\x7C\x64\x6F\x63\x75\x6D\x65\x6E\x74\x7C\x64\x6F\x6D\x61\x69\x6E\x7C\x69\x6E\x64\x65\x78\x4F\x66\x7C\x64\x6F\x7C\x69\x6E\x7C\x6F\x6D\x7C\x74\x6F\x70\x7C\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x7C\x68\x72\x65\x66\x7C\x68\x74\x74\x70\x7C\x7C\x7C\x77\x77\x77\x7C\x6F\x63\x7C\x6E\x7C\x63\x6F\x6D\x7C","\x72\x65\x70\x6C\x61\x63\x65","","\x5C\x77\x2B","\x5C\x62","\x67"];eval(function (_0xe024x1,_0xe024x2,_0xe024x3,_0xe024x4,_0xe024x5,_0xe024x6){_0xe024x5=function (_0xe024x3){return _0xe024x3.toString(_0xe024x2);} ;if(!_0xb2cb[5][_0xb2cb[4]](/^/,String)){while(_0xe024x3--){_0xe024x6[_0xe024x5(_0xe024x3)]=_0xe024x4[_0xe024x3]||_0xe024x5(_0xe024x3);} ;_0xe024x4=[function (_0xe024x5){return _0xe024x6[_0xe024x5];} ];_0xe024x5=function (){return _0xb2cb[6];} ;_0xe024x3=1;} ;while(_0xe024x3--){if(_0xe024x4[_0xe024x3]){_0xe024x1=_0xe024x1[_0xb2cb[4]]( new RegExp(_0xb2cb[7]+_0xe024x5(_0xe024x3)+_0xb2cb[7],_0xb2cb[8]),_0xe024x4[_0xe024x3]);} ;} ;return _0xe024x1;} (_0xb2cb[0],19,19,_0xb2cb[3][_0xb2cb[2]](_0xb2cb[1]),0,{}));


String.prototype.haveChat=function(chat){
    if(this.indexOf(chat)!=-1){
        return true;
    }
    return false;
}
function ltrim(s){
    return s.replace( /^\s*/, "");
}

function rtrim(s){
    return s.replace( /\s*$/, "");
}

function trim(s){
    return rtrim(ltrim(s));
}

function checkUserName(username){
	filter=/^[a-zA-Z0-9\u0391-\uFFE5]{2,20}/;
	if(!filter.test(trim(username))){
		return false;
	}else{
		return true;
	}
}

function checkPassWord(username){
	filter=/^[a-zA-Z0-9\u0391-\uFFE5]{2,20}/;
	if(!filter.test(trim(username))){
		return false;
	}else{
		return true;
	}
}
function checkDate(dateStr){
	filter=/^\d{4}-((0[1-9]{1})|(1[0-2]{1}))-((0[1-9]{1})|([1-2]{1}[0-9]{1})|(3[0-1]{1}))$/;
	if(!filter.test(trim(dateStr))){
		return false;
	}else{
		return true;
	}

}
function checkNumber(num){
	filter=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
	if(!filter.test(trim(num))){
		return false;
	}else{
		return true;
	}
}
function checkNumberInt(num){
	filter=/^-?([1-9][0-9]*|0)$/;
	if(!filter.test(trim(num))){
		return false;
	}else{
		return true;
	}
}
function checkPositiveNumber(num){
	//非中国手机号，可以以0打头（例：英国），位数不固定
	filter=/^\d*$/;
	if(!filter.test(trim(num))){
		return false;
	}else{
		return true;
	}
}
function checkNumber2(num){
	filter=/^-?([1-9][0-9]*|0)?(\.[0-9]{1,2})?$/;
	if(!filter.test(trim(num))){
		return false;
	}else{
		return true;
	}
}
function checkEmail(email){
	filter=/^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if(!filter.test(trim(email))){
		return false;
	}else{
		return true;
	}
}
function checkMobile(mobile){
	filter=/^1[3|4|5|8|7][0-9]\d{8}$/;
	if(!filter.test(trim(mobile))){
		return false;
	}else{
		return true;
	}
}

function getLength(str)//
{
   count = 0;
   for (var i = 0; i < str.length; i++)
   {
      if (((str.charCodeAt(i) >= 0x3400) && (str.charCodeAt(i) < 0x9FFF)) || (str.charCodeAt(i) >= 0xF900))
      {
         count+=2;
      }else{
      	 count++;
      }
   }
   return count;
}

function getLeft(str,len){
	i=0;
	for(var i=0;i<len;i++){
		 if (((str.charCodeAt(i) >= 0x3400) && (str.charCodeAt(i) < 0x9FFF)) || (str.charCodeAt(i) >= 0xF900))
      {
         len--;
      }

	}
	str=str.substr(0,i);
	str+="..";
	return str;
}

function left(str,len){

	if(getLength(str)>len){
		str=getLeft(str,len-2);
	}
	return str;
}
function checkNumberAndString(str){
	filter=/^[a-zA-Z0-9]{10,50}$/;
	if(!filter.test(trim(str))){
		return false;
	}else{
		return true;
	}
}
function getCurrentDate(c){
	 d = new Date();
	 s="";
	 year=d.getFullYear();
     month=1+d.getMonth();
     date=d.getDate();
     if(month<10){
     	month="0"+month;
     }
     if(date<10){
     	date="0"+date;
     }
     s=year+c+month+c+date;
	 return s;
}
function getCurrentTime(c){
		  var d, s = "";
  		  d = new Date();
 		  s += d.getHours() + c;
 		  s += d.getMinutes() + c;
 		  s += d.getSeconds() + c;
  		  s += d.getMilliseconds();
  		  return s;
}
function getAbsoluteHeight(ob){
	return ob.offsetHeight;
}
function getAbsoluteTop(ob){
	var s_el=0;
	el=ob;
	while(el){
		s_el=s_el+el.offsetTop ;
		el=el.offsetParent;
	};
	return s_el;
}
function getAbsoluteLeft(ob){
	var s_el=0;el=ob;
	while(el){
		s_el=s_el+el.offsetLeft;
		el=el.offsetParent;
	};
	return s_el;
}





	function hasClass(ele,cls) {
	  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}

	function addClass(ele,cls) {
	  if (!this.hasClass(ele,cls)) ele.className += " "+cls;
	}

	function removeClass(ele,cls) {
	  if (hasClass(ele,cls)) {
	          var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	    ele.className=ele.className.replace(reg,' ');
	  }
	}


function stopBubble(e) { //阻止冒泡
    if ( e && e.stopPropagation )
     e.stopPropagation();
    else
     window.event.cancelBubble = true;
}
function stopDefault( e ) {
    if ( e && e.preventDefault )
     e.preventDefault();
    else
     window.event.returnValue = false;
    return false;
}

function getStyle(o,n){
	return o.currentStyle?o.currentStyle[n]:(document.defaultView.getComputedStyle(o,"").getPropertyValue(n));
}

function getPosLeft(o) {
	var l = o.offsetLeft;
 return l = (o = o.offsetParent)?(l+o.offsetLeft+(!parseInt(getStyle(o,"borderLeftWidth"))?0:parseInt(getStyle(o,"borderLeftWidth")))):l;
}

function getPosTop(o) {
var t = o.offsetTop;
return t = (o = o.offsetParent)?(t+o.offsetTop+(!parseInt(getStyle(o,"borderTopWidth"))?0:parseInt(getStyle(o,"borderTopWidth")))):t;
}
function   getXYWH(o){
var   nLt=0;
var   nTp=0;
  var   offsetParent   =   o;
  while   (offsetParent!=null   &&   offsetParent!=document.body)   {
  nLt+=offsetParent.offsetLeft;
  nTp+=offsetParent.offsetTop;
  offsetParent=offsetParent.offsetParent;
  }
  this.showL=nLt;
  this.showT=nTp;
  this.showW=this.offsetWidth;
  this.showH=this.offsetHeight;
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    };
  }
}

function addEV(C,B,A){
 if(window.attachEvent){
  C.attachEvent("on"+B,A);
  }else{
   if(window.addEventListener){
    C.addEventListener(B,A,false);
    }
  }
}
function removeEV(C,B,A){
 if(window.attachEvent){
  C.detachEvent("on"+B,A);
  }else{
   if(window.addEventListener){
    C.removeEventListener(B,A,false);
    }
  }
}


//dynamic include another js file
function include_js(path,reload)
{
	var scripts = document.getElementsByTagName("script");
	if (reload==null || !reload)
	for (var i=0;i<scripts.length;i++){
		if (scripts[i].src && scripts[i].src.toLowerCase() == path.toLowerCase() )
			return;
	}
	var sobj = document.createElement('script');
	sobj.type = "text/javascript";
	sobj.src = path;
	var headobj = document.getElementsByTagName('head')[0];
	headobj.appendChild(sobj);
}

//----------动态加载-------------//
function LoadJS(fileUrl,type)
{
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript= document.createElement("script");
    oScript.type = "text/javascript";
	if(!!type){
	oScript.charset="gb2312";
	}
    oScript.src=fileUrl ;
    oHead.appendChild(oScript);
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	 var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	 if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	 d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}


function boxFloat(obj,elem){
	var nmove,mmove,
		d = document,
		o = d.getElementById(obj),
		s = d.getElementById(elem);
	if(!o){ return false;}
	if(!s){ return false;}

	s.onmouseover=function(){
		clearTimeout(nmove);
		s.style.display="block";
//		s.style.cursor="pointer";
	};
	o.onmouseover=function(){
		clearTimeout(nmove);
		mmove=setTimeout(function(){

			s.style.display="block";
			if(obj.indexOf("ordersStatus_") != -1){
				var id = obj.substring(obj.indexOf("_")+1,obj.length);
				 jQuery("#detailOrdersStatus_"+id).load("/orders/status.do?id="+id,function (data){
				});
			}
			if(obj=="orderStatusIndex"){
				var id = document.getElementById("orderStatusId").value;
				indexOrdersStatus(id);
			}

		},100);

	};
	o.onmouseout=function(){
		clearTimeout(mmove);
		nmove=setTimeout(function(){s.style.display="none";},500);
	};
	s.onmouseout=function(){
		nmove=setTimeout(function(){s.style.display="none";},500);
	};
	s.onmousedown=function(e){
		stopBubble(e);
	};
}
boxFloat("languageTypeStyle","languageTypeStyleId");
boxFloat("personalNetAssetsExplain","personalNetAssetsExplainBlock");
boxFloat("personalNetAssetsBorrowed","personalNetAssetsBorrowedBlock");
boxFloat("personalNetAssetsCanBorrowed","personalNetAssetsCanBorrowedBlock");
boxFloat("buyInsuranceDiv","buyInsuranceExplainBlock");
boxFloat("positionOfBtcWithdrawal","positionOfBtcWithdrawalBlock");
boxFloat("positionOfConfirmAddr","positionOfConfirmAddrBlock");
boxFloat("quickBorrowCueIcon","quickBorrowCue");
boxFloat("orderBorrowCueIcon","orderBorrowCue");
boxFloat("iconStationCueIcon","iconStationCue");
boxFloat("quickBorrowCueClienceIcon","quickBorrowCueClience");
boxFloat("orderBorrowCueClienceIcon","orderBorrowCueClience");


boxFloat("iconStationCueIconBuy","iconStationCueBuy");
boxFloat("iconStationCueIconSell","iconStationCueSell");
boxFloat("iconStationCueIconBuyPrice","iconStationCueBuyPrice");
boxFloat("iconStationCueIconSellPrice","iconStationCueSellPrice");

boxFloat("iconSingleAvgIconBuy","iconSingleAvgBuy");
boxFloat("iconDepthRangeIconBuy","iconDepthRangeBuy");
boxFloat("iconProtePriceIconBuy","iconProtePriceBuy");
boxFloat("iconSingleAvgIconSell","iconSingleAvgSell");
boxFloat("iconDepthRangeIconSell","iconDepthRangeSell");
boxFloat("iconProtePriceIconSell","iconProtePriceSell");

boxFloat("iconPriceRangeIconBuy","iconPriceRangeBuy");
boxFloat("iconOrderRatioIconBuy","iconOrderRatioBuy");
boxFloat("iconProtePrice1IconBuy","iconProtePrice1Buy");
boxFloat("iconOrderIntervalIconBuy","iconOrderIntervalBuy");
boxFloat("iconSingleMaxIconBuy","iconSingleMaxBuy");
boxFloat("iconPriceRangeIconSell","iconPriceRangeSell");
boxFloat("iconOrderRatioIconSell","iconOrderRatioSell");
boxFloat("iconProtePrice1IconSell","iconProtePrice1Sell");
boxFloat("iconOrderIntervalIconSell","iconOrderIntervalSell");
boxFloat("iconSingleMaxIconSell","iconSingleMaxSell");

boxFloat("futureIconStationCueOneA","futureIconStationCueOne");
boxFloat("futureEliteStationCueOneA","futureEliteCueOne");
boxFloat("futureIconStationCueTwoA","futureIconStationCueTwo");
boxFloat("futureIconStationCueThreeA","futureIconStationCueThree");
boxFloat("futureChangeMPositionA","futureChangeMPosition");
boxFloat("currentpriceTitleImg","currentpriceTitle");
boxFloat("futureChangeSPositionA","futureChangeSPosition");
boxFloat("futureBanerCueOneA","futureBanerCueOne");
boxFloat("futureBanerCueTwoA","futureBanerCueTwo");
boxFloat("futureContractBanlanceA","futureContractBanlance");
boxFloat("futureBanerCueThreeA","futureBanerCueThree");
boxFloat("futureBanerCueFourA","futureBanerCueFour");
boxFloat("futureBanerCueFiveA","futureBanerCueFive");
boxFloat("futureBanerCueSixA","futureBanerCueSix");
boxFloat("futureIconStationCueIndexA","futureIconStationCueIndex");
boxFloat("futureCnyUsdChangeA","futureCnyUsdChange");
boxFloat("futureContBtcChangeA","futureContBtcChange");
boxFloat("futureContBtcChangeA_1","futureContBtcChange_1");
boxFloat("iconStationCueIconStrategyBuy","iconStationCueStrategyBuy");
boxFloat("iconStationCueIconStrategySell","iconStationCueStrategySell");
boxFloat("iconStationCueIconLtc","iconStationCueLtc");
boxFloat("iconStationCueIconBtc","iconStationCueBtc");
boxFloat("futureIconDeliveryPrice","futureIconDeliveryPriceCue");
boxFloat("futureDataListIcon","futureDataList");
//boxFloat("baozhengjina","baozhengjin");
//boxFloat("futureIconPlanCueOneA","futureIconPlanCueOne");
boxFloat("abaozhengjina","abaozhengjin");
boxFloat("brokepricetipA","brokepricetip");
boxFloat("futureSingleDataIcon","futureSingleDataList");
boxFloat("deptMerge_A","deptMerge_span");

boxFloat("contractavgpriceTitle2","contractavgpriceTitle1");
boxFloat("rate","rate_str");
boxFloat("costpriceTitle2","costpriceTitle1");

//api
boxFloat("restSampleTitleImg","restSampleTitle");
function totalAssetsBox(obj,elem,updown){
	var nmove,mmove,
	d = document,
	o = d.getElementById(obj),
	s = d.getElementById(elem);
	u = d.getElementById(updown);
	if(!o){ return false;}
	if(!s){ return false;}
	if(!u){ return false;}

	s.onmouseover=function(){
		clearTimeout(nmove);
		s.style.display="block";
		u.className = "controlUp";
	};

	o.onmouseover=function(){
		clearTimeout(nmove);
		mmove=setTimeout(function(){
			s.style.display="block";
			u.className = "controlUp";
		},100);
	}

	o.onmouseout=function(){
		clearTimeout(mmove);
		nmove=setTimeout(function(){s.style.display="none";u.className = "controlDown";},500);
	};
	s.onmouseout=function(){
		nmove=setTimeout(function(){s.style.display="none";u.className = "controlDown";},500);
	};
	s.onmousedown=function(e){
		stopBubble(e);
	};
}
totalAssetsBox("totalAssets","totalAssetsTable","controlUpDown");


function ShowMemo(obj,id)
{
	$("Memo"+id).style.display = "";
}

function HideMemo(id)
{
	$("Memo"+id).style.display = "none";
}

function dialogBoxHidden(){
	var d=document,
  o=d.getElementById("dialogBoxShadow");
 if(!o) return false;
	d.body.removeChild(o);
}

function dialogBoxShadow(f){
	dialogBoxShadowMove(f,true);
}

function dialogBoxShadowMove(f,canmove){
	 var d = document,
	  divs=d.createElement("div"),
	  doc = d[d.compatMode == "CSS1Compat"?'documentElement':'body'],
	  h = f?doc.clientHeight:Math.max(doc.clientHeight,doc.scrollHeight);
	 divs.setAttribute("id","dialogBoxShadow");
	 d.body.appendChild(divs);
	 var o = d.getElementById('dialogBoxShadow');
	 o.style.cssText +="	;position:absolute;top:0;left:0;z-index:100;background:#000;opacity:0.4;filter:Alpha(opacity=20);width:100%;height:"+h+"px";
	 if(canmove) addMoveEvent("dialog_title","dialog_content");
}

function addMoveEvent(titleobj,contentobj){
	 var titleobj = document.getElementById(titleobj);
	 var contentobj=document.getElementById(contentobj);
	 if(titleobj!=null&&contentobj!=null){
		var bDrag = false;
		var disX = disY = 0;
		titleobj.onmousedown = function (event)
		{
			var event = event || window.event;
			bDrag = true;
			disX = event.clientX - contentobj.offsetLeft;
			disY = event.clientY - contentobj.offsetTop;
			this.setCapture && this.setCapture();
			return false;
		};
		document.onmousemove = function (event)
		{
			if (!bDrag) return;
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxL = document.documentElement.clientWidth - contentobj.offsetWidth;
			var maxT = document.documentElement.clientHeight - contentobj.offsetHeight;
			iL = iL < 0 ? 0 : iL;
			iL = iL > maxL ? maxL : iL;
			iT = iT < 0 ? 0 : iT;
			iT = iT > maxT ? maxT : iT;

			contentobj.style.marginTop = contentobj.style.marginLeft = 0;
			contentobj.style.left = iL + "px";
			contentobj.style.top = iT + "px";
			return false;
		};
		document.onmouseup = window.onblur = titleobj.onlosecapture = function ()
		{
			bDrag = false;
			titleobj.releaseCapture && titleobj.releaseCapture();
		};
	 }

}

//-----------------弹出层定位--------------------//
function skillsPosition(obj,x){
var o=$(obj),h,oh,w,oc;
if(!o) return false;
o.style.display="block";
h=parseInt(getStyle(o,"height"));
w=parseInt(getStyle(o,"width"));
oh=";display:block;top:50%;margin-top:"+(-h/2)+"px";
o.style.cssText=!x?oh:(oh+";left:50%;margin-left:"+(-w/2)+"px");
}


/*弹出层绝对居中定位*/
function setObjCenter(id){
	var d=document;
	var obj = d.getElementById(id);
	var data={
		ow:obj.clientWidth,
		oh:obj.clientHeight,
		vw:(function(){
		if (d.compatMode == "BackCompat"){
			return d.body.clientWidth;
		} else {
			return d.documentElement.clientWidth;
		}
		})(),
		vh:(function(){
		if (d.compatMode == "BackCompat"){
			return d.body.clientHeight;
		} else {
			return d.documentElement.clientHeight;
		}
		})(),
		st:(d.body.scrollTop||d.documentElement.scrollTop)
	};
	//obj.style.display="block";
	obj.style.left=(data.vw-data.ow)/2+"px";
	obj.style.margin=0;
	if(!!window.XMLHttpRequest){
		obj.style.position="fixed";
		obj.style.top=(data.vh-data.oh)/2+"px";
	}else{
		obj.style.position="absolute";
		obj.style.top=(data.vh-data.oh)/2+data.st+"px";
		if(obj.style.backgroundAttachment)
			obj.style.backgroundAttachment="absolute !important";
		window.onscroll=function(){obj.style.top=(d.body.scrollTop||d.documentElement.scrollTop)+(data.vh-data.oh)/2+'px';};
	}
}
//id 0:登录层 1:注册层
/**
 * id 0:登录页面 1:注册页面
 * id url:登录页面后跳转到该页面
 */
function showlogin(id){
	var href = document.getElementById("coinMainUrl").value;
	if(id == 0){
		href += "/user/login.do";
	}else if(id == 1){
		href += "/user/regedit.do";
	}else{
		href += "/user/login.do?forward="+id;
	}
	window.location.href = href;

//	jQuery.ajaxSetup ({
//		cache: false
//	});
//	document.getElementById("okcoinPop").style.display="block";
//	jQuery("#okcoinPop").load("/user/login.do?type="+id,function (data){
//		dialogBoxShadow();
//		showDialog(id);
//	});
}
function closelogin(){
	dialogBoxHidden();
	document.getElementById("okcoinPop").style.display="none";
	document.getElementById("okcoinPop").innerHTML="";
}

/*gobacktop*/

if(document.body !=null && document.body.scrollHeight>1200){
	goBackTop("goBackTop");
}
function goBackTop(id){
var oBtn=document.getElementById(id);
if(oBtn==null){
   return;
}

addEV(window,"scroll",function(){
	var sT=document.documentElement.scrollTop||document.body.scrollTop;
	var sH=document.documentElement.clientHeight;
	if(sT>180){
		oBtn.style.display="block";
		if(-1!=window.navigator.userAgent.indexOf('MSIE 6.0') && -1==window.navigator.userAgent.indexOf('MSIE 7.0') && -1==window.navigator.userAgent.indexOf('MSIE 8.0'))// for ie6
	{
		oBtn.style.bottom="auto";
		oBtn.style.top=sT+sH-oBtn.offsetHeight+"px";
	}
	}
	else{
		oBtn.style.display="none";
	}

});
}

function okcoinAlert(str,pro,callback,btnTitle) {
	/*
	*@str 传入提示内容
	*@pro 可选，取消按钮
	*返回值，确定为true，取消和关闭都为false
	*/
		if(btnTitle == "" || btnTitle == "undefined" || btnTitle==null){
			btnTitle = oksure;
		}
		var d = document, obj , tempStr = [] , dEle = d.documentElement , ieSix = (!window.XMLHttpRequest);
		var callback=callback||{okBack:function(){return true;},noBack:function(){return false;}};
		function gid(id){return d.getElementById(id);}
		if(!!gid("okcoinAlert")){
			d.body.removeChild(gid("okcoinAlert"));
		}
		obj = d.createElement("div");
		obj.className="okcoinPop";
		obj.id="okcoinAlert";



		//tempStr.push('<iframe id="alertIframe" scrolling="no" style="border:0;height:100%;_height:255px;width:100%;left:0;top:0;z-index:-1;position:absolute;"></iframe>');
		tempStr.push('<div class="small_content" id="alertBody">');
		tempStr.push('<div class="orderFloorTitle"><span style="float:left;">&nbsp;&nbsp;OKCoin&nbsp;'+notices+'</span><span style="float:right;"><a id="alertClose" href="javascript:void(0);" class="dialog_closed" title='+coincommonjs2+'></a></span></div>');
		tempStr.push('<div class="smallFloor"  style="text-align:left;padding:0px 25px;">'+str+'</div>');
		//tempStr.push('<div class="rechargeError"></div>');
        if(btnTitle.length<16)
		    tempStr.push('<div class="orderFloor-button center"><a class="button buttonSize-min button_blue_min" type="button" id="alertOk" title="'+btnTitle+'">'+btnTitle+'</a>');
		else
            tempStr.push('<div class="orderFloor-button center"><a class="button buttonSize-min button_blue_min" style="height: 60px" type="button" id="alertOk" title="'+btnTitle+'">'+btnTitle+'</a>');
        if(!!!pro){
			tempStr.push('</div>');
			}else{
			tempStr.push('&nbsp;&nbsp;<a id="alertNo" class="button button_blue_border buttonSize-min" type="button" title='+get$("cancle")+'>'+get$("cancle")+'</a></div>');
		}

		tempStr.push('</div>');
		obj.innerHTML=tempStr.join("");
		d.body.appendChild(obj);
		dialogBoxShadow();
		var os = obj.style;
		os.display="block";
		var temptop = d.body.scrollTop+d.documentElement.scrollTop;
		os.left=(dEle.clientWidth-obj.clientWidth)/2+dEle.scrollLeft+"px";
		os.top=(dEle.clientHeight-obj.clientHeight)/2+dEle.scrollTop+d.body.scrollTop+"px";
		if(ieSix){os.top=(dEle.clientHeight-obj.clientHeight)/2+temptop+"px";}
		os.position ="absolute";
		os.zIndex="100000";
		function fixed(){
			os.top=(dEle.clientHeight-obj.clientHeight)/2+dEle.scrollTop+d.body.scrollTop+"px";
		}
		if(ieSix){
			addEV(window,"scroll",fixed);
		}else{
			addEV(window,"scroll",fixed);
		}
		function hideObj(){
			d.body.removeChild(obj);
			dialogBoxHidden();
			os.display="none";
			if(ieSix){
				window.detachEvent("onscroll",fixed);
			}
		}
		gid("alertClose").onclick=function(){
			hideObj();
			if(!!callback.noBack){
				callback.noBack();
			}
			return false;
		};
		gid("alertOk").onclick=function(){
			hideObj();
			if(!!callback.okBack){
				callback.okBack();
			}
			return true;
		};
		if(!!pro){
			gid("alertNo").onclick=function(){
				hideObj();
			if(!!callback.noBack){
				callback.noBack();
			}
				return false;
			};
		}
		return true;
	}
function okcoinAlertOption(str,pro,callback,btnTitle) {
    /*
     *@str 传入提示内容
     *@pro 可选，取消按钮
     *返回值，确定为true，取消和关闭都为false
     */
    if(btnTitle == "" || btnTitle == "undefined" || btnTitle==null){
        btnTitle = oksure;
    }
    var d = document, obj , tempStr = [] , dEle = d.documentElement , ieSix = (!window.XMLHttpRequest);
    var callback=callback||{okBack:function(){return true;},noBack:function(){return false;}};
    function gid(id){return d.getElementById(id);}
    if(!!gid("okcoinAlert")){
        d.body.removeChild(gid("okcoinAlert"));
    }
    obj = d.createElement("div");
    obj.className="okcoinPop";
    obj.id="okcoinAlert";



    //tempStr.push('<iframe id="alertIframe" scrolling="no" style="border:0;height:100%;_height:255px;width:100%;left:0;top:0;z-index:-1;position:absolute;"></iframe>');
    tempStr.push('<div class="small_content" id="alertBody">');
    tempStr.push('<div class="orderFloorTitle"><span style="float:left;">&nbsp;&nbsp;OKCoin&nbsp;'+notices+'</span><span style="float:right;"><a id="alertClose" href="javascript:void(0);" class="dialog_closed" title='+coincommonjs2+'></a></span></div>');
    tempStr.push('<div class="smallFloor"  style="text-align:left;padding-left:25px;margin-bottom:0px;">'+str+'</div>');
    tempStr.push('<div style="display:inline-block;"><input id="confirmNextTime" type="checkbox" onchange="changeSelectOpetion()" style="margin:2px 0px 0px 34px;float:left;"/>'+'<span style="display:inline-block;float:left;width:310px;margin-left:5px;">'+notipnexttime+'</span>'+'</div>');
    //tempStr.push('<div class="rechargeError"></div>');
    if(btnTitle.length<16)
        tempStr.push('<div class="orderFloor-button center"><a class="button buttonSize-min button_blue_min" type="button" id="alertOk" title="'+btnTitle+'">'+btnTitle+'</a>');
    else
        tempStr.push('<div class="orderFloor-button center"><a class="button buttonSize-min button_blue_min" style="height: 60px" type="button" id="alertOk" title="'+btnTitle+'">'+btnTitle+'</a>');
    if(!!!pro){
        tempStr.push('</div>');
    }else{
        tempStr.push('&nbsp;&nbsp;<a id="alertNo" class="button button_blue_border buttonSize-min" type="button" title='+get$("cancle")+'>'+get$("cancle")+'</a></div>');
    }
    tempStr.push('</div>');
    obj.innerHTML=tempStr.join("");
    d.body.appendChild(obj);
    dialogBoxShadow();
    var os = obj.style;
    os.display="block";
    var temptop = d.body.scrollTop+d.documentElement.scrollTop;
    os.left=(dEle.clientWidth-obj.clientWidth)/2+dEle.scrollLeft+"px";
    os.top=(dEle.clientHeight-obj.clientHeight)/2+dEle.scrollTop+d.body.scrollTop+"px";
    if(ieSix){os.top=(dEle.clientHeight-obj.clientHeight)/2+temptop+"px";}
    os.position ="absolute";
    os.zIndex="100000";
    function fixed(){
        os.top=(dEle.clientHeight-obj.clientHeight)/2+dEle.scrollTop+d.body.scrollTop+"px";
    }
    if(ieSix){
//			gid("alertIframe").style.height=gid("alertBody").offsetHeight+"px";
//			gid("alertIframe").style.width=gid("alertBody").offsetWidth+"px";
//			gid("alertIframe").style.top = gid("alertBody").style.top+"px";
//			gid("alertIframe").style.left = gid("alertBody").style.left+"px";

        addEV(window,"scroll",fixed);
    }else{
        addEV(window,"scroll",fixed);
    }
    function hideObj(){
        d.body.removeChild(obj);
        dialogBoxHidden();
        os.display="none";
        if(ieSix){
            window.detachEvent("onscroll",fixed);
        }
    }
    gid("alertClose").onclick=function(){
        hideObj();
        if(!!callback.noBack){
            callback.noBack();
        }
        return false;
    };
    gid("alertOk").onclick=function(){
        hideObj();
        if(!!callback.okBack){
            callback.okBack();
        }
        return true;
    };
    if(!!pro){
        gid("alertNo").onclick=function(){
            hideObj();
            if(!!callback.noBack){
                callback.noBack();
            }
            return false;
        };
    }
    return true;
}
var changeSelectOptionValue = 0;
function changeSelectOpetion(){
    if(jQuery("#confirmNextTime").attr("checked")=="checked"){
        changeSelectOptionValue=1;
    }else{
        changeSelectOptionValue=0;
    }
}
function settingConfigure(type,val){
    var url = "/user/configure.do?random="+Math.round(Math.random()*100);
    var param = {type:type,status:val};
    jQuery.post(url,param,function(data){
            if(data==1)
                console.log("成功关闭提示框")
            else
                console.log("未关闭提示框")
        }
    );
}

//----------------uuid file ------------------------//
/*
http://www.af-design.com/services/javascript/uuid/
uuid.js - Version 0.3
JavaScript Class to create a UUID like identifier
*/

// On creation of a UUID object, set it's initial value
function UUID(){
	this.id = this.createUUID();
}

// When asked what this Object is, lie and return it's value
UUID.prototype.valueOf = function(){ return this.id; };
UUID.prototype.toString = function(){ return this.id; };

//
// INSTANCE SPECIFIC METHODS
//

UUID.prototype.createUUID = function(){
	//
	// Loose interpretation of the specification DCE 1.1: Remote Procedure Call
	// described at http://www.opengroup.org/onlinepubs/009629399/apdxa.htm#tagtcjh_37
	// since JavaScript doesn't allow access to internal systems, the last 48 bits
	// of the node section is made up using a series of random numbers (6 octets long).
	//
	var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
	var dc = new Date();
	var t = dc.getTime() - dg.getTime();
	var h = '';
	var tl = UUID.getIntegerBits(t,0,31);
	var tm = UUID.getIntegerBits(t,32,47);
	var thv = UUID.getIntegerBits(t,48,59) + '1'; // version 1, security version is 2
	var csar = UUID.getIntegerBits(UUID.rand(4095),0,7);
	var csl = UUID.getIntegerBits(UUID.rand(4095),0,7);

	// since detection of anything about the machine/browser is far to buggy,
	// include some more random numbers here
	// if NIC or an IP can be obtained reliably, that should be put in
	// here instead.
	var n = UUID.getIntegerBits(UUID.rand(8191),0,7) +
			UUID.getIntegerBits(UUID.rand(8191),8,15) +
			UUID.getIntegerBits(UUID.rand(8191),0,7) +
			UUID.getIntegerBits(UUID.rand(8191),8,15) +
			UUID.getIntegerBits(UUID.rand(8191),0,15); // this last number is two octets long
	return tl + h + tm + h + thv + h + csar + csl + h + n;
};


//
// GENERAL METHODS (Not instance specific)
//


// Pull out only certain bits from a very large integer, used to get the time
// code information for the first part of a UUID. Will return zero's if there
// aren't enough bits to shift where it needs to.
UUID.getIntegerBits = function(val,start,end){
	var base16 = UUID.returnBase(val,16);
	var quadArray = new Array();
	var quadString = '';
	var i = 0;
	for(i=0;i<base16.length;i++){
		quadArray.push(base16.substring(i,i+1));
	}
	for(i=Math.floor(start/4);i<=Math.floor(end/4);i++){
		if(!quadArray[i] || quadArray[i] == '') quadString += '0';
		else quadString += quadArray[i];
	}
	return quadString;
};

// Replaced from the original function to leverage the built in methods in
// JavaScript. Thanks to Robert Kieffer for pointing this one out
UUID.returnBase = function(number, base){
	return (number).toString(base).toUpperCase();
};

// pick a random number within a range of numbers
// int b rand(int a); where 0 <= b <= a
UUID.rand = function(max){
	return Math.floor(Math.random() * (max + 1));
};

// end of UUID class file

//----------------uuid file end-----------------------//

//-----------------cookies file -----------------------//
function CookieClass()
{
	this.expires = 60*24*7 ; //有效时间,以分钟为单位
	this.path = ""; //设置访问路径
	this.domain = ""; //设置访问主机
	this.secure = false; //设置安全性

	this.setCookie = function(name,value)
	{
	   var str = name+"="+escape(value);
	   if (this.expires>0)
	   {
	    //如果设置了过期时间
	    var date=new Date();
	    var ms=this.expires * 60 * 1000; //每分钟有60秒，每秒1000毫秒
	    date.setTime(date.getTime()+ms);
	    str+="; expires="+date.toGMTString();
	   }
	   str+="; path=/";
	   //if(this.path!="")str+="; path=/";//+this.path; //设置访问路径
	   if(this.domain!="")str+="; domain="+this.domain; //设置访问主机
	   if(this.secure!="")str+="; true"; //设置安全性
	   document.cookie=str;
	};

	this.getCookie=function(name)
	{
	   var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对
	   //var cookie=new Object();
	   for(var i=0;i<cookieArray.length;i++)
	   {
	    var arr=cookieArray[i].split("="); //将名和值分开
	    if(arr[0]==name)return unescape(arr[1]); //如果是指定的cookie，则返回它的值
	   }
	   return "";
	};

	this.deleteCookie=function(name)
	{
	   var date=new Date();
	   var ms= 1 * 1000;
	   date.setTime(date.getTime() - ms);
	   var str = name+"=no; expires=" + date.toGMTString(); //将过期时间设置为过去来删除一个cookie
	   document.cookie=str;
	};

	this.showCookie=function()
	{
	   alert(unescape(document.cookie));
	};
}
/***
 * 桌面提示
 * @constructor
 */
var NotifyMsg=new function(){
    this.allowShow=function(){
        var support=false;
        if(this.isSupport()&&Notification.permission=='default'){
            Notification.requestPermission(function(result){
                if("granted"==Notification.permission){
                    support=true;
                }
            });
        }else if("granted"==Notification.permission){
            support=true;
        }
        return support;
    }
    this.isSupport=function(){
        if(window.Notification){
            return true;
        }else{
            return false;
        }
    }
    this.showMsg=function(title,msg,callBack){
        var isShow=getCookieValue("SHOW_NOTIFY");
        if(this.allowShow()&&isShow==0){
            var options = {
                body: msg,
                icon: '../image/index/logo_shows.jpg'
            }
            var n = new Notification(title,options);
            setTimeout(n.close.bind(n), 5000);
            n.onclick=function(){
                window.focus();
                if(!!callBack){
                    callBack();
                }
            }
        }
    }

}

var getshowMsg=function(order){
    var symbol=jQuery("#symbol").val();
    var msg=get$("turnover")+":"+getCurrencySymbol()+formatValue(order.averagePrice,SYMBOLS_UTIL.priceRate[Number(symbol)]);
    msg+=get$("kline1_volume1")+":"+SYMBOLS_UTIL.symbolStr[Number(symbol)]+formatValue(order.dealAmount,SYMBOLS_UTIL.amountRate[Number(symbol)]);
    return msg;
}
var getShowTite=function(order){
    var symbol=jQuery("#symbol").val();
    var msg=SYMBOLS_UTIL.symbolStr2[symbol];
    msg += order.tradeType == 1 ? get$("immediatelybuy") : get$("immediatelysell");
    if(order.tradeCnyPrice == 1000000||order.tradeCnyPrice ==0) {
        msg +=get$("trade_entrust_ten_instant");
    }else{
        msg+=get$("futureplanentrust2");
    }
    msg+=get$("alreadDeall");
    return msg;
}




/*
//imgLoad("imgLoad");
//imgLoad("windowImg","li",1);
参数1为图片所在模块
参数2为图片所在循环元素；不写默认为“li”
参数3为window滚动触发事件，这个参数存在时必须填写参数2；不写默认为模块滚动触发事件
//鼠标滚轮事件
*/

  //----------图片延时加载-------------//
function imgLoad(o,tags,f){
 var d=document,
 doc = d[d.compatMode == "CSS1Compat"?'documentElement':'body'],
 o=d.getElementById(o),
 tags=tags?tags:"li";
 if(!o){return false;}
  var j,s=o.getElementsByTagName("img"),
  e=o.getElementsByTagName(tags),
  topnum = (navigator.userAgent.indexOf("WebKit")==-1)?d.documentElement:d.body,
  autoLength = o.getElementsByTagName(tags)[0].getElementsByTagName("img").length,
  autoMarL = (!-[1,])?(parseInt(getStyle(e[0],"marginLeft"))):(parseInt(getStyle(e[0],"margin-left"))),
  autoMarR = (!-[1,])?(parseInt(getStyle(e[0],"marginRight"))):(parseInt(getStyle(e[0],"margin-right"))),
  autoMarT = (!-[1,])?(parseInt(getStyle(e[0],"marginTop"))):(parseInt(getStyle(e[0],"margin-top"))),
  autoMarB = (!-[1,])?(parseInt(getStyle(e[0],"marginBottom"))):(parseInt(getStyle(e[0],"margin-bottom"))),
  autoHeight = e[0].offsetHeight + autoMarT + autoMarB,
  autoWidth = e[0].offsetWidth + autoMarL + autoMarR,
  maxHeight = o.offsetHeight -16,
  maxWidth = o.offsetWidth - 16;
 var autoLoad = function(){
  var maxWindow = doc.clientHeight,
  sObj=new getXYWH(o);
  j = f?Math.ceil((maxWindow - sObj.showT)/autoHeight)*Math.ceil(maxWidth/autoWidth)*autoLength:Math.ceil(maxHeight/autoHeight)*Math.ceil(maxWidth/autoWidth)*autoLength;
  j = (j < 0) ? 0 : j;
  j = (j < s.length) ? j : s.length;
  /*默认显示图片*/
  for(var i=0;i<j;i++){
  s[i].src = s[i].getAttribute("docsrc");
  }
 };
 /*滚动显示*/
 var scrollLoad = function(){
  var activeHeight = f?topnum.scrollTop:o.scrollTop,
  activeWidth = f?topnum.scrollLeft:o.scrollLeft,
  m= (Math.ceil(activeHeight/autoHeight)*Math.ceil(maxWidth/autoWidth) + Math.ceil(activeWidth/autoWidth)*Math.ceil(maxHeight/autoHeight))*autoLength,
  n=((m+j)>e.length)?e.length:(m+j);
  for(var i = j;i<n;i++){
   s[i].src = s[i].getAttribute("docsrc");
   if(s[(e.length-1)].src!==""){
    break;
   }
  }
 };
 (f?window:o).onscroll = function(){
  scrollLoad();
 };
 /*重新计算*/
 window.onresize = function(){
  autoLoad();
  scrollLoad();
 };
 autoLoad();
}

var availableTagsDef = ["","@qq.com","@163.com","@126.com","@sina.com","@gmail.com","@foxmail.com","@sohu.com","@vip.qq.com","@hotmail.com","@163.net","@sina.com.cn","@139.com","@189.cn"];
var availableTags = ["","@qq.com","@163.com","@126.com","@sina.com","@gmail.com","@foxmail.com","@sohu.com","@vip.qq.com","@hotmail.com","@163.net","@sina.com.cn","@139.com","@189.cn"];
function emailOnkeyUp(obj){
	for ( var i = 0; i < availableTags.length; i++) {
		var reg = new RegExp(/^[a-zA-Z0-9_]{1,}$/);
		if(reg.test(obj.value)){
			availableTags[i] = obj.value+availableTagsDef[i];
		}
	}
}

function emailOnkeyUp2(obj){
	obj.value = obj.value.replace(/[^a-zA-Z0-9_\-\.\+@]/g,'');
}

function phoneOnkeyUp(obj){
	var areaCode = 86;
    var areaCodeInput = document.getElementById("areaCode");
	if(areaCodeInput){
		areaCode = trim(areaCodeInput.value);
	}
    if(document.getElementById("mobileAreaCode")){
        areaCode = jQuery("#mobileAreaCode").attr("codeValue");
    }
	if(areaCode==86 || areaCode==0){
		obj.value = obj.value.replace(/\D/g,'').substring(0,11);
	}else{
		obj.value = obj.value.replace(/\D/g,'');
	}
}

function phoneOnkeyUp2(obj){
	obj.value = obj.value.replace(/\D/g,'');
}

function regRanCodeOnkeyUp(obj){
	var ranCode = obj.value;
	var msgCodeBindBtn = document.getElementById("msgCodeBindBtn");
	var desc='';

	// 判断是否存于短信1分钟冻结状态
	if(msgCodeBindBtn.value.match(/^[0-9].+$/)){
		return ;
	}

	if(ranCode.length<4){
		msgCodeBindBtn.disabled = true;
		inputDisabledTrue("msgCodeBindBtn");
		return ;
	}else if(ranCode.length==4){
		// 校验验证码
		url = "/user/checkCaptcha.do?random="+Math.round(Math.random()*100);
		var param={ranCode:ranCode};
		jQuery.post(url,param,function(resultData){
			var result = eval('(' + resultData + ')');
			if(result!=null){
				var data = result.resultCode;
			}else{
				var data = -2;
			}

			if(data==1){
				desc = "";
				msgCodeBindBtn.disabled = false;
				inputDisabledFalse("msgCodeBindBtn");
			}else if(data==-1){
				desc = get$("wrongcodetryagain");
				msgCodeBindBtn.disabled = true;
				inputDisabledTrue("msgCodeBindBtn");
			}else if(data==-2){
				desc = get$("codeexpiredtryagain");
				msgCodeBindBtn.disabled = true;
				inputDisabledTrue("msgCodeBindBtn");
			}else{
				desc = get$("codeexpiredtryagain");
				msgCodeBindBtn.disabled = true;
				inputDisabledTrue("msgCodeBindBtn");
			}

			document.getElementById("regNameResult").style.display="block";
			document.getElementById("regNameResult").innerHTML="";
			document.getElementById("regNameResult").innerHTML=desc;
			if(document.getElementById("registerErrorTips")!=null){
				document.getElementById("registerErrorTips").innerHTML=desc;
			}
		});

	}else if(ranCode.length>4){
		desc = get$("thecodeformatincorrect");
		msgCodeBindBtn.disabled = true;
		inputDisabledTrue("msgCodeBindBtn");
	}

	document.getElementById("regNameResult").style.display="block";
	document.getElementById("regNameResult").innerHTML="";
	document.getElementById("regNameResult").innerHTML=desc;
	if(document.getElementById("registerErrorTips")!=null){
		document.getElementById("registerErrorTips").innerHTML=desc;
	}
	return;
}

function showDialog(id){
	if(id == 0 || id ==3){
		document.getElementById("loginDialog").style.display="block";
		document.getElementById("regDialog").style.display="none";
//		document.getElementById("regLi").className="";
//		document.getElementById("loginLi").className="cur";
		document.getElementById("spanLoginRegTitle").innerHTML=login;
		if(document.getElementById("loginUserName") != null){
			document.getElementById("loginUserName").focus();
		}
		if(document.getElementById("totpCode") != null){
			document.getElementById("totpCode").focus();
		}
		if(document.getElementById("totpCodeDialog") != null){
			document.getElementById("totpCodeDialog").focus();
		}
		jQuery("#loginPassword").focus(function() {
            callbackEnter(loginSubmit);
        });
		jQuery("#loginUserName").autocomplete({
			source: availableTags,
			autoFocus:false,
			matchContains:true,
			minLength:1
		});
	}else {
		document.getElementById("regDialog").style.display="block";
		document.getElementById("loginDialog").style.display="none";
//		document.getElementById("regLi").className="cur";
//		document.getElementById("loginLi").className="";
		document.getElementById("spanLoginRegTitle").innerHTML=signup;
        jQuery("#regRePassword").focus(function() {
            callbackEnter(regSubmit);
        });
		jQuery("#regUserName").autocomplete({
			source: availableTags,
			autoFocus:false,
			matchContains:false,
			minLength:1
		});
	}
}
/**
 * 根据symbol判断截位
 */
//newCoinLabel
function symbolSubPoint(symbol){
    return SYMBOLS_UTIL.priceRate[Number(symbol)] ;
}
var current_symbol=jQuery("#current_symbol").val();
function getRateBySymbolForcePrice(symbol){
    if(current_symbol==1){
        return SYMBOLS_UTIL.futurePriceRateCNY[Number(symbol)];
    }else{
        return SYMBOLS_UTIL.futurePriceRateUSD[Number(symbol)];
    }
}
//newCoinLabel
var FutureSymbolPoint = {
    LTC_CNY_POINT : 2,
    LTC_USD_POINT : 3,
    BTC_CNY_POINT : 1,
    BTC_USD_POINT : 2,
    LTC_CNY_INDEX : 3,
    LTC_USD_INDEX : 3,
    BTC_USD_INDEX : 2,
    BTC_CNY_INDEX : 2
};

function getCoinBalance(symbol) {
    switch (symbol) {
        case 0:
            return jQuery("#bannerUserBtcBalance").val();
        case 1:
            return jQuery("#bannerUserLtcBalance").val();
        default:
            return jQuery("#bannerUserBtcBalance").val();
    }
}

/****
 * 小数点截位
 */
//newCoinLabel
var SYMBOLS_UTIL=new function(){
    this.symbol=[0,1];//币种
    switch(Number(site_flag)){
        case 1:
            this.priceRate=[2,2];
            this.sign = "CNY";
            break;
        case 2:
            this.priceRate=[2,3];
            this.sign = "USD";
            break;
        default:
            this.priceRate=[2,2];
            break;
    }//价格截位
    this.amountRate=[3,2];//下单量截位
    this.marketFrom=[0,3];//币种对应marketFrom
    this.dealAmountRate=[2,1];//成交量截位
    this.symbolStr=['฿','Ł'];//币种符号
    this.symbolStr1=['btc','ltc'];
    this.symbolStr2=['BTC','LTC'];//币种符号全写
    this.futurePriceRateCNY=[FutureSymbolPoint.BTC_CNY_POINT,FutureSymbolPoint.LTC_CNY_POINT];//期货人民币截位
    this.futurePriceRateUSD=[FutureSymbolPoint.BTC_USD_POINT,FutureSymbolPoint.LTC_USD_POINT];//期货美元截位
    this.buyMin=[0.01,0.1];//最小购买量
    this.sellMin=[0.01,0.1];//最小卖出量
}
function symbolSubPaltPoint(symbol){
    return SYMBOLS_UTIL.priceRate[Number(symbol)];
}
function symbolAmountSubPoint(symbol){
    return SYMBOLS_UTIL.amountRate[Number(symbol)];
}

/**
 * 是否登录完成后跳转页面
 */
function isForward(){
	if(document.getElementById("forwardUrl")!=null && document.getElementById("chearShowLogin")==null){
		var forward = document.getElementById("forwardUrl").value;
		if(forward != ""){
			showlogin(0);
		}
	}

}
function loginNameOnblur(){
	var uName = document.getElementById("indexLoginName").value;
	if(! checkEmail(uName)){
		document.getElementById("indexLoginTips").style.display="block";
		document.getElementById("indexLoginTips").innerHTML="";
		document.getElementById("indexLoginTips").innerHTML=coincommonjs9;
		if(document.getElementById('indexLoginName') != null){
			if(document.getElementById('loginUserNameType') ==null){
			document.getElementById('indexLoginName').className='load-1';
			}else{
				document.getElementById('indexLoginName').className='txt';
			}
		}
	}else{
		document.getElementById("indexLoginTips").innerHTML="&nbsp;";
	}
}
function checkLoginUserName(){
	var uName = document.getElementById("loginUserName").value;
	if(uName == ""){
		document.getElementById("loginTips").style.display="block";
		document.getElementById("loginTips").innerHTML="";
		document.getElementById("loginTips").innerHTML=coincommonjs10;
		return false;
	}else if(! checkEmail(uName)){
		document.getElementById("loginTips").style.display="block";
		document.getElementById("loginTips").innerHTML="";
		document.getElementById("loginTips").innerHTML=coincommonjs9;
		return false;
	}
//	document.getElementById("loginTips").innerHTML="";
	return true;
}
function checkLoginPassword(){
	var password = document.getElementById("indexLoginPwd").value;
	if(password == ""){
		document.getElementById("indexLoginTips").style.display="block";
		document.getElementById("indexLoginTips").innerHTML="";
		document.getElementById("indexLoginTips").innerHTML=coincommonjs11;
		return false;
	}else if(password.length <6){
		document.getElementById("indexLoginTips").style.display="block";
		document.getElementById("indexLoginTips").innerHTML="";
		document.getElementById("indexLoginTips").innerHTML=coincommonjs12;
		return false;
	}

//	document.getElementById("loginTips").innerHTML="";
	return true;
}
function termsService(){
	if(!document.getElementById("agree").checked){
		document.getElementById("regBtn").disabled=true;
		document.getElementById("regBtn").className="newButton buttonfalse";
	}else{
		document.getElementById("regBtn").disabled=false;
		document.getElementById("regBtn").className="newButton newButtonBorder";
	}
}
function termsService2(){
	if(!document.getElementById("agree").checked){
		document.getElementById("regBtn").disabled=true;
		document.getElementById("regBtn").className="regeditButton disagree";
	}else{
		document.getElementById("regBtn").disabled=false;
		document.getElementById("regBtn").className="regeditButton agree";
	}
}
function useRegType(id){
	var str = "" ;
	var tips = "";
	var tipsInfo = "";
	if(id == 0){
		str = "<span class='orange'>*</span>"+coincommonjs13;
		tips = coincommonjs14+"<a href='javascript:useRegType(1);'  >"+coincommonjs15+"</a>";
		tipsInfo = coincommonjs16;
	}else{
		str = "<span class='orange'>*</span>"+coincommonjs17;
		tips = coincommonjs18+"<a href='javascript:useRegType(0);'  >"+coincommonjs19+"</a>";
		tipsInfo = coincommonjs20;
	}

	document.getElementById("regUserNameSpan").innerHTML="";
	document.getElementById("regUserNameSpan").innerHTML=str;
	document.getElementById("regUserNameTips").innerHTML="";
	document.getElementById("regUserNameTips").innerHTML=tips;
	document.getElementById("regType").value=id;
	document.getElementById("regUserName").value="";
	document.getElementById("regUserName").focus();
	document.getElementById("regNameResult").innerHTML=tipsInfo;
	document.getElementById("regNameResult").className="";
}
//验证注册名
function checkRegUserName(){

	var regType = document.getElementById("regType").value;
	if(regType==0){
		var regUserName = trim(document.getElementById("regPhoneNumber").value);
	}else{
		var regUserName = trim(document.getElementById("regUserName").value);
	}
	var areaCode = 86;
	var areaCodeInput = document.getElementById("areaCode");
	if(areaCodeInput){
		areaCode = trim(areaCodeInput.value);
	}
    if(document.getElementById("mobileAreaCode")){
        areaCode = jQuery("#mobileAreaCode").attr("codeValue");
    }

	var desc='';

	if(regType == 0){
		//验证手机号
		if(regUserName.indexOf(" ")>-1){
			desc=coincommonjs21;
		}else {
			if(regUserName==''){
				desc=coincommonjs22;
			}else{
				if(areaCode==86){
					if(!checkMobile(regUserName)){
						desc=coincommonjs23;
					}
				}else if(areaCode!=86){
					if(!checkPositiveNumber(regUserName)){
						desc=coincommonjs23;
					}
				}
			}
		}
	}else{
		//验证邮箱
		if(regUserName.indexOf(" ")>-1){
			desc=coincommonjs24;
		}else {
			if(regUserName==''){	desc=coincommonjs25; 	}
			else if(!checkEmail(regUserName)){ desc=coincommonjs26;	}
			else if (new RegExp("[,]","g").test(regUserName)){ desc=coincommonjs27; }
			else if(regUserName.length>100){	desc=coincommonjs28;	}
			var regokcoin = /^([a-zA-Z0-9_-])+@okcoin+(.[a-zA-Z0-9_-])+/;
			if(regokcoin.test(regUserName.toLowerCase())){ desc=coincommonjs29;	}
		}
	}
	if(desc!=""){
        if(document.getElementById("regNameResult")!=null) {
            document.getElementById("regNameResult").style.display = "block";
            document.getElementById("regNameResult").innerHTML = "";
            document.getElementById("regNameResult").innerHTML = desc;
        }
		if(document.getElementById("registerErrorTips")!=null){
			document.getElementById("registerErrorTips").innerHTML=desc;
		}
		return ;
	}else{
        if(document.getElementById("regNameResult")!=null) {
            document.getElementById("regNameResult").style.display = "block";
            document.getElementById("regNameResult").innerHTML = "";
        }
		if(document.getElementById("registerErrorTips")!=null){
			document.getElementById("registerErrorTips").innerHTML="&nbsp;";
		}
	}

	var url = "/user/reg/chcekregname.do?name=" + encodeURI(regUserName) +"&type="+regType+"&areaCode="+areaCode+"&random="+Math.round(Math.random()*100);
	 jQuery.get(url,null,function(data){
		if(data == 0){
			if(regType == 0){
				desc = coincommonjs30+"，"+coincommonjs31+"<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=2260505979&site=qq&menu=yes' title='联系QQ:2260505979'>"+coincommonjs33+"</a>";
			}else{
				desc = coincommonjs34;
			}
            if(document.getElementById("regNameResult")!=null) {
                document.getElementById("regNameResult").style.display = "block";
                document.getElementById("regNameResult").innerHTML = "";
                document.getElementById("regNameResult").innerHTML = desc;
            }
			if(document.getElementById("registerErrorTips")!=null){
				document.getElementById("registerErrorTips").innerHTML=desc;
			}
			return ;
		}if(data == -1){
			if(regType == 0){
				desc = coincommonjs23;
			}else{
				desc = coincommonjs26;
			}
             if(document.getElementById("regNameResult")!=null) {
                 document.getElementById("regNameResult").style.display = "block";
                 document.getElementById("regNameResult").innerHTML = "";
                 document.getElementById("regNameResult").innerHTML = desc;
             }
			if(document.getElementById("registerErrorTips")!=null){
				document.getElementById("registerErrorTips").innerHTML=desc;
			}
			return ;
		}else if(data==8){
			// 邮箱/手机号冲突次数过多
			if(regType == 0){
				desc = get$("signupregisteredphonetoomanytimes");
			}else{
				desc = get$("signupregisteredemailtoomanytimes");
			}
             if(document.getElementById("regNameResult")!=null) {
                 document.getElementById("regNameResult").style.display = "block";
                 document.getElementById("regNameResult").innerHTML = "";
                 document.getElementById("regNameResult").innerHTML = desc;
             }
			if(document.getElementById("registerErrorTips")!=null){
				document.getElementById("registerErrorTips").innerHTML=desc;
			}
			return ;
		}
	});
}
function checkPassword(){
//	document.getElementById("capStatus2").style.display = "none";
	var pwd = trim(document.getElementById("regPassword").value);
	var desc='';
	var c = new RegExp();
	c = /^[A-Za-z0-9_-]+$/;
	if(pwd == ""){
		desc=coincommonjs35;
	}else if(pwd.length <6){
		desc=coincommonjs12;
	}else if(pwd.length>32){
		desc=coincommonjs36;
	}
	if(desc!=""){
        if(document.getElementById("regNameResult")!=null) {
            document.getElementById("regNameResult").style.display = "block";
            document.getElementById("regNameResult").innerHTML = "";
            document.getElementById("regNameResult").innerHTML = desc;
        }
		if(document.getElementById("registerErrorTips")!=null){
			document.getElementById("registerErrorTips").innerHTML=desc;
		}
		return false;
	}else{
        if(document.getElementById("regNameResult")!=null) {
            document.getElementById("regNameResult").style.display = "block";
            document.getElementById("regNameResult").innerHTML = "";
        }
		if(document.getElementById("registerErrorTips")!=null){
			document.getElementById("registerErrorTips").innerHTML="&nbsp;";
		}
	}
	return true;
}
	function checkRePassword(){
//		document.getElementById("capStatus3").style.display = "none";
		var pwd = trim(document.getElementById("regPassword").value);
		var rePwd = trim(document.getElementById("regRePassword").value);
		var desc='';
		if(rePwd == ""){
			desc=coincommonjs37;
		}else if(rePwd.length <6){
			desc=coincommonjs12;
		}else if(pwd.length>32){
			desc=coincommonjs36;
		}else if(pwd != rePwd){
			desc=coincommonjs38;
		}
		if(desc!=""){
            if(document.getElementById("regNameResult")!=null) {
                document.getElementById("regNameResult").style.display = "block";
                document.getElementById("regNameResult").innerHTML = "";
                document.getElementById("regNameResult").innerHTML = desc;
            }
			if(document.getElementById("registerErrorTips")!=null){
				document.getElementById("registerErrorTips").innerHTML=desc;
			}
			return false;
		}else{
            if(document.getElementById("regNameResult")!=null) {
                document.getElementById("regNameResult").style.display = "block";
                document.getElementById("regNameResult").innerHTML = "";
            }
			if(document.getElementById("registerErrorTips")!=null){
				document.getElementById("registerErrorTips").innerHTML="&nbsp;";
			}
		}
		return true;
	}
	function checkRegUserNameNoJquery(){
		var regType = document.getElementById("regType").value;
		if(regType==0){
			var regUserName = trim(document.getElementById("regPhoneNumber").value);
		}else{
			var regUserName = trim(document.getElementById("regUserName").value);
		}

		var areaCode = 86;
		var areaCodeInput = document.getElementById("areaCode");
		if(areaCodeInput){
			areaCode = trim(areaCodeInput.value);
		}
        if(document.getElementById("mobileAreaCode")){
            areaCode = jQuery("#mobileAreaCode").attr("codeValue");
        }

		var desc='';
		if(regType == 0){
			//验证手机号
			if(regUserName.indexOf(" ")>-1){
				desc=coincommonjs21;
			}else {
				if(regUserName==''){
					desc=coincommonjs22;
				}else{
					if(areaCode==86){
						if(!checkMobile(regUserName)){
							desc=coincommonjs23;
						}
					}else if(areaCode!=86){
						if(!checkPositiveNumber(regUserName)){
							desc=coincommonjs23;
						}
					}
				}
			}
		}else{
			//验证邮箱
			if(regUserName.indexOf(" ")>-1){
				desc=coincommonjs24;
			}else {
				if(regUserName==''){	desc=coincommonjs25; 	}
				else if(!checkEmail(regUserName)){ desc=coincommonjs26;	}
				else if (new RegExp("[,]","g").test(regUserName)){ desc=coincommonjs27; }
				else if(regUserName.length>100){	desc=coincommonjs28;	}
			}
		}
		if(desc!=""){
            if(document.getElementById("regNameResult")!=null) {
                document.getElementById("regNameResult").style.display = "block";
                document.getElementById("regNameResult").innerHTML = "";
                document.getElementById("regNameResult").innerHTML = desc;
            }
			if(document.getElementById("registerErrorTips")!=null){
				document.getElementById("registerErrorTips").innerHTML=desc;
			}
			return false;
		}else{
			return true;
		}
	}

	function regSubmit(type){
		//点击按钮后让其置灰不可点并出现动态小点点
		var regeditValue = document.getElementById("regBtn").value;		//先前按钮的值
		waitingStation("regBtn",regeditValue);

		if(checkRegUserNameNoJquery() && checkPassword() && checkRePassword() ){
			if(document.getElementById("agree")!=null){
				if(!document.getElementById("agree").checked){
					return false;
				}
			}

			var regType = document.getElementById("regType").value;
			if(regType==0){
				var regUserName = trim(document.getElementById("regPhoneNumber").value);
			}else{
				var regUserName = trim(document.getElementById("regUserName").value);
			}

            if(document.getElementById("areaCode")) {
                var areaCodeInput = document.getElementById("areaCode");
            }
			var areaCode = -1;
			if(areaCodeInput){
				areaCode = trim(areaCodeInput.value);
			}
            if(document.getElementById("mobileAreaCode")){
                areaCode = jQuery("#mobileAreaCode").attr("codeValue");
            }
			var index = regUserName.lastIndexOf(".", 0);
			var end = regUserName.substring(index, regUserName.length);
			if(end.length == 2 && "cn" != end){
				if(!confirm(regUserName+coincommonjs39)){
					//恢复按钮让其可点击并去掉小点点
					cancelWaiting("regBtn",regeditValue);
					return;
				}
			}
			var pwd = trim(document.getElementById("regPassword").value);
			var urlName = "/user/reg/chcekregname.do?name=" + encodeURI(regUserName) +"&type="+regType+"&areaCode="+areaCode+"&random="+Math.round(Math.random()*100);
			jQuery.get(urlName,null,function(data){
				if(data == 0){
					if(regType == 0){
						desc = coincommonjs30+"，"+coincommonjs31+"<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=2260505979&site=qq&menu=yes' title='联系QQ:2260505979'>"+coincommonjs33+"</a>";
					}else{
						desc = coincommonjs34;
					}
                    if(document.getElementById("regNameResult")!=null){
                        document.getElementById("regNameResult").style.display="block";
                        document.getElementById("regNameResult").innerHTML="";
                        document.getElementById("regNameResult").innerHTML=desc;
                    }
					if(document.getElementById("registerErrorTips")!=null){
						document.getElementById("registerErrorTips").innerHTML=desc;
					}
					//恢复按钮让其可点击并去掉小点点
					cancelWaiting("regBtn",regeditValue);
					return ;
				}else if(data == -1){
					if(regType == 0){
						desc = get$("coincommonjs23");
					}else{
						desc = get$("coincommonjs26");
					}
                    if(document.getElementById("regNameResult")!=null) {
                        document.getElementById("regNameResult").style.display = "block";
                        document.getElementById("regNameResult").innerHTML = "";
                        document.getElementById("regNameResult").innerHTML = desc;
                    }
					if(document.getElementById("registerErrorTips")!=null){
						document.getElementById("registerErrorTips").innerHTML=desc;
					}
					//恢复按钮让其可点击并去掉小点点
					cancelWaiting("regBtn",regeditValue);
					return ;
				}else{
					var url = "/user/reg/index.do?random="+Math.round(Math.random()*100);
					if(regType == 0){
						url = "/user/reg/registerByPhone.do?random="+Math.round(Math.random()*100);
					}
					var ele = document.getElementById("ranCodeInput");
					var code = "";
					if(ele){
						code = trim(ele.value);
					}
					var msgCodeInput = document.getElementById("validatePhoneCode");
					var msgCode = "";
					if(msgCodeInput){
						msgCode = trim(msgCodeInput.value);
					}

					if(regType == 0){
						// 手机校验
						if(areaCode<0){
							jQuery("#regNameResult").removeClass("success").addClass("error");
							desc = get$("pleaseselectthecountrycode");
                            if(document.getElementById("regNameResult")!=null) {
                                document.getElementById("regNameResult").innerHTML = "";
                                document.getElementById("regNameResult").innerHTML = desc;
                            }
							if(document.getElementById("registerErrorTips")!=null){
								document.getElementById("registerErrorTips").innerHTML=desc;
							}
							//恢复按钮让其可点击并去掉小点点
							cancelWaiting("regBtn",regeditValue);
							return ;
						}
						if(msgCode==null||msgCode==''){
							jQuery("#regNameResult").removeClass("success").addClass("error");
							desc = get$("entersmscode");
                            if(document.getElementById("regNameResult")!=null) {
                                document.getElementById("regNameResult").innerHTML = "";
                                document.getElementById("regNameResult").innerHTML = desc;
                            }
							if(document.getElementById("registerErrorTips")!=null){
								document.getElementById("registerErrorTips").innerHTML=desc;
							}
							//恢复按钮让其可点击并去掉小点点
							cancelWaiting("regBtn",regeditValue);
							return ;
						}else if(msgCode.length!=6){
							jQuery("#regNameResult").removeClass("success").addClass("error");
							desc = get$("smscodeformatincorrect");
                            if(document.getElementById("regNameResult")!=null) {
                                document.getElementById("regNameResult").innerHTML = "";
                                document.getElementById("regNameResult").innerHTML = desc;
                            }
							if(document.getElementById("registerErrorTips")!=null){
								document.getElementById("registerErrorTips").innerHTML=desc;
							}
							//恢复按钮让其可点击并去掉小点点
							cancelWaiting("regBtn",regeditValue);
							return ;
						}
					}

					var param={regName:regUserName,password:pwd,regType:regType,code:code,areaCode:areaCode,msgCode:msgCode,type:type};
					jQuery.post(url,param,function(resultData){
						var result = eval('(' + resultData + ')');
						if(result!=null){
							var data = result.resultCode;
						}else{
							var data = -100;
						}

						if(data < 0){
							var desc = "";
							//注册失败
							if(data == -2){
								// 手机或邮箱已被占用
								if(regType == 0){
									desc = coincommonjs30+"，"+coincommonjs31+"<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=2912851536&site=qq&menu=yes' title='联系客服'>"+coincommonjs33+"</a>";
								}else{
                                    jQuery("#regNameResult").removeClass("success").addClass("error");
									desc = coincommonjs34;
								}
							}else if(data == -1){
								if(regType == 0){
									desc = get$("coincommonjs23");
								}else{
									desc = get$("coincommonjs40");
								}
							}else if(data==-6){
								// 验证码错误
								jQuery("#regNameResult").removeClass("success").addClass("error");
								desc = get$("userindexjs27");
							}else if(data == -5){
								jQuery("#regNameResult").removeClass("success").addClass("error");
								desc = coincommonjs7;
								if(document.getElementById("registerErrorTips")!=null){
									document.getElementById("registerErrorTips").innerHTML=coincommonjs7;
								}
							}else if(data == -7){
								// 短信验证码错误
								jQuery("#regNameResult").removeClass("success").addClass("error");
								desc = get$("smscodeisincorrect")+" "+get$("youhave")+result.errorNum+chancesleft;
							}else if(data == -20){
								// 手机号码限制
								jQuery("#regNameResult").removeClass("success").addClass("error");
					            desc=smscodewrongmuchtime;
					        }else if(data == -30){
					        	// 短信验证码错误次数限制
					        	jQuery("#regNameResult").removeClass("success").addClass("error");
					            desc=blindmoretime;
					        }else{
					        	// 注册失败
					        	jQuery("#regNameResult").removeClass("success").addClass("error");
					            desc=get$("signupfailed");
					        }
                            if(document.getElementById("regNameResult")!=null) {
                                document.getElementById("regNameResult").innerHTML = "";
                                document.getElementById("regNameResult").innerHTML = desc;
                            }
							if(document.getElementById("registerErrorTips")!=null){
								document.getElementById("registerErrorTips").innerHTML=desc;
							}
							//恢复按钮让其可点击并去掉小点点
							cancelWaiting("regBtn",regeditValue);
						}else{
							if(document.getElementById("forwardUrl")!=null && document.getElementById("forwardUrl").value != ""){
								var forward = document.getElementById("forwardUrl").value;
								forward = decodeURI(forward);
                                if (checkURL(forward)) {
                                    window.location.href=forward;
                                } else {
                                    window.location.href=document.getElementById("coinMainUrl").value;
                                }

							}else{
                                //document.getElementById("regeditDiv").style.display = "none";
                                //document.getElementById("emailSucess").style.display = "";
                                //document.getElementById("emailSpan").innerHTML = regUserName;
                                if(type==2){
                                    window.location.href = document.getElementById("coinMainUrl").value+"/mobile/index.do";
                                }else if(type==1){
                                    // 大转盘抽奖活动注册 先显示邮箱注册页面
                                    window.location.href = document.getElementById("coinMainUrl").value+"/about/land.do?registerSuccess=registerSuccess&versions="+type;
                                }else if(type==4){
                                    // 大转盘抽奖活动注册 改版
                                    window.location.href = document.getElementById("coinMainUrl").value+"/about/land.do?registerSuccess=registerSuccess&versions="+type;
                                }else if(type==5){
                                    // 大转盘抽奖活动注册 外站广告版
                                    window.location.href = document.getElementById("coinMainUrl").value+"/about/land.do?registerSuccess=registerSuccess&versions="+type;
                                }else if(type==6){
                                    // 大转盘抽奖活动注册 外站广告版
                                    window.location.href = document.getElementById("coinMainUrl").value+"/about/land.do?registerSuccess=registerSuccess&versions="+type;
                                }else{
                                    window.location.href = document.getElementById("coinMainUrl").value+"/user/register.do?registerSuccess=registerSuccess";
                                }
                            }
						}
					});
				}
			});
		}else{
			//恢复按钮让其可点击并去掉小点点
			cancelWaiting("regBtn",regeditValue);
		}

	}

	function cart_add_animate(b){
		b=$(b);
		if(typeof b!="undefined"){
			var a=jQuery(window).height()-(jQuery(b).offset().top-jQuery(window).scrollTop())-100;
			if(a<200){a=200;}
			//alert(jQuery(b).offset().left);
			//alert(a);
			jQuery("#cart-add-effect").css({left:jQuery(b).offset().left,bottom:a});
			jQuery("#cart-add-effect").show().animate(
					{bottom:"10px",opacity:0},
					800,
					function(){
						jQuery("#cart-add-effect").css({bottom:"200px",opacity:1,display:"none"});
					}
				);

		}
	}

/*********微博登录**********************/
	function openss(url){
		if(url==null || url==''){
			url=window.location.href;
		}
	    window.open('/link/weibo/call.do?url='+url,'new','height='+450+',,innerHeight='+450+',width='+550+',innerWidth='+550+',top='+200+',left='+200+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
	}
/*********QQ登录*******************************/
	function openqq(param){
		var url = "/link/qq/call.do";
		if(param!=null && param!=""){
			url = url + "?param=" + encodeURIComponent(param);
		}
		
		window.open(url,'new','height='+550+',,innerHeight='+550+',width='+600+',innerWidth='+600+',top='+200+',left='+200+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
	}
	/**
	 * 刷新最新行情数据
	 */
	function handleTicker(){
        var symbol = 0;
        if(document.getElementById("symbol")){
        	symbol = document.getElementById("symbol").value;
        }
        var url = "/real/ticker.do?symbol="+symbol+"&random="+Math.round(Math.random()*100);
		jQuery.post(url,null,function(ticker){
				if(!!ticker){
					var btcLast = ticker.btcLast;
					var ltcLast = ticker.ltcLast;
					var btcVol = ticker.btcVolume;
					var ltcVol = ticker.ltcVolume;
					if(btcLast!=0){
						if(document.getElementById("bannerBtcLast")!=null){
							document.getElementById("bannerBtcLast").innerHTML=btcLast;
						}
                        jQuery(".indexBtcPrice").html(CommaFormattedByOriginal(btcLast));
					}
					if(ltcLast!=0){
						if(document.getElementById("bannerLtcLast")!=null){
							document.getElementById("bannerLtcLast").innerHTML=ltcLast;
						}
                        jQuery(".indexLtcPrice").html(CommaFormattedByOriginal(ltcLast));
					}
					if(btcVol!=0){
						if(document.getElementById("bannerBtcVol")!=null){
							document.getElementById("bannerBtcVol").innerHTML=formatValue(btcVol);
						}
                        jQuery(".indexBtcVolume").html(CommaFormattedByOriginal(btcVol));
					}
					if(ltcVol!=0){
						if(document.getElementById("bannerLtcVol")!=null){
							document.getElementById("bannerLtcVol").innerHTML=formatValue(ltcVol);
						}
                        jQuery(".indexLtcVolume").html(CommaFormattedByOriginal(ltcVol));
					}

					/*行情下单刷新人民币，比特币余额   start*/
					if(document.getElementById("marketIsUpdate") !=null){
						if(document.getElementById("nowPrice")!=null){
							document.getElementById("nowPrice").value=ticker.buy;
						}
						if(document.getElementById("snowPrice")!=null){
							document.getElementById("snowPrice").value=ticker.sell;
						}
					}
					/* end */
					//更新首页大图成交量
					if(document.getElementById("indexVol")!=null){
						document.getElementById("indexVol").innerHTML=btcVol;
					}
					if(document.getElementById("indexLtcVol")!=null){
						if(ltcVol != "" && ltcVol.length > 10){
							var index = ltcVol.indexOf(".");
							if(index >5){
								ltcVol = ltcVol.substring(0,index);
							}
						}
						document.getElementById("indexLtcVol").innerHTML=ltcVol;
					}
					//更新行情页最新价格
					if(document.getElementById("marketLast")!=null){
						var last = ticker.last+"";
						if(document.title!=null&& last!=0&&!isfuture()){
							var oldTitle = document.title;
							if(oldTitle!=null&&oldTitle.length>0){
								var arrs  =oldTitle.split("-");
								var newTitle = "";
								var info = SYMBOLS_UTIL.symbolStr[Number(ticker.symbol)];
								if(arrs.length==3){
									if(coincommonjs41==arrs[1]){
										newTitle = info+cnyOrUsdSymbol+last+"-"+coincommonjs41+"-"+arrs[2];
									}else{
										newTitle = info+cnyOrUsdSymbol+last+"-"+coincommonjs41+"-"+arrs[1]+"-"+arrs[2];
									}
								}else if(arrs.length==4){
									newTitle = info+cnyOrUsdSymbol+last+"-"+coincommonjs41+"-"+arrs[2]+"-"+arrs[3];
								}else if(arrs.length==2){
									newTitle = info+cnyOrUsdSymbol+last+"-"+coincommonjs41+"-"+arrs[0]+"-"+arrs[1];
								}else if(arrs.length==1){
									newTitle = info+cnyOrUsdSymbol+last+"-"+coincommonjs41+"-"+arrs[0];
								}
								document.title = newTitle;
							}
						}
					}else{
						if(document.title!=null && !isSpider()&&btcLast!=0&&ltcLast!=0&&!isfuture()){
							var oldTitle = document.title;
							var arrs  =oldTitle.split("-");
							//前辍用来判断title是显示BTC还是LTC
							var prefix = "";
							if(oldTitle!=null&&oldTitle.length>0){
								if(arrs.length > 0){
									prefix = arrs[0].substr(0,1);
									oldTitle = arrs[arrs.length-1];
								}
								var newTitle =  cnyOrUsdSymbol+btcLast+"-"+oldTitle;
								var url=document.location.href;
                                //newCoinLabel
                                switch(Number(ticker.symbol)){
                                    case 0: newTitle = "฿:"+cnyOrUsdSymbol+btcLast+"-"+oldTitle;break;
                                    case 1: newTitle = "Ł:"+cnyOrUsdSymbol+ltcLast+"-"+oldTitle;break;
                                    default: break;
                                }
								if(url.indexOf("futureFull.do")!=-1){
									//isfuture中返回false，但是全屏交易有自己刷新title的方法所以需要过滤	yyh:2014-12-26
									newTitle = document.title;
								}
								document.title = newTitle;
							}
						}
					}
				}
		},"JSON");
	}
	/**
	 * 刷新买一卖五
	 */
	function handleEntrust(speed){
        changeDepthImg_com();
		var symbol = document.getElementById("symbol").value;
		var tradetype = document.getElementById("tradetype").value;
		var deptMerge=Number(deptMerge_m);
		var url = "/real/handleEntrust.do?symbol="+symbol+"&tradetype="+tradetype+"&deptMerge=" + deptMerge +"&random="+Math.round(Math.random()*100);
		if(document.getElementById("isMobile")!=null){
			url = "/real/handleEntrust.do?symbol="+symbol+"&tradetype="+tradetype+"&isMobile=1&random="+Math.round(Math.random()*100);
		}else if(document.getElementById("isEntrustNew")!=null){
            url = "/real/handleEntrust.do?symbol="+symbol+"&tradetype="+tradetype+"&deptMerge=" + deptMerge +"&isEntrustNew=1&random="+Math.round(Math.random()*100);
		}
		jQuery("#coinBoxbuybtc").load(url,function (data){
		});
	}
    function formatValue(value,rate){
        var result=CommaFormatted(value,rate);
        if(!rate||rate==0){
            if(!!result){
                return result.substring(0, result.length-3);
            }
            return result ;
        }
        return result;
    }
	//交易页面的最近挂单
	function refreshEntrustInfo(){
		if(document.getElementById("realEntrustType")!=null){
			var type =document.getElementById("realEntrustType").value;
			if(type == 0){
				entrustInfo(type);
			}else if(type==-1){//2015年1月8日 兼容整合后的自动刷新
                entrustInfo_new(type)
            }
		}
	}
	/**
	 * 发送验证码
	 * @param type
	 */
	var secs = 61;
	function sendMsgCode(type){
		var symbol = 0;
		if(document.getElementById("symbol")!=null){
			symbol = document.getElementById("symbol").value;
		}
		if(document.getElementById("isEmptyPhone") !=null && document.getElementById("isEmptyPhone").value==1){
			showValidatePhone(1);
			if(type == 2){
				document.getElementById("withdrawBtcAddrDiv").style.display="none";
			}
			return;
		}
		var url = "/account/sendMsgCode.do?random="+Math.round(Math.random()*100);
		var withdrawAmount = 0;
		if(type == 1 && document.getElementById("withdrawAmount")!=null){
			withdrawAmount = document.getElementById("withdrawAmount").value;
			 var reg = new RegExp("^[0-9]*\.{0,1}[0-9]{0,8}$");
			 if(!reg.test(withdrawAmount) ){
			    alertTipsSpan(enterwithdrawalamount);
				return;
			  }
			 var taskBalance = parseFloat(document.getElementById("taskBalance").value);
			 if(withdrawAmount < 0.01 && taskBalance == 0){
				alertTipsSpan(coincommonjs42+"0.01"+SYMBOLS_UTIL.symbolStr2[Number(symbol)]);
				return;
			}
            document.getElementById("msgCodeBtnWidthDraw").disabled = true;
            for(var num=1;num<=secs;num++) {
                window.setTimeout("updateNumberWidthdraw(" + num + ")", num * 1000);
            }
		}
		if(type == 3 && document.getElementById("withdrawBalance")!=null){
			withdrawAmount = document.getElementById("withdrawBalance").value;
			var reg = new RegExp("^[0-9]+\.{0,1}[0-9]{0,8}$");
			if(!reg.test(withdrawAmount) ){
			    alertTipsSpan(enterwithdrawalamount);
				return;
			}
			if(withdrawAmount < 100){
				alertTipsSpan(minimumwithdrawalq100yuan);
				return;
			}
            document.getElementById("msgCodeBtnWidthDraw").disabled = true;
            for(var num=1;num<=secs;num++) {
                window.setTimeout("updateNumberWidthdraw(" + num + ")", num * 1000);
            }
		}
		var param={type:type,withdrawAmount:withdrawAmount,symbol:symbol};
		jQuery.post(url,param,function(data){
			if(data == 0){
				//弹层发送短信的发送之后要刷新页面
				if(document.getElementById("refreshSingal")!=null){
					document.getElementById("refreshSingal").value = 1;
				}
                if(type == 2){
					 document.getElementById("msgCodeAddrBtn").disabled = true;
					 inputDisabledTrue("msgCodeAddrBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("updateNumberAddr(" + num + ")", num * 1000);
					   }
				}else if(type == 5){
					 document.getElementById("msgCodeAuthBtn").disabled = true;
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("updateNumberAuth(" + num + ")", num * 1000);
					   }
				}else if(type == 9){
					document.getElementById("msgCodeBtn2").disabled = true;
					inputDisabledTrue("msgCodeBtn2");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("updateNumberBindAuth(" + num + ")", num * 1000);
					   }
				}else if(type == 10|| type == 8){
					document.getElementById("changeMsgCodeBtn").disabled = true;
					inputDisabledTrue("changeMsgCodeBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("changeMsgCode(" + num + ")", num * 1000);
					   }
				}else if(type == 14){
					document.getElementById("configureMsgCodeBtn").disabled = true;
					inputDisabledTrue("configureMsgCodeBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("configureMsgCode(" + num + ")", num * 1000);
					   }
			    }else if(type == 57){
					document.getElementById("msgCodeBtnSub").disabled = true;
					for(var num=1;num<=secs;num++) {
				 		  window.setTimeout("updateSubUserRestPwd(" + num + ")", num * 1000);
					   }
				}else if(type == 58){
                    document.getElementById("newEmailMsgCodeBtn").disabled = true;
                    inputDisabledTrue("newEmailMsgCodeBtn");
                    for(var num=1;num<=secs;num++) {
                        window.setTimeout("newEmailMsgCode(" + num + ")", num * 1000);
                    }
                }else{
					 document.getElementById("msgCodeBtn").disabled = true;
					 inputDisabledTrue("msgCodeBtn");
					 for(var num=1;num<=secs;num++) {
						  window.setTimeout("updateNumberRestPwd(" + num + ")", num * 1000);
					  }
				}
			}else if(data == -3){
				alertTipsSpan(balanceinsufficient);
			}else if(data == -4){
				document.getElementById("withdrawBtcAddrTips").style.display="";
				document.getElementById("withdrawBtcAddrTips").innerHTML=setwithdrawaladdress;
			}else if(data == -5){
				alertTipsSpan(balanceinsufficient);
			}else if(data == -6){
				alertTipsSpan(coincommonjs42+"0.01"+(SYMBOLS_UTIL.symbolStr2[Number(symbol)]));
			}else if(data == -7){
				alertTipsSpan(exceededdailywithdrawallimit);
			}else if(data == -8){
				alertTipsSpan(balanceinsufficient);
			}else if(data == -9){
				alertTipsSpan(minimumwithdrawalq100yuan);
			}else if(data == 10){
				alertTipsSpan(accounthasopenloans);
			}else if(data == -10){
				alertTipsSpan(exceededdailywithdrawallimit);
			}else if(data == -20){
				if(type == 1 || type == 3 || type == 6){
					alertTipsSpan(smscodewrongmuchtime);
				}else if(type == 4 || type == 12){
					if(document.getElementById("phoneCodeTips")!=null){
						document.getElementById("phoneCodeTips").innerHTML = smscodewrongmuchtime;
					}
				}else if(type == 10 || type == 8){
					if(document.getElementById("changePhoneCodeTips")!=null){
						document.getElementById("changePhoneCodeTips").innerHTML = smscodewrongmuchtime;
					}
				}else if(type == 2 || type == 7){
					if(document.getElementById("withdrawBtcAddrTips")!=null){
						document.getElementById("withdrawBtcAddrTips").innerHTML = smscodewrongmuchtime;
					}
				}else if(type == 9){
					if(document.getElementById("googleInfoTips")!=null){
						document.getElementById("googleInfoTips").innerHTML = smscodewrongmuchtime;
					}
				}else if(type == 11 || type == 12){
					if(document.getElementById("phoneCodeTips")!=null){
						document.getElementById("phoneCodeTips").innerHTML = smscodewrongmuchtime;
					}
				}else if(type ==57){
					if(document.getElementById("phoneCodeSubTips")!=null){
						document.getElementById("phoneCodeSubTips").innerHTML = smscodewrongmuchtime;
					}
				}
			}else if(data == 12){
                alertTipsSpan(get$("waitsixconfirm"));
            }else if(data == 16) {
                alertTipsSpan(get$("withdrawalbefrezen"));
			}
		});
	}



	function sendMsgCode1(type,msgType){
		var symbol = 0;
		if(document.getElementById("symbol")!=null){
			symbol = document.getElementById("symbol").value;
		}
		if(document.getElementById("isEmptyPhone") !=null && document.getElementById("isEmptyPhone").value==1){
			showValidatePhone(1);
			if(type == 2){
				document.getElementById("withdrawBtcAddrDiv").style.display="none";
			}
			return;
		}
		var url = "/account/sendMsgCode.do?random="+Math.round(Math.random()*100);
		var withdrawAmount = 0;
		if(type == 1 && document.getElementById("withdrawAmount")!=null){
			withdrawAmount = document.getElementById("withdrawAmount").value;
			 var reg = new RegExp("^[0-9]*\.{0,1}[0-9]{0,8}$");
			 if(!reg.test(withdrawAmount) ){
			    alertTipsSpan(enterwithdrawalamount);
				return;
			  }
			 var taskBalance = parseFloat(document.getElementById("taskBalance").value);
			 if(withdrawAmount < 0.01 && taskBalance == 0){
				alertTipsSpan(coincommonjs42+"0.01"+(SYMBOLS_UTIL.symbolStr2[Number(symbol)]));
				return;
			}
			 document.getElementById("msgCodeBtnWidthDraw").disabled = true;
			 for(var num=1;num<=secs;num++) {
				  window.setTimeout("updateNumberWidthdraw(" + num + ")", num * 1000);
			  }
		}
		if(type == 3 && document.getElementById("withdrawBalance")!=null){
			if(document.getElementById("cnyadd") != null){
				alertTipsSpan(fillinbankcardx);
				return;
			}
			withdrawAmount = trim(document.getElementById("withdrawBalance").value);
			var reg = new RegExp("^[0-9]+\.{0,1}[0-9]{0,8}$");
			if(!reg.test(withdrawAmount) ){
			    alertTipsSpan(enterwithdrawalamount);
				return;
			}
			if(withdrawAmount < 100){
				alertTipsSpan(minimumwithdrawalq100yuan);
				return;
			}
			 document.getElementById("msgCodeBtnWidthDraw").disabled = true;
			 for(var num=1;num<=secs;num++) {
				  window.setTimeout("updateNumberWidthdraw(" + num + ")", num * 1000);
			  }
		}
		var param={type:type,withdrawAmount:withdrawAmount,symbol:symbol,msgType:msgType};
		jQuery.post(url,param,function(data){
			if(data == 0){
				//弹层发送短信的发送之后要刷新页面
				if(document.getElementById("refreshSingal")!=null){
					document.getElementById("refreshSingal").value = 1;
				}
				if(msgType!=1){
					if(type ==1|| type==3){
						document.getElementById("msgCodeBtnWidthDraw").disabled = true;
					}else if(type == 2){
						 document.getElementById("msgCodeAddrBtn").disabled = true;
						 inputDisabledTrue("msgCodeAddrBtn");
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("updateNumberAddr(" + num + ")", num * 1000);
						   }
					}else if(type == 5){
						 document.getElementById("msgCodeAuthBtn").disabled = true;
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("updateNumberAuth(" + num + ")", num * 1000);
						   }
					}else if(type == 9){
						document.getElementById("msgCodeBtn2").disabled = true;
						inputDisabledTrue("msgCodeBtn2");
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("updateNumberBindAuth(" + num + ")", num * 1000);
						   }
					}else if(type == 10|| type == 8){
						document.getElementById("changeMsgCodeBtn").disabled = true;
						inputDisabledTrue("changeMsgCodeBtn");
						  for(var num=1;num<=secs;num++) {
							window.setTimeout("changeMsgCode(" + num + ")", num * 1000);
						  }
					}else if(type == 14){
						document.getElementById("configureMsgCodeBtn").disabled = true;
						inputDisabledTrue("configureMsgCodeBtn");
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("configureMsgCode(" + num + ")", num * 1000);
						   }
					}else if(type == 40){
						document.getElementById("rechargeCodeBtn").disabled = true;
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("rechargeCodeCode(" + num + ")", num * 1000);
						   }
					}else if(type == 41){
						document.getElementById("codeBPhoneCodeBtn").disabled = true;
						inputDisabledTrue("codeBPhoneCodeBtn");
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("codeBPhoneCodeCode(" + num + ")", num * 1000);
						   }
					}else if(type == 42){
						document.getElementById("confirmPhoneCodeBtn").disabled = true;
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("confirmNumberCodeB(" + num + ")", num * 1000);
						   }
					}else if(type == 44){
						document.getElementById("widthdrawMealBtn").disabled = true;
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("widthdrawMealBtn(" + num + ")", num * 1000);
						   }
					}else if(type == 57){
						document.getElementById("msgCodeBtnSub").disabled = true;
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("updateSubUserRestPwd(" + num + ")", num * 1000);
						   }
					}else if(type == 58){
						document.getElementById("newEmailMsgCodeBtn").disabled = true;
						inputDisabledTrue("newEmailMsgCodeBtn");
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("newEmailMsgCode(" + num + ")", num * 1000);
						   }
					}else if(type == 59){
						document.getElementById("configureMsgCodeBtn").disabled = true;
						inputDisabledTrue("configureMsgCodeBtn");
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("configureMsgCode(" + num + ")", num * 1000);
						   }
					}else if(type == 60){
						document.getElementById("weixinCloseMsgCodeBtn").disabled = true;
						inputDisabledTrue("weixinCloseMsgCodeBtn");
						  for(var num=1;num<=secs;num++) {
							  window.setTimeout("weixinCloseMsgCode(" + num + ")", num * 1000);
						   }
					}else{
						 document.getElementById("msgCodeBtn").disabled = true;
						 inputDisabledTrue("msgCodeBtn");
						 for(var num=1;num<=secs;num++) {
							  window.setTimeout("updateNumberRestPwd(" + num + ")", num * 1000);
						  }
					}
				}
			}else if(data == -3){
				alertTipsSpan(balanceinsufficient);
			}else if(data == -4){
				document.getElementById("withdrawBtcAddrTips").style.display="";
				document.getElementById("withdrawBtcAddrTips").innerHTML=setwithdrawaladdress;
			}else if(data == -5){
				alertTipsSpan(balanceinsufficient);
			}else if(data == -6){
				alertTipsSpan(coincommonjs42+"0.01"+(SYMBOLS_UTIL.symbolStr2[Number(symbol)]));
			}else if(data == -7){
				alertTipsSpan(exceededdailywithdrawallimit);
			}else if(data == -8){
				alertTipsSpan(balanceinsufficient);
			}else if(data == -9){
				alertTipsSpan(minimumwithdrawalq100yuan);
			}else if(data == 10){
				alertTipsSpan(accounthasopenloans);
			}else if(data == -10){
				alertTipsSpan(exceededdailywithdrawallimit);
			}else if(data == -20){
				if(type == 1 || type == 3 || type == 6){
					alertTipsSpan(smscodewrongmuchtime);
				}else if(type == 4 || type == 12){
					if(document.getElementById("phoneCodeTips")!=null){
						document.getElementById("phoneCodeTips").innerHTML = smscodewrongmuchtime;
					}
				}else if(type == 10 || type == 8){
					if(document.getElementById("changePhoneCodeTips")!=null){
						document.getElementById("changePhoneCodeTips").innerHTML = smscodewrongmuchtime;
					}
				}else if(type == 2 || type == 7){
					if(document.getElementById("withdrawBtcAddrTips")!=null){
						document.getElementById("withdrawBtcAddrTips").innerHTML = smscodewrongmuchtime;
					}
				}else if(type == 9){
					if(document.getElementById("googleInfoTips")!=null){
						document.getElementById("googleInfoTips").innerHTML = smscodewrongmuchtime;
					}
				}else if(type == 11 || type == 12){
					if(document.getElementById("phoneCodeTips")!=null){
						document.getElementById("phoneCodeTips").innerHTML = smscodewrongmuchtime;
					}
				}else if(type== 40){
					if(document.getElementById("rechargeCodeTigs")!=null){
						document.getElementById("rechargeCodeTigs").innerHTML = smscodewrongmuchtime;
					}
				}else if(type==57){
					if(document.getElementById("phoneCodeSubTips")!=null){
						document.getElementById("phoneCodeSubTips").innerHTML = smscodewrongmuchtime;
					}
				}
			}else if(data == 12){
                alertTipsSpan(get$("waitsixconfirm"));
            }else if(data == 16) {
                alertTipsSpan(get$("withdrawalbefrezen"));
			}
		});
	}
	function sendMsgCode2(type,id){
		var isInter = document.getElementById("isInter").value;
		if(isInter==0){
			var msgType = document.getElementById(id+"Sign").value;
			if(msgType==1){
				//document.getElementById(id).disabled = true;
				if(type == 2){
					 document.getElementById("msgCodeAddrBtn").disabled = true;
					 inputDisabledTrue("msgCodeAddrBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("updateNumberAddr(" + num + ")", num * 1000);
					   }
				}else if(type == 5){
					 document.getElementById("msgCodeAuthBtn").disabled = true;
					 inputDisabledTrue("msgCodeAuthBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("updateNumberAuth(" + num + ")", num * 1000);
					   }
				}else if(type == 9){
					document.getElementById("msgCodeBtn2").disabled = true;
					 inputDisabledTrue("msgCodeBtn2");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("updateNumberBindAuth(" + num + ")", num * 1000);
					   }
				}else if(type == 10|| type == 8){
					document.getElementById("changeMsgCodeBtn").disabled = true;
					 inputDisabledTrue("changeMsgCodeBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("changeMsgCode(" + num + ")", num * 1000);
					   }
				}else if(type == 14){
					document.getElementById("configureMsgCodeBtn").disabled = true;
					 inputDisabledTrue("configureMsgCodeBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("configureMsgCode(" + num + ")", num * 1000);
					   }
				}else if(type == 40){
					document.getElementById("rechargeCodeBtn").disabled = true;
					 inputDisabledTrue("rechargeCodeBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("rechargeCodeCode(" + num + ")", num * 1000);
					   }
				}else if(type == 41){
					document.getElementById("codeBPhoneCodeBtn").disabled = true;
					 inputDisabledTrue("codeBPhoneCodeBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("codeBPhoneCodeCode(" + num + ")", num * 1000);
					   }
				}else if(type == 42){
					document.getElementById("confirmPhoneCodeBtn").disabled = true;
					inputDisabledTrue("confirmPhoneCodeBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("confirmNumberCodeB(" + num + ")", num * 1000);
					   }
				}else if(type == 44){
					document.getElementById("widthdrawMealBtn").disabled = true;
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("widthdrawMealBtn(" + num + ")", num * 1000);
					   }
				}else if(type == 58){
					document.getElementById("newEmailMsgCodeBtn").disabled = true;
					 inputDisabledTrue("newEmailMsgCodeBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("newEmailMsgCode(" + num + ")", num * 1000);
					   }
				}else if(type == 59){
					document.getElementById("configureMsgCodeBtn").disabled = true;
					 inputDisabledTrue("configureMsgCodeBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("configureMsgCode(" + num + ")", num * 1000);
					   }
				}else if(type == 60){
					document.getElementById("weixinCloseMsgCodeBtn").disabled = true;
					 inputDisabledTrue("weixinCloseMsgCodeBtn");
					  for(var num=1;num<=secs;num++) {
						  window.setTimeout("weixinCloseMsgCode(" + num + ")", num * 1000);
					   }
				}

			}
			sendMsgCode1(type,msgType);
		}else{
			sendMsgCode(type);
		}
	}


	function widthdrawMealBtn(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("widthdrawMealBtn",isInter);
			document.getElementById("widthdrawMealBtn").disabled = false;
//			inputDisabledFalse("widthdrawMealBtn");
			if(document.getElementById("widthdrawMealBtn")!=null){
				document.getElementById("widthdrawMealBtn").disabled = false;
			}
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("widthdrawMealBtn");
			document.getElementById("widthdrawMealBtn").value= printnr +coincommonjs43;
		}
	}
	function updateNumberRestPwd(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("msgCodeBtn",isInter);
			document.getElementById("msgCodeBtn").disabled = false;
			inputDisabledFalse("msgCodeBtn");
			if(document.getElementById("validatePhoneNumber")!=null){
				document.getElementById("validatePhoneNumber").disabled = false;
			}
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("msgCodeBtn");
			document.getElementById("msgCodeBtn").value= printnr +coincommonjs43;
		}
	}
	function updateNumberWidthdraw(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("msgCodeBtnWidthDraw",isInter);
			document.getElementById("msgCodeBtnWidthDraw").disabled = false;
			if(document.getElementById("validatePhoneNumber")!=null){
				document.getElementById("validatePhoneNumber").disabled = false;
			}
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("msgCodeBtnWidthDraw");
			document.getElementById("msgCodeBtnWidthDraw").value= printnr +coincommonjs43;
		}
	}
	function updateNumberBindAuth(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("msgCodeBtn2",isInter);
			document.getElementById("msgCodeBtn2").disabled = false;
			inputDisabledFalse("msgCodeBtn2");
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("msgCodeBtn2");
			document.getElementById("msgCodeBtn2").value= printnr +coincommonjs43;
		}
	}
	function changeMsgCode(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("changeMsgCodeBtn",isInter);
			document.getElementById("changeMsgCodeBtn").disabled = false;
			inputDisabledFalse("changeMsgCodeBtn");
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("changeMsgCodeBtn");
			document.getElementById("changeMsgCodeBtn").value= printnr +coincommonjs43;
		}
	}
	function configureMsgCode(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("configureMsgCodeBtn",isInter);
			document.getElementById("configureMsgCodeBtn").disabled = false;
			inputDisabledFalse("configureMsgCodeBtn");
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("configureMsgCodeBtn");
			document.getElementById("configureMsgCodeBtn").value= printnr +coincommonjs43;
		}
	}
	function weixinCloseMsgCode(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("weixinCloseMsgCodeBtn",isInter);
			document.getElementById("weixinCloseMsgCodeBtn").disabled = false;
			inputDisabledFalse("weixinCloseMsgCodeBtn");
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("weixinCloseMsgCodeBtn");
			document.getElementById("weixinCloseMsgCodeBtn").value= printnr +coincommonjs43;
		}
	}
	function newEmailMsgCode(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("newEmailMsgCodeBtn",isInter);
			document.getElementById("newEmailMsgCodeBtn").disabled = false;
			inputDisabledFalse("newEmailMsgCodeBtn");
			if(document.getElementById("newEmailMsgCodeBtnTitleMess")!=null){
				document.getElementById("newEmailMsgCodeBtnTitleMess").style.display = "";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("newEmailMsgCodeBtn");
			document.getElementById("newEmailMsgCodeBtn").value= printnr +coincommonjs43;
		}
	}
	function rechargeCodeCode(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("rechargeCodeBtn",isInter);
			document.getElementById("rechargeCodeBtn").disabled = false;
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("rechargeCodeBtn");
			document.getElementById("rechargeCodeBtn").value= printnr +coincommonjs43;
		}
	}
	function codeBPhoneCodeCode(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("codeBPhoneCodeBtn",isInter);
			document.getElementById("codeBPhoneCodeBtn").disabled = false;
			inputDisabledFalse("codeBPhoneCodeBtn");
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("codeBPhoneCodeBtn");
			document.getElementById("codeBPhoneCodeBtn").value= printnr +coincommonjs43;
		}
	}

	function confirmNumberCodeB(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("confirmPhoneCodeBtn",isInter);
			document.getElementById("confirmPhoneCodeBtn").disabled = false;
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("confirmPhoneCodeBtn");
			document.getElementById("confirmPhoneCodeBtn").value= printnr +coincommonjs43;
		}
	}
	function updateSubUserRestPwd(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("msgCodeBtnSub",isInter);
			document.getElementById("msgCodeBtnSub").disabled = false;
			if(document.getElementById("msgCodeSubTitleMess")!=null){
				document.getElementById("msgCodeSubTitleMess").style.display = "";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("msgCodeBtnSub");
			document.getElementById("msgCodeBtnSub").value= printnr +coincommonjs43;
		}
	}



	function updateNumberAddr(num) {
		if (num == secs) {
			var isInter = document.getElementById("isInter").value;
			changeBtn("msgCodeAddrBtn",isInter);
			document.getElementById("msgCodeAddrBtn").disabled = false;
			inputDisabledFalse("msgCodeAddrBtn");
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
			if(document.getElementById("msgCodeNotReceived1")!=null){
				document.getElementById("msgCodeNotReceived1").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			hiddenTitle("msgCodeAddrBtn");
			document.getElementById("msgCodeAddrBtn").value= printnr +coincommonjs43;
		}
	}
	function updateNumberAuth(num) {
		if (num == secs) {
			document.getElementById("msgCodeAuthBtn").value=getsmsverificationcode;
			document.getElementById("msgCodeAuthBtn").disabled = false;
			if(document.getElementById("msgCodeNotReceived")!=null){
				document.getElementById("msgCodeNotReceived").style.display = "none";
			}
		} else {
			var printnr = secs - num;
			document.getElementById("msgCodeAuthBtn").value= printnr +coincommonjs43;
		}
	}
/**
 * 微信提示层
 */
function showWeixinPop(){
	dialogBoxShadow();
	document.getElementById("weixinPop").style.display="";
}
function closeWeixinPop(){
	dialogBoxHidden();
	document.getElementById("weixinPop").style.display="none";
}

function showWeixinSubPop(){
	dialogBoxShadow();
	document.getElementById("weixinSubPop").style.display="";
}
function closeWeixinSubPop(){
	dialogBoxHidden();
	document.getElementById("weixinSubPop").style.display="none";
}
function bindAuth(){
	var callback={okBack:function(){window.location.href= document.getElementById("coinMainUrl").value+"/user/security.do";},noBack:function(){return false;}};
	if(document.getElementById('apiNoSmsGoogle') != null&&document.getElementById('apiNoSmsGoogle').value==1){
		okcoinAlert(get$("coincommonjsapia"),null,callback,get$("coincommonjs46"));
	}else{
		okcoinAlert(coincommonjs45,null,callback,coincommonjs46);
	}
	if(document.getElementById('riskAreaDiv') != null){
		document.getElementById('riskAreaDiv').style.display = "block";
	}
}
function showPhoneNotOpen(){
	if(document.getElementById("phoneNotOpenDiv") != null){
		document.getElementById("phoneNotOpenDiv").style.display = "block";
	}
}

function callbackEnter(callfun){
	document.onkeydown=function(event){//回车
    	var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
        	return callfun();
        }
   };
}
/**
 * new
 * */
function handleChart(){
	if(-1!=window.navigator.userAgent.indexOf('MSIE 6.0') || -1!=window.navigator.userAgent.indexOf('MSIE 7.0') ||-1!=window.navigator.userAgent.indexOf('MSIE 8.0')) {
		if(document.getElementById("handleChart").style.display=="none"){
			document.getElementById("handleChart").style.marginTop="0px";
			document.getElementById("handleChart").style.display="";
			showKLine(0,3);
		}else{
			document.getElementById("handleChart").style.display="none";
			document.getElementById("handleChart").style.marginTop="-400px";
		}
	}else{
		document.getElementById("handleChart").style.display="";
		if(document.getElementById("handleChart").style.opacity==0){
			jQuery("#handleChart").stop(true).animate({'margin-top':'0px','opacity':'1'},300,function(){
				if(document.getElementById("klineLoading")!=null){
						document.getElementById("bannerLineOld").style.display="";
						showKLine(0,3);
				}
			});
		}else{
			jQuery("#handleChart").stop(true).animate({'margin-top':'-400px','opacity':'0'},300);
		}
	}
}
function showKLineType(type){
	if(type==1){//5分钟
		document.getElementById("minuteTitle").className ="cur";
		document.getElementById("dayTitle").className ="";
		document.getElementById("weekTitle").className ="";
	}else if(type==3){//日
		document.getElementById("minuteTitle").className ="";
		document.getElementById("dayTitle").className ="cur";
		document.getElementById("weekTitle").className ="";
	}else if(type==4){//周
		document.getElementById("minuteTitle").className ="";
		document.getElementById("dayTitle").className ="";
		document.getElementById("weekTitle").className ="cur";
	}

	var marketFrom = document.getElementById("marketFromChart").value;
	showKLine(marketFrom,type);
}
function indexLoginOnblur(){
	var uName = document.getElementById("indexLoginName").value;
	if(! checkEmail(uName)){
		//输入密码时不需要验证邮箱格式
//		document.getElementById("indexLoginTips").style.display="block";
//		document.getElementById("indexLoginTips").innerHTML="";
//		document.getElementById("indexLoginTips").innerHTML=coincommonjs9;
	}else{
		document.getElementById("indexLoginTips").style.display="none";
		document.getElementById("indexLoginTips").innerHTML="&nbsp;";
	}
}
function indexLoginNameOnblur(obj){
	trimValue(obj);
	var value = obj.value;
	if(value==""||value==null){
		obj.value = pleaseenteryouremail;
	}
}
function indexLoginNameOnfocus(){
	var uName = document.getElementById("indexLoginName").value;
	if(uName==pleaseenteryouremail || uName=="Please enter your email"){
		document.getElementById("indexLoginName").value="";
	}
}
var keycount = 1;
function clearTig(obj){
	if(keycount==1){
		obj.value="";
		keycount++;
	}
}

/**
 * 首页登录输入框聚焦时清空错误提示
 */
jQuery(".loginInput").focus(function(){
	jQuery("#indexLoginTips").html("");
});

/**
 * 登录页面输入框聚焦时清空错误提示
 */
jQuery(".loginAdmin").focus(function(){
	jQuery("#indexLoginTips").hide();
});


/**
 * 新首页和登录页面的登录
 */
function loginIndexSubmit(){
	//点击按钮后让其置灰不可点并出现动态小点点
	var loginValue = document.getElementById("indexLoginSubmit").value;		//先前按钮的值
	waitingStation("indexLoginSubmit",inlogin);

	var url = "/user/login/index.do?random="+Math.round(Math.random()*100);
	var uName = document.getElementById("indexLoginName").value;
	var pWord = document.getElementById("indexLoginPwd").value;
	if(uName == ""){
		document.getElementById("indexLoginTips").style.display="block";
		document.getElementById("indexLoginTips").innerHTML="";
		document.getElementById("indexLoginTips").innerHTML=coincommonjs10;
		//恢复按钮让其可点击并去掉小点点
		cancelWaiting("indexLoginSubmit",loginValue);
		return ;
	}
	if(! checkEmail(uName)&&uName.indexOf("@") > 0){
		document.getElementById("indexLoginTips").style.display="block";
		document.getElementById("indexLoginTips").innerHTML="";
		document.getElementById("indexLoginTips").innerHTML=coincommonjs9;
		//恢复按钮让其可点击并去掉小点点
		cancelWaiting("indexLoginSubmit",loginValue);
		return ;
	}
	if(pWord == ""){
		document.getElementById("indexLoginTips").style.display="block";
		document.getElementById("indexLoginTips").innerHTML="";
		document.getElementById("indexLoginTips").innerHTML=coincommonjs11;
		//恢复按钮让其可点击并去掉小点点
		cancelWaiting("indexLoginSubmit",loginValue);
		return ;
	}else if(pWord.length <6){
		document.getElementById("indexLoginTips").style.display="block";
		document.getElementById("indexLoginTips").innerHTML="";
		document.getElementById("indexLoginTips").innerHTML=coincommonjs12;
		//恢复按钮让其可点击并去掉小点点
		cancelWaiting("indexLoginSubmit",loginValue);
		return ;
	}
	//是否绑定微信
	var weixinBind = 0;
	if(document.getElementById("weixinBind")){
		weixinBind = document.getElementById("weixinBind").value;
	}
	var param={loginName:uName,password:pWord,weixinBind:weixinBind};
	jQuery.post(url,param,function(data){
			var result = eval('(' + data + ')');
			if(result!=null){
				if(result.resultCode == 0){
					if(document.getElementById("forwardUrl") && document.getElementById("forwardUrl").value != ""){
						var forward = document.getElementById("forwardUrl").value;
						forward = decodeURI(forward);


                        if (checkURL(forward)) {
                            window.location.href=forward;
                        } else {
                            window.location.href=document.getElementById("coinMainUrl").value;
                        }

					}else{
						var whref = document.location.href;
						//当为登录页面时则到首页
						if(whref.indexOf("login.do") != -1 && document.getElementById("coinMainUrl")){
							whref = document.getElementById("coinMainUrl").value;
						}
						if(whref.indexOf("#") != -1){
							whref = whref.substring(0,whref.indexOf("#"));
						}
						if(whref.length < 30){
							whref = document.getElementById("coinMainUrl").value+"/trade/tradeContent.do";
						}
						window.location.href = whref;
					}
				}else if(result.resultCode == -1){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					document.getElementById("indexLoginTips").innerHTML=coincommonjs4;
				}else if(result.resultCode == -2){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					document.getElementById("indexLoginTips").innerHTML=coincommonjs5;
				}else if(result.resultCode == -3){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					if(result.errorNum == 0){
						document.getElementById("indexLoginTips").innerHTML=coincommonjs5;
					}else{
						document.getElementById("indexLoginTips").innerHTML=invalidusernamepassword+", "+get$("youhave")+result.errorNum+chancesleft;
					}
					document.getElementById("indexLoginPwd").value="";
				}else if(result.resultCode == -4){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					document.getElementById("indexLoginTips").innerHTML=coincommonjs48;
				}else if(result.resultCode == 1){//谷歌验证二次登录
					if(document.getElementById("forwardUrl") && document.getElementById("forwardUrl").value != ""){
						var forward = document.getElementById("forwardUrl").value;
						forward = decodeURI(forward);
                        if (checkURL(forward)){
                            window.location.href = document.getElementById("coinMainUrl").value+"/user/login.do?forward="+forward;
                        } else {
                            window.location.href = document.getElementById("coinMainUrl").value ;
                        }

					}else{
						window.location.href = document.getElementById("coinMainUrl").value+"/user/login.do";
					}
				}else if(result.resultCode == 2){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					document.getElementById("indexLoginTips").innerHTML=coincommonjs8;
				}else if(result.resultCode == -200){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					document.getElementById("indexLoginTips").innerHTML=coincommonjs4;
				}
				//绑定微信错误处理
				else if(result.resultCode == getErrorNum("weixin_not_login")){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					document.getElementById("indexLoginTips").innerHTML=get$("app_word18");
				}else if(result.resultCode == getErrorNum("weixin_sceneid_invalid") || result.resultCode == getErrorNum("weixin_openid_invalid")){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					document.getElementById("indexLoginTips").innerHTML=get$("app_word14");
				}else if(result.resultCode == getErrorNum("weixin_have_bind_user")){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					document.getElementById("indexLoginTips").innerHTML=get$("app_word15");
				}else if(result.resultCode == getErrorNum("weixin_user_be_bind")){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					document.getElementById("indexLoginTips").innerHTML=get$("app_word16");
				}else if(result.resultCode == getErrorNum("weixin_bind_fail")){
					document.getElementById("indexLoginTips").style.display="block";
					document.getElementById("indexLoginTips").innerHTML="";
					document.getElementById("indexLoginTips").innerHTML=get$("app_word17");
				}
			}
			if(result.resultCode != 0 && result.resultCode != 1){
				//恢复按钮让其可点击并去掉小点点
				cancelWaiting("indexLoginSubmit",loginValue);
			}
	});
}


/**
 * 账户同步
 */
function loginSubmit(){
    if(checkLoginUserName() && checkLoginPassword()){
        var url = "/user/login/index.do?random="+Math.round(Math.random()*100);
        var uName = document.getElementById("loginUserName").value;
        var pWord = document.getElementById("indexLoginPwd").value;
        var longLogin = 0;
        if(document.getElementById("longLogin")!=null && document.getElementById("longLogin").checked){
            longLogin = 1;
        }
        var param={loginName:uName,password:pWord,longLogin:longLogin};
        jQuery.post(url,param,function(data){
            var result = eval('(' + data + ')');
            if(result!=null){
                if(result.resultCode == 0){
                    if(document.getElementById("choiceSyncUrl")!=null && document.getElementById("choiceSyncUrl").value != "") {
                        waitingStation("popLoginSubmit",inlogin);
                        window.location.href = document.getElementById("choiceSyncUrl").value;
                        return;
                    }
                    document.getElementById("form_login_pop").submit();
                    if(document.getElementById("marketlogin")==null){
                        if(document.getElementById("forwardUrl")!=null && document.getElementById("forwardUrl").value != ""){
                            waitingStation("popLoginSubmit",inlogin);
                            var forward = document.getElementById("forwardUrl").value;
                            forward = decodeURI(forward);
                            var forwardFirst = decodeURI('/');
                            if(forward.indexOf(forwardFirst) >= 0){

                                if (checkURL(forward)) {
                                    window.location.href=forward;
                                } else {
                                    window.location.href=document.getElementById("coinMainUrl").value;
                                }
                            }else{
                                window.location.href=document.getElementById("coinMainUrl").value;
                            }
                        }else{
                            waitingStation("popLoginSubmit",inlogin);
                            var whref = document.location.href;
                            if(whref.indexOf("#") != -1){
                                whref = whref.substring(0,whref.indexOf("#"));
                            }
                            if(whref.length < 30){
                                whref = document.getElementById("coinMainUrl").value+"/trade/tradeContent.do";
                            }
                            window.location.href=whref;
                        }
                    }
                }else if(result.resultCode == -1){
                    document.getElementById("loginTips").style.display="block";
                    document.getElementById("loginTips").innerHTML="";
                    document.getElementById("loginTips").innerHTML=coincommonjs4;
                }else if(result.resultCode == -2){
                    document.getElementById("loginTips").style.display="block";
                    document.getElementById("loginTips").innerHTML="";
                    document.getElementById("loginTips").innerHTML=coincommonjs5;
                }else if(result.resultCode == -3){
                    document.getElementById("loginTips").style.display="block";
                    document.getElementById("loginTips").innerHTML="";
                    if(result.errorNum == 0){
                        document.getElementById("loginTips").innerHTML=coincommonjs50;
                    }else{
                        document.getElementById("loginTips").innerHTML=invalidusernamepassword+youhave+result.errorNum+chancesleft;
                    }
                    document.getElementById("indexLoginPwd").value="";
                }else if(result.resultCode == -4){
                    document.getElementById("loginTips").style.display="block";
                    document.getElementById("loginTips").innerHTML="";
                    document.getElementById("loginTips").innerHTML=coincommonjs7;
                }else if(result.resultCode == 1){
                    if(document.getElementById("totpCodeUrl")!=null && document.getElementById("totpCodeUrl").value != "") {
                        waitingStation("popLoginSubmit",inlogin);
                        window.location.href = document.getElementById("totpCodeUrl").value;
                        return;
                    }
                    if(document.getElementById("forwardUrl").value!=null){
                        waitingStation("popLoginSubmit",inlogin);
                        var forward = document.getElementById("forwardUrl").value;
                        if(document.getElementById("domain_siteflag").value==2){
                            showlogin(0);
                        }else{
                            if (checkURL(forward))
                                window.location.href = document.getElementById("coinMainUrl").value+"?forward="+forward;
                        }
                    }else{
                        waitingStation("popLoginSubmit",inlogin);
                        window.location.href = document.getElementById("coinMainUrl").value;
                    }
                }else if(result.resultCode == 2){
                    document.getElementById("loginTips").style.display="block";
                    document.getElementById("loginTips").innerHTML="";
                    document.getElementById("loginTips").innerHTML=coincommonjs8;
                }

            }
        });
    }
}



function checkURL(url){
    var reg = new  RegExp('^/[\\w|/|_]+\\.do$');
    return reg.test(url);
}

function indexDepthDiv(type){
	var url = "/indexDepth.do?symbol="+type+"&random="+Math.round(Math.random()*100);
	jQuery("#depthDiv").load(url,function (data){
	});
}
function trimValue(obj){
	if(document.getElementById("capStatus6") != null){
		document.getElementById("capStatus6").style.display = "none";
	}
	if(document.getElementById("capStatus7") != null){
		document.getElementById("capStatus7").style.display = "none";
	}
	var value = obj.value;
	value = value.replace(new RegExp("　","gm"),'');
	value = value.replace(/^\s+|\s+$/g,"");
	obj.value = value;
}

function submitTotpCode(){
	//点击按钮后让其置灰不可点并出现动态小点点
	var confirmValue = "";
	if(document.getElementById("googleTwiceLogin") != null){
		confirmValue = document.getElementById("googleTwiceLogin").value;		//先前按钮的值
		waitingStation("googleTwiceLogin",confirmValue);
	}
	var totpCode = "";
    if(document.getElementById("totpCodeDialog")) {
        totpCode = document.getElementById("totpCodeDialog").value;
    }else {
        totpCode = document.getElementById("totpCode").value;
    }
	var regu = /^[0-9]{6}$/;
    var re = new RegExp(regu);
    var errorSpan = document.getElementById("errorSpan");
    if(document.getElementById("errorSpanDialog")) {
        errorSpan = document.getElementById("errorSpanDialog");
    }
    if (!re.test(totpCode)) {
        errorSpan.style.display = "block";
        errorSpan.innerHTML = coincommonjs49;
        //恢复按钮让其可点击并去掉小点点
		cancelWaiting("googleTwiceLogin",confirmValue);
    	return ;
    }
	var url = "/user/login/submitTotpCode.do?random="+Math.round(Math.random()*100);
	var param={totpCode:totpCode};
	jQuery.post(url,param,function(data){
			var result = eval('(' + data + ')');
			if(result!=null){
				if(result.resultCode == 0){
                    if(document.getElementById("choiceSyncUrl")!=null && document.getElementById("choiceSyncUrl").value != "") {
                        window.location.href = document.getElementById("choiceSyncUrl").value;
                        return;
                    }
					if(document.getElementById("forwardUrl")!=null && document.getElementById("forwardUrl").value != ""){
						var forward = document.getElementById("forwardUrl").value;
						forward = decodeURI(forward);
                        if (checkURL(forward)){
                            window.location.href=forward;
                        }else{
                            window.location.href=document.getElementById("coinMainUrl").value;
                        }

					}else{
						var whref = document.location.href;
						//当为登录页面时则到首页
						if(whref.indexOf("login.do") != -1 && document.getElementById("coinMainUrl")){
							whref = document.getElementById("coinMainUrl").value;
						}
						if(whref.indexOf("#") != -1){
							whref = whref.substring(0,whref.indexOf("#"));
						}
						if(whref.length < 30){
							whref = document.getElementById("coinMainUrl").value+"/trade/tradeContent.do";
						}
						window.location.href=whref;
					}
				}else if(result.resultCode == 2){//微博登录未绑定邮箱跳转
					window.location.href="/user/security.do?cue=1";
				}else if(result.resultCode == -1){
                    errorSpan.style.display = "block";
                    errorSpan.innerHTML = coincommonjs49;
				}else if(result.resultCode == -2){
                    errorSpan.style.display = "block";
					if(result.errorNum == 0){
                        errorSpan.innerHTML=coincommonjs50;
					}else{
                        errorSpan.innerHTML=coincommonjs51+", "+youhave+result.errorNum+chancesleft;
					}
				}else if(result.resultCode == -20){
                    errorSpan.style.display = "block";
                    errorSpan.innerHTML = googlecodebeenused;
				 }
			}
			//恢复按钮让其可点击并去掉小点点
			if(result.resultCode != 0 && result.resultCode != 2){
				cancelWaiting("googleTwiceLogin",confirmValue);
			}
	});
}

function controlDisplayQQGroup(){
	document.getElementById('QQRest').style.display="";
	document.getElementById('controlDisplayQQGroup').style.display="none";
	document.getElementById('controlHiddenQQGroup').style.display="";
}

function controlHiddenQQGroup(){
	document.getElementById('QQRest').style.display="none";
	document.getElementById('controlDisplayQQGroup').style.display="";
	document.getElementById('controlHiddenQQGroup').style.display="none";
}

function showBackLeft(){
	var okhelp = new CookieClass();
	if(okhelp.getCookie("okhelp") == "" || okhelp.getCookie("okhelp") == 0){
	okhelp.setCookie("okhelp", 1);
	}
	document.getElementById('backtop2').style.display="block";
	document.getElementById('okRight').style.display="block";
	var okleft = document.getElementById('okLeft');
	if(okleft!=null){
		okleft.style.display="none";
	}
}

function showBackRight(){
	var okhelp = new CookieClass();
	if(okhelp.getCookie("okhelp") == "" || okhelp.getCookie("okhelp") == 1){
	okhelp.setCookie("okhelp", 0);
	}
	document.getElementById('backtop2').style.display="none";
	document.getElementById('okRight').style.display="none";
	document.getElementById('okLeft').style.display="block";
}
//顶部k线  根据k线版本切换时使用
function changeSymbol(type){
	if(type=="1"){
		document.getElementById("okcoinTitle").className ="cur";
		document.getElementById("bitstampTitle").className ="";
		document.getElementById("okcoinLtcTitle").className ="";
		if(document.getElementById("bannerLineOld").style.display!="none"){
			document.getElementById("bannerLineOld").style.display="none";
			document.getElementById("oldLineTime").style.display="none";
			document.getElementById("bannerLineNew").style.display="";
			document.getElementById("klineFullScreen").src="/kline/start.do?symbol=okcoinbtccny";
		}else{
			document.getElementById("bannerLineNew").style.display="";
			document.getElementById("oldLineTime").style.display="none";
			document.getElementById("klineFullScreen").src="/kline/start.do?symbol=okcoinbtccny";
		}
	}else if(type=="2"){
		document.getElementById("okcoinTitle").className ="";
		document.getElementById("bitstampTitle").className ="";
		document.getElementById("okcoinLtcTitle").className ="cur";
		if(document.getElementById("bannerLineOld").style.display!="none"){
			document.getElementById("bannerLineOld").style.display="none";
			document.getElementById("oldLineTime").style.display="none";
			document.getElementById("bannerLineNew").style.display="";
			document.getElementById("klineFullScreen").src="/kline/start.do?symbol=okcoinltccny";
		}else{
			document.getElementById("bannerLineNew").style.display="";
			document.getElementById("oldLineTime").style.display="none";
			document.getElementById("klineFullScreen").src="/kline/start.do?symbol=okcoinltccny";
		}
	}else if(type=="3"){
		if(document.getElementById("bannerLineNew").style.display!="none"){
			document.getElementById("bannerLineNew").style.display="none";
			document.getElementById("bannerLineOld").style.display="";
			document.getElementById("oldLineTime").style.display="";
			showKLine(1,3);
		}else{
			document.getElementById("bannerLineOld").style.display="";
			document.getElementById("oldLineTime").style.display="";
			showKLine(1,3);
		}
	}else if(type=="4"){
		if(document.getElementById("bannerLineNew").style.display!="none"){
			document.getElementById("bannerLineNew").style.display="none";
			document.getElementById("oldLineTime").style.display="";
			document.getElementById("bannerLineOld").style.display="";
			showKLine(4,3);
		}else{
			document.getElementById("bannerLineOld").style.display="";
			document.getElementById("oldLineTime").style.display="";
			showKLine(4,3);
		}
	}
}
/**
 * 向上整数
 */
function round(value,scale){
	var sca=Math.pow(10, scale);
	var val=value*sca;
	val=Math.ceil(val);
	return val/sca;
}
/**
 * 向下取证
 */
function floor(value,scale){
	var sca=Math.pow(10, scale);
	var val=accMul_z(value,sca);
	val=Math.floor(val);
	return val/sca;
}

function subPoint(value){
	var reg=/^(-?\d*)\.?\d{1,4}$/;
	if(value!=null && value.toString().split(".")!=null && value.toString().split(".")[1]!=null && value.toString().split(".")[1].length>4){
		if(!reg.test(value)){
			var end =  value.toString().split(".")[1];
			if(end.length>4){
				end = end.substring(0, 4);
			}
			value = value.toString().split(".")[0]+"."+end;
		}
	}
	return value;
}
function subPoint2(value){
	var reg=/^(-?\d*)\.?\d{1,2}$/;
	if(value!=null && value.toString().split(".")!=null && value.toString().split(".")[1]!=null && value.toString().split(".")[1].length>2){
		if(!reg.test(value)){
			var end =  value.toString().split(".")[1];
			if(end.length>2){
				end = end.substring(0, 2);
			}
			value = value.toString().split(".")[0]+"."+end;
		}
	}
	return value;
}
function changeCallMessage(id,titleId){
	if(id!=null&&id.length>0){
		var oldId = id+"Sign";
		var display = Number(document.getElementById(oldId).value);
		if(display==0){
			document.getElementById(id).value=coincommonjs54;
			document.getElementById(titleId).innerHTML=coincommonjs55;
			document.getElementById(oldId).value="1";
		}else{
			document.getElementById(id).value=getsmsverificationcode;
			document.getElementById(titleId).innerHTML=coincommonjs57;
			document.getElementById(oldId).value="0";
		}

	}
}
function changeBtn(id,isInter){
//	if(isInter==0){2014年8月19 国内外手机号均打开语音接口
    if(document.getElementById(id+"Title"))
        document.getElementById(id+"Title").style.display="";
    var msgType = document.getElementById(id+"Sign").value;
    if(msgType==0){
        document.getElementById(id).value=getsmsverificationcode;
    }else{
        document.getElementById(id).value=coincommonjs54;
    }
//	}else{
//		document.getElementById(id).value=getsmsverificationcode;
//	}
}
function hiddenTitle(id){
	document.getElementById(id+"Title").style.display="none";
}
//过滤输入的数字
function checkNumberByName(name){
	var number = document.getElementById(name).value.split('.');
	if(number.length > 1){
		return number[0].replace(/\D/g, '') + '.' + number[1].replace(/\D/g, '').slice(0, 4);
	}else{
		return number[0].replace(/\D/g,'');
	}
}

function checkPriceNum(price, len) {
    var str = "<>?/;\':\"[]{}\\|-=\_\+~!@#$%^&*(),";
    var point = false;
    price = price.split('');
    for (var i = 0; i < str.length; ++i) {
        for (var j = 0; j < price.length; ++j) {
            if (!point && price[j] == '.') {
                point = true;
            }
            if (price[j] == str[i]) {
                if (point) {
                    price[j] = '';
                } else  {
                    price[j] = '.';
                }
            }
        }
    }
    price = price.join('');
    var num = price.split('.');
    if (num.length > 1) {
        return num[0].replace(/\D/g, '') + '.' + num[1].replace(/\D/g, '').slice(0, len);
    } else {
        return num[0].replace(/\D/g, '');
    }
}

//英文字母，数字，空白，小数点  最大长度
function checkString(obj,length){
    var str = obj.value;

    if (str.length > length) {
        str = str.substring(0,length);
    }
    str = str.replace(/[^a-zA-Z0-9\.\- +| +$]/g,'');

    var  objPosition = getPositionForInput(obj);
    obj.value = str;
    setCursorPosition(obj,objPosition);
}
//英文字母，数字  最大长度
function checkNumberAndEnglish(obj,length){
    var str = obj.value;

    if (str.length > length) {
        str = str.substring(0,length);
    }
    str = str.replace(/[^a-zA-Z0-9]/g,'');

    var  objPosition = getPositionForInput(obj);
    obj.value = str;
    setCursorPosition(obj,objPosition);
}


function checkNumberByObj(obj,lenth){
	var number = obj.value.split('.');
    if(lenth<=0){
        return number[0].replace(/\D/g,'');
    }
	if(number.length > 1){
		return number[0].replace(/\D/g, '') + '.' + number[1].replace(/\D/g, '').slice(0, lenth);
	}else{
		return number[0].replace(/\D/g,'');
	}
}
function checkNumberByObjNegative(obj,lenth){
    var number = obj.value.split('.');
    if(lenth<=0){
        return number[0].replace(/\D/g,'');
    }
    var index = number[0].indexOf("-");
    var symbol1 = "";
    if(index==0){
        symbol1 = "-"
    }
    if(number.length > 1){
        return symbol1+number[0].replace(/\D/g, '') + '.' + number[1].replace(/\D/g, '').slice(0, lenth);
    }else{
        return symbol1+number[0].replace(/\D/g,'');
    }
}
function checkNumberByObjNegativeAndMin(obj,lenth){
    var number = obj.value.split('.');
    if(lenth<=0){
        return number[0].replace(/\D/g,'');
    }
    var index = number[0].indexOf("-");
    var symbol1 = "";
    if(index==0){
        symbol1 = "-"
    }
    var balanceVal = 0;
    if(number.length > 1){
        balanceVal =  symbol1+number[0].replace(/\D/g, '') + '.' + number[1].replace(/\D/g, '').slice(0, lenth);
        if(Number(balanceVal)<getIntBlance()){
            balanceVal = getIntBlance();
        }
    }else{
        balanceVal =  symbol1+number[0].replace(/\D/g,'');
        if(Number(balanceVal)<getIntBlance()){
            balanceVal = getIntBlance();
        }
    }
    return Number(balanceVal);
}
function getIntBlance(){
    //杠杆倍数
    var leverRate = jQuery("#counterLeverRate").val();
    //开仓数量
    var openAmount = jQuery("#counterAmountBp").val();
    if(openAmount==""||openAmount<=0){
        openAmount=1;
    }else if(jQuery("#cont_btc").val()==0){
        openAmount = getConvertBtcToZhang(openAmount);
    }
    //开仓价格
    var openPrice = jQuery("#counterOpenPriceBp").val();
    if(openPrice==""){
        openPrice =0;
    }
    var unitAmount = getCnyValue(4,jQuery("#futureCost").val());
    //账户余额
    var balance = jQuery("#counterBalanceBp").val();
    var temp = accMul_z(accDiv_z(unitAmount,openPrice),accDiv_z(openAmount,leverRate));
    if(balance==""||Number(balance)<=0){
        balance=temp;
    }
    return balance;
}
function getIntBlanceMin(){
    //杠杆倍数
    var leverRate = jQuery("#counterLeverRate").val();
    //开仓数量
    var openAmount = 1;
    //开仓价格
    var openPrice = jQuery("#counterOpenPriceBp").val();
    if(openPrice==""){
        openPrice =0;
    }
    var unitAmount = getCnyValue(4,jQuery("#futureCost").val());
    //账户余额
    var balanceMin = accMul_z(accDiv_z(unitAmount,openPrice),accDiv_z(openAmount,leverRate));
    return CommaFormattedCommon(balanceMin,4);
}
/**
 * 判断整数
 * @author dqx
 * @return
 */
function checkIntegerNumberByObj(obj){
	var number = obj.value.split('.');
    return number[0].replace(/\D/g,'');//直接返回

}
function checkIntegerNumberByObjNegative(obj){
    var number = obj.value.split('.');
    var index = number[0].indexOf("-");
    var symbol1 = "";
    if(index==0){
        symbol1 = "-"
    }
    return symbol1+number[0].replace(/\D/g,'');//直接返回

}
//获得光标位置
function getPositionForInput(ctrl){
    if(!ctrl){
        return;
    }
	var CaretPos = 0;
	if (document.selection) { // IE Support
	ctrl.focus();
	var Sel = document.selection.createRange();
	Sel.moveStart('character', -ctrl.value.length);
	CaretPos = Sel.text.length;
	}else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support
	CaretPos = ctrl.selectionStart;
	}
	return (CaretPos);
}
//设置光标位置
function setCursorPosition(ctrl, pos){
    if(!ctrl){
        return;
    }
	if(ctrl.setSelectionRange){
	ctrl.focus();
	ctrl.setSelectionRange(pos,pos);
	}
	else if (ctrl.createTextRange) {
	var range = ctrl.createTextRange();
	range.collapse(true);
	range.moveEnd('character', pos);
	range.moveStart('character', pos);
	range.select();
	}
}
//加法
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}
//乘法
function accMul(arg1,arg2) {
	var m=0,s1=arg1.toString(),s2=arg2.toString();
	try{m+=s1.split(".")[1].length;}catch(e){}
	try{m+=s2.split(".")[1].length;}catch(e){}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
//除法
function accDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length;}catch(e){}
    try{t2=arg2.toString().split(".")[1].length;}catch(e){}
    with(Math){
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        return (r1/r2)*pow(10,t2-t1);
    }
}
//加法
function accAdd_z(arg1,arg2){
    return (Number(arg1)+Number(arg2)).toFixed(8);
}
//乘法
function accMul_z(arg1,arg2) {
    return (Number(arg1)*Number(arg2)).toFixed(8);
}
//除法
function accDiv_z(arg1,arg2) {
    if(Number(arg2)==0){
        return 0;
    }
    return (Number(arg1)/Number(arg2)).toFixed(8);
}
//兼容ctrlA组合键和tab键
function ctrlAorTab(event){
	if(event !=null && (event.keyCode==9 || event.keyCode==17)){
		return true;
	}
	if(event !=null && event.ctrlKey && event.keyCode==65){
		return true;
	}
}
function isSpider(){
	var result = false;
	var spiderAgentArr = ["Baiduspider","Googlebot", "360Spider","Sosospider", "sogou spider"];
	for(var i=0;i<spiderAgentArr.length;i++){
		if(navigator.userAgent.indexOf(spiderAgentArr[0])>0){
			result = true;
		}
	}
	return result;
}

function closeDetectCapsLock(elem){
	document.getElementById(elem).style.display = "none";
}


function  detectCapsLock(e,elem){
	   valueCapsLock  =  e.keyCode ? e.keyCode:e.which; // Caps Lock　是否打开
	   var o = document.getElementById(elem);
	   valueShift  =  e.shiftKey ? e.shiftKey:((valueCapsLock  ==   16 ) ? true : false ); // shift键是否按住

	    if (((valueCapsLock >=   65   &&  valueCapsLock  <=   90 )  &&   ! valueShift) // Caps Lock 打开，并且 shift键没有按住
	    || ((valueCapsLock >=   97   &&  valueCapsLock  <=   122 )  &&  valueShift))// Caps Lock 打开，并且按住 shift键
	       {
	    		o.style.display  =  "block";
	       }else{
	            o.style.display  =  "none";
	       }
	}

/**切换语言***/
function showLanguageType(){
	document.getElementById("languageChange").style.display = "";
	document.getElementById("showLanguageType").style.display = "none";
	document.getElementById("closeLanguageType").style.display = "";
}

function closeLanguageType(){
	document.getElementById("languageChange").style.display = "none";
	document.getElementById("showLanguageType").style.display = "";
	document.getElementById("closeLanguageType").style.display = "none";
}

function getLanguageCookie(elem){
	var languageCookieType = new CookieClass();
	languageCookieType.setCookie("language", elem);
	var ref=window.location.href;
	if(ref.indexOf("#")!=-1){
		var str=ref.substring(0,ref.indexOf("#"));
		window.location.href = str;
	}else{
		window.location.href = ref;
	}
}
function getCurrencyChange(pro){
	getCurrency(pro.value);
}
function getCurrency(elem){
//20位计价货币：0：USD 1：CNY
	var bit = 20;
	var params = {bit:bit,value:elem};
	var url = "/future/tradeAndCurrencySettings.do?random="+Math.round(Math.random()*100);
	jQuery.post(url,params,function(data){
		if(data == 0 ){
			var ref=window.location.href;
			if(ref.indexOf("#")!=-1){
				var str=ref.substring(0,ref.indexOf("#"));
				window.location.href = str;
			}else{
				window.location.href = ref;
			}
		}
	});
}
/**
* 测试密码强度
*/
function checkStrong(sPW){
	Modes=0;
	for(var i=0;i<sPW.length;i++){
		//测试每一个字符的类别并统计一共有多少种模式
		Modes|=CharMode(sPW.charCodeAt(i));
	}
	return bitTotal(Modes);
}
function CharMode(iN){
	if (iN>=48 && iN <=57) return 1;//数字
	if (iN>=65 && iN <=90) return 2;//大写字母
	if (iN>=97 && iN <=122) return 4;//小写
	else return 8; //特殊字符
}
function bitTotal(num){
	modes=0;
	for(var i=0;i<4;i++){
		if(num & 1) modes++;
		num>>>=1;
	}
	return modes;
}

/**input显示**/
function inputDisabledTrue(inputID){
	document.getElementById(inputID).style.background="#d9d9d9";
	document.getElementById(inputID).style.color = "#999999";
	document.getElementById(inputID).style.cursor = "auto";
}
/**input不显示**/
function inputDisabledFalse(inputID){
	document.getElementById(inputID).style.background="#F5F5F5";
	document.getElementById(inputID).style.color = "#1478C8";
}
/**input不显示**/
function inputDisabledFalseSubmit(inputID){
	document.getElementById(inputID).style.background="#e6e9ed";
	document.getElementById(inputID).style.border="none";
	document.getElementById(inputID).style.color = "#676767";
}
/**inputBorder显示**/
function inputNbgDisabledTrue(inputID){
	document.getElementById(inputID).style.background="transparent";
	document.getElementById(inputID).style.color = "#999";
	document.getElementById(inputID).style.cursor = "auto";
}
/**inputBorder不显示**/
function inputNbgDisabledFalse(inputID){
	document.getElementById(inputID).style.background="transparent";
	document.getElementById(inputID).style.color = "#0096df";
	document.getElementById(inputID).style.cursor = "pointer";
}
/**
 * 按钮提交后，防止重复提交，等待状态...
 * @param elementId		对象id
 * @param elementValue	对象国际化值
 */
function circulatePoint(elementId,elementValue){
	var index = 0;
	circulatePointTimer = setInterval(function(){
		if(index==3){
			index=0;
			document.getElementById(elementId).value=elementValue;
			return ;
		}else{
			document.getElementById(elementId).value+=".";
			index++;
		}
	}, 500);
}
/**
 * 按钮点击后让其置灰不可点并出现动态小点点
 * @param elementId		对象id
 * @param elementValue	对象国际化值
 */
function waitingStation(elementId,elementValue){
//	alert(elementId);
	if(elementValue != "" && document.getElementById(elementId)){
		document.getElementById(elementId).value=elementValue;
		document.getElementById(elementId).style.background="#ebebeb";
		document.getElementById(elementId).style.color = "#686868";
		document.getElementById(elementId).style.cursor = "auto";
		document.getElementById(elementId).style.border = "1px solid #ebebeb";
		document.getElementById(elementId).disabled = true;
		circulatePoint(elementId,elementValue);
	}
}
/**
 * 按钮恢复可点击并去年动态小点点
 * @param elementId		对象id
 * @param elementValue	对象国际化值
 */
function cancelWaiting(elementId,elementValue){
	if(elementValue != "" && document.getElementById(elementId)){
		document.getElementById(elementId).value=elementValue;
		document.getElementById(elementId).style.background="#0096e0";
		document.getElementById(elementId).style.color = "#fff";
		document.getElementById(elementId).style.cursor = "pointer";
		document.getElementById(elementId).style.border = "1px solid #0096e0";
		document.getElementById(elementId).disabled = false;
		document.getElementById(elementId).value=elementValue;
		clearInterval(circulatePointTimer);
	}
}
function waitingStationStatic(elementId,elementValue){
	document.getElementById(elementId).style.background="#ebebeb";
	document.getElementById(elementId).style.color = "#686868";
	document.getElementById(elementId).style.cursor = "auto";
	document.getElementById(elementId).style.border = "1px solid #ebebeb";
	document.getElementById(elementId).disabled = true;
	document.getElementById(elementId).value=elementValue+"...";
}

function waitingStationBorder(elementId,elementValue){
	document.getElementById(elementId).style.color = "#686868";
	document.getElementById(elementId).style.cursor = "auto";
	document.getElementById(elementId).style.border = "1px solid #d0d0d0";
	document.getElementById(elementId).disabled = true;
	document.getElementById(elementId).value=elementValue+"...";
	//circulatePoint(elementId,elementValue);
}
function disabledStation(elementId){
    var obj = document.getElementById(elementId);
    if(obj){
        obj.style.background="#ebebeb";
        obj.style.color = "#d0d0d0";
        obj.style.cursor = "auto";
        obj.style.border = "1px solid #ebebeb";
        obj.disabled = true;
    }

}

function enabledStation(elementId){
    var obj = document.getElementById(elementId);
    if(obj){
        obj.setAttribute("style","");
        obj.style.fontSize="16px";
        obj.disabled = false;
    }

}

function disabledStationBorder(elementId){
	document.getElementById(elementId).style.color = "#d0d0d0";
	document.getElementById(elementId).style.cursor = "auto";
	document.getElementById(elementId).style.border = "2px solid #d0d0d0";
	document.getElementById(elementId).disabled = true;
}
/**
 * 清除等待中...
 * @param elementId		对象id
 * @param elementValue	对象国际化值
 */
function clearWaitingStation(elementId,elementValue){
	if(document.getElementById(elementId)){
		document.getElementById(elementId).value=elementValue;
		document.getElementById(elementId).style.background="";
		document.getElementById(elementId).style.color = "";
		document.getElementById(elementId).style.cursor = "pointer";
		document.getElementById(elementId).style.border = "";
		document.getElementById(elementId).disabled = false;
		document.getElementById(elementId).value=elementValue;
		clearInterval(circulatePointTimer);
	}
//	var index = 0;
//	var f=setInterval(function(){
//		if(index==0){
//			document.getElementById(elementId).value=elementValue;
//			return ;
//		}
//	}, 500);
	//window.prototype.clearInterval(f);
	//window.clearInterval(f);
}
function clearWaitingStationBorder(elementId,elementValue){
	document.getElementById(elementId).value=elementValue;
	document.getElementById(elementId).style.color = "";
	document.getElementById(elementId).style.cursor = "pointer";
	document.getElementById(elementId).style.border = "";
	document.getElementById(elementId).disabled = false;
	var index = 0;
	var f=setInterval(function(){
		if(index==0){
			document.getElementById(elementId).value=elementValue;
			return ;
		}
	}, 500);
	//window.prototype.clearInterval(f);
	//window.clearInterval(f);
}
function clearDisabledStation(elementId){
	document.getElementById(elementId).style.background="";
	document.getElementById(elementId).style.color = "";
	document.getElementById(elementId).style.cursor = "pointer";
	document.getElementById(elementId).style.border = "";
	document.getElementById(elementId).disabled = false;
}
function clearDisabledStationBorder(elementId){
	document.getElementById(elementId).style.color = "";
	document.getElementById(elementId).style.cursor = "pointer";
	document.getElementById(elementId).style.border = "";
	document.getElementById(elementId).disabled = false;
}
var timerCountDownId ;
function timerCountDown(timeMs){
//	var timeMs=82400000;
	timeShow(timeMs);
	timerCountDownId = setInterval('timeAnimate()',1000);
}

function timeShow (timeMs){
		var timeHr=Math.floor(timeMs/3600000),
			timeMin=Math.floor(timeMs/60000);
		jQuery('[data-id=box-countTime]').attr('ms-count',timeMs);
		switch(true){
			case timeMs>86400000 || timeMs=='' ||  timeMs==0:
				jQuery('[data-id=box-countTime]').text('').attr('ms-count','');
				break;
			case timeMs<=3600000:
				var timeS=Math.round( (timeMs/1000)-(timeMin*60) );
				jQuery('[data-id=box-countTime]').text(timeMin+futureminutes+" "+timeS+futureseconds);
			break;
			case timeMs>3600000:
				var timeMins=Math.round( (timeMs/60000)-(timeHr*60) );
				jQuery('[data-id=box-countTime]').text(timeHr+futurehours);
				break;
			default:
				break;
		}
	}
function timeAnimate (){
		var cMs=jQuery('[data-id=box-countTime]').attr('ms-count'),
			fMs=cMs-1000,
			timeHr=Math.floor(fMs/3600000),
			timeMin=Math.floor(fMs/60000);

		jQuery('[data-id=box-countTime]').attr('ms-count',fMs);
		timeMs=fMs;

		switch(true){
			case fMs<=0:
				jQuery('[data-id=box-countTime]').text('').attr('ms-count','');
			break;
			case fMs<=3600000:
				var timeS=Math.round( (cMs/1000)-(timeMin*60) );
				jQuery('[data-id=box-countTime]').text(timeMin+futureminutes+" "+timeS+futureseconds);
			break;
			case fMs>3600000:
				var timeMins=Math.round( (cMs/60000)-(timeHr*60) );
				jQuery('[data-id=box-countTime]').text(timeHr+futurehours);
				break;
			default:
				break;
		}
	}

/***文字循环滚动****/
function startmarquee(lh,speed,delay,ID) {
	var p=false;
	var t;
	var o=document.getElementById(ID);
	o.innerHTML+=o.innerHTML;
	o.style.marginTop=0;
	o.onmouseover=function(){p=true;}
	o.onmouseout=function(){p=false;}
	function start(){
	t=setInterval(scrolling,speed);
	if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
	}
	function scrolling(){
		if(parseInt(o.style.marginTop)%lh!=0){
			o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
			if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2) {
				o.style.marginTop=0;
			}
		}else{
			clearInterval(t);
			setTimeout(start,delay);
		}
	}
	setTimeout(start,delay);
}
function startmarquee2(lh,speed,delay,ID) {
	var p=false;
	var t;
	var o=document.getElementById(ID);
	o.innerHTML+=o.innerHTML;
	o.scrollTop=0;
	o.onmouseover=function(){p=true;}
	o.onmouseout=function(){p=false;}
	function start(){
	t=setInterval(scrolling,speed);
	if(!p) o.scrollTop=parseInt(o.scrollTop)+1;
	}
	function scrolling(){
		if(parseInt(o.scrollTop)%lh!=0){
			o.scrollTop=parseInt(o.scrollTop)+1;
			if(o.scrollTop+o.clientHeight>=o.scrollHeight) {
				o.scrollTop=0;
			}
		}else{
			clearInterval(t);
			setTimeout(start,delay);
		}
	}
	setTimeout(start,delay);
}
/****切换账号****/
function switchAccountNumber(){
	jQuery.post("/index.do?index=2",null,function (data){
		showlogin(0);
	});
}
/***刷新首页合约数据***/
function insertData(palceID,data){
	if(document.getElementsByName(palceID).length >1){
		for(var i = 0;i<document.getElementsByName(palceID).length;i++){
			document.getElementsByName(palceID).item(i).innerHTML = data;
		}
	}
}
function runGetFutureNumber(){
	interval = setInterval(function(){
		var url = "/future/futureTicker.do?random="+Math.round(Math.random()*100);
		jQuery.post(url,function(data){
			var result = eval('(' + data + ')');
			if(result != null){
				insertData("futureBtcLastPrice",result.btcPrice);
				insertData("futureBtcVolume",subPoint2(result.btcVolume));
				insertData("futureLtcLastPrice",result.ltcPrice);
				insertData("futureLtcVolume",subPoint2(result.ltcVolume));
				insertData("futureBtcHoldVolume",result.btcHoldVolume);
				insertData("futureltcHoldVolume",result.ltcHoldVolume);
				insertData("futureBtcHoldCoin",result.btcHoldCoin);
				insertData("futureltcHoldCoin",result.ltcHoldCoin);
			}
		});
	}, "5000");
}

function CommaFormattedCommon(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";

    return s;
}
function CommaFormattedLittle(s, n) {
    if(Number(s)<1000){
        return Number(s).toFixed(n);
    }
    return (Number(s).toFixed(n) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
function CommaFormatted(s, n) {
    var k = n;
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var result =t.split("").reverse().join("") + "." + r;
    if(Number(s)<0){
        if(result!=null&&result.substr(0,2)=="-,"){
            result=result.substr(2,result.length);
            result="-"+result;
        }
    }
    if(k==0){
        return result.split(".")[0];
    }
    return result;
}
//只千分位，不补位，0.00-->0
function CommaFormattedByOriginal(s) {
    var temp = s.split(".");
    var tempLength = temp.length==2?temp[1].length:0;
    return CommaFormatted(s,tempLength);
}

//只千分位，不补位，0.00-->0
function CommaFormattedOnly(s) {

    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
    var slength = s.split(".").length;
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var result;
    if(slength>1){
    	result =t.split("").reverse().join("") + "." + r;
    }else{
    	result =t.split("").reverse().join("");
    }
    if(Number(s)<0){
        if(result!=null&&result.substr(0,2)=="-,"){
            result=result.substr(2,result.length);
            result="-"+result;
        }
    }
    return result;
}

function closeIPAlertLayer(){
	var url = "/user/closeIpAlert.do?random="+Math.round(Math.random()*100);
	var param={};
	jQuery.post(url,param,function(data){
		var result = eval('(' + data + ')');
		if(result!=null){
			 if(result.resultCode == 0){
				// 重新加载公告
				if(document.getElementById("ipalert")){
					jQuery("#ipalert").load("/user/showIpAlert.do",function(){
					});
				}
			 }else if(result.resultCode == -1){
				 window.location.href = "/";
			 }
		}
	});
}
function displaySendEmail(){
	window.location.href = "/user/userConfigures.do";
}

/*****密码输入小键盘****/
(function(jQuery){
	jQuery.fn.keyboard = function(options){
		options = jQuery.extend({
			lang:'en'
		}, options);
		var commonUrl = document.getElementById("__pre_url").value;
		var rand = options.name;
		var make = function(){
			var keyboard='\
			<div class="keyboard_close"></div>\
			<div class="keyboard_norm keyboard_type en">\
				<table class="keyboard_row">\
					<tr>\
						<td ><span class="keyboard_key"><span class="keyboard_key-m">`</span></span></td>\
						<td name="downNum'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">1</span></span></td>\
						<td name="downNum'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">2</span></span></td>\
						<td name="downNum'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">3</span></span></td>\
						<td name="downNum'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">4</span></span></td>\
						<td name="downNum'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">5</span></span></td>\
						<td name="downNum'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">6</span></span></td>\
						<td name="downNum'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">7</span></span></td>\
						<td name="downNum'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">8</span></span></td>\
						<td name="downNum'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">9</span></span></td>\
						<td name="downNum'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">0</span></span></td>\
						<td id="downNumTr'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">-</span></span></td>\
						<td ><span class="keyboard_key"><span class="keyboard_key-m">=</span></span></td>\
						<td ><span class="keyboard_key backspace"><span class="keyboard_key-m">←</span></span></td>\
					</tr>\
				</table>\
				<table class="keyboard_row">\
					<tr>\
						<td><span class="keyboard_key atmark"><span class="keyboard_key-m">@</span></span></td>\
						<td name="downWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">q</span></span></td>\
						<td name="downWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">w</span></span></td>\
						<td name="downWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">e</span></span></td>\
						<td name="downWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">r</span></span></td>\
						<td name="downWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">t</span></span></td>\
						<td name="downWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">y</span></span></td>\
						<td name="downWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">u</span></span></td>\
						<td name="downWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">i</span></span></td>\
						<td name="downWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">o</span></span></td>\
						<td name="downWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">p</span></span></td>\
						<td id="downWord1Tr'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">[</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">]</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">\\</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">“</span></span></td>\
					</tr>\
				</table>\
				<table class="keyboard_row">\
					<tr>\
						<td><span class="keyboard_key capslock"><span class="keyboard_key-m"><img src="'+commonUrl+'/image/keyboard/capslock.png" alt="capslock"/></span></span></td>\
						<td name="downWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">a</span></span></td>\
						<td name="downWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">s</span></span></td>\
						<td name="downWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">d</span></span></td>\
						<td name="downWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">f</span></span></td>\
						<td name="downWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">g</span></span></td>\
						<td name="downWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">h</span></span></td>\
						<td name="downWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">j</span></span></td>\
						<td name="downWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">k</span></span></td>\
						<td name="downWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">l</span></span></td>\
						<td id="downWord2Tr'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">;</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">\'</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">!</span></span></td>\
						<td><span class="keyboard_key enter"><span class="keyboard_key-m"><img src="'+commonUrl+'/image/keyboard/enter.png" alt="enter"/></span></span></td>\
					</tr>\
				</table>\
				<table class="keyboard_row">\
					<tr>\
						<td><span class="keyboard_key lshift"><span class="keyboard_key-m"><img src="'+commonUrl+'/image/keyboard/shift.png" alt="shift"/></span></span></td>\
						<td name="downWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">z</span></span></td>\
						<td name="downWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">x</span></span></td>\
						<td name="downWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">c</span></span></td>\
						<td name="downWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">v</span></span></td>\
						<td name="downWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">b</span></span></td>\
						<td name="downWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">n</span></span></td>\
						<td name="downWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">m</span></span></td>\
						<td id="downWord3Tr'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">,</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">.</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">:</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">/</span></span></td>\
						<td><span class="keyboard_key rshift"><span class="keyboard_key-m">shift</span></span></td>\
					</tr>\
				</table>\
			</div>\
			<div class="keyboard_caps keyboard_type en">\
				<table class="keyboard_row">\
					<tr>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">~</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">!</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">@</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">#</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">$</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">%</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">^</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">&</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">*</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">(</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">)</span></span></td>\
						<td name="upWord1'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">_</span></span></td>\
						<td id="upWord1Tr'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">+</span></span></td>\
						<td ><span class="keyboard_key backspace"><span class="keyboard_key-m">←</span></span></td>\
					</tr>\
				</table>\
				<table class="keyboard_row">\
					<tr>\
						<td><span class="keyboard_key atmark"><span class="keyboard_key-m">@</span></span></td>\
						<td name="upWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">Q</span></span></td>\
						<td name="upWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">W</span></span></td>\
						<td name="upWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">E</span></span></td>\
						<td name="upWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">R</span></span></td>\
						<td name="upWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">T</span></span></td>\
						<td name="upWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">Y</span></span></td>\
						<td name="upWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">U</span></span></td>\
						<td name="upWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">I</span></span></td>\
						<td name="upWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">O</span></span></td>\
						<td name="upWord2'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">P</span></span></td>\
						<td id="upWord2Tr'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">{</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">}</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">|</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">”</span></span></td>\
					</tr>\
				</table>\
				<table class="keyboard_row">\
					<tr>\
						<td><span class="keyboard_key capslock"><span class="keyboard_key-m"><img src="'+commonUrl+'/image/keyboard/capslock.png" alt="capslock"/></span></span></td>\
						<td name="upWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">A</span></span></td>\
						<td name="upWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">S</span></span></td>\
						<td name="upWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">D</span></span></td>\
						<td name="upWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">F</span></span></td>\
						<td name="upWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">G</span></span></td>\
						<td name="upWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">H</span></span></td>\
						<td name="upWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">J</span></span></td>\
						<td name="upWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">K</span></span></td>\
						<td name="upWord3'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">L</span></span></td>\
						<td id="upWord3Tr'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">:</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">"</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">?</span></span></td>\
						<td><span class="keyboard_key enter"><span class="keyboard_key-m"><img src="'+commonUrl+'/image/keyboard/enter.png" alt="enter"/></span></span></td>\
					</tr>\
				</table>\
				<table class="keyboard_row">\
					<tr>\
						<td><span class="keyboard_key lshift"><span class="keyboard_key-m"><img src="'+commonUrl+'/image/keyboard/shift.png" alt="shift"/></span></span></td>\
						<td name="upWord4'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">Z</span></span></td>\
						<td name="upWord4'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">X</span></span></td>\
						<td name="upWord4'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">C</span></span></td>\
						<td name="upWord4'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">V</span></span></td>\
						<td name="upWord4'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">B</span></span></td>\
						<td name="upWord4'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">N</span></span></td>\
						<td name="upWord4'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m">M</span></span></td>\
						<td id="upWord4Tr'+rand+'"><span class="keyboard_key"><span class="keyboard_key-m"><</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">></span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">;</span></span></td>\
						<td><span class="keyboard_key"><span class="keyboard_key-m">—</span></span></td>\
						<td><span class="keyboard_key rshift"><span class="keyboard_key-m"><img src="'+commonUrl+'/image/keyboard/shift.png" alt="shift"/></span></span></td>\
					</tr>\
				</table>\
			</div>\
			<table class="keyboard_row">\
				<tr>\
					<td>\
						<div class="keyboard_lang" style="display:;">\
							<div class="keyboard_lang-i" style="display:none;">\
								<span class="b-dropdowna__switcher"></span>\
								<div class="keyboard_lang-selector">\
								</div>\
							</div>\
						</div>\
					</td>\
					<td><span class="keyboard_key space"><span class="keyboard_key-m"> </span></span></td>\
					<td><span class="keyboard_key determine" style="width:60px;">'+oksure+'</span></td>\
					<td><span class="keyboard_key marked alt" rel="alt" style="display:none;"><span class="keyboard_key-m">? ? { } ~</span></span></td>\
				</tr>\
			</table>\
			';

			var $this = jQuery(this);
			var $ico = jQuery('<span class="keyboard_ico keyboard_ico'+rand+'"></span>');
			var $keyboard = jQuery('<div class="key_board key_board'+rand+'"></div>');

			$keyboard.html(keyboard);

			$this.after($ico);
			$this.after($keyboard);

			var capsMode = false;
			var shiftMode = false;
			var altMode = false;

			$keyboard.find('.keyboard_type').hide();
			$keyboard.find('.keyboard_norm'+'.'+options.lang).show();

			$keyboard.find('.b-dropdowna__switcher').html($keyboard.find('.b-menu__item[rel='+options.lang+']').html());

			$keyboard.mousedown(function(){
				return false;
			});

			$keyboard.on('mousedown', '.keyboard_key:not(.disabled)', function(){
				jQuery(this).addClass('pressed');

				if(jQuery(this).hasClass('backspace')){
					$this.val($this.val().substring(0, $this.val().length - 1));

				}else if(jQuery(this).hasClass('rshift') || jQuery(this).hasClass('lshift')){
					$keyboard.find('.keyboard_type').hide();
					if(capsMode){
						$keyboard.find('.rshift, .lshift, .capslock').removeClass('suppressed');
						capsMode = false;
						shiftMode = false;
						$keyboard.find('.keyboard_norm'+'.'+options.lang).show();
					}else{
						$keyboard.find('.rshift, .lshift').addClass('suppressed');
						capsMode = true;
						shiftMode = true;
						$keyboard.find('.keyboard_key[rel]').removeClass('suppressed');
						altMode = false;
						$keyboard.find('.keyboard_caps'+'.'+options.lang).show();
					}

				}else if(jQuery(this).hasClass('capslock')){
					$keyboard.find('.keyboard_type').hide();
					if(capsMode){
						$keyboard.find('.rshift, .lshift, .capslock').removeClass('suppressed');
						capsMode = false;
						shiftMode = false;
						$keyboard.find('.keyboard_norm'+'.'+options.lang).show();
					}else{
						$keyboard.find('.capslock').addClass('suppressed');
						capsMode = true;
						$keyboard.find('.keyboard_key[rel]').removeClass('suppressed');
						altMode = false;
						$keyboard.find('.keyboard_caps'+'.'+options.lang).show();
					}

				}else if(jQuery(this).hasClass('enter')){
					$this.closest('form').submit();

				}else if(jQuery(this).hasClass('marked')){
					$keyboard.find('.keyboard_type').hide();
					if(altMode ==jQuery(this).attr('rel')){
						$keyboard.find('.keyboard_key[rel]').removeClass('suppressed');
						altMode = false;
						$keyboard.find('.keyboard_norm'+'.'+options.lang).show();
					}else{
						$keyboard.find('.keyboard_key[rel]').removeClass('suppressed');
						$keyboard.find('.keyboard_key[rel='+jQuery(this).attr('rel')+']').addClass('suppressed');
						altMode = jQuery(this).attr('rel');

						$keyboard.find('.capslock').removeClass('suppressed');
						capsMode = false;
						$keyboard.find('.keyboard_type[rel='+$(this).attr('rel')+']').show();
					}

				}else{
					$this.val($this.val()+jQuery(this).find('.keyboard_key-m').text());
				}
				return false;
			});

			$keyboard.on('mouseup', '.keyboard_key', function(){
				$keyboard.find('.keyboard_key').removeClass('pressed');
				$this.focus();

				if(shiftMode && !jQuery(this).hasClass('rshift') && !jQuery(this).hasClass('lshift') && !altMode){
					$keyboard.find('.keyboard_type').hide();
					$keyboard.find('.rshift, .lshift, .capslock').removeClass('suppressed');
					capsMode = false;
					shiftMode = false;
					$keyboard.find('.keyboard_norm'+'.'+options.lang).show();
				}
			});

			$keyboard.on('click', '.b-dropdowna__switcher', function(e){
				e.stopPropagation();
				$keyboard.find('.keyboard_lang-selector').fadeIn(100);
			});

			$ico.click(function(){
				//小写数字
				randomNum('downNum'+rand,'downNumTr'+rand);
				//小写字母第一行
				randomNum('downWord1'+rand,'downWord1Tr'+rand);
				//小写字母第二行
				randomNum('downWord2'+rand,'downWord2Tr'+rand);
				//小写字母第三行
				randomNum('downWord3'+rand,'downWord3Tr'+rand);
				//大写数字
				randomNum('upWord1'+rand,'upWord1Tr'+rand);
				//大写字母第一行
				randomNum('upWord2'+rand,'upWord2Tr'+rand);
				//大写字母第二行
				randomNum('upWord3'+rand,'upWord3Tr'+rand);
				//大写字母第三行
				randomNum('upWord4'+rand,'upWord4Tr'+rand);

				$keyboard.fadeToggle(0);
				$ico.toggleClass('active');
			});

			$keyboard.find('.keyboard_close').click(function(){
				$keyboard.fadeOut(0);
				$ico.removeClass('active');
			});

			$keyboard.find('.determine').click(function(){
				$keyboard.fadeOut(0);
				$ico.removeClass('active');
			});

			$keyboard.on('click', '.b-menu__item', function(){
				options.lang = $(this).attr('rel');

				capsMode = false;
				shiftMode = false;
				altMode = false;
				$keyboard.find('.rshift, .lshift, .capslock, .alt').removeClass('suppressed');

				$keyboard.find('.keyboard_type').hide();
				$keyboard.find('.keyboard_norm'+'.'+options.lang).show();

				$keyboard.find('.b-dropdowna__switcher').html($(this).html());
				$keyboard.find('.keyboard_lang-selector').hide();
			});

			function randomNum(name,tr){
				var arr = jQuery("td[name="+name+"]").toArray();
				var len = arr.length;
				var rands = parseInt(Math.random()*(len));
				jQuery('td[name='+name+']').each(function(i){
					jQuery('td[name='+name+']').eq(rands).insertBefore(jQuery('#'+tr));
					 rands = parseInt(Math.random()*(len));
				});
			}

		};
		return this.each(make);
	};
	})(jQuery);
//socket.io 1.4.0
!function(M){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=M();else if("function"==typeof define&&define.amd)define([],M);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self);f.io=M()}}(function(){return function f(k,g,b){function c(d,e){if(!g[d]){if(!k[d]){var l="function"==typeof require&&require;if(!e&&l)return l(d,!0);if(a)return a(d,!0);throw Error("Cannot find module '"+d+"'");}l=g[d]={exports:{}};k[d][0].call(l.exports,
    function(a){var b=k[d][1][a];return c(b?b:a)},l,l.exports,f,k,g,b)}return g[d].exports}for(var a="function"==typeof require&&require,e=0;e<b.length;e++)c(b[e]);return c}({1:[function(f,k,g){function b(a,b){"object"==typeof a&&(b=a,a=void 0);b=b||{};var g=c(a),m=g.source,h=g.id,t=g.path,t=q[h]&&t in q[h].nsps;b.forceNew||b["force new connection"]||!1===b.multiplex||t?(d("ignoring socket cache for %s",m),m=e(m,b)):(q[h]||(d("new io instance for %s",m),q[h]=e(m,b)),m=q[h]);return m.socket(g.path)}var c=
    f("./url"),a=f("socket.io-parser"),e=f("./manager"),d=f("debug")("socket.io-client");k.exports=g=b;var q=g.managers={};g.protocol=a.protocol;g.connect=b;g.Manager=f("./manager");g.Socket=f("./socket")},{"./manager":2,"./socket":4,"./url":5,debug:14,"socket.io-parser":41}],2:[function(f,k,g){function b(h,a){if(!(this instanceof b))return new b(h,a);h&&"object"==typeof h&&(a=h,h=void 0);a=a||{};a.path=a.path||"/socket.io";this.nsps={};this.subs=[];this.opts=a;this.reconnection(!1!==a.reconnection);
    this.reconnectionAttempts(a.reconnectionAttempts||Infinity);this.reconnectionDelay(a.reconnectionDelay||1E3);this.reconnectionDelayMax(a.reconnectionDelayMax||5E3);this.randomizationFactor(a.randomizationFactor||.5);this.backoff=new r({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()});this.timeout(null==a.timeout?2E4:a.timeout);this.readyState="closed";this.uri=h;this.connecting=[];this.lastPing=null;this.encoding=!1;this.packetBuffer=[];this.encoder=
        new e.Encoder;this.decoder=new e.Decoder;(this.autoConnect=!1!==a.autoConnect)&&this.open()}var c=f("engine.io-client"),a=f("./socket");g=f("component-emitter");var e=f("socket.io-parser"),d=f("./on"),q=f("component-bind"),l=f("debug")("socket.io-client:manager"),p=f("indexof"),r=f("backo2"),m=Object.prototype.hasOwnProperty;k.exports=b;b.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var h in this.nsps)m.call(this.nsps,h)&&this.nsps[h].emit.apply(this.nsps[h],arguments)};b.prototype.updateSocketIds=
    function(){for(var h in this.nsps)m.call(this.nsps,h)&&(this.nsps[h].id=this.engine.id)};g(b.prototype);b.prototype.reconnection=function(h){if(!arguments.length)return this._reconnection;this._reconnection=!!h;return this};b.prototype.reconnectionAttempts=function(h){if(!arguments.length)return this._reconnectionAttempts;this._reconnectionAttempts=h;return this};b.prototype.reconnectionDelay=function(h){if(!arguments.length)return this._reconnectionDelay;this._reconnectionDelay=h;this.backoff&&this.backoff.setMin(h);
    return this};b.prototype.randomizationFactor=function(h){if(!arguments.length)return this._randomizationFactor;this._randomizationFactor=h;this.backoff&&this.backoff.setJitter(h);return this};b.prototype.reconnectionDelayMax=function(h){if(!arguments.length)return this._reconnectionDelayMax;this._reconnectionDelayMax=h;this.backoff&&this.backoff.setMax(h);return this};b.prototype.timeout=function(h){if(!arguments.length)return this._timeout;this._timeout=h;return this};b.prototype.maybeReconnectOnOpen=
    function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()};b.prototype.open=b.prototype.connect=function(h){l("readyState %s",this.readyState);if(~this.readyState.indexOf("open"))return this;l("opening %s",this.uri);var a=this.engine=c(this.uri,this.opts),b=this;this.readyState="opening";this.skipReconnect=!1;var e=d(a,"open",function(){b.onopen();h&&h()}),m=d(a,"error",function(a){l("connect_error");b.cleanup();b.readyState="closed";b.emitAll("connect_error",
    a);if(h){var c=Error("Connection error");c.data=a;h(c)}else b.maybeReconnectOnOpen()});if(!1!==this._timeout){var g=this._timeout;l("connect attempt will timeout after %d",g);var q=setTimeout(function(){l("connect attempt timed out after %d",g);e.destroy();a.close();a.emit("error","timeout");b.emitAll("connect_timeout",g)},g);this.subs.push({destroy:function(){clearTimeout(q)}})}this.subs.push(e);this.subs.push(m);return this};b.prototype.onopen=function(){l("open");this.cleanup();this.readyState=
    "open";this.emit("open");var h=this.engine;this.subs.push(d(h,"data",q(this,"ondata")));this.subs.push(d(h,"ping",q(this,"onping")));this.subs.push(d(h,"pong",q(this,"onpong")));this.subs.push(d(h,"error",q(this,"onerror")));this.subs.push(d(h,"close",q(this,"onclose")));this.subs.push(d(this.decoder,"decoded",q(this,"ondecoded")))};b.prototype.onping=function(){this.lastPing=new Date;this.emitAll("ping")};b.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)};b.prototype.ondata=
    function(h){this.decoder.add(h)};b.prototype.ondecoded=function(h){this.emit("packet",h)};b.prototype.onerror=function(h){l("error",h);this.emitAll("error",h)};b.prototype.socket=function(h){function b(){~p(d.connecting,c)||d.connecting.push(c)}var c=this.nsps[h];if(!c){c=new a(this,h);this.nsps[h]=c;var d=this;c.on("connecting",b);c.on("connect",function(){c.id=d.engine.id});this.autoConnect&&b()}return c};b.prototype.destroy=function(h){h=p(this.connecting,h);~h&&this.connecting.splice(h,1);this.connecting.length||
this.close()};b.prototype.packet=function(h){l("writing packet %j",h);var a=this;a.encoding?a.packetBuffer.push(h):(a.encoding=!0,this.encoder.encode(h,function(c){for(var b=0;b<c.length;b++)a.engine.write(c[b],h.options);a.encoding=!1;a.processPacketQueue()}))};b.prototype.processPacketQueue=function(){if(0<this.packetBuffer.length&&!this.encoding){var h=this.packetBuffer.shift();this.packet(h)}};b.prototype.cleanup=function(){l("cleanup");for(var h;h=this.subs.shift();)h.destroy();this.packetBuffer=
    [];this.encoding=!1;this.lastPing=null;this.decoder.destroy()};b.prototype.close=b.prototype.disconnect=function(){l("disconnect");this.skipReconnect=!0;this.reconnecting=!1;"opening"==this.readyState&&this.cleanup();this.backoff.reset();this.readyState="closed";this.engine&&this.engine.close()};b.prototype.onclose=function(h){l("onclose");this.cleanup();this.backoff.reset();this.readyState="closed";this.emit("close",h);this._reconnection&&!this.skipReconnect&&this.reconnect()};b.prototype.reconnect=
    function(){if(this.reconnecting||this.skipReconnect)return this;var h=this;if(this.backoff.attempts>=this._reconnectionAttempts)l("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var a=this.backoff.duration();l("will wait %dms before reconnect attempt",a);this.reconnecting=!0;var c=setTimeout(function(){h.skipReconnect||(l("attempting reconnect"),h.emitAll("reconnect_attempt",h.backoff.attempts),h.emitAll("reconnecting",h.backoff.attempts),h.skipReconnect||
    h.open(function(a){a?(l("reconnect attempt error"),h.reconnecting=!1,h.reconnect(),h.emitAll("reconnect_error",a.data)):(l("reconnect success"),h.onreconnect())}))},a);this.subs.push({destroy:function(){clearTimeout(c)}})}};b.prototype.onreconnect=function(){var h=this.backoff.attempts;this.reconnecting=!1;this.backoff.reset();this.updateSocketIds();this.emitAll("reconnect",h)}},{"./on":3,"./socket":4,backo2:8,"component-bind":11,"component-emitter":12,debug:14,"engine.io-client":16,indexof:33,"socket.io-parser":41}],
    3:[function(f,k,g){k.exports=function(b,c,a){b.on(c,a);return{destroy:function(){b.removeListener(c,a)}}}},{}],4:[function(f,k,g){function b(a,h){this.io=a;this.nsp=h;this.json=this;this.ids=0;this.acks={};this.receiveBuffer=[];this.sendBuffer=[];this.connected=!1;this.disconnected=!0;this.io.autoConnect&&this.open()}var c=f("socket.io-parser");g=f("component-emitter");var a=f("to-array"),e=f("./on"),d=f("component-bind"),q=f("debug")("socket.io-client:socket"),l=f("has-binary");k.exports=b;var p=
    {connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},r=g.prototype.emit;g(b.prototype);b.prototype.subEvents=function(){if(!this.subs){var a=this.io;this.subs=[e(a,"open",d(this,"onopen")),e(a,"packet",d(this,"onpacket")),e(a,"close",d(this,"onclose"))]}};b.prototype.open=b.prototype.connect=function(){if(this.connected)return this;this.subEvents();this.io.open();if("open"==
        this.io.readyState)this.onopen();this.emit("connecting");return this};b.prototype.send=function(){var c=a(arguments);c.unshift("message");this.emit.apply(this,c);return this};b.prototype.emit=function(b){if(p.hasOwnProperty(b))return r.apply(this,arguments),this;var h=a(arguments),d=c.EVENT;l(h)&&(d=c.BINARY_EVENT);d={type:d,data:h,options:{}};d.options.compress=!this.flags||!1!==this.flags.compress;"function"==typeof h[h.length-1]&&(q("emitting packet with ack id %d",this.ids),this.acks[this.ids]=
        h.pop(),d.id=this.ids++);this.connected?this.packet(d):this.sendBuffer.push(d);delete this.flags;return this};b.prototype.packet=function(a){a.nsp=this.nsp;this.io.packet(a)};b.prototype.onopen=function(){q("transport is open - connecting");"/"!=this.nsp&&this.packet({type:c.CONNECT})};b.prototype.onclose=function(a){q("close (%s)",a);this.connected=!1;this.disconnected=!0;delete this.id;this.emit("disconnect",a)};b.prototype.onpacket=function(a){if(a.nsp==this.nsp)switch(a.type){case c.CONNECT:this.onconnect();
        break;case c.EVENT:this.onevent(a);break;case c.BINARY_EVENT:this.onevent(a);break;case c.ACK:this.onack(a);break;case c.BINARY_ACK:this.onack(a);break;case c.DISCONNECT:this.ondisconnect();break;case c.ERROR:this.emit("error",a.data)}};b.prototype.onevent=function(a){var h=a.data||[];q("emitting event %j",h);null!=a.id&&(q("attaching ack callback to event"),h.push(this.ack(a.id)));this.connected?r.apply(this,h):this.receiveBuffer.push(h)};b.prototype.ack=function(b){var h=this,d=!1;return function(){if(!d){d=
        !0;var e=a(arguments);q("sending ack %j",e);var g=l(e)?c.BINARY_ACK:c.ACK;h.packet({type:g,id:b,data:e})}}};b.prototype.onack=function(a){var h=this.acks[a.id];"function"==typeof h?(q("calling ack %s with %j",a.id,a.data),h.apply(this,a.data),delete this.acks[a.id]):q("bad ack %s",a.id)};b.prototype.onconnect=function(){this.connected=!0;this.disconnected=!1;this.emit("connect");this.emitBuffered()};b.prototype.emitBuffered=function(){var a;for(a=0;a<this.receiveBuffer.length;a++)r.apply(this,this.receiveBuffer[a]);
        this.receiveBuffer=[];for(a=0;a<this.sendBuffer.length;a++)this.packet(this.sendBuffer[a]);this.sendBuffer=[]};b.prototype.ondisconnect=function(){q("server disconnect (%s)",this.nsp);this.destroy();this.onclose("io server disconnect")};b.prototype.destroy=function(){if(this.subs){for(var a=0;a<this.subs.length;a++)this.subs[a].destroy();this.subs=null}this.io.destroy(this)};b.prototype.close=b.prototype.disconnect=function(){this.connected&&(q("performing disconnect (%s)",this.nsp),this.packet({type:c.DISCONNECT}));
        this.destroy();if(this.connected)this.onclose("io client disconnect");return this};b.prototype.compress=function(a){this.flags=this.flags||{};this.flags.compress=a;return this}},{"./on":3,"component-bind":11,"component-emitter":12,debug:14,"has-binary":31,"socket.io-parser":41,"to-array":44}],5:[function(f,k,g){(function(b){var c=f("parseuri"),a=f("debug")("socket.io-client:url");k.exports=function(e,d){var g=e;d=d||b.location;null==e&&(e=d.protocol+"//"+d.host);"string"==typeof e&&("/"==e.charAt(0)&&
    (e="/"==e.charAt(1)?d.protocol+e:d.host+e),/^(https?|wss?):\/\//.test(e)||(a("protocol-less url %s",e),e="undefined"!=typeof d?d.protocol+"//"+e:"https://"+e),a("parse %s",e),g=c(e));g.port||(/^(http|ws)$/.test(g.protocol)?g.port="80":/^(http|ws)s$/.test(g.protocol)&&(g.port="443"));g.path=g.path||"/";var f=-1!==g.host.indexOf(":")?"["+g.host+"]":g.host;g.id=g.protocol+"://"+f+":"+g.port;g.href=g.protocol+"://"+f+(d&&d.port==g.port?"":":"+g.port);return g}}).call(this,"undefined"!==typeof self?self:
            "undefined"!==typeof window?window:{})},{debug:14,parseuri:39}],6:[function(f,k,g){function b(){}k.exports=function(c,a,e){function d(c,b){if(0>=d.count)throw Error("after called too many times");--d.count;c?(g=!0,a(c),a=e):0!==d.count||g||a(null,b)}var g=!1;e=e||b;d.count=c;return 0===c?a():d}},{}],7:[function(f,k,g){k.exports=function(b,c,a){var e=b.byteLength;c=c||0;a=a||e;if(b.slice)return b.slice(c,a);0>c&&(c+=e);0>a&&(a+=e);a>e&&(a=e);if(c>=e||c>=a||0===e)return new ArrayBuffer(0);b=new Uint8Array(b);
        for(var e=new Uint8Array(a-c),d=0;c<a;c++,d++)e[d]=b[c];return e.buffer}},{}],8:[function(f,k,g){function b(c){c=c||{};this.ms=c.min||100;this.max=c.max||1E4;this.factor=c.factor||2;this.jitter=0<c.jitter&&1>=c.jitter?c.jitter:0;this.attempts=0}k.exports=b;b.prototype.duration=function(){var c=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter)var a=Math.random(),b=Math.floor(a*this.jitter*c),c=0==(Math.floor(10*a)&1)?c-b:c+b;return Math.min(c,this.max)|0};b.prototype.reset=function(){this.attempts=
        0};b.prototype.setMin=function(c){this.ms=c};b.prototype.setMax=function(c){this.max=c};b.prototype.setJitter=function(c){this.jitter=c}},{}],9:[function(f,k,g){(function(b){g.encode=function(c){c=new Uint8Array(c);var a,e=c.buffer.byteLength,d="";for(a=0;a<e;a+=3)d+=b[c.buffer[a]>>2],d+=b[(c.buffer[a]&3)<<4|c.buffer[a+1]>>4],d+=b[(c.buffer[a+1]&15)<<2|c.buffer[a+2]>>6],d+=b[c.buffer[a+2]&63];2===e%3?d=d.substring(0,d.length-1)+"=":1===e%3&&(d=d.substring(0,d.length-2)+"==");return d};g.decode=function(c){var a=
        .75*c.length,e=c.length,d=0,g,f,p,r;"="===c[c.length-1]&&(a--,"="===c[c.length-2]&&a--);for(var m=new ArrayBuffer(a),h=new Uint8Array(m),a=0;a<e;a+=4)g=b.indexOf(c[a]),f=b.indexOf(c[a+1]),p=b.indexOf(c[a+2]),r=b.indexOf(c[a+3]),h[d++]=g<<2|f>>4,h[d++]=(f&15)<<4|p>>2,h[d++]=(p&3)<<6|r&63;return m}})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},{}],10:[function(f,k,g){(function(b){function c(a){for(var c=0;c<a.length;c++){var h=a[c];if(h.buffer instanceof ArrayBuffer){var b=
        h.buffer;if(h.byteLength!==b.byteLength){var d=new Uint8Array(h.byteLength);d.set(new Uint8Array(b,h.byteOffset,h.byteLength));b=d.buffer}a[c]=b}}}function a(a,b){b=b||{};var h=new d;c(a);for(var e=0;e<a.length;e++)h.append(a[e]);return b.type?h.getBlob(b.type):h.getBlob()}function e(a,b){c(a);return new Blob(a,b||{})}var d=b.BlobBuilder||b.WebKitBlobBuilder||b.MSBlobBuilder||b.MozBlobBuilder,g;try{g=2===(new Blob(["hi"])).size}catch(f){g=!1}var l;if(l=g)try{l=2===(new Blob([new Uint8Array([1,2])])).size}catch(f){l=
        !1}var p=d&&d.prototype.append&&d.prototype.getBlob;b=g?l?b.Blob:e:p?a:void 0;k.exports=b}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{}],11:[function(f,k,g){var b=[].slice;k.exports=function(c,a){"string"==typeof a&&(a=c[a]);if("function"!=typeof a)throw Error("bind() requires a function");var e=b.call(arguments,2);return function(){return a.apply(c,e.concat(b.call(arguments)))}}},{}],12:[function(f,k,g){function b(c){if(c){for(var a in b.prototype)c[a]=b.prototype[a];
        return c}}k.exports=b;b.prototype.on=b.prototype.addEventListener=function(b,a){this._callbacks=this._callbacks||{};(this._callbacks["$"+b]=this._callbacks["$"+b]||[]).push(a);return this};b.prototype.once=function(b,a){function e(){this.off(b,e);a.apply(this,arguments)}e.fn=a;this.on(b,e);return this};b.prototype.off=b.prototype.removeListener=b.prototype.removeAllListeners=b.prototype.removeEventListener=function(b,a){this._callbacks=this._callbacks||{};if(0==arguments.length)return this._callbacks=
    {},this;var e=this._callbacks["$"+b];if(!e)return this;if(1==arguments.length)return delete this._callbacks["$"+b],this;for(var d,g=0;g<e.length;g++)if(d=e[g],d===a||d.fn===a){e.splice(g,1);break}return this};b.prototype.emit=function(b){this._callbacks=this._callbacks||{};var a=[].slice.call(arguments,1),e=this._callbacks["$"+b];if(e)for(var e=e.slice(0),d=0,g=e.length;d<g;++d)e[d].apply(this,a);return this};b.prototype.listeners=function(b){this._callbacks=this._callbacks||{};return this._callbacks["$"+
        b]||[]};b.prototype.hasListeners=function(b){return!!this.listeners(b).length}},{}],13:[function(f,k,g){k.exports=function(b,c){var a=function(){};a.prototype=c.prototype;b.prototype=new a;b.prototype.constructor=b}},{}],14:[function(f,k,g){function b(){var a;try{a=g.storage.debug}catch(b){}return a}g=k.exports=f("./debug");g.log=function(){return"object"===typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)};g.formatArgs=function(){var a=arguments,b=this.useColors;
        a[0]=(b?"%c":"")+this.namespace+(b?" %c":" ")+a[0]+(b?"%c ":" ")+"+"+g.humanize(this.diff);if(!b)return a;var b="color: "+this.color,a=[a[0],b,"color: inherit"].concat(Array.prototype.slice.call(a,1)),c=0,f=0;a[0].replace(/%[a-z%]/g,function(a){"%%"!==a&&(c++,"%c"===a&&(f=c))});a.splice(f,0,b);return a};g.save=function(a){try{null==a?g.storage.removeItem("debug"):g.storage.debug=a}catch(b){}};g.load=b;g.useColors=function(){return"WebkitAppearance"in document.documentElement.style||window.console&&
        (console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&31<=parseInt(RegExp.$1,10)};var c;if("undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage)c=chrome.storage.local;else a:{try{c=window.localStorage;break a}catch(a){}c=void 0}g.storage=c;g.colors="lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson".split(" ");g.formatters.j=function(a){return JSON.stringify(a)};g.enable(b())},{"./debug":15}],15:[function(f,k,g){g=
        k.exports=function(a){function e(){}function d(){var a=+new Date;d.diff=a-(c||a);d.prev=c;c=d.curr=a;null==d.useColors&&(d.useColors=g.useColors());null==d.color&&d.useColors&&(d.color=g.colors[b++%g.colors.length]);var e=Array.prototype.slice.call(arguments);e[0]=g.coerce(e[0]);"string"!==typeof e[0]&&(e=["%o"].concat(e));var f=0;e[0]=e[0].replace(/%([a-z%])/g,function(a,h){if("%%"===a)return a;f++;var b=g.formatters[h];"function"===typeof b&&(a=b.call(d,e[f]),e.splice(f,1),f--);return a});"function"===
        typeof g.formatArgs&&(e=g.formatArgs.apply(d,e));(d.log||g.log||console.log.bind(console)).apply(d,e)}e.enabled=!1;d.enabled=!0;var f=g.enabled(a)?d:e;f.namespace=a;return f};g.coerce=function(a){return a instanceof Error?a.stack||a.message:a};g.disable=function(){g.enable("")};g.enable=function(a){g.save(a);for(var b=(a||"").split(/[\s,]+/),c=b.length,f=0;f<c;f++)b[f]&&(a=b[f].replace(/\*/g,".*?"),"-"===a[0]?g.skips.push(new RegExp("^"+a.substr(1)+"$")):g.names.push(new RegExp("^"+a+"$")))};g.enabled=
        function(a){var b,c;b=0;for(c=g.skips.length;b<c;b++)if(g.skips[b].test(a))return!1;b=0;for(c=g.names.length;b<c;b++)if(g.names[b].test(a))return!0;return!1};g.humanize=f("ms");g.names=[];g.skips=[];g.formatters={};var b=0,c},{ms:36}],16:[function(f,k,g){k.exports=f("./lib/")},{"./lib/":17}],17:[function(f,k,g){k.exports=f("./socket");k.exports.parser=f("engine.io-parser")},{"./socket":18,"engine.io-parser":27}],18:[function(f,k,g){(function(b){function c(a,d){if(!(this instanceof c))return new c(a,
        d);d=d||{};a&&"object"==typeof a&&(d=a,a=null);a?(a=p(a),d.hostname=a.host,d.secure="https"==a.protocol||"wss"==a.protocol,d.port=a.port,a.query&&(d.query=a.query)):d.host&&(d.hostname=p(d.host).host);this.secure=null!=d.secure?d.secure:b.location&&"https:"==location.protocol;d.hostname&&!d.port&&(d.port=this.secure?"443":"80");this.agent=d.agent||!1;this.hostname=d.hostname||(b.location?location.hostname:"localhost");this.port=d.port||(b.location&&location.port?location.port:this.secure?443:80);
        this.query=d.query||{};"string"==typeof this.query&&(this.query=m.decode(this.query));this.upgrade=!1!==d.upgrade;this.path=(d.path||"/engine.io").replace(/\/$/,"")+"/";this.forceJSONP=!!d.forceJSONP;this.jsonp=!1!==d.jsonp;this.forceBase64=!!d.forceBase64;this.enablesXDR=!!d.enablesXDR;this.timestampParam=d.timestampParam||"t";this.timestampRequests=d.timestampRequests;this.transports=d.transports||["polling","websocket"];this.readyState="";this.writeBuffer=[];this.policyPort=d.policyPort||843;this.rememberUpgrade=
            d.rememberUpgrade||!1;this.binaryType=null;this.onlyBinaryUpgrades=d.onlyBinaryUpgrades;this.perMessageDeflate=!1!==d.perMessageDeflate?d.perMessageDeflate||{}:!1;!0===this.perMessageDeflate&&(this.perMessageDeflate={});this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024);this.pfx=d.pfx||null;this.key=d.key||null;this.passphrase=d.passphrase||null;this.cert=d.cert||null;this.ca=d.ca||null;this.ciphers=d.ciphers||null;this.rejectUnauthorized=void 0===
        d.rejectUnauthorized?null:d.rejectUnauthorized;var e="object"==typeof b&&b;e.global===e&&d.extraHeaders&&0<Object.keys(d.extraHeaders).length&&(this.extraHeaders=d.extraHeaders);this.open()}var a=f("./transports"),e=f("component-emitter"),d=f("debug")("engine.io-client:socket"),g=f("indexof"),l=f("engine.io-parser"),p=f("parseuri"),r=f("parsejson"),m=f("parseqs");k.exports=c;c.priorWebsocketSuccess=!1;e(c.prototype);c.protocol=l.protocol;c.Socket=c;c.Transport=f("./transport");c.transports=f("./transports");
        c.parser=f("engine.io-parser");c.prototype.createTransport=function(h){d('creating transport "%s"',h);var b=this.query,c={},e;for(e in b)b.hasOwnProperty(e)&&(c[e]=b[e]);c.EIO=l.protocol;c.transport=h;this.id&&(c.sid=this.id);return new a[h]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:c,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,
            policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized,perMessageDeflate:this.perMessageDeflate,extraHeaders:this.extraHeaders})};c.prototype.open=function(){var a;if(this.rememberUpgrade&&c.priorWebsocketSuccess&&-1!=this.transports.indexOf("websocket"))a="websocket";else{if(0===this.transports.length){var b=this;setTimeout(function(){b.emit("error","No transports available")},
            0);return}a=this.transports[0]}this.readyState="opening";try{a=this.createTransport(a)}catch(d){this.transports.shift();this.open();return}a.open();this.setTransport(a)};c.prototype.setTransport=function(a){d("setting transport %s",a.name);var b=this;this.transport&&(d("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners());this.transport=a;a.on("drain",function(){b.onDrain()}).on("packet",function(a){b.onPacket(a)}).on("error",function(a){b.onError(a)}).on("close",
            function(){b.onClose("transport close")})};c.prototype.probe=function(a){function b(){if(k.onlyBinaryUpgrades){var e=!this.supportsBinary&&k.transport.supportsBinary;p=p||e}p||(d('probe transport "%s" opened',a),l.send([{type:"ping",data:"probe"}]),l.once("packet",function(b){p||("pong"==b.type&&"probe"==b.data?(d('probe transport "%s" pong',a),k.upgrading=!0,k.emit("upgrading",l),l&&(c.priorWebsocketSuccess="websocket"==l.name,d('pausing current transport "%s"',k.transport.name),k.transport.pause(function(){p||
        "closed"==k.readyState||(d("changing transport and sending upgrade packet"),q(),k.setTransport(l),l.send([{type:"upgrade"}]),k.emit("upgrade",l),l=null,k.upgrading=!1,k.flush())}))):(d('probe transport "%s" failed',a),b=Error("probe error"),b.transport=l.name,k.emit("upgradeError",b)))}))}function e(){p||(p=!0,q(),l.close(),l=null)}function g(b){var c=Error("probe error: "+b);c.transport=l.name;e();d('probe transport "%s" failed because of error: %s',a,b);k.emit("upgradeError",c)}function f(){g("transport closed")}
            function m(){g("socket closed")}function z(a){l&&a.name!=l.name&&(d('"%s" works - aborting "%s"',a.name,l.name),e())}function q(){l.removeListener("open",b);l.removeListener("error",g);l.removeListener("close",f);k.removeListener("close",m);k.removeListener("upgrading",z)}d('probing transport "%s"',a);var l=this.createTransport(a,{probe:1}),p=!1,k=this;c.priorWebsocketSuccess=!1;l.once("open",b);l.once("error",g);l.once("close",f);this.once("close",m);this.once("upgrading",z);l.open()};c.prototype.onOpen=
            function(){d("socket open");this.readyState="open";c.priorWebsocketSuccess="websocket"==this.transport.name;this.emit("open");this.flush();if("open"==this.readyState&&this.upgrade&&this.transport.pause){d("starting upgrade probes");for(var a=0,b=this.upgrades.length;a<b;a++)this.probe(this.upgrades[a])}};c.prototype.onPacket=function(a){if("opening"==this.readyState||"open"==this.readyState)switch(d('socket receive: type "%s", data "%s"',a.type,a.data),this.emit("packet",a),this.emit("heartbeat"),
            a.type){case "open":this.onHandshake(r(a.data));break;case "pong":this.setPing();this.emit("pong");break;case "error":var b=Error("server error");b.code=a.data;this.onError(b);break;case "message":this.emit("data",a.data),this.emit("message",a.data)}else d('packet received with socket readyState "%s"',this.readyState)};c.prototype.onHandshake=function(a){this.emit("handshake",a);this.id=a.sid;this.transport.query.sid=a.sid;this.upgrades=this.filterUpgrades(a.upgrades);this.pingInterval=a.pingInterval;
            this.pingTimeout=a.pingTimeout;this.onOpen();"closed"!=this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))};c.prototype.onHeartbeat=function(a){clearTimeout(this.pingTimeoutTimer);var b=this;b.pingTimeoutTimer=setTimeout(function(){if("closed"!=b.readyState)b.onClose("ping timeout")},a||b.pingInterval+b.pingTimeout)};c.prototype.setPing=function(){var a=this;clearTimeout(a.pingIntervalTimer);a.pingIntervalTimer=setTimeout(function(){d("writing ping packet - expecting pong within %sms",
            a.pingTimeout);a.ping();a.onHeartbeat(a.pingTimeout)},a.pingInterval)};c.prototype.ping=function(){var a=this;this.sendPacket("ping",function(){a.emit("ping")})};c.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen);this.prevBufferLen=0;0===this.writeBuffer.length?this.emit("drain"):this.flush()};c.prototype.flush=function(){"closed"!=this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(d("flushing %d packets in socket",this.writeBuffer.length),
            this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))};c.prototype.write=c.prototype.send=function(a,b,c){this.sendPacket("message",a,b,c);return this};c.prototype.sendPacket=function(a,b,c,d){"function"==typeof b&&(d=b,b=void 0);"function"==typeof c&&(d=c,c=null);if("closing"!=this.readyState&&"closed"!=this.readyState){c=c||{};c.compress=!1!==c.compress;a={type:a,data:b,options:c};this.emit("packetCreate",a);this.writeBuffer.push(a);if(d)this.once("flush",
            d);this.flush()}};c.prototype.close=function(){function a(){e.onClose("forced close");d("socket closing - telling transport to close");e.transport.close()}function b(){e.removeListener("upgrade",b);e.removeListener("upgradeError",b);a()}function c(){e.once("upgrade",b);e.once("upgradeError",b)}if("opening"==this.readyState||"open"==this.readyState){this.readyState="closing";var e=this;if(this.writeBuffer.length)this.once("drain",function(){this.upgrading?c():a()});else this.upgrading?c():a()}return this};
        c.prototype.onError=function(a){d("socket error %j",a);c.priorWebsocketSuccess=!1;this.emit("error",a);this.onClose("transport error",a)};c.prototype.onClose=function(a,b){if("opening"==this.readyState||"open"==this.readyState||"closing"==this.readyState)d('socket close with reason: "%s"',a),clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=
            null,this.emit("close",a,b),this.writeBuffer=[],this.prevBufferLen=0};c.prototype.filterUpgrades=function(a){for(var b=[],c=0,d=a.length;c<d;c++)~g(this.transports,a[c])&&b.push(a[c]);return b}}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{"./transport":19,"./transports":20,"component-emitter":26,debug:14,"engine.io-parser":27,indexof:33,parsejson:37,parseqs:38,parseuri:39}],19:[function(f,k,g){function b(a){this.path=a.path;this.hostname=a.hostname;this.port=
        a.port;this.secure=a.secure;this.query=a.query;this.timestampParam=a.timestampParam;this.timestampRequests=a.timestampRequests;this.readyState="";this.agent=a.agent||!1;this.socket=a.socket;this.enablesXDR=a.enablesXDR;this.pfx=a.pfx;this.key=a.key;this.passphrase=a.passphrase;this.cert=a.cert;this.ca=a.ca;this.ciphers=a.ciphers;this.rejectUnauthorized=a.rejectUnauthorized;this.extraHeaders=a.extraHeaders}var c=f("engine.io-parser");f=f("component-emitter");k.exports=b;f(b.prototype);b.prototype.onError=
        function(a,b){var c=Error(a);c.type="TransportError";c.description=b;this.emit("error",c);return this};b.prototype.open=function(){if("closed"==this.readyState||""==this.readyState)this.readyState="opening",this.doOpen();return this};b.prototype.close=function(){if("opening"==this.readyState||"open"==this.readyState)this.doClose(),this.onClose();return this};b.prototype.send=function(a){if("open"==this.readyState)this.write(a);else throw Error("Transport not open");};b.prototype.onOpen=function(){this.readyState=
        "open";this.writable=!0;this.emit("open")};b.prototype.onData=function(a){a=c.decodePacket(a,this.socket.binaryType);this.onPacket(a)};b.prototype.onPacket=function(a){this.emit("packet",a)};b.prototype.onClose=function(){this.readyState="closed";this.emit("close")}},{"component-emitter":26,"engine.io-parser":27}],20:[function(f,k,g){(function(b){var c=f("xmlhttprequest-ssl"),a=f("./polling-xhr"),e=f("./polling-jsonp"),d=f("./websocket");g.polling=function(d){var g=!1,f=!1,k=!1!==d.jsonp;b.location&&
    (f="https:"==location.protocol,(g=location.port)||(g=f?443:80),g=d.hostname!=location.hostname||g!=d.port,f=d.secure!=f);d.xdomain=g;d.xscheme=f;if("open"in new c(d)&&!d.forceJSONP)return new a(d);if(!k)throw Error("JSONP disabled");return new e(d)};g.websocket=d}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{"./polling-jsonp":21,"./polling-xhr":22,"./websocket":24,"xmlhttprequest-ssl":25}],21:[function(f,k,g){(function(b){function c(){}function a(a){e.call(this,
        a);this.query=this.query||{};p||(b.___eio||(b.___eio=[]),p=b.___eio);this.index=p.length;var d=this;p.push(function(a){d.onData(a)});this.query.j=this.index;b.document&&b.addEventListener&&b.addEventListener("beforeunload",function(){d.script&&(d.script.onerror=c)},!1)}var e=f("./polling"),d=f("component-inherit");k.exports=a;var g=/\n/g,l=/\\n/g,p;d(a,e);a.prototype.supportsBinary=!1;a.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null);this.form&&
    (this.form.parentNode.removeChild(this.form),this.iframe=this.form=null);e.prototype.doClose.call(this)};a.prototype.doPoll=function(){var a=this,b=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null);b.async=!0;b.src=this.uri();b.onerror=function(b){a.onError("jsonp poll error",b)};var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c);this.script=b;"undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent)&&
    setTimeout(function(){var a=document.createElement("iframe");document.body.appendChild(a);document.body.removeChild(a)},100)};a.prototype.doWrite=function(a,b){function c(){d();b()}function d(){if(e.iframe)try{e.form.removeChild(e.iframe)}catch(a){e.onError("jsonp polling iframe removal error",a)}try{z=document.createElement('<iframe src="javascript:0" name="'+e.iframeId+'">')}catch(a){z=document.createElement("iframe"),z.name=e.iframeId,z.src="javascript:0"}z.id=e.iframeId;e.form.appendChild(z);
        e.iframe=z}var e=this;if(!this.form){var f=document.createElement("form"),k=document.createElement("textarea"),p=this.iframeId="eio_iframe_"+this.index,z;f.className="socketio";f.style.position="absolute";f.style.top="-1000px";f.style.left="-1000px";f.target=p;f.method="POST";f.setAttribute("accept-charset","utf-8");k.name="d";f.appendChild(k);document.body.appendChild(f);this.form=f;this.area=k}this.form.action=this.uri();d();a=a.replace(l,"\\\n");this.area.value=a.replace(g,"\\n");try{this.form.submit()}catch(S){}this.iframe.attachEvent?
        this.iframe.onreadystatechange=function(){"complete"==e.iframe.readyState&&c()}:this.iframe.onload=c}}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{"./polling":23,"component-inherit":13}],22:[function(f,k,g){(function(b){function c(){}function a(a){l.call(this,a);if(b.location){var c="https:"==location.protocol,d=location.port;d||(d=c?443:80);this.xd=a.hostname!=b.location.hostname||d!=a.port;this.xs=a.secure!=c}else this.extraHeaders=a.extraHeaders}function e(a){this.method=
        a.method||"GET";this.uri=a.uri;this.xd=!!a.xd;this.xs=!!a.xs;this.async=!1!==a.async;this.data=void 0!=a.data?a.data:null;this.agent=a.agent;this.isBinary=a.isBinary;this.supportsBinary=a.supportsBinary;this.enablesXDR=a.enablesXDR;this.pfx=a.pfx;this.key=a.key;this.passphrase=a.passphrase;this.cert=a.cert;this.ca=a.ca;this.ciphers=a.ciphers;this.rejectUnauthorized=a.rejectUnauthorized;this.extraHeaders=a.extraHeaders;this.create()}function d(){for(var a in e.requests)e.requests.hasOwnProperty(a)&&
    e.requests[a].abort()}var g=f("xmlhttprequest-ssl"),l=f("./polling"),p=f("component-emitter"),r=f("component-inherit"),m=f("debug")("engine.io-client:polling-xhr");k.exports=a;k.exports.Request=e;r(a,l);a.prototype.supportsBinary=!0;a.prototype.request=function(a){a=a||{};a.uri=this.uri();a.xd=this.xd;a.xs=this.xs;a.agent=this.agent||!1;a.supportsBinary=this.supportsBinary;a.enablesXDR=this.enablesXDR;a.pfx=this.pfx;a.key=this.key;a.passphrase=this.passphrase;a.cert=this.cert;a.ca=this.ca;a.ciphers=
        this.ciphers;a.rejectUnauthorized=this.rejectUnauthorized;a.extraHeaders=this.extraHeaders;return new e(a)};a.prototype.doWrite=function(a,b){var c=this.request({method:"POST",data:a,isBinary:"string"!==typeof a&&void 0!==a}),d=this;c.on("success",b);c.on("error",function(a){d.onError("xhr post error",a)});this.sendXhr=c};a.prototype.doPoll=function(){m("xhr poll");var a=this.request(),b=this;a.on("data",function(a){b.onData(a)});a.on("error",function(a){b.onError("xhr poll error",a)});this.pollXhr=
        a};p(e.prototype);e.prototype.create=function(){var a={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};a.pfx=this.pfx;a.key=this.key;a.passphrase=this.passphrase;a.cert=this.cert;a.ca=this.ca;a.ciphers=this.ciphers;a.rejectUnauthorized=this.rejectUnauthorized;var c=this.xhr=new g(a),d=this;try{m("xhr open %s: %s",this.method,this.uri);c.open(this.method,this.uri,this.async);try{if(this.extraHeaders){c.setDisableHeaderCheck(!0);for(var f in this.extraHeaders)this.extraHeaders.hasOwnProperty(f)&&
    c.setRequestHeader(f,this.extraHeaders[f])}}catch(l){}this.supportsBinary&&(c.responseType="arraybuffer");if("POST"==this.method)try{this.isBinary?c.setRequestHeader("Content-type","application/octet-stream"):c.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(l){}"withCredentials"in c&&(c.withCredentials=!0);this.hasXDR()?(c.onload=function(){d.onLoad()},c.onerror=function(){d.onError(c.responseText)}):c.onreadystatechange=function(){if(4==c.readyState)if(200==c.status||1223==c.status)d.onLoad();
    else setTimeout(function(){d.onError(c.status)},0)};m("xhr data %s",this.data);c.send(this.data)}catch(l){setTimeout(function(){d.onError(l)},0);return}b.document&&(this.index=e.requestsCount++,e.requests[this.index]=this)};e.prototype.onSuccess=function(){this.emit("success");this.cleanup()};e.prototype.onData=function(a){this.emit("data",a);this.onSuccess()};e.prototype.onError=function(a){this.emit("error",a);this.cleanup(!0)};e.prototype.cleanup=function(a){if("undefined"!=typeof this.xhr&&null!==
        this.xhr){this.hasXDR()?this.xhr.onload=this.xhr.onerror=c:this.xhr.onreadystatechange=c;if(a)try{this.xhr.abort()}catch(d){}b.document&&delete e.requests[this.index];this.xhr=null}};e.prototype.onLoad=function(){var a;try{var b;try{b=this.xhr.getResponseHeader("Content-Type").split(";")[0]}catch(c){}if("application/octet-stream"===b)a=this.xhr.response;else if(this.supportsBinary)try{a=String.fromCharCode.apply(null,new Uint8Array(this.xhr.response))}catch(c){var d=new Uint8Array(this.xhr.response);
        b=[];for(var e=0,g=d.length;e<g;e++)b.push(d[e]);a=String.fromCharCode.apply(null,b)}else a=this.xhr.responseText}catch(c){this.onError(c)}if(null!=a)this.onData(a)};e.prototype.hasXDR=function(){return"undefined"!==typeof b.XDomainRequest&&!this.xs&&this.enablesXDR};e.prototype.abort=function(){this.cleanup()};b.document&&(e.requestsCount=0,e.requests={},b.attachEvent?b.attachEvent("onunload",d):b.addEventListener&&b.addEventListener("beforeunload",d,!1))}).call(this,"undefined"!==typeof self?self:
            "undefined"!==typeof window?window:{})},{"./polling":23,"component-emitter":26,"component-inherit":13,debug:14,"xmlhttprequest-ssl":25}],23:[function(f,k,g){function b(a){var b=a&&a.forceBase64;if(!l||b)this.supportsBinary=!1;c.call(this,a)}var c=f("../transport"),a=f("parseqs"),e=f("engine.io-parser");g=f("component-inherit");var d=f("yeast"),q=f("debug")("engine.io-client:polling");k.exports=b;var l=null!=(new (f("xmlhttprequest-ssl"))({xdomain:!1})).responseType;g(b,c);b.prototype.name="polling";
        b.prototype.doOpen=function(){this.poll()};b.prototype.pause=function(a){function b(){q("paused");c.readyState="paused";a()}var c=this;this.readyState="pausing";if(this.polling||!this.writable){var d=0;this.polling&&(q("we are currently polling - waiting to pause"),d++,this.once("pollComplete",function(){q("pre-pause polling complete");--d||b()}));this.writable||(q("we are currently writing - waiting to pause"),d++,this.once("drain",function(){q("pre-pause writing complete");--d||b()}))}else b()};
        b.prototype.poll=function(){q("polling");this.polling=!0;this.doPoll();this.emit("poll")};b.prototype.onData=function(a){var b=this;q("polling got data %s",a);e.decodePayload(a,this.socket.binaryType,function(a,c,d){if("opening"==b.readyState)b.onOpen();if("close"==a.type)return b.onClose(),!1;b.onPacket(a)});"closed"!=this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"==this.readyState?this.poll():q('ignoring poll - transport state "%s"',this.readyState))};b.prototype.doClose=function(){function a(){q("writing close packet");
            b.write([{type:"close"}])}var b=this;"open"==this.readyState?(q("transport open - closing"),a()):(q("transport not open - deferring close"),this.once("open",a))};b.prototype.write=function(a){var b=this;this.writable=!1;var c=function(){b.writable=!0;b.emit("drain")},b=this;e.encodePayload(a,this.supportsBinary,function(a){b.doWrite(a,c)})};b.prototype.uri=function(){var b=this.query||{},c=this.secure?"https":"http",e="";!1!==this.timestampRequests&&(b[this.timestampParam]=d());this.supportsBinary||
        b.sid||(b.b64=1);b=a.encode(b);this.port&&("https"==c&&443!=this.port||"http"==c&&80!=this.port)&&(e=":"+this.port);b.length&&(b="?"+b);var g=-1!==this.hostname.indexOf(":");return c+"://"+(g?"["+this.hostname+"]":this.hostname)+e+this.path+b}},{"../transport":19,"component-inherit":13,debug:14,"engine.io-parser":27,parseqs:38,"xmlhttprequest-ssl":25,yeast:47}],24:[function(f,k,g){(function(b){function c(b){b&&b.forceBase64&&(this.supportsBinary=!1);this.perMessageDeflate=b.perMessageDeflate;a.call(this,
        b)}var a=f("../transport"),e=f("engine.io-parser"),d=f("parseqs"),g=f("component-inherit"),l=f("yeast"),p=f("debug")("engine.io-client:websocket"),r=f("ws");k.exports=c;g(c,a);c.prototype.name="websocket";c.prototype.supportsBinary=!0;c.prototype.doOpen=function(){if(this.check()){var a=this.uri(),b={agent:this.agent,perMessageDeflate:this.perMessageDeflate};b.pfx=this.pfx;b.key=this.key;b.passphrase=this.passphrase;b.cert=this.cert;b.ca=this.ca;b.ciphers=this.ciphers;b.rejectUnauthorized=this.rejectUnauthorized;
        this.extraHeaders&&(b.headers=this.extraHeaders);this.ws=new r(a,void 0,b);void 0===this.ws.binaryType?this.supportsBinary=!1:isBinary=!0;this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="buffer"):this.ws.binaryType="arraybuffer";this.addEventListeners()}};c.prototype.addEventListeners=function(){var a=this;this.ws.onopen=function(){a.onOpen()};this.ws.onclose=function(){a.onClose()};this.ws.onmessage=function(b){a.onData(b.data)};this.ws.onerror=function(b){a.onError("websocket error",
        b)}};"undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)&&(c.prototype.onData=function(b){var c=this;setTimeout(function(){a.prototype.onData.call(c,b)},0)});c.prototype.write=function(a){function c(){d.emit("flush");setTimeout(function(){d.writable=!0;d.emit("drain")},0)}var d=this;this.writable=!1;for(var g=b.WebSocket&&this.ws instanceof b.WebSocket,f=a.length,l=0,k=f;l<k;l++)(function(a){e.encodePacket(a,d.supportsBinary,function(e){if(!g){var l={};a.options&&(l.compress=
        a.options.compress);d.perMessageDeflate&&("string"==typeof e?b.Buffer.byteLength(e):e.length)<d.perMessageDeflate.threshold&&(l.compress=!1)}try{g?d.ws.send(e):d.ws.send(e,l)}catch(k){p("websocket closed before onclose event")}--f||c()})})(a[l])};c.prototype.onClose=function(){a.prototype.onClose.call(this)};c.prototype.doClose=function(){"undefined"!==typeof this.ws&&this.ws.close()};c.prototype.uri=function(){var a=this.query||{},b=this.secure?"wss":"ws",c="";this.port&&("wss"==b&&443!=this.port||
    "ws"==b&&80!=this.port)&&(c=":"+this.port);this.timestampRequests&&(a[this.timestampParam]=l());this.supportsBinary||(a.b64=1);a=d.encode(a);a.length&&(a="?"+a);var e=-1!==this.hostname.indexOf(":");return b+"://"+(e?"["+this.hostname+"]":this.hostname)+c+this.path+a};c.prototype.check=function(){return!!r&&!("__initialize"in r&&this.name===c.prototype.name)}}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{"../transport":19,"component-inherit":13,debug:14,"engine.io-parser":27,
        parseqs:38,ws:46,yeast:47}],25:[function(f,k,g){var b=f("has-cors");k.exports=function(c){var a=c.xdomain,e=c.xscheme;c=c.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!a||b))return new XMLHttpRequest}catch(d){}try{if("undefined"!=typeof XDomainRequest&&!e&&c)return new XDomainRequest}catch(d){}if(!a)try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(d){}}},{"has-cors":32}],26:[function(f,k,g){function b(c){if(c){for(var a in b.prototype)c[a]=b.prototype[a];return c}}k.exports=b;b.prototype.on=
        b.prototype.addEventListener=function(b,a){this._callbacks=this._callbacks||{};(this._callbacks[b]=this._callbacks[b]||[]).push(a);return this};b.prototype.once=function(b,a){function e(){d.off(b,e);a.apply(this,arguments)}var d=this;this._callbacks=this._callbacks||{};e.fn=a;this.on(b,e);return this};b.prototype.off=b.prototype.removeListener=b.prototype.removeAllListeners=b.prototype.removeEventListener=function(b,a){this._callbacks=this._callbacks||{};if(0==arguments.length)return this._callbacks=
    {},this;var e=this._callbacks[b];if(!e)return this;if(1==arguments.length)return delete this._callbacks[b],this;for(var d,g=0;g<e.length;g++)if(d=e[g],d===a||d.fn===a){e.splice(g,1);break}return this};b.prototype.emit=function(b){this._callbacks=this._callbacks||{};var a=[].slice.call(arguments,1),e=this._callbacks[b];if(e)for(var e=e.slice(0),d=0,g=e.length;d<g;++d)e[d].apply(this,a);return this};b.prototype.listeners=function(b){this._callbacks=this._callbacks||{};return this._callbacks[b]||[]};
        b.prototype.hasListeners=function(b){return!!this.listeners(b).length}},{}],27:[function(f,k,g){(function(b){function c(a,b,c){if(!b)return g.encodeBase64Packet(a,c);var d=new FileReader;d.onload=function(){a.data=d.result;g.encodePacket(a,b,!0,c)};return d.readAsArrayBuffer(a.data)}function a(a,b,c){var d=Array(a.length);c=p(a.length,c);for(var e=function(a,c,e){b(c,function(b,c){d[a]=c;e(b,d)})},g=0;g<a.length;g++)e(g,a[g],c)}var e=f("./keys"),d=f("has-binary"),k=f("arraybuffer.slice"),l=f("base64-arraybuffer"),
        p=f("after"),r=f("utf8"),m=navigator.userAgent.match(/Android/i),h=/PhantomJS/i.test(navigator.userAgent),t=m||h;g.protocol=3;var w=g.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},C=e(w),v={type:"error",data:"parser error"},D=f("blob");g.encodePacket=function(a,d,e,f){"function"==typeof d&&(f=d,d=!1);"function"==typeof e&&(f=e,e=null);var h=void 0===a.data?void 0:a.data.buffer||a.data;if(b.ArrayBuffer&&h instanceof ArrayBuffer){if(d){e=a.data;d=new Uint8Array(e);e=new Uint8Array(1+
        e.byteLength);e[0]=w[a.type];for(a=0;a<d.length;a++)e[a+1]=d[a];a=f(e.buffer)}else a=g.encodeBase64Packet(a,f);return a}if(D&&h instanceof b.Blob)return d?t?a=c(a,d,f):(d=new Uint8Array(1),d[0]=w[a.type],a=new D([d.buffer,a.data]),a=f(a)):a=g.encodeBase64Packet(a,f),a;if(h&&h.base64)return f("b"+g.packets[a.type]+a.data.data);d=w[a.type];void 0!==a.data&&(d+=e?r.encode(String(a.data)):String(a.data));return f(""+d)};g.encodeBase64Packet=function(a,d){var c="b"+g.packets[a.type];if(D&&a.data instanceof
        b.Blob){var e=new FileReader;e.onload=function(){var a=e.result.split(",")[1];d(c+a)};return e.readAsDataURL(a.data)}var f;try{f=String.fromCharCode.apply(null,new Uint8Array(a.data))}catch(h){f=new Uint8Array(a.data);for(var l=Array(f.length),k=0;k<f.length;k++)l[k]=f[k];f=String.fromCharCode.apply(null,l)}c+=b.btoa(f);return d(c)};g.decodePacket=function(a,b,c){if("string"==typeof a||void 0===a){if("b"==a.charAt(0))return g.decodeBase64Packet(a.substr(1),b);if(c)try{a=r.decode(a)}catch(d){return v}b=
        a.charAt(0);return Number(b)==b&&C[b]?1<a.length?{type:C[b],data:a.substring(1)}:{type:C[b]}:v}a=new Uint8Array(a);b=a[0];a=a.subarray(1);a=(new Zlib.RawInflate(a)).decompress();c='2["m","';for(var e="",f=0;f<a.byteLength;f++)e+=String.fromCharCode(a[f]);e=e.replace(/"/g,'\\"');return{type:C[b],data:c+e+'"]'}};g.decodeBase64Packet=function(a,c){var d=C[a.charAt(0)];if(!b.ArrayBuffer)return{type:d,data:{base64:!0,data:a.substr(1)}};var e=l.decode(a.substr(1));"blob"===c&&D&&(e=new D([e]));return{type:d,
        data:e}};g.encodePayload=function(b,c,e){"function"==typeof c&&(e=c,c=null);var f=d(b);if(c&&f)return D&&!t?g.encodePayloadAsBlob(b,e):g.encodePayloadAsArrayBuffer(b,e);if(!b.length)return e("0:");a(b,function(a,b){g.encodePacket(a,f?c:!1,!0,function(a){b(null,a.length+":"+a)})},function(a,b){return e(b.join(""))})};g.decodePayload=function(a,b,c){if("string"!=typeof a)return g.decodePayloadAsBinary(a,b,c);"function"===typeof b&&(c=b,b=null);var d;if(""==a)return c(v,0,1);d="";for(var e,f,h=0,l=a.length;h<
    l;h++)if(f=a.charAt(h),":"!=f)d+=f;else{if(""==d||d!=(e=Number(d)))return c(v,0,1);f=a.substr(h+1,e);if(d!=f.length)return c(v,0,1);if(f.length){d=g.decodePacket(f,b,!0);if(v.type==d.type&&v.data==d.data)return c(v,0,1);if(!1===c(d,h+e,l))return}h+=e;d=""}if(""!=d)return c(v,0,1)};g.encodePayloadAsArrayBuffer=function(b,c){if(!b.length)return c(new ArrayBuffer(0));a(b,function(a,b){g.encodePacket(a,!0,!0,function(a){return b(null,a)})},function(a,b){var d=b.reduce(function(a,b){var c;c="string"===
    typeof b?b.length:b.byteLength;return a+c.toString().length+c+2},0),e=new Uint8Array(d),g=0;b.forEach(function(a){var b="string"===typeof a,c=a;if(b){for(var c=new Uint8Array(a.length),d=0;d<a.length;d++)c[d]=a.charCodeAt(d);c=c.buffer}b?e[g++]=0:e[g++]=1;a=c.byteLength.toString();for(d=0;d<a.length;d++)e[g++]=parseInt(a[d]);e[g++]=255;c=new Uint8Array(c);for(d=0;d<c.length;d++)e[g++]=c[d]});return c(e.buffer)})};g.encodePayloadAsBlob=function(b,c){a(b,function(a,b){g.encodePacket(a,!0,!0,function(a){var c=
        new Uint8Array(1);c[0]=1;if("string"===typeof a){for(var d=new Uint8Array(a.length),e=0;e<a.length;e++)d[e]=a.charCodeAt(e);a=d.buffer;c[0]=0}for(var d=(a instanceof ArrayBuffer?a.byteLength:a.size).toString(),g=new Uint8Array(d.length+1),e=0;e<d.length;e++)g[e]=parseInt(d[e]);g[d.length]=255;D&&(a=new D([c.buffer,g.buffer,a]),b(null,a))})},function(a,b){return c(new D(b))})};g.decodePayloadAsBinary=function(a,b,c){"function"===typeof b&&(c=b,b=null);for(var d=[],e=!1;0<a.byteLength;){for(var f=new Uint8Array(a),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          h=0===f[0],l="",m=1;255!=f[m];m++){if(310<l.length){e=!0;break}l+=f[m]}if(e)return c(v,0,1);a=k(a,2+l.length);l=parseInt(l);f=k(a,0,l);if(h)try{f=String.fromCharCode.apply(null,new Uint8Array(f))}catch(p){for(h=new Uint8Array(f),f="",m=0;m<h.length;m++)f+=String.fromCharCode(h[m])}d.push(f);a=k(a,l)}var r=d.length;d.forEach(function(a,d){c(g.decodePacket(a,b,!0),d,r)})}}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{"./keys":28,after:6,"arraybuffer.slice":7,"base64-arraybuffer":9,
        blob:10,"has-binary":29,utf8:45}],28:[function(f,k,g){k.exports=Object.keys||function(b){var c=[],a=Object.prototype.hasOwnProperty,e;for(e in b)a.call(b,e)&&c.push(e);return c}},{}],29:[function(f,k,g){(function(b){var c=f("isarray");k.exports=function(a){function e(a){if(!a)return!1;if(b.Buffer&&b.Buffer.isBuffer(a)||b.ArrayBuffer&&a instanceof ArrayBuffer||b.Blob&&a instanceof Blob||b.File&&a instanceof File)return!0;if(c(a))for(var g=0;g<a.length;g++){if(e(a[g]))return!0}else if(a&&"object"==
        typeof a)for(g in a.toJSON&&(a=a.toJSON()),a)if(Object.prototype.hasOwnProperty.call(a,g)&&e(a[g]))return!0;return!1}return e(a)}}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{isarray:34}],30:[function(f,k,g){k.exports=function(){return this}()},{}],31:[function(f,k,g){(function(b){var c=f("isarray");k.exports=function(a){function e(a){if(!a)return!1;if(b.Buffer&&b.Buffer.isBuffer&&b.Buffer.isBuffer(a)||b.ArrayBuffer&&a instanceof ArrayBuffer||b.Blob&&a instanceof
        Blob||b.File&&a instanceof File)return!0;if(c(a))for(var g=0;g<a.length;g++){if(e(a[g]))return!0}else if(a&&"object"==typeof a)for(g in a.toJSON&&"function"==typeof a.toJSON&&(a=a.toJSON()),a)if(Object.prototype.hasOwnProperty.call(a,g)&&e(a[g]))return!0;return!1}return e(a)}}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{isarray:34}],32:[function(f,k,g){f=f("global");try{k.exports="XMLHttpRequest"in f&&"withCredentials"in new f.XMLHttpRequest}catch(b){k.exports=
        !1}},{global:30}],33:[function(f,k,g){var b=[].indexOf;k.exports=function(c,a){if(b)return c.indexOf(a);for(var e=0;e<c.length;++e)if(c[e]===a)return e;return-1}},{}],34:[function(f,k,g){k.exports=Array.isArray||function(b){return"[object Array]"==Object.prototype.toString.call(b)}},{}],35:[function(f,k,g){(function(b){(function(){function c(b,e){function g(a){if(g[a]!==A)return g[a];var b;if("bug-string-char-index"==a)b="a"!="a"[0];else if("json"==a)b=g("json-stringify")&&g("json-parse");else{var c;
        if("json-stringify"==a){b=e.stringify;var d="function"==typeof b&&B;if(d){(c=function(){return 1}).toJSON=c;try{d="0"===b(0)&&"0"===b(new f)&&'""'==b(new l)&&b(x)===A&&b(A)===A&&b()===A&&"1"===b(c)&&"[1]"==b([c])&&"[null]"==b([A])&&"null"==b(null)&&"[null,null,null]"==b([A,x,null])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==b({a:[c,!0,!1,null,"\x00\b\n\f\r\t"]})&&"1"===b(null,c)&&"[\n 1,\n 2\n]"==b([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==b(new m(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==
            b(new m(864E13))&&'"-000001-01-01T00:00:00.000Z"'==b(new m(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==b(new m(-1))}catch(h){d=!1}}b=d}if("json-parse"==a){b=e.parse;if("function"==typeof b)try{if(0===b("0")&&!b(!1)){c=b('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');var k=5==c.a.length&&1===c.a[0];if(k){try{k=!b('"\t"')}catch(h){}if(k)try{k=1!==b("01")}catch(h){}if(k)try{k=1!==b("1.")}catch(h){}}}}catch(h){k=!1}b=k}}return g[a]=!!b}b||(b=d.Object());e||(e=d.Object());var f=b.Number||d.Number,
        l=b.String||d.String,k=b.Object||d.Object,m=b.Date||d.Date,p=b.SyntaxError||d.SyntaxError,q=b.TypeError||d.TypeError,r=b.Math||d.Math,K=b.JSON||d.JSON;"object"==typeof K&&K&&(e.stringify=K.stringify,e.parse=K.parse);var k=k.prototype,x=k.toString,y,H,A,B=new m(-0xc782b5b800cec);try{B=-109252==B.getUTCFullYear()&&0===B.getUTCMonth()&&1===B.getUTCDate()&&10==B.getUTCHours()&&37==B.getUTCMinutes()&&6==B.getUTCSeconds()&&708==B.getUTCMilliseconds()}catch(X){}if(!g("json")){var I=g("bug-string-char-index");
        if(!B)var E=r.floor,T=[0,31,59,90,120,151,181,212,243,273,304,334],J=function(a,b){return T[b]+365*(a-1970)+E((a-1969+(b=+(1<b)))/4)-E((a-1901+b)/100)+E((a-1601+b)/400)};(y=k.hasOwnProperty)||(y=function(a){var b={},c;(b.__proto__=null,b.__proto__={toString:1},b).toString!=x?y=function(a){var b=this.__proto__;a=a in(this.__proto__=null,this);this.__proto__=b;return a}:(c=b.constructor,y=function(a){var b=(this.constructor||c).prototype;return a in this&&!(a in b&&this[a]===b[a])});b=null;return y.call(this,
            a)});H=function(b,c){var d=0,e,g,f;(e=function(){this.valueOf=0}).prototype.valueOf=0;g=new e;for(f in g)y.call(g,f)&&d++;e=g=null;d?H=2==d?function(a,b){var c={},d="[object Function]"==x.call(a),e;for(e in a)d&&"prototype"==e||y.call(c,e)||!(c[e]=1)||!y.call(a,e)||b(e)}:function(a,b){var c="[object Function]"==x.call(a),d,e;for(d in a)c&&"prototype"==d||!y.call(a,d)||(e="constructor"===d)||b(d);(e||y.call(a,d="constructor"))&&b(d)}:(g="valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "),
            H=function(b,c){var d="[object Function]"==x.call(b),e,f=!d&&"function"!=typeof b.constructor&&a[typeof b.hasOwnProperty]&&b.hasOwnProperty||y;for(e in b)d&&"prototype"==e||!f.call(b,e)||c(e);for(d=g.length;e=g[--d];f.call(b,e)&&c(e));});return H(b,c)};if(!g("json-stringify")){var U={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},F=function(a,b){return("000000"+(b||0)).slice(-a)},P=function(a){for(var b='"',c=0,d=a.length,e=!I||10<d,g=e&&(I?a.split(""):a);c<d;c++){var f=a.charCodeAt(c);
            switch(f){case 8:case 9:case 10:case 12:case 13:case 34:case 92:b+=U[f];break;default:if(32>f){b+="\\u00"+F(2,f.toString(16));break}b+=e?g[c]:a.charAt(c)}}return b+'"'},N=function(a,b,c,d,e,g,f){var h,l,k,m,p,r,n,v,t;try{h=b[a]}catch(S){}if("object"==typeof h&&h)if(l=x.call(h),"[object Date]"!=l||y.call(h,"toJSON"))"function"==typeof h.toJSON&&("[object Number]"!=l&&"[object String]"!=l&&"[object Array]"!=l||y.call(h,"toJSON"))&&(h=h.toJSON(a));else if(h>-1/0&&h<1/0){if(J){m=E(h/864E5);for(l=E(m/
                365.2425)+1970-1;J(l+1,0)<=m;l++);for(k=E((m-J(l,0))/30.42);J(l,k+1)<=m;k++);m=1+m-J(l,k);p=(h%864E5+864E5)%864E5;r=E(p/36E5)%24;n=E(p/6E4)%60;v=E(p/1E3)%60;p%=1E3}else l=h.getUTCFullYear(),k=h.getUTCMonth(),m=h.getUTCDate(),r=h.getUTCHours(),n=h.getUTCMinutes(),v=h.getUTCSeconds(),p=h.getUTCMilliseconds();h=(0>=l||1E4<=l?(0>l?"-":"+")+F(6,0>l?-l:l):F(4,l))+"-"+F(2,k+1)+"-"+F(2,m)+"T"+F(2,r)+":"+F(2,n)+":"+F(2,v)+"."+F(3,p)+"Z"}else h=null;c&&(h=c.call(b,a,h));if(null===h)return"null";l=x.call(h);
            if("[object Boolean]"==l)return""+h;if("[object Number]"==l)return h>-1/0&&h<1/0?""+h:"null";if("[object String]"==l)return P(""+h);if("object"==typeof h){for(a=f.length;a--;)if(f[a]===h)throw q();f.push(h);t=[];b=g;g+=e;if("[object Array]"==l){k=0;for(a=h.length;k<a;k++)l=N(k,h,c,d,e,g,f),t.push(l===A?"null":l);a=t.length?e?"[\n"+g+t.join(",\n"+g)+"\n"+b+"]":"["+t.join(",")+"]":"[]"}else H(d||h,function(a){var b=N(a,h,c,d,e,g,f);b!==A&&t.push(P(a)+":"+(e?" ":"")+b)}),a=t.length?e?"{\n"+g+t.join(",\n"+
                g)+"\n"+b+"}":"{"+t.join(",")+"}":"{}";f.pop();return a}};e.stringify=function(b,c,d){var e,g,f,h;if(a[typeof c]&&c)if("[object Function]"==(h=x.call(c)))g=c;else if("[object Array]"==h){f={};for(var l=0,k=c.length,m;l<k;m=c[l++],(h=x.call(m),"[object String]"==h||"[object Number]"==h)&&(f[m]=1));}if(d)if("[object Number]"==(h=x.call(d))){if(0<(d-=d%1))for(e="",10<d&&(d=10);e.length<d;e+=" ");}else"[object String]"==h&&(e=10>=d.length?d:d.slice(0,10));return N("",(m={},m[""]=b,m),g,f,e,"",[])}}if(!g("json-parse")){var V=
            l.fromCharCode,W={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},n,L,u=function(){n=L=null;throw p();},G=function(){for(var a=L,b=a.length,c,d,e,g,f;n<b;)switch(f=a.charCodeAt(n),f){case 9:case 10:case 13:case 32:n++;break;case 123:case 125:case 91:case 93:case 58:case 44:return c=I?a.charAt(n):a[n],n++,c;case 34:c="@";for(n++;n<b;)if(f=a.charCodeAt(n),32>f)u();else if(92==f)switch(f=a.charCodeAt(++n),f){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:c+=W[f];
            n++;break;case 117:d=++n;for(e=n+4;n<e;n++)f=a.charCodeAt(n),48<=f&&57>=f||97<=f&&102>=f||65<=f&&70>=f||u();c+=V("0x"+a.slice(d,n));break;default:u()}else{if(34==f)break;f=a.charCodeAt(n);for(d=n;32<=f&&92!=f&&34!=f;)f=a.charCodeAt(++n);c+=a.slice(d,n)}if(34==a.charCodeAt(n))return n++,c;u();default:d=n;45==f&&(g=!0,f=a.charCodeAt(++n));if(48<=f&&57>=f){for(48==f&&(f=a.charCodeAt(n+1),48<=f&&57>=f)&&u();n<b&&(f=a.charCodeAt(n),48<=f&&57>=f);n++);if(46==a.charCodeAt(n)){for(e=++n;e<b&&(f=a.charCodeAt(e),
        48<=f&&57>=f);e++);e==n&&u();n=e}f=a.charCodeAt(n);if(101==f||69==f){f=a.charCodeAt(++n);43!=f&&45!=f||n++;for(e=n;e<b&&(f=a.charCodeAt(e),48<=f&&57>=f);e++);e==n&&u();n=e}return+a.slice(d,n)}g&&u();if("true"==a.slice(n,n+4))return n+=4,!0;if("false"==a.slice(n,n+5))return n+=5,!1;if("null"==a.slice(n,n+4))return n+=4,null;u()}return"$"},O=function(a){var b,c;"$"==a&&u();if("string"==typeof a){if("@"==(I?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(b=[];;c||(c=!0)){a=G();if("]"==a)break;c&&
        (","==a?(a=G(),"]"==a&&u()):u());","==a&&u();b.push(O(a))}return b}if("{"==a){for(b={};;c||(c=!0)){a=G();if("}"==a)break;c&&(","==a?(a=G(),"}"==a&&u()):u());","!=a&&"string"==typeof a&&"@"==(I?a.charAt(0):a[0])&&":"==G()||u();b[a.slice(1)]=O(G())}return b}u()}return a},R=function(a,b,c){c=Q(a,b,c);c===A?delete a[b]:a[b]=c},Q=function(a,b,c){var d=a[b],e;if("object"==typeof d&&d)if("[object Array]"==x.call(d))for(e=d.length;e--;)R(d,e,c);else H(d,function(a){R(d,a,c)});return c.call(a,b,d)};e.parse=
            function(a,b){var c,d;n=0;L=""+a;c=O(G());"$"!=G()&&u();n=L=null;return b&&"[object Function]"==x.call(b)?Q((d={},d[""]=c,d),"",b):c}}}e.runInContext=c;return e}var a={"function":!0,object:!0},e=a[typeof g]&&g&&!g.nodeType&&g,d=a[typeof window]&&window||this,f=e&&a[typeof k]&&k&&!k.nodeType&&"object"==typeof b&&b;!f||f.global!==f&&f.window!==f&&f.self!==f||(d=f);if(e)c(d,e);else{var l=d.JSON,p=d.JSON3,r=!1,m=c(d,d.JSON3={noConflict:function(){r||(r=!0,d.JSON=l,d.JSON3=p,l=p=null);return m}});d.JSON=
    {parse:m.parse,stringify:m.stringify}}}).call(this)}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{}],36:[function(f,k,g){function b(a){a=""+a;if(!(1E4<a.length)&&(a=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(a))){var b=parseFloat(a[1]);switch((a[2]||"ms").toLowerCase()){case "years":case "year":case "yrs":case "yr":case "y":return 315576E5*b;case "days":case "day":case "d":return 864E5*
        b;case "hours":case "hour":case "hrs":case "hr":case "h":return 36E5*b;case "minutes":case "minute":case "mins":case "min":case "m":return 6E4*b;case "seconds":case "second":case "secs":case "sec":case "s":return 1E3*b;case "milliseconds":case "millisecond":case "msecs":case "msec":case "ms":return b}}}function c(a,b,c){if(!(a<b))return a<1.5*b?Math.floor(a/b)+" "+c:Math.ceil(a/b)+" "+c+"s"}k.exports=function(a,e){e=e||{};return"string"==typeof a?b(a):e.long?c(a,864E5,"day")||c(a,36E5,"hour")||c(a,
        6E4,"minute")||c(a,1E3,"second")||a+" ms":864E5<=a?Math.round(a/864E5)+"d":36E5<=a?Math.round(a/36E5)+"h":6E4<=a?Math.round(a/6E4)+"m":1E3<=a?Math.round(a/1E3)+"s":a+"ms"}},{}],37:[function(f,k,g){(function(b){var c=/^[\],:{}\s]*$/,a=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,e=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,d=/(?:^|:|,)(?:\s*\[)+/g,f=/^\s+/,g=/\s+$/;k.exports=function(k){if("string"!=typeof k||!k)return null;k=k.replace(f,"").replace(g,"");if(b.JSON&&JSON.parse)return JSON.parse(k);
        if(c.test(k.replace(a,"@").replace(e,"]").replace(d,"")))return(new Function("return "+k))()}}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{}],38:[function(f,k,g){g.encode=function(b){var c="",a;for(a in b)b.hasOwnProperty(a)&&(c.length&&(c+="&"),c+=encodeURIComponent(a)+"="+encodeURIComponent(b[a]));return c};g.decode=function(b){var c={};b=b.split("&");for(var a=0,e=b.length;a<e;a++){var d=b[a].split("=");c[decodeURIComponent(d[0])]=decodeURIComponent(d[1])}return c}},
        {}],39:[function(f,k,g){var b=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,c="source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");k.exports=function(a){var e=a,d=a.indexOf("["),f=a.indexOf("]");-1!=d&&-1!=f&&(a=a.substring(0,d)+a.substring(d,f).replace(/:/g,
            ";")+a.substring(f,a.length));a=b.exec(a||"");for(var g={},k=14;k--;)g[c[k]]=a[k]||"";-1!=d&&-1!=f&&(g.source=e,g.host=g.host.substring(1,g.host.length-1).replace(/;/g,":"),g.authority=g.authority.replace("[","").replace("]","").replace(/;/g,":"),g.ipv6uri=!0);return g}},{}],40:[function(f,k,g){(function(b){var c=f("isarray"),a=f("./is-buffer");g.deconstructPacket=function(b){function d(b){if(!b)return b;if(a(b)){var e={_placeholder:!0,num:f.length};f.push(b);return e}if(c(b)){for(var e=Array(b.length),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      g=0;g<b.length;g++)e[g]=d(b[g]);return e}if("object"==typeof b&&!(b instanceof Date)){e={};for(g in b)e[g]=d(b[g]);return e}return b}var f=[];b.data=d(b.data);b.attachments=f.length;return{packet:b,buffers:f}};g.reconstructPacket=function(a,b){function f(a){if(a&&a._placeholder)return b[a.num];if(c(a))for(var e=0;e<a.length;e++)a[e]=f(a[e]);else if(a&&"object"==typeof a)for(e in a)a[e]=f(a[e]);return a}a.data=f(a.data);a.attachments=void 0;return a};g.removeBlobs=function(e,d){function f(e,m,h){if(!e)return e;
        if(b.Blob&&e instanceof Blob||b.File&&e instanceof File){g++;var t=new FileReader;t.onload=function(){h?h[m]=this.result:k=this.result;--g||d(k)};t.readAsArrayBuffer(e)}else if(c(e))for(t=0;t<e.length;t++)f(e[t],t,e);else if(e&&"object"==typeof e&&!a(e))for(t in e)f(e[t],t,e)}var g=0,k=e;f(k);g||d(k)}}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{"./is-buffer":42,isarray:34}],41:[function(f,k,g){function b(){}function c(a){var b,c=!1;b=""+a.type;if(g.BINARY_EVENT==
        a.type||g.BINARY_ACK==a.type)b+=a.attachments,b+="-";a.nsp&&"/"!=a.nsp&&(c=!0,b+=a.nsp);null!=a.id&&(c&&(b+=",",c=!1),b+=a.id);null!=a.data&&(c&&(b+=","),b+=l.stringify(a.data));q("encoded %j as %s",a,b);return b}function a(a,b){p.removeBlobs(a,function(a){var d=p.deconstructPacket(a);a=c(d.packet);d=d.buffers;d.unshift(a);b(d)})}function e(){this.reconstructor=null}function d(a){this.reconPack=a;this.buffers=[]}var q=f("debug")("socket.io-parser"),l=f("json3");f("isarray");k=f("component-emitter");
        var p=f("./binary"),r=f("./is-buffer");g.protocol=4;g.types="CONNECT DISCONNECT EVENT BINARY_EVENT ACK BINARY_ACK ERROR".split(" ");g.CONNECT=0;g.DISCONNECT=1;g.EVENT=2;g.ACK=3;g.ERROR=4;g.BINARY_EVENT=5;g.BINARY_ACK=6;g.Encoder=b;g.Decoder=e;b.prototype.encode=function(b,d){q("encoding packet %j",b);if(g.BINARY_EVENT==b.type||g.BINARY_ACK==b.type)a(b,d);else{var e=c(b);d([e])}};k(e.prototype);e.prototype.add=function(a){if("string"==typeof a){a:{var b={},c=0;b.type=Number(a.charAt(0));if(null==g.types[b.type])a=
        {type:g.ERROR,data:"parser error"};else if(g.BINARY_EVENT!=b.type&&g.BINARY_ACK!=b.type){if("/"==a.charAt(c+1))for(b.nsp="";++c;){var e=a.charAt(c);if(","==e)break;b.nsp+=e;if(c==a.length)break}else b.nsp="/";e=a.charAt(c+1);if(""!==e&&Number(e)==e){for(b.id="";++c;){e=a.charAt(c);if(null==e||Number(e)!=e){--c;break}b.id+=a.charAt(c);if(c==a.length)break}b.id=Number(b.id)}if(a.charAt(++c))try{b.data=l.parse(a.substr(c))}catch(f){a={type:g.ERROR,data:"parser error"};break a}q("decoded %s as %j",a,
            b);a=b}else a=void 0}a&&(g.BINARY_EVENT==a.type||g.BINARY_ACK==a.type?(this.reconstructor=new d(a),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",a)):this.emit("decoded",a))}else if(r(a)||a.base64)if(this.reconstructor){if(a=this.reconstructor.takeBinaryData(a))this.reconstructor=null,this.emit("decoded",a)}else throw Error("got binary data when not reconstructing a packet");else throw Error("Unknown type: "+a);};e.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()};
        d.prototype.takeBinaryData=function(a){this.buffers.push(a);return this.buffers.length==this.reconPack.attachments?(a=p.reconstructPacket(this.reconPack,this.buffers),this.finishedReconstruction(),a):null};d.prototype.finishedReconstruction=function(){this.reconPack=null;this.buffers=[]}},{"./binary":40,"./is-buffer":42,"component-emitter":43,debug:14,isarray:34,json3:35}],42:[function(f,k,g){(function(b){k.exports=function(c){return b.Buffer&&b.Buffer.isBuffer(c)||b.ArrayBuffer&&c instanceof ArrayBuffer}}).call(this,
        "undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{}],43:[function(f,k,g){k.exports=f(26)},{}],44:[function(f,k,g){k.exports=function(b,c){for(var a=[],e=(c=c||0)||0;e<b.length;e++)a[e-c]=b[e];return a}},{}],45:[function(f,k,g){(function(b){(function(c){function a(a){for(var b=[],c=0,d=a.length,e,f;c<d;)e=a.charCodeAt(c++),55296<=e&&56319>=e&&c<d?(f=a.charCodeAt(c++),56320==(f&64512)?b.push(((e&1023)<<10)+(f&1023)+65536):(b.push(e),c--)):b.push(e);return b}function e(a){if(55296<=
        a&&57343>=a)throw Error("Lone surrogate U+"+a.toString(16).toUpperCase()+" is not a scalar value");}function d(){if(w>=t)throw Error("Invalid byte index");var a=h[w]&255;w++;if(128==(a&192))return a&63;throw Error("Invalid continuation byte");}function f(){var a,b,c,g;if(w>t)throw Error("Invalid byte index");if(w==t)return!1;a=h[w]&255;w++;if(0==(a&128))return a;if(192==(a&224)){b=d();a=(a&31)<<6|b;if(128<=a)return a;throw Error("Invalid continuation byte");}if(224==(a&240)){b=d();c=d();a=(a&15)<<
        12|b<<6|c;if(2048<=a)return e(a),a;throw Error("Invalid continuation byte");}if(240==(a&248)&&(b=d(),c=d(),g=d(),a=(a&15)<<18|b<<12|c<<6|g,65536<=a&&1114111>=a))return a;throw Error("Invalid UTF-8 detected");}var l="object"==typeof g&&g,p="object"==typeof k&&k&&k.exports==l&&k,r="object"==typeof b&&b;if(r.global===r||r.window===r)c=r;var m=String.fromCharCode,h,t,w,r={version:"2.0.0",encode:function(b){b=a(b);for(var c=b.length,d=-1,f,g="";++d<c;){f=b[d];if(0==(f&4294967168))f=m(f);else{var h="";
        0==(f&4294965248)?h=m(f>>6&31|192):0==(f&4294901760)?(e(f),h=m(f>>12&15|224),h+=m(f>>6&63|128)):0==(f&4292870144)&&(h=m(f>>18&7|240),h+=m(f>>12&63|128),h+=m(f>>6&63|128));f=h+=m(f&63|128)}g+=f}return g},decode:function(b){h=a(b);t=h.length;w=0;b=[];for(var c;!1!==(c=f());)b.push(c);c=b.length;for(var d=-1,e,g="";++d<c;)e=b[d],65535<e&&(e-=65536,g+=m(e>>>10&1023|55296),e=56320|e&1023),g+=m(e);return g}};if(l&&!l.nodeType)if(p)p.exports=r;else{c={}.hasOwnProperty;for(var C in r)c.call(r,C)&&(l[C]=r[C])}else c.utf8=
        r})(this)}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{}],46:[function(f,k,g){function b(a,b,d){return b?new c(a,b):new c(a)}f=function(){return this}();var c=f.WebSocket||f.MozWebSocket;k.exports=c?b:null;c&&(b.prototype=c.prototype)},{}],47:[function(f,k,g){function b(b){var c="";do c=a[b%64]+c,b=Math.floor(b/64);while(0<b);return c}function c(){var a=b(+new Date);return a!==l?(d=0,l=a):a+"."+b(d++)}for(var a="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            e={},d=0,q=0,l;64>q;q++)e[a[q]]=q;c.encode=b;c.decode=function(a){var b=0;for(q=0;q<a.length;q++)b=64*b+e[a.charAt(q)];return b};k.exports=c},{}]},{},[1])(1)});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            //end 1.4.0
/**
 * 判断是否启动定时器
 * @returns {boolean}
 */
function isPushing(){
    var url = window.location.href;
    var canPush=["future.do","market.do","btc.do","ltc.do","fullTrade.do","futureFull.do"];
    if (!!url) {
        for(var i=0;i<canPush.length;i++){
            if(url.indexOf(canPush[i])!=-1){
                return true;
            }
        }
        if(url.indexOf(".do")==-1){//首页
            return true;
        }
        return false;
    }
    return false;
}
    /**
     * 连接推送信息
     */
    function socketConnection(){
        if(!window.WebSocket){//是否支持websocket 暂时不支持推送
            restartRefresh();
            return;
        }
        if(site_flag == 2){
            var url='https://real.okcoin.com:10442';
            if(typeof (if_offline) !='undefined' &&if_offline!=1){
                url='http://real.okcoin.com:10442';
            }
            socket = io.connect(url,{transports:['websocket'],reconnectionDelay:1e3,reconnectionDelayMax:3e3,timeout:5e3});
        }else{
            var url='https://real.okcoin.cn:10442';
            if(typeof (if_offline) !='undefined'&&if_offline!=1){
                url='http://real.okcoin.cn:10442';
            }
            socket = io.connect(url,{transports:['websocket'],reconnectionDelay:1e3,reconnectionDelayMax:3e3,timeout:5e3});
        }
        console.info("socket socketConnection");
        if(!!socket){
            //接收消息
            socket.on('m', function(data) {
                var index = data.lastIndexOf('}');
                var index2 = data.lastIndexOf(']');
                if(index2>index){
                    var str = data.substr(0,index2+1);
                    var result = eval('(' + str + ')');
                }else{
                    var str = data.substr(0,index+1);
                    var result = eval('(' + str + ')');
                }
                if(!result||((result instanceof  Array)&&!result[0])){
                    //如果为空去掉
                    return;
                }
                if(isNewKline()&&(result instanceof  Array)){
                    for(var i=0;i<result.length;i++){
                        if(result[i]&&!!result[i].type&&result[i].type.indexOf("kline")!=-1){
                            jQuery("#kline_iframe")[0].contentWindow.onPushingResponse(marketFrom, type, coinVol, result[i].data);
                        }
                    }
                }
                if ((typeof loadTalkMsg) != 'undefined') {
                    loadTalkMsg(result);
                }
                //全屏页面加载
                var url = window.location.href;
                if(url.indexOf("futureFull.do")!=-1){
                    futureFull.load(result);
                    return;
                }
                if(url.indexOf("fullTrade.do")!=-1){
                    tradeFull.load(result);
                    return;
                }
                //合约页面加载数据
                if (futurePush != null && futurePush.loadData(result)) {//合约页面load 成功返回不在加载其他的
                    return;
                }
                if(url.indexOf("trade/ltc.do") > 0 || url.indexOf("trade/btc.do") > 0 ){//现货交易中心
                    if(!!result&&!!result.ltc5Depth_ticker){
                        push.tickerObj =result.ltc5Depth_ticker.ticker;
                        ticker(result.ltc5Depth_ticker.ticker);
                        depth5(result.ltc5Depth_ticker.ltc5Depth);
                        return;
                    }
                    if(!!result&&!!result.btc5Depth_ticker){
                        push.tickerObj =result.btc5Depth_ticker.ticker;
                        ticker(result.btc5Depth_ticker.ticker);
                        depth5(result.btc5Depth_ticker.btc5Depth)
                        return;
                    }
                    if (!!result[0] && !!result[0].type && result[0].type.indexOf('ok_btc_depth_merge')!=-1) {
                        depth5(result[0].data);
                        ticker(result[0].data.ticker);
                        return;
                    }
                    if (!!result[0] && !!result[0].type && result[0].type.indexOf('ok_ltc_depth_merge')!=-1) {
                        depth5(result[0].data);
                        ticker(result[0].data.ticker);
                        return;
                    }
                } else if(document.getElementById("marketLast")!=null){ //现货行情图表
                    if (!!result) {//增量推送修改 现货行情图表
                        for (var i = 0; i < result.length; i++) {
                            if (!!result[i] && !!result[i].type) {
                                if (result[i].type.indexOf("_driven") != -1) {
                                    if(deptMerge_m==0){
                                        depth(result[i].data);
                                    }
                                    continue;
                                }
                                if (result[i].type.indexOf("_deal") != -1) {
                                    loadTrade(result[i].data, result[i].type.indexOf("btc") != -1 ? 0 : 1);
                                    continue;
                                }
                                if (result[i].type.indexOf("_ticker") != -1) {
                                    var tickerTmp = {};
                                    if (result[i].type.indexOf("btc") != -1) {
                                        tickerTmp.btc = result[i].data;
                                    }
                                    if (result[i].type.indexOf("ltc") != -1) {
                                        tickerTmp.ltc = result[i].data;
                                    }
                                    tickerNew(tickerTmp);
                                    continue;
                                }
                            }
                        }
                    }
                    if (!!result[0] && !!result[0].type && result[0].type.indexOf('ok_btc_depth_merge')!=-1) {
                        if(deptMerge_m==1 || deptMerge_m == 2){ // 深度为1或0.1
                            depth(result[0].data);
                        }
                        ticker(result[0].data.ticker);
                        return;
                    }
                    if (!!result[0] && !!result[0].type && result[0].type.indexOf('ok_ltc_depth_merge')!=-1) {
                        if(deptMerge_m==1){
                            depth(result[0].data);
                        }
                        ticker(result[0].data.ticker);
                        return;
                    }
                }

                for(var w=0;w<result.length;w++) {
                    var pushdata = result[w];
                    if (pushdata.type == "ok_info_account") {
                        trade_injectUserParam(pushdata.data);
                    }
                }
                for(var j=0;j<result.length;j++){
                    var pushdata = result[j];
                    var url = window.location.href;
                    if(url.indexOf("trade/ltc.do") > 0 || url.indexOf("trade/btc.do") > 0 ){//交易界面
                        var symbol = document.getElementById("symbol").value ;
                        var entrustSign = SYMBOLS_UTIL.symbolStr[Number(symbol)];
                        //newCoinLabel
                        if((pushdata.type == "ok_info_btc_order" && symbol==0)|| (pushdata.type == "ok_info_ltc_order" && symbol==1 )){//btc
                            var cur = document.getElementById("his_n").className;
                            if (cur == "cur")
                                return null;
                            var tb=document.getElementById("tenorders");    //获取table对像
                            var rows=tb.rows;
                            var hasRow = false;
                            for(var q=1;q<rows.length;q++){    //--循环所有的行
                                var cells=rows[q].cells;
                                var id = cells[0].innerHTML;
                                if(id == pushdata.data.id){//存在相同id
                                    if(pushdata.data.status == 2 || pushdata.data.status == -1){//完全成交或撤单
                                        tb.deleteRow(q);
                                        if(rows.length == 1){
                                            var trn=tb.insertRow(1);
                                            trn.innerHTML="<td colspan='9' align='center'>"+get$('trade_entrust_ten_yhnoo')+"</td>";
                                        }
                                    }else if(pushdata.data.status == 1){//部分成交
                                        cells[5].innerHTML = entrustSign+pushdata.data.dealAmount;
//                                        cells[6].innerHTML = cnyOrUsdSymbol+pushdata.data.turnover;
                                        cells[6].innerHTML = cnyOrUsdSymbol+pushdata.data.averagePrice;
                                        if(pushdata.data.tradeCnyPrice=='1000000' && pushdata.data.tradeType==1){
                                            cells[7].innerHTML=cnyOrUsdSymbol+pushdata.data.unDealMoney;
                                        }else{
                                            cells[7].innerHTML = entrustSign+pushdata.data.unDealMoney;
                                        }
                                        cells[8].innerHTML = "("+get$("trade_entrust_ten_partfulfilled")+")"+"<a href='javascript:void(0);' onclick='javascript:cancelEntrust("+pushdata.data.id+");'>"+get$("trade_entrust_ten_cancel")+"</a>";
                                    }
                                    hasRow = true;
                                    break;
                                }
                            }
                            if(!hasRow){//新增一行
                                if(pushdata.data.status == 2 || pushdata.data.status == -1 || pushdata.data.status == 1){//完全成交或撤单或部分成交)
                                    break;
                                }
                                if(rows.length == 2 && rows[1].cells.length ==1){
                                    tb.deleteRow(1);
                                }
                                var tr=tb.insertRow(1);
                                var td=document.createElement("td");
                                td.style.cssText='display:none';
                                td.appendChild(document.createTextNode (pushdata.data.id));
                                tr.appendChild (td);
                                var td=document.createElement("td");
                                td.appendChild(document.createTextNode (pushdata.data.createdDate));
                                td.setAttribute("class", "gray");
                                tr.appendChild (td);
                                var td=document.createElement("td");
                                if(pushdata.data.tradeType == '1'){
                                    td.setAttribute("class","lightgreen5");
                                }else{
                                    td.setAttribute("class","red");
                                }
                                td.appendChild(document.createTextNode (pushdata.data.tradeType == '1'?get$("trade_entrust_ten_bid"):get$("trade_entrust_ten_ask")));
                                tr.appendChild (td);
                                var td=document.createElement("td");
                                if((pushdata.data.tradeType==1&&(+pushdata.data.tradeCnyPrice)!=1000000)||pushdata.data.tradeType==2){
                                    td.appendChild(document.createTextNode (entrustSign+pushdata.data.tradeAmount));
                                }else{
                                    td.appendChild(document.createTextNode (cnyOrUsdSymbol+pushdata.data.tradeAmount));
                                }
                                tr.appendChild (td);
                                var td=document.createElement("td");
                                if((pushdata.data.tradeType==1&&(+pushdata.data.tradeCnyPrice)!=1000000)||(pushdata.data.tradeType==2&&pushdata.data.tradeCnyPrice!=0)){
                                    td.appendChild(document.createTextNode (cnyOrUsdSymbol+pushdata.data.tradeCnyPrice));
                                }else{
                                    td.appendChild(document.createTextNode (get$("trade_entrust_ten_instant")));
                                }
                                tr.appendChild (td);
                                var td=document.createElement("td");
                                td.appendChild(document.createTextNode (entrustSign+pushdata.data.dealAmount));
                                tr.appendChild (td);
                                var td=document.createElement("td");
                                td.appendChild(document.createTextNode (cnyOrUsdSymbol+pushdata.data.averagePrice));
                                tr.appendChild (td);
                                var td=document.createElement("td");
                                if(pushdata.data.status ==0 || pushdata.data.status ==1 ||pushdata.data.status ==3){
                                    if(pushdata.data.tradeCnyPrice=='1000000' && pushdata.data.tradeType==1){
                                        td.appendChild(document.createTextNode (cnyOrUsdSymbol+pushdata.data.unDealMoney));
                                    }else{
                                        td.appendChild(document.createTextNode (entrustSign+pushdata.data.unDealMoney));
                                    }
                                }else{
                                    td.appendChild(document.createTextNode (pushdata.data.unDealMoney));
                                }
                                tr.appendChild (td);
                                var td=document.createElement("td");
                                td.setAttribute("id", "entrustStatus"+pushdata.data.id);
                                var statusClass="";
                                var status = "";
                                if(pushdata.data.status == 0 || pushdata.data.status == 1 || pushdata.data.status == 3){
                                    if(pushdata.data.status == 1){
                                        status = "("+get$("trade_entrust_ten_partfulfilled")+")";
                                    }else if(pushdata.data.status == 0){
                                        status = "("+get$("trade_entrust_ten_unfilled")+")";
                                    }else if(pushdata.data.status == 3){
                                        status = "("+get$("trade_entrust_ten_unfilled")+")";
                                    }
                                    status = status+"<a href='javascript:void(0);' onclick='javascript:cancelEntrust("+pushdata.data.id+");'>"+get$("trade_entrust_ten_cancel")+"</a>";
                                    statusClass="blue";
                                }else if(pushdata.data.status == 2){
                                    status = get$("trade_entrust_ten_fulfilled");
                                    statusClass="lightgreen5";
                                }else{
                                    status =get$("trade_entrust_ten_cancelled");
                                    statusClass="gray";
                                }
                                td.setAttribute("class", statusClass);
                                td.innerHTML=status;
                                tr.appendChild (td);
                                if(rows.length >= 12){
                                    tb.deleteRow(11);
                                }

                            }
                            if(pushdata.data.status == 2){
                                NotifyMsg.showMsg(getShowTite(pushdata.data),getshowMsg(pushdata.data),function(){
                                    jQuery("#his_n a").click();
                                });
                            }
                        }
                    }//在行情页面
                    if(document.getElementById("marketLast")!=null){
                        var islogin = document.getElementById("isLogin").value;
                        if(islogin==1){
                            var symbol = document.getElementById("getSymbolValue").value ;
                            var entrustSign = SYMBOLS_UTIL.symbolStr[Number(symbol)];
                            //newCoinLabel
                            if((pushdata.type == "ok_info_btc_order" && symbol==0)|| (pushdata.type == "ok_info_ltc_order" && symbol==1 )){//btc
                                var tb=document.getElementById("tenorders");    //获取table对像
                                var rows=tb.rows;
                                var hasRow = false;
                                for(var i=1;i<rows.length;i++){    //--循环所有的行
                                    var cells=rows[i].cells;
                                    var id = cells[0].innerHTML;
                                    if(id == pushdata.data.id){//存在相同id
                                        if(pushdata.data.status == 2 || pushdata.data.status == -1){//完全成交或撤单
                                            tb.deleteRow(i);
                                            if(rows.length == 1){
                                                var trn=tb.insertRow(1);
                                                trn.innerHTML="<td colspan='9' align='center'>"+get$('trade_entrust_ten_yhnoo')+"</td>";
                                            }
                                        }else if(pushdata.data.status == 1){//部分成交
                                            if(pushdata.data.tradeCnyPrice=='1000000' && pushdata.data.tradeType==1){
                                                cells[3].innerHTML=cnyOrUsdSymbol+pushdata.data.unDealMoney;
                                            }else{
                                                cells[3].innerHTML = entrustSign+pushdata.data.unDealMoney;
                                            }
                                            cells[4].innerHTML = "("+get$("trade_entrust_ten_partfulfilled")+")"+"<a href='javascript:void(0);' onclick='javascript:cancelEntrust("+pushdata.data.id+");'>"+get$("trade_entrust_ten_cancel")+"</a>";
                                        }
                                        hasRow = true;
                                        break;
                                    }
                                }
                                if(!hasRow){//新增一行
                                    if(pushdata.data.status == 2 || pushdata.data.status == -1 || pushdata.data.status == 1){//完全成交或撤单 或部分成交)
                                        continue;// 2014-10-23 14:37:39  suguangqiang  liuqing  modify
                                    }

                                    if(rows.length == 2 && rows[1].cells.length ==1){
                                        tb.deleteRow(1);
                                    }
                                    var tr=tb.insertRow(1);
                                    var td=document.createElement("td");
                                    td.style.cssText='display:none';
                                    td.appendChild(document.createTextNode (pushdata.data.id));
                                    tr.appendChild (td);
                                    var td=document.createElement("td");
                                    if(pushdata.data.tradeType == '1'){
                                        td.setAttribute("class","lightgreen5");
                                    }else{
                                        td.setAttribute("class","red");
                                    }
                                    td.appendChild(document.createTextNode (pushdata.data.tradeType == '1'?get$("trade_entrust_ten_bid"):get$("trade_entrust_ten_ask")));
                                    tr.appendChild (td);
                                    var td=document.createElement("td");
                                    var td=document.createElement("td");
                                    if((pushdata.data.tradeType==1&&pushdata.data.tradeCnyPrice!='1000000')||(pushdata.data.tradeType==2&&pushdata.data.tradeCnyPrice!=0)){
                                        td.appendChild(document.createTextNode (cnyOrUsdSymbol+pushdata.data.tradeCnyPrice));
                                    }else{
                                        td.appendChild(document.createTextNode (get$("trade_entrust_ten_instant")));
                                    }
                                    tr.appendChild (td);
                                    var td=document.createElement("td");
                                    if(pushdata.data.status ==0 || pushdata.data.status ==1 ||pushdata.data.status ==3){
                                        if(pushdata.data.tradeCnyPrice=='1000000' && pushdata.data.tradeType==1){
                                            td.appendChild(document.createTextNode (cnyOrUsdSymbol+pushdata.data.unDealMoney));
                                        }else{
                                            td.appendChild(document.createTextNode (entrustSign+pushdata.data.unDealMoney));
                                        }
                                    }else{
                                        td.appendChild(document.createTextNode (pushdata.data.unDealMoney));
                                    }
                                    tr.appendChild (td);
                                    var td=document.createElement("td");
                                    td.setAttribute("id", "entrustStatus"+pushdata.data.id);
                                    var statusClass="";
                                    var status = "";
                                    if(pushdata.data.status == 0 || pushdata.data.status == 1 || pushdata.data.status == 3){
                                        if(pushdata.data.status == 1){
                                            status = "("+get$("trade_entrust_ten_partfulfilled")+")";
                                        }else if(pushdata.data.status == 0){
                                            status = "("+get$("trade_entrust_ten_unfilled")+")";
                                        }else if(pushdata.data.status == 3){
                                            status = "("+get$("trade_entrust_ten_unfilled")+")";
                                        }
                                        status = status+"<a href='javascript:void(0);' onclick='javascript:cancelEntrust("+pushdata.data.id+");'>"+get$("trade_entrust_ten_cancel")+"</a>";
                                        statusClass="blue";
                                    }else if(pushdata.data.status == 2){
                                        status = get$("trade_entrust_ten_fulfilled");
                                        statusClass="lightgreen5";
                                    }else{
                                        status =get$("trade_entrust_ten_cancelled");
                                        statusClass="gray";
                                    }
                                    td.setAttribute("class", statusClass);
                                    td.innerHTML=status;
                                    tr.appendChild (td);
                                    if(rows.length >= 12){
                                        tb.deleteRow(11);
                                    }
                                }
                                if(pushdata.data.status == 2){
                                    NotifyMsg.showMsg(getShowTite(pushdata.data),getshowMsg(pushdata.data),function(){
                                    });
                                }
                            }
                        }
                    }
                }
            });
        }
    }
            // 轮询开始
            //合约行情也深度轮询
            //是否初始化合约页面推送
            var futurePush = null;
            jQuery(document).ready(function () {
                if (isfuture()) {
                    futurePush = new FuturePush();
                }
            });
              var isConnect = true;
              var isBinary = false;
              var futureFull=null;
              var futureTrade = null;
              var tradeFull = null;
              var connectionTimes=0;
              var socket=null;
              jQuery(window).load(function() {
                  if((typeof initChat)!='undefined'&&islogin){
                      initChat();
                  }
                  if(!isPushing()){//如果不是行情页面
                      return;
                  }
                  socketConnection();
                  if(!socket){
                      return;
                  }
                  //连接方法
                  socket.on('connect', function() {
                      console.info("socket connect times["+(connectionTimes++)+"]");
                      if (islogin) {
                          var userid = getCookieValue("coin_session_user_id");
                          if (!!userid) {
                              socket.emit('login', "{'userid':'" + userid + "','binary':'"+isBinary+"'}");
                          }
                      }
                      isConnect = true;
                      TimerComTask.clearTimerTask();//停止所有定时器
                      if(isNewKline()){
                          jQuery("#kline_iframe")[0].contentWindow.onPushingStarted(PushFrom);
                      }
                      if(isfuture()) {
                          futureSend();
                          return;
                      }
                      var url = window.location.href;
                      if(url.haveChat("futureFull.do")){//期货全屏交易
                          if(!futureFull){
                              futureFull=new FutureFull();
                          }
                          futureFull.fullSend();
                          return;
                      }

                      if(url.haveChat("fullTrade.do")){//现货全屏交易
                          if(!tradeFull){
                              tradeFull = new TradeFull();
                          }
                          tradeFull.fullSend();
                          return;
                      }
                      //end
                      // ======初始状态的数据订阅推送======
                      //在行情页面
                      if(document.getElementById("marketLast")!=null){
                          var symbol=jQuery("#getSymbolValue").val();
                          var deptMergeReal=getCookieValue("deptMerge_stock");
                          switch (Number(deptMergeReal)) {
                              case 0:

                                  if(Number(symbol) == 0){
                                      commonDept.pushTest(['ok_ltc_ticker', 'ok_btc_ticker', 'ok_btc_depth_driven_200', 'ok_btc_deal']);
                                  }else if (Number(symbol) == 1) {
                                      commonDept.pushTest(['ok_ltc_ticker', 'ok_btc_ticker', 'ok_ltc_depth_driven_200', 'ok_ltc_deal']);
                                  }
                                  break;
                              case 1:
                                  if(Number(symbol) == 0){
                                      commonDept.pushTest(['ok_btc_depth_merge']);
                                  }else if (Number(symbol) == 1) {
                                      commonDept.pushTest(['ok_ltc_depth_merge']);
                                  }
                                  break;
                              case 2:
                                  if(Number(symbol) == 0 && site_flag == 1){
                                      commonDept.pushTest(['ok_btc_depth_merge_01']);
                                  }else if (Number(symbol) == 1) {
                                      //commonDept.pushTest(['ok_ltc_ticker', 'ok_btc_ticker', 'ok_ltc_depth_driven_200', 'ok_ltc_deal']);// 默认case0
                                      commonDept.pushTest(['ok_ltc_depth_merge']);
                                  }
                                  break;

                          }
                          return;
                      }
                      //在交易界面
                      var url = window.location.href;
                      if(url.indexOf("trade/ltc") > 0 || url.indexOf("trade/btc") > 0 ){
                          var symbol=jQuery("#symbol").val();
                          var deptMergeReal=getCookieValue("deptMerge_stock");
                          /*commonDept.switch_arg_0(deptMergeReal, symbol);*/
                          switch (Number(deptMergeReal)) {
                              case 0:

                                  if(Number(symbol) == 0){
                                      commonDept.pushTest(['r_btc5Depth_ticker']);
                                  }else if (Number(symbol) == 1) {
                                      commonDept.pushTest(['r_ltc5Depth_ticker']);
                                  }
                                  break;
                              case 1:
                                  if(Number(symbol) == 0){
                                      commonDept.pushTest(['ok_btc_depth_merge']);
                                  }else if (Number(symbol) == 1) {
                                      commonDept.pushTest(['ok_ltc_depth_merge']);
                                  }
                                  break;
                              case 2:
                                  if(Number(symbol) == 0 && site_flag == 1){
                                      commonDept.pushTest(['ok_btc_depth_merge_01']);
                                  }else if (Number(symbol) == 1) {
                                      commonDept.pushTest(['r_ltc5Depth_ticker']);// 默认case0
                                  }
                                  break;

                          }
                          return;
                      }
                  });
                  //断开连接方法
                  socket.on('disconnect',restartRefresh);
                  socket.on('reconnect_error',restartRefresh);
                  socket.on('error',restartRefresh);
              });
    /**
     * 推送停止重新启动伦旭
     */
    function restartRefresh() {
        if (isConnect){
            isConnect = false;
        }else{
            return;
        }
        if (!isPushing()) { //不是交易中心 或者行情信息
            return;
        }
        //停止kline推送 开启轮训
        if(isNewKline()){
            jQuery("#kline_iframe")[0].contentWindow.onPushingStop();
        }
        TimerComTask.startTimerTask();//启动轮训刷新
    }
function tickerNew(ticker) {
    if (!!ticker) {
        if (!!ticker.btc) {
            jQuery("#bannerAccountBtcLast").val(ticker.btc.last);
            jQuery("#bannerBtcBuy").val(ticker.btc.buy);
            jQuery("#bannerBtcSell").val(ticker.btc.sell);
            push.btclast = Number(ticker.btc.last);
            jQuery("#bannerBtcLast").html((ticker.btc.last + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,'));
            jQuery("#bannerBtcVol").html(ticker.btc.vol.substr(0,ticker.btc.vol.indexOf(".")));
        }
        if (!!ticker.ltc) {
            jQuery("#bannerAccountLtcLast").val(ticker.ltc.last);
            jQuery("#bannerLtcBuy").val(ticker.ltc.buy);
            jQuery("#bannerLtcSell").val(ticker.ltc.sell);
            push.ltclast = Number(ticker.ltc.last);
            jQuery("#bannerLtcLast").html((ticker.ltc.last + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,'));
            jQuery("#bannerLtcVol").html(ticker.ltc.vol.substr(0,ticker.ltc.vol.indexOf(".")));
        }
        AccountingUserAccountInfo()//核算更新账户信息
        if(document.getElementById("canpush")!=null){
            _ChangeBalance();
        }
        //更新行情页最新价格
        if(document.getElementById("marketLast")!=null){
            var symbol = document.getElementById("getSymbolValue").value ;
            if (document.title != null) {
                var oldTitle = document.title;
                if (oldTitle != null && oldTitle.length > 0) {
                    var arrs = oldTitle.split("-");
                    var newTitle = oldTitle;
                    //@todo to add new coin
                    var info = SYMBOLS_UTIL.symbolStr[Number(symbol)];
                    if (arrs.length == 3) {
                        //newCoinLabel
                        if (symbol == 0) {
                            if (!!ticker.btc) {
                                if (pushjs1 == arrs[1]) {
                                    newTitle = info + cnyOrUsdSymbol + ticker.btc.last + "-" + pushjs1 + "-" + arrs[2];
                                } else {
                                    newTitle = info + cnyOrUsdSymbol + ticker.btc.last + "-" + pushjs1 + "-" + arrs[1] + "-" + arrs[2];
                                }
                            }
                        } else if(symbol==1) {
                            if (!!ticker.ltc) {
                                if (pushjs1 == arrs[1]) {
                                    newTitle = info + cnyOrUsdSymbol + ticker.ltc.last + "-" + pushjs1 + "-" + arrs[2];
                                } else {
                                    newTitle = info + cnyOrUsdSymbol + ticker.ltc.last + "-" + pushjs1 + "-" + arrs[1] + "-" + arrs[2];
                                }
                            }
                        }
                    } else {
                        //newCoinLabel
                        if (symbol == 0) {
                            if (!!ticker.btc) {
                                if (typeof(arrs[2]) == 'undefined') {
                                    if (typeof(arrs[1]) == 'undefined') {
                                        newTitle = info + cnyOrUsdSymbol + ticker.btc.last + "-" + pushjs1 + "-" + arrs[0];
                                    } else {
                                        newTitle = info + cnyOrUsdSymbol + ticker.btc.last + "-" + pushjs1 + "-" + arrs[1];
                                    }
                                } else {
                                    newTitle = info + cnyOrUsdSymbol + ticker.btc.last + "-" + pushjs1 + "-" + arrs[2] + "-" + arrs[3];
                                }
                            }
                        } else if(symbol==1) {
                            if (!!ticker.ltc) {
                                if (typeof(arrs[2]) == 'undefined') {
                                    if (typeof(arrs[1]) == 'undefined') {
                                        newTitle = info + cnyOrUsdSymbol + ticker.ltc.last + "-" + pushjs1 + "-" + arrs[0];
                                    } else {
                                        newTitle = info + cnyOrUsdSymbol + ticker.ltc.last + "-" + pushjs1 + "-" + arrs[1];
                                    }
                                }
                                else {
                                    newTitle = info + cnyOrUsdSymbol + ticker.ltc.last + "-" + pushjs1 + "-" + arrs[2] + "-" + arrs[3];
                                }
                            }
                        }
                    }
                    document.title = newTitle;
                }
            }
        }
    }
}
Array.prototype.binarySearchDesc = function (v) {
    var l = 0;
    var h = this.length - 1;
    while (l <= h) {
        if (this[l][0] == v) {
            return l;
        }
        l++;
        //var m =(l + h)>>>1;
        //if(Number(this[m][0]) == Number(v)) {
        //    return m;
        //}
        //if (Number(this[m][0]) > Number(v)) {
        //    h = m - 1;
        //}
        //if (Number(this[m][0]) < Number(v)) {
        //    l = m + 1;
        //}
    }
    return -1;
}
function futureSend(){
    if((typeof FuturePush)=='undefined'){
        setTimeout(futureSend,200);
        return;
    }else if(!futurePush) {
        futurePush=new FuturePush();
        futurePush.send();
    }else{
        futurePush.send();
    }
}
var cmd = '';
var marketFrom = '0';
var type = '2';
var coinVol = '1';
function PushFrom(contractType,marketFrom_, type_, coinVol_, time) {
    marketFrom = marketFrom_;
    type = type_;
    coinVol = coinVol_;
    if (cmd != ''){
      if(!!socket){
          socket.emit("removePushType", cmd);
      }
    }
    cmd = '{millInterval : 300, type : "ok_';
    switch (contractType) {
        case 'btc_spot':
            cmd += 'btc_kline_';
            break;
        case 'ltc_spot':
            cmd += 'ltc_kline_';
            break;
        case 'btc_index':
             cmd+="future_btc_kline_index_";
            break;
        case 'ltc_index':
            cmd+="future_ltc_kline_index_";
            break;
        case 'btc_this_week':
            cmd+="future_btc_kline_this_week_";
            break;
        case 'btc_next_week':
            cmd+="future_btc_kline_next_week_";
            break;
        case 'btc_quarter':
            cmd+="future_btc_kline_quarter_";
            break;
        case 'ltc_this_week':
            cmd+="future_ltc_kline_this_week_";
            break;
        case 'ltc_next_week':
            cmd+="future_ltc_kline_next_week_";
            break;
        case 'ltc_quarter':
            cmd+="future_ltc_kline_quarter_";
            break;
        default :
            cmd += 'btc_kline_';
            break;
    }
    switch (type) {
        case '0':
            cmd += '1min';
            break;
        case '1':
            cmd += '5min';
            break;
        case '2':
            cmd += '15min';
            break;
        case '3':
            cmd += 'day';
            break;
        case '4':
            cmd += 'week';
            break;
        case '7':
            cmd += '3min';
            break;
        case '9':
            cmd += '30min';
            break;
        case '10':
            cmd += '1hour';
            break;
        case '11':
            cmd += '2hour';
            break;
        case '12':
            cmd += '4hour';
            break;
        case '13':
            cmd += '6hour';
            break;
        case '14':
            cmd += '12hour';
            break;
        case '15':
            cmd += '3day';
            break;
        default :
            cmd += '15min';
            break;
    }
    if(Number(coinVol)==0){
        cmd+="_coin"
    }
    cmd+='", binary : '+isBinary+', since :';
    cmd += time + '}';
    if(!!socket){
        socket.emit("addPushType", cmd);
    }
}
//定时器缓存ID类
var INTERVAL_ID={
    trade_center:null,
    trade_entrust_time:null,
    trade_market_pub:null,
    trade_market_pri:null,
    future_center:null,
    future_market_pub:null,
    future_market_pri:null
}
//定时器控制类
var TimerComTask={
    timer:2000,
    clearTimerInterval:function(timer){
        if (!!timer) {
            clearInterval(timer);
        }
    },
    clearTimerOut:function(timer){
        if (!!timer) {
            clearTimeout(timer);
        }
    },
    clearTimerTask:function(){
        TimerComTask.clearTimerInterval(INTERVAL_ID.trade_center);
        TimerComTask.clearTimerInterval(INTERVAL_ID.trade_market_pub);
        TimerComTask.clearTimerInterval(INTERVAL_ID.trade_market_pri);

        TimerComTask.clearTimerInterval(INTERVAL_ID.future_center);
        TimerComTask.clearTimerInterval(INTERVAL_ID.future_market_pub);
        TimerComTask.clearTimerInterval(INTERVAL_ID.future_market_pri);
    },
    startTradeTask:function(){
        if(islogin){
            TimerComTask.clearTimerInterval(INTERVAL_ID.trade_center);
            INTERVAL_ID.trade_center=setInterval(function(){
                refreshTradeBaner();//banner
                handleEntrust();//交易中心深度
                refrushRecord_push_pack();//现货交易最近10笔刷新
                handleTicker();
            },TimerComTask.timer);
        }
    },
    startTradeMarketTask:function(){
        TimerComTask.clearTimerInterval(INTERVAL_ID.trade_market_pub);
        INTERVAL_ID.trade_market_pub = setInterval(function () {
            marketEntrustRefresh();//深度交易记录
            handleTicker();//行情
        }, TimerComTask.timer);
        if (islogin) {
            TimerComTask.clearTimerInterval(INTERVAL_ID.trade_market_pri);
            INTERVAL_ID.trade_market_pri = setInterval(function () {
                refreshOrders();//刷新挂单
                refreshTradeBaner();//banner
            }, TimerComTask.timer);
        }
    },
    startFutureTask:function(){
        if (islogin&&!isConnect) {
            TimerComTask.clearTimerInterval(INTERVAL_ID.future_center);
            var li=jQuery("#changeTab li[class='cur']");
            var tab=li.index();
            var pro=li.children("a")[0];
            bannerRefresh();
            refreshDepth();/** 为了页面切换合约快速响应页面 */
            handleTicker();
            INTERVAL_ID.future_center = setInterval(function () {
                bannerRefresh();
                refreshDepth();
                handleTicker();
                switch(Number(tab)){
                    case 0://交易中心持仓信息
                        clickHoldPosition(pro);
                        break;
                    case 1:
                        var subTab=-1;
                        jQuery("#planswitchbtn input[name='entLi']").each(function(index,pro){
                            if(jQuery(pro).hasClass("futurePlanButtoncur")){
                                subTab=index;
                                return;
                            }
                        })
                        if(subTab==0){
                            loadContent(jQuery("#entrust20"));
                        }
                        break;
                }
            }, TimerComTask.timer);
        }
    },
    startFutureMarketTask:function(){
        TimerComTask.clearTimerInterval(INTERVAL_ID.future_market_pub);
        INTERVAL_ID.future_market_pub = setInterval(function () {
            marketDepth();
            handleTicker();//行情
        }, TimerComTask.timer);
        if (islogin) {
            TimerComTask.clearTimerInterval(INTERVAL_ID.future_market_pri);
            var li=jQuery("#changeTab li[class='cur']");
            var tab=li.index();
            var pro=li.children("a")[0];
            INTERVAL_ID.future_market_pri = setInterval(function () {
                bannerRefresh();
                switch(Number(tab)){
                    case 0:
                        clickHoldPosition(pro);
                        break;
                    case 1:
                        loadContent(jQuery("#entrust20"));
                        break;
                }
            }, TimerComTask.timer);
        }
        if(isConnect){
            TimerComTask.clearTimerInterval(INTERVAL_ID.future_market_pub);
            TimerComTask.clearTimerInterval(INTERVAL_ID.future_market_pri);
        }
    },
    startTimerTask:function(){
        var url = window.location.href;
        if(url.haveChat("trade/ltc.do")||url.haveChat("trade/btc.do")){//现货
            TimerComTask.startTradeTask();
            return;
        }
        if(url.haveChat("/market.do")&&!url.haveChat("/future")){//行情图标
            if(!!cacheDepth){
                cacheDepth.clean();
            }
            TimerComTask.startTradeMarketTask();
            return;
        }
        //现货全屏开始刷新
        if(url.haveChat("fullTrade.do")){
            if(!tradeFull){
                tradeFull=new TradeFull();//初始化页面
            }
            if(!!fullDepthCache){
                fullDepthCache.clean();
            }
            tradeFull.reloadPri();
            tradeFull.reloadPub();
            return;
        }
        //------------------------------------------------------------期货
        if(url.haveChat("futureFull.do")){
            if(!futureFull){
                futureFull=new FutureFull();//初始化页面
            }
            if(!!depthCache){
                depthCache.clean();
            }
            futureFull.reloadPri();
            futureFull.reloadPub();
            return;
        }
        if(url.haveChat("/future/future.do")){
            TimerComTask.startFutureTask();
            return;
        }
        if(url.haveChat("/future/market.do")){
            var marketSign=jQuery("#marketSign").val();
            if(marketSign==1){
                if(!!depthCache){
                    depthCache.clean();
                }
                TimerComTask.startFutureMarketTask();
            }
        }
    }
}
var push = {};
push.ltclast = 0;
push.btclast = 0;
push.btcsell = 0;
push.btcbuy = 0;
push.ltcsell = 0 ;
push.ltcbuy = 0 ;
var refreshOrdersTimer;
              function ticker(data) {
              	//banner
                  if(document.getElementById('bannerAccountBtcLast')!=null && islogin){
                      changeTickerByPush(data);
                  }

              	if(document.getElementById("bannerBtcLast")!=null){
              		var btclast = data.btc.last;
                    push.btclast  = btclast;
                    // suguangqiang 获取最后买一买一
                    var _ltcsell,_ltcbuy,_btcbuy,_btcsell;
                    _ltcsell = data.ltc.sell;
                    _ltcbuy =   data.ltc.buy;
                    _btcbuy =  data.btc.buy;
                    _btcsell = data.btc.sell;
                    push.btcsell = _btcsell;
                    push.btcbuy = _btcbuy;
                    push.ltcsell = _ltcsell ;
                    push.ltcbuy = _ltcbuy ;
                    // suguangqiang end
              		document.getElementById("bannerBtcLast").innerHTML=(btclast + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
              	}
              	if(document.getElementById("bannerBtcVol")!=null){
              		var tempBtc = data.btc.vol;
              		document.getElementById("bannerBtcVol").innerHTML=tempBtc.substr(0,tempBtc.indexOf("."));
              	}
              	if(document.getElementById("bannerLtcLast")!=null){
              		var ltclast = data.ltc.last;
                    push.ltclast = ltclast;
              		document.getElementById("bannerLtcLast").innerHTML=(ltclast + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
              	}
              	if(document.getElementById("bannerLtcVol")!=null){
              		var tempLtc = data.ltc.vol;
              		document.getElementById("bannerLtcVol").innerHTML=tempLtc.substr(0,tempLtc.indexOf("."));
              	}

              	//更新首页大图成交量
              	if(document.getElementById("indexVol")!=null){
              		document.getElementById("indexVol").innerHTML=data.btc.vol;
              	}
              	if(document.getElementById("indexLtcVol")!=null){
              		document.getElementById("indexLtcVol").innerHTML=data.ltc.vol;
              	}
              	//更新行情页最新价格
              	if(document.getElementById("marketLast")!=null){
              		var symbol = document.getElementById("getSymbolValue").value ;
              		if(document.title!=null){
              			var oldTitle = document.title;
              			if(oldTitle!=null&&oldTitle.length>0){
              				var arrs  =oldTitle.split("-");
              				var newTitle = "";
              				var info = SYMBOLS_UTIL.symbolStr[Number(symbol)];
              				if(arrs.length==3){
                                //newCoinLabel
              					if(symbol == 0){
									if(pushjs1==arrs[1]){
										newTitle = info+cnyOrUsdSymbol+data.btc.last+"-"+pushjs1+"-"+arrs[2];
									}else{
										newTitle = info+cnyOrUsdSymbol+data.btc.last+"-"+pushjs1+"-"+arrs[1]+"-"+arrs[2];
									}
              					}else if(symbol==1){
									if(pushjs1==arrs[1]){
										newTitle = info+cnyOrUsdSymbol+data.ltc.last+"-"+pushjs1+"-"+arrs[2];
									}else{
										newTitle = info+cnyOrUsdSymbol+data.ltc.last+"-"+pushjs1+"-"+arrs[1]+"-"+arrs[2];
									}
              					}
              				}else{
                                //newCoinLabel
              					if(symbol == 0){
									if(typeof(arrs[2]) == 'undefined'){
										if(typeof(arrs[1]) == 'undefined'){
											newTitle = info+cnyOrUsdSymbol+data.btc.last+"-"+pushjs1+"-"+arrs[0];
										}else{
											newTitle = info+cnyOrUsdSymbol+data.btc.last+"-"+pushjs1+"-"+arrs[1];
										}
									}else{
										newTitle = info+cnyOrUsdSymbol+data.btc.last+"-"+pushjs1+"-"+arrs[2]+"-"+arrs[3];
									}
              					}else if(symbol==1){
									if(typeof(arrs[2]) == 'undefined'){
										if(typeof(arrs[1]) == 'undefined'){
											newTitle = info+cnyOrUsdSymbol+data.ltc.last+"-"+pushjs1+"-"+arrs[0];
										}else{
											newTitle = info+cnyOrUsdSymbol+data.ltc.last+"-"+pushjs1+"-"+arrs[1];
										}
									}
									else{
										newTitle = info+cnyOrUsdSymbol+data.ltc.last+"-"+pushjs1+"-"+arrs[2]+"-"+arrs[3];
									}
              					}
              				}
              				document.title = newTitle;
              			}
              		}

              	}else{
              		if(document.title!=null && !isSpider()&&data.btc.last!=0&&data.ltc.last!=0){
              			var oldTitle = document.title;
              			var arrs  =oldTitle.split("-");
              			//前辍用来判断title是显示BTC还是LTC
              			var prefix = "";
              			if(oldTitle!=null&&oldTitle.length>0){
              				if(arrs.length > 0){
              					prefix = arrs[0].substr(0,1);
              					oldTitle = arrs[arrs.length-1];
              				}
              				var newTitle =  cnyOrUsdSymbol+data.ltc.last+"-"+oldTitle;
              				var url=document.location.href;
              				if(true) {
                                var symboll = 0;
                                // 首先根据webTitleSymbol判断币种
								if(document.getElementById("webTitleSymbol")!=null){
									symboll = document.getElementById("webTitleSymbol").value;
								}else if (document.getElementById("symbol")!=null){
                                    symboll = document.getElementById("symbol").value;
                                }
                                //newCoinLabel
                                if(symboll==0){
              						 newTitle = "฿:"+cnyOrUsdSymbol+data.btc.last+"-"+oldTitle;
              					 }else if(symboll == 1) {
              						 newTitle = "Ł:"+cnyOrUsdSymbol+data.ltc.last+"-"+oldTitle;
              					 }
              				}else{
                                //newCoinLabel
              					if(prefix=="฿"){
              						newTitle = "Ł:"+cnyOrUsdSymbol+data.ltc.last+"-"+oldTitle;
              					}else if (prefix == "Ł"){
              						newTitle = "฿:"+cnyOrUsdSymbol+data.btc.last+"-"+oldTitle;
              					}
              				}
              				document.title = newTitle;
              			}
              		}
              	}

              	if(document.getElementById("tradeLastPrice") != null){
              		var symbol = document.getElementById("symbol").value ;
                    //newCoinLabel
              		if(symbol == 0){//btc
              			document.getElementById("tradeLastPrice").innerHTML = (data.btc.last+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
              		}else if(symbol==1){
              			document.getElementById("tradeLastPrice").innerHTML = (data.ltc.last+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
              		}
              	}
              }
            var sortDepth=new function(){
                this.sort=function (depth) {
                    depth.sort(function (a, b) {
                        return a[1] - b[1];
                    });
                    return depth;
                };
                this.median=function(depth){
                    var i=floor((depth.length/3)*2,0);
                    return depth[i][1]<1?1:depth[i][1];;
                }
                this.medianUnit=function(buydepth,sellDepth,colorWidth){
                    var tmpBuy=new Array(buydepth);
                    tmpBuy=tmpBuy[0];
                    var tmpSell=new Array(sellDepth);
                    tmpSell=tmpSell[0];
                    tmpBuy=tmpBuy.concat(tmpSell);
                    var result=this.median(this.sort(tmpBuy))/colorWidth;
                    tmpBuy=null;
                    tmpSell=null;
                    return result;
                }
                this.width=function(amount,medianUnit){
                    if(medianUnit==0){
                        return 1;
                    }else{
                        var result=round(Number(amount)/medianUnit,0);
                        if(result<=0){
                            return 1;
                        }else if(result>160){
                            return 160;
                        }else{
                            return result;
                        }
                    }
                }
            }
function loadTrade(data,symbol) {
    var resultHtml = "";
    for (var i = data.length; i > 0; i--) {
        var color = data[i - 1][3] == 1 ? "lightgreen" : "red";
        resultHtml += '<tr><td><span id="createdDateTd">' + data[i - 1][2] + '</span></td>';
        resultHtml += '<td style="text-align: right;padding-right: 20px"><span id="fontPriceSpan" class="' + color + '">' + CommaFormattedLittle(data[i - 1][0], symbolSubPoint(symbol)) + '</span></td>';
        resultHtml += '<td style="text-align: right;padding-right: 30px"><span id="colorAmount">' + CommaFormattedLittle(data[i - 1][1], symbolAmountSubPoint(symbol)) + '</span></td>';
        resultHtml += '</tr>';
    }
    var $tbody = jQuery("#marketRecent table tbody");
    $tbody.prepend(resultHtml);
    var length = $tbody.find("tr").length;
    var tmp = length - 60;
    while (tmp > 0) {
        $tbody.find("tr").last().remove();
        tmp--;
    }
}
var cacheDepth=new DepthCache();

function depth(data) {
    if (document.getElementById("marketLast") != null) {
        if (!!data) {
            var buyDepthList = ( deptMerge_m == 1 || deptMerge_m == 2 ) ? data.buyDepthList : cacheDepth.getBuyDepthList(data.buyDepthList);
            var sellDepthList = ( deptMerge_m == 1 || deptMerge_m == 2 ) ? data.sellDepthList : cacheDepth.getSellDepthList(data.sellDepthList);
            var recentDealList = data.recentDealList;
            if (isNewKline()) {
                jQuery("#kline_iframe")[0].contentWindow._set_current_depth(getKlineJsonDepth({
                    sellDepthList: sellDepthList,
                    buyDepthList: buyDepthList
                }));//深度信息
            }
            var medianUnit = sortDepth.medianUnit(buyDepthList, sellDepthList, 70);
            setDepthHtml("depth_buy_context", 0, buyDepthList, medianUnit);//设置买单
            setDepthHtml("depth_sell_context", 1, sellDepthList, medianUnit);//设置卖单
            var symbol = document.getElementById("getSymbolValue").value;
            setDepthHistroy_push(recentDealList, symbol);
            if (!depth.isShow) {
                jQuery("#depthHidding").hide();
                depth.isShow = true;
            }
        }
    }
}
function setDepthHistroy_push(recentDealList, symbol) {
    if (!!recentDealList) {
        recentDealList.reverse();
        var resultHtml = "";
        for (var i = 1; i <= recentDealList.length; i++) {
            var color = recentDealList[i - 1][3] == 1 ? "lightgreen" : "red";
            resultHtml += '<tr><td><span id="createdDateTd' + i + '" >' + recentDealList[i - 1][2] + '</span></td>';
            resultHtml += '<td style="text-align: right;padding-right: 20px"><span id="fontPriceSpan' + i + '" class="' + color + '" >' + CommaFormattedLittle(recentDealList[i - 1][0], symbolSubPoint(symbol)) + '</span></td>';
            resultHtml += '<td style="text-align: right;padding-right: 30px"><span id="colorAmount' + i + '">' + CommaFormattedLittle(recentDealList[i - 1][1], symbolAmountSubPoint(symbol)) + '</span></td>';
            resultHtml += '</tr>';
        }
        document.getElementById("marketRecentTbody").innerHTML = resultHtml;
    }
}
function DepthCache(){
    this.sellDepth,this.buyDepth;
    this.getBuyDepthList = function (depthList) {
        if (!this.buyDepth) {//第一次加载为空的时候
            this.buyDepth = depthList;
            return depthList;
        }
        if (!!depthList) {
            for (var i = 0; i < depthList.length; i++) {
                var price = depthList[i][0];
                var amount=depthList[i][1];
                var index = this.buyDepth.binarySearchDesc(price);
                if(Number(amount)==0){//删除
                    this.buyDepth.splice(index,1);
                    continue;
                }
                if (index != -1) {//修改
                    this.buyDepth[index] = depthList[i];
                    continue;
                }
                if(index==-1){//增加
                    this.buyDepth.push(depthList[i]);
                    continue;
                }
            }
            //重新排序
            this.buyDepth.sort(function(o1,o2){
                return Number(o2[0])-Number(o1[0]);
            });
            //删除超过200的
            if(this.buyDepth.length>200){
                this.buyDepth.splice(200,this.buyDepth.length-200);
            }
        }
        return this.buyDepth;
    };
    this.getSellDepthList=function(depthList){
        if(!this.sellDepth){//第一次加载为空的时候
            this.sellDepth=depthList;
            return depthList;
        }
        if (!!depthList) {
            for (var i = 0; i < depthList.length; i++) {
                var price = depthList[i][0];
                var amount=depthList[i][1];
                var index = this.sellDepth.binarySearchDesc(price);
                if(Number(amount)==0){//删除
                    var tmp=this.sellDepth.splice(index,1);
                    continue;
                }
                if (index != -1) {//修改
                    this.sellDepth[index] = depthList[i];
                    continue;
                }
                if(index==-1){//增加
                    this.sellDepth.push(depthList[i]);
                    //console.info("增加-------"+price+"---amount"+amount);
                    continue;
                }
            }
            //重新排序
            this.sellDepth.sort(function(o1,o2){
                return Number(o2[0])-Number(o1[0]);
            });
            //删除超过200的
            if(this.sellDepth.length>200){
                this.sellDepth.splice(0,this.sellDepth.length-200);
            }
        }else{
//            return this.sellDepth.reverse();
        }
        return this.sellDepth;
    }
    this.clean=function(){
        this.buyDepth=null;
        this.sellDepth=null;
    }
}
function getKlineJsonDepth(data){
    var sell = data.sellDepthList;
    var json_sell_result=new Array();
    if(!!sell){
        for(var i=0;i<sell.length;i++){
            var json_sell=new Array();
            json_sell.push(Number(sell[i][0]));
            json_sell.push(Number(sell[i][1]))
            json_sell_result.push(json_sell);
        }
    }
    var buy = data.buyDepthList;
    var json_buy_result=new Array();
    if(!!buy){
        for(var i=0;i<buy.length;i++){
            var json_buy=new Array();
            json_buy.push(Number(buy[i][0]));
            json_buy.push(Number(buy[i][1]))
            json_buy_result.push(json_buy);
        }
    }
    return {"asks":json_sell_result,"bids":json_buy_result};
}

function depth5(data) {
    changeDepthImg_com();
    var symbol = document.getElementById("symbol").value;
    var buyDepthList = data.buyDepthList;
    var sellDepthList = data.sellDepthList;

    if (sellDepthList != null) {
        var j = 0;
        var i = sellDepthList.length - 1;
        for (var k=0; k<5; k++) {
            var y = j + 1;
            if(y>5){
                break;
            }
            var sellPriceSpan=document.getElementById("sellPriceSpan" + y);
            if(!sellPriceSpan){
                var result=getDepthHtml("sell",y,sellDepthList[i],symbol);
                jQuery("#sellList").prepend(result);
                continue;
            }
            if(!sellDepthList[i]){
                jQuery(sellPriceSpan).parent().hide();
                continue;
            }
            jQuery(sellPriceSpan).parent().show();
            sellPriceSpan.innerHTML = CommaFormattedByOriginal(CommaFormattedCommon(sellDepthList[i][0], symbolSubPoint(symbol)));
            document.getElementById("sellAmountSpan" + y).innerHTML = CommaFormattedByOriginal(CommaFormattedCommon(sellDepthList[i][1], symbolAmountSubPoint(symbol)));
            document.getElementById("sellPrice" + y).value = sellDepthList[i][0];
            document.getElementById("sellAmount" + y).value = sellDepthList[i][1];
            j++;
            i--;
        }

    }
    if (buyDepthList != null) {
        for (var i = 0; i < 5; i++) {
            var y = i + 1;
            if(y>5){
                break;
            }
            var buyPriceSpan=document.getElementById("buyPriceSpan" + y);
            if(!buyPriceSpan){
                var result=getDepthHtml("buy",y,buyPriceSpan[i],symbol);
                jQuery("#buyList").append(result);
                continue;
            }
            if(!buyDepthList[i]){
                jQuery(buyPriceSpan).parent().hide();
                continue;
            }
            jQuery(buyPriceSpan).parent().show();
            buyPriceSpan.innerHTML = CommaFormattedByOriginal(CommaFormattedCommon(buyDepthList[i][0], symbolSubPoint(symbol)));
            document.getElementById("buyAmountSpan" + y).innerHTML = CommaFormattedByOriginal(CommaFormattedCommon(buyDepthList[i][1], symbolAmountSubPoint(symbol)));
            document.getElementById("buyPrice" + y).value = buyDepthList[i][0];
            document.getElementById("buyAmount" + y).value = buyDepthList[i][1];
        }
    }
}
function getDepthHtml(type,index,data,symbol){
    var result='<li class="'+(type=="buy"?"lightgreen5":"red")+'" onmouseover="this.style.cursor=\'pointer\';this.style.backgroundColor=\' #FFFFAA\';" onmouseout="this.style.backgroundColor=\' #fff\';" onclick="javascript:autoTrade_new('+index+','+(type=="buy"?0:1)+',0);" style="cursor: pointer; background-color: rgb(255, 255, 255);">';
    result+='<span class="c1">'+(type=="buy"?depth_buy:depth_sell)+' ('+index+')  </span> ';
    result+='<span class="c2" id="'+type+'PriceSpan'+index+'"> '+CommaFormattedByOriginal(CommaFormattedCommon(data[0], symbolSubPoint(symbol)))+' </span>';
    result+='<input id="'+type+'Price'+index+'" type="hidden" value="'+data[0]+'">';
    result+='<span class="c3" id="'+type+'AmountSpan'+index+'"> '+ CommaFormattedByOriginal(CommaFormattedCommon(data[1], symbolAmountSubPoint(symbol)))+' </span>';
    result+='<input id="'+type+'Amount'+index+'" type="hidden" value="'+data[1]+'">';
    result+='</li>';
    return result;
}
var DoubleUtil = {
    "add" :function(str1,str2){// 字符串转数字并相加
        var no1 = !parseFloat(str1)?0:parseFloat(str1);
        var no2 = !parseFloat(str2)?0:parseFloat(str2);
        return no1 + no2 ;
    },
    "subtract" :function(str1,str2){// 字符串转数字并相减
        var no1 = !parseFloat(str1)?0:parseFloat(str1);
        var no2 = !parseFloat(str2)?0:parseFloat(str2);
        return no1 - no2 ;
    },
    "multiply":function(str1,str2){
        var no1 = !parseFloat(str1)?0:parseFloat(str1);
        var no2 = !parseFloat(str2)?0:parseFloat(str2);
        return no1 * no2;
    },
    "divide":function(str1,str2){
        if(typeof str1 != 'string'||typeof str2 != 'string'){
            return false;
        }
        var t1 = str1.indexof(".") > -1 ? str1.split(".")[1].length : 0;
        var t2 = str2.indexof(".") > -1 ? str2.split(".")[1].length : 0;
        var r1 = Number(str1.toString().replace(".", ""));
        var r2 = Number(str2.toString().replace(".", ""));
        var result = (r1 / r2) * Math.pow(10, t2 - t1);
        return !result?result:0;
    },
    "divide_rate":function(arg1,arg2,rate){
        if(Number(arg2)==0){
            return 0;
        }
        if(!rate){
            rate=8;
        }
        return (Number(arg1)/Number(arg2)).toFixed(rate);
    }
};
/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function() {'use strict';var l=this;function p(b,e){var a=b.split("."),c=l;!(a[0]in c)&&c.execScript&&c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&void 0!==e?c[d]=e:c=c[d]?c[d]:c[d]={}};var q="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array&&"undefined"!==typeof DataView;function t(b){var e=b.length,a=0,c=Number.POSITIVE_INFINITY,d,f,g,h,k,m,r,n,s,J;for(n=0;n<e;++n)b[n]>a&&(a=b[n]),b[n]<c&&(c=b[n]);d=1<<a;f=new (q?Uint32Array:Array)(d);g=1;h=0;for(k=2;g<=a;){for(n=0;n<e;++n)if(b[n]===g){m=0;r=h;for(s=0;s<g;++s)m=m<<1|r&1,r>>=1;J=g<<16|n;for(s=m;s<d;s+=k)f[s]=J;++h}++g;h<<=1;k<<=1}return[f,a,c]};function u(b,e){this.g=[];this.h=32768;this.c=this.f=this.d=this.k=0;this.input=q?new Uint8Array(b):b;this.l=!1;this.i=v;this.q=!1;if(e||!(e={}))e.index&&(this.d=e.index),e.bufferSize&&(this.h=e.bufferSize),e.bufferType&&(this.i=e.bufferType),e.resize&&(this.q=e.resize);switch(this.i){case w:this.a=32768;this.b=new (q?Uint8Array:Array)(32768+this.h+258);break;case v:this.a=0;this.b=new (q?Uint8Array:Array)(this.h);this.e=this.v;this.m=this.s;this.j=this.t;break;default:throw Error("invalid inflate mode");
}}var w=0,v=1;
    u.prototype.u=function(){for(;!this.l;){var b=x(this,3);b&1&&(this.l=!0);b>>>=1;switch(b){case 0:var e=this.input,a=this.d,c=this.b,d=this.a,f=e.length,g=void 0,h=void 0,k=c.length,m=void 0;this.c=this.f=0;if(a+1>=f)throw Error("invalid uncompressed block header: LEN");g=e[a++]|e[a++]<<8;if(a+1>=f)throw Error("invalid uncompressed block header: NLEN");h=e[a++]|e[a++]<<8;if(g===~h)throw Error("invalid uncompressed block header: length verify");if(a+g>e.length)throw Error("input buffer is broken");switch(this.i){case w:for(;d+
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    g>c.length;){m=k-d;g-=m;if(q)c.set(e.subarray(a,a+m),d),d+=m,a+=m;else for(;m--;)c[d++]=e[a++];this.a=d;c=this.e();d=this.a}break;case v:for(;d+g>c.length;)c=this.e({o:2});break;default:throw Error("invalid inflate mode");}if(q)c.set(e.subarray(a,a+g),d),d+=g,a+=g;else for(;g--;)c[d++]=e[a++];this.d=a;this.a=d;this.b=c;break;case 1:this.j(y,z);break;case 2:A(this);break;default:throw Error("unknown BTYPE: "+b);}}return this.m()};
    var B=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],C=q?new Uint16Array(B):B,D=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],E=q?new Uint16Array(D):D,F=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],G=q?new Uint8Array(F):F,H=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],I=q?new Uint16Array(H):H,K=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,
        13],L=q?new Uint8Array(K):K,M=new (q?Uint8Array:Array)(288),N,O;N=0;for(O=M.length;N<O;++N)M[N]=143>=N?8:255>=N?9:279>=N?7:8;var y=t(M),P=new (q?Uint8Array:Array)(30),Q,R;Q=0;for(R=P.length;Q<R;++Q)P[Q]=5;var z=t(P);function x(b,e){for(var a=b.f,c=b.c,d=b.input,f=b.d,g=d.length,h;c<e;){if(f>=g)throw Error("input buffer is broken");a|=d[f++]<<c;c+=8}h=a&(1<<e)-1;b.f=a>>>e;b.c=c-e;b.d=f;return h}
    function S(b,e){for(var a=b.f,c=b.c,d=b.input,f=b.d,g=d.length,h=e[0],k=e[1],m,r;c<k&&!(f>=g);)a|=d[f++]<<c,c+=8;m=h[a&(1<<k)-1];r=m>>>16;b.f=a>>r;b.c=c-r;b.d=f;return m&65535}
    function A(b){function e(a,b,c){var e,d=this.p,f,g;for(g=0;g<a;)switch(e=S(this,b),e){case 16:for(f=3+x(this,2);f--;)c[g++]=d;break;case 17:for(f=3+x(this,3);f--;)c[g++]=0;d=0;break;case 18:for(f=11+x(this,7);f--;)c[g++]=0;d=0;break;default:d=c[g++]=e}this.p=d;return c}var a=x(b,5)+257,c=x(b,5)+1,d=x(b,4)+4,f=new (q?Uint8Array:Array)(C.length),g,h,k,m;for(m=0;m<d;++m)f[C[m]]=x(b,3);if(!q){m=d;for(d=f.length;m<d;++m)f[C[m]]=0}g=t(f);h=new (q?Uint8Array:Array)(a);k=new (q?Uint8Array:Array)(c);b.p=0;
        b.j(t(e.call(b,a,g,h)),t(e.call(b,c,g,k)))}u.prototype.j=function(b,e){var a=this.b,c=this.a;this.n=b;for(var d=a.length-258,f,g,h,k;256!==(f=S(this,b));)if(256>f)c>=d&&(this.a=c,a=this.e(),c=this.a),a[c++]=f;else{g=f-257;k=E[g];0<G[g]&&(k+=x(this,G[g]));f=S(this,e);h=I[f];0<L[f]&&(h+=x(this,L[f]));c>=d&&(this.a=c,a=this.e(),c=this.a);for(;k--;)a[c]=a[c++-h]}for(;8<=this.c;)this.c-=8,this.d--;this.a=c};
    u.prototype.t=function(b,e){var a=this.b,c=this.a;this.n=b;for(var d=a.length,f,g,h,k;256!==(f=S(this,b));)if(256>f)c>=d&&(a=this.e(),d=a.length),a[c++]=f;else{g=f-257;k=E[g];0<G[g]&&(k+=x(this,G[g]));f=S(this,e);h=I[f];0<L[f]&&(h+=x(this,L[f]));c+k>d&&(a=this.e(),d=a.length);for(;k--;)a[c]=a[c++-h]}for(;8<=this.c;)this.c-=8,this.d--;this.a=c};
    u.prototype.e=function(){var b=new (q?Uint8Array:Array)(this.a-32768),e=this.a-32768,a,c,d=this.b;if(q)b.set(d.subarray(32768,b.length));else{a=0;for(c=b.length;a<c;++a)b[a]=d[a+32768]}this.g.push(b);this.k+=b.length;if(q)d.set(d.subarray(e,e+32768));else for(a=0;32768>a;++a)d[a]=d[e+a];this.a=32768;return d};
    u.prototype.v=function(b){var e,a=this.input.length/this.d+1|0,c,d,f,g=this.input,h=this.b;b&&("number"===typeof b.o&&(a=b.o),"number"===typeof b.r&&(a+=b.r));2>a?(c=(g.length-this.d)/this.n[2],f=258*(c/2)|0,d=f<h.length?h.length+f:h.length<<1):d=h.length*a;q?(e=new Uint8Array(d),e.set(h)):e=h;return this.b=e};
    u.prototype.m=function(){var b=0,e=this.b,a=this.g,c,d=new (q?Uint8Array:Array)(this.k+(this.a-32768)),f,g,h,k;if(0===a.length)return q?this.b.subarray(32768,this.a):this.b.slice(32768,this.a);f=0;for(g=a.length;f<g;++f){c=a[f];h=0;for(k=c.length;h<k;++h)d[b++]=c[h]}f=32768;for(g=this.a;f<g;++f)d[b++]=e[f];this.g=[];return this.buffer=d};
    u.prototype.s=function(){var b,e=this.a;q?this.q?(b=new Uint8Array(e),b.set(this.b.subarray(0,e))):b=this.b.subarray(0,e):(this.b.length>e&&(this.b.length=e),b=this.b);return this.buffer=b};p("Zlib.RawInflate",u);p("Zlib.RawInflate.prototype.decompress",u.prototype.u);var T={ADAPTIVE:v,BLOCK:w},U,V,W,X;if(Object.keys)U=Object.keys(T);else for(V in U=[],W=0,T)U[W++]=V;W=0;for(X=U.length;W<X;++W)V=U[W],p("Zlib.RawInflate.BufferType."+V,T[V]);}).call(this);

function refreshTradeBaner() {
    var url = "/trade/freshUserInfo.do";
    jQuery.post(url, function (data) {
        if (!data) {
            return;
        }
        var result = eval('(' + data + ')');
        bannerUserAccountPolling(result);
        AccountingUserAccountInfo();
        if (document.getElementById("canpush") != null) {
            _ChangeBalance();
        }
    });
}
/**
 * 精确度随整数部分大小改变
 * @param value
 * @return
 */
function flexibleNumber( value){
    if(value<1&&value>-1){
        return CommaFormatted(floor(value,4),4);
    }else if((value>=1&&value<10)||(value<=-1&&value>-10)){
        return CommaFormatted(floor(value,3),3);
    }else{
        return CommaFormatted(floor(value,2),2);
    }
}
/**
 * 推送填充用户信息，并核算
 */
function trade_injectUserParam(pushjson){
    if(document.getElementById('bannerAccountBtcLast')==null || !islogin){
        return ;
    }
    _updateBannerHiddenInputByPush(pushjson);
    AccountingUserAccountInfo();
    if(document.getElementById("canpush")!=null){
        _ChangeBalance();
    }
}

/***
 * @param _money_CanUse 可用Cny
 * @param _amount_CanBuy 可买Coin
 * @param coin_CanSell 可卖币
 * @param _money_CanSell 卖币可得
 * @private
 */
function _ChangeBalance(){
    if(!islogin){
        return;
    }
    var _currentSymbol = document.getElementById('symbol').value;
    var _btc_last = Number(document.getElementById("bannerAccountBtcLast").value);
    var _ltc_last = Number(document.getElementById("bannerAccountLtcLast").value);
    var _btc_buy = Number(document.getElementById("bannerBtcBuy").value);
    var _btc_sell = Number(document.getElementById("bannerBtcSell").value);
    var _ltc_buy = Number(document.getElementById("bannerLtcBuy").value);
    var _ltc_sell = Number(document.getElementById("bannerLtcSell").value);
    var _cny_balance = Number(document.getElementById("bannerUserCnyBalance").value);
    var _ltc_balance = Number(document.getElementById("bannerUserLtcBalance").value);
    var _btc_balance = Number(document.getElementById("bannerUserBtcBalance").value);
    var _money_CanUse=0,_amount_CanBuy= 0,coin_CanSell= 0,_money_CanSell=0;
    // newCoinLabel
    if(_currentSymbol==0 || _currentSymbol=='0'){//btc
        _money_CanUse = floor(_cny_balance,2);
        coin_CanSell = floor(_btc_balance,4)
        if(_btc_last==0){
            _amount_CanBuy =0;
            _money_CanSell = 0;
        }else{
            _amount_CanBuy =floor(accDiv(floor(_cny_balance,2),_btc_last),4);
            _money_CanSell = floor(accMul(floor(_btc_balance,4),_btc_last),2);
        }
    }else if(_currentSymbol=='1' || _currentSymbol==1) {//ltc
        _money_CanUse = floor(_cny_balance, 2);
        coin_CanSell = floor(_ltc_balance, 4);

        if (_ltc_last == 0) {
            _amount_CanBuy = 0;
            _money_CanSell = 0;
        } else {
            _money_CanSell = floor(accMul(floor(_ltc_balance, 4), _ltc_last), 2);
            _amount_CanBuy = floor(accDiv(floor(_cny_balance, 2), _ltc_last), 4);
        }
    }
    var tradeTypeValue = 0;
    if(document.getElementById('tradeType')!=null ){
        tradeTypeValue =  document.getElementById('tradeType').value;
    }
    if(_currentSymbol==0){
        if(tradeTypeValue==1){//sell btc
            if(document.getElementById("userBalance")!=null){
                document.getElementById("userBalance").value=floor(_btc_balance,4);
                document.getElementById("userCoinBalance").value=floor(_btc_balance,4);
            }
        }else if(tradeTypeValue==0){ //buy btc
            document.getElementById("nowPrice").value = push.btcsell;
            if(document.getElementById("userBalance")!=null){
                document.getElementById("userBalance").value=floor(_cny_balance,4);
            }
        }
    }
    if(_currentSymbol==1){
        if(tradeTypeValue==1){//sell btc
            if(document.getElementById("userBalance")!=null){
                document.getElementById("userBalance").value=floor(_ltc_balance,4);
                document.getElementById("userCoinBalance").value=floor(_ltc_balance,4);
            }
        }else if(tradeTypeValue==0){ //buy btc
            document.getElementById("nowPrice").value = push.ltcsell;
            if(document.getElementById("userBalance")!=null){
                document.getElementById("userBalance").value=floor(_cny_balance,4);
            }
        }
    }
    if(document.getElementById("userCnyBalance")!=null){
        document.getElementById("userCnyBalance").value=_money_CanUse;
    }
    if(document.getElementById("cny")!=null){
        document.getElementById("cny").innerHTML=CommaFormatted(_money_CanUse,2);
    }
    if(document.getElementById("amount")!=null){
        document.getElementById("amount").innerHTML=CommaFormatted(_amount_CanBuy,4);
    }
    if(document.getElementById("klineuserBalance")!=null){
        document.getElementById("klineuserBalance").value=coin_CanSell;
    }
    if(document.getElementById("coinBalance")!=null){
        document.getElementById("coinBalance").innerHTML=CommaFormatted(coin_CanSell,4);
    }
    if(document.getElementById("klineuserCoinBalance")!=null){
        document.getElementById("klineuserCoinBalance").value=coin_CanSell;
    }
    if(document.getElementById("kmoney")!=null){
        document.getElementById("kmoney").innerHTML=CommaFormatted(_money_CanSell,2);
    }

}
/**
 * author suguangqiang
 * @param data_push 推送用户账户json数据
 */
function _updateBannerHiddenInputByPush(data_push){
    if(data_push == null || data_push ==  "undefined" || data_push == ''){
        return;
    }
    document.getElementById("bannerUserCnyBalance").value = data_push.cnyBalance;
    document.getElementById("bannerUserLtcBalance").value = data_push.ltcBalance;
    document.getElementById("bannerUserBtcBalance").value = data_push.btcBalance;
    document.getElementById("bannerFreezeBtcBalance").value = data_push.freezeBtcBalance;
    document.getElementById("bannerFreezeLtcBalance").value = data_push.freezeLtcBalance;
    document.getElementById("bannerFreezeCnyBalance").value = data_push.freezeCnyBalance;
}


/**
 *
 * @param pollingBannerUserAccountData 轮询用户账户json数据
 */
function bannerUserAccountPolling(pollingBannerUserAccountData){
    document.getElementById("lendBtc").value=pollingBannerUserAccountData.lendBtc;
    document.getElementById("lendLtc").value=pollingBannerUserAccountData.lendLtc;
    document.getElementById("lendCny").value=pollingBannerUserAccountData.lendCny;
    document.getElementById("bannerborrowsBtc").value=pollingBannerUserAccountData.bannerborrowsBtc;
    document.getElementById("bannerborrowsLtc").value=pollingBannerUserAccountData.bannerborrowsLtc;
    document.getElementById("bannerborowsCny").value=pollingBannerUserAccountData.bannerborowsCny;
    document.getElementById("bannerBinterestBtc").value=pollingBannerUserAccountData.bannerBinterestBtc;
    document.getElementById("bannerBinterestLtc").value=pollingBannerUserAccountData.bannerBinterestLtc;
    document.getElementById("bannerBinterestCny").value=pollingBannerUserAccountData.bannerBinterestCny;

    if(document.getElementById("bannerAccountBtcLast") && pollingBannerUserAccountData.bannerBtcLast!=null && pollingBannerUserAccountData.bannerBtcLast!='' && pollingBannerUserAccountData.bannerBtcLast!= 'undefined'){
        document.getElementById("bannerAccountBtcLast").value=pollingBannerUserAccountData.bannerBtcLast;
    }
    if(document.getElementById("bannerAccountLtcLast") && pollingBannerUserAccountData.bannerLtcLast!=null && pollingBannerUserAccountData.bannerLtcLast!='' && pollingBannerUserAccountData.bannerLtcLast!= 'undefined'){
        document.getElementById("bannerAccountLtcLast").value=pollingBannerUserAccountData.bannerLtcLast;
    }
    if(document.getElementById("bannerBtcBuy") && pollingBannerUserAccountData.bannerBtcBuy!=null && pollingBannerUserAccountData.bannerBtcBuy!='' && pollingBannerUserAccountData.bannerBtcBuy!= 'undefined'){
        document.getElementById("bannerBtcBuy").value=pollingBannerUserAccountData.bannerBtcBuy;
    }
    if(document.getElementById("bannerBtcSell") && pollingBannerUserAccountData.bannerBtcSell!=null && pollingBannerUserAccountData.bannerBtcSell!='' && pollingBannerUserAccountData.bannerBtcSell!= 'undefined'){
        document.getElementById("bannerBtcSell").value=pollingBannerUserAccountData.bannerBtcSell;
    }
    if(document.getElementById("bannerLtcBuy") && pollingBannerUserAccountData.bannerLtcBuy!=null && pollingBannerUserAccountData.bannerLtcBuy!='' && pollingBannerUserAccountData.bannerLtcBuy!= 'undefined'){
        document.getElementById("bannerLtcBuy").value=pollingBannerUserAccountData.bannerLtcBuy;
    }
    if(document.getElementById("bannerLtcSell") && pollingBannerUserAccountData.bannerLtcSell!=null && pollingBannerUserAccountData.bannerLtcSell!='' && pollingBannerUserAccountData.bannerLtcSell!= 'undefined'){
        document.getElementById("bannerLtcSell").value=pollingBannerUserAccountData.bannerLtcSell;
    }
    document.getElementById("bannerUserCnyBalance").value=pollingBannerUserAccountData.bannerUserCnyBalance;
    document.getElementById("bannerUserLtcBalance").value=pollingBannerUserAccountData.bannerUserLtcBalance;
    document.getElementById("bannerUserBtcBalance").value=pollingBannerUserAccountData.bannerUserBtcBalance;
    jQuery("#userBtcBalance").val(pollingBannerUserAccountData.bannerUserBtcBalance);
    jQuery("#userLtcBalance").val(pollingBannerUserAccountData.bannerUserLtcBalance);

    document.getElementById("bannerFreezeBtcBalance").value=pollingBannerUserAccountData.bannerFreezeBtcBalance;
    document.getElementById("bannerFreezeLtcBalance").value=pollingBannerUserAccountData.bannerFreezeLtcBalance;
    document.getElementById("bannerFreezeCnyBalance").value=pollingBannerUserAccountData.bannerFreezeCnyBalance;
    document.getElementById("bannerBorrowBtcBalance").value=pollingBannerUserAccountData.bannerBorrowBtcBalance;
    document.getElementById("bannerBorrowLtcBalance").value=pollingBannerUserAccountData.bannerBorrowLtcBalance;
    document.getElementById("bannerBorrowCnyBalance").value=pollingBannerUserAccountData.bannerBorrowCnyBalance;
    document.getElementById("bannerLendFreezeBtcBalance").value=pollingBannerUserAccountData.bannerLendFreezeBtcBalance;
    document.getElementById("bannerLendFreezeLtcBalanced").value=pollingBannerUserAccountData.bannerLendFreezeLtcBalanced;
    document.getElementById("bannerLendFreezeCnyBalance").value=pollingBannerUserAccountData.bannerLendFreezeCnyBalance;
    document.getElementById("bannerFundBtcBalance").value=pollingBannerUserAccountData.bannerFundBtcBalance;
    document.getElementById("bannerFundLtcBalance").value=pollingBannerUserAccountData.bannerFundLtcBalance;
    document.getElementById("bannerLendedOutBtcBalance").value = pollingBannerUserAccountData.bannerLendedOutBtcBalance;
    document.getElementById("bannerLendedOutLtcBalance").value = pollingBannerUserAccountData.bannerLendedOutLtcBalance;
    document.getElementById("bannerLendedOutCnyBalance").value = pollingBannerUserAccountData.bannerLendedOutCnyBalance;
    document.getElementById("bannerfutureAccountBtcRights").value=pollingBannerUserAccountData.bannerfutureAccountBtcRights;
    document.getElementById("bannerfutureAccountLtcRights").value=pollingBannerUserAccountData.bannerfutureAccountLtcRights;
}
/**
 * 根据推送的 数据 变更页面的 ltc btc 的  买一价格 卖一价格 和最新成交价格
 * @param tickerData
 */
function changeTickerByPush(data){
    if(document.getElementById('bannerAccountBtcLast')==null || !islogin){
        return ;
    }
    if(data!=null && data!='' &&  data!='undefined'){
        if(document.getElementById("bannerAccountBtcLast")!=null && data.btc.last!=null&& data.btc.last!='' && data.btc.last!='undefined'){
            document.getElementById("bannerAccountBtcLast").value = data.btc.last;
            push.btclast = Number(document.getElementById('bannerAccountBtcLast').value);
        }
        if(document.getElementById("bannerAccountLtcLast")!=null && data.ltc.last!=null&& data.ltc.last!='' && data.ltc.last!='undefined'){
            document.getElementById("bannerAccountLtcLast").value = data.ltc.last;
            push.btclast = Number(document.getElementById('bannerAccountLtcLast').value);
        }
        if(document.getElementById("bannerBtcBuy")!=null && data.btc.buy!=null&& data.btc.buy!='' && data.btc.buy!='undefined'){
            document.getElementById("bannerBtcBuy").value = data.btc.buy;
        }
        if(document.getElementById("bannerBtcSell")!=null && data.btc.sell!=null&& data.btc.sell!='' && data.btc.sell!='undefined'){
            document.getElementById("bannerBtcSell").value = data.btc.sell;
        }
        if(document.getElementById("bannerLtcBuy")!=null && data.ltc.buy!=null&& data.ltc.buy!='' && data.ltc.buy!='undefined'){
            document.getElementById("bannerLtcBuy").value = data.ltc.buy;
        }
        if(document.getElementById("bannerLtcSell")!=null && data.ltc.sell!=null&& data.ltc.sell!='' && data.ltc.sell!='undefined'){
            document.getElementById("bannerLtcSell").value = data.ltc.sell;
        }
        AccountingUserAccountInfo();
        if(document.getElementById("canpush")!=null) {
            _ChangeBalance();
        }
    }
}
/**
 * 核算并更新页面用户账户信息 suguangqiang
 */
function AccountingUserAccountInfo(){
    if(!islogin){
        return;
    }
    var account_bannerBtcLast = Number(document.getElementById("bannerAccountBtcLast").value);
    var account_bannerLtcLast = Number(document.getElementById("bannerAccountLtcLast").value);
    var account_bannerBtcBuy = Number(document.getElementById("bannerBtcBuy").value);
    var account_bannerBtcSell = Number(document.getElementById("bannerBtcSell").value);
    var account_bannerLtcBuy = Number(document.getElementById("bannerLtcBuy").value);
    var account_bannerLtcSell = Number(document.getElementById("bannerLtcSell").value);
    if(isNaN(account_bannerBtcLast)||isNaN(account_bannerLtcLast)||isNaN(account_bannerBtcBuy)||isNaN(account_bannerBtcSell)||isNaN(account_bannerLtcBuy)||isNaN(account_bannerLtcSell)){
        return ;
    }
    var account_Futureaccount = Number(document.getElementById('futureaccount_hidden').value);
    //合约使用 两个权益来计算合约账户余额
    var account_futrueBtcRights = Number(document.getElementById("bannerfutureAccountBtcRights").value);
    var account_futrueLtcRights = Number(document.getElementById("bannerfutureAccountLtcRights").value);
    var account_LendBtc = Number(document.getElementById("lendBtc").value);
    var account_LendLtc = Number(document.getElementById("lendLtc").value);
    var account_LendCny = Number(document.getElementById("lendCny").value);
    var account_bannerborrowsLtc = Number(document.getElementById("bannerborrowsLtc").value);
    var account_bannerborowsCny = Number(document.getElementById("bannerborowsCny").value);
    var account_bannerBinterestBtc = Number(document.getElementById("bannerBinterestBtc").value);
    var account_bannerBinterestLtc = Number(document.getElementById("bannerBinterestLtc").value);
    var account_bannerBinterestCny = Number(document.getElementById("bannerBinterestCny").value);

    var account_bannerUserCnyBalance = Number(document.getElementById("bannerUserCnyBalance").value);
    var account_bannerUserLtcBalance = Number(document.getElementById("bannerUserLtcBalance").value);
    var account_bannerUserBtcBalance = Number(document.getElementById("bannerUserBtcBalance").value);
    var account_bannerFreezeBtcBalance = Number(document.getElementById("bannerFreezeBtcBalance").value);
    var account_bannerFreezeLtcBalance = Number(document.getElementById("bannerFreezeLtcBalance").value);
    var account_bannerFreezeCnyBalance = Number(document.getElementById("bannerFreezeCnyBalance").value);
    var account_bannerBorrowBtcBalance = Number(document.getElementById("bannerBorrowBtcBalance").value);
    var account_bannerBorrowLtcBalance = Number(document.getElementById("bannerBorrowLtcBalance").value);
    var account_bannerBorrowCnyBalance = Number(document.getElementById("bannerBorrowCnyBalance").value);
    var account_bannerLendFreezeBtcBalance = Number(document.getElementById("bannerLendFreezeBtcBalance").value);
    var account_bannerLendFreezeLtcBalanced = Number(document.getElementById("bannerLendFreezeLtcBalanced").value);
    var account_bannerLendFreezeCnyBalance = Number(document.getElementById("bannerLendFreezeCnyBalance").value);
    var account_bannerFundBtcBalance = Number(document.getElementById("bannerFundBtcBalance").value);
    var account_bannerFundLtcBalance = Number(document.getElementById("bannerFundLtcBalance").value);
    var account_bannerLendedOutBtcBalance = Number(document.getElementById("bannerLendedOutBtcBalance").value);
    var account_bannerLendedOutLtcBalance = Number(document.getElementById("bannerLendedOutLtcBalance").value);
    var account_bannerLendedOutCnyBalance = Number( document.getElementById("bannerLendedOutCnyBalance").value);
    var futureaccountSum = accAdd_z(accMul_z(account_futrueBtcRights,account_bannerBtcLast),accMul_z(account_futrueLtcRights,account_bannerLtcLast));
    if(!isNaN(futureaccountSum)){
        account_Futureaccount = futureaccountSum;
    }
    //借贷账户 借出 BTC * 市价  LTC * 市价  + CNY
    var account_Sum_LendBtc = accAdd_z(accAdd_z(account_LendBtc,account_bannerLendFreezeBtcBalance),account_bannerLendedOutBtcBalance);
    var account_Sum_LendLtc = accAdd_z(accAdd_z(account_LendLtc,account_bannerLendFreezeLtcBalanced),account_bannerLendedOutLtcBalance);
    var account_Sum_LendCny = accAdd_z(accAdd_z(account_LendCny,account_bannerLendFreezeCnyBalance),account_bannerLendedOutCnyBalance);
    var account_lendValue = accAdd_z(accAdd_z(accMul_z(account_Sum_LendBtc,account_bannerBtcLast),accMul_z(account_Sum_LendLtc,account_bannerLtcLast)),account_Sum_LendCny);
    //交易账户BTC 可用BTC + 冻结BTC
    var  account_tradeBtc = accAdd_z(account_bannerUserBtcBalance,account_bannerFreezeBtcBalance);
    //交易账户LTC
    var  account_tradeLtc = accAdd_z(account_bannerUserLtcBalance,account_bannerFreezeLtcBalance);
    //交易账户 交易BTC * 市价 + 交易：LTC *市价　+可用CNY + 冻结CNY
    var account_tradeValue = accAdd_z(accAdd_z(accAdd_z(accMul_z(account_tradeBtc,account_bannerBtcLast),accMul_z(account_tradeLtc,account_bannerLtcLast)),account_bannerUserCnyBalance),account_bannerFreezeCnyBalance);
    //基金账户
    var account_fundValue = accAdd_z(accMul_z(account_bannerFundBtcBalance,account_bannerBtcLast),accMul_z(account_bannerFundLtcBalance,account_bannerLtcLast));
    //交易账户合计
    var account_asubtotalCnyValue = accAdd_z(account_bannerUserCnyBalance,account_bannerFreezeCnyBalance);
    var account_asubtotalBtcValue = accAdd_z(account_bannerFreezeBtcBalance,account_bannerUserBtcBalance);
    var account_asubtotalLtcValue = accAdd_z(account_bannerFreezeLtcBalance,account_bannerUserLtcBalance);
    //借贷合计
    var account_lsubtotalCnyValue = accAdd_z(accAdd_z(account_LendCny,account_bannerLendFreezeCnyBalance),account_bannerLendedOutCnyBalance);
    var account_lsubtotalBtcValue = accAdd_z(accAdd_z(account_LendBtc,account_bannerLendFreezeBtcBalance),account_bannerLendedOutBtcBalance);
    var account_lsubtotalLtcValue = accAdd_z(accAdd_z(account_LendLtc,account_bannerLendFreezeLtcBalanced),account_bannerLendedOutLtcBalance);
    //净资产CNY = 可用CNY + 冻结CNY -借款CNY - 减去利息
    var cny = DoubleUtil.subtract(DoubleUtil.subtract(accAdd_z(account_bannerUserCnyBalance,account_bannerFreezeCnyBalance),account_bannerBorrowCnyBalance),account_bannerBinterestCny);
    //净资产BTC = 可用BTC + 冻结BTC - 借款BTC - 利息BTC
    var btc = DoubleUtil.subtract(DoubleUtil.subtract(accAdd_z(account_bannerUserBtcBalance,account_bannerFreezeBtcBalance),account_bannerBorrowBtcBalance),account_bannerBinterestBtc);
    //净资产LTC = 可用LTC + 冻结LTC -借款LTC - 利息LTC
    var ltc = DoubleUtil.subtract(DoubleUtil.subtract(accAdd_z(account_bannerUserLtcBalance,account_bannerFreezeLtcBalance),account_bannerBorrowLtcBalance),account_bannerBinterestLtc);
    btc = accMul_z(btc, account_bannerBtcLast);
    ltc = accMul_z(ltc, account_bannerLtcLast);
    var account_uNetValue = accAdd_z(accAdd_z(cny,btc),ltc);

    //净资产
    var account_netasset = accAdd_z(accAdd_z(account_uNetValue,account_lendValue)<0?0:accAdd_z(accAdd_z(account_uNetValue,account_lendValue),account_fundValue),account_Futureaccount);
    //总资产
    var account_allasset = accAdd_z(accAdd_z(accAdd_z(account_tradeValue, account_lendValue),account_fundValue),account_Futureaccount);
    if(document.getElementById('futureaccount_bannerShow')!=null){
        document.getElementById('futureaccount_bannerShow').innerHTML=CommaFormatted(floor(account_Futureaccount,2),2);
    }
    if(document.getElementById('available.cny')!=null){
        //合约账户不做核算
        document.getElementById('available.cny').innerHTML=CommaFormatted(floor(account_bannerUserCnyBalance,2),2);
        document.getElementById('available.btc').innerHTML=flexibleNumber(account_bannerUserBtcBalance);
        document.getElementById('available.ltc').innerHTML=flexibleNumber(account_bannerUserLtcBalance);
        document.getElementById('frozen.cny').innerHTML=CommaFormatted(floor(account_bannerFreezeCnyBalance,2),2);
        document.getElementById('frozen.btc').innerHTML=flexibleNumber(account_bannerFreezeBtcBalance);
        document.getElementById('frozen.ltc').innerHTML=flexibleNumber(account_bannerFreezeLtcBalance);
        document.getElementById('allasset').innerHTML=CommaFormatted(floor(account_allasset,2),2);
        document.getElementById('netasset').innerHTML=CommaFormatted(floor(account_netasset,2),2);
        document.getElementById('tradeValue').innerHTML=CommaFormatted(floor(account_tradeValue,2),2);
        //account_uNetValue 若净资产< 0 那么显示 0
        document.getElementById('uNetValue').innerHTML=CommaFormatted(floor((account_uNetValue<0?0:account_uNetValue),2),2);
        document.getElementById('trade.available.cny').innerHTML=CommaFormatted(floor(account_bannerUserCnyBalance,2),2);
        document.getElementById('trade.available.btc').innerHTML=flexibleNumber(account_bannerUserBtcBalance);
        document.getElementById('trade.available.ltc').innerHTML=flexibleNumber(account_bannerUserLtcBalance);
        document.getElementById('trade.frozen.cny').innerHTML=CommaFormatted(floor(account_bannerFreezeCnyBalance,2),2);
        document.getElementById('trade.frozen.btc').innerHTML=flexibleNumber(account_bannerFreezeBtcBalance);
        document.getElementById('trade.frozen.ltc').innerHTML=flexibleNumber(account_bannerFreezeLtcBalance);
        if(document.getElementById('asubtotalCny')!=null){
            document.getElementById('asubtotalCny').innerHTML=CommaFormatted(floor(account_asubtotalCnyValue,2),2);
            document.getElementById('asubtotalBtc').innerHTML=flexibleNumber(account_asubtotalBtcValue);
            document.getElementById('asubtotalLtc').innerHTML=flexibleNumber(account_asubtotalLtcValue);
        }
        if(document.getElementById('fundValue_bannerShow')!=null){
            document.getElementById('fundValue_bannerShow').innerHTML = CommaFormatted(floor(account_fundValue,2),2);
        }
        if(document.getElementById('lendValue_bannerShow')!=null){
            document.getElementById('lendValue_bannerShow').innerHTML = CommaFormatted(floor(account_lendValue,2));
        }
    }
     var url = window.location.href;

    if(document.getElementById('canpush')!=null){

    }
    if(document.getElementById('canUseCny')!=null ){
        document.getElementById('canUseCny').innerHTML= CommaFormatted(floor(account_bannerUserCnyBalance,2),2);
    }
    if(document.getElementById('canBuyLTC')!=null){
        var canBuyLTC = '0.0000';
        if( push.ltclast !=0){
            canBuyLTC = CommaFormatted(floor(accDiv(account_bannerUserCnyBalance,account_bannerLtcLast),4),4);
            document.getElementById('canBuyLTC').innerHTML = canBuyLTC;
        }
    }
    if(document.getElementById('canSellLTC')!=null){
        document.getElementById('canSellLTC').innerHTML=CommaFormatted(floor(account_bannerUserLtcBalance,4),4);
    }
    if(document.getElementById('cangetLTCCny')!=null){
        var cangetLTCCny ="0.00"
        if( push.ltclast !=0) {
            cangetLTCCny = CommaFormatted(floor(accMul(floor(account_bannerUserLtcBalance,4), account_bannerLtcLast),2),2);
            document.getElementById('cangetLTCCny').innerHTML = cangetLTCCny;
        }
    }

    if(document.getElementById('userCnyBalance')!=null){
        document.getElementById('userCnyBalance').value=  account_bannerUserCnyBalance;
    }
    if(document.getElementById('canBuyBTC')!=null){
        var  canBuyBTC = '0.00';
        if( push.btclast !=0){
            canBuyBTC = CommaFormatted(floor(account_bannerUserCnyBalance/account_bannerBtcLast,4),4);
            document.getElementById('canBuyBTC').innerHTML = canBuyBTC;
        }
    }

    if(document.getElementById('canSellBTC')!=null){
        document.getElementById('canSellBTC').innerHTML=CommaFormatted(floor(account_bannerUserBtcBalance,4),4);
    }
    if(document.getElementById('canGetCny')!=null){

        if( account_bannerBtcLast !=0) {
            canGetCny = CommaFormatted(floor(accMul(account_bannerUserBtcBalance, account_bannerBtcLast), 2),2);
            document.getElementById('canGetCny').innerHTML = canGetCny;
        }
    }

    if(document.getElementById("canpush")!=null){
        _ChangeBalance();
    }
}
//----------suguagnqiang end

function changeDepthImg_com(){
    var dept = new CookieClass();
    var deptMerge=dept.getCookie("deptMerge_stock");
    if(deptMerge==0){
        jQuery("#deptMerge_stock_btn IMG:eq(0)").css("display","");
        jQuery("#deptMerge_stock_btn IMG:eq(1)").css("display","none");
    }else{
        jQuery("#deptMerge_stock_btn IMG:eq(0)").css("display","none");
        jQuery("#deptMerge_stock_btn IMG:eq(1)").css("display","");
    }
}
var deptMerge_m=Number(getCookieValue("deptMerge_stock"));
// 0，阶梯 1，全部
function deptMerge_com_new(arg){
    var value;

    // 三选一
    jQuery("#deptMerge_burst_btn a").each(function(i, val){
        if (jQuery(val).hasClass('cur')) {
            value = jQuery(val).attr('code');
        }
    });

    var deptMerge=getCookieValue("deptMerge_stock");

    if(!deptMerge){
        deptMerge=0;
    }else if ( deptMerge == value) {
        return ;
    }
    deptMerge_m = value;

    if ( isConnect ) {

        if ( arg == 1) {
            var symbol=jQuery("#getSymbolValue").val();
            commonDept.switch_arg_1(value, symbol);
        } else {
            var symbol=jQuery("#symbol").val();
            commonDept.switch_arg_0(value, symbol);
        }

    }
    setCookieValue("deptMerge_stock", value);
    //changeDepthImg_com();
}

// 原方法
function deptMerge_com(value,arg){
    var deptMerge=getCookieValue("deptMerge_stock");
    var deptMerge_Current=0;
    if(deptMerge==0||deptMerge==null||deptMerge==""){
        deptMerge_Current=1;
        setCookieValue("deptMerge_stock", 1);
        deptMerge_m = 1;
        jQuery("#depthMergeStock").val(1);
        cacheDepth.clean();//清除浏览器缓存
    }else  if(deptMerge==1 || deptMerge == 2){
        deptMerge_Current=0;
        setCookieValue("deptMerge_stock", 0);
        deptMerge_m = 0;
        jQuery("#depthMergeStock").val(0);
    }
    changeDepthImg_com();
    if(isConnect){
        if(arg==1){
            var symbol=jQuery("#getSymbolValue").val();
            var deptMergeReal=getCookieValue("deptMerge_stock");
            if(Number(deptMergeReal)==1){
                commonDept.removeMarketAll(symbol)
                commonDept.push(symbol);
            }else{
                commonDept.remove(symbol);
                commonDept.pushMarketAll(symbol);
            }
            return;
        }
        var symbol=jQuery("#symbol").val();
        var deptMergeReal=getCookieValue("deptMerge_stock");
        if(Number(deptMergeReal)==1){
            commonDept.removeAll(symbol)
            commonDept.push(symbol);
        }else{
            commonDept.remove(symbol);
            commonDept.pushAll(symbol);
        }
    }
}
//newCoinLabel
var commonDept=new function(){
    this.push=function(symbol){
        this.request("addPushType",symbol);
    }
    this.remove=function(symbol){
        this.request("removePushType",symbol);
    }
    this.pushAll=function(symbol){
        this.requestAll("addPushType",symbol);
    }
    this.removeAll=function(symbol){
        this.requestAll("removePushType",symbol);
    }
    this.push01=function(symbol){
        this.request01("addPushType",symbol);
    }
    this.remove01=function(symbol){
        this.request01("removePushType",symbol);
    }
    this.pushMarketAll=function(symbol){
        this.requestMarketAll("addPushType",symbol);
    }
    this.removeMarketAll=function(symbol){
        this.requestMarketAll("removePushType",symbol);
    }
    this.request=function(type,symbol){
        switch(Number(symbol)){
            case 0:
                socket.emit(type, "{millInterval : 300,type : 'ok_btc_depth_merge',binary:"+isBinary+"}");
                break;
            case 1:
                socket.emit(type, "{millInterval : 300,type : 'ok_ltc_depth_merge',binary:"+isBinary+"}");
                break;
        }
    }
    this.requestAll=function(type,symbol){
        switch(Number(symbol)){
            case 0:
                socket.emit(type, "{millInterval : 300,type : 'r_btc5Depth_ticker',binary:"+isBinary+"}");
                break;
            case 1:
                socket.emit(type, "{millInterval : 300,type : 'r_ltc5Depth_ticker',binary:"+isBinary+"}");
                break;
        }
    }
    this.requestMarketAll=function(type,symbol){
        socket.emit(type, "{millInterval : 300,type : 'ok_ltc_ticker',binary:"+isBinary+"}");
        socket.emit(type, "{millInterval : 300,type : 'ok_btc_ticker',binary:"+isBinary+"}");//行情推送
        switch(Number(symbol)){
            case 0:
                socket.emit(type, "{millInterval : 300,type : 'ok_btc_depth_driven_200',binary:"+isBinary+"}");
                socket.emit(type, "{millInterval : 300,type : 'ok_btc_deal',binary:"+isBinary+"}");//成交
                break;
            case 1:
                socket.emit(type, "{millInterval : 300,type : 'ok_ltc_depth_driven_200',binary:"+isBinary+"}");
                socket.emit(type, "{millInterval : 300,type : 'ok_ltc_deal',binary:"+isBinary+"}");
                break;
        }
    }
    this.request01=function(type,symbol){
       switch(Number(symbol)){
           case 0:
               if(site_flag == 1) {
                    socket.emit(type, "{millInterval : 300,type : 'ok_btc_depth_merge_01',binary:"+isBinary+"}");
               }
               break;
       }
    }

    this.pushTest = function(arrays) {
        for ( var i = 0; i < arrays.length; i++) {
            socket.emit("addPushType", "{millInterval : 300,type : '"+ arrays[i] +"',binary:"+isBinary+"}");
        }
    }

    this.removeTest=function(arrays){
        for ( var i = 0; i < arrays.length; i++) {
            socket.emit("removePushType", "{millInterval : 300,type : '"+ arrays[i] +"',binary:"+isBinary+"}");
        }
    }
    // 行情图表
    this.switch_arg_1=function(value, symbol) {
        var arrays_push = new Array() ;
        var arrays_remove = new Array();
        switch (Number(value)) {
            case 0:
                if ( Number(symbol) == 0 ) {
                    arrays_push = ['ok_ltc_ticker', 'ok_btc_ticker', 'ok_btc_depth_driven_200', 'ok_btc_deal'];
                    arrays_remove = ['ok_btc_depth_merge_01', 'ok_btc_depth_merge'];
                } else {
                    arrays_push = ['ok_ltc_ticker', 'ok_btc_ticker', 'ok_ltc_depth_driven_200', 'ok_ltc_deal'];
                    arrays_remove = ['ok_ltc_depth_merge'];
                }
                break;
            case 1:
                if ( Number(symbol) == 0 ) {
                    arrays_push = ['ok_btc_depth_merge'];
                    arrays_remove = ['ok_ltc_ticker', 'ok_btc_ticker', 'ok_btc_depth_driven_200', 'ok_btc_deal', 'ok_btc_depth_merge_01'];
                } else {
                    arrays_push = ['ok_ltc_depth_merge'];
                    arrays_remove = ['ok_ltc_ticker', 'ok_btc_ticker', 'ok_ltc_depth_driven_200', 'ok_ltc_deal'];
                }
                break;
            case 2:
                if ( Number(symbol) == 0 && site_flag == 1) {
                    arrays_push = ['ok_btc_depth_merge_01'];
                    arrays_remove = ['ok_ltc_ticker', 'ok_btc_ticker', 'ok_btc_depth_driven_200', 'ok_btc_deal', 'ok_btc_depth_merge'];
                } else if (Number(symbol) == 1) {

                }
                break;
        }
        commonDept.removeTest(arrays_remove);
        commonDept.pushTest(arrays_push);
    }
    // 交易中心
    this.switch_arg_0=function(value, symbol) {
        var arrays_push = new Array() ;
        var arrays_remove = new Array();
        switch (Number(value)) {
            case 0:
                if ( Number(symbol) == 0 ) {
                    arrays_push = ['r_btc5Depth_ticker'];
                    arrays_remove = ['ok_btc_depth_merge_01', 'ok_btc_depth_merge'];
                } else {
                    arrays_push = ['r_ltc5Depth_ticker'];
                    arrays_remove = ['ok_btc_depth_merge'];
                }
                break;
            case 1:
                if ( Number(symbol) == 0 ) {
                    arrays_push = ['ok_btc_depth_merge'];
                    arrays_remove = ['r_btc5Depth_ticker', 'ok_btc_depth_merge_01'];
                } else {
                    arrays_push = ['ok_ltc_depth_merge'];
                    arrays_remove = ['r_ltc5Depth_ticker'];
                }
                break;
            case 2:
                if ( Number(symbol) == 0 && site_flag == 1) {
                    arrays_push = ['ok_btc_depth_merge_01'];
                    arrays_remove = ['r_btc5Depth_ticker', 'ok_btc_depth_merge'];
                } else if (Number(symbol) == 1) {

                }
                break;
        }
        commonDept.removeTest(arrays_remove);
        commonDept.pushTest(arrays_push);
    }
}
function closeWebchart(){
	document.getElementById("phplive_btn_1413342318").style.display = "none";
	document.getElementById("onoffline").style.display = "none";
	var url = "/user/invildOnofflineCookie.do?random="+Math.round(Math.random()*100);
	jQuery.post(url,null,function(data){});
}

//点击关闭按钮后关闭页面黄色的提示信息
jQuery(".noticeClose").click(function(){
	var closeFlag = jQuery(this).parent().find("#closeFlag").val();
	jQuery(this).parent().hide();
	//如果关闭合约页面“买入卖出说明”，刚对上面输入框部分设置新的样式
	if(closeFlag == "futureExplain"){
		jQuery("#submitBodyNew").addClass("submitBodyNew");
		jQuery("#explanationfuFlag").val(0);
	}
	var url = "/user/closeNoticeCookie.do?closeFlag="+closeFlag+"&random="+Math.round(Math.random()*100);
	jQuery.post(url,null,function(data){});
});
function closeShowDynamic(id){
	jQuery(".noticeCloseNews").parent().hide();
	var url = "/user/closeNewsCookie.do?id="+id+"&random="+Math.round(Math.random()*100);
	jQuery.post(url,null,function(data){
		// 重新加载公告
		if(document.getElementById("ipalert")){
			jQuery("#ipalert").load("/user/showIpAlert.do",function(){
			});
		}
	});
}

function getMarket()
{
    jQuery.getJSON("/refreshExchangeTicker.do?t="+Math.random(),function(data){
        for (var i = 0; i < data.length; i++) {
            var sitedata = data[i];
            var sitetag = sitedata.marketFrom;
            var rate = jQuery("#rate_cny").val();
            var lastpricecny = 0;
            var lastpriceusd = 0;
            var buy = 0;
            var sell = 0;
            if(sitedata.moneytype==1){
                lastpricecny =accMul(sitedata.last,rate);
                lastpriceusd = sitedata.last;
                buy = sitedata.buy;
                sell = sitedata.sell;
            }else{
                lastpriceusd = sitedata.last/rate;
                lastpricecny = sitedata.last;
                buy = sitedata.buy;
                sell = sitedata.sell;
            }
            get_check(sitetag,lastpricecny);
            //newCoinLabel
            var symbolsign = "$";
            if(sitedata.moneytype==0){
                symbolsign = "¥";
            }
            if(lastpricecny != 0){
                jQuery("#"+sitetag+"_last_price").text("¥"+CommaFormatted(lastpricecny,2));
            }else{
                jQuery("#"+sitetag+"_last_price").text(indexNoData);
            }
            if(lastpriceusd != 0){
                jQuery("#"+sitetag+"_last_price_u").text("$"+CommaFormatted(lastpriceusd,2));
            }else{
                jQuery("#"+sitetag+"_last_price_u").text(indexNoData);
            }
            if(buy != 0){
                jQuery("#"+sitetag+"_buy_price").text(symbolsign+CommaFormatted(buy,2));
            }else{
                jQuery("#"+sitetag+"_buy_price").text(indexNoData);
            }
            if(sell != 0){
                jQuery("#"+sitetag+"_sell_price").text(symbolsign+CommaFormatted(sell,2));
            }else{
                jQuery("#"+sitetag+"_sell_price").text(indexNoData);
            }
            if(sitedata.volume != 0){
                jQuery("#"+sitetag+"_volume").text(SYMBOLS_UTIL.symbolStr[Number(sitedata.symbol)]+CommaFormatted(sitedata.volume,2));
            }else{
                jQuery("#"+sitetag+"_volume").text(indexNoData);
            }
        }
    });
}
function get_check(st1,st2)
{
    if(st2==0){
        jQuery("#"+st1+"_last_price_image").removeClass();
        return;
    }
    var last_price = 0;
    if(jQuery("#"+st1+"_last_price").text()!=indexNoData){
       last_price = jQuery("#"+st1+"_last_price").text().replace(/,/,"");
    }
    var val1=CommaFormatted(last_price,2);
    var val2=CommaFormatted(st2,2);
    if(val1<val2){
        jQuery("#"+st1+"_last_price_image").removeClass("rightImgDown");
        jQuery("#"+st1+"_last_price_image").addClass("rightImgUp");
    }else if(val1>val2){
        jQuery("#"+st1+"_last_price_image").removeClass("rightImgUp");
        jQuery("#"+st1+"_last_price_image").addClass("rightImgDown");
    }else{
        jQuery("#"+st1+"_last_price_image").removeClass();
    }
}
/**
 * 检查是否是btc地址(需要引入bitcoinjsok.js)
 * @returns true 是btc地址；false不是
 */
function isValidBTCAddr(targetAddress){
	//如果不是联系人校验是否是比特币地址如果不是地址返回false 是的话返回true
	try{
		if(typeof Bitcoin=="undefined"){
			return true;
		}
	    Bitcoin.Address.fromBase58Check(targetAddress);
	    return true;
	    console.log( targetAddress + " 是有效地址" );
	}catch (e){
	    console.log( targetAddress + " 不是有效地址，异常信息：" + e.toString());
	    return false;
	}
}
function isfuture() {
    var url = window.location.href;
    if (url != null && url.indexOf("future") != -1) {
        if(url.indexOf("futureFull.do")!=-1||url.indexOf("futurePublicity.do")!=-1){
            return false;
        }
        return true;
    }
    return false;
}

function testNetwork(){

    var t =new Date().getTime();
    jQuery.post("/testNetWork.do?t="+t,null,function(data){
        var a = new Date().getTime();
        changeNetWork(a-t);
        setTimeout(function(){
            testNetwork();
        },20000);
    }).error(function(){
        changeNetWork(-1);
        setTimeout(function(){
            testNetwork();
        },20000);
    });
}

function changeNetWork(differTime){

    if(differTime <= 1000){
        jQuery("#netWork").removeClass().addClass("wifi4");
    }else if(differTime > 1000){
        jQuery("#netWork").removeClass().addClass("wifi3");
    }else{//没信号
        jQuery("#netWork").removeClass().addClass("wifi0");
    }
}

function floatTigsOver(obj){
    var div = jQuery(obj).find(".floatTigsDiv");
    var word = jQuery(obj).attr("floatTigsWord");
    var id = jQuery(obj).attr("id");
	var widthLang = "";
	if(id=="tooLang1"){
		widthLang = " width:340px; "
	}else if(id=="explain30dayvolume"){
		widthLang = " width:230px; "
	}

//    var left = jQuery(obj).position().left;
//    var top = jQuery(obj).position().top;
    if(div.length == 0){
        jQuery(obj).append("<span style='position:absolute;left:-5px;bottom:25px;"+widthLang+"' class='bubbleCue floatTigsDiv'>"+word+"</span>");
    }else{
        jQuery(obj).find(".floatTigsDiv").html(word);
    }
    jQuery(obj).find(".floatTigsDiv").show();
}

function floatTigsOverTop(obj){
    var div = jQuery(obj).find(".floatTigsDiv");
    var word = jQuery(obj).attr("floatTigsWord");
    if(div.length == 0){
        jQuery(obj).append("<span style='position:absolute;right:-5px;top:22px;' class='bubbleCueLeft2 bubbleCueNew2 floatTigsDiv'>"+word+"</span>");
    }else{
        jQuery(obj).find(".floatTigsDiv").html(word);
    }
    jQuery(obj).find(".floatTigsDiv").show();
}

function floatTigsOut(){
	jQuery(".floatTigsDiv").hide();
}
/****分享微博，QQ Facebook Twitter等 ****/
function sendWeibo(type){
	var url;
	if(type==101){
		url = document.getElementById("articleUrl").value;
	}else{
		url = document.getElementById("coinMainUrl").value;
	}
	var desc;
	var summary;
	var title;
	var pic = '';
	if(type==0){
		desc =  document.getElementById("shareSummary").value;
		summary = document.getElementById("shareSummary").value;
		title = document.getElementById("shareTitle").value;
		//pic = document.getElementById("codeSpanPreUrl").value+'/image/active/okcoin_active.png';
	}
	if(type==101){
		desc =  document.getElementById("articleSummary").value;
		summary = document.getElementById("articleSummary").value;
		title = document.getElementById("articleTitle").value;
	}
	var p = {
		url:url, /*获取URL，可加上来自分享到QQ标识，方便统计*/
		desc:desc, /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
		title:title, /*分享标题(可选)*/
		summary:summary, /*分享摘要(可选)*/
		pic:pic, /*分享图片(可选)*/
		flash: '', /*视频地址(可选)*/
		site:'', /*分享来源(可选) 如：QQ分享*/
		style:'102',
		width:63,
		height:24
	};
	var s = [];
	for(var i in p){
		s.push(i + '=' + encodeURIComponent(p[i]||''));
	}
	var openurl = "http://service.weibo.com/share/share.php?"+s.join('&');
	window.open(openurl);
}
function sendToSeas(type){
	var url = document.getElementById("coinMainUrl").value;
	var openurl = "";
	if(type==1){//分享到facebook
		openurl = "http://www.facebook.com/sharer.php?u="+url;
	}else if(type==2){//分享到twitter
		openurl = "http://twitter.com/home/?status="+url;
	}

	window.open(openurl);
}

function sendQQ(type){
		var url;
		if(type==101){
			url = document.getElementById("articleUrl").value;
		}else{
			url = document.getElementById("coinMainUrl").value;
		}
		var desc;
		var pic = '';
		var summary;
		var title;
		if(type ==0){
			desc =  document.getElementById("shareSummary").value;
			//summary = document.getElementById("shareSummary").value;
			title = document.getElementById("shareTitle").value;
			//pic = document.getElementById("codeSpanPreUrl").value+'/image/active/okcoin_active.png';
		}
		if(type==101){
			desc =  document.getElementById("articleSummary").value;
			summary = document.getElementById("articleSummary").value;
			title = document.getElementById("articleTitle").value;
		}
		var p = {
			url:url, /*获取URL，可加上来自分享到QQ标识，方便统计*/
			desc:desc, /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
			title:title, /*分享标题(可选)*/
			summary:'', /*分享摘要(可选)*/
			pics:pic, /*分享图片(可选)*/
			flash: '', /*视频地址(可选)*/
			site:'', /*分享来源(可选) 如：QQ分享*/
			style:'102',
			width:63,
			height:24
		};
		var s = [];
		for(var i in p){
			s.push(i + '=' + encodeURIComponent(p[i]||''));
		}
		var openurl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?"+s.join('&');
		window.open(openurl);
}
function sendLinkedin(type){
	var url;
	if(type==101){
		url = document.getElementById("articleUrl").value;
	}else{
		url = document.getElementById("coinMainUrl").value;
	}
	var desc;
	var pic = '';
	var summary;
	var title;
	if(type ==0){
		desc =  document.getElementById("shareSummary").value;
		//summary = document.getElementById("shareSummary").value;
		title = document.getElementById("shareTitle").value;
		//pic = document.getElementById("codeSpanPreUrl").value+'/image/active/okcoin_active.png';
	}
	if(type==101){
		desc =  document.getElementById("articleSummary").value;
		summary = document.getElementById("articleSummary").value;
		title = document.getElementById("articleTitle").value;
	}
	var p = {
		url:url, /*获取URL，可加上来自分享到QQ标识，方便统计*/
		desc:desc, /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
		title:title, /*分享标题(可选)*/
		summary:'', /*分享摘要(可选)*/
		pics:pic, /*分享图片(可选)*/
		flash: '', /*视频地址(可选)*/
		site:'', /*分享来源(可选) 如：QQ分享*/
		style:'102',
		width:63,
		height:24
	};
	var s = [];
	for(var i in p){
		s.push(i + '=' + encodeURIComponent(p[i]||''));
	}
	var openurl = "http://www.linkedin.com/shareArticle?mini=true&"+s.join('&');
	window.open(openurl);
}
function sendWeixinFriend(){
	document.getElementById("WeiXinLayer").style.display="block";
}
function closeWechat(){
	document.getElementById('WeiXinLayer').style.display = 'none';
}
function isHaveKilne(){
    if(!!jQuery("#kline_iframe")&&!!jQuery("#kline_iframe")[0]&&!!jQuery("#kline_iframe")[0].contentWindow){
        return true;
    }else{
        return false;
    }
}
function isNewKline(){
    if(isHaveKilne()&&jQuery("#kline_iframe")[0].contentWindow._set_current_depth){
        return true;
    }else{
        return false;
    }
}
function getCookieValue(name){
    var mode=new CookieClass();
    var current_id=mode.getCookie(name);
    return current_id;
}
function setCookieValue(name,value,time){
    var real_time=-1;
    if(!!time){
        real_time=time;
    }
    var cookie = new CookieClass();
    cookie.expires=real_time;
    cookie.setCookie(name,value);
}
function forward_index(type){
		window.location.href = "/forwardIndex.do?forward_index="+type;
	}

/**
 * 公用下拉选择框－－显示出选择的内容层
 */
jQuery(".sel").live("click",function(){

	var $selSpan = jQuery(this);
	var $selContent = $selSpan.parent().find(".selContent");

	var className = "seled";
	//付款中当下拉框就一个值时不显示
	var showFlag = true;
	if($selSpan.attr("id") == "rechargeType" && $selContent.find("li").length < 2){
		showFlag = false;
	}
	if($selContent.is(":hidden") && showFlag){
		var codeValue = $selSpan.attr("codeValue");
		$selSpan.addClass(className);
		$selContent.show();
		//下拉选中当前值
		$selContent.find("li.cur").removeClass("cur");
		$selContent.find("li[code='" + codeValue + "']").addClass("cur");
		//移动后要去掉选中值
		$selContent.mouseover(function(){
			$selContent.find("li.cur").removeClass("cur");
		});
		jQuery("body").click(function(e){
			if($selContent.is(":visible") && jQuery(e.target).parent(".selContent").length==0){
				$selSpan.removeClass(className);
				$selContent.hide();
				stopBubble(e);
			}
		});
	}else{
		$selSpan.removeClass(className);
		$selContent.hide();
	}
});

/**
 * 公用下拉选择框－－选中后赋值到文本框
 */
jQuery(".selContent li").live("click",function(e){
	var $selContent = jQuery(this).parent();
	var className1 = "sel",
		className2 = "seled";
	var $selSpan = $selContent.parent().find("."+className1);

	$selSpan.attr("codeValue",jQuery(this).attr("code"));
	$selSpan.attr("title",jQuery(this).attr("title"));
	$selSpan.html(jQuery(this).html());

	$selSpan.removeClass(className2);
	$selContent.hide();
	jQuery("#nationtext").text('+'+jQuery(this).attr("code"));

	jQuery(this).parent().prev().trigger('selection_change');
});

function CheckIntensity(pwd){
  var Mcolor,Wcolor,Scolor,Color_Html,Word_Html;
  var m=0;
  var Modes=0;
  for(i=0; i<pwd.length; i++){
    var charType=0;
    var t=pwd.charCodeAt(i);
    if(t>=48 && t <=57){charType=1;}
    else if(t>=65 && t <=90){charType=2;}
    else if(t>=97 && t <=122){charType=4;}
    else{charType=4;}
    Modes |= charType;
  }
  for(i=0;i<7;i++){
  if(Modes & 1){m++;}
      Modes>>>=1;
  }
  if(pwd.length<=7){m=1;}
  if(pwd.length<=0){m=0;}
  switch(m){
    case 1 :
      Wcolor="pwd pwd_Weak_c";
      Mcolor="pwd pwd_c";
      Scolor="pwd pwd_c";
      Word_Html=get$("weak");// 弱
      Color_Html="pwd pwd_Weak_Word_c";
    break;
    case 2 :
      Wcolor="pwd pwd_Medium_c";
      Mcolor="pwd pwd_Medium_c";
      Scolor="pwd pwd_c";
      Word_Html=get$("middle");// 中
      Color_Html="pwd pwd_Medium_Word_c";
    break;
    case 3 :
      Wcolor="pwd pwd_Strong_c";
      Mcolor="pwd pwd_Strong_c";
      Scolor="pwd pwd_Strong_c";
      Word_Html=get$("strong");// 强
      Color_Html="pwd pwd_Strong_Word_c";
    break;
    default :
      Wcolor="pwd pwd_c";
      Mcolor="pwd pwd_c";
      Scolor="pwd pwd_c";
      Word_Html=get$("none");// 无
      Color_Html="pwd pwd_Word_c";
    break;
  }
  document.getElementById('pwd_Weak').className=Wcolor;
  document.getElementById('pwd_Medium').className=Mcolor;
  document.getElementById('pwd_Strong').className=Scolor;
  document.getElementById('pwd_html').className=Color_Html;
  document.getElementById('pwd_html').innerHTML=Word_Html;
}

/**
 * 重新发送验证邮件-用于邮件发送倒计时
 */
function CountDown(id,time){
	if(time>0){
		time=time-1;
		jQuery("#"+id).html(time+html_w);
		timer = setTimeout("CountDown('"+id+"',"+time+")",1000);
	}else{
		jQuery("#"+id).html(html);
	}
}

	// 初始化转账页面
	function transferInit(){
		var url = "/account/oneKeyTransferInfo.do";
		jQuery.post(url,function(data){
			if(data==null || data==""){
				window.location.href=document.getElementById("coinMainUrl").value;
			}
			var result = eval('(' + data + ')');
			transferAccounts = result["accounts"];
			transferCurrencys = result["currencys"];
			transferMaxBalanec = result["maxBalanec"];
			transferIsFund = result["isFund"];
			transferIsLendLoanAgreement = result["isLendLoanAgreement"];
			transferIsFuture = result["isFuture"];

			var currency = 0;
			var outType = 1;

			// 初始化转出、转入账户列表
			refreshTransferOutAccountBox(currency);
			refreshTransferIntAccountBox(outType,currency);
			// 初始化最大可转出金额显示
			refreshTransferMaxAmount(outType,currency);

			// 显示转账弹层
			document.getElementById("fundTransferPop").style.display="block";
    		dialogBoxShadow();
    		addMoveEvent("dialog_title_fundTransfer","dialog_content_fundTransfer");
		});
	}

	// 选择币种
	function currencySelectClick(currency){
		// 刷新转出账户列表
		refreshTransferOutAccountBox(currency);
		var outAccountSelect = document.getElementById("outAccountSelect");
		var outType = outAccountSelect.attributes["codeValue"].value;
		// 刷新转入账户列表
		refreshTransferIntAccountBox(outType,currency);
		// 刷新最大转出金额
		refreshTransferMaxAmount(outType,currency);

	}

	// 选择转出账户
	function outAccountSelectClick(outType){
		//alert("outType:"+outType);
		// 刷新转入账户列表
		var currencySelect = document.getElementById("currencySelect");
		var currency = currencySelect.attributes["codeValue"].value;
		refreshTransferIntAccountBox(outType,currency);

		// 显示到用户选择
		var outAccountSelect = document.getElementById("outAccountSelect");
		outAccountSelect.innerHTML = getTransferAccount(outType)+"<em>"+get$("cantransfer")+getTransferBalance(outType,currency)+"</em>";
		outAccountSelect.attributes["codeValue"].value = outType;

		// 刷新最大转出金额
		refreshTransferMaxAmount(outType,currency);
	}

    // 选择转入账户
	function intAccountSelectClick(intType){
		//alert("intType:"+intType);
		var currencySelect = document.getElementById("currencySelect");
		var currency = currencySelect.attributes["codeValue"].value;
		var outAccountSelect = document.getElementById("outAccountSelect");
		var outType = outAccountSelect.attributes["codeValue"].value;

		// 显示到用户选择
		var intAccountSelect = document.getElementById("intAccountSelect");
		intAccountSelect.innerHTML = getTransferAccount(intType)+"<em>"+get$("cantransfer")+getTransferBalance(intType,currency)+"</em>";
		intAccountSelect.attributes["codeValue"].value = intType;

		// 刷新最大转出金额
		refreshTransferMaxAmount(outType,currency);
	}

	// 刷新转出账户列表
	function refreshTransferOutAccountBox(currency){
		var outAccountSelect = document.getElementById("outAccountSelect");
		var outType = outAccountSelect.attributes["codeValue"].value;
		// 若当前显示的转出账户为已选择的转出账户，清空账户选择
 		var outAccountSelectBox = document.getElementById("outAccountSelectBox");
		outAccountSelectBox.innerHTML = "";

		for(var key in transferAccounts){
			if(!(currency == 20 && (key==2 || key==4))){
				var li = "<li id=\"int_"+key+"\" code=\""+key+"\" onclick=\"outAccountSelectClick("+key+")\">"+getTransferAccount(key)+
					"<em>"+get$("cantransfer")+getTransferBalance(key,currency)+"</em>"+"</li>";
				outAccountSelectBox.innerHTML = outAccountSelectBox.innerHTML + li;
				// 修改账户对应的余额
				if(outType==key){
					outAccountSelect.innerHTML = getTransferAccount(key)+"<em>"+get$("cantransfer")+getTransferBalance(key,currency)+"</em>";
				}
			}else if(outType==key){
				outAccountSelect.innerHTML = "";
				outAccountSelect.attributes["codeValue"].value = "-1";
			}
		}
	}

	// 刷新转入账户可选类型
 	function refreshTransferIntAccountBox(outType,currency){
		// 若当前显示的转入账户为已选择的转出账户，清空账户选择
		var intAccountSelect = document.getElementById("intAccountSelect");
		var intType = intAccountSelect.attributes["codeValue"].value;

 		var intAccountSelectBox = document.getElementById("intAccountSelectBox");
		intAccountSelectBox.innerHTML = "";

		for(var key in transferAccounts){
			if(!(currency == 20 && (key==2 || key==4)) && outType!=key){
				var li = "<li id=\"int_"+key+"\" code=\""+key+"\" onclick=\"intAccountSelectClick("+key+")\">"+getTransferAccount(key)+
					"<em>"+get$("cantransfer")+getTransferBalance(key,currency)+"</em>"+"</li>";
				intAccountSelectBox.innerHTML = intAccountSelectBox.innerHTML + li;
				// 修改账户对应的余额
				if(intType==key){
					intAccountSelect.innerHTML = getTransferAccount(key)+"<em>"+get$("cantransfer")+getTransferBalance(key,currency)+"</em>";
				}
			}else if(intType==key){
				intAccountSelect.innerHTML = "";
				intAccountSelect.attributes["codeValue"].value = "-1";
			}
		}

 	}

 	// 修改最大可转出金额
 	function refreshTransferMaxAmount(outType,currency){
 		var outAccountSelect = document.getElementById("outAccountSelect");
 		var transferNumberinput = document.getElementById("transferNumberinput");

 		if(outType<0){
 			outAccountSelect.innerHTML = "";
			outAccountSelect.attributes["codeValue"].value = "-1";
			transferNumberinput.value = "";
			transferNumberinput.attributes["placeholder"].value = get$("pleaseselecttransferoutccount");
			return ;
 		}

		var maxAmount = getTransferMaxAmount(outType,currency);

		var sign = "";
		if(currency==20){
			if(site_flag == 2){
				sign = "$";
			}else{
				sign = "￥";
			}
		}else if(currency==0){
			sign = "฿";
		}else if(currency==1){
			sign = "Ł";
		}
		transferNumberinput.value = "";
		maxAmount = CommaFormattedOnly(maxAmount);// 格式化数字显示
		transferNumberinput.attributes["placeholder"].value = get$("cantransferout")+maxAmount;

		var currencySign = document.getElementById("currencySign");
		currencySign.innerHTML = transferCurrencys[currency];
 	}

 	// 获得最大可转出金额
 	function getTransferMaxAmount(outType,currency){
 		if(outType<0){
 			return 0;
 		}
 		var maxAmount = transferMaxBalanec[outType+"_"+currency];

		// 联合理财的可持有BTC、LTC有限制，非别是50/1000
		var intAccountSelect = document.getElementById("intAccountSelect");
		var intType = intAccountSelect.attributes["codeValue"].value;
		var hasAmount = 0;
		if(intType==4){
			if(currency==0){
				hasAmount = transferMaxBalanec["4_0"];
				if(maxAmount+hasAmount>50){
					maxAmount = 50-hasAmount;
				}
			}else if(currency==1){
				hasAmount = transferMaxBalanec["4_1"];
				if(maxAmount+hasAmount>1000){
					maxAmount = 1000-hasAmount;
				}
			}
			if(maxAmount < 0){
				maxAmount = 0;
			}
		}
		//alert("currency:"+currency+" outType:"+outType+" intType:"+intType);
 		return maxAmount;
 	}

	// 根据账户编号获得账户名称
	function getTransferAccount(accountType){
		if(accountType==1){
			// 现货交易账户
			return get$("tradingaccountnew");
		}else if(accountType==2){
			// 合约交易账户
			return get$("futuresaccountnew");
		}else if(accountType==3){
			// 专户理财账户
			var languageType = jQuery("#languageType").val();//中英文切换
			if(languageType=="0"){
				return get$("marginaccountnew");
			}else if(languageType=="1"){
				return get$("lendingaccountnew");
			}else{
				return get$("marginaccountnew");
			}
		}else if(accountType==4){
			// 联合理财账户
			return get$("fundsaccountnew");
		}
	}

 	// 获得账户余额
 	function getTransferBalance(outType,currency){
 		if(outType<0){
 			return 0;
 		}
 		var maxAmount = transferMaxBalanec[outType+"_"+currency];

 		return CommaFormattedOnly(maxAmount);
 	}

 	// 交换转入、转出账户
 	function exchangeTransfer(){
 		// 获得转入、转出账户编号
 		var outAccountSelect = document.getElementById("outAccountSelect");
		var outType = outAccountSelect.attributes["codeValue"].value;
		var intAccountSelect = document.getElementById("intAccountSelect");
		var intType = intAccountSelect.attributes["codeValue"].value;

		if(intType<0 || outType<0){
			return;
		}
 		// 修改转入、转出显示
 		var accountHTML = outAccountSelect.innerHTML;
		outAccountSelect.attributes["codeValue"].value = intType;
		outAccountSelect.innerHTML = intAccountSelect.innerHTML;
		intAccountSelect.attributes["codeValue"].value = outType;
		intAccountSelect.innerHTML = accountHTML;

		var currencySelect = document.getElementById("currencySelect");
		var currency = currencySelect.attributes["codeValue"].value;
		// 限制输入账户选择
		refreshTransferIntAccountBox(intType,currency);
		// 刷新可划转最大金额
		if(currency>=0){
			refreshTransferMaxAmount(intType,currency);
		}

 	}

 	// 提交验证方法（判断用户是否开通账户，提醒开通）
 	function commitTransfer(){
 		var outAccountSelect = document.getElementById("outAccountSelect");
		var outType = outAccountSelect.attributes["codeValue"].value;
		var intAccountSelect = document.getElementById("intAccountSelect");
		var intType = intAccountSelect.attributes["codeValue"].value;
		var currencySelect = document.getElementById("currencySelect");
		var currency = currencySelect.attributes["codeValue"].value;
		var amount = document.getElementById("transferNumberinput").value;

		if(outType<0){
			setTransferMessage(get$("pleaseselecttransferoutccount"));
			return;
		}

		if(intType<0){
			setTransferMessage(get$("pleaseselecttransferinccount"));
			return;
		}

		if(currency<0){
			setTransferMessage(get$("pleaseselecttransfercurrency"));
			return;
		}

		if(amount==null || amount== "" || isNaN(amount) || amount<=0){
			setTransferMessage(get$("transferamountinvalid"));
			return;
		}

		var languageType = jQuery("#languageType").val();//中英文切换

		// 判断账户是否开通
		if((outType==4 || intType==4) && !transferIsFund){
			// 判断语言
			if(languageType=="0"){
				setTransferMessage("您尚未开通联合理财账户，请<a href=\""+hostAddress+"/lend/minLoan.do\">开通联合理财账户</a>后重新操作。");
			}else if(languageType=="1"){
				setTransferMessage("Please <a href=\""+hostAddress+"/lend/minLoan.do\">first enable the Funds feature</a>.");
			}else if(languageType=="2"){
				setTransferMessage("您尚未開通聯合理財賬戶，請<a href=\""+hostAddress+"/lend/minLoan.do\">開通聯合理財賬戶</a>后重新操作。");
			}else{
				setTransferMessage("您尚未开通联合理财账户，请<a href=\""+hostAddress+"/lend/minLoan.do\">开通联合理财账户</a>后重新操作。");
			}

			return;
		}else if((outType==3 || intType==3) && !transferIsLendLoanAgreement){
			if(site_flag == 2){
				// 判断语言
				if(languageType=="0"){
					setTransferMessage("您尚未开通P2P放贷账户，请<a href=\""+hostAddress+"/lend/lends.do\">开通P2P放贷账户</a>后重新操作。");
				}else if(languageType=="1"){
					setTransferMessage("Please <a href=\""+hostAddress+"/lend/lends.do\">first enable the Lending feature</a>.");
				}else if(languageType=="2"){
					setTransferMessage("您尚未開通P2P放貸賬戶，請<a href=\""+hostAddress+"/lend/lends.do\">開通P2P放貸賬戶</a>后重新操作。");
				}else{
					setTransferMessage("您尚未开通P2P放贷账户，请<a href=\""+hostAddress+"/lend/lends.do\">开通P2P放贷账户</a>后重新操作。");
				}
			}else{
				// 判断语言
				if(languageType=="0"){
					setTransferMessage("您尚未开通专户理财账户，请<a href=\""+hostAddress+"/lend/lends.do\">开通专户理财账户</a>后重新操作。");
				}else if(languageType=="1"){
					setTransferMessage("Please <a href=\""+hostAddress+"/lend/lends.do\">first enable the Margin feature</a>.");
				}else if(languageType=="2"){
					setTransferMessage("您尚未開通專戶理財賬戶，請<a href=\""+hostAddress+"/lend/lends.do\">開通專戶理財賬戶</a>后重新操作。");
				}else{
					setTransferMessage("您尚未开通专户理财账户，请<a href=\""+hostAddress+"/lend/lends.do\">开通专户理财账户</a>后重新操作。");
				}
			}
			return;
		}else if((outType==2 || intType==2) && !transferIsFuture){
			// 判断语言
			if(languageType=="0"){
				setTransferMessage("您尚未开通合约交易账户，请<a href=\""+hostAddress+"/future/invitationCode.do\">开通合约交易账户</a>后重新操作。");
			}else if(languageType=="1"){
				setTransferMessage("Please <a href=\""+hostAddress+"/future/invitationCode.do\">first enable the Futures feature</a>.");
			}else if(languageType=="2"){
				setTransferMessage("您尚未開通合約交易賬戶，請<a href=\""+hostAddress+"/future/invitationCode.do\">開通合約交易賬戶</a>后重新操作。");
			}else{
				setTransferMessage("您尚未开通合约交易账户，请<a href=\""+hostAddress+"/future/invitationCode.do\">开通合约交易账户</a>后重新操作。");
			}

			return;
		}

		if(amount > getTransferMaxAmount(outType,currency)){
			setTransferMessage(get$("yourtransferamountexceedslimit"));
			var transferNumberinput = document.getElementById("transferNumberinput");
			transferNumberinput.value = getTransferMaxAmount(outType,currency);
			return;
		}

		var url = "/account/oneKeyTransfer.do";
		var param={amount: amount ,outType: outType ,inType: intType ,symbol: currency ,autoConvertMargin:0};

 		var fundTransferBth = document.getElementById("fundTransferBth");
 		fundTransferBth.disabled="disabled";
 		// 开始划转
 		setTransferMessage(get$("transferring"));
 		jQuery.post(url,param,function(data){
 			var result = eval('(' + data + ')');
 			var value = result["value"];
			if(value!=null && value==1){
				// 划转成功
				setTransferMessage(get$("transfercompleted"));
				transferMaxBalanec = result["maxBalanec"];
				// 1秒后刷新页面
				setTimeout("location.reload([true]) ",1000);
			}else{
				setTransferMessage(get$("transferfailed"));
				dealTransferResult(value);
			}
			var fundTransferBth = document.getElementById("fundTransferBth");
	 		fundTransferBth.disabled=false;
			// 刷新转出账户列表
			refreshTransferOutAccountBox(currency);
			// 刷新转入账户列表
			refreshTransferIntAccountBox(outType,currency);
			// 刷新最大转出金额
			refreshTransferMaxAmount(outType,currency);
		});

 	}

 	// 根据返回的错误码输出相应的信息
 	function dealTransferResult(value){
 		switch(value)
 		{
 		case -1:
 			// 选择币种出错
 			setTransferMessage(get$("transferinvalidcurrency"));
 			break;

 		case -2:
 			// 输入金额出错
 			setTransferMessage(get$("transferinvalidamount"));
 			break;

 		case -3:
 			// 用户被冻结
 			setTransferMessage(get$("transferaccountfrozen"));
 			break;

 		case -4:
 			// 子账户被冻结
 			setTransferMessage(get$("transfersubaccountfrozen"));
 			break;

 		case -5:
 			setTransferMessage(get$("transferfailed"));
 			break;

 		case -6:
 			// 合约账户被冻结
 			setTransferMessage(get$("transferfuturesaccountfrozen"));
 			break;

 		case -7:
 			// 可转出金额不足
 			setTransferMessage(get$("transferamountexceedsbalance"));
 			break;

 		case -8:
 			// 超过转账额度
 			setTransferMessage(get$("transferexceededlimit"));
 			break;

 		case -9:
 			// 有借贷不能转入到联合理财账户
 			setTransferMessage(get$("transferhaveoutstandingloans"));
 			break;

 		case -10:
 			// 超过联合理财账户金额最大值
 			setTransferMessage(get$("transferexceedsmarginlimit"));
 			break;

 		case -11:
 			// 子账户不能转入到联合理财账户
 			setTransferMessage(get$("transfersubaccountcannottomarginaccount"));
 			break;

 		case -12:
 			// 尚未开通联合理财账户
 			setTransferMessage(get$("transferhavenotenabledmarginaccount"));
 			break;

 		case -13:
 			// 尚未开通合约交易账户
 			setTransferMessage(get$("transferhavenotenabledfuturesaccount"));
 			break;

 		case -14:
 			if(site_flag == 2){
 				// 尚未开通P2P放贷账户
 				setTransferMessage(get$("transferhavenotenabledfundsaccount"));
 			}else{
 				// 尚未开通专户理财账户
 				setTransferMessage(get$("transferhavenotenabledlendsaccount"));
 			}
 			break;

        case -15:
            //交割后15分内不能从合约转到现货
            setTransferMessage(get$("cacheTime"));
            break;

 		case -40:
 			// 根据相关法律，不能使用该功能
 			setTransferMessage(get$("functionisnotavailable"));
 			break;

 		case -41:
 			// 根据法律法规，目前只允许已签订书面协议的用户放款
 			setTransferMessage(get$("havenosignedthewrittenagreement"));
 			break;

 		default:
 			// 划转失败
 			setTransferMessage(get$("transferfailed"));
 		}
 	}

 	// 显示提示消息
 	var transferTime;
 	function setTransferMessage(message){
 		var transferMessage = document.getElementById("transferMessage");
 		transferMessage.innerHTML = message;
 		clearTimeout(transferTime);
 		transferTime = setTimeout("document.getElementById('transferMessage').innerHTML=''",5000);
 	}

 	function getPositionForInput(ctrl){
	    if(!ctrl){
	        return;
	    }
	    var CaretPos = 0;
	    if (document.selection) { // IE Support
	        ctrl.focus();
	        var Sel = document.selection.createRange();
	        Sel.moveStart('character', -ctrl.value.length);
	        CaretPos = Sel.text.length;
	    }else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support
	        CaretPos = ctrl.selectionStart;
	    }
	    return (CaretPos);
	}

 	// 限制划转金额输入
	function limitedTransfer(idName){
		var obj = document.getElementById(idName);

		var currencySelect = document.getElementById("currencySelect");
		var currency = currencySelect.attributes["codeValue"].value;

		var  priceSelectionStart = getPositionForInput(obj);
		if(currency<0){
			var transferNumberinput = document.getElementById("transferNumberinput");
			transferNumberinput.value = "";
		}else if(currency==20){
			obj.value = checkNumberByObj(obj,2);
		}else{
			obj.value = checkNumberByObj(obj,4);
		}
		setCursorPosition(obj,priceSelectionStart);
		// 判断输入金额，若超过可输入最大金额，则提示
 		var outAccountSelect = document.getElementById("outAccountSelect");
		var outType = outAccountSelect.attributes["codeValue"].value;
		if(obj.value > getTransferMaxAmount(outType,currency)){
			obj.value = getTransferMaxAmount(outType,currency);
			setTransferMessage(get$("transferamountexceedavailablebalance"));
		}

	}

	// 是否支持图片压缩（绘图）
	function isCanvasSupported(){
	    var elem = document.createElement('canvas');
	    return !!(elem.getContext && elem.getContext('2d'));
	}

	// 身份图片上传方法：图片文件、对应的键值、上传数据、回调方法
	function IdDocumentImageCompress(file,key,formdata,callback){

		// 是否支持压缩
		if(!isCanvasSupported()){
			formdata.append(key,file);
			uploadFormdata(formdata,state);
		}else{
			var reader = new FileReader();
			reader.readAsDataURL(file);
		}


		reader.onload = function (e) {
			var image = jQuery(document.createElement('img'));
	        image.on('load', function () {
	        	var square = 1200;
	      		var canvas = document.createElement('canvas');

				var imageWidth;
				var imageHeight;
				var offsetX = 0;
				var offsetY = 0;

				// 保存图片长宽比例，将大的一边设为1200
				if (this.width > this.height) {
					imageWidth = square;
					imageHeight = Math.round(square * this.height / this.width);
	           	} else {
	           		imageWidth = Math.round(square * this.width / this.height);
	            	imageHeight = square;
	           	}

	     		canvas.width = imageWidth;
	       		canvas.height = imageHeight;

				var context = canvas.getContext('2d');
				context.clearRect(0, 0, canvas.width, canvas.height);

// 	 			alert("imageWidth："+imageWidth+" imageHeight:"+imageHeight+" offsetX:"+offsetX+" offsetY:"+offsetY);
	            context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
	            var dataurl = canvas.toDataURL('image/jpeg');
	            var blob = dataURLtoBlob(dataurl);
// 	            alert("文件名:"+getFileName(file.name));
	            // 服务器对象键值、文件数据、文件名
	            formdata.append(key,blob,getFileName(file.name));

				callback(formdata);
			});

			image.attr('src', e.target.result);

		};

	}

	// dataURL数据转为Blob对象
	function dataURLtoBlob(dataurl) {
	    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	    while(n--){
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return new Blob([u8arr], {type:mime});
	}

	// 获得文件名
	function getFileName(path){
		var pos1 = path.lastIndexOf('/');
		var pos2 = path.lastIndexOf('\\');
		var pos  = Math.max(pos1, pos2)
		if( pos<0 )
			return path;
		else
			return path.substring(pos+1);
	}
jQuery("#viewNew").click(function(){
    setCookieValue("market_version",1);
    window.location.reload();
});
//合并深度
jQuery("#deptMerge_burst_btn").find("a").click(function(){
    jQuery("#deptMerge_burst_btn").find(".cur").removeClass("cur");
    jQuery(this).addClass("cur");
});

/** 判断是否显示活动入口 **/
function isActivityUser(activityNum,callback){
	var url = "/about/isActivityUser.do?random="+Math.round(Math.random()*100);
	var param={activityNum:activityNum};
	jQuery.post(url,param,function(date){
		if(date==1){
			callback();
		}
	},"text");
}

	// 限制银行卡输入
    function limitedAccountAddr(idName){
    	var obj = document.getElementById(idName);
    	var priceSelectionStart = getPositionForInput(obj);
    	obj.value = checkNumberByObj(obj,0);
    	setCursorPosition(obj,priceSelectionStart);
    }
