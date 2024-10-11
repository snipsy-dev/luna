import { Collections } from 'detritus-client';
import { EventEmitter } from 'node:events';
import { LunaEvents } from '@luna/typings';
import { CustomEventListener } from './EventListener';
import { LunaClient } from '@luna/clients/LunaClient';
import { join } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import { ximport } from '@luna/util/util';
export class ListenerHandler extends EventEmitter {
    modules: Collections.BaseCollection<string, CustomEventListener>;
    emitters: Collections.BaseCollection<string, EventEmitter>;

    constructor(
        public client: LunaClient,
        private options: LunaEvents.ListenerHandlerOptions,
    ) {
        super({ captureRejections: true });
        this.modules = new Collections.BaseCollection();
        this.client = client;
        this.emitters = new Collections.BaseCollection();

        this.on('load', (listener) => {
            console.log(`loaded listener ${listener}`);
        });
    }

    public addDefaultListeners() {
        this.setEmitters({
            shardClient: this.client,
            listenerHandler: this,
        });
    }

    public setEmitters(emitters: Record<string, EventEmitter>) {
        for (const [name, emitter] of Object.entries(emitters)) {
            this.setEmitter(name, emitter);
        }
    }

    public setEmitter(name: string, emitter: EventEmitter) {
        this.emitters.set(name, emitter);
    }

    async loadAll() {
        const files = await this.readdirRecursive(this.options.directory);
        for (const file of files) {
            if (!file) continue;
            const data = await ximport<{
                default: { default: typeof CustomEventListener };
            }>(file);
            if (!data) continue;
            //@ts-ignore
            const listener = new data.default.default();

            listener.client = this.client;
            listener.listenerHandler = this;

            if (!this.emitters.has(listener.emitter)) {
                throw new Error(
                    `Emitter with the name "${listener.emitter}" is unknown`,
                    { cause: 'ListenerHandlerLoad' },
                );
            }
            this.emitters
                .get(listener.emitter)!
                [listener.type](listener.event, async (...data) => {
                    await Reflect.get(listener, 'run')(...data);
                });
            this.emit('load', listener);
        }
    }

    private async readdirRecursive(directory: string) {
        const result: string[] = [];

        await (async function read(dir) {
            const files = await readdir(dir);
            for (const file of files) {
                const filepath = join(dir, file);

                if ((await stat(filepath)).isDirectory()) {
                    await read(filepath);
                } else {
                    result.push(filepath);
                }
            }
        })(directory);

        return result;
    }
}
