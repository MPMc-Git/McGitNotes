---
tags:
  - Apex
  - Javascript
  - LWC
  - Salesforce
---

## Display your SFDC Objects and lookup related Fields via LWC

#### Apex Class

??? tip "ObjectSchemaController.cls"
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

#### Apex Test Class

??? tip "ObjectSchemaControllerTest.cls"
        @isTest
        private class ObjectSchemaControllerTest {
            @isTest
            static void testAllLogic() {
                Test.startTest();
                // Test Objects
                List<ObjectSchemaController.ObjectWrapper> objs = ObjectSchemaController.getObjectList();
                Assert.isFalse(objs.isEmpty(), 'Should find objects');
                
                // Test Fields
                List<ObjectSchemaController.FieldWrapper> fields = ObjectSchemaController.getFieldsForObject('Account');
                Assert.isFalse(fields.isEmpty(), 'Account should have fields');
                
                // Test Null/Empty handling
                Assert.areEqual(0, ObjectSchemaController.getFieldsForObject('').size());
                Test.stopTest();
            }

            @isTest
            static void testConstructorAndSort() {
                // Test Object Sort
                ObjectSchemaController.ObjectWrapper o1 = new ObjectSchemaController.ObjectWrapper('B', 'B', true);
                ObjectSchemaController.ObjectWrapper o2 = new ObjectSchemaController.ObjectWrapper('A', 'A', true);
                List<ObjectSchemaController.ObjectWrapper> oList = new List<ObjectSchemaController.ObjectWrapper>{o1, o2};
                oList.sort();
                Assert.areEqual('A', oList[0].label);

                // Test Field Sort (8 parameters)
                ObjectSchemaController.FieldWrapper f1 = new ObjectSchemaController.FieldWrapper('B','B','String',255,false,'',false,false);
                ObjectSchemaController.FieldWrapper f2 = new ObjectSchemaController.FieldWrapper('A','A','String',255,false,'',false,false);
                List<ObjectSchemaController.FieldWrapper> fList = new List<ObjectSchemaController.FieldWrapper>{f1, f2};
                fList.sort();
                Assert.areEqual('A', fList[0].label);
            }
        }

