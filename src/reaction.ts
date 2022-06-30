import {ReactionData, SnowflakeData} from "./dataType";

let reactionCache: Map<[SnowflakeData, SnowflakeData], ReactionData> = new Map();