import {createWS} from "./ws";
import {SnowflakeData, WSOptions} from "./dataType";

let anyCall = (cb: () => Promise<any>) => () => cb;
let anyPromise = async (...params: any) => new Promise<any>(() => {
});
let Global = {
    ready: anyCall,
    resumed: anyCall,
    application_command_permissions_update: anyCall,
    channel_create: anyCall,
    channel_update: anyCall,
    channel_delete: anyCall,
    channel_pins_update: anyCall,
    thread_create: anyCall,
    thread_update: anyCall,
    thread_delete: anyCall,
    thread_list_sync: anyCall,
    thread_member_update: anyCall,
    thread_members_update: anyCall,
    guild_create: anyCall,
    guild_update: anyCall,
    guild_delete: anyCall,
    guild_ban_add: anyCall,
    guild_ban_remove: anyCall,
    guild_emojis_update: anyCall,
    guild_stickers_update: anyCall,
    guild_integrations_update: anyCall,
    guild_member_add: anyCall,
    guild_member_remove: anyCall,
    guild_member_update: anyCall,
    guild_member_chunk: anyCall,
    guild_role_create: anyCall,
    guild_role_update: anyCall,
    guild_role_delete: anyCall,
    guild_scheduled_event_create: anyCall,
    guild_scheduled_event_update: anyCall,
    guild_scheduled_event_delete: anyCall,
    guild_scheduled_event_user_add: anyCall,
    guild_scheduled_event_user_remove: anyCall,
    integration_create: anyCall,
    integration_update: anyCall,
    integration_delete: anyCall,
    interaction_create: anyCall,
    invite_create: anyCall,
    invite_delete: anyCall,
    message_create: anyCall,
    message_update: anyCall,
    message_delete: anyCall,
    message_delete_bulk: anyCall,
    message_reaction_add: anyCall,
    message_reaction_remove: anyCall,
    message_reaction_remove_all: anyCall,
    message_reaction_remove_emoji: anyCall,
    presence_update: anyCall,
    stage_instance_create: anyCall,
    stage_instance_delete: anyCall,
    stage_instance_update: anyCall,
    typing_start: anyCall,
    user_update: anyCall,
    voice_state_update: anyCall,
    voice_server_update: anyCall,
    webhooks_update: anyCall,
    getMember: anyPromise,
    setPresence: anyPromise,
    setVoiceState: anyPromise,
};

export function createBot(
    token: string,
    data: { intents: number; prefix: string },
    options?: WSOptions
): void {
    let obj = createWS(token, data.intents, 9);
    Global = {...obj.events, ...obj.gateway_commands};
}

export function onReady(cb: (...item: any) => Promise<any>) {
    Global.ready(cb);
}

export function onResumed(cb: (...item: any) => Promise<any>) {
    Global.resumed(cb);
}

export function onApplicationCommandPermissionsUpdate(
    cb: (...item: any) => Promise<any>
) {
    Global.application_command_permissions_update(cb);
}

export function onChannelCreate(cb: (...item: any) => Promise<any>) {
    Global.channel_create(cb);
}

export function onChannelUpdate(cb: (...item: any) => Promise<any>) {
    Global.channel_update(cb);
}

export function onChannelDelete(cb: (...item: any) => Promise<any>) {
    Global.channel_delete(cb);
}

export function onChannelPinsUpdate(cb: (...item: any) => Promise<any>) {
    Global.channel_pins_update(cb);
}

export function onThreadCreate(cb: (...item: any) => Promise<any>) {
    Global.thread_create(cb);
}

export function onThreadUpdate(cb: (...item: any) => Promise<any>) {
    Global.thread_update(cb);
}

export function onThreadDelete(cb: (...item: any) => Promise<any>) {
    Global.thread_delete(cb);
}

export function onThreadListSync(cb: (...item: any) => Promise<any>) {
    Global.thread_list_sync(cb);
}

export function onThreadMemberUpdate(cb: (...item: any) => Promise<any>) {
    Global.thread_member_update(cb);
}

export function onThreadMembersUpdate(cb: (...item: any) => Promise<any>) {
    Global.thread_members_update(cb);
}

export function onGuildCreate(cb: (...item: any) => Promise<any>) {
    Global.guild_create(cb);
}

export function onGuildUpdate(cb: (...item: any) => Promise<any>) {
    Global.guild_update(cb);
}

export function onGuildDelete(cb: (...item: any) => Promise<any>) {
    Global.guild_delete(cb);
}

export function onGuildBanAdd(cb: (...item: any) => Promise<any>) {
    Global.guild_ban_add(cb);
}

export function onGuildBanRemove(cb: (...item: any) => Promise<any>) {
    Global.guild_ban_remove(cb);
}

export function onGuildEmojisUpdate(cb: (...item: any) => Promise<any>) {
    Global.guild_emojis_update(cb);
}

export function onGuildStickersUpdate(cb: (...item: any) => Promise<any>) {
    Global.guild_stickers_update(cb);
}

export function onGuildIntegrationsUpdate(cb: (...item: any) => Promise<any>) {
    Global.guild_integrations_update(cb);
}

export function onGuildMemberAdd(cb: (...item: any) => Promise<any>) {
    Global.guild_member_add(cb);
}

export function onGuildMemberRemove(cb: (...item: any) => Promise<any>) {
    Global.guild_member_remove(cb);
}

export function onGuildMemberUpdate(cb: (...item: any) => Promise<any>) {
    Global.guild_member_update(cb);
}

export function onGuildMemberChunk(cb: (...item: any) => Promise<any>) {
    Global.guild_member_chunk(cb);
}

export function onGuildRoleCreate(cb: (...item: any) => Promise<any>) {
    Global.guild_role_create(cb);
}

export function onGuildRoleUpdate(cb: (...item: any) => Promise<any>) {
    Global.guild_role_update(cb);
}

export function onGuildRoleDelete(cb: (...item: any) => Promise<any>) {
    Global.guild_role_delete(cb);
}

export function onGuildScheduledEventCreate(
    cb: (...item: any) => Promise<any>
) {
    Global.guild_scheduled_event_create(cb);
}

export function onGuildScheduledEventUpdate(
    cb: (...item: any) => Promise<any>
) {
    Global.guild_scheduled_event_update(cb);
}

export function onGuildScheduledEventDelete(
    cb: (...item: any) => Promise<any>
) {
    Global.guild_scheduled_event_delete(cb);
}

export function onGuildScheduledEventUserAdd(
    cb: (...item: any) => Promise<any>
) {
    Global.guild_scheduled_event_user_add(cb);
}

export function onGuildScheduledEventUserRemove(
    cb: (...item: any) => Promise<any>
) {
    Global.guild_scheduled_event_user_remove(cb);
}

export function onIntegrationCreate(cb: (...item: any) => Promise<any>) {
    Global.integration_create(cb);
}

export function onIntegrationUpdate(cb: (...item: any) => Promise<any>) {
    Global.integration_update(cb);
}

export function onIntegrationDelete(cb: (...item: any) => Promise<any>) {
    Global.integration_delete(cb);
}

export function onInteractionCreate(cb: (...item: any) => Promise<any>) {
    Global.interaction_create(cb);
}

export function onInviteCreate(cb: (...item: any) => Promise<any>) {
    Global.invite_create(cb);
}

export function onInviteDelete(cb: (...item: any) => Promise<any>) {
    Global.invite_delete(cb);
}

export function onMessageCreate(cb: (...item: any) => Promise<any>) {
    Global.message_create(cb);
}

export function onMessageUpdate(cb: (...item: any) => Promise<any>) {
    Global.message_update(cb);
}

export function onMessageDelete(cb: (...item: any) => Promise<any>) {
    Global.message_delete(cb);
}

export function onMessageDeleteBulk(cb: (...item: any) => Promise<any>) {
    Global.message_delete_bulk(cb);
}

export function onMessageReactionAdd(cb: (...item: any) => Promise<any>) {
    Global.message_reaction_add(cb);
}

export function onMessageReactionRemove(cb: (...item: any) => Promise<any>) {
    Global.message_reaction_remove(cb);
}

export function onMessageReactionRemoveAll(cb: (...item: any) => Promise<any>) {
    Global.message_reaction_remove_all(cb);
}

export function onMessageReactionRemoveEmoji(
    cb: (...item: any) => Promise<any>
) {
    Global.message_reaction_remove_emoji(cb);
}

export function onPresenceUpdate(cb: (...item: any) => Promise<any>) {
    Global.presence_update(cb);
}

export function onStageInstanceCreate(cb: (...item: any) => Promise<any>) {
    Global.stage_instance_create(cb);
}

export function onStageInstanceDelete(cb: (...item: any) => Promise<any>) {
    Global.stage_instance_delete(cb);
}

export function onStageInstanceUpdate(cb: (...item: any) => Promise<any>) {
    Global.stage_instance_update(cb);
}

export function onTypingStart(cb: (...item: any) => Promise<any>) {
    Global.typing_start(cb);
}

export function onUserUpdate(cb: (...item: any) => Promise<any>) {
    Global.user_update(cb);
}

export function onVoiceStateUpdate(cb: (...item: any) => Promise<any>) {
    Global.voice_state_update(cb);
}

export function onVoiceServerUpdate(cb: (...item: any) => Promise<any>) {
    Global.voice_server_update(cb);
}

export function onWebhookUpdate(cb: (...item: any) => Promise<any>) {
    Global.webhooks_update(cb);
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
