import { Prisma } from "@prisma/client";
export function generatePgFunctionCallSafe(
  functionName: string,
  params: Record<string, any>,
  extraParams?: Record<string, any>
): Prisma.Sql {

  const formatValue = (value: any): Prisma.Sql => {
    if (value === null) return Prisma.sql`NULL`;
    if (value instanceof Date) return Prisma.sql`${value.toISOString()}`;
    if (typeof value === "object") return Prisma.sql`${JSON.stringify(value)}`;
    return Prisma.sql`${value}`;
  };

  const allParams = { ...params, ...(extraParams ?? {}) };

  const args = Object.entries(allParams)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => Prisma.sql`${Prisma.raw(key)} => ${formatValue(value)}`);

  const joined = Prisma.join(args, ', ');

  return Prisma.sql`SELECT * FROM ${Prisma.raw(functionName)}(${joined});`;
}
