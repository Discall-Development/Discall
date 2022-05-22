import { EventDataType } from "./type";

export default class EventWrapper {
	data: EventDataType

	constructor(data: EventDataType) {
		this.data = data;
	}
}