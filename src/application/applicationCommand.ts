import {ApplicationCommandOptionData, ApplicationCommandType, SnowflakeData} from "../dataType";

export function createApplicationCommand(type: 'slash' | 'user' | 'message'): typeof createSlashCommand | typeof createUserCommand | typeof createMessageCommand {
    switch (type) {
        case "slash":
            return createSlashCommand;
        case "user":
            return createUserCommand;
        case "message":
            return createMessageCommand;
    }
}

function createSlashCommand(guild_id?: SnowflakeData) {
    if (guild_id === undefined) {
        return function (application_id: SnowflakeData) {
            return function (name: string, description: string, options?: ApplicationCommandOptionData[]) {
                return {
                    uri: (base: URL) => {
                        base.pathname += `applications/${application_id}/commands`;
                        return {
                            uri: base.toString(),
                            mode: 'POST'
                        };
                    },
                    data: {
                        name,
                        description,
                        options,
                        type: ApplicationCommandType.CHAT_INPUT
                    }
                };
            }
        };
    }
    return function (application_id: SnowflakeData) {
        return function (name: string, description: string, options?: ApplicationCommandOptionData[]) {
            return {
                uri: (base: URL) => {
                    base.pathname += `applications/${application_id}/guilds/${guild_id}/commands`;
                    return {
                        uri: base.toString(),
                        mode: 'POST'
                    };
                },
                data: {
                    name,
                    description,
                    options,
                    type: ApplicationCommandType.CHAT_INPUT
                }
            };
        }
    };
}

function createUserCommand(guild_id?: SnowflakeData) {
    if (guild_id === undefined) {
        return function (application_id: SnowflakeData) {
            return function (name: string) {
                return {
                    uri: (base: URL) => {
                        base.pathname += `applications/${application_id}/commands`;
                        return {
                            uri: base.toString(),
                            mode: 'POST'
                        };
                    },
                    data: {
                        name,
                        type: ApplicationCommandType.USER
                    }
                };
            }
        };
    }
    return function (application_id: SnowflakeData) {
        return function (name: string) {
            return {
                uri: (base: URL) => {
                    base.pathname += `applications/${application_id}/guilds/${guild_id}/commands`;
                    return {
                        uri: base.toString(),
                        mode: 'POST'
                    };
                },
                data: {
                    name,
                    type: ApplicationCommandType.USER
                }
            };
        }
    };
}

function createMessageCommand(guild_id?: SnowflakeData) {
    if (guild_id === undefined) {
        return function (application_id: SnowflakeData) {
            return function (name: string) {
                return {
                    uri: (base: URL) => {
                        base.pathname += `applications/${application_id}/commands`;
                        return {
                            uri: base.toString(),
                            mode: 'POST'
                        };
                    },
                    data: {
                        name,
                        type: ApplicationCommandType.MESSAGE
                    }
                };
            }
        };
    }
    return function (application_id: SnowflakeData) {
        return function (name: string) {
            return {
                uri: (base: URL) => {
                    base.pathname += `applications/${application_id}/guilds/${guild_id}/commands`;
                    return {
                        uri: base.toString(),
                        mode: 'POST'
                    };
                },
                data: {
                    name,
                    type: ApplicationCommandType.MESSAGE
                }
            };
        }
    };
}

export function getGlobalApplicationCommands() {
    return {
        uri: (base: URL) => {
            base.pathname += `applications/{application.id}/commands`;
            base.searchParams.set('with_localizations', 'false');
            return {
                uri: base.toString(),
                mode: 'GET'
            };
        }
    }
}