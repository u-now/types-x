interface GlideServletRequest {
  getContentType(): string;
  getHeader(name: string): string;
  getParameter(name: string): string;
  writeOutput(mimeType: string, output: string): void;
  toString(): string;
}
