import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createIndex } from './create-index';

export const createSlice = (
    pathToLayer: string,
    sliceName: string,
    withIndex = true
): string => {
    const createdPath = join(pathToLayer, sliceName);

    try {
        if (!existsSync(createdPath)) {
            mkdirSync(createdPath);
            withIndex && createIndex(createdPath);
            console.log('slice created');
        } else console.log('slice already exists');
    } catch (err) {
        console.error(`Error creating slice: ${err}`);
    }

    return createdPath;
};
