declare namespace sn_ws {
  declare class RESTMessageV2 {
    constructor();
    constructor(name: string, methodName: RestHTTPMethods);
    execute(): RESTResponseV2;
    executeAsync(): RESTResponseV2;
    getEndpoint(): string;
    getRequestBody(): string;
    getRequestHeader(headerName: string): string;
    getRequestHeaders(): object;
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

  type RestHTTPMethods =
    | 'get'
    | 'post'
    | 'delete'
    | 'patch'
    | 'put'
    | 'head'
    | 'delete'
    | 'options';
}
