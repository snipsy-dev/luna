import { CustomEventListener } from '@luna/events/EventListener';
import { REGEXES } from '@luna/util/Constants';
import { GatewayClientEvents } from 'detritus-client';
import { ClientEvents } from 'detritus-client/lib/constants';

@CustomEventListener.applyOptions({
    id: `client.message.${ClientEvents.MESSAGE_CREATE}`,
    emitter: 'client',
    event: ClientEvents.MESSAGE_CREATE,
    type: 'on',
})
export default class MessageCreateEvent extends CustomEventListener {
    async run(data: GatewayClientEvents.MessageCreate) {
        if (data.message.author.bot) return;
        await this.parseProxyCommand(data.message);
    }

    async parseProxyCommand(msg: GatewayClientEvents.MessageCreate['message']) {
        const matches = msg.content.matchAll(REGEXES.PROXY);
        console.log(matches);
        if (matches) {
            const result = matches
                .map((item) => ({
                    character: item[1],
                    message: item[2].replace(/\n$/, ''),
                }))
                .toArray();
            console.log(result);
        }
    }
}
