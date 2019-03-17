const firstrecord = new GlideRecord('core_company');

const record = new GlideRecord('core_company');
record.addQuery('property', '=', firstrecord.sys_id);
record.addQuery('property2', '!=', 'somevalue');
if (record.get('somesysid')) {
    gs.info('got it');
}

const wf = new global.Workflow();

const rest = new sn_ws.RESTMessageV2();

// test merging
interface ScopedGlideRecord {
    new (type: 'othertype'): OtherType;
}

interface OtherType extends ScopedGlideRecord {
    someproperty: string;
}

const record2 = new GlideRecord('othertype');
record2.someproperty = 'foo';

var mydata = '&quot;&lt;&gt;&amp;';
var unescaped = GlideStringUtil.unescapeHTML(mydata);
gs.info(unescaped);
// "<>&

var r = new sn_ws.RESTMessageV2('<A REST message>', 'get');
var response = r.execute();
var headers = response.getAllHeaders();
for (var i in headers) {
    gs.info(headers[i].name + ': ' + headers[i].value);
}
