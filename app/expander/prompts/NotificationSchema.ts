import { z } from "zod";

const notificationsSchema = z.object({
    notifications: z.array(
        z.object({
            name: z.string().describe('Name of a fictional person.'),
            message: z.string().describe('Do not use emojis or links.'),
            minutesAgo: z.number(),
        }),
    ),
})

export default notificationsSchema