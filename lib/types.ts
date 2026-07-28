import { z } from 'zod';

export const PersonSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export const TraitSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const HouseSchema = z.object({
  id: z.string(),
  name: z.string(),
  houseColors: z.string(),
  founder: z.string(),
  animal: z.string(),
  element: z.string(),
  ghost: z.string(),
  commonRoom: z.string(),
  heads: z.array(PersonSchema),
  traits: z.array(TraitSchema),
});

export type Person = z.infer<typeof PersonSchema>;
export type Trait = z.infer<typeof TraitSchema>;
export type House = z.infer<typeof HouseSchema>;
