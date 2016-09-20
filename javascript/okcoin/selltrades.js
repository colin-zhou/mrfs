function klinetradeTurnoverValue(){
	klinetradeTurnoverValue(0,null);
}
//type :0 默认 type=1 price type=2 amount
function klinetradeTurnoverValue(type,event){
	var isreturn = ctrlAorTab(event);
	if(isreturn){
		return;
	}
	var klinetradeType = document.getElementById("klinetradeType").value;
	var klinesymbol = document.getElementById("klinesymbol").value;
	var klinetradeAmount = 0;
	var klinetradeCnyPrice = 0;
	if(type == 2){
		var  amountSelectionStart = getPositionForInput(document.getElementById("klinetradeAmount"));
		klinetradeAmount = document.getElementById("klinetradeAmount").value= checkNumberByName("klinetradeAmount");
		setCursorPosition(document.getElementById("klinetradeAmount"),amountSelectionStart);
	}else{
		klinetradeAmount = document.getElementById("klinetradeAmount").value;
	}
	if(type == 1){
		var  priceSelectionStart = getPositionForInput(document.getElementById("klinetradeCnyPrice"));
		klinetradeCnyPrice =document.getElementById("klinetradeCnyPrice").value =  checkNumberByName("klinetradeCnyPrice");
		setCursorPosition(document.getElementById("klinetradeCnyPrice"),priceSelectionStart);
	}else{
		klinetradeCnyPrice =document.getElementById("klinetradeCnyPrice").value;
	}
	
	var reg=/^(-?\d*)\.?\d{1,4}$/;
    if(klinetradeAmount!=null && klinetradeAmount.toString().split(".")!=null && klinetradeAmount.toString().split(".")[1]!=null && klinetradeAmount.toString().split(".")[1].length>4){
    	if(!reg.test(klinetradeAmount)){
        	document.getElementById("klinetradeAmount").value = klinetradeAmount.substring(0, klinetradeAmount.length-1);
            return false;
        }
    }
    if(klinetradeCnyPrice!=null && klinetradeCnyPrice.toString().split(".")!=null && klinetradeCnyPrice.toString().split(".")[1]!=null && klinetradeCnyPrice.toString().split(".")[1].length>4){
    	if(!reg.test(klinetradeCnyPrice)){
        	document.getElementById("klinetradeCnyPrice").value = klinetradeCnyPrice.substring(0, klinetradeCnyPrice.length-1);
            return false;
        }
    }
	var turnover = accMul(klinetradeAmount,klinetradeCnyPrice);
	if(turnover!= null && turnover.toString().split(".")!=null && turnover.toString().split(".")[1] != null && turnover.toString().split(".")[1].length>4){
		turnover=turnover.toFixed(4);		
	}
	document.getElementById("klinetradeTurnover").value = turnover;
	if(klinetradeType ==0){
		var klinetradeTurnover = klinetradeAmount*klinetradeCnyPrice;
		if(document.getElementById("klineuserBalance")!=null && Number(document.getElementById("klineuserBalance").value) < Number(klinetradeTurnover)){
			klinealertTipsSpan(buytradejs1);
			return;
		}else{
			klineclearTipsSpan();
		}
	}else{
		if(document.getElementById("klineuserBalance")!=null && Number(document.getElementById("klineuserBalance").value ) < Number(klinetradeAmount)){
			//newCoinLabel
			if(klinesymbol == 0){
				klinealertTipsSpan(buytradejs2);
			}else if (klinesymbol == 1) {
				klinealertTipsSpan(buytradejs3);
			}
			return;
		}else{
			klineclearTipsSpan();
		}
	}
}
var scheck = 1;
function klinesubmitTradeBtcForm(){
	if(scheck == 2){
		return;
	}
	var isLogin = document.getElementById("isLogin").value;
	if(isLogin==0){
		showlogin(0);
		return;
	}
	var klinetradeAmount =document.getElementById("klinetradeAmount").value;
	var klinetradeCnyPrice =document.getElementById("klinetradeCnyPrice").value;
	var klinetradePwd = trim(document.getElementById("klinetradePwd").value);
	var klinetradeType = document.getElementById("klinetradeType").value;
	var klinesymbol = document.getElementById("klinesymbol").value;
	var klineisopen = Number(document.getElementById("klineisopen").value);
	var islimited = document.getElementById("slimitedType").checked;
	var limited = 0;
	
	if(!islimited){
		if(klinetradeType ==0){
			var klinetradeTurnover = klinetradeAmount*klinetradeCnyPrice;
			if(document.getElementById("klineuserBalance")!=null &&  Number(document.getElementById("klineuserBalance").value) <  Number(klinetradeTurnover)){
				klinealertTipsSpan(buytradejs1);
				return;
			}else{
				klineclearTipsSpan();
			}
		}else{
			if(document.getElementById("klineuserBalance")!=null &&  Number(document.getElementById("klineuserBalance").value) <  Number(klinetradeAmount)){
				//newCoinLabel
				if(klinesymbol == 0){
					klinealertTipsSpan(buytradejs2);
				}else if(klineisopen == 1){
					klinealertTipsSpan(buytradejs3);
				}
				return;
			}else{
				klineclearTipsSpan();
			}
		}
		 var reg = new RegExp("^[0-9]+\.{0,1}[0-9]{0,8}$");
		 if(!reg.test(klinetradeAmount) ){
			 klinealertTipsSpan(buytradejs4);
			return;
		 }else{
				klineclearTipsSpan();
		}
		//newCoinLabel
		if(klinesymbol==0 && klinetradeAmount < 0.01){
			klinealertTipsSpan(buytradejs6);
			return;
		}else if(klinesymbol==1 && klinetradeAmount < 0.1){
			klinealertTipsSpan(buytradejs5);
			return;
		}else{
			klineclearTipsSpan();
		}
		 if(!reg.test(klinetradeCnyPrice) ){
			 klinealertTipsSpan(buytradejs7);
			return;
		 }else{
				klineclearTipsSpan();
		}	
	}else{
		limited = 1;
		var klinelimitedMoney = Number(document.getElementById("klinelimitedMoney").value);
		if(klinetradeType == 0){
			//newCoinLabel
			var snowPrice = 0;
			if (klinesymbol == 0) {
				snowPrice = accMul(0.01,Number(document.getElementById("snowPrice").value));
			} else if (klinesymbol == 1){
				snowPrice = accMul(0.1,Number(document.getElementById("snowPrice").value));
			}
			if(klinelimitedMoney < snowPrice){
				if(klinesymbol == 0){
					klinealertTipsSpan(buytradejs21);
				}else if (klineisopen == 1){
					klinealertTipsSpan(buytradejs22);
				}
				return;
			}
		}else{
			//newCoinLabel
			if(klinesymbol == 0){
				if(klinelimitedMoney < 0.01){
					klinealertTipsSpan(selltradejs1);
					return;
				}
			}else if(klinesymbol == 1){
				if(klinelimitedMoney < 0.1){
					klinealertTipsSpan(selltradejs2);
					return;
				}
			}
		}
		if(klinetradeType ==0){
			if(document.getElementById("klineuserBalance")!=null &&  Number(document.getElementById("klineuserBalance").value) <  klinelimitedMoney){
				klinealertTipsSpan(buytradejs1);
				return;
			}else{
				klineclearTipsSpan();
			}
			klinetradeCnyPrice = klinelimitedMoney;
		}else{
			if(document.getElementById("klineuserBalance")!=null &&  Number(document.getElementById("klineuserBalance").value) <  klinelimitedMoney){
				//newCoinLabel
				if(klinesymbol == 0){
					klinealertTipsSpan(buytradejs2);
				}else if (klineisopen == 1){
					klinealertTipsSpan(buytradejs3);
				}
				return;
			}else{
				klineclearTipsSpan();
			}
		}
		klinetradeAmount = klinelimitedMoney;
	}
	if(klinetradePwd == "" && klineisopen == 0){
		klinealertTipsSpan(entertransactionpassword);
		return;
	}else{
		document.getElementById("klinetradeBtcTips").style.display="";
		document.getElementById("klinetradeBtcTips").innerHTML="&nbsp;";
	}
	var url = "";
	if(klinetradeType ==0){
		url = "/trade/buyBtcSubmit.do?random="+Math.round(Math.random()*100);
	}else{
		url = "/trade/sellBtcSubmit.do?random="+Math.round(Math.random()*100);
	}
	klinetradePwd = klineisopen==1?"":klinetradePwd;
	var param={tradeAmount:klinetradeAmount,tradeCnyPrice:klinetradeCnyPrice,tradePwd:klinetradePwd,symbol:klinesymbol,limited:limited,isMarket:1};

    var lastPrice = 0 ;
	//newCoinLabel
    if(klinesymbol == 0 ){
        lastPrice = jQuery("#bannerAccountBtcLast").val();
    }else if(klinesymbol == 1){
        lastPrice = jQuery("#bannerAccountLtcLast").val();
    }

    if(!islimited){
        var callback = {okBack:function(){
            klinesubmitTradeBtcForm_post(url,param,klinetradeType,klinesymbol);
        },noBack:void(0)};


        var rate = accDiv(klinetradeCnyPrice,lastPrice);

        if(klinetradeType == 0 && rate >= 1.02){
            okcoinAlert(get$("tradeorderbuyalert"),true,callback);
            return ;
        }

        if(klinetradeType == 1 && rate <= 0.98){
            okcoinAlert(get$("tradeordersellalert"),true,callback);
            return ;
        }
    }



    klinesubmitTradeBtcForm_post(url,param,klinetradeType,klinesymbol);

}


function klinesubmitTradeBtcForm_post(url,param,klinetradeType,klinesymbol){
    scheck = 2;
    waitingStationStatic("klinebtnA",insubmiting);
    disabledStation("btnA");
    jQuery.post(url,param,function(data){
        var json = eval('(' + data + ')');
        if(json==null){
            return ;
        }
        var result = json.result;
        if(result==null){
            result = eval('(' + data + ')');
        }
        if(result!=null){
            if(result.resultCode != 0){
                scheck = 1;
            }
            if(result.resultCode == -1){
                if(klinetradeType ==0){
					//newCoinLabel
                    if(klinesymbol==1) klinealertTipsSpan(buytradejs9);
                    else if (klinesymbol == 0) klinealertTipsSpan(buytradejs8);
                }else{
					//newCoinLabel
                    if(klinesymbol==1) klinealertTipsSpan(selltradejs4);
                    else if (klinesymbol == 0) klinealertTipsSpan(selltradejs3);
                }
            }else if(result.resultCode == -2){
                if(result.errorNum == 0){
                    klinealertTipsSpan(buytradejs10);
                }else{
                    klinealertTipsSpan(buytradejs11+youhave+result.errorNum+chancesleft);
                }
                if(document.getElementById("klinetradePwd") != null){
                    document.getElementById("klinetradePwd").value = "";
                }
            }else if(result.resultCode == -3){
                klinealertTipsSpan(buytradejs13);
            }else if(result.resultCode == -4){
                klinealertTipsSpan(buytradejs14);
            }else if(result.resultCode == -5){
                klinealertTipsSpan(buytradejs15);
            }else if(result.resultCode == -6){
                okcoinAlert(buytradejs16,null,null,"");
            }else if(result.resultCode == -7){
                klinealertTipsSpan(buytradejs17);
            }else if(result.resultCode == -8){
                klinealertTipsSpan(entertransactionpassword);
            }else if(result.resultCode == 0){

                if(typeof(isConnect) == 'undefined' || !isConnect){
                    refreshTradeOrders();
                }
                var open = json.isOpen;
                if(open==1){
                    document.getElementById("isopen").value= open;
                    document.getElementById("klineisopen").value= open;
                    document.getElementById("tradePwdLi").style.display="none";
                    document.getElementById("klinetradePwdLi").style.display="none";
                }
                klinealertTipsSpan(buytradejs18);
                //sellChangeBalance();
                scheck =1;
                document.getElementById("klinetradePwd").value="";
                document.getElementById("klinetradeAmount").value="";
                document.getElementById("klinetradeTurnover").value="";
                document.getElementById("klinelimitedMoney").value="";
                setTimeout("klineclearTipsSpan()", "5000");
            }else if(result.resultCode == 2){
                klinealertTipsSpan(buytradejs19);
            }else if(result.resultCode == -200){
            	klinealertTipsSpan(get$("youfreezebymasterxia"));
            }else if(result.resultCode == 3){
                klinealertTipsSpan(buytradejs20);
            }else if (result.resultCode == -97) {
                klinealertTipsSpan(get$("tradesmallamountmore"));
            }
        }
    });
    clearWaitingStation("klinebtnA",immediatelysell);
    clearDisabledStation("btnA");
}

function sellChangeBalance(){
	var coinBalance = Number(document.getElementById("klineuserBalance").value);
	var moneyBalance = Number(document.getElementById("kmoney").innerHTML);
	var sellAmount =Number(document.getElementById("klinetradeAmount").value);
	var sellTurnover =Number(document.getElementById("klinetradeTurnover").value);
	var islimited = document.getElementById("slimitedType").checked;
	if(!islimited){
		var balance =accAdd(coinBalance,-sellAmount);
		var price = document.getElementById("snowPrice").value;
		var money =accMul(balance,price);
		balance = subPoint(balance);
		document.getElementById("klineuserBalance").value=balance;
		document.getElementById("coinBalance").innerHTML=balance;
		document.getElementById("klineuserCoinBalance").value=balance;
		document.getElementById("kmoney").innerHTML=money;
	}else{
		var limitedAmount = Number(document.getElementById("klinelimitedMoney").value);
		var price = document.getElementById("snowPrice").value;
		var amount  =accAdd(coinBalance,-limitedAmount) ;

		var money = accMul(amount, price);
		amount= subPoint(amount);
		document.getElementById("klineuserBalance").value=amount;
		document.getElementById("coinBalance").innerHTML=amount;
		document.getElementById("klineuserCoinBalance").value=amount;
		document.getElementById("kmoney").innerHTML=money;
	}
	
}
function refreshTradeOrders(){
	var klinesymbol = document.getElementById("klinesymbol").value;
	var url  ="/tradeOrdersRefresh.do?symbol="+klinesymbol;
    jQuery.post(url,null,function(data){
        if (data == null || data == "") {
            return;
        }
        jQuery("#tradeOrderTable").html(data);
    });

	handleTicker();
}
function klineclearTipsSpan(){
	document.getElementById("klinetradeBtcTips").style.display="";
	document.getElementById("klinetradeBtcTips").innerHTML="";
}

function klinealertTipsSpan(tips){
	document.getElementById("klinetradeBtcTips").style.display="";
	document.getElementById("klinetradeBtcTips").innerHTML=tips;
}

function klinesummoneyValue(event){
	var isreturn = ctrlAorTab(event);
	if(isreturn){
		return;
	}
	var klinetradeType = document.getElementById("klinetradeType").value;
	var klinesymbol = document.getElementById("klinesymbol").value;
	var  turnoverSelectionStart = getPositionForInput(document.getElementById("klinetradeTurnover"));
	var klinetradeTurnover = document.getElementById("klinetradeTurnover").value=checkNumberByName("klinetradeTurnover");
	setCursorPosition(document.getElementById("klinetradeTurnover"),turnoverSelectionStart);
	var klinetradeCnyPrice = document.getElementById("klinetradeCnyPrice").value;
	var klinetradeAmount =document.getElementById("klinetradeAmount").value;
	klinetradeAmount = klinetradeTurnover/klinetradeCnyPrice;
	if(klinetradeAmount!= null && klinetradeAmount.toString().split(".")!=null &&klinetradeAmount.toString().split(".")[1] != null && klinetradeAmount.toString().split(".")[1].length>4){
		klinetradeAmount=klinetradeAmount.toFixed(5);		
		klinetradeAmount = klinetradeAmount.substring(0, klinetradeAmount.length-1);
	}
	document.getElementById("klinetradeAmount").value=klinetradeAmount;
	var reg=/^(-?\d*)\.?\d{1,4}$/;
    if(klinetradeTurnover!=null && klinetradeTurnover.toString().split(".")!=null && klinetradeTurnover.toString().split(".")[1]!=null && klinetradeTurnover.toString().split(".")[1].length>4){
    	if(!reg.test(klinetradeTurnover)){
        	document.getElementById("klinetradeTurnover").value = klinetradeTurnover.substring(0, klinetradeTurnover.length-1);
            return false;
        }
    }
	if(klinetradeType ==0){
		if(document.getElementById("klineuserBalance")!=null && Number(document.getElementById("klineuserBalance").value) < Number(klinetradeTurnover)){
			klinealertTipsSpan(buytradejs1);
			return;
		}else{
			klineclearTipsSpan();
		}
	}else{
		if(document.getElementById("klineuserBalance")!=null && Number(document.getElementById("klineuserBalance").value ) < Number(klinetradeAmount)){
			//newCoinLabel
			if(klinesymbol == 0){
				klinealertTipsSpan(buytradejs2);
			}else if(klinesymbol == 1){
				klinealertTipsSpan(buytradejs3);
			}
			return;
		}else{
			klineclearTipsSpan();
		}
	}
}

function klinelimitedSummoneyValue(){
	var klinelimitedMoney = document.getElementById("klinelimitedMoney");
	var klinetradeType = document.getElementById("klinetradeType").value;
	var length = klinetradeType==0?2:4;
	var priceSelectionStart = getPositionForInput(klinelimitedMoney);
	var money =klinelimitedMoney.value=(function (a) {return a.length > 1 ? a.shift().replace(/\D/g, '') + '.' + a.join('').replace(/\D/g, '').slice(0, length) : a[0].replace(/\D/g,'');})(klinelimitedMoney.value.split('.'));
	setCursorPosition(klinelimitedMoney,priceSelectionStart);
	var klinesymbol = document.getElementById("klinesymbol").value;
	if(klinetradeType == 0){
		var klineuserBalance = Number(document.getElementById("userCnyBalance").value);
		if(money > klineuserBalance){
			klinealertTipsSpan(buytradejs1);
			return;
		}
	}else{
		var coinBalance = Number(document.getElementById("klineuserCoinBalance").value);
		if(money > coinBalance){
			//newCoinLabel
			if(klinesymbol == 0){
				klinealertTipsSpan(buytradejs2);
			}else if(klinesymbol == 1){
				klinealertTipsSpan(buytradejs3);
			}
			return;
		}
	}
	klineclearTipsSpan();
}

function getEntrust(){
	var status =  document.getElementById("selectedStatus").value;
	window.location.href = "/trade/entrust.do?status="+status;
}

function sellautoTrade(index){
	
	document.getElementById("limitedType").checked = "";
	limitedTypeChange();
	var priceNum = 0;
	var amountNum = 0;
	
	var name = "sell";
	var priceName = name+"Price"+index;
	priceNum =	Number(document.getElementById(priceName).value);
	for ( var i = 1; i <= index; i++) {
		var amountName = name+"Amount"+i;
		var amount = Number(document.getElementById(amountName).value);
		amountNum = accAdd(amountNum,amount);
	}
	var money = Number(document.getElementById("userCnyBalance").value);
	var moneyNum = amountNum * priceNum;
	var reg=/^(-?\d*)\.?\d{1,2}$/;
	if(money!=null && money.toString().split(".")!=null && money.toString().split(".")[1]!=null && money.toString().split(".")[1].length>2){
		if(!reg.test(money)){
			var end =  money.toString().split(".")[1];
			if(end.length>2){
				end = end.substring(0, 2);
			}
			money = money.toString().split(".")[0]+"."+end;
		}
	}
    amountNum = round(amountNum,4);
	if(money < moneyNum){
		document.getElementById("tradeCnyPrice").value = priceNum;
		document.getElementById("tradeTurnover").value = money;
		summoneyValue();
	}else{
		document.getElementById("tradeCnyPrice").value = priceNum;
		document.getElementById("tradeAmount").value = amountNum;
		tradeTurnoverValue();
	}
}
function antoTurnover(money){
	var reg=/^(-?\d*)\.?\d{1,2}$/;
	if(money!=null && money.toString().split(".")!=null && money.toString().split(".")[1]!=null && money.toString().split(".")[1].length>2){
    	if(!reg.test(money)){
    		var end =  money.toString().split(".")[1];
    		if(end.length>2){
    			end = end.substring(0, 2);
    		}
    		money = money.toString().split(".")[0]+"."+end;
        }
    }
	document.getElementById("klinetradeTurnover").value = money;
	document.getElementById("klinelimitedMoney").value = money;
	klinesummoneyValue(null);
}
function klineantoAmount(money){
	var reg=/^(-?\d*)\.?\d{1,4}$/;
	if(money!=null && money.toString().split(".")!=null && money.toString().split(".")[1]!=null && money.toString().split(".")[1].length>4){
    	if(!reg.test(money)){
    		var end =  money.toString().split(".")[1];
    		if(end.length>4){
    			end = end.substring(0, 4);
    		}
    		money = money.toString().split(".")[0]+"."+end;
        }
    }
	document.getElementById("klinetradeAmount").value = money;
	document.getElementById("klinelimitedMoney").value = money;
	klinetradeTurnoverValue();
}
function sellantoAmount(){
	var money = document.getElementById("klineuserBalance").value;
	var reg=/^(-?\d*)\.?\d{1,4}$/;
	if(money!=null && money.toString().split(".")!=null && money.toString().split(".")[1]!=null && money.toString().split(".")[1].length>4){
    	if(!reg.test(money)){
    		var end =  money.toString().split(".")[1];
    		if(end.length>4){
    			end = end.substring(0, 4);
    		}
    		money = money.toString().split(".")[0]+"."+end;
        }
    }
	document.getElementById("klinetradeAmount").value = money;
	document.getElementById("klinelimitedMoney").value = money;
	klinetradeTurnoverValue();
}

function slimitedTypeChange(){
	if(document.getElementById("slimitedType").checked){
		document.getElementById("treadContTextDiv").style.display = "none";
		document.getElementById("treadContDiv").style.display = "none";
		document.getElementById("slimitedDiv").style.display = "";
	}else{
		document.getElementById("treadContTextDiv").style.display = "";
		document.getElementById("treadContDiv").style.display = "";
		document.getElementById("slimitedDiv").style.display = "none";
	}
}
function klineonPortion(portion){
	var klinetradeType = document.getElementById("klinetradeType").value;
	if(klinetradeType == 0){
		var money = Number(document.getElementById("userCnyBalance").value);
		var portionMoney = accMul(money,portion);
		antoTurnover(portionMoney);
	}else{
		var money = Number(document.getElementById("klineuserCoinBalance").value);
		var portionMoney = accMul(money,portion);
		klineantoAmount(portionMoney);
	}
}