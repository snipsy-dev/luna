import { CustomEventListener } from '@luna/events/EventListener';
// import { Constants } from 'detritus-client';
export default class ShardClientReadyEvent extends CustomEventListener {
    constructor() {
        super({
            emitter: 'shardClient',
            event: 'ready',
            type: 'once',
        });
    }
    run() {}
}
