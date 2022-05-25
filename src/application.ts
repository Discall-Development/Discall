import Snowflake from "./snowflake";
import {SnowflakeData} from "./type";

export default class Application {
    flags: number;
    id: Snowflake;

    constructor(data: { flags: number, id: SnowflakeData }) {
        this.flags = data.flags;
        this.id = new Snowflake(data.id);
    }
}