var TheMath = Math;
var PocketMine;
(function (PocketMine) {
    var Math;
    (function (Math) {
        (function (VECTOR3_SIDE) {
            VECTOR3_SIDE[VECTOR3_SIDE["DOWN"] = 0] = "DOWN";
            VECTOR3_SIDE[VECTOR3_SIDE["UP"] = 1] = "UP";
            VECTOR3_SIDE[VECTOR3_SIDE["NORTH"] = 2] = "NORTH";
            VECTOR3_SIDE[VECTOR3_SIDE["SOUTH"] = 3] = "SOUTH";
            VECTOR3_SIDE[VECTOR3_SIDE["WEST"] = 4] = "WEST";
            VECTOR3_SIDE[VECTOR3_SIDE["EAST"] = 5] = "EAST";
        })(Math.VECTOR3_SIDE || (Math.VECTOR3_SIDE = {}));
        var VECTOR3_SIDE = Math.VECTOR3_SIDE;
        var Vector3 = (function () {
            function Vector3(x, y, z) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                this.$x = x;
                this.$y = y;
                this.$z = z;
            }
            Vector3.prototype.getX = function () {
                return this.$x;
            };
            Vector3.prototype.getY = function () {
                return this.$y;
            };
            Vector3.prototype.getZ = function () {
                return this.$z;
            };
            Vector3.prototype.getFloorX = function () {
                return parseInt((this.$x || 0).toString());
            };
            Vector3.prototype.getFloorY = function () {
                return parseInt((this.$y || 0).toString());
            };
            Vector3.prototype.getFloorZ = function () {
                return parseInt((this.$y || 0).toString());
            };
            Vector3.prototype.getRight = function () {
                return this.$x;
            };
            Vector3.prototype.getUp = function () {
                return this.$y;
            };
            Vector3.prototype.getForward = function () {
                return this.$z;
            };
            Vector3.prototype.getSouth = function () {
                return this.$x;
            };
            Vector3.prototype.getWest = function () {
                return this.$z;
            };
            Vector3.prototype.add = function (x, y, z) {
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                return new Vector3(this.$x + x, this.$y + y, this.$z + z);
            };
            Vector3.prototype.subtract = function (x, y, z) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                return new Vector3(this.$x - x, this.$y - y, this.$z - z);
            };
            Vector3.prototype.multiply = function (n) {
                return new Vector3(this.$x * n, this.$y * n, this.$z * n);
            };
            Vector3.prototype.divide = function (n) {
                return new Vector3(this.$x / n, this.$y / n, this.$z / n);
            };
            Vector3.prototype.ceil = function () {
                return new Vector3(parseInt(this.$x.toString()), parseInt(this.$y.toString()), parseInt(this.$z.toString()));
            };
            Vector3.prototype.floor = function () {
                return new Vector3(TheMath.floor(this.$x), TheMath.floor(this.$y), TheMath.floor(this.$z));
            };
            Vector3.prototype.round = function () {
                return new Vector3(TheMath.round(this.$x), TheMath.round(this.$y), TheMath.round(this.$z));
            };
            Vector3.prototype.abs = function () {
                return new Vector3(TheMath.abs(this.$x), TheMath.abs(this.$y), TheMath.abs(this.$z));
            };
            Vector3.prototype.getSide = function (side, step) {
                if (step === void 0) { step = 1; }
                switch (side) {
                    case 0 /* DOWN */:
                        return new Vector3(this.$x, this.$y - step, this.$z);
                    case 1 /* UP */:
                        return new Vector3(this.$x, this.$y + step, this.$z);
                    case 2 /* NORTH */:
                        return new Vector3(this.$x, this.$y, this.$z - step);
                    case 3 /* SOUTH */:
                        return new Vector3(this.$x, this.$y, this.$z + step);
                    case 4 /* WEST */:
                        return new Vector3(this.$x - step, this.$y, this.$z);
                    case 5 /* EAST */:
                        return new Vector3(this.$x + step, this.$y, this.$z);
                    default:
                        return this;
                }
            };
            Vector3.getOppositeSide = function (side) {
                switch (side) {
                    case 0 /* DOWN */:
                        return 1 /* UP */;
                    case 1 /* UP */:
                        return 0 /* DOWN */;
                    case 3 /* SOUTH */:
                        return 2 /* NORTH */;
                    case 2 /* NORTH */:
                        return 3 /* SOUTH */;
                    case 4 /* WEST */:
                        return 5 /* EAST */;
                    case 5 /* EAST */:
                        return 4 /* WEST */;
                    default:
                        return -1;
                }
            };
            Vector3.prototype.distanceSquared = function (pos) {
                return TheMath.pow(this.$x - pos.$x, 2) + TheMath.pow(this.$y - pos.$y, 2) + TheMath.pow(this.$z - pos.$z, 2);
            };
            Vector3.prototype.distance = function (pos) {
                return TheMath.sqrt(this.distanceSquared(pos));
            };
            Vector3.prototype.maxPlainDistance = function (x, z) {
                if (x === void 0) { x = 0; }
                if (z === void 0) { z = 0; }
                return TheMath.max(TheMath.abs(this.$x - x), TheMath.abs(this.$z - z));
            };
            Vector3.prototype.length = function () {
                return TheMath.sqrt(this.lengthSquared());
            };
            Vector3.prototype.lengthSquared = function () {
                return TheMath.pow(this.$x, 2) + TheMath.pow(this.$y, 2) + TheMath.pow(this.$z, 2);
            };
            Vector3.prototype.normalize = function () {
                var len = this.length();
                if (len != 0) {
                    return this.divide(len);
                }
                return new Vector3(0, 0, 0);
            };
            Vector3.prototype.dot = function (v) {
                return this.$x * v.$x + this.$y * v.$y + this.$z * v.$z;
            };
            Vector3.prototype.cross = function (v) {
                return new Vector3(this.$y * v.$z - this.$z * v.$y, this.$z * v.$x - this.$x * v.$z, this.$x * v.$y - this.$y * v.$x);
            };
            Vector3.prototype.getIntermediateWithXValue = function (v, x) {
                var xDiff = v.$x - this.$x;
                var yDiff = v.$y - this.$y;
                var zDiff = v.$z - this.$z;
                if (TheMath.pow(xDiff, 2) < 1) {
                    return null;
                }
                var f = (x - this.$x) / xDiff;
                if (f < 0 || f > 1) {
                    return null;
                }
                else {
                    return new Vector3(this.$x + xDiff * f, this.$y + yDiff * f, this.$z + zDiff * f);
                }
            };
            Vector3.prototype.getIntermediateWithYValue = function (v, y) {
                var xDiff = v.$x - this.$x;
                var yDiff = v.$y - this.$y;
                var zDiff = v.$z - this.$z;
                if (TheMath.pow(yDiff, 2) < 1) {
                    return null;
                }
                var f = (y - this.$y) / yDiff;
                if (f < 0 || f > 1) {
                    return null;
                }
                else {
                    return new Vector3(this.$x + xDiff * f, this.$y + yDiff * f, this.$z + zDiff * f);
                }
            };
            Vector3.prototype.getIntermediateWithZValue = function (v, z) {
                var xDiff = v.$x - this.$x;
                var yDiff = v.$y - this.$y;
                var zDiff = v.$z - this.$z;
                if (TheMath.pow(zDiff, 2) < 1) {
                    return null;
                }
                var f = (z - this.$z) / zDiff;
                if (f < 0 || f > 1) {
                    return null;
                }
                else {
                    return new Vector3(this.$x + xDiff * f, this.$y + yDiff * f, this.$z + zDiff * f);
                }
            };
            Vector3.prototype.setComponents = function (x, y, z) {
                this.$x = x;
                this.$y = y;
                this.$z = z;
                return this;
            };
            Vector3.prototype.toString = function () {
                return ['Vector3(x=', this.$x, ',y=', this.$y, ',z=', this.$z, ')'].join();
            };
            return Vector3;
        })();
        Math.Vector3 = Vector3;
    })(Math = PocketMine.Math || (PocketMine.Math = {}));
})(PocketMine || (PocketMine = {}));
