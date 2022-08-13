import { ApplicationCommandPermissionsData, ApplicationData } from "../application";

export function isApplicationCommandPermissions(obj: any): obj is ApplicationCommandPermissionsData {
    let keys: (keyof ApplicationCommandPermissionsData)[] = ["id", "type", "permission"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isApplication(obj: any): obj is ApplicationData {
    let keys: (keyof ApplicationData)[] = ["id", "name", "icon", "flags"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}