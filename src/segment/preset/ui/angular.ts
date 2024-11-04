import { exec } from 'child_process';
import { join } from 'path';
import { createIndex } from '../../../index/create-index';
import { updateIndexExport } from '../../../index/update-index-export';

const exceptionStrings = ['.css', '.html', '.spec'];

export const generateAngularComponent = (
    component: string,
    path: string,
    isFlat: boolean
) => {
    const componentPath = path.replace(/\\/g, '/');

    exec(
        `ng g c ${component} --path=${componentPath} ${isFlat ? '--flat' : ''}`,
        (error, stdout, stderr) => {
            if (error) console.error(`Error: ${error.message}`);
            else if (stderr) console.error(`Error: ${stderr}`);
            else {
                if (isFlat) {
                    updateIndexExport(componentPath, exceptionStrings);
                    console.log(stdout);
                } else {
                    const pathToComponent = join(componentPath, component);
                    createIndex(pathToComponent);
                    updateIndexExport(pathToComponent, exceptionStrings);
                    updateIndexExport(componentPath, undefined, true);
                    console.log(stdout);
                }
            }
        }
    );
};
