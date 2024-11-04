import { Command } from 'commander';
import { setIndexExtension } from '../index/create-index';
import { createLayer } from '../layer/create-layer';
import { createSegments } from '../segment/create-segment';
import { updateUiSegment } from '../segment/update-ui-segment';
import { createSlice } from '../slice/create-slice';
import {
    layersForDescription,
    fsd2Config,
    indexExtensionsForDescription,
    segments,
} from '../standard';
import { findProjectByAlias } from '../utils/find-project';

export const defaultCommand = (program: Command): Command => {
    // INFO: пришлось сделать команду layer/l для дефолтной программы, так как sharedProgram не хочет читать options(то конфликты, то просто не видит их)
    return program
        .command('layer')
        .alias('l')
        .argument('<layer>', `create layer with name: ${layersForDescription}`)
        .argument('<slice>', `create slice with name: \<any-string\>`)
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
        .option(
            '-s --segments [SEGMENTS...]',
            `create segments with names: ${segments}`
        )
        .action((layer, slice, options) => {
            console.log(options);

            const { projectAlias, extension, segments } = options;
            const project = findProjectByAlias(projectAlias);

            if (project) {
                setIndexExtension(extension, project.extension);

                const { path, preset } = project;
                const createdLayerPath = createLayer(path, layer);

                if (createdLayerPath) {
                    const createdSlicePath = createSlice(
                        createdLayerPath,
                        slice
                    );

                    segments && createSegments(createdSlicePath, segments);
                    preset && updateUiSegment(createdSlicePath, preset);
                } else
                    console.error(
                        `Error(default command): creating layer ${createdLayerPath}. Allow: ${layersForDescription}`
                    );
            } else
                console.error(
                    `Project with alias "${projectAlias}" not found.`
                );
        });
};
