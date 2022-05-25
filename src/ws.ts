import WebSocket from 'ws'
import {pack, unpack} from 'etf.js';

import {BotType, DiscordData, DiscordDataProcesserType, OpCode} from './type';
import {VersionError, EncodingError} from './errors';
import Intents from './Intents';
import DiscordDataProcesser from "./Processer";

export default class DiscallWS {
	public processer: DiscordDataProcesserType;

	private ws?: WebSocket;
	private readonly encoding: 'json' | 'etf';
	private readonly version: number;
	private wsUri: URL = new URL('wss://gateway.discord.gg');
	private opened: boolean = false;

	constructor(
		token: string,
		intents: Intents = Intents.none(),
		encoding: string = 'etf',
		version: number = 9,
		bot: BotType
	) {
		if (version < 8 || version > 9)
			throw new VersionError(version);
		this.version = version;

		if (encoding !== 'json' && encoding !== 'etf')
			throw new EncodingError(encoding);
		this.encoding = encoding;
		
		this.wsUri.searchParams.append('v', `${this.version}`);
		this.wsUri.searchParams.append('encoding', this.encoding);

		this.processer = new DiscordDataProcesser(token, intents, bot);
	}

	public async connect(): Promise<void> {
		this.ws = new WebSocket(this.wsUri.toString());

		this.ws.onopen = this.onOpen.bind(this);
		this.ws.onclose = this.onClose.bind(this);
		this.ws.onerror = this.onError.bind(this);
		this.ws.onmessage = this.onMessage.bind(this);
	}

	public send(data: DiscordData): void {
		let raw_data: string | Buffer;
		if (this.encoding == 'json')
			raw_data = JSON.stringify(data);
		else
			raw_data = this.encode(data);

		this.ws?.send(raw_data, (err?: Error) => {
			if (err)
				console.error(err);
		});
	}

	public get isopen(): boolean {
		return this.opened;
	}

	private onOpen(event: WebSocket.Event): void {
		this.processer.Identify(this).then(() => {});
	}
	
	private onClose(event: WebSocket.CloseEvent): void {
		console.log('ws closed.\n');
	}
	
	private onError(event: WebSocket.ErrorEvent): void {
		console.log('ws errored.\n');
	}
	
	private onMessage(event: WebSocket.MessageEvent): void {
		let data: DiscordData | WebSocket.Data = event.data;

		if (this.encoding == 'etf') {
			data = this.decode(data as Buffer);
		} else if (this.encoding == 'json') {
			data = JSON.parse(data as string);
		}

		this.processData(data as DiscordData).then(() => {});
	}

	private async processData(data: DiscordData): Promise<void> {
		switch(data.op) {
			case OpCode.Dispatch:
				return await this.processer.Dispatch(data, this);
			case OpCode.Heartbeat:
				return await this.processer.Heartbeat(data, this);
			case OpCode.Reconnect:
				return await this.processer.Reconnect(data, this);
			case OpCode.InvalidSession:
				return await this.processer.InvalidSession(data, this);
			case OpCode.Hello:
				return await this.processer.Hello(data, this);
			case OpCode.HeartbeatACK:
				return await this.processer.HeartbeatACK(data, this);
		}
	}
	
	private decode(buf: Buffer): DiscordData {
		return unpack(buf) as DiscordData;
	}
	
	private encode(buf: DiscordData): Buffer {
		return pack(buf) as Buffer;
	}
}