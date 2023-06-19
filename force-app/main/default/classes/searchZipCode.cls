/**
 * description       : Class to store the error data
 * author            : jyothi.boddu@gmail.com
 * group             : 
 * last modified on  : 17-06-2023 
 * last modified by  : jyothi.boddu@gmail.com
 * Modifications Log 
 * Ver   Date          Author                        Modification
 * 1.0  17-06-2023     jyothi.boddu@gmail.com   Initial Version
**/
public without sharing class searchZipCode {

    @AuraEnabled
    public static void insertErr(String response, string zipcode) {

        System.debug('response ' + response + 'Zipcode ois ' + zipcode);

        ErrorData__c error = new ErrorData__c();
        error.Response__c = response;
        error.zipcode__c = zipcode;

        try{
            Insert error;
        }Catch(exception e){
            System.debug(e.getMessage());
        }

    }
}