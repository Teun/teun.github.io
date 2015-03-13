define(["require", "exports", "dice", "knockout"], function (require, exports, Dice, ko) {
    var DiceModel;
    (function (DiceModel) {
        var Set = (function () {
            function Set(dice) {
                var _this = this;
                this.dice = ko.observableArray();
                this.diceList = function (nr, v) {
                    var result = [];
                    for (var i = 0; i < nr; i++) {
                        result.push(v + 1);
                    }
                    return result;
                };
                this.expectation = ko.computed(function () {
                    return Dice.DiceSet.For(_this.dice());
                });
                for (var i = 0; i < dice.length; i++) {
                    this.dice.push(parseInt(dice[i]));
                }
            }
            return Set;
        })();
        DiceModel.Set = Set;
    })(DiceModel || (DiceModel = {}));
    return DiceModel;
});
//# sourceMappingURL=dicemodel.js.map