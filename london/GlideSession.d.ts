interface GlideSession {
    isInteractive(): boolean;
    isLoggedIn(): boolean;
    getClientData(paramName: string): string;
    getClientIP(): string;
    getCurrentApplicationId(): string;
    getLanguage(): string;
    getTimeZoneName(): string;
    getSessionToken(): string;
    getUrlOnStack(): string;
    putClientData(paramName: string, paramValue: string): void;
}
