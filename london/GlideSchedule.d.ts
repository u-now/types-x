/**
 * The scoped GlideSchedule API provides methods for performing operations on GlideSchedule
 * objects, such as adding new schedule segments to a schedule, determining if a datetime is within
 * the schedule, or setting the schedule timezone.
 *
 * @class GlideSchedule
 * @typedef {Object}  GlideSchedule
 */
declare class GlideSchedule {
  /**
   * Instantiates an empty GlideSchedule object.
   */
  constructor();

  /**
   * Instantiates a GlideSchedule object and loads the schedule information. If a timezone is not
   * specified or is nil, the current session timezone is used.
   *
   * @param sysId The system ID for the schedule.
   * @param timeZone The time zone. (Optional)
   * @example
   *
   * var schedule = new GlideSchedule('090eecae0a0a0b260077e1dfa71da828', 'US/Pacific');
   */
  constructor(sysId: string, timeZone?: string);

  add(startDate: GlideDateTime, offset: GlideDuration): GlideDateTime;
  duration(startDate: GlideDateTime, endDate: GlideDateTime): GlideDuration;
  getName(): string;
  isInSchedule(time: GlideDateTime): string;
  isValid(): boolean;
  load(sysId: string, timeZone: string, excludeSpanId: string): void;
  setTimeZone(tz: string): void;
  whenNext(time: GlideDateTime, timeZone: string): number;
}
