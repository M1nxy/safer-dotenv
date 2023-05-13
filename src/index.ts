import { config, DotenvSafeOptions } from "dotenv-safe";

type SafeEnv<T> = { [K in keyof T]: T[K] } & { [key: string]: unknown };

/**
    Parse environment variables from a .env file and return them as a SafeEnv object.
    @param {DotenvSafeOptions} [options] - Optional configuration options.
    @template T - Type of the expected environment variables.
    @returns {SafeEnv<T>} - A SafeEnv object containing the parsed environment variables.
*/
export default <T extends { [key: string]: any }>(
    options?: DotenvSafeOptions
): SafeEnv<T> => {
    let { parsed } = config(options);
    if (!parsed) {
        process.exit(1);
    }

    return Object.fromEntries(
        Object.entries(parsed).map(([key, value]: [string, any]) => {
            if (/^(true|false)$/i.test(value)) {
                value = /^(true)$/i.test(value);
            } else if (!isNaN(value)) {
                value = parseInt(value);
            }
            return [key, value];
        })
    ) as unknown as SafeEnv<T>;
};
