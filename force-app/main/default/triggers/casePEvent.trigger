/**
 * description       : Trigger the Platform Event
 * author            : jyothi.boddu@gmail.com
 * group             : 
 * last modified on  : 17-06-2023 
 * last modified by  : jyothi.boddu@gmail.com
 * Modifications Log 
 * Ver   Date          Author                        Modification
 * 1.0  17-06-2023     jyothi.boddu@gmail.com   Initial Version
**/

trigger casePEvent on CasePEvent__e (after insert) {
        system.debug('inside Trigger');
        if(trigger.isafter && trigger.isinsert){
                caseHandler.afterInsert(Trigger.new);
        }
}