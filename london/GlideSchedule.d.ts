declare class GlideSchedule {
  constructor();
  constructor(sysId: string, timeZone: string);
  add(startDate: GlideDateTime, offset: GlideDuration): GlideDateTime;
  duration(startDate: GlideDateTime, endDate: GlideDateTime): GlideDuration;
  getName(): string;
  isInSchedule(time: GlideDateTime): string;
  isValid(): boolean;
  load(sysId: string, timeZone: string, excludeSpanId: string): void;
  setTimeZone(tz: string): void;
  whenNext(time: GlideDateTime, timeZone: string): number;
}
