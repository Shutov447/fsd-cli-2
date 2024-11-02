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
    indexExtensions,
} from '../standard';

export const defaultCommand = (program: Command) => {
    return program
        .argument('<layer>', `create layer with name: ${layersForDescription}`)
        .argument(
            '<slice>',
            `create slice with name: \<any-kebab-case-string\>`
        )
        .option(
            '-pa --project-alias [PROJECT_ALIAS]',
            'project where the files will be created',
            fsd2Config.defaultProjectAlias
        )
        .option(
            '-ext --extension [EXTENSION]',
            `extension of index file: ${indexExtensionsForDescription}`
        )
        .option(
            '-s --segments [SEGMENTS...]',
            `create segments with names: ${segments}`
        )
        .action((layer, slice, options) => {
            const alias = options.projectAlias;
            const project = fsd2Config.projects.find((p) => p.alias === alias);

            if (project) {
                const segments = options.segments;
                const ext =
                    options.extension &&
                    indexExtensions.includes(options.extension)
                        ? options.extension
                        : project.extension;
                setIndexExtension(ext);

                const { path, uiPreset } = project;
                const createdLayerPath = createLayer(path, layer);
                const createdSlicePath = createSlice(createdLayerPath, slice);

                segments && createSegments(createdSlicePath, segments);
                uiPreset && updateUiSegment(createdSlicePath, uiPreset);
            } else console.error(`Project with alias "${alias}" not found.`);
        });
};
