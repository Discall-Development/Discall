import commander from './command';
import listener from './event';
import ws from './ws';
import { CreateBotError } from './error';
import voice from './voice/ws';
import client from './https';

export default function bot(token: string, {
    intents, prefix
}: {
    intents: number;
    prefix?: string;
}) {
    if (intents === undefined)
        throw new CreateBotError('intents');

    if (token.split('.').length !== 3)
        throw new CreateBotError('token');

    let _ws = ws(token, intents);
    if (prefix)
        _ws = commander(_ws, prefix);

    _ws = listener(_ws);
    _ws = voice(_ws);

    return client(token, _ws);
}