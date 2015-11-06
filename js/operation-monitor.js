(function( $, window, document, undefined ) {
  $(document).ready(function() {
    var NORMAL_STATE    =  1;
    var ABNORMAL_STATE  = -1;
    var NOT_UPDATE      = -2;                   // process_time not update for a while in redis
    var preServerList   = {};                   // previous server list
    var curServerList   = {};                   // current server list
    var preServerStatus = {};                   // each hostip's status on pre sending
    var regExp          = /\(([^)]+)\)/;        // regular expression to filter IP and HostName
    var strategyMap     = {};                   // map: iphost - strategy - status
    var strategyProMap  = {};                   // map: iphost - normal/total
    var strategyStaMap  = {};                   // map: iphost - status
    var wsKdb;
    var ERROR_MESSAGE   = "P_Error";
    var MAX_SHOW_LENGTH = 128;
    var MAX_ID          = 16;
    var MAX_PANELS      = 100;
    var ROW_PANELS      = 6;
    var panelNums       = 0;


    var createPanel = function(IPHost, server) {
      if (panelNums < 0 || panelNums > MAX_PANELS) {
        return;
      }
      var innerHtml = "";
      var body = assembleHtml(server);
      var title = server.title;
      var status = server.status;
      // create a row
      innerHtml += '<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 thumbnail server_panel">\n';
      innerHtml += '<div class="server_title">'+title+'</div><div class="server_body">'+body+'</div></div>\n';
      if (panelNums === 0) {
        $("#monitor_panels").html(innerHtml);
      } else {
        $("#monitor_panels").children("a:last-child").after(innerHtml);
      }
      $panel = getPanel(IPHost);
      if ($panel) {
        wrapLabel($panel, IPHost);
        $title = $panel.children('.server_title');
        if ($title) {
          adjustStatus($title, status);
        }
      }
      panelNums += 1;
    };

    deletePanel = function(IPHost) {
      $panel = getPanel(IPHost);
      if ($panel == undefined) {
        console.log("not find", IPHost);
        return;
      }
      if ($panel.attr('class') === "col-xs-6 col-sm-4 col-md-3 col-lg-2 thumbnail server_panel") {
        $panel.unwrap();
        $panel.children('.server_title').removeClass().addClass('server_title');
        $panel.children('.server_title').empty();
        $panel.children('.server_body').empty();
        $panel.remove();
      }
    };

    refreshPanel = function(IPHost, body, status) {
      $panel = getPanel(IPHost);
      if ($panel == undefined) {
        console.log("not find", IPHost,"panel");
        return undefined;
      }
      $panel.children('.server_body').html(body);
      if (preServerStatus.IPHost !== status) {
        adjustStatus($panel.children('.server_title'), status);
      }
    };

    var getPanel = function(IPHost) {
      ret = undefined;
      $tfor = $("#monitor_panels").children(".server_panel");
      if(!$tfor.length) {
        $tfor = $("#monitor_panels").children("a").children(".server_panel");
      }
      $tfor.each(function() {
        var tIPHost = getIPHost($(this));
        if (IPHost === tIPHost) {
          ret = $(this);
        }
      });
      return ret;
    };

    /* get the IPHost of specified panel */
    getIPHost = function($ele) {
      var IP   = $ele.children('.server_title').text().replace('#', '');
      if (IP === "") {
        return "";
      }
      var host = $ele.children('.server_body').children('p:first').text().split(':');
      if (host.length !== 2) {
        return "";
      }
      host = host[1].replace(' ', '');
      if (IP === "" || host === "") {
        return "";
      }
      var IPHost = IP + '('+host+')';
      return IPHost;
    };
    
    /* refresh the server panels according to the IPList(remove the ones not exist in the list) */
    var refreshServerPanels = function(curServerList) {
      // clear the panels
      $(".server_panel").each(function() {
        if ($(this).children('.server_title').text() !== "") {
          var IPHost = getIPHost($(this));
          if (IPHost !== "" && !(IPHost in curServerList)) {
            // remove <a> tag
            $(this).unwrap();
            $(this).children('.server_title').removeClass().addClass('server_title');
            $(this).children('.server_title').empty();
            $(this).children('.server_body').empty();
          }
        }
      });
      preServerList = curServerList;
    };
    
    /* assemble the html according to the server info */
    var assembleHtml = function(server) {
      // constant information e.g. hostname, location
      var v = ['hostname','location'];
      var rs = "";
      var x, t, tLen, tOut;
      for (x in v) {
        if (v[x] in server) {
          tLen = server[v[x]].length;
          tOut = server[v[x]];
          // capture the last MAX_SHOW_LENGTH characters
          if (tLen > MAX_SHOW_LENGTH) {
            tOut = tOut.slice(tLen - MAX_SHOW_LENGTH);
          } else if(tLen === 0) {
            tOut = "None";
          }
          rs += '<p>&Delta; &nbsp;' + v[x] + ' : ' + tOut + '</p>';           // basic information
        }
      }
      // fluctant information like resource ...
      v = ['resource', 'process', 'market_connection', 'account'];
      for (x in v) {
        if (v[x] in server) {
          t = server[v[x]].split('/');
          if (t.length !== 2 || isNaN(t[0]) || isNaN(t[1]) || parseInt(t[0]) > parseInt(t[1]) || parseInt(t[0]) < 0) {
            rs += '<p>&Chi; &nbsp;<b><s>' + v[x] + ' : ' + ERROR_MESSAGE + '</s></b></p>';
          } else if (t[0] === t[1]) {
            rs += '<p>&radic; &nbsp;' + v[x] + ' : ' + server[v[x]] + '</p>';
          } else {
            rs += '<p>&Chi; &nbsp;<b><s>' + v[x] + ' : ' + server[v[x]] + '</s></b></p>';
          }
        }
      }
      rs += '<p class="p-strategy"></p>';                                     // reserve position for strategy info 
      return rs;
    };
    
    /* wrap <a> label for specified element */
    var wrapLabel = function($ele, IPHost) {
      var url = rss.server_detail_url + "?iphost=" + IPHost;
      if (IPHost === "") {
        return;
      }
      var label = '<a href="' + url + '"></a>';
      $ele.wrap(label);
    };
    
    /* get the first proper panel to fill server information */
    var getProperID = function() {
      var i, tID;
      var prefixID = '#server_';
      for (i = 1; i < MAX_ID; i++) {
        tID = prefixID + i;
        if ($(tID).children('.server_title').text() === "") {                 // identify if a panel is empty
          return tID;
        }
      }
    };
    
    /* adjust the background color for panel title according to the status */
    var adjustStatus = function($ele, status) {
      if (!$ele || !status || isNaN(status)) {
        return;
      }
      $ele.removeClass().addClass('server_title');
      switch (status) {
        case ABNORMAL_STATE:
          $ele.addClass('alert_danger');
          break;
        case NORMAL_STATE:
          $ele.addClass('alert_normal');
          break;
        case NOT_UPDATE:
          $ele.addClass('redis_not_update');
          break;
        default:
          $ele.addClass('alert_warning');
      }
    };
    
    /* insert strategy status and update the color for panels */
    var updateStrategy = function () {
      $(".server_panel").each(function() {
        if ($(this).children('.server_title').text() !== "") {
          var IPHost = getIPHost($(this));
          if (IPHost !== "" && (IPHost in strategyProMap)) {
            // normal strategy status
            if (strategyStaMap[IPHost]) {
              $(this).children('.server_body').children('.p-strategy').html('&radic; &nbsp;strategy : ' + strategyProMap[IPHost]);
            } else {
              $(this).children('.server_body').children('.p-strategy').html('&Chi; &nbsp;<b><s>strategy : ' + strategyProMap[IPHost] + '</s></b>');
              adjustStatus($(this).children('.server_title'), ABNORMAL_STATE);
            }
          }
        }
      });
    };
    
    /* Description: check the input IP string */
    var checkIPV4 = function(entry) {
      var blocks = entry.split(".");
      if (blocks.length === 4) {
        return blocks.every(function(block) {
          return !isNaN(block) && parseInt(block, 10) >= 0 && parseInt(block, 10) <= 255;
        });
      }
      return false;
    };
    
    /* Description: check the input IPHost */
    var checkIPHost = function(IPHost, IP) {
      var tLen = IPHost.length;
      var len = IP.length;
      if (tLen - len <= 2) {
        return false;
      }
      if (IPHost[len] === '(' && IPHost[tLen-1] === ')') {
        return true;
      }
      return false;
    };
    
    /*
     * input format: {"192.168.30.10(h1)":{
     *                     "resource":"xx-xx",
     *                     "trader":"xx-xx",
     *                     "account":"xx-xx",
     *                     "strategy":"xx-xx",                                // not exist now !
     *                     "trader":"xx-xx",
     *                     "market":"xx-xx",
     *                     "status":"x",                                      // -1 - error, 0 - warning, 1 - normal
     *                     },
     *                "192.168.21.10(h1)":{...}
     *               }
     * */
    var updatePanel = function(serverList) {
      var tserver, i, IP, hostName, IPHost, serverID;
      curServerList = {};                                                     // clear the current IP List
      for (var idx in serverList) {
        IPHost              = idx;
        IP                  = IPHost.replace(/\(.*\)/g,'');                   // filter the ip and hostname
        if(!checkIPV4(IP) || !checkIPHost(IPHost, IP)) { continue; }          // if IP or IPHost is illegal, ignore this row 
        hostName            = regExp.exec(IPHost)[1];
        tserver             = serverList[IPHost];
        tserver.ip          = IP;                                             // add ip and hostname to the temporary server map
        tserver.hostname    = hostName;
        if (IPHost in preServerList) {                                        // the server exist in the panel
          serverID = preServerList[IPHost];
          $(serverID).children('.server_body').empty();
          $(serverID).children('.server_body').append(assembleHtml(tserver));
          adjustStatus($(serverID).children('.server_title'), tserver.status);
        } else {
          serverID = getProperID();
          $(serverID).children('.server_body').append(assembleHtml(tserver));
          wrapLabel($(serverID), IPHost);
          var title = "#" + IP;
          $(serverID).children('.server_title').append(title);
          adjustStatus($(serverID).children('.server_title'), tserver.status);
          preServerList[IPHost] = serverID;
          tserver.title = title;
          createPanel(IPHost, tserver);
          console.log("1-1-1");
        }
        curServerList[IPHost] = preServerList[IPHost];
      }
      refreshServerPanels(curServerList);
      // TODO updateStrategy();
    };
    
    /* web socket message handler, get the basic server message then update*/
    var wsMsgHandler = function (response) {
      var resp = JSON.parse(response);
      if (resp.type == rss.websocket_type) {
        updatePanel(resp.data);
      }
    };

    /* initial web socket object */
    var ws4redis = WS4Redis({
      uri : rss.websocket_url,
      type : rss.websocket_type,
      receive_message : wsMsgHandler
    });

    /* calculate the statistic info for strategy */
    var calcStrategy = function () {
      strategyProMap = {};
      strategyStaMap = {};
      var total = 0, normal = 0;
      var IPHost, strategy;
      for (IPHost in strategyMap) {
        for (strategy in strategyMap[IPHost]) {
          if (strategyMap[IPHost][strategy] === NORMAL_STATE)
            normal++;
          total++;
        }
        strategyProMap[IPHost] = normal + '/' + total;
        if (normal == total) {
          strategyStaMap[IPHost] = true;
        } else {
          strategyStaMap[IPHost] = false;
        }
      }
    };

    /* fetch strategy through kdb (websocket handler)*/
    var wsKdbHandler = function (e) {
      var arrayBuffer = e.data;
      if (arrayBuffer) {
        var v = kdb.deserialize(arrayBuffer);
        var dataType = v[0];
        var rawData = v[1];
        var item, idx, curIPHostName, curName, curStatus;
        if (dataType === 'getStrategy') {
          for (idx = 0; idx < rawData.length; idx++) {
            curIPHostName = rawData[idx].IPHostName;
            curName = rawData[idx].Strategy;
            curStatus = rawData[idx].Status;
            if (!(curIPHostName in strategyMap)) {
              strategyMap[curIPHostName] = {};
            }
            strategyMap[curIPHostName][curName] = curStatus;
          }
        }
      }
      // calcStrategy();
      // updateStrategy();
    };

    /* initial Kdb websocket object */
    var wsKdbConnect = function() {
      // Connect when there is no existing connection.
      if (!wsKdb || !wsKdb.readyState || wsKdb.readyState !== 1) {
        wsKdb = new WebSocket(rss.kdb_url);
        wsKdb.binaryType = 'arraybuffer';
        wsKdb.onopen = function(e) {
          console.log("WS to kdb+ connected");
          wsKdb.send(kdb.serialize(['loadStrategy',[]]));
        };
        wsKdb.onclose = function(e) {
          console.log("WS to kdb+ disconnected");
        };
        wsKdb.onerror = function(e) {
          console.log("WS to kdb+ error:" + e.data);
        };
        wsKdb.onmessage = wsKdbHandler;
      }
    };
    // wsKdbConnect();
  });
}) (jQuery, window, document);
