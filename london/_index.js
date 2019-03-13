var r = new sn_ws.RESTMessageV2('x_318721_symbol_sp.get_incident', 'get');
var response = r.execute();
var headers = response.getAllHeaders();
for (var i in headers) {
  gs.info(headers[i].name + ': ' + headers[i].value);
}
