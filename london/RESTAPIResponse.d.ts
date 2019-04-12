declare namespace sn_ws {
    /**
     * A RESTAPIResponse object allows you to build a RESTful response to a scripted REST API
     * request.
     *
     * Note: You cannot instantiate objects of this type. Objects of this type are created
     * automatically and are accessible only in scripted REST API resource scripts.
     */
    interface RESTAPIResponse {
        /**
         * Get the ResponseStreamWriter for this response, allowing you to write directly to the
         * response stream.
         * @returns The ResponseStreamWriter for this response. You can use this object to write
         * directly to the response stream.
         * @example
         *
         * response.setContentType('application/json');
         * response.setStatus(200);
         * var writer = response.getStreamWriter();
         */
        getStreamWriter(): RESTAPIResponseStream;

        /**
         * Sets the body content to send in the web service response.
         * @param body The response body, as a JavaScript object.
         *
         * The body content is automatically serialized to JSON or XML depending on the
         * value of the Accept header passed in the request.
         *
         * @returns Method does not return a value
         * @example
         *
         * var body = {};
         * body.name = "incident";
         * body.number = "1234";
         * body.caller = {"id": "user1"};
         * response.setBody(body);
         *
         * @example
         *
         * var bodyArray = [];
         * var body = {};
         * body.name = "incident";
         * body.number = "1234";
         * body.caller = {"id":"user1"};
         * bodyArray.push(body);
         * response.setBody(bodyArray);
         */
        setBody(body: any): void;

        /**
         * Assigns a value to the Content-Type header in the web service response.
         *
         * You must set a response content type before writing the response. The content type is
         * set automatically for string responses, based on the request Accept header value.
         *
         * Setting an invalid content type causes the response to default to JSON. Failing to
         * set a content type results in a status code 500 error when sending a binary response.
         *
         * See the W3 Content-Type header documentation for more information about this header:
         * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17
         *
         * @param contentType The content type of the response body, such as application/json.
         * @returns Method does not return a value
         * @example
         *
         * responseBuilder.setContentType('application/json');
         */
        setContentType(contentType: string): void;

        /**
         * Configure the response to return an error.
         * @param error An error object.
         * @returns Method does not return a value
         */
        setError(error: any): void;

        /**
         * Assign a value to a REST service response header.
         * @param header The header you want to set.
         * @param value The value to assign the specified header.
         * @returns Method does not return a value
         * @example
         *
         * responseBuilder.setHeader("Location","<URI>");
         */
        setHeader(header: string, value: string): void;

        /**
         * Sets the headers for the web service response.
         * @param headers A JavaScript object listing each header and the value to assign that
         * header.
         * @returns Method does not return a value
         * @example
         *
         * var headers = {};
         * headers.X-Total-Count=100;
         * headers.Location="https://instance.service-now.com/<endpoint_to_resource>";
         * response.setHeaders(headers);
         */
        setHeaders(headers: any): void;

        /**
         * Assigns a value to the Location header in the web service response.
         *
         * See the W3 Location header documentation for more information about this header:
         * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.30
         *
         * @returns Method does not return a value
         */
        setLocation(location: string): void;

        /**
         * Sets the status code number for the web service response.
         * @param status The status code to send in the response, such as 200 to indicate success.
         * Passing a non-numerical value, such as a string, causes the status code to default
         * to 0.
         * @returns Method does not return a value
         * @example
         *
         * response.setStatus(200);
         */
        setStatus(status: number): void;
    }
}
