# FSD-CLI-2 - cli for generate structures for Feature-Sliced Design

### Installation:

```
npm i -D fsd-cli-2
```

### How to use:

### 1. Create `fsd-cli2.config.json` in root directory (necessarily in the same directory as `angular.json` if `UiPreset: angular`). For example:

```json
{
    "defaultProjectAlias": "tp", // need to not specify the --project flag.
    "projects": [
        {
            "path": "test-project/src", // folder where the structures will be generated.
            "alias": "tp", // alias to be set in defaultProjectAlias.
            "extension": "ts",
            "uiPreset": "angular" // optional, there is no default preset, only support for generating the angular component yet.
        },
        {
            "path": "some/new-project",
            "alias": "np",
            "extension": "js"
        }
    ],
    // fsd2 --help for more info: default layers, slice, segments etc.
    "customLayers": [{ "name": "example-layer", "aliases": ["el"] }], // optional
    "customSegments": ["example-segment"], // optional
    "customSharedSegments": ["css"] // optional
}
```

```
\---root
    |   angular.json (если "UiPreset: angular")
    |   fsd-cli2.config.json
    |
    \---src
```

### 2. Command.

full:

```
fsd2 entities my-message --segments ui lib api --project-alias=tp --extension=ts
```

shorter:

```
fsd2 e my-message -s ui lib api -p my-project-alias -ext ts
```

even shorter (takes info from config):

```
fsd2 e my-message -s ui lib api
```

generated structure:

```
\---src
    \---entities
        \---my-message
            |   index.ts
            |
            +---api
            |       index.ts
            |
            +---lib
            |       index.ts
            |
            \---ui
                    index.ts
                    my-message.component.css
                    my-message.component.html
                    my-message.component.spec.ts
                    my-message.component.ts
```

and automatically updates the re-exports in the indexes.

### 3. Special command to create segments in the shared layer:

```
fsd2 shared|sh ui component|c button
```

generated structure:

```
\---src
    \---shared
        \---ui
            |   index.ts
            |
            \---button
                    button.component.css
                    button.component.html
                    button.component.spec.ts
                    button.component.ts
                    index.ts
```

Creates ui segment in the shared layer, and button in the component without --flat.
Only autogenerate components in the ui segment yet.
