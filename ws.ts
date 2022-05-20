import { RetryEventDetails, Websocket, WebsocketBuilder } from 'websocket-ts'
import { VersionError, EncodingError } from './errors';

export class DiscallWS {
	ws: Websocket
	version: number
	encoding: 'json' | 'etf'
	wsUri: URL = new URL('wss://gateway.discord.gg')

	constructor(
		version: number = 9,
		encoding: string = 'json',
		compress: boolean = false
	) {
		if (version < 8 || version > 9)
			throw new VersionError(version);
		this.version = version;

		if (encoding !== 'json' && encoding !== 'etf')
			throw new EncodingError(encoding);
		this.encoding = encoding;
		
		this.wsUri.searchParams.append('v', `${this.version}`);
		this.wsUri.searchParams.append('encoding', this.encoding);
		if (compress)
			this.wsUri.searchParams.append('compress', 'zlib-stream');
		
		let builder = new WebsocketBuilder(this.wsUri.toString())
			.onOpen(this.on_open)
			.onClose(this.on_close)
			.onError(this.on_error)
			.onMessage(this.on_message)
			.onRetry(this.on_retry);
		this.ws = builder.build();
	}

	on_open(ws: Websocket, event: Event): void {}
	
	on_close(ws: Websocket, event: CloseEvent): void {}
	
	on_error(ws: Websocket, event: Event): void {}
	
	on_message(ws: Websocket, event: MessageEvent): void {
		console.log(event.data, '\n-----------------------------');
	}
	
	on_retry(ws: Websocket, event: CustomEvent<RetryEventDetails>): void {}
}