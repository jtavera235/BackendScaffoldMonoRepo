export class SignupEventFailed {

  private reason: string;

  constructor(reason: string) {
    this.reason = reason;
  }

  public getReason(): string {
    return this.reason;
  }
}