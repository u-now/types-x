declare class GlideEvaluator {
  constructor();
  evaluateScript(grObj: servicenow.GlideRecord, scriptField?: string, variables?: object): object;
  getVariable(name: string): {};
  putVariable(name: string, value: {}): void;
}
