// test the function of 
var local_url = 'ws://127.0.0.1:8640/realtime/';
var local_type = "monitor_detail";
var ipHost = "192.168.30.10(ht1)";
// monitor_detail;
var wsMsgHandler = function (response) {
    var resp = JSON.parse(response);
    console.log(resp);
};
var ws4redis = WS4Redis({
    uri : local_url,
    type : local_type,
    host : ipHost,
    receive_message : wsMsgHandler
});