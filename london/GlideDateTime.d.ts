/**
 * The scoped GlideDateTime class provides methods for performing operations on
 * GlideDateTime objects, such as instantiating GlideDateTime objects or working with
 * glide_date_time fields.
 * @class GlideDateTime
 * @typedef {Object}  GlideDateTime
 */
declare class GlideDateTime {
  /**
   * Instantiates a new GlideDateTime object with the current date and time in Greenwich
   * Mean Time (GMT).
   */
  constructor();

  /**
   * Instantiates a new GlideDateTime object with the current date and time in Greenwich
   * Mean Time (GMT).
   *
   * @param value A UTC date and time using the internal format yyyy-MM-dd HH:mm:ss.
   */
  constructor(value: string);

  /**
   * Instantiates a new GlideDateTime object with the current date and time in Greenwich
   * Mean Time (GMT).
   *
   * @param g The GlideDateTime object to use for setting the time of the new object.
   */
  constructor(g: GlideDateTime);

  /**
   * Adds a GlideTime object to the current GlideDateTime object.
   *
   * @param gd The GlideTime object to add.
   * @returns Method does not return a value
   * @example var gdt = new GlideDateTime("2011-08-31 08:00:00");
   *
   * var gtime1 = new GlideTime();
   * gtime1.setValue("00:00:20");
   * gdt.add(gtime1);
   * var gtime2 = gdt.getTime();
   * gs.info(gtime2.getByFormat('hh:mm:ss'));
   */
  add(gd: GlideTime | number): void;

  addDaysLocalTime(amount: number): void;

  /**
   * Adds a specified number of days to the current GlideDateTime object. A negative
   * parameter subtracts days. The method determines the UTC date and time equivalent to the value
   * stored by the GlideDateTime object, then adds or subtracts days using the UTC date and time
   * values.
   * @param {Number} days The number of days to add. Use a negative number to subtract.
   * @returns Method does not return a value
   * @example var gdt = new GlideDateTime("2011-08-31 08:00:00");
   * gdt.addDaysUTC(-1);
   * gs.info(gdt.getDate());
   */
  addDaysUTC(amount: number): void;

  addMonthsLocalTime(amount: number): void;
  addMonthsUTC(amount: number): void;
  addSeconds(value: number): void;
  addWeeksLocalTime(amount: number): void;
  addWeeksUTC(amount: number): void;
  addYearsLocalTime(amount: number): void;
  addYearsUTC(amount: number): void;
  compareTo(o: object): number;
  equals(o: object): boolean;
  getDate(): GlideTime;
  getDayOfMonthLocalTime(): number;
  getDayOfMonthUTC(): number;
  getDayOfWeekLocalTime(): number;
  getDayOfWeekUTC(): number;
  getDaysInMonthUTC(): number;
  getDisplayValue(): string;
  getDisplayValueInternal(): string;
  getDSTOffset(): number;
  getErrorMsg(): string;
  getLocalDate(): GlideTime;
  getLocalTime(): GlideTime;
  getMonthLocalTime(): number;
  getMonthUTC(): number;
  getNumericValue(): number;
  getTime(): GlideTime;
  getTZOffset(): number;
  getValue(): string;
  getWeekOfYearLocalTime(): number;
  getWeekOfYearUTC(): number;
  getYearLocalTime(): number;
  getYearUTC(): number;
  hasDate(): boolean;
  isDST(): boolean;
  isValid(): boolean;
  setDayOfMonthLocalTime(day: number): void;
  setDayOfMonthUTC(day: number): void;
  setDisplayValue(value: string, format?: string): void;
  setDisplayValueInternal(value: string): void;
  setGlideDateTime(g: GlideDateTime): void;
  setMonthLocalTime(month: number): void;
  setMonthUTC(month: number): void;
  setNumericValue(milliseconds: number): void;
  setValue(o: string | number | GlideDateTime): void;
  setValueUTC(dt: string, format: string): void;
  setYearLocalTime(year: number): void;
  setYearUTC(year: number): void;
  subtract(start: GlideDateTime, end?: GlideDateTime): GlideDuration;
  subtract(time: GlideTime | number): void;
  toString(): string;
}
