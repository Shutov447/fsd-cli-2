import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createIndex } from './create-index';
import { segments } from './standard';

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
            console.log('segment created');
        } else console.log('segment already exists');
    } catch (err) {
        console.error(`Error creating segment: ${err}`);
    }

    return createdPath;
};
