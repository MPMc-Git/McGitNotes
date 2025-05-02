###### I do love me some SOQL. Sure, some of these may be Report-able NOW, but they weren't at the time.

## Licenses
#### CPQ Assigned (Count)
> SELECT Id, Name, Status, TotalLicenses, UsedLicenses<br />
> FROM UserLicense<br />
> WHERE Name LIKE 'Salesforce CPQ%'

#### PermSet Licenses (Count)
> SELECT Id, MasterLabel, Status, ExpirationDate, TotalLicenses, UsedLicenses<br />
> FROM PermissionSetLicense<br />
> WHERE Status = 'Active'<br />
> ORDER BY MasterLabel

#### Salesforce Licenses (Count)
> SELECT Id, Name, Status, TotalLicenses, UsedLicenses<br />
> FROM UserLicense<br />
> WHERE Name = 'Salesforce'

## Users
Sometimes there just isn't a Report already put together to show me the data I'm after, so I improvised
#### Find by Email
> SELECT Id, Name, Username, Email, UserRole.Name, Profile.Name<br />
> FROM User<br />
> WHERE email = 'name@domain.tld'<br />
> ORDER BY Name

#### Find by Federation ID (SSO)
> SELECT Id, Name, Username, Email, FederationIdentifier, UserRole.Name, Profile.Name<br />
> FROM User<br />
> WHERE FederationIdentifier = ‘could be email address or ask IT'<br />
> ORDER BY Name

#### Find by Username
> SELECT Id, Name, Username, Email, UserRole.Name, Profile.Name<br />
> FROM User<br />
> WHERE username = 'name@domain.tld'<br />
> ORDER BY Name

#### Counts of Types & Profiles
> SELECT count(id) Users, UserType, ProfileId, Profile.Name<br />
> FROM User<br />
> WHERE IsActive = TRUE<br />
> GROUP BY UserType, ProfileId, Profile.Name<br />
> ORDER BY Profile.Name

#### Users with their Roles & Profiles
> SELECT Id,Name, UserRole.Name, Profile.Name<br />
> FROM User<br />
> WHERE IsActive = TRUE<br />
> ORDER BY Name

#### ...with their Permission Sets
> SELECT Id,PermissionSetID, PermissionSet.Label, Assignee.Id, Assignee.Name<br />
> FROM PermissionSetAssignment<br />
> WHERE Assignee.UserType = 'Standard'<br />
>    AND Assignee.IsActive = TRUE<br />
>    AND (NOT PermissionSet.Name LIKE 'X00%')<br />
> ORDER BY PermissionSet.Label, Assignee.Name

#### ...with their Permission Set Licenses
> SELECT Id,PermissionSetLicenseID, PermissionSetLicense.MasterLabel, Assignee.Id, Assignee.Name<br />
> FROM PermissionSetLicenseAssign<br />
> WHERE Assignee.UserType = 'Standard'<br />
>    AND Assignee.IsActive = TRUE<br />
> ORDER BY PermissionSetLicense.MasterLabel, Assignee.Name

#### ...with Specific System Permissions
> SELECT Id, PermissionSetID, PermissionSet.Label, PermissionSet.Profile. Name, Assignee.Id, Assignee.Name<br />
> FROM PermissionSetAssignment<br />
> WHERE Assignee.UserType = 'Standard'<br />
>    AND Assignee.IsActive = TRUE<br />
>    AND PermissionSet.PermissionsAuthorApex = TRUE<br />
> ORDER BY PermissionSet.Profile.Name, Assignee.Name

## Access-Related
#### Specific Record Access for Specific User ID
> SELECT RecordId, MaxAccessLevel, HasAllAccess, HasDeleteAccess, HasEditAccess, HasReadAccess, HasTransferAccess<br />
> FROM UserRecordAccess<br />
> WHERE UserId = '005...'<br />
> AND RecordId = '001...'

#### Object Permissions based on Profile
> SELECT Id, SobjectType, PermissionsCreate, PermissionsRead, PermissionsEdit, PermissionsDelete, PermissionsViewAllRecords, PermissionsModifyAllRecords, ParentId, Parent.Profile.Name<br />
> FROM ObjectPermissions<br />
> WHERE (NOT Parent.Profile.Name = '')<br />
> ORDER BY SobjectType

#### ...based on Permission Set
> SELECT Id, SobjectType, PermissionsCreate, PermissionsRead, PermissionsEdit, PermissionsDelete, PermissionsViewAllRecords, PermissionsModifyAllRecords, Parent.Name<br />
> FROM ObjectPermissions<br />
> WHERE (NOT Parent.Name LIKE 'X00%')<br />
> ORDER BY SobjectType

#### Field Permissions based on Profile
> SELECT Id, Field, PermissionsEdit, PermissionsRead, ParentId, Parent.Profile.Name<br />
> FROM FieldPermissions<br />
> WHERE (NOT Parent.Profile.Name = '')<br />
> ORDER BY Field

#### ...based on Permission Set
> SELECT Id, Field, PermissionsEdit, PermissionsRead, ParentId, Parent.Name<br />
> FROM FieldPermissions<br />
> WHERE (NOT Parent.Name LIKE 'X00%')<br />
> ORDER BY Field

#### ...on Specific Object
> SELECT Id, Field, PermissionsEdit, PermissionsRead, ParentId, Parent.Profile.Name<br />
> FROM FieldPermissions<br />
> WHERE SobjectType = 'Opportunity'<br />
> ORDER BY Field

## Schema Stuff
#### All Record Types
This will list Custom Objects first - not sure why
> SELECT Id, IsActive, SobjectType, Name, DeveloperName, Description<br />
> FROM RecordType<br />
> ORDER BY SobjectType, Name

#### Field Information by Specific Object
> SELECT PublisherId, EntityDefinition.QualifiedApiName, MasterLabel, QualifiedApiName, DataType, Length, Description<br />
> FROM FieldDefinition<br />
> WHERE EntityDefinition.QualifiedApiName = 'Account'<br />
> ORDER BY MasterLabel

#### Fields with History Tracking by Specific Object
> SELECT QualifiedApiName, LastModifiedDate<br />
> FROM FieldDefinition<br />
> WHERE IsFieldHistoryTracked = true AND EntityDefinition.QualifiedApiName = 'Opportunity'

#### Field History Tracking by Specific Object
> SELECT AccountId, Field, OldValue, NewValue, CreatedBy.Name<br />
> FROM AccountHistory<br />
> WHERE Field <> 'created'<br />
> ORDER BY AccountId, Field

Other Objects:
- Account = AccountHistory
- Contact = ContactHistory
- Opportunity = OpportunityHistory
- etc. = etcHistory

#### Field History by Specific Custom Object
> SELECT Name, CreatedBy.Name, (SELECT OldValue, NewValue FROM Histories)<br />
> FROM Project__c

#### Text-Related Field Lengths
> SELECT PublisherId, MasterLabel, QualifiedApiName, DataType, Length, Description<br />
> FROM FieldDefinition<br />
> WHERE EntityDefinition.QualifiedApiName = 'Task' AND DataType LIKE '%TEXT%'<br />
> ORDER BY MasterLabel

#### Dynamic Dashboards
> SELECT Id,FolderName,Title,Type<br />
> FROM Dashboard<br />
> WHERE Type = 'LoggedInUser' OR Type = 'MyTeamUser'<br />
> ORDER BY FolderName,Title

#### Scheduled Jobs - Reports/Apex
> SELECT CreatedDate, TimesTriggered, CronExpression, CreatedBy.Name, CronJobDetail.Name, CronJobDetail.JobType<br />
> FROM CronTrigger<br />
> ORDER BY CronJobDetail.Name

^ How To Interpret That In Excel ^<br />
SWITCH Command for Excel to interpret the JobType (this is likely out of date): 
> =SWITCH(CELL,1,"Data Export",3,"Dashboard Refresh",4,"Reporting Snapshot",6,"Scheduled Flow",7,"Scheduled Apex",8,"Report Run",9,"Batch Job","A","Reporting Notification","E","Search Engine Incremental Optimization","G","Search Engine Optimization Generation")

## Financial Services Cloud
Yeah... I know it's going away... but it MIGHT still be useful
#### All Account Contact Relations
> SELECT AccountId,Account.Name,ContactId,Contact.Name,Id,Roles,IsActive,IsDirect,FinServ__Primary__c,FinServ__PrimaryGroup__c,FinServ__IncludeInGroup__c,FinServ__Rollups__c<br />
> FROM AccountContactRelation<br />
> WHERE AccountId = '<ID>'

#### Roles & Reciprocal Roles
> SELECT FinServ__CreateInverseRole__c,Name,FinServ__InverseRole__c<br />
> FROM FinServ__ReciprocalRole__c
