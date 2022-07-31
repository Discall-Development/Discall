/// <reference types="node" />
import { SnowflakeData } from "../typo";
export default function udp(ip: string, port: number, ssrc: number, server_id: SnowflakeData): Promise<{
    send: (data: Buffer, secretKey: Buffer) => Promise<void>;
    set: (_mode: string) => Map<SnowflakeData, string>;
    config: {
        ip: string;
        port: number;
    };
}>;
export declare function latency(server_id: SnowflakeData): number | undefined;
