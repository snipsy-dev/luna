import { Collections } from 'detritus-client';
import { EventEmitter } from 'node:events';
import { LunaEvents } from '@luna/typings';
import { CustomEventListener } from './EventListener';
import { LunaShardClient } from '@luna/clients/ShardClient';
import { join } from 'node:path';
import { readdir, stat } from 'node:fs/promises';

const FORCE_ERROR = false;

export class ListenerHandler extends EventEmitter {
    modules: Collections.BaseCollection<string, CustomEventListener>;
    emitters: {
        client: LunaShardClient;
    };
    constructor(
        public client: LunaShardClient,
        private options: LunaEvents.ListenerHandlerOptions,
    ) {
        super({ captureRejections: true });
        this.modules = new Collections.BaseCollection();
        this.client = client;
        this.emitters = {
            client: this.client,
        };

        this.on('load', (e: CustomEventListener) => {
            console.log(`loaded ${e.id}`);
        });
    }

    async loadAll() {
        const files = await this.readdirRecursive(this.options.directory);
        for (const file of files) {
            const data = await import(file);

            try {
                if (!data.default?.default) continue;
                const e = new data.default.default() as CustomEventListener;
                if (!e.id) e.id = `${e.emitter}:${e.event}`;

                if (typeof e.run !== 'function') {
                    if (FORCE_ERROR) {
                        throw new Error(
                            `listener ${e.emitter}:${e.event} does not have a run function`,
                        );
                    }
                    e.run = () => void 0;
                }

                if (!(e.emitter in this.emitters)) {
                    if (FORCE_ERROR) {
                        throw new Error(
                            `emitter on does not exist on event ${e.id} `,
                        );
                    }
                    continue;
                }
                e.client = this.client;
                e.listenerHandler = this;
                this.modules.set(e.id, e);

                this.emit('load', e);
                this.emitters[e.emitter as 'client'][e.type || 'on'](
                    e.event,
                    async (...args) => {
                        await this.modules.get(e.id)?.run(...args);
                    },
                );
            } catch (e) {
                console.error(e);
            }
        }
    }

    private async readdirRecursive(directory: string) {
        const result: string[] = [];

        await (async function read(dir) {
            const files = await readdir(dir);

            for (const file of files) {
                const filepath = join(dir, file);

                if ((await stat(filepath)).isDirectory()) {
                    read(filepath);
                } else {
                    result.push(filepath);
                }
            }
        })(directory);

        return result;
    }
}
