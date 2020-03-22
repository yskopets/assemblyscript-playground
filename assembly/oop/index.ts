
/**
 * @fileoverview Explore OOP patterns in AssemblyScript.
 * @license Apache-2.0
 */

 /**
  * Apparenty, AssemblyScript doesn't support interfaces.
  * 
  * The workaround is to use abstract classes.
  */
abstract class Shape {

  /** Test method w/ a parameter. */
  abstract draw(name: string): string;

  /** Test method w/o parameters. */
  abstract toString(): string;
}

class Circle extends Shape {

  draw(name: string): string {
    return `Hi ${name}! from Circle`;
  }    

  toString(): string {
    return "[object Circle]";
  }
}

class Rectangle extends Shape {

  draw(name: string): string {
    return `Hey ${name}! from Rectangle`;
  }

  toString(): string {
    return "[object Rectangle]";
  }
}

/**
 * Apparenty, AssemblyScript doesn't support virtual dispatch.
 * 
 * The workaround is to implement virtual dispatch table manually, i.e.
 * manually pick methods that should be called on a given object.
 * 
 * So, instead of using a Shape one would need to use a ShapeRef
 * which essentially holds a virtual dispatch table for a given object.
 * 
 * Although AssemblyScript doesn't support closures,
 * anonymous functions can capture generic type parameters
 * of the enclosing function.
 */
// @ts-ignore: decorator
@sealed
class ShapeRef extends Shape {

  /**
   * Use a method with a generic type parameter to capture a subclass
   * to which virtual methods should be dispatched to.
   * 
   * For each unique type parameter, AssemblyScript will generate a separate
   * method bound to that particular type.
   * 
   * @param ref instance of a subclass of a Shape.
   */
  static for<T extends Shape>(ref: T): ShapeRef {
    return new ShapeRef(
      ref,
      // Since AssemblyScript doesn't support closures,
      // any context must be passed in as parameters.
      (s: Shape, name: string): string => {
        // For each unique type parameter, AssemblyScript will generate a
        // separate anonymous function bound to that particular type.
        return (s as T).draw(name); 
      },
      (s: Shape): string => { 
        return (s as T).toString(); 
      },
    );
  }

  private constructor(
    private readonly ref: Shape,
    private readonly draw_: (s: Shape, name: string) => string,
    private readonly toString_: (s: Shape) => string,
  ) {
    super();
  }

  draw(name: string): string {
    return this.draw_(this.ref, name);
  }

  toString(): string {
    return this.toString_(this.ref);
  }
}

// @ts-ignore: decorator
@start
export function start(): void {
  handle(ShapeRef.for<Circle>(new Circle()));
  handle(ShapeRef.for<Rectangle>(new Rectangle()));
}

/**
 * To make polymorphism work, one should use ShapeRef instead of a Shape.
 * 
 * @param ref is a subclass of a Shape that implements virtual dispatch table
 *            manually.
 */
function handle(shape: ShapeRef): void {
  shape.toString();
  shape.draw("me");
}
