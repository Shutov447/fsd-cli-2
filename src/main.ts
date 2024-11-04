#!/usr/bin/env node
'use strict';

import { Command } from 'commander';
import { defaultCommand } from './command/default';
import { sharedCommand } from './command/shared';

const program = new Command();

program.name('fsd2').version('1.2.1').description('fsd files creator.');

// TODO: наверное займусь этим когда из армии вернусь(0(
// INFO: https://www.npmjs.com/package/commander/v/5.1.0
// program.command('app').argument().action(() => {
//     console.log('in app'); // app/core/<myComponent>, app/config/[CONFIGS...]
// });

defaultCommand(program);
sharedCommand(program);

program.parse(process.argv);
