import {ReadyEventData} from "./dataType";

export function toEventData(eventType: string, data: any): Array<any> {
    switch (eventType) {
        case 'READY':
            return toReadyData(data);
        default:
            return [];
    }
}

function toReadyData(data: ReadyEventData): Array<any> {
    return [data];
}