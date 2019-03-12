/**
 * The RESTMessageV2 API allows you to send
 * outbound REST messages
 * using JavaScript.
 * @class RESTMessageV2
 * @typedef {Object}  RESTMessageV2
 */
declare class RESTMessageV2 {
  /**
   * Instantiates an empty RESTMessageV2 object.
   */
  constructor();

  /**
   * Instantiates a RESTMessageV2 object using information from a REST message record.
   * You must have a REST message record defined before you can use this constructor.
   * In the following example, replace REST_message_record with the name of the REST message
   * record from your instance.
   * @param name The name of the REST message record.
   * @param methodName The name of the HTTP method to use, such as GET or PUT.
   *
   * @example
   *
   * //Might throw exception if message doesn't exist or not visible due to scope.
   * var sm = new sn_ws.RESTMessageV2("<REST_message_record>","get");
   *
   */
  constructor(name: string, methodName: RestHTTPMethods);

  /**
   * Sends the REST message to the endpoint.
   * @returns The response returned by the REST provider.
   *
   * @example
   *
   * // Might throw exception if message doesn't exist or not visible due to scope.
   * var sm = new sn_ws.RESTMessageV2("<REST_message_record>","get");
   * // Might throw exception if http connection timed out or some issue with sending request
   * // itself because of encryption/decryption of password.
   * var response = sm.execute();
   */
  execute(): RESTResponseV2;

  /**
   * Sends the REST message to the endpoint asynchronously. The instance does not wait for a
   * response from the web service provider when making asynchronous calls.
   * @returns The response returned by the REST provider.
   *
   * @example
   *
   * // Might throw exception if message doesn't exist or not visible due to scope.
   * var sm = new sn_ws.RESTMessageV2("<REST_message_record>","get");
   * // Might throw exception if http connection timed out or some issue with sending request
   * // itself because of encryption/decryption of password.
   * var response = sm.executeAsync();
   * // In seconds. Wait at most 60 seconds to get response from ECC Queue/Mid Server
   * // Might throw exception timing out waiting for response in ECC queue.
   * response.waitForResponse(60);
   */
  executeAsync(): RESTResponseV2;

  /**
   * Returns the URL of the endpoint for the REST message.
   * @returns The URL of the REST web service provider.
   *
   * @example
   *
   * // Might throw exception if message doesn't exist or not visible due to scope.
   * var sm = new sn_ws.RESTMessageV2("<REST_message_record>","get");
   * var endpoint = sm.getEndpoint();
   */
  getEndpoint(): string;

  /**
   * Returns the content of the REST message body.
   * @returns The REST message body.
   *
   * @example
   *
   * // Might throw exception if message doesn't exist or not visible due to scope.
   * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get");
   * var body = sm.getRequestBody();
   */
  getRequestBody(): string;

  /**
   * Returns the value for an HTTP header specified in the REST message.
   * @param headerName The request header you want to get the value for.
   * @returns The value of the specified header.
   *
   * @example
   *
   * // Might throw exception if message doesn't exist or not visible due to scope.
   * var sm = new sn_ws.RESTMessageV2("<REST_message_record>","get");
   * var header = sm.getRequestHeader("Accept");
   */
  getRequestHeader(headerName: string): string;

  /**
   * Returns HTTP headers that were set by the REST client and the associated values.
   * @returns An Object that maps the name of each header to the associated value.
   *
   * @example
   *
   * //Might throw exception if message doesn't exist or not visible due to scope.
   * var sm = new sn_ws.RESTMessageV2("<REST_message_record>","get");
   * var headers = sm.getRequestHeaders();
   */
  getRequestHeaders(): object;

  /**
   * Configures the REST message to save the returned response body as an attachment record.
   * @param tableName Specify the table that contains the record you want to attach the saved file to.
   * @param recordSysId Specify the sys_id of the record you want to attach the saved file to.
   * @param fileName Specify the file name to give to the saved file.
   * @returns Method does not return a value
   *
   * @example
   *
   * (function sampleRESTMessageV2() {
   *    try {
   *
   *       var request = new sn_ws.RESTMessageV2();
   *       request.setHttpMethod('get');
   *       var attachment_sys_id = '<attachment_record_sys_id>',
   *           tablename = 'incident',
   *           recordSysId = '<incident_sys_id>',
   *           response,
   *           httpResponseStatus,
   *           filename = '<filename>';
   *       // endpoint - ServiceNow REST Attachment API
   *       request.setEndpoint('https://<instance_name>.service-now.com/api/now/attachment/' +
   *       attachment_sys_id + '/file');
   *       request.setBasicAuth('<username>', '<password>');
   *       // RESTMessageV2 - saveResponseBodyAsAttachment(String tableName, String recordSysId,
   *       // String fileName)
   *       request.saveResponseBodyAsAttachment(tablename, recordSysId, filename);
   *       response = request.execute();
   *       httpResponseStatus = response.getStatusCode();
   *       gs.print(" http response status_code:  " + httpResponseStatus);
   *   }
   *   catch (ex) {
   *       var message = ex.getMessage();
   *       gs.print(message);
   *   }
   * })();
   */
  saveResponseBodyAsAttachment(
    tableName: string,
    recordSysId: string,
    fileName: string,
    encryptContext?: string
  ): void;

  setAuthenticationProfile(type: string, profileId: string): void;
  setBasicAuth(userName: string, userPass: string): void;
  setEccCorrelator(correlator: string): void;
  setEccParameter(name: string, value: string): void;
  setEndpoint(endpoint: string): void;
  setHttpMethod(method: RestHTTPMethods): void;
  setHttpTimeout(timeoutMs: number): void;
  setLogLevel(level: 'basic' | 'elevated' | 'all'): void;
  setMIDServer(midServer: string): void;
  setMutualAuth(profileName: string): void;
  setQueryParameter(name: string, value: string): void;
  setRequestBody(body: string): void;
  setRequestBodyFromAttachment(sys_id: string): void;
  setRequestBodyFromStream(stream: object): void;
  setRequestHeader(name: string, value: string): void;
  setRequestorProfile(requestorContext: string, requestorId: string): void;
  setStringParameter(name: string, value: string): void;
  setStringParameterNoEscape(name: string, value: string): void;
}
