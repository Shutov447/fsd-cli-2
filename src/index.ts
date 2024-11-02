#!/usr/bin/env node
'use strict';

import { Command } from 'commander';
import {
    fsd2Config,
    indexExtensions,
    indexExtensionsForDescription,
    layersForDescription,
    segments,
} from './standard';
import { createLayer } from './create-layer';
import { createSlice } from './create-slice';
import { createSegments } from './create-segment';
import { setIndexExtension } from './create-index';
import { updateUiSegment } from './update-ui';

const segmentsForDescription = segments.toString().replace(/,/g, ', ');

const program = new Command();

program.name('fsd2').version('1.0.0').description('fsd files creator.');

program
    .argument('<layer>', `create layer with name: ${layersForDescription}`)
    .argument('<slice>', `create slice with name: \<any-kebab-case-string\>`)
    .option(
        '-p --project-alias [PROJECT_ALIAS]',
        'project where the files will be created',
        fsd2Config.defaultProjectAlias
    )
    .option(
        '-ext --extension [EXTENSION]',
        `extension of index file: ${indexExtensionsForDescription}`
    )
    .option(
        '-s --segments [SEGMENTS...]',
        `create segments with names: ${segmentsForDescription}`
    )
    .action((layer, slice, options) => {
        const alias = options.projectAlias;
        const project = fsd2Config.projects.find((p) => p.alias === alias);

        if (project) {
            const segments = options.segments;
            const ext =
                options.extension && indexExtensions.includes(options.extension)
                    ? options.extension
                    : project.extension;

            setIndexExtension(ext);

            const { path, uiPreset } = project;
            const createdLayer = createLayer(path, layer);
            const createdSlice = createSlice(createdLayer, slice);

            segments && createSegments(createdSlice, segments);
            uiPreset && updateUiSegment(createdSlice, uiPreset);
        } else console.error(`Project with alias "${alias}" not found.`);
    });

program.parse(process.argv);
