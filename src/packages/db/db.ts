import { PrismaClient } from '@prisma/client';
import { UserSettingsModel } from './models/users/settings';
import { GuildSettingsModel } from './models/guilds/settings';

export class Database {
    prisma: PrismaClient = new PrismaClient();
    users = {
        settings: new UserSettingsModel(this),
    };

    guilds = {
        settings: new GuildSettingsModel(this),
    };
}
