import { z } from 'zod';

export const countriesDetailSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    iso3: z.string().optional(),
    iso2: z.string().optional(),
    phone_code: z.string().optional()
});

export type CountriesDetailType = z.infer<typeof countriesDetailSchema>;