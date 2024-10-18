import { CustomEventListener } from '@luna/events/EventListener';
import { GatewayClientEvents } from 'detritus-client';
import { ClientEvents } from 'detritus-client/lib/constants';

@CustomEventListener.applyOptions({
    id: `client.${ClientEvents.MESSAGE_UPDATE}`,
    emitter: 'client',
    event: ClientEvents.MESSAGE_UPDATE,
    type: 'on',
})
export default class MessageCreateEvent extends CustomEventListener {
    run(data: GatewayClientEvents.MessageUpdate) {
        data;
    }
}
