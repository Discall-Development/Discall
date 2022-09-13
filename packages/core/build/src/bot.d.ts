import { DiscordData, HttpRequest } from '@discall/types';
export default function bot(token: string, { intents, prefix }: {
    intents: number;
    prefix?: string;
}): (packet: HttpRequest | DiscordData) => Promise<any>;
