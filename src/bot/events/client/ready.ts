import { CustomEventListener } from '@luna/events/EventListener';
import { GatewayClientEvents } from 'detritus-client';
import { ClientEvents } from 'detritus-client/lib/constants';

@CustomEventListener.applyOptions({
    id: 'client:gateway_ready',
    emitter: 'client',
    event: ClientEvents.GATEWAY_READY,
    type: 'once',
})
export default class ClusterClientReadyEvent extends CustomEventListener {
    run(data: GatewayClientEvents.GatewayReady) {
        data;
    }
}
