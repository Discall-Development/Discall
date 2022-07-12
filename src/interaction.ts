import { ButtonData, InteractionData } from "./dataType";

let buttons: Record<string, (interaction: InteractionData) => Promise<any>> = {};
export function onButton(button: ButtonData, run: (interaction: InteractionData) => Promise<any>) {
    
}