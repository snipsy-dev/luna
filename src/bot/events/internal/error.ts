import { CustomEventListener } from '@luna/events/EventListener';
import { ALL_EVENTS, EventData } from '@luna/util/Constants';

@CustomEventListener.applyOptions({
    id: 'client:internal:error',
    emitter: 'client',
    event: ALL_EVENTS.ERROR,
    disabled: true,
    type: 'on',
})
export default class RawEventListener extends CustomEventListener {
    run(data: EventData['Error']) {
        if (data) return;
    }
}
