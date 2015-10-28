(function( $, window, document, undefined ) {
    $(document).ready(function() {
      rss = typeof rss === 'undefined'? {} : rss;
      var ENUM_STRATEGY = rss.util.enum(['STRATEGY','ACCOUNT','PROCESS','PRODUCT','SYMBOL','BROKER','STATUS','PATH','TIME']);
      var ENUM_PROCESS = rss.util.enum(['NAME','PATH','PID','STATUS']);
      var ENUM_MARKET = rss.util.enum(['TYPE','NAME','CONNECTION','DESCRIPTION','STATUS','PATH']);
      var ENUM_DISK = rss.util.enum(['MOUNT','FREE','TOTAL','STATUS']);
      var ENUM_MEMORY = rss.util.enum(['TYPE','FREE','TOTAL','STATUS']);
      var EVENT_SELECT = 'event.select';
      var strategyInfo = [];
      var strategies = {};
      
      var ipHost = "192.168.1.1(h1)";
      var wsKdb;
      
      // websocket connect to Kdb to get the strategy
      var wsKdbConnect = function() {
        // Connect when there is no existing connection.
        if (!wsKdb || !wsKdb.readyState || wsKdb.readyState !== 1) {
          wsKdb = new WebSocket(rss.kdb_url);
          wsKdb.binaryType = 'arraybuffer';
          wsKdb.onopen = function(e) {
            console.log("WS to kdb+ connected");
            wsKdb.send(kdb.serialize(['loadStrategy',[]]));
            wsKdb.send(kdb.serialize(['loadLinkContractStrategy',[]]));
          };
          
          wsKdb.onclose = function(e) {
            console.log("WS to kdb+ disconnected");
          };
          
          wsKdb.onerror = function(e) {
            console.log("WS to kdb+ error:" + e.data);
          };
          
          wsKdb.onmessage = function(e) {
            var arrayBuffer = e.data;
            if (arrayBuffer) {
              var v = kdb.deserialize(arrayBuffer);
              var dataType = v[0];
              var rawData = v[1];
              var item, idx;
              if (dataType === 'getStrategy') {
                for (idx = 0; idx < rawData.length; idx++) {
                  // strategies has this key
                  if (rawData[idx]['IPHostName'] === ipHost) {
                    var strategyKey = rawData[idx]['Strategy'];
                    if (strategyKey in strategies) {
                      var ts = strategies[stragegyKey];
                      ts[0] = rawData[idx]['Strategy'];
                      ts[1] = rawData[idx]['Account'];
                      ts[2] = rawData[idx]['TraderPath'];
                      ts[5] = rawData[idx]['Broker'];
                      ts[6] = rawData[idx]['Status'];
                      ts[7] = rawData[idx]['TraderPath'];
                      ts[7] = rawData[idx]['time'];
                      strategies[stragegyKey] = ts;
                    } else {
                      var entry = [];
                      entry.push(rawData[idx]['Strategy']);
                      entry.push(rawData[idx]['Account']);
                      entry.push(rawData[idx]['TraderPath']);
                      // reserve two cells to store contract and product
                      entry.push("");
                      entry.push("");
                      entry.push(rawData[idx]['Broker']);
                      entry.push(rawData[idx]['Status']);
                      entry.push(rawData[idx]['TraderPath']);
                      entry.push(rawData[idx]['time']);
                      strategies[entry[0]] = entry;
                    }
                  }
                }
              } else if (dataType === 'getContractInStrategy') {
                for (idx = 0; idx < rawData.length; idx++) {
                  if (rawData[idx]['IPHostName'] === ipHost) {
                    var ts = rawData[idx]['Strategy'];
                    var tc = rawData[idx]['Contract'];
                    if (ts in strategies) {
                      strategies[ts][ENUM_STRATEGY.PRODUCT] = ts;
                      strategies[ts][ENUM_STRATEGY.SYMBOL] = ts;
                    } else {
                      var ta = ["", "", "", ts, ts, "", "","",""];
                      strategies[ts] = ta;
                    }
                  }
                }
              }
              // format the strategy info and store in strategyInfo
              idx = 0;
              accountInfo = [];
              for (item in strategies) {
                var t = strategies[item];
                strategyInfo[idx++] = t;
              }
              if (strategyInfo.length != 0) {
                rss.util.updateDataTable('stragegy_list', strategyInfo, 0, true, true);
              }
            }
          }
        }
      }
      wsKdbConnect();
      
      // After idle for 15 mins, close the websocket to save bandwidth. Reconnect once user activity is detected.
      $(document).idle({
        onIdle: function(){
          console.log('Session idle for 15 mins. Disconnecting from kdb+.');
          wsKdb.close();
        },
        onActive: function(){
          console.log('Session active. Connecting to kdb+.');
          wsKdbConnect();
        },
        idle: 15 * 60 * 1000
      });
      
      
      // websocket message handler
      var wsMsgHandler = function (response) {
        var resp = JSON.parse(response);
        if (resp.type == rss.websocket_type) {
          if (resp.data.process_data) {
            rss.util.updateDataTable('process_state',resp.data.process_data,0);
          }
          if (resp.data.market_data) {
            rss.util.updateDataTable('market_state',resp.data.market_data,0);
          }
          if (resp.data.strategy_data) {
            rss.util.updateDataTable('strategy_list',resp.data.strategy_data,0);
          }
        }
      };
      
      // initial web socket object
      var ws4redis = WS4Redis({
        uri : rss.websocket_url,
        type : rss.websocket_type,
        receive_message : wsMsgHandler
      });
      
      // common configuration for datatables
      var commonTableConfig = {
        "responsive": true,
        "iDisplayLength" : 9,
        "aLengthMenu" : [ [ 9, 15, 20 ], [ 9, 15, 20 ] ],
        "sPaginationType" : "full_numbers",
        "bAutoWidth" : false,
        "AutoWidth" : false,
        "processing": true,
        "bStateSave" : false,
        "bDeferRender" : false,
        "bPaginate" : true,
        "bFilter" : true,
        "searching" : true,
        "sDom" : 'T<"top"<"title">f>rt<"pages"lpi><"clear">',
        "bServerSide" : false,
        "oTableTools" : {
          "sRowSelect" : "none",
          "fnRowSelected" : function(node) {
          },
          "aButtons" : [],
        },
        "oLanguage": {
          "sProcessing": '&nbsp;&nbsp;<i class="fa fa-refresh fa-spin"></i>'
        },
        "fnInitComplete": function(settings, json) {
          if (settings.oInit.sTableTitle) {
            $('#' + settings.sTableId + '_wrapper').find('.title').text(settings.oInit.sTableTitle);
          }
        },
        "fnRowCallback" : function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        },
        "fnDrawCallback" : function() {
          // Hide search box if there is no entry at all
          if (this.fnSettings().fnRecordsDisplay() < 1 && this.fnSettings().oPreviousSearch.sSearch.length < 1) {
            $('#' + this.fnSettings().sTableId + '_filter').hide();
          } else {
            $('#' + this.fnSettings().sTableId + '_filter').show();
          }
          // Hide pagination controls when all entries are displayed already
          if (this.fnSettings().fnRecordsDisplay() <= this.fnSettings().oInit.iDisplayLength) {
            $('#' + this.fnSettings().sTableId + '_paginate').hide(); 
            $('#' + this.fnSettings().sTableId + '_length').hide(); 
            $('#' + this.fnSettings().sTableId + '_info').hide(); 
          } else { 
            $('#' + this.fnSettings().sTableId + '_paginate').show(); 
            $('#' + this.fnSettings().sTableId + '_length').show(); 
            $('#' + this.fnSettings().sTableId + '_info').show(); 
          }
        }
      };
      
      // trader process
      var processTable = $("#process_state").dataTable($.extend({}, commonTableConfig, {
        "sTableTitle": "PROCESS",
      }));
      
      // market connection status
      var marketTable = $("#market_state").dataTable($.extend({}, commonTableConfig, {
        "sTableTitle": "MARKET",
        
      }));
      
      // strategy table
      var strategyTable = $("#strategy_list").dataTable($.extend({}, commonTableConfig, {
        "sTableTitle" : "STRATEGY",
      }));
      
      // add the link to system configuration page
      var addSystemConfig = function(process_list) {
        var idx, path, tagA;
        for (idx in process_list) {
          path = process_list[idx][ENUM_PROCESS.PATH];
          tagA = '<a href="' + rss.system_config_url + '?iphost=' + ipHost + '&traderpath=' + path + '">';
          process_list[idx][ENUM_PROCESS.PATH] = tagA + path + '</a>';
        }
        return process_list;
      }
      
      // add the link to tunnel and quote configuration pageabc
      var addMarketConfig = function(market_list) {
        var idx, path, tagA, type, name;
        for (idx in market_list) {
          path = market_list[idx][ENUM_MARKET.PATH];
          name = market_list[idx][ENUM_MARKET.NAME];
          type = market_list[idx][ENUM_MARKET.TYPE];
          
          if (type === 'quote') {
            tagA = '<a href="' + rss.quote_config_url + '?iphost=' + ipHost + '&traderpath=' + path + '">';
          } else if (type === 'tunnel') {
            tagA = '<a href="' + rss.tunnel_config_url + '?iphost=' + ipHost + '&traderpath=' + path + '">';
          }
          market_list[idx][ENUM_MARKET.NAME] = tagA + name + '</a>';
        }
        return market_list;
      }
      
      // add the link to account, strategy and contract configuration page
      var addStrategyConfig = function(strategy_list) {
        var idx, path, tagA, account, strategy, symbol;
        for (idx in strategy_list) {
          path = strategy_list[idx][ENUM_STRATEGY.PATH];
          strategy = strategy_list[idx][ENUM_STRATEGY.STRATEGY];
          account = strategy_list[idx][ENUM_STRATEGY.ACCOUNT];
          symbol = strategy_list[idx][ENUM_STRATEGY.SYMBOL];
          
          tagA = '<a href="' + rss.account_config_url + '?iphost=' + ipHost + '&traderpath=' + path + '">';
          strategy_list[idx][ENUM_STRATEGY.ACCOUNT] = tagA + account + '</a>';
          
          tagA = '<a href="' + rss.strategy_config_url + '?iphost=' + ipHost + '&traderpath=' + path + '">';
          strategy_list[idx][ENUM_STRATEGY.STRATEGY] = tagA + strategy + '</a>';
          
          tagA = '<a href="' + rss.symbol_config_url + '?iphost=' + ipHost + '&traderpath=' + path + '">';
          strategy_list[idx][ENUM_STRATEGY.SYMBOL] = tagA + symbol + '</a>';
        }
        
        return strategy_list;
      }
      
      // initial the server list link
      var dropdownInitial = function(server_list, current_server) {
        if (server_list == [] && current_server === "")
          return;
        // the default current server is the first server in server list
        if (!current_server) {
          current_server = server_list[0];
        }
        var t = current_server + '<span class="caret"></span>';
        $('#current_server').text('').append(t);
        t = '';
        for (x in server_list) {
          t += '<li><a href="' + rss.monitor_detail_url + '?ipHost='+ server_list[x] +'">' + server_list[x] + '</a></li>';
        }
        $('#local_server_list').empty().append(t);
      }
      
      // html5 canvas - draw a circle progress bar
      var drowProgress = function(x,y,radius,process,backColor,proColor,fontColor){
        var canvas = document.getElementById('myCanvas');
        if (canvas.getContext) {
          var cts = canvas.getContext('2d');
        }else{
          return;
        }
        cts.beginPath();
        cts.moveTo(x, y);
        cts.arc(x, y, radius, 0, Math.PI * 2, false);
        cts.closePath();
        cts.fillStyle = backColor;
        
        cts.fill();
  
        cts.beginPath();
        cts.moveTo(x, y);
        cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 -  Math.PI * 2 * process / 100, true);
        cts.closePath();
        cts.fillStyle = proColor;
        cts.fill();
        
        cts.beginPath();
        cts.moveTo(x, y);
        cts.arc(x, y, radius - (radius * 0.26), 0, Math.PI * 2, true);
        cts.closePath();
        cts.fillStyle = 'rgba(255,255,255,1)'; // white
        cts.fill();
  
        cts.beginPath();  
        cts.arc(x, y, radius-(radius*0.30), 0, Math.PI * 2, true);  
        cts.closePath();
        cts.strokeStyle = backColor;  
        cts.stroke();
        cts.font = "bold 9pt Arial";
        cts.fillStyle = fontColor;
        cts.textAlign = 'center';
        cts.textBaseline = 'middle';
        cts.moveTo(x, y);
        cts.fillText(process+"%", x, y);
      };
      
      // package a drawProgress function to hidden the color input
      var colorDraw = function(x, y, radius, l) {
        if(l > 100 || l < 0)
          return;
        var drawColor = '#FF7F50';
        if(l >= 80) {
          drawColor = '#E74C3C';
        } else if (l >= 50) {
          drawColor = '#FF7F50';
        } else {
          drawColor = '#6495ED';
        }
        drowProgress(x,y,radius,l,'#ddd',drawColor,drawColor);
      }
      
      // draw three load average progress
      var drawLoadAverage = function(l1, l2, l3) {
        colorDraw(80,45,40,l1);
        colorDraw(273,45,40,l2);
        colorDraw(468,45,40,l3);
      }
      drawLoadAverage(82,53,30);
      
      
      // disk usage initial
      var disk = [["/","21423","22365","1"],
                  ["/root","10223","22363","0"],
                  ["/home","3232","5203","0"]];
      var updateDiskUsage = function(diskInfo) {
        var diskTableRow = $('#disk_usage').children('thead');
        if ($('#disk_usage').children('tbody').length) {
          $('#disk_usage').children('tbody').remove();
        }
        var diskShowInfo = "<tbody>";
        var i;
        for (i in diskInfo) {
          // disk abnormal status
          if (parseInt(diskInfo[i][ENUM_DISK.STATUS]) != 0) {
            diskShowInfo += '<tr style="background-color:#ffd197">';
          } else {
            diskShowInfo += '<tr>';
          }
          diskShowInfo += '<td>' + diskInfo[i][ENUM_DISK.MOUNT] + '</td>' + '<td>' + diskInfo[i][ENUM_DISK.FREE] + '</td>';
          diskShowInfo += '<td>' + diskInfo[i][ENUM_DISK.TOTAL] + '</td>' + '<td>' + diskInfo[i][ENUM_DISK.STATUS] + '</td>';
          var useRate = (parseInt(diskInfo[i][ENUM_DISK.TOTAL]) - parseInt(diskInfo[i][ENUM_DISK.FREE])) * 100 / (parseInt(diskInfo[i][ENUM_DISK.TOTAL]));
          useRate = useRate.toFixed(1);
          diskShowInfo += '<td><progress max="100" value="'+ useRate +'"></progress>' + useRate + '%</td></tr>';
        }
        diskShowInfo += '</tbody>';
        diskTableRow.after(diskShowInfo);
      }
      updateDiskUsage(disk);
      
      // update the process state
      var pro =  [["1","/home/mycapitaltrade/mytrader_test527/1","2321","0"],
                  ["2","/home/mycapitaltrade/mytrader_test527/2","2322","1"],
                  ["3","/home/mycapitaltrade/mytrader_test527/3","2323","2"],
                  ["4","/home/mycapitaltrade/mytrader_test527/4","2324","0"],
                  ["5","/home/mycapitaltrade/mytrader_test527/5","2325","1"],
                  ["2","/home/mycapitaltrade/mytrader_test527/2","2322","1"],
                  ["3","/home/mycapitaltrade/mytrader_test527/3","2323","2"],
                  ["4","/home/mycapitaltrade/mytrader_test527/4","2324","0"],
                  ["2","/home/mycapitaltrade/mytrader_test527/2","2322","1"],
                  ["3","/home/mycapitaltrade/mytrader_test527/3","2323","2"],
                  ["4","/home/mycapitaltrade/mytrader_test527/4","2324","0"],
                  ["2","/home/mycapitaltrade/mytrader_test527/2","2322","1"],
                  ["3","/home/mycapitaltrade/mytrader_test527/3","2323","2"],
                  ["4","/home/mycapitaltrade/mytrader_test527/4","2324","0"],
                  ["6","/home/mycapitaltrade/mytrader_test527/6","2326","0"]];
      rss.util.updateDataTable('process_state',addSystemConfig(pro),0);
      
      // memory initial
      var memory = [['RAM','10','256','0'],['SWAP','50','256','1']];
      var updateMemory = function(memoryInfo) {
        var memoryTableRow = $('#memory_swap').children('thead');
        // remove the exist document node
        if ($('#memory_swap').children('tbody').length) {
          $('#memory_swap').children('tbody').remove();
        }
        var memoryShowInfo = "<tbody>";
        var i, useRate;
        for (i in memoryInfo) {
          // memory abnormal status
          if (parseInt(memoryInfo[i][ENUM_DISK.STATUS]) != 0) {
            memoryShowInfo += '<tr style="background-color:#ffd197">';
          } else {
            memoryShowInfo += '<tr>';
          }
          memoryShowInfo += '<td>' + memoryInfo[i][ENUM_MEMORY.TYPE] + '</td>' + '<td>' + memoryInfo[i][ENUM_MEMORY.FREE] + '</td>';
          memoryShowInfo += '<td>' + memoryInfo[i][ENUM_MEMORY.TOTAL] + '</td><td>' + memoryInfo[i][ENUM_MEMORY.STATUS] + '</td>';
          useRate = (parseInt(memoryInfo[i][ENUM_MEMORY.TOTAL]) - parseInt(memoryInfo[i][ENUM_MEMORY.FREE])) * 100/ (parseInt(memoryInfo[i][ENUM_MEMORY.TOTAL]));
          useRate = useRate.toFixed(1);
          memoryShowInfo += '<td><progress max="100" value="' + useRate + '"></progress>' + useRate + '%</td></tr>';
        }
        memoryShowInfo += '</tbody>';
        memoryTableRow.after(memoryShowInfo);
      }
      updateMemory(memory);
      
      // system initial(hostname,os,ip,uptime)
      systemKeys = ['Hostname','OS','IP','Uptime','Process'];
      systemInfo = ['h1','#1 SMP Debian 3.16.7 - ckt11 -1+ deb8u3 (2015-08-04)','192.168.1.1','1563','123'];
      var updateSystem = function(systemInfo) {
        var systemTableRow = $('#system_info');
        var i;
        if ($('#system_info').children('tbody').length) {
          $('#system_info').children('tbody').remove();
        }
        var systemShowInfo = "<tbody>";
        for (i = 0; i < systemKeys.length; i++) {
          systemShowInfo += '<tr><td>' + systemKeys[i] + '</td><td>' + systemInfo[i] + '</td></tr>';
        }
        systemShowInfo += '</tbody>';
        systemTableRow.append(systemShowInfo);
      }
      updateSystem(systemInfo);
      
      // update market
      // update strategy
      var mkt = [["quote","abc","3","4","5","/home/mycapitaltrade/mytrader_test527/1"],
                 ["quote","bcd","3","4","5","/home/mycapitaltrade/mytrader_test527/1"],
                 ["tunnel","bcd","3","4","5","/home/mycapitaltrade/mytrader_test527/1"],
                 ["tunnel","bcd","3","4","5","/home/mycapitaltrade/mytrader_test527/1"],
                 ["tunnel","bcd","3","4","5","/home/mycapitaltrade/mytrader_test527/1"],
                 ["tunnel","bcd","3","4","5","/home/mycapitaltrade/mytrader_test527/1"],
                 ["tunnel","bcd","3","4","5","/home/mycapitaltrade/mytrader_test527/1"],
                 ["quote","bcd","3","4","5","/home/mycapitaltrade/mytrader_test527/1"],
                 ["quote","bcd","3","4","5","/home/mycapitaltrade/mytrader_test527/1"],
                 ["quote","bcd","3","4","5","/home/mycapitaltrade/mytrader_test527/1"],
                 ["tunnel","bcd","3","4","5","/home/mycapitaltrade/mytrader_test527/1"]];
      rss.util.updateDataTable('market_state',addMarketConfig(mkt),0);
      
      // update strategy
      var mkt = [["1","abc","3","4","5","6","7","/home/mycapitaltrade/mytrader_test527/1","9"],
                 ["1","bcd","3","4","5","6","7","/home/mycapitaltrade/mytrader_test527/1","9"],
                 ["1","bcd","3","4","5","6","8","/home/mycapitaltrade/mytrader_test527/1","9"],
                 ["1","bcd","3","4","5","6","8","/home/mycapitaltrade/mytrader_test527/1","9"],
                 ["1","bcd","3","4","5","6","8","/home/mycapitaltrade/mytrader_test527/1","9"],
                 ["1","bcd","3","4","5","6","8","/home/mycapitaltrade/mytrader_test527/1","9"],
                 ["1","bcd","3","4","5","6","8","/home/mycapitaltrade/mytrader_test527/1","9"],
                 ["1","bcd","3","4","5","6","8","/home/mycapitaltrade/mytrader_test527/1","9"],
                 ["1","bcd","3","4","5","6","8","/home/mycapitaltrade/mytrader_test527/1","9"],
                 ["1","bcd","3","4","5","6","8","/home/mycapitaltrade/mytrader_test527/1","9"],
                 ["1","bcd","3","4","5","6","8","/home/mycapitaltrade/mytrader_test527/1","9"]];
      rss.util.updateDataTable('strategy_list',addStrategyConfig(mkt),0);
      
      // adjust the plot while shrinking or magnifying the window
      $(window).on('resize', function() {
        $('.second.circle').circleProgress();
      });
      
      staInfo = ["23-23","33-33","24-22","66-66","78-44"];
      var updateStatistic = function(statisticInfo) {
        var statisticTableRow = $('#statistic_info');
        if (statisticTableRow.children('tbody').length) {
          $('#statistic_info').children('tbody').remove();
        }
        var statisticShowInfo = "<tbody><tr>";
        var i;
        for (i = 0; i < statisticInfo.length; i++) {
          var t = statisticInfo[i].split('-');
          if (t[0] === t[1]) {
            statisticShowInfo += '<td>' + statisticInfo[i] + '</td>';
          } else {
            statisticShowInfo += '<td style="background-color:#ffd197">' + statisticInfo[i] + '</td>';
          }
        }
        statisticShowInfo += "</tr></tbody>";
        statisticTableRow.append(statisticShowInfo);
      }
      updateStatistic(staInfo);
      
      // get the hostname from url
      var $_GET = (function(){
        var url = window.document.location.href.toString();
        var u = url.split("?");
        if(typeof(u[1]) == "string"){
            u = u[1].split("&");
            var get = {};
            for(var i in u){
                var j = u[i].split("=");
                  get[j[0]] = j[1];
              }
              return get;
          } else {
              return {};
          }
      })();
      ipHost = $_GET['ipHost'];
      dropdownInitial([],ipHost);
      
      var testfun = function() {
        var x = Math.ceil(Math.random()*100);
        var y = Math.ceil(Math.random()*100);
        var z = Math.ceil(Math.random()*100);
        drawLoadAverage(x,y,z);
        disk[0][1] = Math.ceil(Math.random()*50);
        disk[0][2] = disk[0][1]+50;
        disk[1][1] = Math.ceil(Math.random()*50);
        disk[1][2] = disk[1][1]+50;
        updateDiskUsage(disk);
        
        memory[0][1] = Math.ceil(Math.random()*50);
        memory[0][2] = disk[0][1]+50;
        memory[1][1] = Math.ceil(Math.random()*50);
        memory[1][2] = disk[1][1]+50;
        
        var hostlist = ['192.168.1.2(h2)','192.168.1.3(h3)','192.168.1.4(h4)','192.168.1.5(h5)'];
        dropdownInitial(hostlist,ipHost);
        updateMemory(memory);
      }
      var t = setInterval(testfun,1000);
      
      $.circleProgress.defaults.size = 80;
      var mf = function(){
        var value = parseInt(Math.random()*100);
        var color = '#6495ED';
        if (value > 80 || value < 0)
          value = 0;
        if (value > 80) {
          color = '#E74C3C';
        } else if(value > 50) {
          color = '#FF7F50';
        }
        $('.second.circle').circleProgress({
          animation: false, 
          value: value/100, 
          startAngle: -Math.PI/2,
          reverse: true,
          thickness: 10,
          fill: { color: color }
        });
        var spanhtml = '<span style="color:' + color + '">' + value + '%</span>';
        $('.second.circle').find('strong').html(spanhtml);
      }
      setInterval(mf,1000);
      
 });
}) (jQuery, window, document);
