import { PlayerHistory } from "./player.history.js";

describe("PlayerHistory", function () {
  describe(".manyFromSteamChartsPage creates a list of PlayerHistory instances from a list of history objects.", function () {
    describe("When a list of history objects is passed in,", function () {
      beforeEach(function () {
        this.currentDate = new Date();
        this.currentYearAsString = this.currentDate.getFullYear().toString();
        this.currentMonthAsString = this.currentDate.getMonth().toString();

        this.histories = [
          {
            year: this.currentYearAsString,
            month: this.currentMonthAsString,
            averagePlayers: 23,
            trackedPlayers: [],
          },
        ];

        this.results = PlayerHistory.manyFromSteamchartsPage(this.histories);
      });

      it("the first result in an instance of PlayerHistory", function () {
        expect(this.results[0]).toBeInstanceOf(PlayerHistory);
      });
      it("the result has a property called year, which equals the current year", function () {
        expect(this.results[0].year).toBe(this.currentYearAsString);
      });
      it("the result has a property called month, which equals the current month", function () {
        expect(this.results[0].month).toBe(this.currentMonthAsString);
      });
      it("the result has a property called averagePlayers, which equals 23", function () {
        expect(this.results[0].averagePlayers).toBe(this.histories[0].averagePlayers);
      });
      it("the result has a property called trackedPlayers, which equals 23", function () {
        expect(this.results[0].trackedPlayers).toEqual(this.histories[0].trackedPlayers);
      });
    });

    describe("when the passed in array is empty", function () {
      beforeEach(function () {
        this.results = PlayerHistory.manyFromSteamchartsPage([]);
      });

      it("the returned array's will be empty", function () {
        expect(this.results).toEqual([]);
      });
    });
  });

  describe(".manyFromDbEntry creates a list of PlayerHistory instances from a list of history objects.", function () {
    describe("When a list of history objects is passed in, ", function () {
      beforeEach(function () {
        this.histories = [
          {
            year: "2022",
            month: "11",
            averagePlayers: 34,
            trackedPlayers: [],
          },
          {
            year: "2022",
            month: "10",
            averagePlayers: 78,
            trackedPlayers: [],
          },
        ];

        this.results = PlayerHistory.manyFromDbEntry(this.histories);
      });

      it("the first result is an instance of PlayerHistory.", function () {
        expect(this.results[0]).toBeInstanceOf(PlayerHistory);
      });
      it("the first result has a property called year, which equals 2022.", function () {
        expect(this.results[0].year).toBe("2022");
      });
      it("the first result has a property called month, which equals 11.", function () {
        expect(this.results[0].month).toBe("11");
      });
      it("the first result has a property called averagePlayers, which equals 34", function () {
        expect(this.results[0].averagePlayers).toBe(34);
      });
      it("the second result is an instance of PlayerHistory.", function () {
        expect(this.results[1]).toBeInstanceOf(PlayerHistory);
      });
      it("the second result has a property called year, which equals 2022.", function () {
        expect(this.results[1].year).toBe("2022");
      });
      it("the second result has a property called month, which equals 10.", function () {
        expect(this.results[1].month).toBe("10");
      });
      it("the second result has a property called averagePlayers, which equals 78", function () {
        expect(this.results[1].averagePlayers).toBe(78);
      });
    });

    describe("When the passed in array is empty,", function () {
      beforeEach(function () {
        this.results = PlayerHistory.manyFromSteamchartsPage([]);
      });

      it("the returned array's will be empty", function () {
        expect(this.results).toEqual([]);
      });
    });
  });

  describe(".newMonthlyEntry instantiates the PlayerHistory class with default values. The returned object", function () {
    beforeEach(function () {
      this.currentDate = new Date();

      this.result = PlayerHistory.newMonthlyEntry();
    });

    it("is an instance of PlayerHistory", function () {
      expect(this.result).toBeInstanceOf(PlayerHistory);
    });
    it("has a property called 'year'. It's value equals the current year", function () {
      expect(this.result.year).toBe(this.currentDate.getFullYear());
    });
    it("has a property called 'month'. It's value equals the current month", function () {
      expect(this.result.month).toBe(this.currentDate.getMonth());
    });
    it("has a property called 'averagePlayers'. It's value equals '0'", function () {
      expect(this.result.averagePlayers).toBe(0);
    });
    it("has a property called 'trackedPlayers'. It's value equals an empty array.", function () {
      expect(this.result.trackedPlayers).toEqual([]);
    });
  });

  describe(".addNewTrackedPlayers adds an new instance of TrackedPlayers, and updates the average players property. The modified object", function () {
    beforeEach(function () {
      this.firstPlayers = "10";
      this.secondPlayers = "50";

      this.result = PlayerHistory.newMonthlyEntry();

      this.result.addNewTrackedPlayers(this.firstPlayers);
      this.result.addNewTrackedPlayers(this.secondPlayers);
    });

    it("has a 'players' property in its trackedPlayers first array value, which equals 10", function () {
      expect(this.result.trackedPlayers[0].players).toBe(10);
    });
    it("has a 'players' property in its trackedPlayers second array value, which equals 50", function () {
      expect(this.result.trackedPlayers[1].players).toBe(50);
    });
    it("has its averagePlayers property updated to 30", function () {
      expect(this.result.averagePlayers).toBe(30);
    });
  });
});
