import { ListenerHandler } from '@luna/events/ListenerHandler';
import { ClusterClient } from 'detritus-client';
import { resolve } from 'path';

export class LunaClient extends ClusterClient {
    listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: resolve(process.cwd(), 'dist', 'events'),
    });
}
