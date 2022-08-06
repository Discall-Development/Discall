import { pipeline } from "@discall/simple-pipe";
import { create } from "./src/https";
import { message } from "./src/message";

create(channel(message({})))

pipeline(
    message,
    channel,
    create
).execute({})
