import { SnowflakeData } from "./type";

export default class Snowflake {
    value: BigInt;

    constructor(id: SnowflakeData) {
        if (typeof id === 'string')
            this.value = BigInt(id)
        else
            this.value = id;
    }

    valueOf(): BigInt {
        return this.value;
    }
}