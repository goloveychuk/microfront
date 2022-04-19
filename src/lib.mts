export type Symb<T> = {
  symb: symbol;
  ___brandType: T;
};

export function createSymb<T>(name: string): Symb<T> {
  return {
    symb: Symbol(name),
    ___brandType: undefined as any,
  };
}
interface Reg {
  promise: Promise<unknown>;
  resolve: (d: unknown) => void;
}
const REG = new Map<symbol, Reg>();

export function createScope(name: string, data: { level: number }) {
  function setPromise(symb: Symb<unknown>) {
    let data = REG.get(symb.symb)
    if (data === undefined) {
      let resolve!: (r: unknown) => void;
      const promise = new Promise((_resolve) => {
        resolve = _resolve;
      });
      
      data = { resolve, promise }
      REG.set(symb.symb, data); //check dubl
    }
    return data
  }
  function resolve<T>(symb: Symb<T>): Promise<T> {
    const data = setPromise(symb);
    return data.promise as Promise<T>
  }

  function provide<T>(symb: Symb<T>, val: T): void {
    const data = setPromise(symb);
    data.resolve(val)
  }

  return { resolve, provide };
}
export function compose<T>(obj: { [K in keyof T]: Symb<T[K]> }): Symb<T> {
  return undefined as any;
}
