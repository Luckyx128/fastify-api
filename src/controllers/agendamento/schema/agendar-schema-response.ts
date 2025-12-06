import z from "zod";

export const AgendarSchemaResponse = z.object({
    cd_retorno: z.number(),
    ds_retorno: z.string(),
});