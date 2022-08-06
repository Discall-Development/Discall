import { ApplicationFlag, ApplicationCommandPermissionsData } from "./application";
import { ChannelData, ChannelTypes, ThreadMemberData } from "./channel";
import { GuildData, GuildMemberData, GuildMemberMentionData, GuildScheduledEventData, IntegrationData, InviteTargetType, RoleData, UnavailableGuildData } from "./guild";
import { InteractionData } from "./interaction";
import { EmojiData, StickerData, MessageData } from "./message";
import { SnowflakeData } from "./snowflake";
import { Timestamp } from "./timestamp";
import { UserData, ActivityData, ClientStatusData, PresenceUpdateData } from "./user";
import { StageInstanceData, VoiceStateData } from "./voice";

export type EventData = 
    ReadyEventData |
    ResumedEventData |
    ApplicationCommandPermissionsUpdateEventData |
    ChannelCreateEventData |
    ChannelUpdateEventData |
    ChannelDeleteEventData |
    ThreadCreateEventData |
    ThreadUpdateEventData |
    ThreadDeleteEventData |
    ThreadListSyncEventData |
    ThreadMemberUpdateEventData |
    ThreadMembersUpdateEventData |
    ChannelPinsUpdateEventData |
    GuildCreateEventData |
    GuildUpdateEventData |
    GuildDeleteEventData |
    GuildBanAddEventData |
    GuildBanRemoveEventData |
    GuildEmojisUpdateEventData |
    GuildStickersUpdateEventData |
    GuildIntegrationsUpdateEventData |
    GuildMemberAddEventData |
    GuildMemberRemoveEventData |
    GuildMemberUpdateEventData |
    GuildMembersChunkEventData |
    GuildRoleCreateEventData |
    GuildRoleUpdateEventData |
    GuildRoleDeleteEventData |
    GuildScheduledEventCreateEventData |
    GuildScheduledEventUpdateEventData |
    GuildScheduledEventDeleteEventData |
    GuildScheduledEventUserAddEventData |
    GuildScheduledEventUserRemoveEventData |
    IntegrationCreateEventData |
    IntegrationUpdateEventData |
    IntegrationDeleteEventData |
    InviteCreateEventData |
    InviteDeleteEventData |
    MessageCreateEventData |
    MessageUpdateEventData |
    MessageDeleteEventData |
    MessageDeleteBulkEventData |
    MessageReactionAddEventData |
    MessageReactionRemoveEventData |
    MessageReactionRemoveAllEventData |
    MessageReactionRemoveEmojiEventData |
    PresenceUpdateEventData |
    TypingStartEventData |
    UserUpdateEventData |
    VoiceStateUpdateEventData |
    VoiceServerUpdateEventData |
    WebhookUpdateEventData |
    InteractionCreateEventData |
    StageInstanceCreateEventData |
    StageInstanceUpdateEventData |
    StageInstanceDeleteEventData;

export enum EventName {
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
    ready = Ready,
    application_command_permissions_update = ApplicationCommandPermissionsUpdate,
    channel_create = ChannelCreate,
    channel_update = ChannelUpdate,
    channel_delete = ChannelDelete,
    thread_create = ThreadCreate,
    thread_update = ThreadUpdate,
    thread_delete = ThreadDelete,
    thread_list_sync = ThreadListSync,
    thread_member_update = ThreadMemberUpdate,
    thread_members_update = ThreadMembersUpdate,
    channel_pins_update = ChannelPinsUpdate,
    guild_create = GuildCreate,
    guild_update = GuildUpdate,
    guild_delete = GuildDelete,
    guild_ban_add = GuildBanAdd,
    guild_ban_remove = GuildBanRemove,
    guild_emojis_update = GuildEmojisUpdate,
    guild_stickers_update = GuildStickersUpdate,
    guild_integrations_update = GuildIntegrationsUpdate,
    guild_member_add = GuildMemberAdd,
    guild_member_remove = GuildMemberRemove,
    guild_member_update = GuildMemberUpdate,
    guild_members_chunk = GuildMembersChunk,
    guild_role_create = GuildRoleCreate,
    guild_role_update = GuildRoleUpdate,
    guild_role_delete = GuildRoleDelete,
    guild_scheduled_event_create = GuildScheduledEventCreate,
    guild_scheduled_event_update = GuildScheduledEventUpdate,
    guild_scheduled_event_delete = GuildScheduledEventDelete,
    guild_scheduled_event_user_add = GuildScheduledEventUserAdd,
    guild_scheduled_event_user_remove = GuildScheduledEventUserRemove,
    integration_create = IntegrationCreate,
    integration_update = IntegrationUpdate,
    integration_delete = IntegrationDelete,
    invite_create = InviteCreate,
    invite_delete = InviteDelete,
    message_create = MessageCreate,
    message_update = MessageUpdate,
    message_delete = MessageDelete,
    message_delete_bulk = MessageDeleteBulk,
    message_reaction_add = MessageReactionAdd,
    message_reaction_remove = MessageReactionRemove,
    message_reaction_remove_all = MessageReactionRemoveAll,
    message_reaction_remove_emoji = MessageReactionRemoveEmoji,
    presence_update = PresenceUpdate,
    typing_start = TypingStart,
    user_update = UserUpdate,
    voice_state_update = VoiceStateUpdate,
    voice_server_update = VoiceServerUpdate,
    webhook_update = WebhookUpdate,
    interaction_create = InteractionCreate,
    stage_instance_create = StageInstanceCreate,
    stage_instance_update = StageInstanceUpdate,
    stage_instance_delete = StageInstanceDelete
}

export interface ReadyEventData {
    v: number;
    user: UserData;
    guilds: UnavailableGuildData[];
    session_id: string;
    shard?: [number, number];
    application: {
        flags: ApplicationFlag;
        id: SnowflakeData
    };
}

export interface ResumedEventData {}

export interface ApplicationCommandPermissionsUpdateEventData {
    id: SnowflakeData;
    application_id: SnowflakeData;
    guild_id: SnowflakeData;
    permissions: ApplicationCommandPermissionsData[];
}

export interface ChannelCreateEventData extends ChannelData {
}

export interface ChannelUpdateEventData extends ChannelData {
}

export interface ChannelDeleteEventData extends ChannelData {
}

export interface ThreadCreateEventData extends ChannelData {
    newly_created?: boolean;
    thread_member?: ThreadMemberData;
}

export interface ThreadUpdateEventData extends ChannelData {
}

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

export interface GuildUpdateEventData extends GuildData {
}

export interface GuildDeleteEventData extends UnavailableGuildData {
}

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
    not_found?: any[];
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

export interface GuildScheduledEventCreateEventData extends GuildScheduledEventData {
}

export interface GuildScheduledEventUpdateEventData extends GuildScheduledEventData {
}

export interface GuildScheduledEventDeleteEventData extends GuildScheduledEventData {
}

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
        id: SnowflakeData
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

export interface MessageUpdateEventData extends MessageCreateEventData {
}

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

export interface UserUpdateEventData extends UserData {
}

export interface VoiceStateUpdateEventData extends VoiceStateData {
}

export interface VoiceServerUpdateEventData {
    token: string;
    guild_id: SnowflakeData;
    endpoint: string | null;
}

export interface WebhookUpdateEventData {
    guild_id: SnowflakeData;
    channel_id: SnowflakeData;
}

export interface InteractionCreateEventData extends InteractionData {
}

export interface StageInstanceCreateEventData extends StageInstanceData {
}

export interface StageInstanceUpdateEventData extends StageInstanceData {
}

export interface StageInstanceDeleteEventData extends StageInstanceData {
}

type UnionToObject<T extends string> = { [k in T]: UnionToObject<Exclude<T, k>> };
type ObjectToTuple<T extends {}> = {} extends T ? [] : { [k in keyof T]: [k, ...ObjectToTuple<T[k]>]; }[keyof T];
export type UnionToArray<T extends string> = ObjectToTuple<UnionToObject<T>>;

export interface Event<T extends EventData> {
    remove: boolean;
    check: (data: T) => boolean;
    listen: (data: T) => Promise<void>;
}