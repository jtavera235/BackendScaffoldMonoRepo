import { StatusCodeEnum } from "./enums/status-code-enums";

export interface ResponseInterface {
  getStatus(): number;
  status: StatusCodeEnum;
}