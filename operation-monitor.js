(function( $, window, document, undefined ) {
    $(document).ready(function() {
      rss = typeof rss === 'undefined'? {} : rss;
      var type = ["info","success","error"];
      var stack_topleft = {"dir1": "up", "dir2": "left", "push": "down"};
      var notice;
      var notice_closed = false;
      var selectedServer;
      var ENUM_SERVER = rss.util.enum(['IP','HOST_NAME','LOCATION','CPU','MEMORY','NORMAL_TOTAL_PROCESS']);
      var ENUM_STRATEGY = rss.util.enum(['STRATEGY','ACCOUNT','PROCESS','PRODUCT','SYMBOL','STRATEGY_STATUS']);
      var ENUM_PROGRAM = rss.util.enum(['HOST_NAME','TRADING_PROGRAM','OUTPUT']);
      var ENUM_PROCESS = rss.util.enum(['HOST_NAME','PROCESS_NAME','PROCESS_TYPE','PROCESS_STATUS','UPDATE_TIME']);
      var ENUM_ACCOUNT = rss.util.enum(['ACCOUNT','COMPANY']);
      var EVENT_PLOT = 'event.plot';
      var EVENT_SELECT = 'event.select';
      
      // plot option (jQuery flot plugin)
      var options = {
          grid: { hoverable: true },
          series: { shadowSize: 0, lines: { show: true }, points: { show: true } }, 
          lines: { color: ["#3c8dbc", "#f56954"] },
          yaxis: { min: 0, max: 100 },
          xaxis: { show: true, min: 0, max: 9 },
          width: '100%'
      };
      var plot = $.plot("#line-chart", [{label:"cpu",data:[]}, {label:"memory",data:[]}], options);
      
      // ip -> cpu,mem store in rss.serverStatus
      var trackServerStatus = function(ip, cpu, mem) {
        if (typeof rss.serverStatus === 'undefined') {
          rss.serverStatus = {};
        }
        if (ip in rss.serverStatus) {
          // left shift data
          rss.serverStatus[ip]['cpu'].pop();
          rss.serverStatus[ip]['mem'].pop();
          for(i=0;i<9;i++){
            rss.serverStatus[ip]['cpu'][i][0]++;
            rss.serverStatus[ip]['mem'][i][0]++;
          }
          rss.serverStatus[ip]['cpu'].unshift([0,cpu]);
          rss.serverStatus[ip]['mem'].unshift([0,mem]);
        } else {
          rss.serverStatus[ip] = {cpu:[[0,cpu],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0]], 
                                  mem:[[0,mem],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0]]};
        }
      };
      
      // Abstract notify popup in rss: 0-info, 1-success, 2-error
      var notify = {
          create:function(level, title, details) {
            // default level = 0
            level = parseInt(level);
            if (level > 2 || level < 0) {
              level = 0;
            }
            if (typeof notice !== "object") {
              notice = new PNotify({
                title: title,
                text: details,
                type: type[level],
                hide: false,
                addclass: "stack-bottomright",
                stack: stack_topleft,
                buttons: {
                  closer: true,
                  sticker: false
                }
              });
              notice.get().click(function(e) {
                if ($('.ui-pnotify-closer, .ui-pnotify-closer *').is(e.target)){
                  console.log("notify closed");
                  notice_closed = true;
                }
              });
            } else if (notice) {
              // update the container of the notification
              notice.update({
                title: title,
                text: details,
                type: type[level]
              });
              // reopen the notification while it's closed
              if(notice_closed){
                console.log("notify reopen!");
                // initial the object in case of showing a list of notice
                notice.init();
                notice.get().click(function(e) {
                  if ($('.ui-pnotify-closer, .ui-pnotify-closer *').is(e.target)){
                    // console.log("notify closed");
                    notice_closed = true;
                  }
                });
                notice_closed = false;
              }
            }
            console.log(notice_closed);
          },
          remove:function(){
            if(notice.remove){
              notice.remove();
            }
          }
      };
      
      // Process notify message
      var dealNotifyInfo = function(Msg) {
        var level = Msg[0];
        var title = Msg[1];
        var details = Msg[2];
        // var time = Msg[3];
        
        // play bell_ring once at 1/10 rate 
        var t = parseInt(Math.random()*10);
        if(t < 2) {
          notify.create(level,title,details);
          ion.sound({
            sounds: [ { name: "beer_can_opening" },
                      { name: "bell_ring" }
            ],
            volume: 1,
            path: "/static/platform/sounds/",
            preload: true
          });
          ion.sound.play("bell_ring");
        }
      }
      // websocket message handler
      var wsMsgHandler = function (response) {
        var resp = JSON.parse(response);
        if (resp.type == rss.websocket_type) {
          if (resp.data.statistical_data) {
            rss.util.updateDataTable('statistics_list',resp.data.statistical_data,0);
          }
          if (resp.data.server_data) {
            rss.util.updateDataTable('server_list',resp.data.server_data,0,true,true);
            var x = resp.data.server_data;
            for (var i=0; i< x.length; i++) {
              var ip = x[i][0];
              var cpu = x[i][3];
              var mem = x[i][4];
              // console.log(ip + cpu + mem);
              if(ip) {
                // remove character '%' and convert to int format
                trackServerStatus(x[i][0],parseInt(cpu.substring(0,cpu.length-1)),parseInt(mem.substring(0,mem.length-1)));
                $('#server_list').trigger(EVENT_PLOT);
                
              }
            }
          }
          if (resp.data.process_data) {
            rss.util.updateDataTable('process_state',resp.data.process_data,0);
          }
          if (resp.data.market_data) {
            rss.util.updateDataTable('market_state',resp.data.market_data,0);
          }
          if (resp.data.program_data) {
            rss.util.updateDataTable('program_info',resp.data.program_data,0);
          }
          if (resp.data.strategy_data) {
            rss.util.updateDataTable('strategy_list',resp.data.strategy_data,0);
          }
          if (resp.data.log_data) {
            rss.util.updateDataTable('log_list',resp.data.log_data,0);
          }
          if (resp.data.notify_data) {
            dealNotifyInfo(resp.data.notify_data);
          }
        }
      };
      
      // initial web socket object
      var ws4redis = WS4Redis({
        uri : rss.websocket_url,
        type : rss.websocket_type,
        receive_message : wsMsgHandler
      });
      
      // plot specific server status according to ip
      var plotServerStatus = function(ip) {
        if (typeof rss.serverStatus === 'undefined') {
          rss.serverStatus = {};
        }
        if (ip in rss.serverStatus) {
          plot.setData([rss.serverStatus[ip]['cpu'],rss.serverStatus[ip]['mem']]);
          plot.draw();
        }
      };
      var boxDragControl = rss.util.draggable(['monitor_box_account', 
                                               'monitor_box_server', 
                                               'monitor_box_statistics',
                                               'monitor_box_process',
                                               'monitor_box_market',
                                               'monitor_box_strategy',
                                               'monitor_box_log',
                                               'monitor_box_program'], 
                                               'monitor_panel_box_position', true);
      boxDragControl.loadPosition();
      
      $('#btn_config_box_position').click(function() {
        if (!boxDragControl.isActivated()) {
          boxDragControl.activate();
          $('#btn_edit_position').addClass('hidden');
          $('#btn_save_position').removeClass('hidden');
        }
      });
      
      $('#btn_save_position').click(function() {
        if (boxDragControl.isActivated()) {
          boxDragControl.deactivate();
          boxDragControl.savePosition();
        }
        $('#btn_edit_position').removeClass('hidden');
        $('#btn_save_position').addClass('hidden');
      });
      
      $('#btn_reset_position').click(function(){
        boxDragControl.resetPosition();
        window.location.reload(false);
      })
      
      $("<div class='tooltip-inner' id='line-chart-tooltip'></div>").css({
          position: "absolute",
          display: "none",
          opacity: 0.8
      }).appendTo("body");
      $("#line-chart").bind("plothover", function (event, pos, item) {

          if (item) {
            var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);

            $("#line-chart-tooltip").html(y+"%")
                    .css({top: item.pageY + 5, left: item.pageX + 5})
                    .fadeIn(200);
          } else {
            $("#line-chart-tooltip").hide();
          }

        });
      
      var commonTableConfig = {
        "responsive": true,
        "iDisplayLength" : 10,
        "aLengthMenu" : [ [ 10, 15, 20 ], [ 10, 15, 20 ] ],
        "sPaginationType" : "full_numbers",
        "bAutoWidth" : false,
        "AutoWidth" : false,
        "bDeferRender" : true,
        "processing": true,
        "bStateSave" : false,
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
      
      // account
      var accountTable = $("#accts_list").dataTable($.extend({}, commonTableConfig, {
        "sTableTitle": "Account",
        "sScrollXInner": "100%",
        "bProcessing" : true,
        "bServerSide": true,
        "sAjaxSource": "ajax_getaccount/",
        "oTableTools" : {
           "sRowSelect" : "multi",
           "fnRowSelected" : function(node) {},
           "aButtons" : [],
         },
        "fnServerData":function(sSource, aoData, fnCallback){
            $.getJSON(sSource, aoData, function (json) { 
                $select_line_acct = null;
                fnCallback(json);
            });  
         }
      }));
      // Server
      var serverTable = $("#server_list").dataTable($.extend({}, commonTableConfig, {
        "sTableTitle": "Server",
        "bPaginate": false,
        "bFilter": false,
        "bLengthChange":false,
        "oTableTools" : {
          "sRowSelect" : "single",
          "fnRowSelected" : function(node) {},
          "aButtons" : [],
        },
      }));
      // Statistic
      var statisticTable = $("#statistics_list").dataTable($.extend({}, commonTableConfig, {
        "sTableTitle": "Statistic",
        "bPaginate": false,
        "bFilter": false,
        "bLengthChange":false,
        //"sScrollY": '100px'
      }));
      // Process
      var processTable = $("#process_state").dataTable($.extend({}, commonTableConfig, {
        "sTableTitle": "Process",
        "bPaginate": false,
      }));
      // Market
      var marketTable = $("#market_state").dataTable($.extend({}, commonTableConfig, {
        "sTableTitle": "Market",
        "bPaginate": false,
        "bFilter": false,
        "bLengthChange":false,
      }));
      // Program
      var programTable = $("#program_info").dataTable($.extend({}, commonTableConfig, {
        "sTableTitle": "Program",
      }));
      // Strategy
      var strategyTable = $("#strategy_list").dataTable($.extend({}, commonTableConfig, {
        "sTableTitle" : "Stategy",
      }));
      // Log
      var logTable = $("#log_list").dataTable($.extend({}, commonTableConfig, {
          "sTableTitle": "Log",
          "aaSorting": [[2, "desc"]]
      }));
      
      // trigger plot event and filter event
      serverTable.on( 'click', 'tr', function () { 
        var tableId = $(this).parents('table').attr('id');
        if (tableId) {
          var selectedData = TableTools.fnGetInstance(tableId).fnGetSelectedData();
          var filters = [];
          for (var idx = 0; idx < selectedData.length; idx++) {
            var row = selectedData[idx];
            filters.push(row[ENUM_SERVER.IP]);
          }
          selectedServer = filters;
          $(this).parents('table').trigger(EVENT_PLOT);
          $(this).parents('table').trigger(EVENT_SELECT);
       }
      });
      
      // filter program_list and process_list when select a row in server_list 
      serverTable.on(EVENT_SELECT, function(){
        var tableId = $(this).attr('id');
        if (tableId) {
          var selectedData = TableTools.fnGetInstance(tableId).fnGetSelectedData();
          var filters = [];
          for (var idx = 0; idx < selectedData.length; idx++) {
            var row = selectedData[idx];
            filters.push(row[ENUM_SERVER.HOST_NAME]);
          }
          // Filter contract in other tables by regex
          programTable.fnFilter(filters.join('|'), ENUM_PROGRAM.HOST_NAME, true);
          processTable.fnFilter(filters.join('|'), ENUM_PROCESS.HOST_NAME, true);
       } 
      });
      
      
      // server_list selected event (refresh plot according to selected ip)
      serverTable.on(EVENT_PLOT, function() {
        if(selectedServer) {
          plotServerStatus(selectedServer);
        }else{
          $.plot("#line-chart", [{label:"cpu",data:[]}, {label:"memory",data:[]}], options);
        }
      });
      
      // select multiply accounts trigger the select event
      accountTable.on( 'click', 'tr', function () {
        $(this).parents('table').trigger(EVENT_SELECT);
      });
      // filter the data in strategy table
      accountTable.on(EVENT_SELECT, function() {
        var tableId = $(this).attr('id');
        if (tableId) {
          var selectedData = TableTools.fnGetInstance(tableId).fnGetSelectedData();
          var filters = [];
          for (var idx = 0; idx < selectedData.length; idx++) {
            var row = selectedData[idx];
            filters.push(row[ENUM_ACCOUNT.ACCOUNT]);
          }
          // Filter contract in other tables by regex
          strategyTable.fnFilter(filters.join('|'), ENUM_STRATEGY.ACCOUNT, true);
          console.log(filters);
        }
      });
      // adjust the plot while shrinking or magnifying the window
      $(window).on('resize', function() {
        $.plot("#line-chart", [{label:"cpu",data:[]}, {label:"memory",data:[]}], options);
        plotServerStatus(selectedServer);
      });


      
 });
}) (jQuery, window, document);
