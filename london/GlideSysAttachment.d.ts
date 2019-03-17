declare class GlideSysAttachment {
    constructor();
    copy(
        sourceTable: string,
        sourceSysId: string,
        destinationTable: string,
        destinationSysId: string
    ): void;
    deleteAttachment(sysId: string): void;
    getContent(record: servicenow.GlideRecord): any;
    getContentBase64(record: servicenow.GlideRecord): string;
    getContentStream(sysId: string): object;
    write(record: servicenow.GlideRecord, fileName: string, contentType: string, data: any): string;
    writeBase64(
        record: servicenow.GlideRecord,
        fileName: string,
        contentType: string,
        base64Content: string
    ): string;
    writeContentStream(
        record: servicenow.GlideRecord,
        fileName: string,
        contentType: string,
        inputStream: object
    ): string;
}
