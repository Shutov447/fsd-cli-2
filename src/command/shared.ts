import { Command } from 'commander';
import { createIndex, setIndexExtension } from '../index/create-index';
import { createLayer } from '../layer/create-layer';
import {
    sharedSegmentsForDescription,
    fsd2Config,
    indexExtensionsForDescription,
    presets,
} from '../standard';
import { generateAngularComponent } from '../segment/preset/ui/angular';
import { createSegment } from '../segment/create-segment';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { updateIndexExport } from '../index/update-index-export';
import { findProjectByAlias } from '../utils/find-project';

export const sharedCommand = (program: Command): Command => {
    return program
        .command('shared')
        .alias('sh')
        .argument(
            '<SEGMENT>',
            `create segment: ${sharedSegmentsForDescription}`
        )
        .argument('<ENTITY-NAME>', 'entity name: <any-string>')
        .option(
            '-pa --project-alias [PROJECT_ALIAS]',
            'project where the files will be created',
            fsd2Config.defaultProjectAlias
        )
        .option(
            '-ext --extension [EXTENSION]',
            `extension of index file: ${indexExtensionsForDescription}`,
            findProjectByAlias(fsd2Config.defaultProjectAlias)?.extension
        )
        .action((segment, entityName, options) => {
            const { projectAlias, extension } = options;
            const project = findProjectByAlias(projectAlias);
            console.log(options);
            if (project) {
                setIndexExtension(extension, project.extension);

                const { path, preset } = project;
                const createdLayerPath = createLayer(path, 'shared');

                const createdSegmentPath = createSegment(
                    createdLayerPath!,
                    segment,
                    true,
                    true
                );
                createSharedEntity(createdSegmentPath, entityName);

                switch (preset) {
                    case 'angular':
                        switch (segment) {
                            case 'ui':
                                generateAngularComponent(
                                    entityName,
                                    createdSegmentPath,
                                    false
                                );
                                break;
                        }
                        break;
                    default:
                        console.error(
                            `Error: wrong ui preset: ${preset}. Use one of them: ${presets}`
                        );
                        break;
                }
            }
        });
};

const createSharedEntity = (
    pathToSegment: string,
    entityName: string,
    withIndex = true
) => {
    const createdPath = join(pathToSegment, entityName);

    try {
        if (!existsSync(createdPath)) {
            mkdirSync(createdPath);
            withIndex && createIndex(createdPath);
            updateIndexExport(pathToSegment, undefined, true);
        }
    } catch (err) {
        console.error(`Error creating shared entity: ${err}`);
    }

    return createdPath;
};
