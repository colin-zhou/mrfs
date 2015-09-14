  @login_required
  #@permission_required('operation.access_permission', login_url='/forbidden')
  def monitor(request):
      return render_to_response('monitor.html',
              {'websocket_url': settings.WSS_URI,
-              'websocket_msg_type':cfg.OPERAT_TYPE},
+              'websocket_msg_type':cfg.MONITOR_OVERVIEW,
+              'server_detail_url':cfg.MONITOR_DETAIL_URL},
+             context_instance = RequestContext(request))
+ 
+ @login_required
+ #@permission_required('operation.access_permission', login_url='/forbidden')
+ def monitor_detail(request):
+     return render_to_response('monitor_detail.html',
+             {'websocket_url': settings.WSS_URI,
+              'websocket_msg_type': cfg.MONITOR_DETAIL,
+              'overview_url': cfg.MONITOR_OVERVIEW_URL,
+              'monitor_detail_url': cfg.MONITOR_DETAIL_URL,
+              'system_config_url': cfg.SYSTEM_CONFIG_URL,
+              'tunnel_config_url': cfg.TUNNEL_CONFIG_URL,
+              'account_config_url': cfg.ACCOUNT_CONFIG_URL,
+              'quote_config_url': cfg.QUOTE_CONFIG_URL,
+              'symbol_config_url': cfg.SYMBOL_CONFIG_URL,
+              'strategy_config_url': cfg.STRATEGY_CONFIG_URL,
+              'kdb_url': settings.KDB_URI},
              context_instance = RequestContext(request))