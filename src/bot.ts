import {createWS} from "./ws";
import {SnowflakeData, WSOptions} from "./dataType";
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
    data: { intents: number; prefix: string },
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

export function onReady(cb: (...item: any) => Promise<any>) {
    packEvent("ready")(cb);
}

export function onResumed(cb: (...item: any) => Promise<any>) {
    packEvent("resumed")(cb);
}

export function onApplicationCommandPermissionsUpdate(
    cb: (...item: any) => Promise<any>
) {
    packEvent("application_command_permissions_update")(cb);
}

export function onChannelCreate(cb: (...item: any) => Promise<any>) {
    packEvent("channel_create")(cb);
}

export function onChannelUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("channel_update")(cb);
}

export function onChannelDelete(cb: (...item: any) => Promise<any>) {
    packEvent("channel_delete")(cb);
}

export function onChannelPinsUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("channel_pins_update")(cb);
}

export function onThreadCreate(cb: (...item: any) => Promise<any>) {
    packEvent("thread_create")(cb);
}

export function onThreadUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("thread_update")(cb);
}

export function onThreadDelete(cb: (...item: any) => Promise<any>) {
    packEvent("thread_delete")(cb);
}

export function onThreadListSync(cb: (...item: any) => Promise<any>) {
    packEvent("thread_list_sync")(cb);
}

export function onThreadMemberUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("thread_member_update")(cb);
}

export function onThreadMembersUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("thread_members_update")(cb);
}

export function onGuildCreate(cb: (...item: any) => Promise<any>) {
    packEvent("guild_create")(cb);
}

export function onGuildUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("guild_update")(cb);
}

export function onGuildDelete(cb: (...item: any) => Promise<any>) {
    packEvent("guild_delete")(cb);
}

export function onGuildBanAdd(cb: (...item: any) => Promise<any>) {
    packEvent("guild_ban_add")(cb);
}

export function onGuildBanRemove(cb: (...item: any) => Promise<any>) {
    packEvent("guild_ban_remove")(cb);
}

export function onGuildEmojisUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("guild_emojis_update")(cb);
}

export function onGuildStickersUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("guild_stickers_update")(cb);
}

export function onGuildIntegrationsUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("guild_integrations_update")(cb);
}

export function onGuildMemberAdd(cb: (...item: any) => Promise<any>) {
    packEvent("guild_member_add")(cb);
}

export function onGuildMemberRemove(cb: (...item: any) => Promise<any>) {
    packEvent("guild_member_remove")(cb);
}

export function onGuildMemberUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("guild_member_update")(cb);
}

export function onGuildMemberChunk(cb: (...item: any) => Promise<any>) {
    packEvent("guild_member_chunk")(cb);
}

export function onGuildRoleCreate(cb: (...item: any) => Promise<any>) {
    packEvent("guild_role_create")(cb);
}

export function onGuildRoleUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("guild_role_update")(cb);
}

export function onGuildRoleDelete(cb: (...item: any) => Promise<any>) {
    packEvent("guild_role_delete")(cb);
}

export function onGuildScheduledEventCreate(
    cb: (...item: any) => Promise<any>
) {
    packEvent("guild_scheduled_event_create")(cb);
}

export function onGuildScheduledEventUpdate(
    cb: (...item: any) => Promise<any>
) {
    packEvent("guild_scheduled_event_update")(cb);
}

export function onGuildScheduledEventDelete(
    cb: (...item: any) => Promise<any>
) {
    packEvent("guild_scheduled_event_delete")(cb);
}

export function onGuildScheduledEventUserAdd(
    cb: (...item: any) => Promise<any>
) {
    packEvent("guild_scheduled_event_user_add")(cb);
}

export function onGuildScheduledEventUserRemove(
    cb: (...item: any) => Promise<any>
) {
    packEvent("guild_scheduled_event_user_remove")(cb);
}

export function onIntegrationCreate(cb: (...item: any) => Promise<any>) {
    packEvent("integration_create")(cb);
}

export function onIntegrationUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("integration_update")(cb);
}

export function onIntegrationDelete(cb: (...item: any) => Promise<any>) {
    packEvent("integration_delete")(cb);
}

export function onInteractionCreate(cb: (...item: any) => Promise<any>) {
    packEvent("interaction_create")(cb);
}

export function onInviteCreate(cb: (...item: any) => Promise<any>) {
    packEvent("invite_create")(cb);
}

export function onInviteDelete(cb: (...item: any) => Promise<any>) {
    packEvent("invite_delete")(cb);
}

export function onMessageCreate(cb: (...item: any) => Promise<any>) {
    packEvent("message_create")(cb);
}

export function onMessageUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("message_update")(cb);
}

export function onMessageDelete(cb: (...item: any) => Promise<any>) {
    packEvent("message_delete")(cb);
}

export function onMessageDeleteBulk(cb: (...item: any) => Promise<any>) {
    packEvent("message_delete_bulk")(cb);
}

export function onMessageReactionAdd(cb: (...item: any) => Promise<any>) {
    packEvent("message_reaction_add")(cb);
}

export function onMessageReactionRemove(cb: (...item: any) => Promise<any>) {
    packEvent("message_reaction_remove")(cb);
}

export function onMessageReactionRemoveAll(cb: (...item: any) => Promise<any>) {
    packEvent("message_reaction_remove_all")(cb);
}

export function onMessageReactionRemoveEmoji(
    cb: (...item: any) => Promise<any>
) {
    packEvent("message_reaction_remove_emoji")(cb);
}

export function onPresenceUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("presence_update")(cb);
}

export function onStageInstanceCreate(cb: (...item: any) => Promise<any>) {
    packEvent("stage_instance_create")(cb);
}

export function onStageInstanceDelete(cb: (...item: any) => Promise<any>) {
    packEvent("stage_instance_delete")(cb);
}

export function onStageInstanceUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("stage_instance_update")(cb);
}

export function onTypingStart(cb: (...item: any) => Promise<any>) {
    packEvent("typing_start")(cb);
}

export function onUserUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("user_update")(cb);
}

export function onVoiceStateUpdate(cb: (...item: any) => Promise<any>) {
    packEvent("voice_state_update")(cb);
}

export function onWebhookUpdate(cb: (...item: any) => Promise<any>) {
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