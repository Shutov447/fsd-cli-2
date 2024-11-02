import { writeFileSync } from 'fs';
import {
    Extension,
    indexExtensions,
    indexExtensionsForDescription,
} from '../standard';

let globalExtension: Extension = 'ts';
let globalContent = "export * from './';";

export const setIndexExtension = (ext: Extension) => {
    globalExtension = ext;
};
export const setIndexContent = (content: string) => {
    globalContent = content;
};

export const createIndex = (
    pathToDir: string,
    extension?: Extension,
    content?: string
) => {
    try {
        if (extension && !indexExtensions.includes(extension))
            throw new Error(
                `Invalid extension: ${extension}, but must be: ${indexExtensionsForDescription}`
            );

        const path = `${pathToDir}/index.${extension || globalExtension}`;
        writeFileSync(path, content || globalContent);
    } catch (err) {
        console.error(err);
    }
};
