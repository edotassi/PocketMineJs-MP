/**
 * Created by edoardo on 14/02/2015.
 */

/// <reference path="node/node.d.ts" />

interface BufferPack {
    unpack(format: string, buffer: Buffer, position: number): Array<number>;
    pack(format: string, value: Array<number>): Buffer;
}