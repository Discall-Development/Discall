import ws from "../new_src/ws";
import { MessageCreateEventData } from "../new_src/typo";

let _ws = ws(process.env.Discall, 513);
let onMessage = _ws.onmessage;
_ws.onmessage = async(event) => {
    let data = await onMessage(event) as MessageCreateEventData;
    console.log(data.member ? undefined : data.member.permission);
}