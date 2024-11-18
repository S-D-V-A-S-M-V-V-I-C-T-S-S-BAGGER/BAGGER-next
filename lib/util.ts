import {Buffer} from "node:buffer";

export function decodeBase64(data: string | undefined): string | undefined {
    if (data === undefined) return undefined;
    return Buffer.from(data, 'base64').toString('utf8');
}
