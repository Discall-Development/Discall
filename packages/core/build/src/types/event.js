"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventName = void 0;
var EventName;
(function (EventName) {
    EventName["Ready"] = "READY";
    EventName["ApplicationCommandPermissionsUpdate"] = "APPLICATION_COMMAND_PERMISSIONS_UPDATE";
    EventName["ChannelCreate"] = "CHANNEL_CREATE";
    EventName["ChannelUpdate"] = "CHANNEL_UPDATE";
    EventName["ChannelDelete"] = "CHANNEL_DELETE";
    EventName["ThreadCreate"] = "THREAD_CREATE";
    EventName["ThreadUpdate"] = "THREAD_UPDATE";
    EventName["ThreadDelete"] = "THREAD_DELETE";
    EventName["ThreadListSync"] = "THREAD_LIST_SYNC";
    EventName["ThreadMemberUpdate"] = "THREAD_MEMBER_UPDATE";
    EventName["ThreadMembersUpdate"] = "THREAD_MEMBERS_UPDATE";
    EventName["ChannelPinsUpdate"] = "CHANNEL_PINS_UPDATE";
    EventName["GuildCreate"] = "GUILD_CREATE";
    EventName["GuildUpdate"] = "GUILD_UPDATE";
    EventName["GuildDelete"] = "GUILD_DELETE";
    EventName["GuildBanAdd"] = "GUILD_BAN_ADD";
    EventName["GuildBanRemove"] = "GUILD_BAN_REMOVE";
    EventName["GuildEmojisUpdate"] = "GUILD_EMOJIS_UPDATE";
    EventName["GuildStickersUpdate"] = "GUILD_STICKERS_UPDATE";
    EventName["GuildIntegrationsUpdate"] = "GUILD_INTEGRATIONS_UPDATE";
    EventName["GuildMemberAdd"] = "GUILD_MEMBER_ADD";
    EventName["GuildMemberRemove"] = "GUILD_MEMBER_REMOVE";
    EventName["GuildMemberUpdate"] = "GUILD_MEMBER_UPDATE";
    EventName["GuildMembersChunk"] = "GUILDMEMBERSCHUNK";
    EventName["GuildRoleCreate"] = "GUILD_ROLE_CREATE";
    EventName["GuildRoleUpdate"] = "GUILD_ROLE_UPDATE";
    EventName["GuildRoleDelete"] = "GUILD_ROLE_DELETE";
    EventName["GuildScheduledEventCreate"] = "GUILD_SCHEDULED_EVENT_CREATE";
    EventName["GuildScheduledEventUpdate"] = "GUILD_SCHEDULED_EVENT_UPDATE";
    EventName["GuildScheduledEventDelete"] = "GUILD_SCHEDULED_EVENT_DELETE";
    EventName["GuildScheduledEventUserAdd"] = "GUILD_SCHEDULED_EVENT_USER_ADD";
    EventName["GuildScheduledEventUserRemove"] = "GUILD_SCHEDULED_EVENT_USER_REMOVE";
    EventName["IntegrationCreate"] = "INTEGRATION_CREATE";
    EventName["IntegrationUpdate"] = "INTEGRATION_UPDATE";
    EventName["IntegrationDelete"] = "INTEGRATION_DELETE";
    EventName["InviteCreate"] = "INVITE_CREATE";
    EventName["InviteDelete"] = "INVITE_DELETE";
    EventName["MessageCreate"] = "MESSAGE_CREATE";
    EventName["MessageUpdate"] = "MESSAGE_UPDATE";
    EventName["MessageDelete"] = "MESSAGE_DELETE";
    EventName["MessageDeleteBulk"] = "MESSAGE_DELETE_BULK";
    EventName["MessageReactionAdd"] = "MESSAGE_REACTION_ADD";
    EventName["MessageReactionRemove"] = "MESSAGE_REACTION_REMOVE";
    EventName["MessageReactionRemoveAll"] = "MESSAGE_REACTION_REMOVE_ALL";
    EventName["MessageReactionRemoveEmoji"] = "MESSAGE_REACTION_REMOVE_EMOJI";
    EventName["PresenceUpdate"] = "PRESENCE_UPDATE";
    EventName["TypingStart"] = "TYPING_START";
    EventName["UserUpdate"] = "USER_UPDATE";
    EventName["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
    EventName["VoiceServerUpdate"] = "VOICE_SERVER_UPDATE";
    EventName["WebhookUpdate"] = "WEBHOOK_UPDATE";
    EventName["InteractionCreate"] = "INTERACTION_CREATE";
    EventName["StageInstanceCreate"] = "STAGE_INSTANCE_CREATE";
    EventName["StageInstanceUpdate"] = "STAGE_INSTANCE_UPDATE";
    EventName["StageInstanceDelete"] = "STAGE_INSTANCE_DELETE";
    EventName["ready"] = "READY";
    EventName["application_command_permissions_update"] = "APPLICATION_COMMAND_PERMISSIONS_UPDATE";
    EventName["channel_create"] = "CHANNEL_CREATE";
    EventName["channel_update"] = "CHANNEL_UPDATE";
    EventName["channel_delete"] = "CHANNEL_DELETE";
    EventName["thread_create"] = "THREAD_CREATE";
    EventName["thread_update"] = "THREAD_UPDATE";
    EventName["thread_delete"] = "THREAD_DELETE";
    EventName["thread_list_sync"] = "THREAD_LIST_SYNC";
    EventName["thread_member_update"] = "THREAD_MEMBER_UPDATE";
    EventName["thread_members_update"] = "THREAD_MEMBERS_UPDATE";
    EventName["channel_pins_update"] = "CHANNEL_PINS_UPDATE";
    EventName["guild_create"] = "GUILD_CREATE";
    EventName["guild_update"] = "GUILD_UPDATE";
    EventName["guild_delete"] = "GUILD_DELETE";
    EventName["guild_ban_add"] = "GUILD_BAN_ADD";
    EventName["guild_ban_remove"] = "GUILD_BAN_REMOVE";
    EventName["guild_emojis_update"] = "GUILD_EMOJIS_UPDATE";
    EventName["guild_stickers_update"] = "GUILD_STICKERS_UPDATE";
    EventName["guild_integrations_update"] = "GUILD_INTEGRATIONS_UPDATE";
    EventName["guild_member_add"] = "GUILD_MEMBER_ADD";
    EventName["guild_member_remove"] = "GUILD_MEMBER_REMOVE";
    EventName["guild_member_update"] = "GUILD_MEMBER_UPDATE";
    EventName["guild_members_chunk"] = "GUILDMEMBERSCHUNK";
    EventName["guild_role_create"] = "GUILD_ROLE_CREATE";
    EventName["guild_role_update"] = "GUILD_ROLE_UPDATE";
    EventName["guild_role_delete"] = "GUILD_ROLE_DELETE";
    EventName["guild_scheduled_event_create"] = "GUILD_SCHEDULED_EVENT_CREATE";
    EventName["guild_scheduled_event_update"] = "GUILD_SCHEDULED_EVENT_UPDATE";
    EventName["guild_scheduled_event_delete"] = "GUILD_SCHEDULED_EVENT_DELETE";
    EventName["guild_scheduled_event_user_add"] = "GUILD_SCHEDULED_EVENT_USER_ADD";
    EventName["guild_scheduled_event_user_remove"] = "GUILD_SCHEDULED_EVENT_USER_REMOVE";
    EventName["integration_create"] = "INTEGRATION_CREATE";
    EventName["integration_update"] = "INTEGRATION_UPDATE";
    EventName["integration_delete"] = "INTEGRATION_DELETE";
    EventName["invite_create"] = "INVITE_CREATE";
    EventName["invite_delete"] = "INVITE_DELETE";
    EventName["message_create"] = "MESSAGE_CREATE";
    EventName["message_update"] = "MESSAGE_UPDATE";
    EventName["message_delete"] = "MESSAGE_DELETE";
    EventName["message_delete_bulk"] = "MESSAGE_DELETE_BULK";
    EventName["message_reaction_add"] = "MESSAGE_REACTION_ADD";
    EventName["message_reaction_remove"] = "MESSAGE_REACTION_REMOVE";
    EventName["message_reaction_remove_all"] = "MESSAGE_REACTION_REMOVE_ALL";
    EventName["message_reaction_remove_emoji"] = "MESSAGE_REACTION_REMOVE_EMOJI";
    EventName["presence_update"] = "PRESENCE_UPDATE";
    EventName["typing_start"] = "TYPING_START";
    EventName["user_update"] = "USER_UPDATE";
    EventName["voice_state_update"] = "VOICE_STATE_UPDATE";
    EventName["voice_server_update"] = "VOICE_SERVER_UPDATE";
    EventName["webhook_update"] = "WEBHOOK_UPDATE";
    EventName["interaction_create"] = "INTERACTION_CREATE";
    EventName["stage_instance_create"] = "STAGE_INSTANCE_CREATE";
    EventName["stage_instance_update"] = "STAGE_INSTANCE_UPDATE";
    EventName["stage_instance_delete"] = "STAGE_INSTANCE_DELETE";
})(EventName = exports.EventName || (exports.EventName = {}));
