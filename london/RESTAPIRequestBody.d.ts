interface RESTAPIRequestBody<T> {
  readonly data: T;
  readonly dataStream: object;
  readonly dataString: string;
  hasNext(): boolean;
  nextEntry(): any;
}
