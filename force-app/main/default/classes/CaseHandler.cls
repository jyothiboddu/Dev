
/**
 * description       : Trigger Handler for the Platform Event
 * author            : jyothi.boddu@gmail.com
 * group             : 
 * last modified on  : 17-06-2023 
 * last modified by  : jyothi.boddu@gmail.com
 * Modifications Log 
 * Ver   Date          Author                        Modification
 * 1.0  17-06-2023     jyothi.boddu@gmail.com   Initial Version
**/
public class CaseHandler{



public static void afterInsert(List<CasePEvent__e> caselist){

    // List to hold all cases to be created.
    List<case> cases = new List<case>();

     // Get queue Id for case owner
     Group queue = [SELECT Id FROM Group WHERE Name='CaseQueue' AND Type='Queue'];

     // Iterate through each notification
        for(CasePEvent__e caseevent : caselist){

          if(caseevent.Risk__c == 'High'){
            case newcase = new case();           
            newcase.status = 'New';
            newcase.Origin = 'Phone';
            newcase.OwnerId = queue.Id;
            cases.add(newcase);
          }        
        }

        // Insert all cases corresponding to events received
        if(cases.size() >0){
          insert cases ;
      }
  
  }



}