import sys
import os

args = sys.argv


if not (len(args) > 1):
  print("Invalid module arguments. Expected usage is python3 create-module.py <action> <domain_name> <core_directory_path> <OPTIONAL>")
  sys.exit(1)

input = args[1:]

if len(input) < 3:
  print("Invalid module arguments. Expected usage is python3 create-module.py <action> <domain_name> <core_directory_path> <OPTIONAL>")
  sys.exit(1)

# Represents the action of the module. EX: get, add, delete, request, etc
action = input[0]

# Represents the module owner or in other wrods, who the action is being performed on
model = input[1]

# Represents which folder inside src/core to place the new module
core_directory = input[2]

# Represents the optional inputs such as whether this endpoint needs middleware and request method
optional_inputs = input[3:]

has_middleware = False
request_method = "get"

if len(optional_inputs) > 0:
  for i in optional_inputs:
    if i == "-m":
      has_middleware = True
    else:
      request_method = i

if request_method != "get" and request_method != "put" and request_method != "post" and request_method != "delete":
  print("Invalid request method inputted. Valid request methods are [get, put, post, delete]")
  sys.exit(1)

middleware = ""
middlware_import = ""
if has_middleware:
  middleware = "@UseBefore(Middleware)"
  middlware_import = "import {Middleware} from \"../../../../../common/middleware/middleware\";"

path = os.getcwd() + "/src/core/" + core_directory

# Search inside src/core to verify the folder exists
exists = os.path.exists(path)
if not exists:
  print("The inputted src/core directory does not exist.")
  sys.exit(1)


request_dir = path + "/application/controllers/requests"
response_dir = path + "/application/controllers/responses"
subcontrollers_dir = path + "/application/controllers/subcontrollers"
controller_dir = path + "/application/controllers/"
command_dir = path + "/domain/command"
events_dir = path + "/domain/events"

if not os.path.exists(request_dir):
  print("There is no requests directory available")
  sys.exit(1)
  
if not os.path.exists(response_dir):
  print("There is no response directory available")
  sys.exit(1)

if not os.path.exists(subcontrollers_dir):
  print("There is no subcontrollers directory available")
  sys.exit(1)
  
if not os.path.exists(command_dir):
  print("There is no command directory available")
  sys.exit(1)
  
if not os.path.exists(events_dir):
  print("There is no events directory available")
  sys.exit(1)

files_prefix = action + "-" + model

# Creates the request file

request_file_imports = "import { RequestInterface } from \"../../../../../common/request-interface\""
request_file_class = "export class " + action.capitalize() + model.capitalize() + "Request implements RequestInterface {\n\tpublic requestId: string;\n\n\tpublic constructor (requestId: string) {\n\t\tthis.requestId = requestId;\n\t} \n}"
request_file_text = request_file_imports + "\n\n" + request_file_class
request_file_path = request_dir + "/" + files_prefix + "-request.ts"
request_file = open(request_file_path, "w+")
request_file.write(request_file_text)
request_file.close()


# creates the response files
failed_response_file_path = response_dir + "/" + files_prefix + "-failed" + "-response.ts"
success_response_file_path = response_dir + "/" + files_prefix + "-success" + "-response.ts"
response_interface_file_path = response_dir + "/" + files_prefix + "-response" + "-interface.ts"

response_interface_file = open(response_interface_file_path, "w+")
response_interface_file_imports = "import { ResponseInterface } from \"../../../../../common/response-interface\";"
response_interface_file_types = "export type " + action.capitalize() + model.capitalize() + "ResponseInterface = ResponseInterface"
response_interface_file_text = response_interface_file_imports + "\n\n" + response_interface_file_types
response_interface_file.write(response_interface_file_text)
response_interface_file.close()

failed_response_file = open(failed_response_file_path, "w+")
failed_response_imports = "import { StatusCodeEnum } from \"../../../../../common/enums/status-code-enums\";\nimport { " + action.capitalize() + model.capitalize() + "ResponseInterface } from \"./" + files_prefix + "-response-interface\";\n\n";
failed_response_class = "export class " + action.capitalize() + model.capitalize() + "FailedResponse implements " + action.capitalize() + model.capitalize() + "ResponseInterface {\n\tpublic status: StatusCodeEnum;\n\tprivate readonly message: string;\n\n\tpublic constructor(message: string, status: StatusCodeEnum) {\n\t\tthis.message = message;\n\t\tthis.status = status;\n\t}\n\n\tpublic getStatus(): StatusCodeEnum {\n\t\treturn this.status;\n\t}\n}";
failed_response_file.write(failed_response_imports + failed_response_class)
failed_response_file.close()

success_response_file = open(success_response_file_path, "w+")
success_response_class = "export class " + action.capitalize() + model.capitalize() + "SuccessResponse implements " + action.capitalize() + model.capitalize() + "ResponseInterface { \n\tpublic status: StatusCodeEnum;\n\tprivate readonly message: string;\n\n\tpublic constructor(message: string, status: StatusCodeEnum) {\n\t\tthis.message = message;\n\t\tthis.status = status;\n\t}\n\n\tpublic getStatus(): StatusCodeEnum {\n\t\treturn this.status;\n\t}\n}";
success_response_file.write(failed_response_imports + success_response_class)
success_response_file.close()


# Creates the event file

failed_event_file_path = events_dir + "/" + files_prefix + "-failed-event.ts"
failed_event_file = open(failed_event_file_path, "w+")
failed_event_file_text = "export class " + action.capitalize() + model.capitalize() + "FailedEvent {\n\n\tprivate reason: string;\n\n\tpublic constructor(reason: string) {\n\t\tthis.reason = reason;\n\t}\n\n\tpublic getReason(): string {\n\t\treturn this.reason;\n\t}\n}"
failed_event_file.write(failed_event_file_text)
failed_event_file.close()

success_event_file_path = events_dir + "/" + files_prefix + "-success-event.ts"
success_event_file = open(success_event_file_path, "w+")
success_event_file_text = "export class " + action.capitalize() + model.capitalize() + "SuccessEvent {\n\n\tpublic constructor() {}\n\n}"
success_event_file.write(success_event_file_text)
success_event_file.close()

event_enum_file_path = events_dir + "/" + files_prefix + "-enum.ts"
event_enum_file_text = "export enum " + action.capitalize() + model.capitalize() + "EventEnum {\n\tSUCCESS = \"" + action + model.capitalize() + "Success\",\n\tFAILED = \"" + action + model.capitalize() + "Failed\"\n}";
event_enum_file = open(event_enum_file_path, "w+")
event_enum_file.write(event_enum_file_text)
event_enum_file.close()


enums = action.capitalize() + model.capitalize() + "EventEnum"
failed_enum = action.capitalize() + model.capitalize() + "FailedEvent"
success_enum = action.capitalize() + model.capitalize() + "SuccessEvent"

# Creates the command file
command_file_path = command_dir + "/" + files_prefix + "-command.ts"
command_file = open(command_file_path, "w+")
command_file_enum_import = "import { " + enums + " } from \"../events/" + files_prefix + "-enum\";\n"
command_file_event_import = "import { " + failed_enum + " } from \"../events/" + files_prefix + "-failed-event\";\nimport { " + success_enum + " } from \"../events/" + files_prefix + "-success-event\";\n"
command_file_others_import = "import { Log } from \"../../../../common/logger/logger\";\nimport {Inject, Service} from \"typedi\";\nimport {CustomEvent} from \"../../../../common/CustomEvent\";\n\n"
command_file_class = "@Service('" + action + "." + model + ".command" + "')\nexport class " + action.capitalize() + model.capitalize() + "Command { \n\tprivate logger: Log;\n\n\tpublic constructor(@Inject('event.emitter') private readonly event: CustomEvent) { \n\t\tthis.logger = new Log();\n\t}\n\n\tpublic async execute(): Promise<void> {}\n}"
command_file.write(command_file_event_import + command_file_enum_import + command_file_others_import + command_file_class)
command_file.close()

# Creates the controller file
controller_file_path = subcontrollers_dir + "/" + files_prefix + "-controller.ts"
controller_file = open(controller_file_path, "w+")
controller_file_import = "import AbstractController from \"../../../../../common/abstract-controller\";\nimport { " + action.capitalize() + model.capitalize() + "ResponseInterface } from \"../responses/" + files_prefix +"-response-interface\";\n"
controller_file_import_events = "import { " + enums + " } from \"../../../domain/events/" + files_prefix + "-enum\";\n" + "import { " + failed_enum + " } from \"../../../domain/events/" + files_prefix + "-failed-event\";\nimport { " + success_enum + " } from \"../../../domain/events/" + files_prefix + "-success-event\";\n"
controller_file_imports_response = "import { " + action.capitalize() + model.capitalize() + "SuccessResponse } from \"../responses/" + files_prefix + "-success-response\";\nimport { " + action.capitalize() + model.capitalize() + "FailedResponse } from \"../responses/" + files_prefix + "-failed-response\";\n";
controller_file_imports_other = "import { StatusCodeEnum } from \"../../../../../common/enums/status-code-enums\";\nimport { CustomEvent } from \"../../../../../common/CustomEvent\";\nimport {" + action.capitalize() + model.capitalize() + "Command } from \"../../../domain/command/" + files_prefix + "-command\";\n"
controller_file_imports_third_party = "import {JsonController, Get, Post, Delete, Put, Res, Req, UseBefore} from \"routing-controllers\";\nimport {Inject, Service} from \"typedi\";\n" + middlware_import + "\n\n"
controller_file_class = "@JsonController()\n@Service()\nexport class " + action.capitalize() + model.capitalize() + "Controller extends AbstractController {\n\n\tpublic response!: " + action.capitalize() + model.capitalize() + "ResponseInterface \n\n\tpublic constructor(@Inject('event.emitter') private readonly eventSubscriber: CustomEvent, \n\t\t @Inject('" + action + "." + model + ".command') private readonly command: " + action.capitalize() + model.capitalize() + "Command) {\n\t\t super(); \n\t} \n\n\tprivate " + action + model.capitalize() + "Success(event: " + action.capitalize() + model.capitalize() + "SuccessEvent): void {\n\t\t this.response = new " + action.capitalize() + model.capitalize() + "SuccessResponse(\"Success\", StatusCodeEnum.OK);\n\t}\n\n\tprivate " + action + model.capitalize() + "Failed(event: " + action.capitalize() + model.capitalize() + "FailedEvent): void {\n\t\t this.response = new " + action.capitalize() + model.capitalize() + "FailedResponse(event.getReason(), StatusCodeEnum.BAD_REQUEST);\n\t} \n\n\t"
controller_file_request_method = middleware + "\n\t@" + request_method.capitalize() + "(\"/\")\n\tprivate async " + request_method + "(@Req() req: any, @Res() res: any): Promise<void> {\n\n\t\tthis.eventSubscriber.on(" + action.capitalize() + model.capitalize() + "EventEnum.SUCCESS, this." + action + model.capitalize() + "Success.bind(this));\n\t\tthis.eventSubscriber.on(" + action.capitalize() + model.capitalize() + "EventEnum.FAILED, this." + action + model.capitalize() + "Failed.bind(this));\n\n\t\tawait this.command.execute();\n\n\t\treturn res.status(this.response.getStatus()).json(this.response);\n\t}\n\n}"
controller_file.write(controller_file_import + controller_file_import_events + controller_file_imports_response + controller_file_imports_other + controller_file_imports_third_party + controller_file_class + controller_file_request_method)
controller_file.close()
