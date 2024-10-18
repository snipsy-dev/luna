import { UserSettings } from '@prisma/client';
import { Structures } from 'detritus-client';
import { Database } from 'packages/db/db';

export class UserSettingsModel {
    constructor(protected database: Database) {}

    async create(user: Structures.User) {
        return this.raw.create({
            data: {
                userId: user.id,
            },
        });
    }

    async get(user: Structures.User) {
        return this.raw.findFirst({ where: { userId: user.id } });
    }

    async update(user: Structures.User, data: Partial<UserSettings>) {
        const existing = await this.get(user);
        if (!existing) {
            const d = await this.create(user);
            return this.raw.update({
                where: {
                    MongoId: d.MongoId,
                    userId: user.id,
                },
                data: {
                    ...data,
                },
            });
        }
        return this.raw.update({
            where: {
                MongoId: existing.MongoId,
                userId: user.id,
            },
            data: {
                ...data,
            },
        });
    }

    async has(user: Structures.User) {
        return this.raw
            .findFirst({ where: { userId: user.id } })
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
        return this.db.prisma.userSettings;
    }
}
