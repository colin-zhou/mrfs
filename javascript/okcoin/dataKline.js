function showKLine(marketFrom,type){
	var kline1_all = get$("kline1_all");
	var kline1_price_mark = get$("kline1_price");
	var kline1_volume_mark = get$("kline1_volume");
	var kline1_averageLine_5day = get$("kline1_5AverageLine");
	var kline1_averageLine_15day = get$("kline1_15AverageLine");
	var kline1_Monday = get$("kline1_Monday");
	var kline1_Tuesday = get$("kline1_Tuesday");
	var kline1_Wednesday = get$("kline1_Wednesday");
	var kline1_Thursday = get$("kline1_Thursday");
	var kline1_Friday = get$("kline1_Friday");
	var kline1_Saturday = get$("kline1_Saturday");
	var kline1_Sunday = get$("kline1_Sunday");
	
	//okcoin暂时无周数据
	if(marketFrom != 0 && marketFrom != 3){
		document.getElementById("weekTitle").style.display="";
		document.getElementById("okcoinTitle").className ="";
		document.getElementById("btcChinaTitle").className =marketFrom==2?"cur":"";
		document.getElementById("okcoinLtcTitle").className ="";
		document.getElementById("bitstampTitle").className =marketFrom==4?"cur":"";
		document.getElementById("btceTitle").className =marketFrom==7?"cur":"";
		document.getElementById("btceltcTitle").className =marketFrom==5?"cur":"";
		document.getElementById("btcChinaltcTitle").className =marketFrom==10?"cur":"";
//		document.getElementById("huobiTitle").className =marketFrom==8?"cur":"";
//		document.getElementById("huobiltcTitle").className =marketFrom==9?"cur":"";
	}else{
		document.getElementById("weekTitle").style.display="none";
		document.getElementById("okcoinTitle").className =marketFrom==0?"cur":"";
		document.getElementById("btcChinaTitle").className ="";
		document.getElementById("okcoinLtcTitle").className =marketFrom==3?"cur":"";
		document.getElementById("bitstampTitle").className ="";
		document.getElementById("btceTitle").className ="";
		document.getElementById("btceltcTitle").className="";
		document.getElementById("btcChinaltcTitle").className ="";
//		document.getElementById("huobiTitle").className ="";
//		document.getElementById("huobiltcTitle").className ="";
	}
	if(type==3){
		document.getElementById("minuteTitle").className ="";
		document.getElementById("dayTitle").className ="cur";
		document.getElementById("weekTitle").className ="";
	}
	document.getElementById("marketFromChart").value=marketFrom;
	
	//请求数据
	jQuery.getJSON('/klineData.do?marketFrom='+marketFrom+'&type='+type, function(data) {
		var typeSeleted = 1;
		var typeDateFormat = '%Y-%m-%d %H:%M %A';
		var typeButtons = [
							{type: 'week',count: 1,text: '1w'}, 
							{type: 'month',count: 1,text: '1m'}, 
							{type: 'all',text: kline1_all}
							];
		var typexAxis ;
		var yAxisMoney = kline1_price_mark+cnyOrUsdStr;
		var xAxisMoney = "BTC/"+cnyOrUsdStr;
		var labelText  = kline1_volume_mark+"(BTC)";
		if(marketFrom == 3 || marketFrom ==10 || marketFrom==9){//okcoin ltc，huobi ltc，btcChina ltc
			xAxisMoney = "LTC/"+cnyOrUsdStr;
			labelText  = kline1_volume_mark+"(LTC)";
		}else if(marketFrom == 5){//btc-e ltc
			xAxisMoney = "LTC/USD";
			labelText  = kline1_volume_mark+"(LTC)";
			yAxisMoney = kline1_price_mark+"(USD)";
		}else if(marketFrom==4 || marketFrom==7){// btc-e btc,bitstamp btc
			yAxisMoney = kline1_price_mark+"(USD)";
			xAxisMoney = "BTC/USD";
		}
		if(marketFrom != 0 && marketFrom != 3){
			 typeButtons = [
							{type: 'week',count: 1,text: '1w'}, 
							{type: 'month',count: 1,text: '1m'}, 
							{type: 'month',count: 3,text: '3m'}, 
							{type: 'ytd',count: 1,text: '1y'},
							{type: 'all',text: kline1_all}
							];
		} 
		if(type == 4){//周
			typeSeleted = 0;
			 typeButtons = [
							{type: 'year',count:1,text: '1y'}, 
							{type: 'year',count:2,text: '2y'}, 
							{type: 'all',text: kline1_all}
							];
		}else if(type == 1){//5分钟
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
		var ohlc = [],volume = [],dataLength = data.length;
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
			if(type!=1 && marketFrom==0){
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
		jQuery('#containerChart').highcharts('StockChart', {
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
//		   colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
			            text: yAxisMoney
			        },
			        top: 10,
			        height: 210,
			        lineWidth: 2,
			        gridLineDashStyle : 'ShortDot',
			        showLastLabel : true
		         }, 
			    {
			        title: {
			            text: labelText
			        },
			        top: 198,
			        height: 70,
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

function getPriceData(symbol){
	var site = document.getElementById("siteFlag").value ;
	var name = cnyOrUsdStr+"/BTC";
	if(symbol==3){
		name = cnyOrUsdStr+"/LTC";
	}
	var typeDateFormat = '%Y-%m-%d %A';
	jQuery.getJSON('/priceData.do?symbol='+symbol, function(data) {
		
		Highcharts.setOptions({
			global: { useUTC: false },
			lang : {
				loading : 'Loading...',
				weekdays : [ sunday, monday, tuesday, wednesday, thursday, friday, saturday],
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
		var typeButtons =[
							{type: 'month',count: 1,text: '1m'}, 
							{type: 'month',count: 3,text: '3m'}, 
							{type: 'month',count: 6,text: '6m'}, 
							{type: 'ytd',count: 1,text: 'YTD'},
							{type: 'all',text: 'All'}
	                  ];
		var maxZoomValue = 14*24;
		var dateType = "%m-%d";
		if(site == 2){
			maxZoomValue = 7*24;
			dateType = "%m-%d";
			typeDateFormat = "%Y-%m-%d";
			typeButtons = [
							{type: 'week',count: 1,text: '1w'}, 
							{type: 'month',count: 1,text: '1m'}, 
//							{type: 'huor',count: 6,text: '6h'}, 
//							{type: 'ytd',count: 1,text: 'YTD'},
							{type: 'all',text: 'All'}
	                  ];
		}
		// Create the chart
		jQuery('#container').highcharts('StockChart', {
			chart: {
	            renderTo: 'container',
	            backgroundColor: 'rgba(255, 255, 255, 0.1)',
	            plotBackgroundColor: '#fff',
	            plotBorderColor: '#e6e6e6',
	            plotBorderWidth: 1,
	            panning: false,
	            spacingBottom: 30,
	            marginLeft: 30,
	            marginRight: 0,
	            style: {
	                fontFamily: '"Open Sans", sans-serif;',
	            }
	        },
	        plotOptions: {
	        	area:{
	        		lineColor:'#1fa4c7',
	        		 tooltip: {
	 					valueDecimals : 2,
	 					xDateFormat: typeDateFormat,
	 					
	 		        }, 
	        	},
	        },
	        colors: ['rgba(210,237,244,1)'],
	        tooltip:{
	        	backgroundColor:'#184854',
	        	style: {
						color: '#ffffff',
						fontSize: '12px',
						padding: '8px'
					}
	        },
	        lineColor:'#ff0000',
			xAxis: {
	            maxZoom: 3600000*maxZoomValue,
	            tickColor: '#666',
	            tickLength: 0,
	            tickWidth: 2,
	            tickPosition: 'inside',
	            title: false,
	            gridLineColor: '#e6e6e6',
	            labels: {
	                x: 0,
	                y: 30,
	                style: {
	                    color: '#808080',
	                    fontWeight: 'normal'
	                },
	        		formatter: function() { return  Highcharts.dateFormat(dateType, this.value);}
	            }
	        },
	        yAxis: {
	            title: false,
	            gridLineColor: '#e6e6e6',
	            labels: {
	                x: -30,
	                y: 5,
	                style: {
	                    color: '#808080',
	                    fontWeight: 'normal'
	                }
	            },
	            showLastLabel: false,
	            showFirstLabel: false
	        },
	        
			rangeSelector : {
				// 缩放选择按钮，是一个数组。
				// 其中type可以是： 'millisecond', 'second', 'minute', 'day', 'week', 'month', 'ytd' (year to date), 'year' 和 'all'。
				// 其中count是指多少个单位type。
				// 其中text是配置显示在按钮上的文字
				buttons: typeButtons,
				// 默认选择域：0（缩放按钮中的第一个）、1（缩放按钮中的第二个）……
				selected: 4,
				// 是否允许input标签选框
				inputEnabled: false,
				buttonTheme: {
					fill: '#EEE',
	                stroke: '#e6e6e6',
	                width: 30,
	                padding: 4,
	                height: 17,
	                style: {
	                    color: '#999',
	                    fontWeight: 'normal'
	                },
	                states: {
	                	 hover: {
	                         fill: 'none',
	                         stroke: '#e6e6e6',
	                         style: {
	                             color: '#000'
	                         }
	                     },
	                     select: {
	                         fill: '#fff',
	                         stroke: '#e6e6e6',
	                         style: {
	                             color: '#999'
	                         }
	                     }
	                }
				},
            labelStyle: {
                color: '#666',
                fontWeight: 'normal',
                float: 'right',
                display: 'none'
            },
			},
			
			navigator: {
	            enabled: false
	        },
	        scrollbar: {
	            enabled: false
	        },
	        credits: {
	            enabled: false
	        },
			series : [{
				name : name,
				data : data,
				type : 'area',
				threshold : null,
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
				}
			}]
		});
	});
}


function getFundData(symbol){
	var name = earning;
	if(symbol==3){
		name = earning;
	}
	var typeDateFormat = '%Y-%m-%d %A';
	jQuery.getJSON('/fund/getFundData.do?symbol='+symbol, function(data) {
		
		Highcharts.setOptions({
			global: { useUTC: false },
			lang : {
				loading : 'Loading...',
				weekdays : [ sunday, monday, tuesday, wednesday, thursday, friday, saturday],
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
		var typeButtons =[
//								{type: 'day',count:7,text: '7d'}
		                  ];
		
		// Create the chart
		jQuery('#container').highcharts('StockChart', {
			chart: {
	            renderTo: 'container',
	            backgroundColor: 'rgba(255, 255, 255, 0.1)',
	            plotBackgroundColor: '#fff',
	            plotBorderColor: '#e6e6e6',
	            plotBorderWidth: 1,
	            panning: false,
	            spacingBottom: 30,
	            marginLeft: 30,
	            marginRight: 0,
	            style: {
	                fontFamily: '"Open Sans", sans-serif;',
	            }
	        },
	        plotOptions: {
	        	area:{
	        		lineColor:'#1fa4c7',
	        		 tooltip: {
	 					valueDecimals : 4,
	 					xDateFormat: typeDateFormat,
	 					
	 		        }, 
	        	},
	        },
	        colors: ['rgba(210,237,244,1)'],
	        tooltip:{
	        	backgroundColor:'#184854',
	        	style: {
						color: '#ffffff',
						fontSize: '12px',
						padding: '8px'
					}
	        },
	        lineColor:'#ff0000',
			xAxis: {
	            maxZoom: 7 * 24 * 3600000,
	            tickColor: '#666',
	            tickLength: 0,
	            tickWidth: 2,
	            tickPosition: 'inside',
	            title: false,
	            gridLineColor: '#e6e6e6',
	            labels: {
	                x: 0,
	                y: 30,
	                style: {
	                    color: '#808080',
	                    fontWeight: 'normal'
	                },
	        		formatter: function() { return  Highcharts.dateFormat('%m-%d', this.value);}
	            }
	        },
	        yAxis: {
	            title: false,
	            gridLineColor: '#e6e6e6',
	            labels: {
	                x: -30,
	                y: 5,
	                style: {
	                    color: '#808080',
	                    fontWeight: 'normal'
	                }
	            },
	            showLastLabel: false,
	            showFirstLabel: false
	        },
	        
			rangeSelector : {
				// 缩放选择按钮，是一个数组。
				// 其中type可以是： 'millisecond', 'second', 'minute', 'day', 'week', 'month', 'ytd' (year to date), 'year' 和 'all'。
				// 其中count是指多少个单位type。
				// 其中text是配置显示在按钮上的文字
				buttons: typeButtons,
				// 默认选择域：0（缩放按钮中的第一个）、1（缩放按钮中的第二个）……
				selected: 4,
				// 是否允许input标签选框
				inputEnabled: false,
				buttonTheme: {
					fill: '#EEE',
	                stroke: '#e6e6e6',
	                width: 30,
	                padding: 4,
	                height: 17,
	                style: {
	                    color: '#999',
	                    fontWeight: 'normal'
	                },
	                states: {
	                	 hover: {
	                         fill: 'none',
	                         stroke: '#e6e6e6',
	                         style: {
	                             color: '#000'
	                         }
	                     },
	                     select: {
	                         fill: '#fff',
	                         stroke: '#e6e6e6',
	                         style: {
	                             color: '#999'
	                         }
	                     }
	                }
				},
            labelStyle: {
                color: '#666',
                fontWeight: 'normal',
                float: 'right',
                display: 'none'
            },
			},
			
			navigator: {
	            enabled: false
	        },
	        scrollbar: {
	            enabled: false
	        },
	        credits: {
	            enabled: false
	        },
			series : [{
				name : name,
				data : data,
				type : 'area',
				threshold : null,
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
				}
			}]
		});
	});
}


function getFundInterest(symbol){
    var name = earning;
    if(symbol==3){
        name = earning;
    }
    var precision = 4;
    if(symbol !=3){
        precision =8;
    }
    var typeDateFormat = '%Y-%m-%d %A';
    jQuery.getJSON('/fund/getFundInterest.do?symbol='+symbol, function(data) {

        Highcharts.setOptions({
            global: { useUTC: false },
            lang : {
                loading : 'Loading...',
                weekdays : [ sunday, monday, tuesday, wednesday, thursday, friday, saturday],
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
        var typeButtons =[
//								{type: 'day',count:7,text: '7d'}
        ];

        // Create the chart
        jQuery('#container').highcharts('StockChart', {
            chart: {
                renderTo: 'container',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                plotBackgroundColor: '#fff',
                plotBorderColor: '#e6e6e6',
                plotBorderWidth: 1,
                panning: false,
                spacingBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                style: {
                    fontFamily: '"Open Sans", sans-serif;',
                }
            },
            plotOptions: {
                area:{
                    lineColor:'#1fa4c7',
                    tooltip: {
                        valueDecimals : precision,
                        xDateFormat: typeDateFormat,

                    },
                },
            },
            colors: ['rgba(210,237,244,1)'],
            tooltip:{
                backgroundColor:'#184854',
                style: {
                    color: '#ffffff',
                    fontSize: '12px',
                    padding: '8px'
                }
            },
            lineColor:'#ff0000',
            xAxis: {
                maxZoom: 7 * 24 * 3600000,
                tickColor: '#666',
                tickLength: 0,
                tickWidth: 2,
                tickPosition: 'inside',
                title: false,
                gridLineColor: '#e6e6e6',
                labels: {
                    x: 0,
                    y: 10,
                    style: {
                        color: '#808080',
                        fontWeight: 'normal'
                    },
                    formatter: function() { return  Highcharts.dateFormat('%m-%d', this.value);}
                }
            },
            yAxis: {
                title: false,
                gridLineColor: '#e6e6e6',
                labels: {
                    x: 0,
                    y: 5,
                    style: {
                        color: '#808080',
                        fontWeight: 'normal'
                    }
                },
                showLastLabel: false,
                showFirstLabel: false
            },

            rangeSelector : {
                // 缩放选择按钮，是一个数组。
                // 其中type可以是： 'millisecond', 'second', 'minute', 'day', 'week', 'month', 'ytd' (year to date), 'year' 和 'all'。
                // 其中count是指多少个单位type。
                // 其中text是配置显示在按钮上的文字
                buttons: typeButtons,
                // 默认选择域：0（缩放按钮中的第一个）、1（缩放按钮中的第二个）……
                selected: 4,
                // 是否允许input标签选框
                inputEnabled: false,
                buttonTheme: {
                    fill: '#EEE',
                    stroke: '#e6e6e6',
                    width: 30,
                    padding: 4,
                    height: 17,
                    style: {
                        color: '#999',
                        fontWeight: 'normal'
                    },
                    states: {
                        hover: {
                            fill: 'none',
                            stroke: '#e6e6e6',
                            style: {
                                color: '#000'
                            }
                        },
                        select: {
                            fill: '#fff',
                            stroke: '#e6e6e6',
                            style: {
                                color: '#999'
                            }
                        }
                    }
                },
                labelStyle: {
                    color: '#666',
                    fontWeight: 'normal',
                    float: 'right',
                    display: 'none'
                },
            },

            navigator: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            series : [{
                name : name,
                data : data,
                type : 'area',
                threshold : null,
                exporting:{
                    // 是否允许导出
                    enabled:false

                }
            }],
            exporting:{
                // 是否允许导出
                enabled:false

            }
        });
    });
}

function getFutureRiskPreparation(symbol){
    var typeDateFormat = '%Y-%m-%d %A';
    jQuery.getJSON('/future/futureRiskPreparation.do?symbol='+symbol+'&type=0', function(data) {
        var all = data.allData ;
        var weekly = data.weekData ;
        var monthly = data.monthData;
        var symbolStr = symbol==0?"฿":"Ł";
        Highcharts.setOptions({
            global: { useUTC: false },
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
        jQuery('#container').highcharts( {
            chart: {
                type: 'line'
            },
            title: false,
            subtitle: false,
            xAxis: {
				type: 'datetime',
				labels: {
					step: 1,
					formatter: function () {
						return Highcharts.dateFormat('%m-%d', this.value);
					}
				}
			},
            yAxis: {
                title: false,
                gridLineColor: '#e6e6e6',
                labels: {
                    x: 0,
                    y: 5,
                    style: {
                        color: '#808080',
                        fontWeight: 'normal'
                    }
                },
                showLastLabel: false,
                showFirstLabel: false
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%m-%d', this.x) +': ' +symbolStr+ this.y;
                }
            },
            plotOptions: { line: { dataLabels: { enabled: true }, enableMouseTracking: false } },
            series: [{
                        name: get$("clawbackall"),
                        data: all,
                        color:'#E30000',
                        dataLabels:{color:'#E30000',formatter: function () {
							return Highcharts.numberFormat(this.y,0);
						}}
                    }]
        });
    },"json");
}

