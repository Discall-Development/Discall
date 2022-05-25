import {RoleData} from "./type";
import Snowflake from "./snowflake";

export default class Role {
    public id: Snowflake;
    public name: string;
    public color: RGBColor;

    constructor(data: RoleData) {

    }
}