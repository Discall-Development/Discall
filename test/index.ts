import Bot, {start} from "../src/bot";
import Intents from "../src/Intents";

export function BotTest(): void {
	let bot: Bot = new Bot(process.env['token'] as string, Intents.all());
	start(bot).then(r => {
		console.log('started');
	});
}