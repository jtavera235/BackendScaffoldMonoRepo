import { Logger } from 'tslog';
import { RequestInterface } from '../request-interface';
import { ResponseInterface } from '../response-interface';

export class Log {
  private logger: Logger;

  public constructor() {
    this.logger = new Logger( { name: 'Logger' });
  }

  public logApiRoute(route: string, action: string) {
    this.logger.info(`${action} request made to ${route}`)
  }

  public logApiRequests(request: RequestInterface) {
    this.logger.info({
      request: request
    });
  }

  public logApiResponses(response: ResponseInterface) {
    this.logger.info({
      response: response
    });
  }

  public logErrorFailures() {
    this.logger.fatal();
  }
}