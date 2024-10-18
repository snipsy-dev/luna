import { LunaShardClient } from '@luna/clients/ShardClient';
import { CustomEnv } from '@luna/typings';
import { GatewayIntents } from 'detritus-client/lib/constants';
import fs from 'fs';

const env = {} as CustomEnv;

function getEnv() {
    const filedata = fs.readFileSync('./.configs/.env', { encoding: 'utf-8' });
    for (const line of filedata.split('\n')) {
        if (!line.includes('=')) continue;
        const [NAME, ...data] = line.split('=');
        env[NAME as 'DISCORD_TOKEN'] = data.join('=');
    }

    if (!env.DISCORD_TOKEN) {
        throw new Error('no token provided.');
    }
    if (!env.ENV) {
        if ('WSLENV' in process.env) {
            env.ENV = 'dev';
        } else {
            env.ENV = 'beta';
        }
    }
    if (!env.SUPPORT_SERVER) {
        env.SUPPORT_SERVER = '<not provided>';
    }
    return env;
}

const client = new LunaShardClient(getEnv().DISCORD_TOKEN, {
    gateway: {
        loadAllMembers: true,
        guildSubscriptions: true,
        autoReconnect: true,
        shardCount: 1,
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
    },
    cache: {
        applicationEmojis: true,
        applications: true,
        channels: true,
        connectedAccounts: true,
        emojis: true,
        guilds: true,
        guildScheduledEvents: true,
        interactions: true,
        members: true,
        messages: true,
        presences: true,
        relationships: true,
        roles: true,
        sessions: true,
        stageInstances: true,
        stickers: true,
        typings: true,
        users: true,
        voiceCalls: true,
        voiceConnections: true,
        voiceStates: true,
    },
});
async function start() {
    await client.handlers.events.loadAll();
    await client.run({ wait: true });
}
setTimeout(() => start(), 3000);
