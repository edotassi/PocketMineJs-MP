/**
 * Created by edoardo on 13/02/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../math/Vector3.ts" />
var Level;
(function (Level) {
    var Position = (function (_super) {
        __extends(Position, _super);
        function Position() {
            _super.apply(this, arguments);
        }
        return Position;
    })(Vector3);
})(Level || (Level = {}));
