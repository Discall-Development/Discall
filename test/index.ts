import WS from "../src/ws";
import Intents from "../src/Intents";

export function WSTest(): void {
	let ws: WS = new WS(process.env['token'] as string, Intents.all());
}