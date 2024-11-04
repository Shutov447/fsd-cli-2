import { readFileSync } from 'node:fs';

export type Extension = 'ts' | 'js';
export interface ILayer {
    name: string;
    aliases: string[];
}
export interface AngularEntity extends ILayer {}
export type Preset = 'angular' | 'react' | 'vue'; // INFO: Only Angular support yet
export interface IFSD2 {
    defaultProjectAlias: string;
    projects: readonly {
        path: string;
        alias: string;
        extension: Extension;
        preset?: Preset;
    }[];
    customLayers?: readonly ILayer[];
    customSegments?: readonly string[];
    customSharedSegments?: readonly string[];
}

export const ngComponentEntity = ['component', 'c'];
export const allNgEntities = [...ngComponentEntity];

export const indexExtensions: readonly Extension[] = ['ts', 'js'];
export const presets: readonly Preset[] = ['angular', 'react', 'vue'];
export const fsd2ConfigFileName = 'fsd-cli2.config.json';
export const fsd2Config: IFSD2 = JSON.parse(
    readFileSync(fsd2ConfigFileName).toString()
);

export const standardLayers: readonly ILayer[] = [
    {
        name: 'app',
        aliases: [],
    },
    {
        name: 'pages',
        aliases: ['p'],
    },
    {
        name: 'widgets',
        aliases: ['w'],
    },
    {
        name: 'features',
        aliases: ['f'],
    },
    {
        name: 'entities',
        aliases: ['e'],
    },
    {
        name: 'shared',
        aliases: ['sh'],
    },
];
export const standardSegments: readonly string[] = ['ui', 'api', 'lib'];

export const layers: readonly ILayer[] = [
    ...standardLayers,
    ...(fsd2Config?.customLayers || []),
];
export const segments: readonly string[] = [
    ...standardSegments,
    ...(fsd2Config?.customSegments || []),
];
export const sharedSegments = [
    ...segments,
    ...(fsd2Config?.customSharedSegments || []),
];

export const layersForDescription = layers.reduce(
    (prevV, curV, i) =>
        i === 0
            ? `${curV.name}[${curV.aliases}]`
            : `${prevV} | ${curV.name}[${curV.aliases}]`,
    ''
);
export const angularEntitiesForDescription = allNgEntities.reduce(
    (acc, entity, i) => (i === 0 ? entity : `${acc} | ${entity}`),
    ''
);
export const indexExtensionsForDescription = indexExtensions.reduce(
    (acc, ext, i) => (i === 0 ? ext : `${acc} | ${ext}`),
    ''
);
export const sharedSegmentsForDescription = [
    ...segments,
    ...(fsd2Config.customSharedSegments || []),
].reduce((acc, curS, i) => (i === 0 ? curS : `${acc} | ${curS}`), '');
