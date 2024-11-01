import { existsSync, mkdirSync } from 'fs';
import { layers, layersForDescription } from './standard';
import { join } from 'path';
import { createIndex } from './create-index';

export const createLayer = (
    pathToProject: string,
    layerName: string,
    withIndex = false
): string => {
    const newLayerName = layers.find(
        (layer) => layer.name === layerName || layer.aliases.includes(layerName)
    );
    const formattedLayerName = newLayerName?.name;
    let createdPath = '';

    try {
        if (!newLayerName)
            throw new Error(
                `Layer ${layerName} is not allowed. Use one of them: ${layersForDescription}`
            );

        createdPath = join(pathToProject, formattedLayerName!);

        if (!existsSync(createdPath)) {
            mkdirSync(createdPath);
            withIndex && createIndex(createdPath);
        }
    } catch (error) {
        console.error('Error creating layer', error);
    }

    return createdPath;
};
