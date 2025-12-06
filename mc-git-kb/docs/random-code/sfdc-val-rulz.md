## Account
#### Billing / Shipping Zip Code if in the US
- Rule Name :: Billing_Zip_Code_US / Shipping_Zip_Code_US
- Description :: US Zip code must be in 99999 or 99999-9999 format.
- Error Message :: US ZIP code must be in 99999 or 99999-9999 format.
- Error Location :: Field [Billing Zip/Postal Code] / [Shipping Zip/Postal Code]
```js
AND(
OR(BillingCountry = "USA", BillingCountry = "US"),
NOT(REGEX(BillingPostalCode, "\\d{5}(-\\d{4})?"))
)

AND(
OR(ShippingCountry = "USA", ShippingCountry = "US"),
NOT(REGEX(ShippingPostalCode, "\\d{5}(-\\d{4})?"))
)
```
- **NOTE**: If your org assumes USA as the default, you can add either of the below in the OR statement in case anyone forgets.
    - ISBLANK(BillingCountry)
    - ISBLANK(ShippingCountry)

## Opportunity
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
