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

    abstract run(...args: any[]): any;

    static applyOptions(options: CustomEventListenerOptions) {
        return (cls: any): any => {
            class T extends cls {
                constructor(...opts: any) {
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
