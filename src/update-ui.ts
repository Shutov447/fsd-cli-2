import { exec } from 'child_process';
import { UiPreset } from './standard';
import { join } from 'path';
import { readdirSync } from 'fs';
import { updateIndexExport } from './update-index-export';

export const updateUi = (
    pathWithUi: string,
    uiPreset: UiPreset
): string | null => {
    const files = readdirSync(pathWithUi);
    const ui = files.find((file) => file.includes('ui'));
    const componentName = pathWithUi.split('\\').at(-1);
    const componentPath = ui ? join(pathWithUi, ui).replace(/\\/g, '/') : null;

    switch (uiPreset) {
        case 'angular': {
            if (componentPath && componentName)
                generateAngularComponent(componentName, componentPath);
            break;
        }
    }

    return componentPath;
};

const generateAngularComponent = (component: string, path: string) => {
    exec(
        `ng g c ${component} --path=${path} --flat`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
                return;
            }
            updateIndexExport(path, ['.css', '.html', '.spec']);
            console.log(`Result: ${stdout}`);
        }
    );
};
