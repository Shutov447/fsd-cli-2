import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createIndex } from '../index/create-index';
import { segments, sharedSegments } from '../standard';
import { updateIndexExport } from '../index/update-index-export';

export const createSegment = (
    pathToSlice: string,
    segmentName: string,
    withIndex = true,
    isSharedLayer = false
): string => {
    const createdPath = join(pathToSlice, segmentName);

    try {
        if (!isSharedLayer && !segments.includes(segmentName))
            throw new Error(
                `Segment ${segmentName} is not allowed. Use one of them: ${segments}`
            );
        else if (isSharedLayer && !sharedSegments.includes(segmentName))
            throw new Error(
                `Segment in ${segmentName} shared layer is not allowed. Use one of them: ${sharedSegments}`
            );
        else if (!existsSync(createdPath)) {
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
