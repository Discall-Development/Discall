import commander from "./command";
import listener from "./event";
import ws from "./ws";
import { CreateBotError } from "./error";

export default function bot(token: string, {
    intents, prefix
}: {
    intents: number;
    prefix?: string;
}) {
    if (intents === undefined)
        throw new CreateBotError("intents");

    if (token.split(".").length !== 3)
        throw new CreateBotError("token");

    let _ws = ws(token, intents);
    if (prefix)
        _ws = commander(_ws, prefix);

    _ws = listener(_ws);
}