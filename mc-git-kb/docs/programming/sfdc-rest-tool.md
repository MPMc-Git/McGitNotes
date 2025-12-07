
<img src="https://gifsec.com/wp-content/uploads/2021/04/but-why-gif-1.gif" style="float:center;width:350px;height:200px"><br />
Sometimes I like to make things more difficult 😁

## Apex Code Coverage
Salesforce exposes coverage through Tooling API objects like:
- ApexCodeCoverage (per-test-method detail)
- ApexCodeCoverageAggregate (rollups per class/trigger)
- ApexOrgWideCoverage (your overall org %)
```sql
SELECT ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered, Coverage
FROM ApexCodeCoverageAggregate
WHERE ApexClassOrTrigger.Name = ‘YourClassName’

SELECT PercentCovered
FROM ApexOrgWideCoverage

SELECT ApexClassOrTrigger.Name, TestMethodName, NumLinesCovered, NumLinesUncovered
FROM ApexCodeCoverage
```

## Page Layout Assignments
#### ...via Developer Console using Tooling API
> SELECT RefMetadataComponentName, MetadataComponentId, MetadataComponentType, MetadataComponentName<br />
> FROM MetadataComponentDependency<br />
> WHERE RefMetadataComponentType = 'CustomField' AND RefMetadataComponentId = '<FIELDID>'<br />
> ORDER By RefMetadataComponentName

#### ...via REST Explorer Utility in Workbench
> <I don't want to type this up yet> 

## Validation Rule Errors
#### ...via Developer Console using Tooling API
> SELECT Id, Active, Description, EntityDefinition.DeveloperName, ErrorDisplayField, ErrorMessage<br />
> FROM ValidationRule

#### ...via REST Explorer Utility in Workbench
> /services/data/v50.0/tooling/query?q=Select+Id,Active,Description,EntityDefinition.DeveloperName,ErrorDisplayField,+ErrorMessage+From+ValidationRule

## Email Alerts
#### ...via Developer Console using Tooling API
> SELECT Id, DeveloperName, SenderType<br />
> FROM WorkflowAlert

#### ...via REST Explorer Utility in Workbench
> /services/data/v50.0/tooling/query?q=Select+Id,DeveloperName,SenderType+From+WorkflowAlert

## All Lightning Pages
### ...via REST Explorer Utility in Workbench
> /services/data/v58.0/tooling/query?q=SELECT+Id,Description,DeveloperName,EntityDefinitionId+FROM+FlexiPage

## Where Is This Used?
NOT overly useful but there are suggestions cooler functionality may be coming
#### ...via Developer Console using Tooling API
> SELECT RefMetadataComponentName, MetadataComponentId, MetadataComponentType, MetadataComponentName<br />
> FROM MetadataComponentDependency<br />
> WHERE RefMetadataComponentType = 'CustomField' AND RefMetadataComponentId = '<FIELDID>'<br />
> ORDER By RefMetadataComponentName

#### ...via REST Explorer Utility in Workbench
> <I don't want to type this up yet> 
