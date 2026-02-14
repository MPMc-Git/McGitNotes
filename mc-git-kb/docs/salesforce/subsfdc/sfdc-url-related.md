---
tags:
  - Formula
  - Salesforce
  - URL
---


## URL-Related Formula, etc.
#### Hyperlink to Record
This creates a Hyperlink that'll work in any Salesforce Organization - no hardcoding the URL<br>
'Task Link' is what will be displayed<br>
<small>*NOTE*: 620 is the API Version (v62.0), so you may need to update this to make sure you're not using a deprecated API Version.</small>
```sql
HYPERLINK(
LEFT($Api.Partner_Server_URL_620, FIND( '/services', $Api.Partner_Server_URL_620)) & Id, 'Task Link')
```

Same code but for a Flow
```sql
HYPERLINK(
LEFT($Api.Partner_Server_URL_620, FIND( '/services', $Api.Partner_Server_URL_620)) & {!$Record.Id}, 'Task Link')
```

#### Dynamic URL Button
This is useful if you connect to an External Application via URL, but it changes depending on which Sandbox you are in.

1. Create a Custom Setting (call it what you want)
    - Label: "Ext Site Cfg"
    - API Name: "Ext_Site_Cfg"
    - Field Label: "Ext Site Name"
    - API Name: "Ext_Site_Name"
1. Set Default Organization Level Value
    - Ext Site Name: <Varies by Org>
    - Leave blank if Production, or add in the Sandbox value for the external site
1. Create the Detail Page Button in your Object
    - Label: "Go to Ext Site Record"
    - API: "Go_to_Ext_Site_Record"
    - Behavior: "Open in new window"
    - Content Source: "URL"
    - Set value below if it's either the main page, or if there are additional parameters, such as an External ID on your Salesforce Record, use the second Formula

```sql
IF(
  ISBLANK($Setup.Ext_Site_Cfg__c.Ext_Site_Name__c),"https://site.host.tld/",
  "https://site-" & LOWER($Setup.Ext_Site_Cfg__c.Ext_Site_Name__c) & ".host.tld/"
)
```
    
```sql
IF(
  ISBLANK($Setup.Ext_Site_Cfg__c.Ext_Site_Name__c),"https://site.host.tld/Page.aspx?id="&{!Object.ExtId__c},
  "https://site-" & LOWER($Setup.Ext_Site_Cfg__c.Ext_Site_Name__c) & ".host.tld/Page.aspx?id="&{!Object.ExtId__c}
)
```
