//-----------------------------------------------------------------------------------------------------------
function klineFullScreenOpen(){
	document.getElementById('marketImageNew').className="marketImageNewc clear";
	if(document.getElementById('changeKlineBackgound') != null ){
		document.getElementById('changeKlineBackgound').style.display="none";
	}
	document.getElementById('maxHeight').className="maxHeight";
	document.getElementById('klineImage').className="maxHeight";
	document.getElementById('main').style.display="none";
	document.getElementById('blind').style.display="none";
	if(document.getElementById('nav_bg2') != null){
		document.getElementById('nav_bg2').style.display="none";
	}
	document.getElementById('buysellTitle').style.display="none";
	if(document.getElementById('settingContentNew') != null ){
		document.getElementById('settingContentNew').style.display="none";
	}
	if(document.getElementById('datalist') != null ){
		document.getElementById('datalist').style.display="none";
	}
	if(document.getElementById('realtimeboxBody') != null ){
		document.getElementById('realtimeboxBody').style.display="none";
	}
	document.getElementById('allFooter').style.display="none";
	document.getElementById('nav1').style.display="none";
	document.getElementById('closefullscreen').style.display="block";
	document.getElementById('openfullscreen').style.display="none";
	if(document.getElementById('nologindiv') != null ){
		document.getElementById('nologindiv').style.display="none";
	}
	if(document.getElementById('bottomBody') != null ){
		document.getElementById('bottomBody').style.display="none";
	}
	
	if(window.klineFullScreen!=null){
		window.klineFullScreen.showDepth(0);
	}
	var str =  "klineIsOpen=1" ;
	document.cookie = str;
}
function remoteShowDepth(flag){
	var coinUrl = document.getElementById("coinUrl").value;
	if(typeof(exec_obj)=='undefined'){
        exec_obj = document.createElement('iframe');
        exec_obj.name = 'tmp_frame';
        exec_obj.src = coinUrl+'/kline/showDept.do?flag='+flag;
        exec_obj.style.display = 'none';
        document.body.appendChild(exec_obj);
    }else{
        exec_obj.src = coinUrl+'/kline/showDept.do?flag='+flag +'&rand='+ Math.random();
    }
}
function klineFullScreenClose(isRemote){
	if(document.getElementById('marketImageNew') != null ){
		document.getElementById('marketImageNew').className="marketImageNew clear";
	}
	if(document.getElementById('changeKlineBackgound') != null ){
//		document.getElementById('changeKlineBackgound').style.display="block";
	}
	if(document.getElementById('maxHeight') != null){
		document.getElementById('maxHeight').className="";
	}
	if(document.getElementById('klineImage') != null){
		document.getElementById('klineImage').className="newKlineImage";
	}
	if(document.getElementById('main') != null){
		document.getElementById('main').style.display="block";
	}
	if(document.getElementById('blind') != null){
		document.getElementById('blind').style.display="block";
	}
	if(document.getElementById('nav_bg2') != null){
		document.getElementById('nav_bg2').style.display="block";
	}
	if(document.getElementById('buysellTitle') != null){
		document.getElementById('buysellTitle').style.display="block";
	}
	if(document.getElementById('settingContentNew') != null ){
		document.getElementById('settingContentNew').style.display="block";
	}
	if(document.getElementById('datalist') != null){
		document.getElementById('datalist').style.display="block";
	}
	if(document.getElementById('realtimeboxBody') != null){
		document.getElementById('realtimeboxBody').style.display="block";
	}
	if(document.getElementById('allFooter') != null){
		document.getElementById('allFooter').style.display="block";
	}
	if(document.getElementById('nav1') != null){
		document.getElementById('nav1').style.display="block";
	}
	if(document.getElementById('closefullscreen') != null){
		document.getElementById('closefullscreen').style.display="none";
	}
	if(document.getElementById('openfullscreen') != null){
		document.getElementById('openfullscreen').style.display="block";
	}
	if(document.getElementById('nologindiv') != null){
		document.getElementById('nologindiv').style.display="block";
	}
	if(document.getElementById('bottomBody') != null){
		document.getElementById('bottomBody').style.display="block";
	}
	if(window.klineFullScreen!=null&&!!window.klineFullScreen.showDepth){
		window.klineFullScreen.showDepth(1);
	}
	var str =  "klineIsOpen=0" ;
	document.cookie = str;
}
//type=1：交易 =2 : 行情
function openTradeBlock(obj,type){
	if(type==1){
		var value = obj.value;
		if(value ==0){
			document.getElementById('transactionLeftBody').style.display="block";
			document.getElementById('transactionRightBody').style.display="block";
			if(document.getElementById('tradeOrderTable') !=null){
				document.getElementById('tradeOrderTable').style.display="block";
			}
			if(document.getElementById('bottomBody') !=null){
				document.getElementById('bottomBody').style.display="block";
			}
			if(document.getElementById('nologindiv') !=null){
				document.getElementById('nologindiv').style.display="block";
			}
			if(document.getElementById('tradeRealtimebox') !=null){
				document.getElementById('tradeRealtimebox').style.display="block";
			}
		}else{
			document.getElementById('transactionLeftBody').style.display="none";
			document.getElementById('transactionRightBody').style.display="none";
			if(document.getElementById('tradeOrderTable') !=null){
				document.getElementById('tradeOrderTable').style.display="none";
			}
			if(document.getElementById('bottomBody') !=null){
				document.getElementById('bottomBody').style.display="none";
			}
			if(document.getElementById('nologindiv') !=null){
				document.getElementById('nologindiv').style.display="none";
			}
			if(document.getElementById('tradeRealtimebox') !=null){
				document.getElementById('tradeRealtimebox').style.display="none";
			}
		}
	}else{
		var value = obj.value;
		if(value ==0){
			document.getElementById('klineImage').style.display="block";
		}else{
			document.getElementById('klineImage').style.display="none";
		}
	}
}

var marketUpdateTime;
var marketUpdateNumber;
function marketEntrustRefresh(speed){
	changeDepthImg_com();
	var symbol = document.getElementById("symbol").value;
    var url = "/marketRefresh.do?deptMerge_stock="+deptMerge_m+"&symbol="+symbol+"&random="+Math.round(Math.random()*100);
	jQuery.post(url, null, function (data) {
		var result = eval('(' + data + ')');
		if (result != null) {
			var buyDepthList = result.buyDepthList;
			var sellDepthList = result.sellDepthList;
			var recentDealList = result.recentDealList;
			if (isNewKline()) {
				jQuery("#kline_iframe")[0].contentWindow._set_current_depth(getKlineJsonDepth(result));//深度信息
			}
			var symbol = result.symbol;
			var medianUnit = sortDepth.medianUnit(buyDepthList, sellDepthList, 70);
			setDepthHtml("depth_buy_context", 0, buyDepthList, medianUnit);//设置买单
			setDepthHtml("depth_sell_context", 1, sellDepthList, medianUnit);//设置卖单
			setDepthHistroy(recentDealList, symbol);//设置成交记录
			jQuery("#depthHidding").hide();
		}
	});
}
function setDepthHistroy(recentDealList,symbol){
	if(!!recentDealList){
		if(jQuery("#marketRecent table tbody tr").length!=60){
			jQuery("#marketRecent table tbody").empty();
			var resultHtml="";
			for(var i=recentDealList.length;i>0;i--){
				resultHtml+='<tr><td><span id="createdDateTd'+i+'"></span></td>';
				resultHtml+='<td style="text-align: right;padding-right: 20px"><span id="fontPriceSpan'+i+'" class="lightgreen"></span></td>';
				resultHtml+='<td style="text-align: right;padding-right: 30px"><span id="colorAmount'+i+'"></span></td>';
				resultHtml+='</tr>';
			}
			jQuery("#marketRecent table tbody").html(resultHtml);
		}
		for (var i = 1;i<=recentDealList.length;i++ ) {
			var color = recentDealList[i-1][3]==1?"lightgreen":"red";
			jQuery("#fontPriceSpan"+i).attr("class",color);
			jQuery("#createdDateTd"+i).html(recentDealList[i-1][2]);
			jQuery("#colorAmount"+i).html(CommaFormattedLittle(recentDealList[i-1][1],symbolAmountSubPoint(symbol)));
			jQuery("#fontPriceSpan"+i).html(CommaFormattedLittle(recentDealList[i-1][0],symbolSubPoint(symbol)));
		}
	}
}
function setDepthHtml(typeName,type,list,medianUnit){
    var result="";
    if(list==null){
        return;
    }

    var oldNode = jQuery("#"+typeName);
	var listLength=list.length;
    var symbol=jQuery("#symbol").val();
    if (type == 0) {
        if(!setDepthHtml.buyDepthLength||setDepthHtml.buyDepthLength<200 || listLength<200){
            for (var i = 0; i < listLength; i++) {
                var order = i + 1;
                result += "<li class='li-ct-transcation'  onclick='buyautoTrade(" + order + ")'>";
                result += "<div class='part-ct-transcation buy' style='width:55px;'>" + depth_buy+ "(" + order + ")</div>";
                result += "<div class='part-ct-transcation_right'  style='padding: 0px 5px 0px 0px;width:70px;'>";
                result += "<span id='buyPriceSpan"+order+"'>" + CommaFormattedLittle(list[i][0], symbolSubPaltPoint(symbol)) + "</span>";
                result += "<input type='hidden' id='buyPrice" + order + "' value='" + list[i][0] + "' />";
                result += "</div>";
                result += "<div class='part-ct-transcation_right' style='padding-left: 0px'>";
                result += "<span id='buyAmountSpan" + order + "'>" + CommaFormattedLittle(list[i][1], symbolAmountSubPoint(symbol)) + "</span>";
                result += "<input type='hidden' id='buyAmount" + order + "' value='" + list[i][1] + "' />";
                result += "</div>";
                result += "<div class='part-ct-transcation'  style='padding-left:5px'>";
                result += "<span style='width:" + sortDepth.width(list[i][1],medianUnit)+ "px;' class='buyspan' id='buySpanColor" + order + "'></span>";
                result += "</div>";
                result += "</li>";
            }
			setDepthHtml.buyDepthLength=listLength;
            oldNode.html(result);
        }else{
            for( var i= 0,order=1;i<200;i++,order++ ){
                document.getElementById("buyPriceSpan"+order).innerHTML = CommaFormattedLittle(list[i][0], symbolSubPaltPoint(symbol));
                document.getElementById("buyPrice"+order).value = (list[i][0]);
                document.getElementById("buyAmountSpan"+order).innerHTML = CommaFormattedLittle(list[i][1], symbolAmountSubPoint(symbol));
                document.getElementById("buyAmount"+order).value = list[i][1];
                document.getElementById("buySpanColor"+order).style.width = sortDepth.width(list[i][1],medianUnit)+"px";
            }
        }
    }else{
        var j = 0;
        if(!setDepthHtml.sellDepthLength||setDepthHtml.sellDepthLength<200 || listLength<200) {
            for (var i = listLength - 1; i >= 0; i--) {
                var order = j + 1;
                result += "<li class='li-ct-transcation'  onclick='sellautoTrade(" + order + ")'>";
                result += "<div class='part-ct-transcation sell' style='width:55px;'>" + depth_sell + "(" + order + ")</div>";
                result += "<div class='part-ct-transcation_right'  style='padding: 0px 5px 0px 0px;width:70px;'>";
                result += "<span id='sellPriceSpan"+order+"'>" + CommaFormattedLittle(list[i][0], symbolSubPaltPoint(symbol)) + "</span>";
                result += "<input type='hidden' id='sellPrice" + order + "' value='" + list[i][0] + "' />";
                result += "</div>";
                result += "<div class='part-ct-transcation_right' style='padding-left: 0px'>";
                result += "<span id='sellAmountSpan" + order + "'>" + CommaFormattedLittle(list[i][1], symbolAmountSubPoint(symbol)) + "</span>";
                result += "<input type='hidden' id='sellAmount" + order + "' value='" + list[i][1] + "' />";
                result += "</div>";
                result += "<div class='part-ct-transcation'  style='padding-left:5px'>";
                result += "<span style='width:" +  sortDepth.width(list[i][1],medianUnit) + "px;' class='sellspan' id='sellSpanColor" + order + "'></span>";
                result += "</div>";
                result += "</li>";
                j++;
            }
			setDepthHtml.sellDepthLength=listLength;
			oldNode.html(result);
        }else{
            for(var i=list.length-1,order=1;i>=0;i--,order++){
                document.getElementById("sellPriceSpan"+order).innerHTML =  CommaFormattedLittle(list[i][0], symbolSubPaltPoint(symbol));
                document.getElementById("sellPrice"+order).value=list[i][0];
                document.getElementById("sellAmountSpan"+order).innerHTML = CommaFormattedLittle(list[i][1], symbolAmountSubPoint(symbol));
                document.getElementById("sellAmount"+order).value = list[i][1];
                document.getElementById("sellSpanColor"+order).style.width = sortDepth.width(list[i][1],medianUnit)+"px";
            }
        }
    }
}
function refreshAccount(){
	var symbol = document.getElementById("symbol").value;
	var islogin = document.getElementById("isLogin").value;
	if(islogin==1){
		//更新金额
		var url = "/real/ticker.do?random="+Math.round(Math.random()*100);
		if(document.getElementById("marketIsUpdate") !=null){
			var symbol = document.getElementById("symbol").value;
			url = "/real/ticker.do?symbol="+symbol+"&random="+Math.round(Math.random()*100);
		}
		jQuery.post(url,null,function(data){
			if(data != null){
				var ticker = eval('(' + data + ')');
				if(ticker!=null){
					/*行情下单刷新人民币，比特币余额   start*/
					if(document.getElementById("marketIsUpdate") !=null){
						if(document.getElementById("nowPrice")!=null){
							document.getElementById("nowPrice").value=ticker.buy;
						}
						if(document.getElementById("snowPrice")!=null){
							document.getElementById("snowPrice").value=ticker.sell;
						}
					}
				}
			}
		});
	}
}
function refreshOrders(){
	var symbol = document.getElementById("symbol").value;
	var islogin = document.getElementById("isLogin").value;
	if(islogin==1){
		var url  ="/tradeOrdersRefresh.do?symbol="+symbol+"&random="+Math.round(Math.random()*100);
        jQuery.post(url,null,function(data){
            if (data == null || data == "") {
                return;
            }
            jQuery("#tradeOrderTable").html(data);
        });


	}
}
/**
 *
 * 请求加入合约交易记录
 */
function futureTradePush(){
    if(document.getElementById('futureTradePush')!=null){
        var dataPushContractType = document.getElementById('pageDepthPushContractType').value;
        if(document.getElementById('symbol')!=null && (document.getElementById('symbol').value=='0'||document.getElementById('symbol').value==0)){
            switch (Number(dataPushContractType)){
                case 1:
                    socket.emit("addPushType", "{millInterval : 300,type : 'ok_btc_future_trade_this_week',binary:"+isBinary+"}");
                    break;
                case 2:
                    socket.emit("addPushType", "{millInterval : 300,type : 'ok_btc_future_trade_next_week',binary:"+isBinary+"}");
                    break;
                case 3:
                    socket.emit("addPushType", "{millInterval : 300,type : 'ok_btc_future_trade_month',binary:"+isBinary+"}");
                    break;
                case 4:
                    socket.emit("addPushType", "{millInterval : 300,type : 'ok_btc_future_trade_quarter',binary:"+isBinary+"}");
                    break;
                default:
                    break;
            }
        }
        if(document.getElementById('symbol')!=null && (document.getElementById('symbol').value=='1'||document.getElementById('symbol').value==1)){
            switch (Number(dataPushContractType)){
                case 1:
                    socket.emit("addPushType", "{millInterval : 300,type : 'ok_ltc_future_trade_this_week',binary:"+isBinary+"}");
                    break;
                case 2:
                    socket.emit("addPushType", "{millInterval : 300,type : 'ok_ltc_future_trade_next_week',binary:"+isBinary+"}");
                    break;
                case 3:
                    socket.emit("addPushType", "{millInterval : 300,type : 'ok_ltc_future_trade_month',binary:"+isBinary+"}");
                    break;
                case 4:
                    socket.emit("addPushType", "{millInterval : 300,type : 'ok_ltc_future_trade_quarter',binary:"+isBinary+"}");
                    break;
                default :
                    break;
            }
        }
    }
}
function futurePushStart(){
    if(document.getElementById('futureTradePush')!=null){
        futureTradePush();
    }
    if(document.getElementById('futureDepthPush')!=null){
		if(Number(getCookieValue("deptMerge"))==1){
			futurePush.sendMethod(Number(current_symbol)==0?"future_depth_merge_usd":"future_depth_merge_cny");//深度推送
		}else{
			futurePush.sendMethod(Number(current_symbol)==0?"future_depth_usd_200":"future_depth_cny_200");//深度推送
		}
    }
}
function FutureDepthCache(){
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
					//if(price<341){
					//	console.info("删除["+index+"]"+tmp[0][0]+"---*********-"+depthList[i]);
					//}
					continue;
				}
				if (index != -1) {//修改
					this.sellDepth[index] = depthList[i];
					//console.info("修改-------"+price+"---amount"+amount);
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
		}
		return this.sellDepth;
	}
	this.clean=function(){
		this.buyDepth=null;
		this.sellDepth=null;
	}
}
var depthCache=new FutureDepthCache();
//market 页面调用
//@todo to add new coin
function LoadPushFuturemarketDepthAnd(buyDepthList,sellDepthList,recentDealList){
    var symbol = Number(document.getElementById('symbol').value);
	var cost = jQuery("#unitAmount").val();
    if(buyDepthList != null){
        var length1 = jQuery('#' + 'buyUl').children('li').length;
		if(Number(deptMergeValue)!=1){
			buyDepthList=depthCache.getBuyDepthList(buyDepthList);
		}
        if((buyDepthList.length < 200 || length1 < 200) ){
            checkULCount("buyUl",buyDepthList,0);
        }
        for(var i=0;i<buyDepthList.length;i++) {
            var y = i+1;
			document.getElementById("buyPriceSpan" + y).innerHTML = getValueFormat(buyDepthList[i][0], symbolPoint);
			document.getElementById("buyPrice" + y).value =buyDepthList[i][0];
			var btc_amount=cont_btc==1?buyDepthList[i][1]:getValueFormat(buyDepthList[i][2],btcRate);
            if (cont_btc == 1) {
                document.getElementById("buyAmountSpan" + y).innerHTML =buyDepthList[i][1];
                document.getElementById("buyAmount" + y).value = buyDepthList[i][1];
            } else {
                document.getElementById("buyAmountSpan" + y).innerHTML = getValueFormat(btc_amount,btcRate);
                document.getElementById("buyAmount" + y).value = btc_amount;
            }
			switch(symbol){
				case 0:document.getElementById("buySpanColor" + y).style.width = _getWidth_Depth(Number(getUnformatValue(btc_amount)), symbol) + "px";break;
				case 1:document.getElementById("buySpanColor" + y).style.width = _getWidth_Depth(Number(buyDepthList[i][1]), symbol) + "px";break;
				default:break;
			}
			if(buyDepthList[i][5]||"1"==buyDepthList[i][5]){
				jQuery("#buyPriceSpan"+y).css("font-weight","bold");
				jQuery("#buyAmountSpan"+y).css("font-weight","bold");
			}else{
				jQuery("#buyPriceSpan"+y).css("font-weight","");
				jQuery("#buyAmountSpan"+y).css("font-weight","");
			}
        }
    }
    if(sellDepthList != null){
		if(Number(deptMergeValue)!=1){
			sellDepthList=depthCache.getSellDepthList(sellDepthList);
			if(isNewKline()){
				jQuery("#kline_iframe")[0].contentWindow._set_current_depth(getKlineJsonDepth({sellDepthList:depthCache.sellDepth,buyDepthList:depthCache.buyDepth}));//深度信息
			}
		}else{
			if(isNewKline()){
				jQuery("#kline_iframe")[0].contentWindow._set_current_depth(getKlineJsonDepth({sellDepthList:null,buyDepthList:null}));//深度信息
			}
		}
        var length1 = jQuery('#' + 'sellLi').children('li').length;
        if((sellDepthList.length < 200 || length1 < 200)){
            checkULCount("sellLi",sellDepthList,1);
        }
        var j=0;
        for(var i=sellDepthList.length-1;i>=0;i--) {
            var y = j+1;
			var btc_amount=cont_btc==1?sellDepthList[i][1]:getValueFormat(sellDepthList[i][2],btcRate);
			document.getElementById("sellPriceSpan" + y).innerHTML = getValueFormat(sellDepthList[i][0],symbolPoint);
			document.getElementById("sellPrice" + y).value = sellDepthList[i][0];
            if(cont_btc==1){
                document.getElementById("sellAmountSpan"+y).innerHTML = sellDepthList[i][1];
                document.getElementById("sellAmount"+y).value = sellDepthList[i][1];
            }else{

                document.getElementById("sellAmountSpan"+y).innerHTML =  getValueFormat(btc_amount,btcRate);
                document.getElementById("sellAmount"+y).value = btc_amount;
            }
			switch(symbol){
				case 0:document.getElementById("sellSpanColor" + y).style.width = _getWidth_Depth(Number(getUnformatValue(btc_amount)), symbol) + "px";break;
				case 1:document.getElementById("sellSpanColor" + y).style.width = _getWidth_Depth(Number(sellDepthList[i][1]), symbol) + "px";break;
				default:break;
			}
			if(sellDepthList[i][5]||"1"==sellDepthList[i][5]){
				jQuery("#sellPriceSpan"+y).css("font-weight","bold");
				jQuery("#sellAmountSpan"+y).css("font-weight","bold");
			}else{
				jQuery("#sellPriceSpan"+y).css("font-weight","");
				jQuery("#sellAmountSpan"+y).css("font-weight","");
			}
            j++;
        }
    }

    if (recentDealList != null) {

        var symbol = document.getElementById("symbol").value;
        var newTrHTML = "";
        for (var i = recentDealList.length - 1; i >= 0; i--) {
            var color = recentDealList[i][3] == 1 || recentDealList[i][3] == 4 ? "lightgreen" : "red";

            newTrHTML += '<tr>';
            newTrHTML += '<td><span id="createdDateTd'+i+'">'+ recentDealList[i][2] +'</span></td>';
            newTrHTML += '<td class="' + color + '"  style="text-align: right;padding-right: 20px">' + '<span class="' + color + '" id="fontPriceSpan'+i+'">' + getCurrentValueByTypeFormatRecent(0,recentDealList[i][0]) + '</span></td>';
            if (cont_btc == 1) {
                newTrHTML += '<td  style="text-align: right;padding-right: 30px"><span id="colorAmount'+i+'">' + round(recentDealList[i][1], 0) + '</span></td>';
            } else {
                var cost = jQuery("#unitAmount").val();
                var btc_amount = floor(accDiv_z(accMul_z(cost, recentDealList[i][1]), recentDealList[i][0]), btcRate);
                newTrHTML += '<td  style="text-align: right;padding-right: 30px"><span id="colorAmount'+i+'">' + getValueFormat(btc_amount, btcRate) + '</span></td>';
            }
            newTrHTML += "</tr>";
        }
        jQuery("#lastTab tbody").prepend(newTrHTML);
		var trLength=jQuery('#lastTab tbody tr').length;
    	if(trLength>60){
			for(var i=0;i<(trLength-60);i++){
				jQuery('#lastTab tbody tr:last').remove();
			}

		}
	}
}

function  _getWidth_Depth(amount, symbol){
    var _symbol = Number(symbol);
	amount=Number(amount);
    var  result=0;
    switch (_symbol){
        case 0:
            if(amount>0&&amount<30){
                result=amount*1.55;
            }else if(amount>=30&&amount<100){
                result=(amount-30)*0.66+46.5;
            }else if(amount>=100){
                result=(amount-100)*0.473+92.7;
            }
            break;
        case 1:
            /*if(amount>0&&amount<1000){
                result=amount*0.08;
            }else if(amount>=1000&amount<1500){
                result=(amount-1000)+(40/);
            }else if(amount>=800){
                result=amount*0.02+115;
            }*/
			result = amount*0.08;
            break;
    }
    if(result>160){
        result=160;
    }
    return result;
}
