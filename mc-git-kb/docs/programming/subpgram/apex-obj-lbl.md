---
tags:
  - Apex
  - Programming
  - Salesforce
---

## All Objects APIs & Labels (Apex)
Here's the generic Apex:

```java
list<string> apiName = new list<string>();
for(Schema.SObjectType o : Schema.getGlobalDescribe().values()){
    Schema.DescribeSObjectResult objResult = o.getDescribe();
    apiName.add(objResult.getName()+'@!@'+objResult.getLabel());
}
apiName.sort();
map<string,string> allObjects = new map<string,string>();
for(string s : apiName){
    list<string> objName = s.split('@!@');
    system.debug(objName);
    allObjects.put(objName[1],objName[0]);
}
```

Here's the Apex Class

```java
public with sharing class ObjectSchemaController {
    
    // @AuraEnabled(cacheable=true) allows LWC to pull this data efficiently
    @AuraEnabled(cacheable=true)
    public static List<ObjectWrapper> getObjectList() {
        List<ObjectWrapper> objectList = new List<ObjectWrapper>();
        Map<String, Schema.SObjectType> globalDescribe = Schema.getGlobalDescribe();
        
        for(Schema.SObjectType objType : globalDescribe.values()){
            Schema.DescribeSObjectResult res = objType.getDescribe();
            objectList.add(new ObjectWrapper(res.getLabel(), res.getName()));
        }
        objectList.sort();
        return objectList;
    }

    // Wrapper class must be AuraEnabled so JS can read the properties
    public class ObjectWrapper implements Comparable {
        @AuraEnabled public String label;
        @AuraEnabled public String apiName;

        public ObjectWrapper(String label, String apiName) {
            this.label = label;
            this.apiName = apiName;
        }

        public Integer compareTo(Object compareTo) {
            ObjectWrapper other = (ObjectWrapper) compareTo;
            return this.label.compareTo(other.label);
        }
    }
}
```

The related LWC HTML

```html
<template>
    <lightning-card title="Org Object Metadata" icon-name="standard: Dorectory">
        <div class="slds-p-around_medium">
            <div style="height: 500px;">
                <lightning-datatable
                    key-field="apiName"
                    data={objects}
                    columns={columns}
                    hide-checkbox-column="true">
                </lightning-datatable>
            </div>
        </div>
    </lightning-card>
</template>
```

Related LWC Javascript

```java
import { LightningElement, wire, track } from 'lwc';
import getObjectList from '@salesforce/label/c.getObjectList'; // Change to @salesforce/apex/ObjectSchemaController.getObjectList

// Define the columns for the table
const COLUMNS = [
    { label: 'Object Label', fieldName: 'label', type: 'text', sortable: true },
    { label: 'API Name', fieldName: 'apiName', type: 'text', sortable: true }
];

export default class ObjectList extends LightningElement {
    columns = COLUMNS;
    @track objects = [];

    // "Wire" the Apex method to the objects property
    @wire(getObjectList)
    wiredObjects({ error, data }) {
        if (data) {
            this.objects = data;
        } else if (error) {
            console.error('Error fetching objects:', error);
        }
    }
}
```

Related Meta XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>60.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__AppPage</target>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>
```
