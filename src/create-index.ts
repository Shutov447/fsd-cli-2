import { writeFileSync } from 'fs';
import { Extension } from './standard';

let globalExtension: Extension = 'ts';
let globalContent = '';

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
        if (extension && !['ts', 'js'].includes(extension))
            throw new Error(
                `Invalid extension: ${extension}, but must be 'ts' | 'js'`
            );

        const path = `${pathToDir}/index.${extension || globalExtension}`;

        writeFileSync(path, content || globalContent);
        console.log(`Index file created at ${path}`);
    } catch (err) {
        console.error(err);
    }
};
