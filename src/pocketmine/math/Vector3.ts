/**
 * Created by edoardo on 13/02/2015.
 */


var TheMath = Math;

module PocketMine.Math {

    export enum VECTOR3_SIDE {
        DOWN = 0,
        UP = 1,
        NORTH = 2,
        SOUTH = 3,
        WEST = 4,
        EAST = 5
    }

    export class Vector3 {

        public $x:number;
        public $y:number;
        public $z:number;

        constructor(x:number = 0, y:number = 0, z:number = 0) {
            this.$x = x;
            this.$y = y;
            this.$z = z;
        }

        public getX():number {
            return this.$x;
        }

        public getY():number {
            return this.$y;
        }

        public getZ():number {
            return this.$z;
        }

        public getFloorX():number {
            return parseInt((this.$x || 0).toString());
        }

        public getFloorY():number {
            return parseInt((this.$y || 0).toString());
        }

        public getFloorZ():number {
            return parseInt((this.$y || 0).toString());
        }

        public getRight():number {
            return this.$x;
        }

        public getUp():number {
            return this.$y;
        }

        public getForward():number {
            return this.$z;
        }

        public getSouth():number {
            return this.$x;
        }

        public getWest():number {
            return this.$z;
        }

        /**
         *
         * @param x
         * @param y
         * @param z
         * @returns {Vector3}
         */
        public add(x:number, y:number = 0, z:number = 0):Vector3 {
            return new Vector3(this.$x + x, this.$y + y, this.$z + z);
        }

        /**
         *
         * @param x
         * @param y
         * @param z
         * @returns {Vector3}
         */
        public subtract(x:number = 0, y:number = 0, z:number = 0):Vector3 {
            return new Vector3(this.$x - x, this.$y - y, this.$z - z);
        }

        /**
         *
         * @param n
         * @returns {Vector3}
         */
        public multiply(n:number):Vector3 {
            return new Vector3(this.$x * n, this.$y * n, this.$z * n);
        }

        /**
         *
         * @param n
         */
        public divide(n:number):Vector3 {
            return new Vector3(this.$x / n, this.$y / n, this.$z / n);
        }

        /**
         *
         * @returns {Vector3}
         */
        public ceil():Vector3 {
            return new Vector3(parseInt(this.$x.toString()), parseInt(this.$y.toString()), parseInt(this.$z.toString()));
        }

        /**
         *
         * @returns {Vector3}
         */
        public floor():Vector3 {
            return new Vector3(TheMath.floor(this.$x), TheMath.floor(this.$y), TheMath.floor(this.$z));
        }

        /**
         *
         * @returns {Vector3}
         */
        public round():Vector3 {
            return new Vector3(TheMath.round(this.$x), TheMath.round(this.$y), TheMath.round(this.$z));
        }

        /**
         *
         * @returns {Vector3}
         */
        public abs():Vector3 {
            return new Vector3(TheMath.abs(this.$x), TheMath.abs(this.$y), TheMath.abs(this.$z));
        }

        /**
         *
         * @param side
         * @param step
         * @returns {Vector3}
         */
        public getSide(side:VECTOR3_SIDE, step:number = 1):Vector3 {
            switch (side) {
                case VECTOR3_SIDE.DOWN:
                    return new Vector3(this.$x, this.$y - step, this.$z);
                case VECTOR3_SIDE.UP:
                    return new Vector3(this.$x, this.$y + step, this.$z);
                case VECTOR3_SIDE.NORTH:
                    return new Vector3(this.$x, this.$y, this.$z - step);
                case VECTOR3_SIDE.SOUTH:
                    return new Vector3(this.$x, this.$y, this.$z + step);
                case VECTOR3_SIDE.WEST:
                    return new Vector3(this.$x - step, this.$y, this.$z);
                case VECTOR3_SIDE.EAST:
                    return new Vector3(this.$x + step, this.$y, this.$z);
                default :
                    return this;
            }
        }

        /**
         *
         * @param side
         * @returns {number}
         */
        public static getOppositeSide(side:VECTOR3_SIDE) {
            switch (side) {
                case VECTOR3_SIDE.DOWN:
                    return VECTOR3_SIDE.UP;
                case VECTOR3_SIDE.UP:
                    return VECTOR3_SIDE.DOWN;
                case VECTOR3_SIDE.SOUTH:
                    return VECTOR3_SIDE.NORTH;
                case VECTOR3_SIDE.NORTH:
                    return VECTOR3_SIDE.SOUTH;
                case VECTOR3_SIDE.WEST:
                    return VECTOR3_SIDE.EAST;
                case VECTOR3_SIDE.EAST:
                    return VECTOR3_SIDE.WEST;
                default :
                    return -1;
            }
        }

        /**
         *
         * @param pos
         * @returns {number}
         */
        public distanceSquared(pos:Vector3):number {
            return TheMath.pow(this.$x - pos.$x, 2) + TheMath.pow(this.$y - pos.$y, 2) + TheMath.pow(this.$z - pos.$z, 2);
        }

        /**
         *
         * @param pos
         * @returns {number}
         */
        public distance(pos:Vector3):number {
            return TheMath.sqrt(this.distanceSquared(pos));
        }

        /**
         *
         * @param x
         * @param z
         * @returns {number}
         */
        public maxPlainDistance(x:number = 0, z:number = 0):number {
            return TheMath.max(TheMath.abs(this.$x - x), TheMath.abs(this.$z - z));
        }

        /**
         *
         * @returns {number}
         */
        public length():number {
            return TheMath.sqrt(this.lengthSquared());
        }

        /**
         *
         * @returns {number}
         */
        public lengthSquared():number {
            return TheMath.pow(this.$x, 2) + TheMath.pow(this.$y, 2) + TheMath.pow(this.$z, 2);
        }

        /**
         *
         * @returns {Vector3}
         */
        public normalize():Vector3 {
            var len = this.length();
            if (len != 0) {
                return this.divide(len);
            }

            return new Vector3(0, 0, 0);
        }

        /**
         *
         * @param v
         * @returns {number}
         */
        public dot(v:Vector3):number {
            return this.$x * v.$x + this.$y * v.$y + this.$z * v.$z;
        }

        /**
         *
         * @param v
         * @returns {Vector3}
         */
        public cross(v:Vector3):Vector3 {
            return new Vector3(
                this.$y * v.$z - this.$z * v.$y,
                this.$z * v.$x - this.$x * v.$z,
                this.$x * v.$y - this.$y * v.$x
            );
        }

        /**
         * Returns a new vector with x value equal to the second parameter, along the line between this vector and the
         * passed in vector, or null if not possible.
         *
         * @param v
         * @param x
         * @returns {*}
         */
        public getIntermediateWithXValue(v:Vector3, x:number):Vector3 {
            var xDiff = v.$x - this.$x;
            var yDiff = v.$y - this.$y;
            var zDiff = v.$z - this.$z;

            if (TheMath.pow(xDiff, 2) < 1) {
                return null;
            }

            var f = (x - this.$x) / xDiff;

            if (f < 0 || f > 1) {
                return null;
            } else {
                return new Vector3(this.$x + xDiff * f, this.$y + yDiff * f, this.$z + zDiff * f);
            }
        }

        /**
         * Returns a new vector with y value equal to the second parameter, along the line between this vector and the
         * passed in vector, or null if not possible.
         *
         * @param v
         * @param y
         * @returns {*}
         */
        public getIntermediateWithYValue(v:Vector3, y:number):Vector3 {
            var xDiff = v.$x - this.$x;
            var yDiff = v.$y - this.$y;
            var zDiff = v.$z - this.$z;

            if (TheMath.pow(yDiff, 2) < 1) {
                return null;
            }

            var f = (y - this.$y) / yDiff;

            if (f < 0 || f > 1) {
                return null;
            } else {
                return new Vector3(this.$x + xDiff * f, this.$y + yDiff * f, this.$z + zDiff * f);
            }
        }

        /**
         * Returns a new vector with z value equal to the second parameter, along the line between this vector and the
         * passed in vector, or null if not possible.
         *
         * @param v
         * @param z
         * @returns {*}
         */
        public getIntermediateWithZValue(v:Vector3, z:number):Vector3 {
            var xDiff = v.$x - this.$x;
            var yDiff = v.$y - this.$y;
            var zDiff = v.$z - this.$z;

            if (TheMath.pow(zDiff, 2) < 1) {
                return null;
            }

            var f = (z - this.$z) / zDiff;

            if (f < 0 || f > 1) {
                return null;
            } else {
                return new Vector3(this.$x + xDiff * f, this.$y + yDiff * f, this.$z + zDiff * f);
            }
        }

        /**
         *
         * @param x
         * @param y
         * @param z
         * @returns {Vector3}
         */
        public setComponents(x:number, y:number, z:number):Vector3 {
            this.$x = x;
            this.$y = y;
            this.$z = z;
            return this;
        }

        public toString():string {
            return ['Vector3(x=', this.$x, ',y=', this.$y, ',z=', this.$z, ')'].join();
        }
    }
}