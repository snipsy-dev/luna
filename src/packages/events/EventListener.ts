import { LunaClient } from '@luna/clients/LunaClient';
import { ListenerHandler } from './ListenerHandler';
import * as typings from '@luna/typings';
export class CustomEventListener
    implements typings.LunaEvents.EventListenerOption
{
    emitter: string;
    event: string;
    type: 'on' | 'once';
    declare client: LunaClient;
    declare listenerHandler: ListenerHandler;
    constructor(options: typings.LunaEvents.EventListenerOption) {
        this.emitter = options.emitter;
        this.event = options.event;
        this.type = options.type;
    }
}
