import { Commands } from '@luna/typings';
import { Interaction } from 'detritus-client';
import { Context } from './CommandContext.js';

export abstract class CustomInteractionCommand extends Interaction.InteractionCommand {
    declare metadata: Commands.CommandMetaData;

    abstract exec(ctx: Context<Record<string, unknown>>): unknown;

    constructor(opts: Commands.CustomCommandOptions) {
        super(opts);
    }

    async run(
        context: Interaction.InteractionContext,
        args: Interaction.ParsedArgs,
    ) {
        const ctx = Context.fromContext(context, args);

        try {
            await this.exec(ctx);
        } catch (error) {
            if (error) {
                ctx.error();
            }
        }
    }
}

export function applyOptions(options: Commands.CustomCommandOptions) {
    //eslint-disable-next-line
    return (cls: any): any => {
        class T extends cls {
            constructor(opts: Interaction.InteractionCommandOptions) {
                super({
                    ...opts,
                    ...options,
                });
            }
        }
        return T;
    };
}
