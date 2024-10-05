export async function ximport<T extends Record<string, unknown>>(
    filename: string,
    defaults?: T,
) {
    return import(filename) || defaults;
}
