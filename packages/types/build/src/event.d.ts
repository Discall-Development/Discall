import { ApplicationFlag, ApplicationCommandPermissionsData } from './application';
import { ChannelData, ChannelTypes, ThreadMemberData } from './channel';
import { GuildData, GuildMemberData, GuildMemberMentionData, GuildScheduledEventData, IntegrationData, InviteTargetType, RoleData, UnavailableGuildData } from './guild';
import { InteractionData } from './interaction';
import { EmojiData, StickerData, MessageData } from './message';
import { SnowflakeData } from './snowflake';
import { Timestamp } from './timestamp';
import { UserData, ActivityData, ClientStatusData, PresenceUpdateData } from './user';
import { StageInstanceData, VoiceStateData } from './voice';
export declare type EventData = ReadyEventData | ResumedEventData | ApplicationCommandPermissionsUpdateEventData | ChannelCreateEventData | ChannelUpdateEventData | ChannelDeleteEventData | ThreadCreateEventData | ThreadUpdateEventData | ThreadDeleteEventData | ThreadListSyncEventData | ThreadMemberUpdateEventData | ThreadMembersUpdateEventData | ChannelPinsUpdateEventData | GuildCreateEventData | GuildUpdateEventData | GuildDeleteEventData | GuildBanAddEventData | GuildBanRemoveEventData | GuildEmojisUpdateEventData | GuildStickersUpdateEventData | GuildIntegrationsUpdateEventData | GuildMemberAddEventData | GuildMemberRemoveEventData | GuildMemberUpdateEventData | GuildMembersChunkEventData | GuildRoleCreateEventData | GuildRoleUpdateEventData | GuildRoleDeleteEventData | GuildScheduledEventCreateEventData | GuildScheduledEventUpdateEventData | GuildScheduledEventDeleteEventData | GuildScheduledEventUserAddEventData | GuildScheduledEventUserRemoveEventData | IntegrationCreateEventData | IntegrationUpdateEventData | IntegrationDeleteEventData | InviteCreateEventData | InviteDeleteEventData | MessageCreateEventData | MessageUpdateEventData | MessageDeleteEventData | MessageDeleteBulkEventData | MessageReactionAddEventData | MessageReactionRemoveEventData | MessageReactionRemoveAllEventData | MessageReactionRemoveEmojiEventData | PresenceUpdateEventData | TypingStartEventData | UserUpdateEventData | VoiceStateUpdateEventData | VoiceServerUpdateEventData | WebhookUpdateEventData | InteractionCreateEventData | StageInstanceCreateEventData | StageInstanceUpdateEventData | StageInstanceDeleteEventData;
export declare enum EventName {
    Ready = "READY",
    ApplicationCommandPermissionsUpdate = "APPLICATION_COMMAND_PERMISSIONS_UPDATE",
    ChannelCreate = "CHANNEL_CREATE",
    ChannelUpdate = "CHANNEL_UPDATE",
    ChannelDelete = "CHANNEL_DELETE",
    ThreadCreate = "THREAD_CREATE",
    ThreadUpdate = "THREAD_UPDATE",
    ThreadDelete = "THREAD_DELETE",
    ThreadListSync = "THREAD_LIST_SYNC",
    ThreadMemberUpdate = "THREAD_MEMBER_UPDATE",
    ThreadMembersUpdate = "THREAD_MEMBERS_UPDATE",
    ChannelPinsUpdate = "CHANNEL_PINS_UPDATE",
    GuildCreate = "GUILD_CREATE",
    GuildUpdate = "GUILD_UPDATE",
    GuildDelete = "GUILD_DELETE",
    GuildBanAdd = "GUILD_BAN_ADD",
    GuildBanRemove = "GUILD_BAN_REMOVE",
    GuildEmojisUpdate = "GUILD_EMOJIS_UPDATE",
    GuildStickersUpdate = "GUILD_STICKERS_UPDATE",
    GuildIntegrationsUpdate = "GUILD_INTEGRATIONS_UPDATE",
    GuildMemberAdd = "GUILD_MEMBER_ADD",
    GuildMemberRemove = "GUILD_MEMBER_REMOVE",
    GuildMemberUpdate = "GUILD_MEMBER_UPDATE",
    GuildMembersChunk = "GUILDMEMBERSCHUNK",
    GuildRoleCreate = "GUILD_ROLE_CREATE",
    GuildRoleUpdate = "GUILD_ROLE_UPDATE",
    GuildRoleDelete = "GUILD_ROLE_DELETE",
    GuildScheduledEventCreate = "GUILD_SCHEDULED_EVENT_CREATE",
    GuildScheduledEventUpdate = "GUILD_SCHEDULED_EVENT_UPDATE",
    GuildScheduledEventDelete = "GUILD_SCHEDULED_EVENT_DELETE",
    GuildScheduledEventUserAdd = "GUILD_SCHEDULED_EVENT_USER_ADD",
    GuildScheduledEventUserRemove = "GUILD_SCHEDULED_EVENT_USER_REMOVE",
    IntegrationCreate = "INTEGRATION_CREATE",
    IntegrationUpdate = "INTEGRATION_UPDATE",
    IntegrationDelete = "INTEGRATION_DELETE",
    InviteCreate = "INVITE_CREATE",
    InviteDelete = "INVITE_DELETE",
    MessageCreate = "MESSAGE_CREATE",
    MessageUpdate = "MESSAGE_UPDATE",
    MessageDelete = "MESSAGE_DELETE",
    MessageDeleteBulk = "MESSAGE_DELETE_BULK",
    MessageReactionAdd = "MESSAGE_REACTION_ADD",
    MessageReactionRemove = "MESSAGE_REACTION_REMOVE",
    MessageReactionRemoveAll = "MESSAGE_REACTION_REMOVE_ALL",
    MessageReactionRemoveEmoji = "MESSAGE_REACTION_REMOVE_EMOJI",
    PresenceUpdate = "PRESENCE_UPDATE",
    TypingStart = "TYPING_START",
    UserUpdate = "USER_UPDATE",
    VoiceStateUpdate = "VOICE_STATE_UPDATE",
    VoiceServerUpdate = "VOICE_SERVER_UPDATE",
    WebhookUpdate = "WEBHOOK_UPDATE",
    InteractionCreate = "INTERACTION_CREATE",
    StageInstanceCreate = "STAGE_INSTANCE_CREATE",
    StageInstanceUpdate = "STAGE_INSTANCE_UPDATE",
    StageInstanceDelete = "STAGE_INSTANCE_DELETE",
    ready = "READY",
    application_command_permissions_update = "APPLICATION_COMMAND_PERMISSIONS_UPDATE",
    channel_create = "CHANNEL_CREATE",
    channel_update = "CHANNEL_UPDATE",
    channel_delete = "CHANNEL_DELETE",
    thread_create = "THREAD_CREATE",
    thread_update = "THREAD_UPDATE",
    thread_delete = "THREAD_DELETE",
    thread_list_sync = "THREAD_LIST_SYNC",
    thread_member_update = "THREAD_MEMBER_UPDATE",
    thread_members_update = "THREAD_MEMBERS_UPDATE",
    channel_pins_update = "CHANNEL_PINS_UPDATE",
    guild_create = "GUILD_CREATE",
    guild_update = "GUILD_UPDATE",
    guild_delete = "GUILD_DELETE",
    guild_ban_add = "GUILD_BAN_ADD",
    guild_ban_remove = "GUILD_BAN_REMOVE",
    guild_emojis_update = "GUILD_EMOJIS_UPDATE",
    guild_stickers_update = "GUILD_STICKERS_UPDATE",
    guild_integrations_update = "GUILD_INTEGRATIONS_UPDATE",
    guild_member_add = "GUILD_MEMBER_ADD",
    guild_member_remove = "GUILD_MEMBER_REMOVE",
    guild_member_update = "GUILD_MEMBER_UPDATE",
    guild_members_chunk = "GUILDMEMBERSCHUNK",
    guild_role_create = "GUILD_ROLE_CREATE",
    guild_role_update = "GUILD_ROLE_UPDATE",
    guild_role_delete = "GUILD_ROLE_DELETE",
    guild_scheduled_event_create = "GUILD_SCHEDULED_EVENT_CREATE",
    guild_scheduled_event_update = "GUILD_SCHEDULED_EVENT_UPDATE",
    guild_scheduled_event_delete = "GUILD_SCHEDULED_EVENT_DELETE",
    guild_scheduled_event_user_add = "GUILD_SCHEDULED_EVENT_USER_ADD",
    guild_scheduled_event_user_remove = "GUILD_SCHEDULED_EVENT_USER_REMOVE",
    integration_create = "INTEGRATION_CREATE",
    integration_update = "INTEGRATION_UPDATE",
    integration_delete = "INTEGRATION_DELETE",
    invite_create = "INVITE_CREATE",
    invite_delete = "INVITE_DELETE",
    message_create = "MESSAGE_CREATE",
    message_update = "MESSAGE_UPDATE",
    message_delete = "MESSAGE_DELETE",
    message_delete_bulk = "MESSAGE_DELETE_BULK",
    message_reaction_add = "MESSAGE_REACTION_ADD",
    message_reaction_remove = "MESSAGE_REACTION_REMOVE",
    message_reaction_remove_all = "MESSAGE_REACTION_REMOVE_ALL",
    message_reaction_remove_emoji = "MESSAGE_REACTION_REMOVE_EMOJI",
    presence_update = "PRESENCE_UPDATE",
    typing_start = "TYPING_START",
    user_update = "USER_UPDATE",
    voice_state_update = "VOICE_STATE_UPDATE",
    voice_server_update = "VOICE_SERVER_UPDATE",
    webhook_update = "WEBHOOK_UPDATE",
    interaction_create = "INTERACTION_CREATE",
    stage_instance_create = "STAGE_INSTANCE_CREATE",
    stage_instance_update = "STAGE_INSTANCE_UPDATE",
    stage_instance_delete = "STAGE_INSTANCE_DELETE"
}
export interface ReadyEventData {
    v: number;
    user: UserData;
    guilds: UnavailableGuildData[];
    session_id: string;
    resume_gateway_url: string;
    shard?: [number, number];
    application: {
        flags: ApplicationFlag;
        id: SnowflakeData;
    };
}
export declare type ResumedEventData = Record<string, never>;
export interface ApplicationCommandPermissionsUpdateEventData {
    id: SnowflakeData;
    application_id: SnowflakeData;
    guild_id: SnowflakeData;
    permissions: ApplicationCommandPermissionsData[];
}
export declare type ChannelCreateEventData = ChannelData;
export declare type ChannelUpdateEventData = ChannelData;
export declare type ChannelDeleteEventData = ChannelData;
export interface ThreadCreateEventData extends ChannelData {
    newly_created?: boolean;
    thread_member?: ThreadMemberData;
}
export declare type ThreadUpdateEventData = ChannelData;
export interface ThreadDeleteEventData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    parent_id: SnowflakeData | null;
    type: ChannelTypes;
}
export interface ThreadListSyncEventData {
    guild_id: SnowflakeData;
    channel_ids?: SnowflakeData[];
    threads: ChannelData[];
    members: ThreadMemberData[];
}
export interface ThreadMemberUpdateEventData extends ThreadMemberData {
    guild_id: SnowflakeData;
}
export interface ThreadMembersUpdateEventData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    member_count: number;
    added_members?: ThreadMemberData[];
    removed_member_ids?: SnowflakeData[];
}
export interface ChannelPinsUpdateEventData {
    guild_id?: SnowflakeData;
    channel_id: SnowflakeData;
    last_pin_timestamp?: Timestamp | null;
}
export interface GuildCreateEventData extends GuildData {
    join_at: Timestamp;
    large: boolean;
    unavailable: boolean;
    member_count: number;
    voice_states: VoiceStateData[];
    members: GuildMemberData[];
    channels: ChannelData[];
    threads: ChannelData[];
    presences: {
        user: UserData;
        status: string;
        activities: ActivityData[];
        client_status: ClientStatusData;
    }[];
    stage_instances: StageInstanceData[];
    guild_scheduled_events: GuildScheduledEventData;
}
export declare type GuildUpdateEventData = GuildData;
export declare type GuildDeleteEventData = UnavailableGuildData;
export interface GuildBanAddEventData {
    guild_id: SnowflakeData;
    user: UserData;
}
export interface GuildBanRemoveEventData {
    guild_id: SnowflakeData;
    user: UserData;
}
export interface GuildEmojisUpdateEventData {
    guild_id: SnowflakeData;
    emojis: EmojiData[];
}
export interface GuildStickersUpdateEventData {
    guild_id: SnowflakeData;
    stickers: StickerData[];
}
export interface GuildIntegrationsUpdateEventData {
    guild_id: SnowflakeData;
}
export interface GuildMemberAddEventData extends GuildMemberData {
    guild_id: SnowflakeData;
}
export interface GuildMemberRemoveEventData {
    guild_id: SnowflakeData;
    user: UserData;
}
export interface GuildMemberUpdateEventData {
    guild_id: SnowflakeData;
    roles: SnowflakeData[];
    user: UserData;
    nick?: string | null;
    avatar: string | null;
    join_at: Timestamp | null;
    premium_since?: Timestamp | null;
    deaf?: boolean;
    mute?: boolean;
    pending?: boolean;
    communication_disabled_until?: Timestamp | null;
}
export interface GuildMembersChunkEventData {
    guild_id: SnowflakeData;
    members: GuildMemberData[];
    chunk_index: number;
    chunk_count: number;
    not_found?: unknown[];
    presences?: PresenceUpdateData[];
    nonce?: string;
}
export interface GuildRoleCreateEventData {
    guild_id: SnowflakeData;
    role: RoleData;
}
export interface GuildRoleUpdateEventData {
    guild_id: SnowflakeData;
    role: RoleData;
}
export interface GuildRoleDeleteEventData {
    guild_id: SnowflakeData;
    role_id: SnowflakeData;
}
export declare type GuildScheduledEventCreateEventData = GuildScheduledEventData;
export declare type GuildScheduledEventUpdateEventData = GuildScheduledEventData;
export declare type GuildScheduledEventDeleteEventData = GuildScheduledEventData;
export interface GuildScheduledEventUserAddEventData {
    guild_scheduled_event_id: SnowflakeData;
    user_id: SnowflakeData;
    guild_id: SnowflakeData;
}
export interface GuildScheduledEventUserRemoveEventData {
    guild_scheduled_event_id: SnowflakeData;
    user_id: SnowflakeData;
    guild_id: SnowflakeData;
}
export interface IntegrationCreateEventData extends IntegrationData {
    guild_id: SnowflakeData;
}
export interface IntegrationUpdateEventData extends IntegrationData {
    guild_id: SnowflakeData;
}
export interface IntegrationDeleteEventData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    application_id?: SnowflakeData;
}
export interface InviteCreateEventData {
    channel_id: SnowflakeData;
    code: string;
    create_at: Timestamp;
    guild_id?: SnowflakeData;
    inviter?: UserData;
    max_age: number;
    max_uses: number;
    target_type?: InviteTargetType;
    target_user?: UserData;
    target_application?: {
        flags: ApplicationFlag;
        id: SnowflakeData;
    };
    temporary: boolean;
    uses: number;
}
export interface InviteDeleteEventData {
    channel_id: SnowflakeData;
    guild_id?: SnowflakeData;
    code: string;
}
export interface MessageCreateEventData extends MessageData {
    guild_id?: SnowflakeData;
    member?: GuildMemberData;
    mentions: GuildMemberMentionData[];
}
export declare type MessageUpdateEventData = MessageCreateEventData;
export interface MessageDeleteEventData {
    id: SnowflakeData;
    channel_id: SnowflakeData;
    guild_id?: SnowflakeData;
}
export interface MessageDeleteBulkEventData {
    ids: SnowflakeData[];
    channel_id: SnowflakeData;
    guild_id?: SnowflakeData;
}
export interface MessageReactionAddEventData {
    user_id: SnowflakeData;
    channel_id: SnowflakeData;
    message_id: SnowflakeData;
    guild_id?: SnowflakeData;
    member?: GuildMemberData;
    emoji: EmojiData;
}
export interface MessageReactionRemoveEventData {
    user_id: SnowflakeData;
    channel_id: SnowflakeData;
    message_id: SnowflakeData;
    guild_id?: SnowflakeData;
    emoji: EmojiData;
}
export interface MessageReactionRemoveAllEventData {
    channel_id: SnowflakeData;
    message_id: SnowflakeData;
    guild_id?: SnowflakeData;
}
export interface MessageReactionRemoveEmojiEventData {
    channel_id: SnowflakeData;
    message_id: SnowflakeData;
    guild_id?: SnowflakeData;
    emoji: EmojiData;
}
export interface PresenceUpdateEventData {
    user: UserData;
    guild_id: SnowflakeData;
    status: string;
    activities: ActivityData[];
    client_status: ClientStatusData;
}
export interface TypingStartEventData {
    channel_id: SnowflakeData;
    guild_id?: SnowflakeData;
    user_id: SnowflakeData;
    timestamp: number;
    member?: GuildMemberData;
}
export declare type UserUpdateEventData = UserData;
export declare type VoiceStateUpdateEventData = VoiceStateData;
export interface VoiceServerUpdateEventData {
    token: string;
    guild_id: SnowflakeData;
    endpoint: string | null;
}
export interface WebhookUpdateEventData {
    guild_id: SnowflakeData;
    channel_id: SnowflakeData;
}
export declare type InteractionCreateEventData = InteractionData;
export declare type StageInstanceCreateEventData = StageInstanceData;
export declare type StageInstanceUpdateEventData = StageInstanceData;
export declare type StageInstanceDeleteEventData = StageInstanceData;
export interface Event<T extends EventData> {
    remove: boolean;
    check: (data: T) => boolean;
    listen: (data: T) => Promise<void>;
}
