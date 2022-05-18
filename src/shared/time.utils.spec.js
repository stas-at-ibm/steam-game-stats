import { delay, hoursToMs, moreThanXhoursPassedSince, msPassedSince } from "./time.utils.js";

describe("time.utils.js", () => {
  describe(".delay", () => {
    let timePassed;

    describe("0 is passed in as an argument", () => {
      beforeAll(async () => {
        const timestampOne = new Date().getTime();
        await delay(0);
        const timestampTwo = new Date().getTime();
        timePassed = timestampTwo - timestampOne;
      });

      it("the function waits for a negligable time", () => {
        expect(timePassed).toBeLessThanOrEqual(30);
        expect(timePassed).toBeGreaterThanOrEqual(0);
      });
    });

    describe("a value of 100 is passed in as an argument", () => {
      beforeAll(async () => {
        const timestamOne = new Date().getTime();
        await delay(100);
        const timestampTwo = new Date().getTime();
        timePassed = timestampTwo - timestamOne;
      });

      it("the function waits 100ms", () => {
        expect(timePassed).toBeLessThanOrEqual(130);
        expect(timePassed).toBeGreaterThanOrEqual(95);
      });
    });

    describe("a value of 500 is passed in as an argument", () => {
      beforeAll(async () => {
        const timestamOne = new Date().getTime();
        await delay(500);
        const timestampTwo = new Date().getTime();
        timePassed = timestampTwo - timestamOne;
      });

      it("the function waits 500ms", () => {
        expect(timePassed).toBeLessThanOrEqual(530);
        expect(timePassed).toBeGreaterThanOrEqual(495);
      });
    });
  });

  describe(".hoursToMs", () => {
    let result;
    
    describe("passing a value of 12 into the function", () => {
      beforeAll(() => {
        result = hoursToMs(12);
      })

      it("the function returns '43200000'", () => {
        expect(result).toBe(432e5);
      })
    })

    describe("passing a value of 0 into the function", () => {
      beforeAll(() => {
        result = hoursToMs(0);
      })

      it("the function returns '43200000'", () => {
        expect(result).toBe(0);
      })
    })

    describe("passing a value of 100000 into the function", () => {
      beforeAll(() => {
        result = hoursToMs(1e5);
      })

      it("the function returns '360000000000'", () => {
        expect(result).toBe(36e10);
      })
    })
  })

  describe(".moreThanXhoursPassedSince", () => {
    let oneDayInMs;
    let threeHoursInMs;

    beforeAll(() => {
      oneDayInMs = 864e5;
      threeHoursInMs = 108e5;
    });
    
    describe("if the date value is larger than 'x' hours passed", () => {
      let result;

      beforeAll(() => {
        const oneDayBehind = new Date().getTime() - oneDayInMs;
        const date = new Date(oneDayBehind);

        result = moreThanXhoursPassedSince(threeHoursInMs, { updatedOn: date });
      });

      it("function returns true", () => {
        expect(result).toBe(true);
      });
    });

    describe("if the date value is smaller than 'x' hours passed", () => {
      let result;

      beforeAll(() => {
        const threeHoursBehind = new Date().getTime() - threeHoursInMs;
        const date = new Date(threeHoursBehind);

        result = moreThanXhoursPassedSince(oneDayInMs, { updatedOn: date });
      });

      it("function returns true", () => {
        expect(result).toBe(false);
      });
    });
  });

  describe(".msPassedSince", () => {
    describe("when a date is three hours behind the current time", () => {
      let result;

      beforeAll(() => {
        const threeHoursInMs = 108e5;
        const threeHoursBehind = new Date().getTime() - threeHoursInMs;
        const date = new Date(threeHoursBehind);

        result = msPassedSince({ updatedOn: date });
      });

      it("function returns 10800000", () => {
        expect(result).toBe(108e5);
      });
    });
  });
});
