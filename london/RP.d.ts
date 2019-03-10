declare const RP: {
  getParameters(): string[];
  getParameterValue(value: string): string;
  getReferringURL(): string;
  getViewID(): string;
  isDialog(): boolean;
  isHomePage(): boolean;
  isMobile(): boolean;
  isPrint(): boolean;
};
