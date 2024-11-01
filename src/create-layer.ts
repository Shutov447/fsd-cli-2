import { existsSync, mkdirSync } from 'fs';
import { layers } from './standard';
import { join } from 'path';
import { createIndex } from './create-index';

export const createLayer = (
    pathToProject: string,
    layerName: string,
    withIndex = false
): string => {
    const createdPath = join(pathToProject, layerName);

    try {
        if (!layers.includes(layerName))
            throw new Error(
                `Layer ${layerName} is not allowed. Use one of them: ${layers}`
            );

        if (!existsSync(createdPath)) {
            mkdirSync(createdPath);
            withIndex && createIndex(createdPath);
            console.log('layer created');
        } else console.log('layer already exists');
    } catch (error) {
        console.error('Error creating layer', error);
    }

    return createdPath;
};
