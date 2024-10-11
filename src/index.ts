import {
    CommandClient,
    InteractionCommandClient,
    Constants,
} from 'detritus-client';
import { getEnv } from '@luna/util/env.js';
import { LunaClient } from '@luna/clients/LunaClient';
const client = new LunaClient(getEnv().DISCORD_TOKEN, {
    gateway: {
        autoReconnect: true,
        intents: [
            Constants.GatewayIntents.GUILDS,
            Constants.GatewayIntents.GUILD_MEMBERS,
            Constants.GatewayIntents.GUILD_BANS,
            Constants.GatewayIntents.GUILD_EMOJIS,
            Constants.GatewayIntents.GUILD_INTEGRATIONS,
            Constants.GatewayIntents.GUILD_WEBHOOKS,
            Constants.GatewayIntents.GUILD_INVITES,
            Constants.GatewayIntents.GUILD_VOICE_STATES,
            Constants.GatewayIntents.GUILD_PRESENCES,
            Constants.GatewayIntents.GUILD_MESSAGES,
            Constants.GatewayIntents.GUILD_MESSAGE_REACTIONS,
            Constants.GatewayIntents.GUILD_MESSAGE_TYPING,
            Constants.GatewayIntents.DIRECT_MESSAGES,
            Constants.GatewayIntents.DIRECT_MESSAGE_REACTIONS,
            Constants.GatewayIntents.DIRECT_MESSAGE_TYPING,
            Constants.GatewayIntents.MESSAGE_CONTENT,
            Constants.GatewayIntents.GUILD_SCHEDULED_EVENTS,
            Constants.GatewayIntents.AUTO_MODERATION_CONFIGURATION,
            Constants.GatewayIntents.AUTO_MODERATION_EXECUTION,
            Constants.GatewayIntents.GUILD_MESSAGE_POLLS,
            Constants.GatewayIntents.DIRECT_MESSAGE_POLLS,
        ],

        presence: {
            status: Constants.PresenceStatuses.IDLE,
            activities: [
                {
                    name: 'you',
                    type: Constants.ActivityTypes.LISTENING,
                },
            ],
        },
    },
});

const commandClient = new CommandClient(client, {
    onCommandCheck(ctx) {
        if (!ctx.user.bot) {
            return true;
        }
        return false;
    },
    onPrefixCheck: (ctx) => {
        console.log('running');
        if (ctx.guild) {
            return ['.'];
        }
        return ['.'];
    },
});

const interactionClient = new InteractionCommandClient(client, {
    checkCommands: true,
});

interactionClient.addMultipleIn('./commands/');
commandClient.add({
    name: 'ping',
    run: (ctx) => {
        return ctx.editOrReply({
            content: 'pong!',
        });
    },
});
async function run() {
    client.listenerHandler.addDefaultListeners();
    await client.listenerHandler.loadAll();
    await client.run({ wait: true });
    await commandClient.run({ wait: true });
    await interactionClient.run({ wait: true });
    if (interactionClient.commands.length !== 1) {
        await interactionClient.uploadApplicationCommands();
    }
}

run();
