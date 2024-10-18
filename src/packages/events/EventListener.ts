import { LunaShardClient } from '@luna/clients/ShardClient';
import { ListenerHandler } from './EventListenerHandler';
interface CustomEventListenerOptions {
    id: string;
    disabled?: boolean;
    event: string;
    emitter: string;
    type: 'once' | 'on';
}
export abstract class CustomEventListener
    implements CustomEventListenerOptions
{
    declare client: LunaShardClient;
    declare listenerHandler: ListenerHandler;
    disabled?: boolean | undefined;
    id: string;
    event: string;
    emitter: string;
    type: 'once' | 'on';
    constructor(options: CustomEventListenerOptions) {
        this.event = options.event;
        this.emitter = options.emitter;
        this.type = options.type;
        this.id = options.id;
        this.disabled =
            typeof options.disabled !== 'undefined' ? options.disabled : false;
    }

    abstract run(...args: unknown[]): unknown;

    static applyOptions(options: CustomEventListenerOptions) {
        //eslint-disable-next-line
        return (cls: any): any => {
            class T extends cls {
                constructor(opts: CustomEventListenerOptions) {
                    super({
                        ...opts,
                        ...options,
                    });
                }
            }
            return T;
        };
    }

    toString() {
        return `Listener<${this.id}>`;
    }
}
