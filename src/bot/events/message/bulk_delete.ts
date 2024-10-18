import { CustomEventListener } from '@luna/events/EventListener';
import { GatewayClientEvents } from 'detritus-client';
import { ClientEvents } from 'detritus-client/lib/constants';

@CustomEventListener.applyOptions({
    id: `client.${ClientEvents.MESSAGE_DELETE_BULK}`,
    emitter: 'client',
    event: ClientEvents.MESSAGE_DELETE_BULK,
    type: 'on',
})
export default class MessageBulkDeleteEvent extends CustomEventListener {
    run(data: GatewayClientEvents.MessageDeleteBulk) {
        if (process.env.DEBUG === 'true') {
            console.log(`someone bulk deleted messages in ${data.channelId}`);
        }
    }
}
