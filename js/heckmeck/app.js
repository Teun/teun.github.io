define(["require", "exports", "knockout", "dicemodel"], function (require, exports, ko, DiceModel) {
    var imgBase = "img/";
    var diceFormat = function (d, nr) {
        var res = "";
        for (var j = 0; j < nr; j++) {
            res += "<img src='" + imgBase + d + ".png' />";
        }
        return res;
    };
    var ViewModel = (function () {
        function ViewModel() {
            var _this = this;
            this.fmt = {
                chance: function (exp) {
                    return (exp * 100).toFixed(3) + "%";
                },
                improvement: function (old, newVal) {
                    var value = (newVal - old);
                    var result = "<span class=\"" + ((value >= 0) ? "great" : "meh") + "\">" + ((value >= 0) ? "+" : "") + value.toFixed(3) + "</span>";
                    return result;
                },
                imgPick: function (pickExpr) {
                    if (pickExpr == "d")
                        return "<img src='" + imgBase + "dead.png' />";
                    if (pickExpr.length != 2)
                        throw "Not a valid format: " + pickExpr;
                    return diceFormat(parseInt(pickExpr[1]) + 1, parseInt(pickExpr[0]));
                },
                imgRoll: function (r) {
                    var html = "";
                    for (var i = 0; i < r.length; i++) {
                        html += diceFormat(i + 1, r[i]);
                    }
                    return html;
                }
            };
            this.addPick = function (pick) {
                var dicelist = _this.CurrentSet.dice();
                var pos = parseInt(pick.roll[1]);
                dicelist[pos] = parseInt(pick.roll[0]);
                _this.CurrentSet.dice(dicelist);
            };
            this.clearAll = function () {
                _this.CurrentSet.dice([0, 0, 0, 0, 0, 0]);
            };
        }
        return ViewModel;
    })();
    var app = (function () {
        function app(ib) {
            this.currentValue = function (set) {
                var res = 0;
                var values = [1, 2, 3, 4, 5, 5];
                for (var j = 0; j < set.length; j++) {
                    res += parseInt(set[j]) * values[j];
                }
                if (res < 21)
                    return 0;
                if (res < 25)
                    return 1;
                if (res < 29)
                    return 2;
                if (res < 33)
                    return 3;
                return 4;
            };
            if (ib)
                imgBase = ib;
        }
        app.prototype.init = function (cont) {
            var self = this;
            var viewModel = new ViewModel();
            viewModel.CurrentSet = new DiceModel.Set("000000");
            ko.applyBindings(viewModel, cont);
        };
        return app;
    })();
    return app;
});
//# sourceMappingURL=app.js.map