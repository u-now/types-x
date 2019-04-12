declare namespace sn_ws {
    /**
     * A RESTAPIResponseStream object allows you to write directly to the scripted REST API
     * response stream.
     *
     * Note: You cannot instantiate objects of this type. Objects of this type are created
     * automatically and are accessible only in scripted REST API resource scripts.
     */
    interface RESTAPIResponseStream {
        /**
         * Write an input stream to the response stream.
         * You must set the content type and status code before calling the writeStream() method
         * or the response will fail. You cannot modify these values after calling the
         * writeStream() method.
         *
         * @param stream An attachment or a response stream from a third-party service.
         * @returns Method does not return a value
         *
         * It is the responsibility of the script author to obtain the stream from a third-party
         * service.
         * @example
         *
         * response.setContentType('application/json');
         * response.setStatus(200);
         * var writer = response.getStreamWriter();
         * writer.writeStream(attachmentStream);
         */
        writeStream(stream: object): void;

        /**
         * Write string data to the response stream.
         *
         * You must set the content type and status code before calling the writeString() method
         * or the response will fail. You cannot modify these values after calling
         * the writeString() method.
         *
         * @param data The string to add to the response data.
         * @returns Method does not return a value
         * @example
         *
         * response.setContentType('application/json');
         * response.setStatus(200);
         * var writer = response.getStreamWriter();
         * var body ={
         *   name:user1,
         *   id: 1234,
         *   roles: [
         *     {
         *       name: admin
         *     },
         *     {
         *       name: itil
         *     }
         *   ]
         * }
         * writer.writeString("{'name':'user','id':'1234'}");
         * writer.writeString(JSON.stringify(body));
         */
        writeString(data: string): void;
    }
}
