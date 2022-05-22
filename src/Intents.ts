enum IntentsPermission {
	GUILDS                    = 1 << 0,
	GUILD_MEMBERS             = 1 << 1,
	GUILD_BANS                = 1 << 2,
	GUILD_EMOJIS_AND_STICKERS = 1 << 3,
	GUILD_INTEGRATIONS        = 1 << 4,
	GUILD_WEBHOOKS            = 1 << 5,
	GUILD_INVITES             = 1 << 6,
	GUILD_VOICE_STATES        = 1 << 7,
	GUILD_PRESENCES           = 1 << 8,
	GUILD_MESSAGES            = 1 << 9,
	GUILD_MESSAGE_REACTIONS   = 1 << 10,
	GUILD_MESSAGE_TYPING      = 1 << 11,
	DIRECT_MESSAGES           = 1 << 12,
	DIRECT_MESSAGE_REACTIONS  = 1 << 13,
	DIRECT_MESSAGE_TYPING     = 1 << 14,
	MESSAGE_CONTENT           = 1 << 15,
	GUILD_SCHEDULED_EVENTS    = 1 << 16
}

export default class Intents {
	public guilds: boolean
	public guild_members: boolean
	public guild_bans: boolean
	public guild_emojis_and_stickers: boolean
	public guild_integrations: boolean
	public guild_webhooks: boolean
	public guild_invites: boolean
	public guild_voice_states: boolean
	public guild_presences: boolean
	public guild_messages: boolean
	public guild_message_reactions: boolean
	public guild_message_typing: boolean
	public direct_messages: boolean
	public direct_message_reactions: boolean
	public direct_message_typing: boolean
	public message_content: boolean
	public guild_scheduled_events: boolean

	constructor() {
		this.guilds = false;
		this.guild_members = false;
		this.guild_bans = false;
		this.guild_emojis_and_stickers = false;
		this.guild_integrations = false;
		this.guild_webhooks = false;
		this.guild_invites = false;
		this.guild_voice_states = false;
		this.guild_presences = false;
		this.guild_messages = false;
		this.guild_message_reactions = false;
		this.guild_message_typing = false;
		this.direct_messages = false;
		this.direct_message_reactions = false;
		this.direct_message_typing = false;
		this.message_content = false;
		this.guild_scheduled_events = false;
	}

	static all(): Intents {
		let intents = new Intents();
		intents.guilds = true;
		intents.guild_members = true;
		intents.guild_bans = true;
		intents.guild_emojis_and_stickers = true;
		intents.guild_integrations = true;
		intents.guild_webhooks = true;
		intents.guild_invites = true;
		intents.guild_voice_states = true;
		intents.guild_presences = true;
		intents.guild_messages = true;
		intents.guild_message_reactions = true;
		intents.guild_message_typing = true;
		intents.direct_messages = true;
		intents.direct_message_reactions = true;
		intents.direct_message_typing = true;
		intents.message_content = true;
		intents.guild_scheduled_events = true;
		return intents;
	}

	static none(): Intents {
		return new Intents();
	}

	static default(): Intents {
		let intents = new Intents();
		intents.guilds = true;
		intents.guild_bans = true;
		intents.guild_emojis_and_stickers = true;
		intents.guild_integrations = true;
		intents.guild_webhooks = true;
		intents.guild_invites = true;
		intents.guild_voice_states = true;
		intents.guild_messages = true;
		intents.guild_message_reactions = true;
		intents.guild_message_typing = true;
		intents.direct_messages = true;
		intents.direct_message_reactions = true;
		intents.direct_message_typing = true;
		intents.guild_scheduled_events = true;
		return intents;
	}

	get value(): number {
		let value = 0;
		if (this.guilds)
			value |= IntentsPermission.GUILDS;
		
		if (this.guild_members)
			value |= IntentsPermission.GUILD_MEMBERS;
		
		if (this.guild_bans)
			value |= IntentsPermission.GUILD_BANS;
		
		if (this.guild_emojis_and_stickers)
			value |= IntentsPermission.GUILD_EMOJIS_AND_STICKERS;
		
		if (this.guild_integrations)
			value |= IntentsPermission.GUILD_INTEGRATIONS;
		
		if (this.guild_webhooks)
			value |= IntentsPermission.GUILD_WEBHOOKS;
		
		if (this.guild_invites)
			value |= IntentsPermission.GUILD_INVITES;
		
		if (this.guild_voice_states)
			value |= IntentsPermission.GUILD_VOICE_STATES;
		
		if (this.guild_presences)
			value |= IntentsPermission.GUILD_PRESENCES;
		
		if (this.guild_messages)
			value |= IntentsPermission.GUILD_MESSAGES;
		
		if (this.guild_message_reactions)
			value |= IntentsPermission.GUILD_MESSAGE_REACTIONS;
		
		if (this.guild_message_typing)
			value |= IntentsPermission.GUILD_MESSAGE_TYPING;
		
		if (this.direct_messages)
			value |= IntentsPermission.DIRECT_MESSAGES;
		
		if (this.direct_message_reactions)
			value |= IntentsPermission.DIRECT_MESSAGE_REACTIONS;
		
		if (this.direct_message_typing)
			value |= IntentsPermission.DIRECT_MESSAGE_TYPING;
		
		if (this.message_content)
			value |= IntentsPermission.MESSAGE_CONTENT;
		
		if (this.guild_scheduled_events)
			value |= IntentsPermission.GUILD_SCHEDULED_EVENTS;

		return value;
	}
}