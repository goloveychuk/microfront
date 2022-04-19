import { createScope } from './lib.mjs';
import {DepSymb} from './dep.mjs'


const { resolve} = createScope('mod', { level: 1 });


const dep = await resolve(DepSymb);



dep.foo();

