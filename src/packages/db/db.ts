import { PrismaClient } from '@prisma/client';
import { UserSettingsModel } from './models/users/settings';
import { GuildSettingsModel } from './models/guilds/settings';
import { LunaShardClient } from '@luna/clients/ShardClient';
import { SessionModel } from './models/internal/sessions';

export class Database {
    prisma: PrismaClient = new PrismaClient();
    users = {
        settings: new UserSettingsModel(this),
    };

    guilds = {
        settings: new GuildSettingsModel(this),
    };
    internal = {
        sessions: new SessionModel(this),
    };

    constructor(public client: LunaShardClient) {}
}
