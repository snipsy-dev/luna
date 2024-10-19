import { Database } from '@luna/db/db';
import { createError } from '@luna/util/Util';
export class SessionModel {
    constructor(protected database: Database) {}

    async create(sessionId: string, clientId: string) {
        return this.raw.create({
            data: {
                sessionId,
                clientId,
            },
        });
    }

    async get(sessionId: string) {
        return this.raw.findFirst({ where: { sessionId: sessionId } });
    }

    async has(sessionId: string) {
        return this.raw
            .findFirst({ where: { sessionId } })
            .then((data) => !!data)
            .catch((err) => {
                this.db.client.emit('error', createError(err, { by: 'OTHER' }));
                return false;
            });
    }

    get db() {
        return this.database;
    }

    get raw() {
        return this.db.prisma.sessions;
    }
}
