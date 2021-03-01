import { Logger } from 'tslog';
import GeneralError from '../general-error';
import { RequestInterface } from '../request-interface';
import { ResponseInterface } from '../response-interface';
import { APIActionsEnum } from "../enums/api-actions-enums";

export class Log {
  private logger: Logger;

  public constructor() {
    this.logger = new Logger({
      maskValuesOfKeys: ["test", "authorization", "password", "authentication"],
      maskAnyRegEx: ["CUSTOM.*"]
    });
  }

  public logApiRequests(request: RequestInterface, action: APIActionsEnum, route: string): void { 
    this.logger.debug({
      message: `Starting ${action} request made to ${route}`,
      request: request,
      requestId: request.requestId,
      method: action,
      url: route,
      timestamp: new Date().toLocaleString(),
    });
  }

  public logApiResponses(response: ResponseInterface, action: APIActionsEnum, route: string): void {
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