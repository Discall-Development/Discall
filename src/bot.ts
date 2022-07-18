import {createWS} from "./ws";
import {ApplicationCommandPermissionsUpdateEventData, ChannelCreateEventData, ChannelDeleteEventData, ChannelPinsUpdateEventData, ChannelUpdateEventData, GuildBanAddEventData, GuildBanRemoveEventData, GuildCreateEventData, GuildDeleteEventData, GuildEmojisUpdateEventData, GuildIntegrationsUpdateEventData, GuildMemberAddEventData, GuildMemberRemoveEventData, GuildMembersChunkEventData, GuildMemberUpdateEventData, GuildRoleCreateEventData, GuildRoleDeleteEventData, GuildRoleUpdateEventData, GuildScheduledEventCreateEventData, GuildScheduledEventDeleteEventData, GuildScheduledEventUpdateEventData, GuildScheduledEventUserAddEventData, GuildScheduledEventUserRemoveEventData, GuildStickersUpdateEventData, GuildUpdateEventData, IntegrationCreateEventData, IntegrationDeleteEventData, IntegrationUpdateEventData, InteractionCreateEventData, InviteCreateEventData, InviteDeleteEventData, MessageCreateEventData, MessageDeleteBulkEventData, MessageDeleteEventData, MessageReactionAddEventData, MessageReactionRemoveAllEventData, MessageReactionRemoveEmojiEventData, MessageReactionRemoveEventData, MessageUpdateEventData, PresenceUpdateEventData, ReadyEventData, ResumeEventData, SnowflakeData, StageInstanceCreateEventData, StageInstanceDeleteEventData, StageInstanceUpdateEventData, ThreadCreateEventData, ThreadDeleteEventData, ThreadListSyncEventData, ThreadMembersUpdateEventData, ThreadMemberUpdateEventData, ThreadUpdateEventData, TypingStartEventData, UserUpdateEventData, VoiceStateUpdateEventData, WebhookUpdateEventData, WSOptions} from "./dataType";
import {createClient} from "./https";
import {packEvent} from "./event";
import { setupHandler } from "./command";

let anyPromise = async (...params: any) => new Promise(() => {});
let Global = {
    getMember: anyPromise,
    setPresence: anyPromise,
    setVoiceState: anyPromise,
};

export function createBot(
    token: string,
    data: { intents: number, prefix?: string },
    options?: WSOptions
) {
    let obj: any;
    if (options && options.version)
        obj = createWS(token, data.intents, options.version || 10);
    else
        obj = createWS(token, data.intents);

    let send = createClient(token);
    setupHandler(data.prefix, options && options.commandTimeout, send);

    Global = obj.gateway_commands;
    return send;
}

export function onReady(cb: (data: ReadyEventData) => Promise<any>) {
    packEvent("ready")(cb);
}

export function onResumed(cb: (data: ResumeEventData) => Promise<any>) {
    packEvent("resumed")(cb);
}

export function onApplicationCommandPermissionsUpdate(
    cb: (data: ApplicationCommandPermissionsUpdateEventData) => Promise<any>
) {
    packEvent("application_command_permissions_update")(cb);
}

export function onChannelCreate(cb: (data: ChannelCreateEventData) => Promise<any>) {
    packEvent("channel_create")(cb);
}

export function onChannelUpdate(cb: (data: ChannelUpdateEventData) => Promise<any>) {
    packEvent("channel_update")(cb);
}

export function onChannelDelete(cb: (data: ChannelDeleteEventData) => Promise<any>) {
    packEvent("channel_delete")(cb);
}

export function onChannelPinsUpdate(cb: (data: ChannelPinsUpdateEventData) => Promise<any>) {
    packEvent("channel_pins_update")(cb);
}

export function onThreadCreate(cb: (data: ThreadCreateEventData) => Promise<any>) {
    packEvent("thread_create")(cb);
}

export function onThreadUpdate(cb: (data: ThreadUpdateEventData) => Promise<any>) {
    packEvent("thread_update")(cb);
}

export function onThreadDelete(cb: (data: ThreadDeleteEventData) => Promise<any>) {
    packEvent("thread_delete")(cb);
}

export function onThreadListSync(cb: (data: ThreadListSyncEventData) => Promise<any>) {
    packEvent("thread_list_sync")(cb);
}

export function onThreadMemberUpdate(cb: (data: ThreadMemberUpdateEventData) => Promise<any>) {
    packEvent("thread_member_update")(cb);
}

export function onThreadMembersUpdate(cb: (data: ThreadMembersUpdateEventData) => Promise<any>) {
    packEvent("thread_members_update")(cb);
}

export function onGuildCreate(cb: (data: GuildCreateEventData) => Promise<any>) {
    packEvent("guild_create")(cb);
}

export function onGuildUpdate(cb: (data: GuildUpdateEventData) => Promise<any>) {
    packEvent("guild_update")(cb);
}

export function onGuildDelete(cb: (data: GuildDeleteEventData) => Promise<any>) {
    packEvent("guild_delete")(cb);
}

export function onGuildBanAdd(cb: (data: GuildBanAddEventData) => Promise<any>) {
    packEvent("guild_ban_add")(cb);
}

export function onGuildBanRemove(cb: (data: GuildBanRemoveEventData) => Promise<any>) {
    packEvent("guild_ban_remove")(cb);
}

export function onGuildEmojisUpdate(cb: (data: GuildEmojisUpdateEventData) => Promise<any>) {
    packEvent("guild_emojis_update")(cb);
}

export function onGuildStickersUpdate(cb: (data: GuildStickersUpdateEventData) => Promise<any>) {
    packEvent("guild_stickers_update")(cb);
}

export function onGuildIntegrationsUpdate(cb: (data: GuildIntegrationsUpdateEventData) => Promise<any>) {
    packEvent("guild_integrations_update")(cb);
}

export function onGuildMemberAdd(cb: (data: GuildMemberAddEventData) => Promise<any>) {
    packEvent("guild_member_add")(cb);
}

export function onGuildMemberRemove(cb: (data: GuildMemberRemoveEventData) => Promise<any>) {
    packEvent("guild_member_remove")(cb);
}

export function onGuildMemberUpdate(cb: (data: GuildMemberUpdateEventData) => Promise<any>) {
    packEvent("guild_member_update")(cb);
}

export function onGuildMemberChunk(cb: (data: GuildMembersChunkEventData) => Promise<any>) {
    packEvent("guild_member_chunk")(cb);
}

export function onGuildRoleCreate(cb: (data: GuildRoleCreateEventData) => Promise<any>) {
    packEvent("guild_role_create")(cb);
}

export function onGuildRoleUpdate(cb: (data: GuildRoleUpdateEventData) => Promise<any>) {
    packEvent("guild_role_update")(cb);
}

export function onGuildRoleDelete(cb: (data: GuildRoleDeleteEventData) => Promise<any>) {
    packEvent("guild_role_delete")(cb);
}

export function onGuildScheduledEventCreate(
    cb: (data: GuildScheduledEventCreateEventData) => Promise<any>
) {
    packEvent("guild_scheduled_event_create")(cb);
}

export function onGuildScheduledEventUpdate(
    cb: (data: GuildScheduledEventUpdateEventData) => Promise<any>
) {
    packEvent("guild_scheduled_event_update")(cb);
}

export function onGuildScheduledEventDelete(
    cb: (data: GuildScheduledEventDeleteEventData) => Promise<any>
) {
    packEvent("guild_scheduled_event_delete")(cb);
}

export function onGuildScheduledEventUserAdd(
    cb: (data: GuildScheduledEventUserAddEventData) => Promise<any>
) {
    packEvent("guild_scheduled_event_user_add")(cb);
}

export function onGuildScheduledEventUserRemove(
    cb: (data: GuildScheduledEventUserRemoveEventData) => Promise<any>
) {
    packEvent("guild_scheduled_event_user_remove")(cb);
}

export function onIntegrationCreate(cb: (data: IntegrationCreateEventData) => Promise<any>) {
    packEvent("integration_create")(cb);
}

export function onIntegrationUpdate(cb: (data: IntegrationUpdateEventData) => Promise<any>) {
    packEvent("integration_update")(cb);
}

export function onIntegrationDelete(cb: (data: IntegrationDeleteEventData) => Promise<any>) {
    packEvent("integration_delete")(cb);
}

export function onInteractionCreate(cb: (data: InteractionCreateEventData) => Promise<any>) {
    packEvent("interaction_create")(cb);
}

export function onInviteCreate(cb: (data: InviteCreateEventData) => Promise<any>) {
    packEvent("invite_create")(cb);
}

export function onInviteDelete(cb: (data: InviteDeleteEventData) => Promise<any>) {
    packEvent("invite_delete")(cb);
}

export function onMessageCreate(cb: (data: MessageCreateEventData) => Promise<any>) {
    packEvent("message_create")(cb);
}

export function onMessageUpdate(cb: (data: MessageUpdateEventData) => Promise<any>) {
    packEvent("message_update")(cb);
}

export function onMessageDelete(cb: (data: MessageDeleteEventData) => Promise<any>) {
    packEvent("message_delete")(cb);
}

export function onMessageDeleteBulk(cb: (data: MessageDeleteBulkEventData) => Promise<any>) {
    packEvent("message_delete_bulk")(cb);
}

export function onMessageReactionAdd(cb: (data: MessageReactionAddEventData) => Promise<any>) {
    packEvent("message_reaction_add")(cb);
}

export function onMessageReactionRemove(cb: (data: MessageReactionRemoveEventData) => Promise<any>) {
    packEvent("message_reaction_remove")(cb);
}

export function onMessageReactionRemoveAll(cb: (data: MessageReactionRemoveAllEventData) => Promise<any>) {
    packEvent("message_reaction_remove_all")(cb);
}

export function onMessageReactionRemoveEmoji(
    cb: (data: MessageReactionRemoveEmojiEventData) => Promise<any>
) {
    packEvent("message_reaction_remove_emoji")(cb);
}

export function onPresenceUpdate(cb: (data: PresenceUpdateEventData) => Promise<any>) {
    packEvent("presence_update")(cb);
}

export function onStageInstanceCreate(cb: (data: StageInstanceCreateEventData) => Promise<any>) {
    packEvent("stage_instance_create")(cb);
}

export function onStageInstanceDelete(cb: (data: StageInstanceDeleteEventData) => Promise<any>) {
    packEvent("stage_instance_delete")(cb);
}

export function onStageInstanceUpdate(cb: (data: StageInstanceUpdateEventData) => Promise<any>) {
    packEvent("stage_instance_update")(cb);
}

export function onTypingStart(cb: (data: TypingStartEventData) => Promise<any>) {
    packEvent("typing_start")(cb);
}

export function onUserUpdate(cb: (data: UserUpdateEventData) => Promise<any>) {
    packEvent("user_update")(cb);
}

export function onVoiceStateUpdate(cb: (data: VoiceStateUpdateEventData) => Promise<any>) {
    packEvent("voice_state_update")(cb);
}

export function onWebhookUpdate(cb: (data: WebhookUpdateEventData) => Promise<any>) {
    packEvent("webhooks_update")(cb);
}

export async function connectChannel(
    guild_id: SnowflakeData,
    channel_id: SnowflakeData,
    mute: boolean,
    deaf: boolean
) {
    await Global.setVoiceState(guild_id, channel_id, mute, deaf);
}

export async function disconnectChannel(guild_id: SnowflakeData) {
    await Global.setVoiceState(guild_id, null, false, false);
}

export function onCommand(name: string, run: (...params: any[]) => any) {
    return async function(options: {
        param_split?: string;
    }) {

    };
}