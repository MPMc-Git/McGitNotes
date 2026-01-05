---
tags:
  - Apex
  - Javascript
  - LWC
  - Salesforce
---

## Display your SFDC Objects and lookup related Fields via LWC

#### Apex Class

!!! tip "ObjectSchemaController.cls"
    ```javascript
        public with sharing class ObjectSchemaController {
        
        @AuraEnabled(cacheable=true)
        public static List<ObjectWrapper> getObjectList() {
            List<ObjectWrapper> objectList = new List<ObjectWrapper>();
            Map<String, Schema.SObjectType> globalDescribe = Schema.getGlobalDescribe();
            
            for(Schema.SObjectType objType : globalDescribe.values()){
                Schema.DescribeSObjectResult res = objType.getDescribe();
                objectList.add(new ObjectWrapper(res.getLabel(), res.getName(), res.isQueryable()));
            }
            objectList.sort();
            return objectList;
        }

        @AuraEnabled(cacheable=true)
        public static List<FieldWrapper> getFieldsForObject(String objectApiName) {
            if (String.isBlank(objectApiName)) return new List<FieldWrapper>();

            List<FieldWrapper> fieldList = new List<FieldWrapper>();
            Schema.SObjectType t = Schema.getGlobalDescribe().get(objectApiName);
            if (t == null) return fieldList;

            Map<String, Schema.SObjectField> fieldMap = t.getDescribe().fields.getMap();
            
            for(Schema.SObjectField field : fieldMap.values()) {
                Schema.DescribeFieldResult f = field.getDescribe();
                fieldList.add(new FieldWrapper(
                    f.getLabel(), 
                    f.getName(), 
                    String.valueOf(f.getType()),
                    f.getLength(),
                    f.isCalculated(),
                    f.getCalculatedFormula(),
                    f.isUnique(),
                    f.isExternalId()
                ));
            }
            fieldList.sort();
            return fieldList;
        }

        public class ObjectWrapper implements Comparable {
            @AuraEnabled public String label;
            @AuraEnabled public String apiName;
            @AuraEnabled public Boolean isQueryable;

            public ObjectWrapper(String label, String apiName, Boolean isQueryable) {
                this.label = label;
                this.apiName = apiName;
                this.isQueryable = isQueryable;
            }

            public Integer compareTo(Object compareTo) {
                return this.label.compareTo(((ObjectWrapper)compareTo).label);
            }
        }

        public class FieldWrapper implements Comparable {
            @AuraEnabled public String label;
            @AuraEnabled public String apiName;
            @AuraEnabled public String type;
            @AuraEnabled public Integer length;
            @AuraEnabled public Boolean isFormula;
            @AuraEnabled public String formulaSql;
            @AuraEnabled public Boolean isUnique;
            @AuraEnabled public Boolean isExternalId;

            public FieldWrapper(String label, String apiName, String type, Integer length, 
                                Boolean isFormula, String formulaSql, Boolean isUnique, Boolean isExternalId) {
                this.label = label;
                this.apiName = apiName;
                this.type = type;
                this.length = length;
                this.isFormula = isFormula;
                this.formulaSql = (formulaSql == null) ? '' : formulaSql;
                this.isUnique = isUnique;
                this.isExternalId = isExternalId;
            }

            public Integer compareTo(Object compareTo) {
                return this.label.compareTo(((FieldWrapper)compareTo).label);
            }
        }
    }
```