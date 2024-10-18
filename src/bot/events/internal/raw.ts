import { CustomEventListener } from '@luna/events/EventListener';
import { GatewayClientEvents } from 'detritus-client';

@CustomEventListener.applyOptions({
    id: 'client:raw',
    emitter: 'client',
    event: 'raw',
    type: 'on',
})
export default class RawEventListener extends CustomEventListener {
    run(data: GatewayClientEvents.Raw) {
        data;
    }
}
