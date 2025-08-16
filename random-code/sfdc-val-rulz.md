## Opportunities
#### Closed Lost Reason
This one is fairly simple, but it assumes you have a 'Closed Lost' custom field (please add a brief Description to your custom fields).

- Rule Name :: Closed_Lost_Reason
- Description :: *I used the same one as the 'Closed Lost' field*
- Error Message :: Closed Lost Reason is required.
- Error Location :: Field [Closed Lost Reason]
```js
AND(
 ISCHANGED(StageName),
 ISPICKVAL(StageName, 'Closed Lost'),
 ISBLANK(Closed_Lost_Reason__c) 
)
```
