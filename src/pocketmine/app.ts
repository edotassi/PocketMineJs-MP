/**
 * Created by edoardo on 13/02/2015.
 */

/// <reference path="level/Position.ts" />
/// <reference path="raklib/Binary.ts" />

module PocketMine.App {

}

var position = new PocketMine.Level.Position(10, 15, 20);

console.log(position.$x, position.$y, position.$z);

console.log(RakLib.Binary.BIG_ENDIAN);
console.log(RakLib.Binary.LITTLE_ENDIAN);
console.log('======');

/*
var b = 'abcd';
var bInt = RakLib.Binary.readInt(b);
console.log('Readed int: ', bInt);
console.log('Writed int: ', RakLib.Binary.writeInt(bInt));
*/

var bufferPack = require('bufferpack');
var b = bufferPack.pack('H', [2000]);
var bt = bufferPack.unpack('H', b, 0);

console.log('Packed: ', b);
console.log('Unpacked: ', bt);

