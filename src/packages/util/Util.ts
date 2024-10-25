import { EventData } from './Constants';

export function createError(error: Error, ctx: EventData['Error']['ctx']) {
    return {
        error,
        ctx,
    };
}
