/**
 * @param marketFrom
 * @param type
 * @param mainType 3:表示外站数据
 */
function dataKLine(marketFrom,type,mainType){
	var kline1_all = get$("kline1_all");//document.getElementById("kline1_all").value;
	var kline1_price_mark = get$("kline1_price");//document.getElementById("kline1_price").value;
	var kline1_volume_mark = get$("kline1_volume");//document.getElementById("kline1_volume").value;
	var kline1_averageLine_5day = get$("kline1_5AverageLine");//document.getElementById("kline1_5AverageLine").value;
	var kline1_averageLine_15day =get$("kline1_15AverageLine");// document.getElementById("kline1_15AverageLine").value;
	var kline1_Monday = get$("kline1_Monday");//document.getElementById("kline1_Monday").value;
	var kline1_Tuesday = get$("kline1_Tuesday");//document.getElementById("kline1_Tuesday").value;
	var kline1_Wednesday = get$("kline1_Wednesday");//document.getElementById("kline1_Wednesday").value;
	var kline1_Thursday = get$("kline1_Thursday");//document.getElementById("kline1_Thursday").value;
	var kline1_Friday = get$("kline1_Friday");//document.getElementById("kline1_Friday").value;
	var kline1_Saturday = get$("kline1_Saturday");//document.getElementById("kline1_Saturday").value;
	var kline1_Sunday =get$("kline1_Sunday");//document.getElementById("kline1_Sunday").value;
	
	var url = '';
	var cnyOrUsdStr2 = '';
	if(mainType != 3){
		url = '/api/klineData.do?type='+type+'&marketFrom='+marketFrom;
		cnyOrUsdStr2 = cnyOrUsdStr;
	}else{
		var coinUrl = document.getElementById("coinUrl").value;
		url = coinUrl+'/api/klineData.do?type='+type+'&marketFrom='+marketFrom;
		cnyOrUsdStr2 = cnyOrUsdStr=='USD'?'CNY':'USD';
	}
	jQuery.getJSON(url, function(data) {
        if(data==null){
            return;
        }
		var typeSeleted = 1;
		var typeDateFormat = '%Y-%m-%d %H:%M %A';
		var typeButtons = [
							{type: 'week',count: 1,text: '1w'}, 
							{type: 'month',count: 1,text: '1m'}, 
							{type: 'all',text: kline1_all}
							];
		var typexAxis ;
		var xAxisMoney = "BTC/"+cnyOrUsdStr2;
		var labelText  = kline1_volume_mark+"(BTC)";
		if(marketFrom == 3){
			xAxisMoney = "LTC/"+cnyOrUsdStr2;
			labelText  = kline1_volume_mark+"(LTC)";
		}
		if(type == 1){//5分钟
			typeSeleted = 0;
			 typeButtons = [
			                {type: 'hour',count:8,text: '8h'}, 
							{type: 'day',count:1,text: '1d'}, 
							];
		}
		if(type !=1){
			typexAxis = [{labels: {formatter: function() { return  Highcharts.dateFormat('%m-%d', this.value);}}}];
			typeDateFormat = '%Y-%m-%d %A';
		}
		var ohlc = [],
			volume = [],
			dataLength = data.length;
		var  avg5 = [],avg15=[];
		var avg5Sum = 0,avg15Sum=0;
		for (var i = 0; i < dataLength; i++) {
			ohlc.push([
				data[i][0], // the date
				data[i][1], // open
				data[i][2], // high
				data[i][3], // low
				data[i][4] // close
			]);
			
			volume.push([
				data[i][0], // the date
				data[i][5] // the volume
			]);
			if(type!=1 && marketFrom ==0){
				//5日均线
				avg5Sum += data[i][4];
				if( i >= 4 ){
					avg5.push([data[i][0], Math.floor(avg5Sum/5)]);
					avg5Sum -= data[i-4][4];
				}
				//15日均线
				avg15Sum += data[i][4];
				if( i >= 14 ){
					avg15.push([data[i][0], Math.floor(avg15Sum/15)]);
					avg15Sum -= data[i-14][4];
				} 
			}
		}
		 Highcharts.setOptions({
			global: { useUTC: false },
			lang : {
				loading : 'Loading...',
				weekdays : [ kline1_Sunday, kline1_Monday, kline1_Tuesday, kline1_Wednesday, kline1_Thursday, kline1_Friday, kline1_Saturday ],
				decimalPoint : '.',
				numericSymbols : [ 'k', 'M', 'G', 'T', 'P', 'E' ], // SI
				resetZoom : 'Reset zoom',
				resetZoomTitle : 'Reset zoom level 1:1'
			},
			credits : {
				enabled : true,
				text : 'OKCoin.com',
				href : 'https://www.okcoin.com',
				position : {
					align : 'right',
					x : -10,
					verticalAlign : 'bottom',
					y : -5
				},
				style : {
					cursor : 'pointer',
					color : '#909090',
					fontSize : '10px'
				}
			}
		});
		 Highcharts.myOpt = {
			 symbolColor : '#058dc7'
		};

		// set the allowed units for data grouping
		var groupingUnits = [[
			'week',                         // unit name
			[1]                           // allowed multiples
		], [
			'month',
			[1, 2, 3, 4, 6]
		]];
		// create the chart
		jQuery('#container').highcharts('StockChart', {
			chart: {
				renderTo: 'rates',
				alignTicks: false
			},
			plotOptions :
			{
				candlestick : {
					color: '#d33',
					upColor: '#9e4',
					ohlc :{
						//color: 'green',
						tooltip:{
							// 日期时间格式化
							xDateFormat: '%Y-%m-%d %H:%M %A',
							color : '#f0f',
							changeDecimals : 4
							}
						}
					},
				column:{
					color : '#1080BB'
				}
			},
		    rangeSelector: {
		        selected: 1
		    },
		   colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
		   tooltip:{
				// 日期时间格式化
				xDateFormat: typeDateFormat,
				color : '#f0f',
				changeDecimals : 4,
				borderColor: '#058dc7'
			},
			rangeSelector: {
				// 缩放选择按钮，是一个数组。
				// 其中type可以是： 'millisecond', 'second', 'minute', 'day', 'week', 'month', 'ytd' (year to date), 'year' 和 'all'。
				// 其中count是指多少个单位type。
				// 其中text是配置显示在按钮上的文字
				buttons: typeButtons,
				// 默认选择域：0（缩放按钮中的第一个）、1（缩放按钮中的第二个）……
				selected: typeSeleted,
				// 是否允许input标签选框
				inputEnabled: false
			},
			exporting:{
				// 是否允许导出
				enabled:false,
				// 按钮配置
				buttons:{
					// 导出按钮配置
					exportButton:{
						enabled:false
					},
					// 打印按钮配置
					printButton:{
						enabled:true
					}
				}
			},
		    yAxis: [
		         {
			        title: {
			            text: kline1_price_mark+'('+cnyOrUsdStr2+')'
			        },
			        top: 10,
			        height: 270,
			        lineWidth: 2,
			        gridLineDashStyle : 'ShortDot',
			        showLastLabel : true
		         }, 
			    {
			        title: {
			            text: labelText
			        },
			        top: 252,
			        height: 50,
			        lineWidth: 2,
			        gridLineColor:'#ffffff',
			        gridLineDashStyle : 'ShortDot',
			        showLastLabel : true,
			        opposite:true
			    }
		    ],
		    xAxis: typexAxis,
		    series: [
		        {
				     type: 'candlestick',
				     name: xAxisMoney,
				     data: ohlc,
				     yAxis: 0,
				     dataGrouping: {
				    	 units: groupingUnits,
				    	 enabled: false
				       }
			  },
			  {
				    type: 'spline',
				    data: avg5,
				    name: kline1_averageLine_5day,
				    color: 'black',
				    lineWidth:1.5
				},
				{
				    type: 'spline',
				    data: avg15,
				    name: kline1_averageLine_15day,
				    color: 'blue',
				    lineWidth:1.5
				},
			  {
		        type: 'column',
		        name: kline1_volume_mark,
		        data: volume,
		        yAxis: 1,
		        dataGrouping: {
		        	units: groupingUnits,
		        	enabled: false
		        }
		    }]
		});
	});
}
/**
 * 刷新行情数据
*/
function klineData(marketFrom,type,mainType){
	dataKLine(marketFrom,type,mainType);
	switch(type){
	case 1:
		document.getElementById("okcoinData1").className="cur";
		document.getElementById("okcoinData3").className="";
		break;
	case 3:
		document.getElementById("okcoinData1").className="";
		document.getElementById("okcoinData3").className="cur";
		break;
	}
	//@todo add new coin
}