/**
 * Created by edoardo on 13/02/2015.
 */

module PocketMine.Command {
    export interface CommandExecutor {

        onCommand(sender:CommandSender, command: Command, label: string, args:Array<any>):void;
    }
}
