declare class GlideStringUtil {
    static dotToUnderBar(sourceString: string): string;
    static escapeAllQuotes(sourceString: string): string;
    static escapeForHomePage(sourceString: string): string;
    static escapeHTML(htmlString: string): string;
    static escapeNonPrintable(sourceString: string): string;
    static escapeQueryTermSeparator(sourceString: string): string;
    static escapeTicks(sourceString: string): string;
    static getHTMLValue(sourceString: string): string;
    static getNumeric(sourceString: string): string;
    static isBase64(sourceString: string): boolean;
    static isEligibleSysID(sourceString: string): boolean;
    static newLinesToBreaks(sourceString: string): string;
    static normalizeWhitespace(sourceString: string): string;
    static unescapeHTML(htmlString: string): string;
}
