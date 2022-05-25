import Intents from "./Intents";
import {BotType, DiscallWSType, DiscordData, EventName} from "./type";

// let sleep = async (ms: number): Promise<void> => new Promise<void>((resolve: any) => setInterval(resolve, ms));

export default class DiscordDataProcesser {
    private readonly token: string
    private readonly intents: number
    private bot: BotType
    private sequence: number | null = null
    private heartbeat: number = 0

    private heartbeat_code?: NodeJS.Timer

    constructor(token: string, intents: Intents, bot: BotType) {
        this.token = token;
        this.intents = intents.value;
        this.bot = bot;
    }

    async Dispatch(data: DiscordData, ws: DiscallWSType): Promise<void> {
        this.sequence = data.s as number;
        await this.bot.emit(data.t as EventName, data.d);
    }

    async Heartbeat(data: DiscordData, ws: DiscallWSType): Promise<void> {
    }

    async Identify(ws: DiscallWSType): Promise<void> {
        ws.send({
            op: 2,
            d: {
                token: this.token,
                intents: this.intents,
                properties: {
                    $os: 'linux',
                    $browser: 'discall',
                    $device: 'discall'
                }
            }
        });
    }

    async VoiceStateUpdate(ws: DiscallWSType): Promise<void> {
    }

    async Resume(ws: DiscallWSType): Promise<void> {
    }

    async Reconnect(data: DiscordData, ws: DiscallWSType): Promise<void> {
    }

    async RequestGuildMembers(ws: DiscallWSType): Promise<void> {
    }

    async InvalidSession(data: DiscordData, ws: DiscallWSType): Promise<void> {
    }

    async Hello(data: DiscordData, ws: DiscallWSType): Promise<void> {
        if (this.heartbeat)
            return;

        this.heartbeat = data.d?.heartbeat_interval;
        this.heartbeat_code = setInterval(() => {
            ws.send({
                op: 1,
                d: this.sequence
            });
        }, this.heartbeat);
    }

    async HeartbeatACK(data: DiscordData, ws: DiscallWSType): Promise<void> {
    }
}