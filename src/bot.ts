import User from "./user";
import Intents from "./Intents";
import DiscallWS from "./ws";
import {EventDataType, EventName, GuildData, UnavailableGuildType} from "./type";
import EventWrapper from "./events";
import Application from "./application";

export default class Bot {
    public user: User | null = null;
    public guilds: UnavailableGuildType[] = [];
    public session_ids: string[] = [];
    public shards: [number, number][] = [];
    public application: Application | null = null;

    public readonly ws: DiscallWS;

    constructor(token: string, intents: Intents, options?: {}, wsoptions: { encoding?: string, version?: number } = {}) {
        let encoding: string = 'etf';
        let version: number = 9;
        if (wsoptions.encoding !== undefined)
            encoding = wsoptions.encoding;

        if (wsoptions.version !== undefined)
            version = wsoptions.version;

        this.ws = new DiscallWS(token, intents, encoding, version, this);
    }

    public async emit(event_name: EventName, d: any): Promise<void> {
        let wrapper = new EventWrapper(event_name, d as EventDataType, this);
        let event = wrapper.createEvent();
        event.process();

        switch (event_name) {
            case 'READY':
                return await this.on_ready();
            case 'GUILD_CREATE':
                return await this.on_guild_create(event);
        }
    }

    public async on_ready(): Promise<void> {
        console.log(this.guilds);
    }

    public async on_guild_create(guild: any): Promise<void> {
        console.log('guild event');
    }
}

export async function start(bot: Bot): Promise<void> {
    await bot.ws.connect();
}