import { ApplicationCommandPermissionsData, ApplicationData } from '../application';
import { isBoolean, isNumber, isString, isTypeNull, isTypeObject } from './original';
import { isSnowflake } from './snowflake';

export function isApplicationCommandPermissions(obj: unknown): obj is ApplicationCommandPermissionsData {
    return isTypeObject({
        id: isSnowflake,
        type: isNumber,
        permission: isBoolean
    })(obj);
}

export function isApplication(obj: unknown): obj is ApplicationData {
    return isTypeObject({
        id: isSnowflake,
        name: isString,
        icon: isTypeNull(isString),
        flags: isNumber
    })(obj);
}