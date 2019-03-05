declare class GlideDate {
  constructor();
  getByFormat(format: string): string;
  getDisplayValue(): string;
  getDisplayValueInternal(): string;
  getValue(): string;
  setDisplayValue(asDisplayed: string): void;
  setValue(o: string): void;
  subtract(start: GlideDate, end: GlideDate): GlideDuration;
}
