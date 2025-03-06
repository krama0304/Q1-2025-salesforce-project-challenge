public with sharing class accountInsertion {
    @AuraEnabled
    public static string accountInsertion(map<string,string> acc){
        try {
            // Check if the user has Create access to the Account object
            if (!Schema.sObjectType.Account.isCreateable()) {
                throw new AuraHandledException('You do not have permission to create an Account.');
            }
            account accountdata = new account();
            accountdata.name =acc.get('accName');
            accountdata.AccountNumber=acc.get('accNumber');
            insert as user accountdata;
            return accountdata.id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


}