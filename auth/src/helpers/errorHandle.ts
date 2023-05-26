/* eslint no-console: 0 */  // --> off console.log errors

export const errorHandle = (error: unknown): string => {
    if (error instanceof Error) return `${error.name}: ${error.message}`;
    return 'Unknown error: Unknown error occured';
}
