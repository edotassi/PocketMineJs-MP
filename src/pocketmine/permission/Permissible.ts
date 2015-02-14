/**
 * Created by edoardo on 13/02/2015.
 */

/// <reference path="ServerOperator.ts" />

module PocketMine.Permission {
    export interface Permissible extends ServerOperator {

        /**
         * Checks if this instance has a permission overridden
         *
         * @param name
         */
        isPermissionSet(name:string):boolean;

        /**
         * Returns the permission value if overridden, or the default value if not
         *
         * @param name
         */
        hasPermission(name:string):boolean;

        /**
         *
         * @param plugin
         * @param name
         * @param value
         */
        addAttachment(plugin:Plugin, name:string, value:boolean):PermissionAttachment;

        /**
         *
         * @param attachment
         */
        removeAttachment(attachment:PermissionAttachment);

        /**
         *
         */
        recalculatePermissions():void;

        /**
         *
         */
        getEffectivePermissions():void;
    }
}