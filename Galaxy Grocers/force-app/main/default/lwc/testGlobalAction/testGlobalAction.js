import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class TestGlobalAction extends NavigationMixin(LightningElement) {
    @api recordId;

    handleCreateCase() {
        this[NavigationMixin.Navigate]({
            "type": "standard__quickAction",
            "attributes": {
                "apiName": 'Global.NewCase'
            },
            state: {
                objectApiName: 'Case', // Specify the object type if needed
                recordId: this.recordId  // Pass the relevant record ID if needed
            }
        });

    }
}
/*
https://salesforcediaries.com/2024/06/09/url-hack-open-button-and-action-from-lwc/
https://salesforce.stackexchange.com/questions/384161/lwc-component-as-global-action
https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX000000V9st0AC
get pagereference() {
        return {
            "type": "standard__quickAction",
            "attributes": {
                "apiName": 'Global.Create_New_Case'
            },
            "state": {
                "objectApiName": 'Case',
                "context": "RECORD_DETAIL",
                "recordId": this.recordId,
                "backgroundContext": "/lightning/r/Contact/" + this.recordId + "/view"
            }
        }
    }
    handleCreateCase() {
        this[NavigationMixin.Navigate]({
            "type": "standard__quickAction",
            "attributes": {
                "apiName": 'Global.Create_New_Case'
            },
            "state": {
                "objectApiName": 'Case',
                "context": "RECORD_DETAIL",
                "recordId": this.recordId,
                "backgroundContext": "/lightning/r/Contact/" + this.recordId + "/view"
            }
        });

* */