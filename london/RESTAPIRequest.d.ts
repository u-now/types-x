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

        readonly queryParams: { [paramName: string]: string[] };
        readonly queryString: string;
        readonly uri: string;
        readonly url: string;
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
        getSupportedResponseContentTypes(): string[];
    }
}
