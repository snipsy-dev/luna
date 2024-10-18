import { ListenerHandler } from '@luna/events/EventListenerHandler';
import { ShardClient } from 'detritus-client';
import path from 'path';
// import { Database } from '@luna/db/db';

export class LunaShardClient extends ShardClient {
    // db: Database = new Database();
    handlers = {
        db: null,
        events: new ListenerHandler(this, {
            directory: path.resolve(
                path.join(process.cwd(), 'dist', 'bot', 'events'),
            ),
        }),
    };
}
