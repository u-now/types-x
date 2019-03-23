function testRESTAPIRequest(request: sn_ws.RESTAPIRequest) {
    var entry;
    var id;
    var requestBody = request.body;
    var requestData = requestBody.data;
    //May be an array or a single object

    if (requestData instanceof Array) {
        entry = requestData[0].name;
        // 'user1'
        id = requestData[0].id;
        // '1234'
    } else {
        entry = requestData.name;
        // 'user1'
        id = requestData.id;
        // '1234'
    }

    var requestStream = requestBody.dataStream;
    var requestString = requestBody.dataString;

    // returns true if the request contains a single entry or multiple entries
    requestBody.hasNext();

    // calling second time
    // returns false if the request contains a single entry,
    // or true if the request contains multiple entries
    requestBody.hasNext();

    // returns available entry if there is only one entry, or the first entry if there are multiple.
    var requestEntry = requestBody.nextEntry();

    var name = requestEntry.name;
    // "user1"

    // calling second time
    // returns undefined if there is only one entry, or the second entry if there are multiple.
    requestEntry = requestBody.nextEntry();

    var requestBody = request.body;
    while (requestBody.hasNext()) {
        var entry = requestBody.nextEntry();
    }
}
