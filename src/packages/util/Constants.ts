import { ClientEvents } from 'detritus-client/lib/constants';
export const ALL_EVENTS = {
    ...ClientEvents,
    ERROR: 'error',
    INFO: 'info',
};

export interface EventData {
    Error: {
        error: Error;
        ctx: {
            by: 'USER' | 'INTERACTION' | 'COMMAND' | 'OTHER';
        };
    };
}
