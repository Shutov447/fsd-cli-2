import { Command } from 'commander';
import { setIndexExtension } from '../index/create-index';
import { createLayer } from '../layer/create-layer';
import {
    sharedSegmentsForDescription,
    angularEntitiesForDescription,
    fsd2Config,
    indexExtensionsForDescription,
    indexExtensions,
    allNgEntities,
    ngComponentEntity,
} from '../standard';
import { createSlice } from '../slice/create-slice';
import { generateAngularComponent } from '../segment/ui-preset/angular';

export const sharedCommand = (program: Command) => {
    program
        .command('shared')
        .alias('sh')
        .argument(
            '<SEGMENT>',
            `create segment: ${sharedSegmentsForDescription}`
        )
        .argument(
            '<ANGULAR-ENTITY>',
            `angular entity: ${angularEntitiesForDescription}`
        )
        .argument(
            '<ANGULAR-ENTITY-NAME>',
            'angular entity name: <any-kebab-case-string>'
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
        .action((segment, ngEntity, ngEntityName, options) => {
            // INFO: есть специальные сегменты для shared - sharedSegments
            const project = fsd2Config.projects.find(
                (p) => p.alias === options.projectAlias
            );

            if (project) {
                const { path, uiPreset } = project;
                const ext =
                    options.extension &&
                    indexExtensions.includes(options.extension)
                        ? options.extension
                        : project.extension;
                const allowEntity = allNgEntities.find(
                    (entity) => entity === ngEntity
                );

                if (!allowEntity) {
                    console.error(
                        `Error: wrong angular command: ${ngEntity}. Use one of them: ${allNgEntities}`
                    );
                    return;
                }

                const isAngularComponent =
                    segment === 'ui' &&
                    uiPreset === 'angular' &&
                    allowEntity &&
                    ngComponentEntity.includes(allowEntity);

                if (isAngularComponent) {
                    setIndexExtension(ext);
                    const createdLayerPath = createLayer(path, 'shared');
                    const createdSegmentPath = createSlice(
                        createdLayerPath,
                        segment
                    );
                    generateAngularComponent(
                        ngEntityName,
                        createdSegmentPath,
                        false
                    );
                } else {
                    console.error(
                        `Error: Components in the shared layer can only be created in ui, but there was an attempt to create a ${ngEntityName} component in the ${segment} segment.`
                    );
                }
            }
        });
};
