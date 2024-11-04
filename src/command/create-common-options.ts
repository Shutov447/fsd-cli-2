import { Command } from 'commander';
import { fsd2Config, indexExtensionsForDescription } from '../standard';
import { findProjectByAlias } from '../utils/find-project';

export const createCommonOptions = (program: Command): Command => {
    return program
        .option(
            '-pa --project-alias [PROJECT_ALIAS]',
            'project where the files will be created',
            fsd2Config.defaultProjectAlias
        )
        .option(
            '-ext --extension [EXTENSION]',
            `extension of index file: ${indexExtensionsForDescription}`,
            findProjectByAlias(fsd2Config.defaultProjectAlias)?.extension
        );
};
