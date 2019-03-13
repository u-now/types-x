declare namespace sn_ws {
  /**
   * The RESTResponseV2 API allows you to use the data returned by an outbound REST message
   * in JavaScript code.
   * @class RESTResponseV2
   * @typedef {Object}  RESTResponseV2
   */
  declare class RESTResponseV2 {
    /**
     * Instantiates a RESTMessageV2 object using information from a REST message record.
     *
     * You must have a REST message record defined before you can use this constructor.
     *
     * In the following example, replace `REST_message_record` with the name of the REST message
     * record from your instance.
     *
     * @example
     *
     *
     */
    constructor();

    /**
     * Returns all headers contained in the response, including any duplicate
     * headers.
     * @returns The list of headers contained in the response. Each header is represented as a
     * GlideHTTPHeader object which contains the header name and
     * value.
     * @example
     *
     * var r = new sn_ws.RESTMessageV2('<A REST message>', 'get');
     * var response = r.execute();
     * var headers = response.getAllHeaders();
     * for(var i in headers){
     * gs.print(headers[i].name + ': ' + headers[i].value);
     * }
     */
    getAllHeaders(): [{ name: string; value: string }];

    getBody(): string;
    getCookies(): { size: () => number; get: (index: number) => string };
    getErrorCode(): number;
    getErrorMessage(): string;
    getHeader(name: string): string;
    getHeaders(): object;
    getQueryString(): string;
    getResponseAttachmentSysid(): string;
    getStatusCode(): number;
    haveError(): boolean;
    waitForResponse(timeoutSecs: number): void;
  }
}
