declare module '@luna/typings' {
    import { Interaction } from 'detritus-client';
    /**
     * representatives the custom environment properties.
     *
     */
    export interface CustomEnv {
        /**
         * the token to let the bot connect to Discord
         * @required
         */
        DISCORD_TOKEN: string;

        /**
         * the current developer environment.
         * @default 'dev'
         */
        ENV: 'dev' | 'prod' | 'beta';

        /**
         * the support server for the bot.
         *
         */
        SUPPORT_SERVER: string;
    }

    export namespace LunaEvents {
        export interface ListenerHandlerOptions {
            directory: string;
        }
        export interface EventListenerOption {
            emitter: string;
            event: string;
            type: 'on' | 'once';
        }
    }

    export namespace Commands {
        export interface CustomCommandOptions
            extends Interaction.InteractionCommandOptions {
            id: string;
            nsfw?: boolean;
            metadata: CommandMetaData;
        }

        export interface CommandMetaData {
            id: string;
            nsfw?: boolean;
        }
    }
}
