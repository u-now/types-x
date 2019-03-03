declare class GlideTime {
  constructor(milliseconds: number);
  getByFormat(format: string): string;
  getDisplayValue(): string;
  getDisplayValueinternal(): string;
  getValue(): string;
  setDisplayValue(asDisplayed: string): void;
  setValue(o: string): void;
  subtract(start: GlideTime, end: GlideTime): GlideDuration;
}
