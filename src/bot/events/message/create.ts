import { CustomEventListener } from '@luna/events/EventListener';
import { GatewayClientEvents } from 'detritus-client';
import { ClientEvents } from 'detritus-client/lib/constants';

@CustomEventListener.applyOptions({
    id: `client.${ClientEvents.PRESENCE_UPDATE}`,
    emitter: 'client',
    event: ClientEvents.PRESENCE_UPDATE,
    type: 'on',
})
export default class MessageCreateEvent extends CustomEventListener {
    run(data: GatewayClientEvents.MessageCreate) {
        data;
    }
}
