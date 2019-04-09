declare namespace sn_ws {
    /**
     * A RESTAPIRequestBody object allows you to access the body content of a scripted REST API request
     * in scripts.
     *
     * The format of a RESTAPIRequestBody object may be JSON or XML, depending on the content-type
     * header value from the request.
     *
     * Note: You cannot instantiate objects of this type. Objects of this type are created
     * automatically and are accessible only in scripted REST API resource scripts.
     *
     * @example
     *
     * {
     *   "name": "user1",
     *   "id": 1234,
     *   "roles": [
     *     {
     *       "name": "admin"
     *     },
     *     {
     *       "name": "itil"
     *     }
     *   ]
     * };
     */
    interface RESTAPIRequestBody {
        /**
         * The content of the request body.
         *
         * The request content. This can be a single object or an array of objects depending on
         * the request.
         *
         * @example
         *
         * var entry;
         * var id;
         * var requestBody = request.body;
         * var requestData = requestBody.data; //May be an array or a single object
         * if (requestData instanceof Array) {
         *   entry = requestData[0].name; // 'user1'
         *   id = requestData[0].id; // '1234'
         * } else {
         *   entry = requestData.name; // 'user1'
         *   id = requestData.id; // '1234'
         * }
         */
        readonly data: any;

        /**
         * The content of the request body, as a stream.
         *
         * The content of the request body. You can pass the stream to a separate API, such as to
         * create an attachment from the request or forward the request to a different endpoint.
         *
         * @example
         *
         * var requestBody = request.body;
         * var requestStream = requestBody.dataStream;
         * }
         */
        readonly dataStream: object;

        /**
         * The content of the request body, as a String.
         *
         * @example
         *
         * var requestBody = request.body;
         * var requestString = requestBody.dataString;
         */
        readonly dataString: string;

        /**
         * Determine if there are additional entries in the request body.
         *
         * Use this method with the nextEntry() method to iterate over multiple request body entries.
         * 
         * @returns True if there are additional entries available. This method returns true only
         * once if the request contains a single entry.
         * @example
         *
         * var requestBody = request.body;
         * // returns true if the request contains a single entry or multiple entries
         * requestBody.hasNext();
         *
         * // calling second time, returns false if the request contains a single entry, or true
         * // if the request contains multiple entries
         * requestBody.hasNext();
         */
        hasNext(): boolean;

        /**
         * Retrieve one entry from the request body as a script object.
         * 
         * @returns A single entry from the request body.
         * @example
         *
         * var requestBody = request.body;
         * // returns available entry if there is only one entry, or the first entry if there are multiple.
         * var requestEntry = requestBody.nextEntry();
         * var name = requestEntry.name; // ‘user1’
         * // Calling second time
         * // returns undefined if there is only one entry, or the second entry if there are multiple.
         * requestEntry = requestBody.nextEntry();
         *
         * @example
         *
         * var requestBody = request.body;
         * while (requestBody.hasNext()) {
         *   var entry = requestBody.nextEntry();
         * }
         */
        nextEntry(): any;
    }
}
