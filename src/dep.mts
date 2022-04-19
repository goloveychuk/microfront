import { sleep } from "./utils.mjs";
import { compose, createScope, createSymb } from "./lib.mjs"


const { resolve, provide } = createScope('dep', { level: 1 });

interface Dep {
  foo: () => string;
}

interface Bar {
  bar: () => string;
}

export const DepSymb = createSymb<Dep>('Dep');



export const entrypoint = async () => {
  await sleep(300)
  provide(DepSymb, {foo: () => {
    console.log('dep.foo()')
  }})
}

