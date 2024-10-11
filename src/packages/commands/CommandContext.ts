import {
    Interaction,
    InteractionCommandClient,
    Structures,
    // Constants,
} from 'detritus-client';
import { CustomInteractionCommand } from './CustomCommand.js';

export class Context<
    Arg extends Interaction.ParsedArgs,
> extends Interaction.InteractionContext {
    args;

    declare command: CustomInteractionCommand;
    constructor(
        interactionCommandClient: InteractionCommandClient,
        interaction: Structures.Interaction,
        command: Interaction.InteractionCommand,
        invoker:
            | Interaction.InteractionCommand
            | Interaction.InteractionCommandOption,
        args: Arg,
    ) {
        super(interactionCommandClient, interaction, command, invoker);
        this.args = args;
    }

    static fromContext(
        ctx: Interaction.InteractionContext,
        args: Interaction.ParsedArgs,
    ) {
        return new Context(
            ctx.interactionCommandClient,
            ctx.interaction,
            ctx.command,
            ctx.invoker,
            args,
        );
    }

    error() {}

    success() {}

    reply(options: Structures.InteractionEditOrRespond, silent?: boolean) {
        if (!options.content) {
            options.content = '';
        }
        if (!options.embed || !options.embeds) {
            options.embeds = [];
        }
        return this.editOrRespond({
            ...options,
            ...(silent
                ? {
                      flags: 1 << 12,
                  }
                : {}),
        });
    }

    public async embed() {
        this.send();
    }

    private send() {
        return this.editOrRespond();
    }
}
