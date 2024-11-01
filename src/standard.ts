import { readFileSync } from 'node:fs';

export type Extension = 'ts' | 'js';
export interface ILayer {
    name: string;
    aliases: string[];
}
export type UiPreset = 'angular' | 'react' | 'vue'; // INFO: Only Angular support yet
export interface IFSD2 {
    defaultProjectAlias: string;
    projects: readonly {
        path: string;
        alias: string;
        extension: Extension;
        uiPreset?: UiPreset;
    }[];
    customLayers?: readonly ILayer[];
    customSegments?: readonly string[];
}

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
// export const standardLayers: readonly string[] = [
//     // TODO: сделать алиасы к слоям: e, f, sh и тд
//     'app', // TODO: сделать исключение, что там могут быть только core и конфиг папки (в самом конфиге можно указать кастомные папки)
//     'pages',
//     'widgets',
//     'features',
//     'entities',
//     'shared', // TODO:  сделать исключение, что там могут быть только сегменты
// ];
export const standardSegments: readonly string[] = ['ui', 'api', 'lib'];

export const layers: readonly ILayer[] = [
    ...standardLayers,
    ...(fsd2Config?.customLayers || []),
];
export const segments: readonly string[] = [
    ...standardSegments,
    ...(fsd2Config?.customSegments || []),
];

export const layersForDescription = layers.reduce(
    (prevV, curV, i) =>
        i === 0
            ? `${curV.name}[${curV.aliases}]`
            : `${prevV} | ${curV.name}[${curV.aliases}]`,
    ''
);
