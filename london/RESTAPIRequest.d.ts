interface RESTAPIRequest<T> {
  readonly body: RESTAPIRequestBody<T>;
  readonly pathParams: { [paramName: string]: string };
  readonly queryParams: { [paramName: string]: string[] };
  readonly queryString: string;
  readonly url: string;
  readonly headers: { [paramName: string]: string };
  getHeader(header: string): string;
  getSupportedResponseContentTypes(): string[];
}
