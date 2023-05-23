/* eslint no-console: 0 */  // --> off console.log errors

export const errorHandle = (error: unknown): void => {
    if (error instanceof Error) {
        console.log(`${error.name}: ${error.message}`);
    } else {
        console.log('Unknown error: Unknown error occured');
    }
}
