import { fsd2Config } from '../standard';

export const findProjectByAlias = (projectAlias: string) => {
    return fsd2Config.projects.find((p) => p.alias === projectAlias);
};
