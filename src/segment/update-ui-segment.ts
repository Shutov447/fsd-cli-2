import { UiPreset } from '../standard';
import { join } from 'path';
import { readdirSync } from 'fs';
import { generateAngularComponent } from './ui-preset/angular';

export const updateUiSegment = (
    pathWithUi: string,
    uiPreset: UiPreset,
    withComponentName?: string
): string | null => {
    const files = readdirSync(pathWithUi);
    const ui = files.find((file) => file.includes('ui'));
    const componentName = withComponentName || pathWithUi.split('\\').at(-1);
    const componentPath = ui ? join(pathWithUi, ui).replace(/\\/g, '/') : null;

    switch (uiPreset) {
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
