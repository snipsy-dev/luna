import { Context } from '@luna/commands/CommandContext.js';
import {
    applyOptions,
    CustomInteractionCommand,
} from '@luna/commands/CustomCommand.js';
// import { Constants } from 'detritus-client';

@applyOptions({
    name: 'ping',
    description: 'the ping command',
    metadata: {
        id: 'util.ping',
        nsfw: false,
    },
    id: 'util.ping',
})
export default class PingCommand extends CustomInteractionCommand {
    async exec(ctx: Context<Record<string, unknown>>): Promise<unknown> {
        return ctx.reply({
            content: 'pong.',
            flags: 1 << 12,
        });
        return;
    }
}
