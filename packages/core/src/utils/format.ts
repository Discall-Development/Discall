export default function format(format: string, params: Record<string, string> | string, ...args: string[]) {
    let type: 'string' | 'array' | 'key' | 'key+array';
    if (!args) {
        if (typeof params === 'string')
            type = 'string';
        else
            type = 'key';
    } else {
        if (typeof params === 'string')
            type = 'array';
        else
            type = 'key+array';
    }

    switch(type) {
    case 'string':
        return format.replace(/{(\d+)}/g, (match, number) => {
            if (number == 0)
                return params as string;

            return match;
        });
    case 'key':
        return format.replace(/{(\w+)}/g, (match, key) => {
            if (key in (<Record<string, string>>params))
                return (<Record<string, string>>params)[key];

            return match;
        });
    case 'array':
        return format.replace(/{(\d+)}/g, (match, number) => {
            if (number == 0)
                return params as string;

            return args[number-1] ? args[number-1] : match;
        });
    case 'key+array':
        return format.replace(/{(\w+)}/g, (match, key) => {
            if (key in (<Record<string, string>>params))
                return (<Record<string, string>>params)[key];

            return match;
        }).replace(/{(\d+)}/g, (match, number) => {
            return args[number] ? args[number] : match;
        });
    }
}
