interface GlideUser {
  getCompanyID(): string;
  getDisplayName(): string;
  getID(): string;
  getName(): string;
  getPreference(name: string): string;
  hasRole(role: string): boolean;
  isMemberOf(group: string): boolean;
  savePreference(name: string, value: string): void;
}
