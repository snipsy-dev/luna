import * as detritus from 'detritus-client';
import { getEnv } from '@luna/util/env.js';
import { log } from 'console';
import {
    ActivityTypes,
    GatewayIntents,
    MessageFlags,
    PresenceStatuses,
} from 'detritus-client/lib/constants.js';
const client = new detritus.ShardClient(getEnv().DISCORD_TOKEN, {
    gateway: {
        autoReconnect: true,
        disabledEvents: [],
        intents: [
            GatewayIntents.GUILDS,
            GatewayIntents.GUILD_MEMBERS,
            GatewayIntents.GUILD_BANS,
            GatewayIntents.GUILD_EMOJIS,
            GatewayIntents.GUILD_INTEGRATIONS,
            GatewayIntents.GUILD_WEBHOOKS,
            GatewayIntents.GUILD_INVITES,
            GatewayIntents.GUILD_VOICE_STATES,
            GatewayIntents.GUILD_PRESENCES,
            GatewayIntents.GUILD_MESSAGES,
            GatewayIntents.GUILD_MESSAGE_REACTIONS,
            GatewayIntents.GUILD_MESSAGE_TYPING,
            GatewayIntents.DIRECT_MESSAGES,
            GatewayIntents.DIRECT_MESSAGE_REACTIONS,
            GatewayIntents.DIRECT_MESSAGE_TYPING,
            GatewayIntents.MESSAGE_CONTENT,
            GatewayIntents.GUILD_SCHEDULED_EVENTS,
            GatewayIntents.AUTO_MODERATION_CONFIGURATION,
            GatewayIntents.AUTO_MODERATION_EXECUTION,
            GatewayIntents.GUILD_MESSAGE_POLLS,
            GatewayIntents.DIRECT_MESSAGE_POLLS,
        ],

        presence: {
            status: PresenceStatuses.IDLE,
            activities: [
                {
                    name: 'you',
                    type: ActivityTypes.LISTENING,
                },
            ],
        },
    },
});
await client.run({ wait: true });
const commandClient = new detritus.CommandClient(client, {
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

const interactionClient = new detritus.InteractionCommandClient(client, {
    checkCommands: true,
});

interactionClient.add({
    name: 'ping',
    description: 'ping command',
    run: (ctx) => {
        log('ping');
        return ctx.editOrRespond({
            content: 'pong',
            flags: MessageFlags.EPHEMERAL,
        });
    },
});
commandClient.add({
    name: 'ping',
    run: (ctx) => {
        return ctx.editOrReply({
            content: 'pong!',
        });
    },
});
await commandClient.run({ wait: true });
await interactionClient.run({ wait: true });
await interactionClient.uploadApplicationCommands();
