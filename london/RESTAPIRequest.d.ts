declare namespace sn_ws {
    /**
     * A RESTAPIRequest object allows you to access scripted REST API request details in scripts.
     *
     * Note: You cannot instantiate objects of this type. Objects of this type are created
     * automatically and are accessible only in scripted REST API resource scripts.
     */
    interface RESTAPIRequest {
        /**
         * The body of the request. You can access data from the body object using the
         * `RESTAPIRequestBody` API.
         *
         * @example
         *
         * var requestBody = request.body // Returns instance of RESTAPIRequestBody
         */
        readonly body: RESTAPIRequestBody;

        /**
         * The path parameters as a script object. Available path parameters depend on the web
         * service configuration.
         *
         * @example
         *
         * var pathParams = request.pathParams;
         * var tableName = pathParams.tableName; //‘myApp_table’
         * var id = pathParams.id; //‘1234’
         */
        readonly pathParams: { [paramName: string]: string };

        /**
         * The query parameters from the web service request.
         *
         * // In this example, the request being processed uses this URL:
         * @example
         *
         * var queryParams = request.queryParams;
         * var isActiveQuery = queryParams.active; //false
         * var nameQueryVal = queryParams.name; //‘now’
         */
        readonly queryParams: { [paramName: string]: string[] };

        /**
         * The entire query for the request.
         *
         * // In this example, the request being processed uses this URL:
         * @example
         *
         * var query = request.queryString; //"active=false&name=now"
         */
        readonly queryString: string;

        /**
         * The request URI, excluding domain information.
         *
         * // In this example, the request being processed uses this URL:
         * @example
         *
         * var query = request.uri; //"api/now/table/myTable"
         */
        readonly uri: string;

        /**
         * The entire request URL.
         *
         * // In this example, the request being processed uses this URL:
         * @example
         *
         * //"https://instance.service-now.com/api/now/table/myTable?active=false&name=now"
         * var query = request.url;
         */
        readonly url: string;

        /**
         * All headers from the request, and their values.
         *
         * @example
         *
         * var headers = request.headers;
         * var acceptHeader = headers.Accept;
         * var myCustomHeader = headers.myCustom;
         * var specialHeader = headers['special - header'];
         */
        readonly headers: { [paramName: string]: string };

        /**
         * Returns the value of a specific header from the web service request.
         *
         * @param header The name of the header, such as accept or content-type.
         * @returns The value of the specified header.
         * @example
         *
         * var acceptHeader = request.getHeader('accept');
         */
        getHeader(header: string): string;

        /**
         * Get the content types specified in the request Accept header.
         *
         * @returns An array of string values where each string is a content type, such as
         * application/json.
         */
        getSupportedResponseContentTypes(): string[];
    }
}
