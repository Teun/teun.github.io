var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout"], function (require, exports, ko) {
    var Dice;
    (function (Dice) {
        var Roll = (function () {
            function Roll(nums) {
                this.values = [];
                this.values = nums;
            }
            Roll.prototype.chanceToThrowThis = function () {
                var totalDice = this.values.reduce(function (n1, n2) { return n1 + n2; }, 0);
                var diceToGo = totalDice;
                var combination = 1;
                var totalPossibilities = Math.pow(6, totalDice);
                for (var i = 0; i < this.values.length; i++) {
                    combination *= choose(diceToGo, this.values[i]);
                    diceToGo -= this.values[i];
                }
                return (combination / totalPossibilities);
            };
            Roll.prototype.toString = function () {
                return this.values.reduce(function (n1, n2) {
                    return n1 + "-" + n2;
                }, "[") + "]";
            };
            return Roll;
        })();
        Dice.Roll = Roll;
        function RollWith(nrOfDice) {
            if (nrOfDice == 0)
                return [];
            return rollWith(nrOfDice, 6).map(function (n) { return new Roll(n); });
        }
        Dice.RollWith = RollWith;
        var rollCache = {};
        var rollWith = function (nrOfDice, positions) {
            var key = nrOfDice + "-" + positions;
            if (!(key in rollCache)) {
                var result = [];
                if (positions == 1) {
                    result.push([nrOfDice]);
                }
                else {
                    for (var i = 0; i <= nrOfDice; i++) {
                        var innerResult = [];
                        innerResult.push(i);
                        var remainder = rollWith(nrOfDice - i, positions - 1);
                        for (var item in remainder) {
                            result.push(innerResult.concat(remainder[item]));
                        }
                    }
                }
                rollCache[key] = result;
            }
            return rollCache[key];
        };
        var factorial = function (x, lowerBound) {
            var fact = 1;
            while (x >= 1 && x > lowerBound) {
                fact *= x;
                x--;
            }
            return fact;
        };
        var choose = function (n, r) {
            return (factorial(n, Math.max(n - r, r)) / (factorial(Math.min(n - r, r), 1)));
        };
        var cache = {};
        var DiceSet = (function (_super) {
            __extends(DiceSet, _super);
            function DiceSet(nums) {
                _super.call(this, nums);
                this.expected = null;
                this.pickExpectations = {};
                this.sortOrder = ko.observable("chance");
                this.via = null;
            }
            DiceSet.For = function (values) {
                var key = values.reduce(function (r, n) { return r + "-" + n; }, "");
                if (!(key in cache)) {
                    cache[key] = new DiceSet(values);
                }
                return cache[key];
            };
            DiceSet.prototype.Cache = function () {
                return cache;
            };
            DiceSet.prototype.Score = function () {
                if (this.values[5] == 0)
                    return 0;
                return this.values.filter(function (n, i) { return i < 5; }).reduce(function (p, n, i) { return n * (i + 1) + p; }, 0) + (this.values[5] * 5);
            };
            DiceSet.prototype.CurrentValue = function () {
                var score = this.Score();
                if (score < 21)
                    return 0;
                if (score < 25)
                    return 1;
                if (score < 29)
                    return 2;
                if (score < 33)
                    return 3;
                return 4;
            };
            DiceSet.prototype.ExpectedValue = function () {
                var that = this;
                if (this.expected === null) {
                    var valueForQuit = this.CurrentValue();
                    var valueForRoll = 0;
                    var rolls = RollWith(this.DiceLeft());
                    for (var i = 0; i < rolls.length; i++) {
                        var roll = rolls[i];
                        var picks = roll.values.map(function (v, i) {
                            return { value: i, nr: v };
                        }).filter(function (d) { return d.nr > 0; }).map(function (d) {
                            var resultSet = that.AddDice(d.value, d.nr);
                            resultSet.via = { v: d.value, nr: d.nr };
                            return resultSet;
                        });
                        var pick = picks.sort(function (d1, d2) { return d2.ExpectedValue() - d1.ExpectedValue(); })[0];
                        valueForRoll += pick.ExpectedValue() * roll.chanceToThrowThis();
                        var pickedCombi = pick.via.nr + pick.via.v.toString();
                        if (pick.ExpectedValue() == 0)
                            pickedCombi = "d";
                        if (!this.pickExpectations[pickedCombi])
                            this.pickExpectations[pickedCombi] = { chance: 0, value: pick.ExpectedValue() };
                        this.pickExpectations[pickedCombi].chance += roll.chanceToThrowThis();
                    }
                    this.expected = Math.max(valueForRoll, valueForQuit);
                }
                return this.expected;
            };
            DiceSet.prototype.PickExpectations = function () {
                var _this = this;
                var result = [];
                for (var key in this.pickExpectations) {
                    result.push({ roll: key, chance: this.pickExpectations[key].chance, value: this.pickExpectations[key].value });
                }
                return result.sort(function (p1, p2) { return p2[_this.sortOrder()] - p1[_this.sortOrder()]; });
            };
            DiceSet.prototype.AddDice = function (value, nr) {
                var values = Array.apply(this, this.values);
                if (values[value] > 0)
                    return DiceSet.Dead();
                values[value] = nr;
                return DiceSet.For(values);
            };
            DiceSet.prototype.DiceLeft = function () {
                return 8 - this.values.reduce(function (n1, n2) { return n1 + n2; }, 0);
            };
            DiceSet.Dead = function () {
                return new DeadSet();
            };
            return DiceSet;
        })(Roll);
        Dice.DiceSet = DiceSet;
        var DeadSet = (function (_super) {
            __extends(DeadSet, _super);
            function DeadSet() {
                _super.call(this, []);
            }
            DeadSet.prototype.ExpectedValue = function () {
                return 0;
            };
            return DeadSet;
        })(DiceSet);
    })(Dice || (Dice = {}));
    return Dice;
});
//# sourceMappingURL=dice.js.map