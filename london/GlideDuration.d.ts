declare class GlideDuration {
  constructor(value?: GlideDuration | number | string);
  add(value: GlideDuration): GlideDuration;
  getByFormat(format: string): string;
  getDayPart(): number;
  getDisplayValue(): string;
  getDurationValue(): string;
  getNumericValue(): number;
  getRoundedDayPart(): number;
  getValue(): string;
  setDisplayValue(asDisplayed: string): void;
  setValue(o: object): void;
  subtract(value: GlideDuration): GlideDuration;
}
