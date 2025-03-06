import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import accountInsertion from '@salesforce/apex/accountInsertion.accountInsertion';
import { NavigationMixin } from 'lightning/navigation';
export default class AccountDataComponent extends NavigationMixin(LightningElement) {
    @track acc = {}


    handleClick(event) {

        let isvalid = true;
        let FieldError = 'Please Enter ';
        this.template.querySelectorAll('lightning-input').forEach(element => {
            const fieldValue = element.value?.trim();
            console.log('value::' + fieldValue);
            const errorMessage = !fieldValue ? `${FieldError} ${element.label}` : '';
            element.setCustomValidity(errorMessage);
            element.reportValidity();
            if (errorMessage) { isvalid = false; }
            else {
                this.acc = { ...this.acc, [element.name]: element.value };
            }
        });
        if (isvalid) {
            accountInsertion({ acc: this.acc })
                .then(result => {
                    this.showSucessToastEventnew(result);
                    this.handleReset(); // Reset form after successful insertion
                })
                .catch(error => {
                    this.showErrorToastEvent(error);
                });

        }

    }
    showSucessToastEventnew(recordId) {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'view'
            },
        }).then(url => {
            const evt = new ShowToastEvent({
                title: 'Account Creation',
                variant: 'success',
                message: 'Account Created Sucessfully {0}  ',
                messageData: [{ url, label: 'Click here to view.' }]
            });
            this.dispatchEvent(evt);
        });
    }

    /*
     async showSuccessToastEvent(recordId) {
        try {
            const url = await this[NavigationMixin.GenerateUrl]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: recordId,
                    actionName: 'view'
                }
            });

            const evt = new ShowToastEvent({
                title: 'Account Created',
                variant: 'success',
                message: 'Account Created Successfully. Click {0} to view.',
                messageData: [{ url, label: 'here' }]
            });
            this.dispatchEvent(evt);
        } catch (error) {
            console.error('Error generating URL:', error);
        }
    */

    showErrorToastEvent(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error Creating Account',
                message: error.body?.message || 'Unknown error occurred',
                variant: 'error'
            })
        );
    }
    showSucessToastEvent(recordId) {
        const evt = new ShowToastEvent({
            title: 'Account Created',
            message: 'Record {0} created! See it {1}!',
            variant: 'success',
            messageData: [
                'Account', {
                    url: '/lightning/r/Account/' + recordId + '/view',
                    label: 'here'
                }
            ]
        });
        this.dispatchEvent(evt);
    }


    handleReset() {

        this.template.querySelectorAll('lightning-input').forEach(element => {
            element.value = '';
            element.setCustomValidity('');
            element.reportValidity();

        });
        this.acc = {};
    }

}