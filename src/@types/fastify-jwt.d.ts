export type typeUser = "MT" | "OP" | "SU";

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: UseJWT;
  }
}

export interface UserJWT {
  nr_contrato: number,
  id_usuario: string
}
