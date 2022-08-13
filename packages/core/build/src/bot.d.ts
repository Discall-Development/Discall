export default function bot(token: string, { intents, prefix }: {
    intents: number;
    prefix?: string;
}): (packet: import("@discall/types").HttpRequest) => Promise<any>;
