import { Collections } from 'detritus-client';
import { EventEmitter } from 'node:events';
import { LunaEvents } from '@luna/typings';
import { CustomEventListener } from './EventListener';
import { LunaClient } from 'packages/LunaClient';
import { join } from 'node:path';
import { readdir, stat } from 'node:fs/promises';

export class ListenerHandler extends EventEmitter {
    modules: Collections.BaseCollection<string, CustomEventListener>;

    constructor(
        public client: LunaClient,
        private options: LunaEvents.ListenerHandlerOptions,
    ) {
        super({ captureRejections: true });
        this.modules = new Collections.BaseCollection();
        this.client = client;
    }

    async loadAll() {
        const files = await this.readdirRecursive(this.options.directory);

        for (const file of files) {
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
