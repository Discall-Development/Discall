import {GuildData, RoleType, UnavailableGuildData} from "./type";
import Snowflake from "./snowflake";

export default class Guild {
    public id: Snowflake;
    public name: string;
    public owner_is_bot: boolean = false;
    public owner_id: Snowflake;
    public permission: string = '';
    public afk_channel_id: Snowflake | null;
    public afk_timeout: number;
    public widget_enabled: boolean = false;
    public widget_channel_id: Snowflake | null = null;

    public verification_level: number;
    public default_message_notification: number;
    public explicit_content_filter: number;

    public roles: RoleType[] = [];

    private readonly icon: string | null;
    private readonly template_icon: string | null = null;
    private readonly splash: string | null;
    private readonly discovery: string | null;
    private image_format: string = 'https://cdn.discordapp.com';

    constructor(data: GuildData) {
        this.id = new Snowflake(data.id);
        this.name = data.name;
        this.icon = data.icon;
        if (data.icon_hash !== undefined)
            this.template_icon = data.icon_hash;
    }

    public get icon_url(): string {
        if (!this.icon)
            return '';
        return `${this.image_format}/icons/${this.id}/${this.icon}.png`;
    }

    public get template_icon_url(): string {
        if (!this.template_icon)
            return '';
        return `${this.image_format}/icons/${this.id}/${this.template_icon}.png`;
    }
}

export class UnavailableGuild implements UnavailableGuildData {
    public id: string;
    public unavailable: boolean;

    constructor(data: UnavailableGuildData) {
        this.id = data.id;
        this.unavailable = data.unavailable;
    }
}