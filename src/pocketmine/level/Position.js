/**
 * Created by edoardo on 13/02/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../level/Level.ts" />
/// <reference path="../math/Vector3.ts" />
/// <reference path="../utils/LevelException.ts" />
var PocketMine;
(function (PocketMine) {
    var Level;
    (function (Level) {
        var Position = (function (_super) {
            __extends(Position, _super);
            function Position(x, y, z, level) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                if (level === void 0) { level = null; }
                _super.call(this, x, y, z);
                this.level = level;
            }
            return Position;
        })(PocketMine.Math.Vector3);
        Level.Position = Position;
    })(Level = PocketMine.Level || (PocketMine.Level = {}));
})(PocketMine || (PocketMine = {}));
