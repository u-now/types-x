declare class Workflow {
  constructor();
  broadcastEvent(contextId: string, eventName: string): void;
  cancel(record: servicenow.GlideRecord): void;
  cancelContext(context: servicenow.GlideRecord): void;
  deleteWorkflow(current: servicenow.GlideRecord): void;
  fireEvent(eventRecord: servicenow.GlideRecord, eventName: string): void;
  fireEventById(eventRecordId: string, eventName: string): void;
  getContexts(record: servicenow.GlideRecord): servicenow.GlideRecord;
  getEstimatedDeliveryTime(workflowId: string): string;
  getEstimatedDeliveryTimeFromWFVersion(wfVersion: servicenow.GlideRecord): string;
  getReturnValue(workflowID: string, amount: number, result: boolean): {};
  getRunningFlows(record: servicenow.GlideRecord): servicenow.GlideRecord;
  getVersion(workflowId: string): void;
  getVersionFromName(workflowName: string): void;
  getWorkflowFromName(workflowName: string): void;
  hasWorkflow(record: servicenow.GlideRecord): boolean;
  restartWorkflow(record: servicenow.GlideRecord, maintainStateFlag: boolean): void;
  runFlows(record: servicenow.GlideRecord, operation: servicenow.GlideRecordOperation): void;
  startFlow(
    workflowId: string,
    current: servicenow.GlideRecord | null,
    operation: servicenow.GlideRecordOperation,
    vars?: object
  ): string;
  startFlowFromContextInsert(
    context: servicenow.GlideRecord,
    operation: servicenow.GlideRecordOperation
  ): void;
  startFlowRetroactive(
    workflowID: string,
    retroactiveMSecs: number,
    current: servicenow.GlideRecord,
    operation: servicenow.GlideRecordOperation,
    vars?: object,
    withSchedule?: any
  ): servicenow.GlideRecord;
}
