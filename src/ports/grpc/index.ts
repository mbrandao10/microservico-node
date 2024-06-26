const PROTO_PATH_USER = __dirname + "/user.proto";
import {
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import credentialsGrpc from "@/config/grpc";
import {
  FindAllUser,
  FindAllUsersByIds,
  FindUserById
} from "./modules/user";

const packageDefinition = loadSync(PROTO_PATH_USER, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const userPronto: any = loadPackageDefinition(packageDefinition)["user"];
// const organizationPronto: any = loadPackageDefinition(packageDefinition)["organization"];

const server = () => {
  const server = new Server();
  const { url, port } = credentialsGrpc;

  server.addService(userPronto.UsersService.service, {
    FindUserById: FindUserById,
    FindAllUsersByIds: FindAllUsersByIds,
    FindAllUser: FindAllUser,
  });

  // server.addService(organizationPronto.OrganizationsService.service, {
  //   FindUserById: FindUserById,
  //   FindAllUsersByIds: FindAllUsersByIds,
  //   FindAllUser: FindAllUser,
  // });

  server.bindAsync(url, ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("Server running at grpc", port);
  });
};

server();