import { Logger } from 'tslog';
import GeneralError from '../general-error';

export class Log {
  private logger: Logger;

  public constructor() {
    this.logger = new Logger({
      maskValuesOfKeys: ["test", "authorization", "password", "authentication", "access", "refresh"],
      maskAnyRegEx: ["CUSTOM.*"]
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public logApiRequests(body: any, action: string, route: string): void {
    this.logger.debug({
      message: `Starting ${action} request made to ${route}`,
      request: body,
      requestId: body.requestId,
      method: action,
      url: route,
      timestamp: new Date().toLocaleString(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public logApiResponses(response: any, action: string, route: string): void {
    this.logger.debug({
      message: `Finished ${action} request made to ${route}`,
      response: response,
      method: action,
      url: route,
      timestamp: new Date().toLocaleString(),
    });
  }

  public logErrorFailures(error: GeneralError): void {
    this.logger.fatal({
      timestamp: new Date().toLocaleString(),
      error: error,
    });
  }

  public logMessage(message: string): void {
    const currentTime = new Date().toLocaleString();
    this.logger.debug(`${currentTime} message: ${message}`);
  }

  public logDatabaseAction(message: string): void {
    this.logger.fatal({
      timestamp: new Date().toLocaleString(),
      message: message,
    });
  }
}