export class LoginEventSuccess {

  public readonly access: string;
  public readonly refresh: string;

  constructor(access: string, refresh: string) {
    this.access = access;
    this.refresh = refresh;
  }

}