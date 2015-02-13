/**
 * Created by edoardo on 13/02/2015.
 */

/// <reference path="../level/Level.ts" />
/// <reference path="../math/Vector3.ts" />
/// <reference path="../utils/LevelException.ts" />

module PocketMine.Level {
    export class Position extends PocketMine.Math.Vector3 {

        public level: PocketMine.Level.Level;

        constructor(x:number = 0, y:number = 0, z:number = 0, level: Level = null) {
            super(x, y, z);

            this.level = level;
        }
    }
}