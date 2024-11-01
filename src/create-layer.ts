import { existsSync, mkdirSync } from 'fs';
import { layers, layersForDescription } from './standard';
import { join } from 'path';
import { createIndex } from './create-index';

export const createLayer = (
    pathToProject: string,
    layerName: string,
    withIndex = false
): string => {
    const formattedLayerName = layers.find(
        (layer) => layer.name === layerName || layer.aliases.includes(layerName)
    )?.name;
    let createdPath = '';

    try {
        if (
            !layers.find(
                (layer) =>
                    layer.name === layerName ||
                    layer.aliases.includes(layerName)
            )
        )
            throw new Error(
                `Layer ${layerName} is not allowed. Use one of them: ${layersForDescription}`
            );

        createdPath = join(pathToProject, formattedLayerName!);

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
