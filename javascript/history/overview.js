(function( $, window, document, undefined ) {
  $(document).ready(function() {
    
    var serverFlags = {};       // store the alert type, 0 - green, 1 - yellow, 2 - red
    var hostname_id = {};       // store the panel id that each server holds
    var id_hostname = {};       // store the server that each panel holds
    var connections = 0;        // store the number of connected server
    
    var ENUM_SERVER_STATUS = rss.util.enum(['NORMAL','WARNING','DANGER']);
    var SERVER_RESOURCE = ['Normal','MEM Error','CPU Error','Disk Error','Overload'];

    server_1 = { 'refresh' : '1' };
    
    server_1 = {'ip':'192.168.30.10',
                'location':'shanghai',
                'hostname':'ht1',
                'trader':'123-123',
                'quote':'11-11',
                'tunnel':'23-23',
                'account':'20-20',
                'strategy':'40-40',
                'resource':'0'}; // 0-normal,1-mem error,2-cpu error,3-disk error
    server_2 = {'ip':'192.168.1.2',
                'location':'shanghai',
                'hostname':'h2',
                'trader':'123-123',
                'quote':'11-11',
                'tunnel':'23-23',
                'account':'20-20',
                'strategy':'40-40',
                'resource':'1'};
    
    server_3 = {'ip':'192.168.1.3',
                'location':'shanghai',
                'hostname':'h3',
                'trader':'123-123',
                'quote':'11-11',
                'tunnel':'23-23',
                'account':'20-20',
                'strategy':'30-30',
                'resource':'0'};
    
    server_4 = {'ip':'192.168.1.4',
                'location':'shanghai',
                'hostname':'h4',
                'trader':'123-123',
                'quote':'11-11',
                'tunnel':'23-23',
                'account':'10-20',
                'strategy':'30-40',
                'resource':'3'};
    
    server_5 = {'ip':'192.168.1.5',
                'location':'shanghai',
                'hostname':'h5',
                'trader':'123-123',
                'quote':'11-11',
                'tunnel':'23-23',
                'account':'10-20',
                'strategy':'30-40',
                'resource':'2'};
    
    server_6 = {'ip':'192.168.1.6',
                'location':'shanghai',
                'hostname':'h6',
                'trader':'123-123',
                'quote':'11-11',
                'tunnel':'23-23',
                'account':'20-20',
                'strategy':'20-20',
                'resource':Math.round(Math.random()).toString()};
    
    server_l = [];
    
    server_l[0] = server_1;
    server_l[1] = server_2;
    server_l[2] = server_3;
    server_l[3] = server_4;
    server_l[4] = server_5;
    server_l[5] = server_6;
    
    /* clear the display on visual panel and reset the basic parameters which concerned with panel */
    resetPanel = function() {
      // clear the panels
      var i = 0;
      $(".server_panel").each(function() {
        if (('#' + $(this).attr("id")) in id_hostname) {
          $(this).unwrap();
        }
        $(this).children('.server_title').removeClass().addClass('server_title');
        $(this).children('.server_title').empty();
        $(this).children('.server_body').empty();
      });
      // reset the parameters
      serverFlags = {};
      hostname_id = {};
      id_hostname = {};
      connections = 0;
    }
    
    /* web socket message handler, get the basic server message then update*/
    var wsMsgHandler = function (response) {
      var resp = JSON.parse(response);
      if (resp.type == rss.websocket_type) {
        updatePanel(resp.server_info);
      }
    };
    
    /* assemble the html according server body info */
    var assembleHtml = function(server) {
      // constant message eg. hostname or location
      var v = ['hostname','location']; 
      serverFlags[server['hostname']] = ENUM_SERVER_STATUS.NORMAL;         // default status stored in a array
      var rs = "";
      var x,left,right,t;
      for (x in v) {
        rs += '<p>&Delta; &nbsp;' + v[x] + ' : ' + server[v[x]] + '</p>';  // basic information
      }
      // resource message contain three states
      v = ['resource'];
      for (x in v) {
        t = parseInt(server[v[x]]);
        if(t == 0) {
          rs += '<p>&radic; &nbsp;' + v[x] + ' : ' + SERVER_RESOURCE[t] + '</p>';
        } else if(t <=3 && t > 0) {
          rs += '<p>&Chi; &nbsp;<b><s>' + v[x] + ' : ' + SERVER_RESOURCE[t] + '</s></b></p>';
          serverFlags[server['hostname']] = ENUM_SERVER_STATUS.WARNING;
        } else {
          console.log("input resource message error!");
        }
      }
      // other messages determine the background color of panels title
      v = ['trader','quote','tunnel','account','strategy'];
      for (x in v) {
        t = server[v[x]].split('-');
        if (t[0] === t[1]) {
          rs += '<p>&radic; &nbsp;' + v[x] + ' : ' + server[v[x]] + '</p>';
        } else {
          rs += '<p>&Chi; &nbsp;<b><s>' + v[x] + ' : ' + server[v[x]] + '</s></b></p>';
          serverFlags[server['hostname']] = ENUM_SERVER_STATUS.DANGER;
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
    
    /* adjust the background color for panel title according to the status */
    var adjustStatus = function($ele, status) {
      $ele.removeClass().addClass('server_title');
      if (status == ENUM_SERVER_STATUS.NORMAL)
        $ele.addClass('alert_normal');
      else if (status == ENUM_SERVER_STATUS.WARNING)
        $ele.addClass('alert_warning');
      else if (status == ENUM_SERVER_STATUS.DANGER)
        $ele.addClass('alert_danger');
      else {
        console.log("input status error!");
      }
    }
    
    /* if host exist on the panel then update the panel status*/
    var updatePanel = function(server_list) {
      var tserver;
      var i;
      for (i in server_list) {
        tserver = server_list[i];
        // if the 'refresh' field is in the server_list then reset the panel(identify the removed server)
        if ('refresh' in tserver && tserver['refresh'] === '1') {
          resetPanel();
          continue;
        }
        if (tserver['hostname'] in hostname_id) {
          var server_id = hostname_id[tserver['hostname']];
          
          $(server_id).children('.server_body').empty();
          $(server_id).children('.server_body').append(assembleHtml(tserver));

          adjustStatus($(server_id).children('.server_title'), serverFlags[tserver['hostname']]);
        } else {
          var server_id = '#server_' + (++connections);
          
          $(server_id).children('.server_body').append(assembleHtml(server_list[i]));
          wrapLabel($(server_id), server_list[i]['hostname'], server_list[i]['ip']);
          var title = "#" + server_list[i]['ip'];
          $(server_id).children('.server_title').append(title);
          
          adjustStatus($(server_id).children('.server_title'), serverFlags[server_list[i]['hostname']]);
          hostname_id[server_list[i]['hostname']] = server_id;
          id_hostname[server_id] = server_list[i]['hostname'];
        }
      }
    }
    
    // mytest
    var testup = function() {
      server_l[2]['resource'] = Math.round(Math.random()).toString();
      server_l[1]['tunnel'] = (Math.round(Math.random()) + 20)+'-'+(Math.round(Math.random()) + 20);
      // random to add a host
      server_l[4]['hostname'] = 'h' + (Math.round(Math.random())+6);
      updatePanel(server_l);
    }
    setInterval(testup,1000);
    
    updatePanel(server_l);
    
    /* initial web socket object */
    var ws4redis = WS4Redis({
      uri : rss.websocket_url,
      type : rss.websocket_type,
      receive_message : wsMsgHandler
    });
    

    
  });
}) (jQuery, window, document);
