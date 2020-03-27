@global
export const ASC_RTRACE = 1;

@global
function abort(
    message?: string | null,
    fileName?: string | null,
    lineNumber?: u32,
    columnNumber?: u32
): void {}

class A {
  name: string
}

class B {
  age: u8
}  

class C {
  male: bool
}    

class D {
}      

class E {
}      

function grand_parent(d: D): void {
  let c = new C()
  parent(c);
}

function parent(c: C): void {
  let b = new B();
  child(b);
}

function child(b: B): void {
  let a = new A();
  throw 1; 
}

export function run(): void {
  let e = new E()

  let d = new D()
  grand_parent(d)    
}

class F {}
new F()
