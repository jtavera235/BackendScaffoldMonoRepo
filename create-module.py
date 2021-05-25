import sys
import os

args = sys.argv


if not (len(args) > 1):
  print("Invalid module arguments. Expected usage is python3 create-module.py <domain_name> ")
  sys.exit(1)

input = args[1:]

if len(input) < 1:
  print("Invalid module arguments. Expected usage is python3 create-module.py <domain_name> ")
  sys.exit(1)

controller_name = input[0].lower()
path = os.getcwd() + "/src/core/" + controller_name
os.mkdir(path)
os.mkdir(path + "/application/")
os.mkdir(path + "/application/controllers")
os.mkdir(path + "/application/controllers/requests")
os.mkdir(path + "/application/controllers/responses")
os.mkdir(path + "/application/controllers/subcontrollers")
os.mkdir(path + "/domain")
os.mkdir(path + "/domain/command")
os.mkdir(path + "/domain/events")

controller_path = path + "/application/controllers/" + controller_name + "-controller.ts"

controller_file = open(controller_path, "w+")
controller_file_import = "import AbstractController from \"../../../../common/abstract-controller\";\nimport {useExpressServer} from \"routing-controllers\";\n\n"
controller_file_class = "class " + controller_name.capitalize() + "Controller extends AbstractController {\n\n\tpublic constructor() {\n\t\tsuper();\n\t\tthis.setRoutes();\n\t}\n\n\tprivate setRoutes(): void {\n\n\tuseExpressServer(this.express, {\n\t\tcontrollers: [],\n\t\tmiddlewares: [],\n\t\t});\n\t}\n\n}\n\nexport default new " + controller_name.capitalize() + "Controller().express;" 
controller_file.write(controller_file_import + controller_file_class)
controller_file.close() 