export class UpdateUserFailedEvent {
  private reason: string;
  
  constructor(reason: string) {
    this.reason = reason;
  }

  public getReason(): string {
    return this.reason;
  }
}