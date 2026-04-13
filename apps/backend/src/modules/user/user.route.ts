import type { FastifyInstance } from "fastify";
import type { UserCreateInput, UserUpdateInput } from "@repo/types";
import type { UserService } from "./user.service";
import type { Logger } from "@repo/logger";
import { idParamsSchema, createUserBodySchema, updateUserBodySchema } from "./user.schema";

export async function userRoute(
  app: FastifyInstance,
  { service, logger }: { service: UserService; logger: Logger }
) {
  app.get("/", async () => {
    logger.info("findAll users");
    return service.findAll();
  });

  app.get<{ Params: { id: string } }>("/:id", {
    schema: { params: idParamsSchema },
  }, async (request, reply) => {
    const user = await service.findById(Number(request.params.id));
    if (!user) return reply.notFound("User not found");
    return user;
  });

  app.post<{ Body: UserCreateInput }>("/", {
    schema: { body: createUserBodySchema },
  }, async (request, reply) => {
    const user = await service.create(request.body);
    return reply.code(201).send(user);
  });

  app.patch<{ Params: { id: string }; Body: UserUpdateInput }>("/:id", {
    schema: { params: idParamsSchema, body: updateUserBodySchema },
  }, async (request, reply) => {
    try {
      const user = await service.update(Number(request.params.id), request.body);
      return user;
    } catch {
      return reply.notFound("User not found");
    }
  });

  app.delete<{ Params: { id: string } }>("/:id", {
    schema: { params: idParamsSchema },
  }, async (request, reply) => {
    try {
      await service.delete(Number(request.params.id));
      return reply.code(204).send();
    } catch {
      return reply.notFound("User not found");
    }
  });
}
