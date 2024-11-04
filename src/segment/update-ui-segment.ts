import { Preset } from '../standard';
import { join } from 'path';
import { readdirSync } from 'fs';
import { generateAngularComponent } from './preset/ui/angular';

export const updateUiSegment = (
    pathWithUi: string,
    preset: Preset,
    withComponentName?: string
): string | null => {
    const files = readdirSync(pathWithUi);
    const ui = files.find((file) => file.includes('ui'));
    const componentName = withComponentName || pathWithUi.split('\\').at(-1);
    const componentPath = ui ? join(pathWithUi, ui).replace(/\\/g, '/') : null;

    switch (preset) {
        case 'angular': {
            if (componentPath && componentName)
                generateAngularComponent(
                    componentName,
                    componentPath,
                    !withComponentName
                );
            break;
        }
    }

    return componentPath;
};
