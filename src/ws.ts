import WebSocket from 'ws'
import { pack, unpack } from 'etf.js';

import { DiscordData, OpCode } from './type';
import { VersionError, EncodingError } from './errors';
import Intents from './Intents';

const zlib_suffix: Buffer = Buffer.from([0x00, 0x00, 0xff, 0xff]);
export default class DiscallWS {
	public ws: WebSocket
	public encoding: 'json' | 'etf'
	public processer: DiscordDataProcesser
	
	private version: number
	private wsUri: URL = new URL('wss://gateway.discord.gg')

	constructor(
		token: string,
		intents: Intents = Intents.none(),
		encoding: string = 'etf',
		version: number = 9
	) {
		if (version < 8 || version > 9)
			throw new VersionError(version);
		this.version = version;

		if (encoding !== 'json' && encoding !== 'etf')
			throw new EncodingError(encoding);
		this.encoding = encoding;
		
		this.wsUri.searchParams.append('v', `${this.version}`);
		this.wsUri.searchParams.append('encoding', this.encoding);

		this.ws = new WebSocket(this.wsUri.toString());
		
		this.ws.onopen = (e: WebSocket.Event): void => this.on_open(e);
		this.ws.onclose = (e: WebSocket.CloseEvent): void => this.on_close(e);
		this.ws.onerror = (e: WebSocket.ErrorEvent): void => this.on_error(e);
		this.ws.onmessage = (e: WebSocket.MessageEvent): void => this.on_message(e);

		this.processer = new DiscordDataProcesser(token, intents);
	}

	public send(data: DiscordData): void {
		let raw_data: string | Buffer;
		if (this.encoding == 'json')
			raw_data = JSON.stringify(data);
		else
			raw_data = this.encode(data);

		this.ws.send(raw_data, (err?: Error) => {
			if (err)
				console.error(err);
		});
	}

	private on_open(event: WebSocket.Event): void {}
	
	private on_close(event: WebSocket.CloseEvent): void {
		console.log('ws closed.\n');
	}
	
	private on_error(event: WebSocket.ErrorEvent): void {
		console.log('ws errored.\n');
	}
	
	private on_message(event: WebSocket.MessageEvent): void {
		let data: DiscordData | WebSocket.Data = event.data;

		if (this.encoding == 'etf') {
			data = this.decode(data as Buffer);
		} else if (this.encoding == 'json') {
			data = JSON.parse(data as string);
		}

		console.log(data)
		this.processData(data as DiscordData);
	}

	private processData(data: DiscordData): void {
		switch(data.op) {
			case OpCode.Dispatch:
				this.processer.Dispatch(data, this);
				break;
			case OpCode.Heartbeat:
				this.processer.Heartbeat(data, this);
				break;
			case OpCode.Reconnect:
				this.processer.Reconnect(data, this);
				break;
			case OpCode.InvalidSession:
				this.processer.InvalidSession(data, this);
				break;
			case OpCode.Hello:
				this.processer.Hello(data, this);
				break;
			case OpCode.HeartbeatACK:
				this.processer.HeartbeatACK(data, this);
				break;
		}
	}
	
	private decode(buf: Buffer): DiscordData {
		return unpack(buf) as DiscordData;
	}
	
	private encode(buf: DiscordData): Buffer {
		return pack(buf) as Buffer;
	}
}

class DiscordDataProcesser {
	private token: string
	private intents: number
	private sequence: number | null = null
	private heartbeat: number = 0

	private heartbeat_code?: NodeJS.Timer

	constructor(token: string, intents: Intents) {
		this.token = token;
		this.intents = intents.value;
	}
	
	Dispatch(data: DiscordData, ws: DiscallWS): void {}
	
	Heartbeat(data: DiscordData, ws: DiscallWS): void {}
	
	Identify(ws: DiscallWS): void {
		ws.send({
			op: 2,
			d: {
				token: this.token,
				intents: this.intents,
				properties: {
					$os: 'linux',
					$browser: 'discall',
					$device: 'discall'
				}
			}
		});
	}
	
	VoiceStateUpdate(ws: DiscallWS): void {}
	
	Resume(ws: DiscallWS): void {}
	
	Reconnect(data: DiscordData, ws: DiscallWS): void {}
	
	RequestGuildMembers(ws: DiscallWS): void {}
	
	InvalidSession(data: DiscordData, ws: DiscallWS): void {}
	
	Hello(data: DiscordData, ws: DiscallWS): void {
		if (this.heartbeat)
			return;

		this.Identify(ws);
		this.heartbeat = data.d?.heartbeat_interval;
		this.heartbeat_code = setInterval(() => {
			ws.send({
				op: 1,
				d: this.sequence
			});
		}, this.heartbeat);
	}
	
	HeartbeatACK(data: DiscordData, wss: DiscallWS): void {}
}