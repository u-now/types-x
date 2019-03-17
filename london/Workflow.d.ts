declare namespace global {
    class Workflow {
        constructor();
        broadcastEvent(contextId: string, eventName: string): void;
        cancel(record: ScopedGlideRecord): void;
        cancelContext(context: ScopedGlideRecord): void;
        deleteWorkflow(current: ScopedGlideRecord): void;
        fireEvent(eventRecord: ScopedGlideRecord, eventName: string): void;
        fireEventById(eventRecordId: string, eventName: string): void;
        getContexts(record: ScopedGlideRecord): ScopedGlideRecord;
        getEstimatedDeliveryTime(workflowId: string): string;
        getEstimatedDeliveryTimeFromWFVersion(wfVersion: ScopedGlideRecord): string;
        getReturnValue(workflowID: string, amount: number, result: boolean): {};
        getRunningFlows(record: ScopedGlideRecord): ScopedGlideRecord;
        getVersion(workflowId: string): void;
        getVersionFromName(workflowName: string): void;
        getWorkflowFromName(workflowName: string): void;
        hasWorkflow(record: ScopedGlideRecord): boolean;
        restartWorkflow(record: ScopedGlideRecord, maintainStateFlag: boolean): void;
        runFlows(record: ScopedGlideRecord, operation: GlideRecordOperation): void;
        startFlow(
            workflowId: string,
            current: ScopedGlideRecord | null,
            operation: GlideRecordOperation,
            vars?: object
        ): string;
        startFlowFromContextInsert(
            context: ScopedGlideRecord,
            operation: GlideRecordOperation
        ): void;
        startFlowRetroactive(
            workflowID: string,
            retroactiveMSecs: number,
            current: ScopedGlideRecord,
            operation: GlideRecordOperation,
            vars?: object,
            withSchedule?: any
        ): ScopedGlideRecord;
    }
}
