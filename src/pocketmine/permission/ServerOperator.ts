/**
 * Created by edoardo on 13/02/2015.
 */

module PocketMine.Permission {
    export interface ServerOperator {
        /**
         * Checks if the current object has operator permissions
         *
         * @return boolean
         */
        isOp():boolean;

        /**
         *
         * @param value
         */
        setOp(value:boolean):void;

    }
}