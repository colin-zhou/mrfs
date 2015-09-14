(function( $, window, document, undefined ) {
  $(document).ready(function() {
    
    var preIPList = {};               // previous server list
    var curIPList = {};               // current server list
    var regExp = /\(([^)]+)\)/;       // regular expression to filter IP and HostName
    
    /* refresh the server panels according to the IPList(remove the ones not exist in the list) */
    refreshServerPanels = function(curIPList) {
      // clear the panels
      $(".server_panel").each(function() {
        var IP = $(this).children('.server_title').text().replace('#','');
        if (IP !== "" && !(IP in curIPList)) {
          // remove a tag
          $(this).unwrap();
          $(this).children('.server_title').removeClass().addClass('server_title');
          $(this).children('.server_title').empty();
          $(this).children('.server_body').empty();
        }
      });
      preIPList = curIPList;
    }
    
    /* assemble the html according to the server info */
    var assembleHtml = function(server) {
      // constant information e.g. hostname, location
      var v = ['hostname','location'];
      var rs = "";
      var x, t;
      for (x in v) {
        rs += '<p>&Delta; &nbsp;' + v[x] + ' : ' + server[v[x]] + '</p>';  // basic information
      }
      // fluctant information like resource ...
      v = ['resource', 'process', 'market_connection', 'account', 'strategy'];
      for (x in v) {
        t = server[v[x]].split('/');
        if (t[0] === t[1]) {
          rs += '<p>&radic; &nbsp;' + v[x] + ' : ' + server[v[x]] + '</p>';
        } else {
          rs += '<p>&Chi; &nbsp;<b><s>' + v[x] + ' : ' + server[v[x]] + '</s></b></p>';
        }
      }
      return rs;
    }
    
    /* wrap <a> label for specified element */
    var wrapLabel = function($ele, host, ip) {
      var url = rss.server_detail_url + "?iphost=";
      if(host) {
        url +=  ip + '(' + host + ')';
      } else  {
        url += ip;
      }
      var label = '<a href="' + url + '"></a>';
      $ele.wrap(label);
    }
    
    /* get the first proper panel to fill server information */
    var getProperID = function() {
      var i, tID;
      var prefixID = '#server_';
      for (i = 1; i < 16; i++) {
        tID = prefixID + i;
        if ($(tID).children('.server_title').text() === "") {                 // identify the if panel is empty
          return tID;
        }
      }
    }
    
    /* adjust the background color for panel title according to the status */
    var adjustStatus = function($ele, status) {
      $ele.removeClass().addClass('server_title');
      if (status < 0)                                       // danger
        $ele.addClass('alert_danger');
      else if (status == 0)                                 // alert 
        $ele.addClass('alert_warning');
      else if (status > 0)                                  // normal
        $ele.addClass('alert_normal');
      else {
        console.log("input status error!");
      }
    }
    
    /*
     * input format: {"192.168.30.10(h1)":{
     *                     "resource":"xx-xx",
     *                     "trader":"xx-xx",
     *                     "account":"xx-xx",
     *                     "strategy":"xx-xx",
     *                     "trader":"xx-xx",
     *                     "market":"xx-xx",
     *                     },
     *                "192.168.21.10(h1)":{...}
     *               }
     * */
    var updatePanel = function(serverList) {
      var tserver, i, IP, hostName;
      curIPList = {};                           // clear the current IP List
      for (idx in serverList) {
        console.log(idx);
        IP = idx.replace(/\(.*\)/g,'');         // filter the ip and hostname
        hostName = regExp.exec(idx)[1];
        tserver = serverList[idx];
        tserver['ip'] = IP;                     // add ip and hostname to the temporary server map
        tserver['hostname'] = hostName;
        if (IP in preIPList) {                  // the server exist in the panel
          var serverID = preIPList[IP];
          console.log(serverID);
          $(serverID).children('.server_body').empty();
          $(serverID).children('.server_body').append(assembleHtml(tserver));
          adjustStatus($(serverID).children('.server_title'), tserver['status']);
        } else {                                // the server is not exist in the panel
          console.log("fuck");
          var serverID = getProperID();
          $(serverID).children('.server_body').append(assembleHtml(tserver));
          wrapLabel($(serverID), hostName, IP);
          var title = "#" + IP;
          $(serverID).children('.server_title').append(title);
          adjustStatus($(serverID).children('.server_title'), tserver['status']);
          preIPList[IP] = serverID;
        }
        curIPList[IP] = preIPList[IP];
      }
      refreshServerPanels(curIPList);
    }
    
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
    
  });
}) (jQuery, window, document);
