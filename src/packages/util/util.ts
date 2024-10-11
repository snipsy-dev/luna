export async function ximport<T extends Record<string, unknown>>(
    filename: string,
    defaults?: T,
) {
    return import(filename) || defaults;
}
export async function wait(seconds: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}
