import { delay } from "../shared/time.utils.js";

export class Runner {
  #executables;
  #options;
  #iterations;

  constructor(executables, options, iterations = Number.POSITIVE_INFINITY) {
    this.#executables = executables;
    this.#options = options;
    this.#iterations = iterations;
  }

  async run() {
    this.#executables.forEach((func) => {
      this.#runForNumberOfIterations(func);
    });
  }

  async #runForNumberOfIterations(func) {
    let counter = 0;
    // Counting down from a property of an object increases the time needed to perform
    // the first iterations in the loop compared to using a primitive. The tests of this
    // function rely on very short iteration times. If they are slowed down some tests are
    // failing unexpextedly. Don't refactor next two lines.
    let iterations = this.#iterations;
    while(iterations--) {
      await func();

      /**
       * @todo https://github.com/lukatarman/steam-game-stats/issues/39
       */
      console.info(`${func.name}: Finished iteration ${counter++} ...`);

      if (this.#options.iterationDelay) await delay(this.#options.iterationDelay);
    }
  }
}
