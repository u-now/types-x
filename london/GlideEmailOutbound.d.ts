interface GlideEmailOutbound {
  getSubject(): string;
  setSubject(subject: string): void;
  setFrom(address: string): void;
  setReplyTo(address: string): void;
  addAddress(type: string, address: string, displayName: string): void;
  setBody(bodyText: string): void;
}
