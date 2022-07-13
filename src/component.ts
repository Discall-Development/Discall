import { ActionRowData, ButtonData, ButtonStyle, ComponentType, EmojiData, ModalData, SelectMenuData, SelectOption, TextInputData, TextInputStyle } from "./dataType";
import { MultiDefault } from "./error";
import { isEmpty } from "./util";

export function createComponents(components: (ButtonData | SelectMenuData)[] | ModalData) {
    if (Array.isArray(components)) {
        let rows: ActionRowData[] = [];
        for (const component of components) {
            let row = component.row;

            delete component.row;
            if (rows.length < row)
                rows.length = row;

            if (!rows[row - 1])
                rows[row - 1] = {
                    type: ComponentType.ActionRow,
                    components: [component]
                };
            else
                rows[row - 1].components.push(component);
        }

        return rows.filter(Boolean);
    }

    return [components];
}

export function createButton(row: number, options: {
    style?: ButtonStyle;
    label?: string;
    emoji?: Partial<EmojiData>;
    custom_id?: string;
    url?: string;
    disabled?: boolean;
}) {
    if (isEmpty(options))
        return {
            type: ComponentType.Button,
            style: ButtonStyle.Secondary
        };

    if (!options.style)
        options.style = ButtonStyle.Secondary;

    if (options.emoji)
        options.emoji = {
            name: options.emoji.name,
            id: options.emoji.id,
            animated: options.emoji.animated
        };

    return {
        type: ComponentType.Button,
        ...options,
        row
    };
}

let idx = 0;
export function createSelectMenu(row: number, options: {
    custom_id: string;
    options: SelectOption[];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;
}) {
    if (!options.custom_id)
        options.custom_id = `select_${idx++}`;

    options.options = options.options || [];

    return {
        type: ComponentType.SelectMenu,
        ...options,
        row
    };
}

export function createModal(options: {
    title: string;
    custom_id: string;
    inputs: TextInputData[];
}) {
    return {
        title: options.title,
        custom_id: options.custom_id,
        components: [{
            type: ComponentType.ActionRow,
            components: [...options.inputs]
        }]
    };
}

export function createOptions(options: {
    label: string;
    value: string;
    description?: string;
    emoji?: Partial<EmojiData>;
    default?: boolean;
}[]) {
    let default_one = false;
    options.forEach((v, idx) => {
        if (!default_one && v.default)
            default_one = true;

        if (default_one && v.default)
            throw new MultiDefault();

        options[idx].emoji = {
            id: v.emoji.id,
            name: v.emoji.name,
            animated: v.emoji.animated
        };
    });

    return options;
}

export function createInputs(options: {
    custom_id: string;
    style: TextInputStyle;
    label: string;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;
}[]) {
    let inputs: TextInputData[];
    for (const option of options) {
        inputs.push({
            type: ComponentType.TextInput,
            ...option
        });
    }

    return inputs;
}