import {ApplicationCommandOptionData, ApplicationCommandType, SnowflakeData} from "../dataType";

export function createApplicationCommand(type: "slash" | "user" | "message"): typeof createSlashCommand | typeof createUserCommand | typeof createMessageCommand {
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
    if (guild_id) {
        return function (application_id: SnowflakeData) {
            return function (name: string, description: string, options?: ApplicationCommandOptionData[]) {
                return {
                    uri: (base: URL) => {
                        base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands`;
                        return {
                            uri: base.toString(),
                            mode: "POST"
                        };
                    },
                    data: {
                        name,
                        description,
                        options,
                        type: ApplicationCommandType.CHAT_INPUT
                    }
                };
            };
        };
    }
    return function (application_id: SnowflakeData) {
        return function (name: string, description: string, options?: ApplicationCommandOptionData[]) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/commands`;
                    return {
                        uri: base.toString(),
                        mode: "POST"
                    };
                },
                data: {
                    name,
                    description,
                    options,
                    type: ApplicationCommandType.CHAT_INPUT
                }
            };
        };
    };
}

function createUserCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return function (application_id: SnowflakeData) {
            return function (name: string) {
                return {
                    uri: (base: URL) => {
                        base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands`;
                        return {
                            uri: base.toString(),
                            mode: "POST"
                        };
                    },
                    data: {
                        name,
                        type: ApplicationCommandType.USER
                    }
                };
            };
        };
    }
    return function (application_id: SnowflakeData) {
        return function (name: string) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/commands`;
                    return {
                        uri: base.toString(),
                        mode: "POST"
                    };
                },
                data: {
                    name,
                    type: ApplicationCommandType.USER
                }
            };
        };
    };
}

function createMessageCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return function (application_id: SnowflakeData) {
            return function (name: string) {
                return {
                    uri: (base: URL) => {
                        base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands`;
                        return {
                            uri: base.toString(),
                            mode: "POST"
                        };
                    },
                    data: {
                        name,
                        type: ApplicationCommandType.MESSAGE
                    }
                };
            };
        };
    }
    return function (application_id: SnowflakeData) {
        return function (name: string) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/commands`;
                    return {
                        uri: base.toString(),
                        mode: "POST"
                    };
                },
                data: {
                    name,
                    type: ApplicationCommandType.MESSAGE
                }
            };
        };
    };
}

export function getApplicationCommands(guild_id?: SnowflakeData) {
    if (guild_id) {
        return function(application_id: SnowflakeData) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands`;
                    base.searchParams.set("with_localizations", "true");
                    return {
                        uri: base.toString(),
                        mode: "GET"
                    };
                }
            };
        };
    }
    return function(application_id: SnowflakeData) {
        return {
            uri: (base: URL) => {
                base.pathname += `/applications/${application_id}/commands`;
                base.searchParams.set("with_localizations", "true");
                return {
                    uri: base.toString(),
                    mode: "GET"
                };
            }
        };
    };
}
export function getApplicationCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return function(application_id: SnowflakeData, command_id: SnowflakeData) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands/${command_id}`;
                    base.searchParams.set("with_localizations", "true");
                    return {
                        uri: base.toString(),
                        mode: "GET"
                    };
                }
            };
        };
    }
    return function(application_id: SnowflakeData, command_id: SnowflakeData) {
        return {
            uri: (base: URL) => {
                base.pathname += `/applications/${application_id}/commands/${command_id}`;
                base.searchParams.set("with_localizations", "true");
                return {
                    uri: base.toString(),
                    mode: "GET"
                };
            }
        };
    };
}

export function deleteApplicationCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return function(application_id: SnowflakeData) {
            return function(command_id: SnowflakeData) {
                return {
                    uri: (base: URL) => {
                        base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands/${command_id}`;
                        return {
                            uri: base.toString(),
                            mode: "DELETE"
                        };
                    }
                };
            };
        };
    }
    return function(application_id: SnowflakeData) {
        return function(command_id: SnowflakeData) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/commands/${command_id}`;
                    return {
                        uri: base.toString(),
                        mode: "DELETE"
                    };
                }
            };
        };
    };
}

export function updateApplicationCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return function(application_id: SnowflakeData) {
            return function(command_id: SnowflakeData, data: any) {
                return {
                    uri: (base: URL) => {
                        base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands/${command_id}`;
                        return {
                            uri: base.toString(),
                            mode: "PATCH"
                        };
                    },
                    data
                };
            };
        };
    }
    return function(application_id: SnowflakeData) {
        return function(command_id: SnowflakeData, data: any) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/commands/${command_id}`;
                    return {
                        uri: base.toString(),
                        mode: "PATCH"
                    };
                },
                data
            };
        };
    };
}