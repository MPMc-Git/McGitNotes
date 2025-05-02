
<img src="https://gifsec.com/wp-content/uploads/2021/04/but-why-gif-1.gif" style="float:center;width:350px;height:200px"><br />
Sometimes I like to make things more difficult 😁

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

## Where Is This Used?
NOT overly useful but there are suggestions cooler functionality may be coming
#### ...via Developer Console using Tooling API
> SELECT RefMetadataComponentName, MetadataComponentId, MetadataComponentType, MetadataComponentName<br />
> FROM MetadataComponentDependency<br />
> WHERE RefMetadataComponentType = 'CustomField' AND RefMetadataComponentId = '<FIELDID>'<br />
> ORDER By RefMetadataComponentName

#### ...via REST Explorer Utility in Workbench
> <I don't want to type this up yet> 
