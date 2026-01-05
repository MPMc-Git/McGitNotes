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

#### LWC - Object Javascript

??? tip "objectListExporter.js"
        import { LightningElement, wire, track } from 'lwc';
        import getObjectList from '@salesforce/apex/ObjectSchemaController.getObjectList';

        const COLUMNS = [
            { label: 'Object Label', fieldName: 'label', type: 'text' },
            { label: 'API Name', fieldName: 'apiName', type: 'text' },
            { label: 'Queryable', fieldName: 'isQueryable', type: 'boolean' }
        ];

        export default class ObjectListExporter extends LightningElement {
            @track objects = [];
            columns = COLUMNS;

            @wire(getObjectList)
            wiredObjects({ error, data }) {
                if (data) {
                    this.objects = data;
                } else if (error) {
                    console.error('Error fetching objects:', error);
                }
            }

            // Logic for the HTML button disabled attribute
            get isDownloadDisabled() {
                return !this.objects || this.objects.length === 0;
            }

            downloadCSV() {
                console.log('Object Export Button Clicked');
                try {
                    const headers = ['Object Label', 'API Name', 'Is Queryable'];
                    let csvContent = headers.join(',') + '\n';

                    this.objects.forEach(obj => {
                        let row = [
                            `"${obj.label || ''}"`,
                            `"${obj.apiName || ''}"`,
                            obj.isQueryable
                        ];
                        csvContent += row.join(',') + '\n';
                    });

                    this.executeDownload(csvContent, 'All_Org_Objects.csv');
                } catch (error) {
                    console.error('Export Failed:', error);
                }
            }

            executeDownload(csvContent, fileName) {
            try {
                // 1. Encode the CSV string to Base64 to bypass LWS MIME type restrictions
                // btoa() creates a base-64 encoded ASCII string from a "string" of binary data
                const base64Data = btoa(unescape(encodeURIComponent(csvContent)));
                const dataUri = 'data:text/csv;base64,' + base64Data;

                // 2. Create the download link
                const link = document.createElement('a');
                link.href = dataUri;
                link.download = fileName;

                // 3. Trigger the download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                console.log('Download successful via Base64/DataURI');
            } catch (err) {
                console.error('LWS Download Error: ', err);
                
                // Fallback for very simple browsers if Base64 fails
                const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                }
            }
        }

#### LWC - Object HTML

??? tip "objectListExporter.html"
        ```html
        <template>
            <lightning-card title="Org Object Metadata" icon-name="standard:multi_select_checkbox">
                <lightning-button 
                    slot="actions" 
                    label="Download as CSV" 
                    icon-name="utility:download" 
                    onclick={downloadCSV}>
                </lightning-button>

                <div class="slds-var-p-around_medium">
                    <div style="height: 600px;">
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

#### LWC - Field Javascript

??? tip "fieldListExporter.js"
        import { LightningElement, wire, track } from 'lwc';
        import getObjectList from '@salesforce/apex/ObjectSchemaController.getObjectList';
        import getFieldsForObject from '@salesforce/apex/ObjectSchemaController.getFieldsForObject';

        const COLUMNS = [
            { label: 'Label', fieldName: 'label', type: 'text', initialWidth: 160 },
            { label: 'API Name', fieldName: 'apiName', type: 'text', initialWidth: 160 },
            { label: 'Type', fieldName: 'type', type: 'text', initialWidth: 100 },
            { label: 'Len', fieldName: 'length', type: 'number', initialWidth: 70 },
            { label: 'Formula', fieldName: 'isFormula', type: 'boolean', initialWidth: 80 },
            { label: 'Formula SQL', fieldName: 'formulaSql', type: 'text', initialWidth: 250 },
            { label: 'Unique', fieldName: 'isUnique', type: 'boolean', initialWidth: 80 },
            { label: 'Ext ID', fieldName: 'isExternalId', type: 'boolean', initialWidth: 80 }
        ];

        export default class FieldListExporter extends LightningElement {
            @track selectedObject = '';
            @track objectOptions = [];
            @track fields = [];
            columns = COLUMNS;

            @wire(getObjectList)
            wiredObjects({ error, data }) {
                if (data) {
                    this.objectOptions = data.map(obj => ({ label: obj.label, value: obj.apiName }));
                }
            }

            @wire(getFieldsForObject, { objectApiName: '$selectedObject' })
            wiredFields({ error, data }) {
                if (data) {
                    this.fields = data;
                } else {
                    this.fields = [];
                }
            }

            get isDownloadDisabled() {
                return !this.fields || this.fields.length === 0;
            }

            handleObjectChange(event) {
                this.selectedObject = event.detail.value;
            }

            downloadCSV() {
                console.log('Field Export Button Clicked for: ' + this.selectedObject);
                try {
                    const headers = ['Label', 'API Name', 'Type', 'Length', 'Is Formula', 'Formula SQL', 'Unique', 'External ID'];
                    let csvContent = headers.join(',') + '\n';

                    this.fields.forEach(f => {
                        let row = [
                            `"${f.label || ''}"`,
                            `"${f.apiName || ''}"`,
                            `"${f.type || ''}"`,
                            f.length,
                            f.isFormula,
                            `"${f.formulaSql ? f.formulaSql.replace(/"/g, '""') : ''}"`,
                            f.isUnique,
                            f.isExternalId
                        ];
                        csvContent += row.join(',') + '\n';
                    });

                    this.executeDownload(csvContent, `${this.selectedObject}_Fields.csv`);
                } catch (error) {
                    console.error('Field Export Failed:', error);
                }
            }

            executeDownload(csvContent, fileName) {
            try {
                // 1. Encode the CSV string to Base64 to bypass LWS MIME type restrictions
                // btoa() creates a base-64 encoded ASCII string from a "string" of binary data
                const base64Data = btoa(unescape(encodeURIComponent(csvContent)));
                const dataUri = 'data:text/csv;base64,' + base64Data;

                // 2. Create the download link
                const link = document.createElement('a');
                link.href = dataUri;
                link.download = fileName;

                // 3. Trigger the download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                console.log('Download successful via Base64/DataURI');
            } catch (err) {
                console.error('LWS Download Error: ', err);
                
                // Fallback for very simple browsers if Base64 fails
                const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                }
            }
        }

#### LWC - Field HTML

??? tip "fieldListExporter.hml"
        ```html
        <template>
            <lightning-card title="Field List Exporter" icon-name="standard:field_sales">
                <lightning-button 
                    slot="actions" 
                    label="Download as CSV" 
                    icon-name="utility:download" 
                    onclick={downloadCSV}
                    disabled={isDownloadDisabled}>
                </lightning-button>

                <div class="slds-var-p-around_medium">
                    <lightning-combobox
                        name="objectSelector"
                        label="Select an Object"
                        value={selectedObject}
                        placeholder="Search for an object..."
                        options={objectOptions}
                        onchange={handleObjectChange}
                        class="slds-var-m-bottom_medium">
                    </lightning-combobox>

                    <div style="height: 500px;">
                        <lightning-datatable
                            key-field="apiName"
                            data={fields}
                            columns={columns}
                            hide-checkbox-column="true">
                        </lightning-datatable>
                    </div>
                </div>
            </lightning-card>
        </template>
        ```
