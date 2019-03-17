declare namespace sn_ws {
    interface SOAPResponseV2 {
        waitForResponse(timeoutSecs: number): void;
        getStatusCode(): number;
        getHeader(name: string): string;
        getHeaders(): object;
        getBody(): string;
        haveError(): boolean;
        getErrorCode(): number;
        getErrorMessage(): string;
    }
}
