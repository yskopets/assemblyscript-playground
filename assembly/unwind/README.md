# Stack Unwind Example

The goal of this example is to explore behaviour of AssemblyScript
whenever a "trap" occures inside a Wasm module, e.g. as a result of "throw Error" statement.

Sample code consists of a chain of functions, each creating a new object (on the heap)
and calling the next function with that object as parameter.

The terminal function does "throw Error".

The expected behaviour would be that AssemblyScript should do stack unwinding
in that situation and release all objects that are held by variables on the stack.

However, in practice, objects are not released, which results in a memory leack.

## Follow-up

As a follow-up, it's interesting to explore behaviour of C++ in the same situation.
