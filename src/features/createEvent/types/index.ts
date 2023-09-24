import {z} from "zod";
import { createEventSchema } from "../schemas";

export type CreateEventDto = z.infer<typeof createEventSchema>;