import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { segments } from '../standard';

export const updateIndexExport = (
    pathWithIndex: string,
    exceptionStrings?: string[],
    isSharedLayer = false
) => {
    const formattedPath = join(pathWithIndex);
    const files = readdirSync(formattedPath);
    const filesForExport = readdirSync(formattedPath).filter(
        (file) => !file.includes('index')
    );
    const index = files.find((file) => file.includes('index'));
    const content = filesForExport
        .filter((file) =>
            exceptionStrings
                ? !exceptionStrings.find((ext) => file.includes(ext))
                : true
        )
        .map((file) => {
            if (!isSharedLayer)
                return segments.includes(file)
                    ? file
                    : file.substring(0, file.lastIndexOf('.'));

            return file;
        })
        .map((file) => `export * from './${file}';\n`)
        .reduce((acc, file) => acc + file);

    if (!index) {
        console.error('No index file found in the dir:', pathWithIndex);
        return;
    }

    writeFileSync(join(formattedPath, index), content);
};
