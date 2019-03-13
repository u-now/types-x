interface RESTResponseV2 {
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
