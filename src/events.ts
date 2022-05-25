import {
	EventDataType,
	EventName,
	ReadyEventData,
	GuildCreateEventData, BotType, UnavailableGuildData
} from "./type";
import User from "./user";
import {UnavailableGuild} from "./guild";
import Application from "./application";

export class ReadyEvent {
	public v: number;
	public user: User;
	public guilds: UnavailableGuild[];
	public session_id: string;
	public shard: [number, number] = [NaN, NaN];
	public application: Application;

	private bot: BotType;

	constructor(data: ReadyEventData, bot: BotType) {
		this.v = data.v;
		this.user = new User(data.user);
		this.guilds = [];
		data.guilds.forEach((v: UnavailableGuildData) => {
			this.guilds.push(new UnavailableGuild(v))
		});
		this.session_id = data.session_id;
		this.application = new Application(data.application);

		if (data.shard !== undefined)
			this.shard = data.shard;

		this.bot = bot;
	}

	public process(): void {
		this.bot.user = this.user;
		this.bot.guilds = this.bot.guilds.concat(this.guilds);
		this.bot.session_ids.push(this.session_id);
		if (this.shard.indexOf(NaN) != -1)
			this.bot.shards.push(this.shard);
		this.bot.application = this.application;
	};
}

export class GuildCreateEvent {
	constructor(data: GuildCreateEventData, bot: BotType) {}

	public process(): void {};
}

type EventType = ReadyEvent | GuildCreateEvent;

export default class EventWrapper {
	type: EventName
	data: EventDataType
	bot: BotType

	constructor(type: EventName, data: EventDataType, bot: BotType) {
		this.type = type;
		this.data = data;
		this.bot = bot;
	}

	createEvent(): EventType {
		switch (this.type) {
			case 'READY':
				return new ReadyEvent(this.data as ReadyEventData, this.bot);
			case 'GUILD_CREATE':
				return new GuildCreateEvent(this.data as GuildCreateEventData, this.bot);
		}
	}
}