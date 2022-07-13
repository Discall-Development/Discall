import {ApplicationCommandData, ApplicationCommandOptionData, ApplicationCommandPermissionsData, ApplicationCommandType, SnowflakeData} from "./dataType";
import { cacheDelete, cacheGet, cacheHas, cacheSet } from "./util";

let commandCache: Map<string, Map<SnowflakeData, ApplicationCommandData>> = new Map();
export function createApplicationCommand(type: "slash" | "user" | "message") {
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
        return function(application_id: SnowflakeData) {
            return async function (name: string, description: string, options?: ApplicationCommandOptionData[]) {
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
                    },
                };
            };
        };
    }
    return function(application_id: SnowflakeData) {
        return async function (name: string, description: string, options?: ApplicationCommandOptionData[]) {
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
                },
                cache: (data: ApplicationCommandData) => cacheSet(commandCache, ["slash", data.id], data)
            };
        };
    };
}

function createUserCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return function (application_id: SnowflakeData) {
            return async function (name: string) {
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
                    },
                    cache: (data: ApplicationCommandData) => cacheSet(commandCache, ["guild_user", data.id], data)
                };
            };
        };
    }
    return function (application_id: SnowflakeData) {
        return async function (name: string) {
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
                },
                cache: (data: ApplicationCommandData) => cacheSet(commandCache, ["user", data.id], data)
            };
        };
    };
}

function createMessageCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return function (application_id: SnowflakeData) {
            return async function (name: string) {
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
                    },
                    cache: (data: ApplicationCommandData) => cacheSet(commandCache, ["guild_message", data.id], data)
                };
            };
        };
    }
    return function (application_id: SnowflakeData) {
        return async function (name: string) {
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
                },
                cache: (data: ApplicationCommandData) => cacheSet(commandCache, ["message", data.id], data)
            };
        };
    };
}

export function getApplicationCommands(guild_id?: SnowflakeData) {
    if (guild_id) {
        return async function(application_id: SnowflakeData) {
            let uri = (_: URL) => {
                return {
                    uri: "",
                    mode: "NONE"
                };
            };

            let result = [];
            for (const [k, v] of commandCache.entries()) {
                if (!k.startsWith("guild_")) continue;
                for (const [_, v1] of v.entries())
                    if (v1.guild_id === guild_id)
                        result.push(v1);
            }

            return { uri, cache: () => result };
        };
    }
    return async function(application_id: SnowflakeData) {
        let uri = (_: URL) => {
            return {
                uri: "",
                mode: "NONE"
            };
        };

        let result = [];
        for (const [k, v] of commandCache.entries()) {
            if (k.startsWith("guild_")) continue;
            
            result.concat(v.values());
        }

        return { uri, cache: () => result };
    };
}

export function fetchApplicationCommands(guild_id?: SnowflakeData) {
    if (guild_id) {
        return async function(application_id: SnowflakeData) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands`;
                    base.searchParams.set("with_localizations", "true");
                    return {
                        uri: base.toString(),
                        mode: "GET"
                    };
                },
                cache: (data: ApplicationCommandData[]) => {
                    for (const datum of data) {
                        switch (datum.type) {
                        case ApplicationCommandType.CHAT_INPUT:
                            cacheSet(commandCache, ["guild_slash", datum.id], datum);
                            break;
                        case ApplicationCommandType.USER:
                            cacheSet(commandCache, ["guild_user", datum.id], datum);
                            break;
                        case ApplicationCommandType.MESSAGE:
                            cacheSet(commandCache, ["guild_message", datum.id], datum);
                            break;
                        }
                    }
                }
            };
        };
    }
    return async function(application_id: SnowflakeData) {
        return {
            uri: (base: URL) => {
                base.pathname += `/applications/${application_id}/commands`;
                base.searchParams.set("with_localizations", "true");
                return {
                    uri: base.toString(),
                    mode: "GET"
                };
            },
            cache: (data: ApplicationCommandData[]) => {
                for (const datum of data) {
                    switch (datum.type) {
                    case ApplicationCommandType.CHAT_INPUT:
                        cacheSet(commandCache, ["slash", datum.id], datum);
                        break;
                    case ApplicationCommandType.USER:
                        cacheSet(commandCache, ["user", datum.id], datum);
                        break;
                    case ApplicationCommandType.MESSAGE:
                        cacheSet(commandCache, ["message", datum.id], datum);
                        break;
                    }
                }
            }
        };
    };
}

export function getApplicationCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return async function(application_id: SnowflakeData, command_id: SnowflakeData) {
            let uri = (_: URL) => {
                return {
                    uri: "",
                    mode: "NONE"
                };
            };

            if (cacheHas(commandCache, ["guild_slash", command_id]))
                return { uri, cache: () => cacheGet(commandCache, ["guild_slash", command_id]) };

            if (cacheHas(commandCache, ["guild_user", command_id]))
                return { uri, cache: () => cacheGet(commandCache, ["guild_user", command_id]) };

            if (cacheHas(commandCache, ["guild_message", command_id]))
                return { uri, cache: () => cacheGet(commandCache, ["guild_message", command_id]) };

            return await fetchApplicationCommand(guild_id)(application_id, command_id);
        };
    }

    return async function(application_id: SnowflakeData, command_id: SnowflakeData) {
        let uri = (_: URL) => {
            return {
                uri: "",
                mode: "NONE"
            };
        };

        if (cacheHas(commandCache, ["slash", command_id]))
            return { uri, cache: () => cacheGet(commandCache, ["slash", command_id]) };

        if (cacheHas(commandCache, ["user", command_id]))
            return { uri, cache: () => cacheGet(commandCache, ["user", command_id]) };

        if (cacheHas(commandCache, ["message", command_id]))
            return { uri, cache: () => cacheGet(commandCache, ["message", command_id]) };

        return await fetchApplicationCommand()(application_id, command_id);
    };
}

export function fetchApplicationCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return async function(application_id: SnowflakeData, command_id: SnowflakeData) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands/${command_id}`;
                    base.searchParams.set("with_localizations", "true");
                    return {
                        uri: base.toString(),
                        mode: "GET"
                    };
                },
                cache: (data: ApplicationCommandData) => {
                    switch (data.type) {
                    case ApplicationCommandType.CHAT_INPUT:
                        cacheSet(commandCache, ["guild_slash", command_id], data);
                        break;
                    case ApplicationCommandType.USER:
                        cacheSet(commandCache, ["guild_user", command_id], data);
                        break;
                    case ApplicationCommandType.MESSAGE:
                        cacheSet(commandCache, ["guild_message", command_id], data);
                        break;
                    }
                }
            };
        };
    }
    return async function(application_id: SnowflakeData, command_id: SnowflakeData) {
        return {
            uri: (base: URL) => {
                base.pathname += `/applications/${application_id}/commands/${command_id}`;
                base.searchParams.set("with_localizations", "true");
                return {
                    uri: base.toString(),
                    mode: "GET"
                };
            },
            cache: (data: ApplicationCommandData) => {
                switch (data.type) {
                case ApplicationCommandType.CHAT_INPUT:
                    cacheSet(commandCache, ["slash", command_id], data);
                    break;
                case ApplicationCommandType.USER:
                    cacheSet(commandCache, ["user", command_id], data);
                    break;
                case ApplicationCommandType.MESSAGE:
                    cacheSet(commandCache, ["message", command_id], data);
                    break;
                }
            }
        };
    };
}

export function deleteApplicationCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return function(application_id: SnowflakeData) {
            return async function(command_id: SnowflakeData) {
                return {
                    uri: (base: URL) => {
                        base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands/${command_id}`;
                        return {
                            uri: base.toString(),
                            mode: "DELETE"
                        };
                    },
                    cache: () => {
                        if (cacheHas(commandCache, ["guild_slash", command_id]))
                            cacheDelete(commandCache, ["guild_slash", command_id]);
                        
                        if (cacheHas(commandCache, ["guild_user", command_id]))
                            cacheDelete(commandCache, ["guild_user", command_id]);
                        
                        if (cacheHas(commandCache, ["guild_message", command_id]))
                            cacheDelete(commandCache, ["guild_message", command_id]);
                    }
                };
            };
        };
    }
    return function(application_id: SnowflakeData) {
        return async function(command_id: SnowflakeData) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/commands/${command_id}`;
                    return {
                        uri: base.toString(),
                        mode: "DELETE"
                    };
                },
                cache: () => {
                    if (cacheHas(commandCache, ["slash", command_id]))
                        cacheDelete(commandCache, ["slash", command_id]);
                    
                    if (cacheHas(commandCache, ["user", command_id]))
                        cacheDelete(commandCache, ["user", command_id]);
                    
                    if (cacheHas(commandCache, ["message", command_id]))
                        cacheDelete(commandCache, ["message", command_id]);
                }
            };
        };
    };
}

export function updateApplicationCommand(guild_id?: SnowflakeData) {
    if (guild_id) {
        return function(application_id: SnowflakeData) {
            return async function(command_id: SnowflakeData, data: any) {
                return {
                    uri: (base: URL) => {
                        base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands/${command_id}`;
                        return {
                            uri: base.toString(),
                            mode: "PATCH"
                        };
                    },
                    data,
                    cache: (data: ApplicationCommandData) => {
                        switch (data.type) {
                        case ApplicationCommandType.CHAT_INPUT:
                            cacheSet(commandCache, ["slash", command_id], data);
                            break;
                        case ApplicationCommandType.USER:
                            cacheSet(commandCache, ["user", command_id], data);
                            break;
                        case ApplicationCommandType.MESSAGE:
                            cacheSet(commandCache, ["message", command_id], data);
                            break;
                        }
                    }
                };
            };
        };
    }
    return function(application_id: SnowflakeData) {
        return async function(command_id: SnowflakeData, data: any) {
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/commands/${command_id}`;
                    return {
                        uri: base.toString(),
                        mode: "PATCH"
                    };
                },
                data,
                cache: (data: ApplicationCommandData) => {
                    switch (data.type) {
                    case ApplicationCommandType.CHAT_INPUT:
                        cacheSet(commandCache, ["slash", command_id], data);
                        break;
                    case ApplicationCommandType.USER:
                        cacheSet(commandCache, ["user", command_id], data);
                        break;
                    case ApplicationCommandType.MESSAGE:
                        cacheSet(commandCache, ["message", command_id], data);
                        break;
                    }
                }
            };
        };
    };
}

export function BulkOverwriteGuildApplicationCommands(guild_id: SnowflakeData, application_id: SnowflakeData) {
    return async function(objs: {
        uri: (base: URL) => { uri: string, mode: string };
        data: any;
        cache: (data: ApplicationCommandData) => any;
    }[]) {
        return {
            uri: (base: URL) => {
                base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands`;
                return {
                    uri: base.toString(),
                    mode: "PUT"
                };
            },
            data: objs.map(v => v.data),
            cache: (data: ApplicationCommandData[]) => {
                for (const datum of data) {
                    if (datum.guild_id)
                        switch (datum.type) {
                        case ApplicationCommandType.CHAT_INPUT:
                            cacheSet(commandCache, ["guild_slash", datum.id], datum);
                            break;
                        case ApplicationCommandType.USER:
                            cacheSet(commandCache, ["guild_user", datum.id], datum);
                            break;
                        case ApplicationCommandType.MESSAGE:
                            cacheSet(commandCache, ["guild_message", datum.id], datum);
                            break;
                        }
                    else
                        switch (datum.type) {
                        case ApplicationCommandType.CHAT_INPUT:
                            cacheSet(commandCache, ["slash", datum.id], datum);
                            break;
                        case ApplicationCommandType.USER:
                            cacheSet(commandCache, ["user", datum.id], datum);
                            break;
                        case ApplicationCommandType.MESSAGE:
                            cacheSet(commandCache, ["message", datum.id], datum);
                            break;
                        }
                }
            }
        };
    };
}

export function fetchApplicationCommandPermissions(guild_id: SnowflakeData, application_id: SnowflakeData) {
    return async function(command_id?: SnowflakeData) {
        if (command_id)
            return {
                uri: (base: URL) => {
                    base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands/${command_id}/permissions`;
                    return {
                        uri: base.toString(),
                        mode: "GET"
                    };
                }
            };

        return {
            uri: (base: URL) => {
                base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands/permissions`;
                return {
                    uri: base.toString(),
                    mode: "GET"
                };
            }
        };
    };
}

export function EditApplicationCommandPermissions(guild_id: SnowflakeData, application_id: SnowflakeData) {
    return async function(command_id: SnowflakeData, permissions: ApplicationCommandPermissionsData[]) {
        return {
            uri: (base: URL) => {
                base.pathname += `/applications/${application_id}/guilds/${guild_id}/commands/${command_id}/permissions`;
                return {
                    uri: base.toString(),
                    mode: "PUT"
                };
            },
            data: { permissions }
        };
    };
}