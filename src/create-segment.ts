import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createIndex } from './create-index';
import { segments } from './standard';
import { updateIndexExport } from './update-index-export';

export const createSegment = (
    pathToSlice: string,
    segmentName: string,
    withIndex = true
): string => {
    const createdPath = join(pathToSlice, segmentName);

    try {
        if (!segments.includes(segmentName))
            throw new Error(
                `Segment ${segmentName} is not allowed. Use one of them: ${segments}`
            );

        if (!existsSync(createdPath)) {
            mkdirSync(createdPath);
            withIndex && createIndex(createdPath);
        }
    } catch (err) {
        console.error(`Error creating segment: ${err}`);
    }

    return createdPath;
};

export const createSegments = (
    pathSlice: string,
    segments: string[]
): string[] => {
    const createdSegments: string[] = [];

    (segments as string[]).forEach((segment) => {
        createdSegments.push(createSegment(pathSlice, segment));
    });
    updateIndexExport(pathSlice);

    return createdSegments;
};
