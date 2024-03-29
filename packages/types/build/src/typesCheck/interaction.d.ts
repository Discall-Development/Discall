import { ApplicationCommandData, ApplicationCommandInteractionDataOptionData, ApplicationCommandOptionChoiceData, ApplicationCommandOptionData, IApplicationCommandData, IMessageComponentData, IModalSubmitData, InteractionData, ResolveData } from '../interaction';
export declare function isInteraction(obj: unknown): obj is InteractionData;
export declare function isIApplicationCommand(obj: unknown): obj is IApplicationCommandData;
export declare function isIMessageComponent(obj: unknown): obj is IMessageComponentData;
export declare function isIModalSubmit(obj: unknown): obj is IModalSubmitData;
export declare function isResolve(obj: unknown): obj is ResolveData;
export declare function isApplicationCommandInteractionDataOption(obj: unknown): obj is ApplicationCommandInteractionDataOptionData;
export declare function isApplicationCommand(obj: unknown): obj is ApplicationCommandData;
export declare function isApplicationCommandOption(obj: unknown): obj is ApplicationCommandOptionData;
export declare function isApplicationCommandOptionChoice(obj: unknown): obj is ApplicationCommandOptionChoiceData;
