import { ButtonData, ButtonStyle, ComponentType, EmojiData, SelectMenuData, SelectOption, TextInputData } from "./dataType";
import { isEmpty } from "./util";

export function createComponents(components: (ButtonData | SelectMenuData)[] | TextInputData[]) {

}

export function createButton(options: {
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
        ...options
    };
}

let idx = 0;
export function createSelectMenu(options: {
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
        ...options
    };
}

export function createModal(options: {
    title: string;
    custom_id: string;
    inputs: TextInputData[];
}) {
    
}