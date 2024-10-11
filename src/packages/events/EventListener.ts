import { LunaClient } from 'packages/LunaClient';
import { ListenerHandler } from './ListenerHandler';

export class CustomEventListener {
    declare client: LunaClient;
    declare listenerHandler: ListenerHandler;
}
