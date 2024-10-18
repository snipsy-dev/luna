import { GuildSettings } from '@prisma/client';
import { Structures } from 'detritus-client';
import { Database } from 'packages/db/db';

export class GuildSettingsModel {
    constructor(protected database: Database) {}

    async create(guild: Structures.Guild) {
        return this.raw.create({
            data: {
                guildId: guild.id,
                prefix: ['.'],
            },
        });
    }

    async get(guild: Structures.Guild) {
        return this.raw.findFirst({ where: { guildId: guild.id } });
    }

    async update(guild: Structures.Guild, data: Partial<GuildSettings>) {
        const existing = await this.get(guild);
        if (!existing) {
            const d = await this.create(guild);
            return this.raw.update({
                where: {
                    MongoId: d.MongoId,
                    guildId: guild.id,
                },
                data: {
                    ...data,
                },
            });
        }
        return this.raw.update({
            where: {
                MongoId: existing.MongoId,
                guildId: guild.id,
            },
            data: {
                ...data,
            },
        });
    }

    async has(guild: Structures.Guild) {
        return this.raw
            .findFirst({ where: { guildId: guild.id } })
            .then((data) => !!data)
            .catch((err) => {
                console.error(err);
                return false;
            });
    }

    get db() {
        return this.database;
    }

    get raw() {
        return this.db.prisma.guildSettings;
    }
}
