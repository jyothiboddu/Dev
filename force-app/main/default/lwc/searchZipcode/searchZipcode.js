import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import insertError from '@salesforce/apex/searchZipCode.insertErr';
import LightningAlert from 'lightning/alert'; //this module needs to import.

// * ZipCode URL
var ZipCode_URL = "https://api.zippopotam.us/us/zipcode";
var arraydata;
var codevalue;

export default class SearchZipCode extends NavigationMixin(LightningElement) {

    handleClick(){ 

        console.log("inside handle click");
        let code = this.template.querySelector(`[data-id="zipcode"]`);
        this.codevalue = code.value;
        console.log(code.value);
        let searchurl = ZipCode_URL.replace("zipcode",code.value);
        console.log(searchurl);



        var json = this.logJSONData(searchurl);
        console.log(json);
        /*async function logJSONData() {
            const response = await fetch(searchurl);
            const jsonData = await response.json();
            console.log(jsonData);
          }*/

    }
    
    logJSONData(searchurl){
       /* fetch(searchurl, {
            method: "GET"
          })
            .then((response) => response.json()) ;
          
        const jsonData = response.json();
        console.log(jsonData);*/

      /*  console.log('inside logJSONData');

        fetch(searchurl, {
            method: "GET"
          })
        .then(response => {
            console.log(response);
            if(response.ok) {
                console.log(response.clone().json());
                let res = response.clone().json();
                console.log('data is ', res);
            } else {
                throw Error(response);
            }
        }).then(data => {
            var userid = JSON.parse(data);
            console.log(userid);
          })
        .catch(error => console.log(error)) */

        fetch(searchurl) // Replace with your API endpoint
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then((data) => {
            const dataArray = Array.isArray(data) ? data : [data]; // Convert the parsed data to an array
            console.log(dataArray);
            console.log(dataArray[0].country);
            if(dataArray[0].country ==="United States"){
                // Call another lightning component
               // this.arraydata = dataArray;
               this.arraydata = JSON.stringify(dataArray);
               // console.log(myJsonString);
                this.handleNavigate();
            }
            
        })
        .catch((error) => {
            insertError({response:error, zipcode:this.codevalue});
          //  console.log('result## ' , result);
            console.error('erros is ' ,error);
            LightningAlert.open({
                message: 'This is Not a Valid Zipcode',
                theme: 'error', // a red theme intended for error states
                label: 'Error!', // this is the header text
            });
            // Handle the error...
        });


    }


    handleNavigate(){
        console.log("inside navigation");
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__NavigateToLWC"
            },
            state: {
                c__propertyValue: this.arraydata 
            }
        });
    }

}