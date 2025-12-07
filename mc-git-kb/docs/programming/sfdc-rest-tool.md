
<img src="https://gifsec.com/wp-content/uploads/2021/04/but-why-gif-1.gif" style="float:center;width:350px;height:200px"><br/>
Sometimes I like to make things more difficult 😁

#### NOTE about tooling in Workbench
Precede all the SELECTs below with...
```/services/data/v60.0/tooling/query?q=```

## Apex Code Coverage
Salesforce exposes coverage through Tooling API objects like:
- ApexCodeCoverage (per-test-method detail)
- ApexCodeCoverageAggregate (rollups per class/trigger)
- ApexOrgWideCoverage (your overall org %)

<small>...via Developer Console using Tooling API</small>

```sql
SELECT ApexClassOrTrigger.Name, TestMethodName, NumLinesCovered, NumLinesUncovered
FROM ApexCodeCoverage

SELECT ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered, Coverage
FROM ApexCodeCoverageAggregate
WHERE ApexClassOrTrigger.Name = ‘YourClassName’

SELECT PercentCovered
FROM ApexOrgWideCoverage
```

<small>...via REST Explorer Utility in Workbench</small>

```sql
SELECT+ApexClassOrTrigger.Name,+TestMethodName,+NumLinesCovered,+NumLinesUncovered+FROM+ApexCodeCoverage

SELECT+ApexClassOrTrigger.Name,+NumLinesCovered,+NumLinesUncovered,+Coverage+FROM+ApexCodeCoverageAggregate+WHERE+ApexClassOrTrigger.Name+=+‘YourClassName’

SELECT+PercentCovered+FROM+ApexOrgWideCoverage
```

## Page Layout Assignments
<small>...via Developer Console using Tooling API</small>

```sql
SELECT RefMetadataComponentName, MetadataComponentId, MetadataComponentType, MetadataComponentName
FROM MetadataComponentDependency
WHERE RefMetadataComponentType = 'CustomField' AND RefMetadataComponentId = '<FIELDID>'
ORDER By RefMetadataComponentName
```

<small>...via REST Explorer Utility in Workbench</small>

```sql
SELECT+RefMetadataComponentName,+MetadataComponentId,+MetadataComponentType,+MetadataComponentName+FROM+MetadataComponentDependency+WHERE+RefMetadataComponentType+=+'CustomField'+AND+RefMetadataComponentId+=+'<FIELDID>'+ORDER+By+RefMetadataComponentName
```

## Validation Rule Errors
<small>...via Developer Console using Tooling API</small>

```sql
SELECT Id, Active, Description, EntityDefinition.DeveloperName, ErrorDisplayField, ErrorMessage
FROM ValidationRule
```

<small>...via REST Explorer Utility in Workbench</small>

```sql
Select+Id,Active,Description,EntityDefinition.DeveloperName,ErrorDisplayField,+ErrorMessage+From+ValidationRule
```

## Email Alerts
<small>...via Developer Console using Tooling API</small>

```sql
SELECT Id, DeveloperName, SenderType
FROM WorkflowAlert
```

<small>...via REST Explorer Utility in Workbench</small>

```sql
Select+Id,DeveloperName,SenderType+From+WorkflowAlert
```

## All Lightning Pages
<small>...via REST Explorer Utility in Workbench</small>

```sql
SELECT+Id,Description,DeveloperName,EntityDefinitionId+FROM+FlexiPage
```

## Where Is This Used?
NOT overly useful but there are suggestions cooler functionality may be coming

<small>...via Developer Console using Tooling API</small>

```sql
SELECT RefMetadataComponentName, MetadataComponentId, MetadataComponentType, MetadataComponentName
FROM MetadataComponentDependency
WHERE RefMetadataComponentType = 'CustomField' AND RefMetadataComponentId = '<FIELDID>'
ORDER By RefMetadataComponentName
```

<small>...via REST Explorer Utility in Workbench</small>

```sql
SELECT+RefMetadataComponentName,+MetadataComponentId,+MetadataComponentType,+MetadataComponentName+FROM+MetadataComponentDependency+WHERE+RefMetadataComponentType+=+'CustomField'+AND+RefMetadataComponentId+=+'<FIELDID>'+ORDER+By+RefMetadataComponentName
```