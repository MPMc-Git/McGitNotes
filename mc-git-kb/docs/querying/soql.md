<style>
th {
    text-align: center !important;
}
</style>

!!! info
    I do love me some SOQL. Sometimes there just isn't a Report already put together to show me the data I'm after, so I improvised.

## Licenses
<table>
 <thead>
  <tr>
   <th>Salesforce Licenses</th>
   <th>PermSet Licenses</th>
   <th>CPQ Assigned</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td>
    ```sql
    SELECT Id, Name, Status,
     TotalLicenses, UsedLicenses
    FROM UserLicense
    WHERE Name = 'Salesforce'
    ```
   </td>
   <td>
    ```sql
    SELECT Id, MasterLabel, Status,
     ExpirationDate, TotalLicenses,
     UsedLicenses
    FROM PermissionSetLicense
    WHERE Status = 'Active'
    ORDER BY MasterLabel
    ```
   </td>
   <td>
    ```sql
    SELECT Id, Name, Status,
     TotalLicenses, UsedLicenses
    FROM UserLicense
    WHERE Name LIKE 'Salesforce CPQ%'
    ```
   </td>
  </tr>
 </tbody>
</table>

## Users 
<table>
  <tr>
   <th>New-ish Users</th>
   <th>Frozen Users</th>
  </tr>
  <tr>
   <td>
    ```sql
    SELECT Id, CreatedDate
    FROM User
    WHERE CreatedDate = LAST_QUARTER
    ```
   </td>
   <td>
    ```sql
    SELECT IsFrozen, UserId
    FROM UserLogin
    WHERE IsFrozen = TRUE
    ```
   </td>
  </tr>
  <tr>
   <th>Counts of Types & Profiles</th>
   <th></th>
   <td>
    ```sql
    SELECT count(id) Users, UserType, ProfileId, Profile.Name
    FROM User
    WHERE IsActive = TRUE
    GROUP BY UserType, ProfileId, Profile.Name
    ORDER BY Profile.Name
    ```
   </td>
   <td></td>
  </tr>
  <tr>
   <th>...with their License Type</th>
   <th>...with their Roles & Profiles</th>
  </tr>
  <tr>
   <td>
    ```sql
    SELECT Id, FirstName, LastName,
     Profile.UserLicense.LicenseDefinitionKey,
     Profile.UserLicense.MasterLabel
    FROM User
    WHERE IsActive = TRUE
    ```
   </td>
   <td>
    ```sql
    SELECT Id,Name, UserRole.Name, Profile.Name
    FROM User
    WHERE IsActive = TRUE
    ORDER BY Name
    ```
   </td>
  </tr>
  <tr>
   <th colspan=2>...with their Permission Sets</th>
  </tr>
  <tr>
   <td colspan=2>
    ```sql
    SELECT Id,PermissionSetID, PermissionSet.Label, Assignee.Id, Assignee.Name
    FROM PermissionSetAssignment
    WHERE Assignee.UserType = 'Standard'
       AND Assignee.IsActive = TRUE
       AND (NOT PermissionSet.Name LIKE 'X00%')
    ORDER BY PermissionSet.Label, Assignee.Name
    ```
   </td>
  </tr>
  <tr>
   <th colspan=2>...with their Permission Set Licenses</th>
  </tr>
  <tr>
   <td colspan=2>
    ```sql
    SELECT Id,PermissionSetLicenseID, PermissionSetLicense.MasterLabel, Assignee.Id, Assignee.Name
    FROM PermissionSetLicenseAssign
    WHERE Assignee.UserType = 'Standard'
       AND Assignee.IsActive = TRUE
    ORDER BY PermissionSetLicense.MasterLabel, Assignee.Name
    ```
   </td>
  </tr>
  <tr>
   <th colspan=2>...with Specific System Permissions</th>
  </tr>
  <tr>
   <td colspan=2>
    ```sql
    SELECT Id, PermissionSetID, PermissionSet.Label, PermissionSet.Profile. Name, Assignee.Id, Assignee.Name
    FROM PermissionSetAssignment
    WHERE Assignee.UserType = 'Standard'
       AND Assignee.IsActive = TRUE
       AND PermissionSet.PermissionsAuthorApex = TRUE
    ORDER BY PermissionSet.Profile.Name, Assignee.Name</td>
    ```
  </tr>
</table>

## Finding Users
<table>
  <tr>
   <th>...by Username</th>
   <th>...by Email</th>
   <th>...by Federation ID (SSO)</th>
  </tr>
  <tr>
   <td>
    ```sql
    SELECT Id, Name, Username, Email,
     UserRole.Name, Profile.Name
    FROM User
    WHERE username = 'name@domain.tld'
    ORDER BY Name
    ```
   </td>
   <td>
    ```sql
    SELECT Id, Name, Username, Email,
     UserRole.Name, Profile.Name
    FROM User
    WHERE email = 'name@domain.tld'
    ORDER BY Name
    ```
   </td>
   <td>
    ```sql
    SELECT Id, Name, Username, Email,
     FederationIdentifier, UserRole.Name,
      Profile.Name
    FROM User
    WHERE FederationIdentifier =
     ‘could be email address or ask IT'
    ORDER BY Name
    ```
    </td>
  </tr>
</table>




## Access-Related
#### 

#### Specific Record Access for Specific User ID
> SELECT RecordId, MaxAccessLevel, HasAllAccess, HasDeleteAccess, HasEditAccess, HasReadAccess, HasTransferAccess
> FROM UserRecordAccess
> WHERE UserId = '005...'
> AND RecordId = '001...'

#### All Permission Sets in Permission Set Groups
> SELECT Id, PermissionSetGroupId, PermissionSetGroup.MasterLabel, PermissionSetId, PermissionSet.Name
> FROM PermissionSetGroupComponent

#### All Permission Sets - YAY
###### Type = Profile will have the Label of '00e...', but that's why Profile.Name exists
> SELECT Id, Type, Label, Profile.Name, ProfileId
> FROM PermissionSet

#### SOQL Custom Permission
###### Gotta be honest, I forget why I did this 
> SELECT ParentId, Parent.Name
> FROM SetupEntityAccess
> WHERE SetupEntityId IN (SELECT Id
>  FROM CustomPermission
>  WHERE DeveloperName = 'Salesforce_CPQ_Permission')

#### Object Permissions based on Profile
> SELECT Id, SobjectType, PermissionsCreate, PermissionsRead, PermissionsEdit, PermissionsDelete, PermissionsViewAllRecords, PermissionsModifyAllRecords, ParentId, Parent.Profile.Name
> FROM ObjectPermissions
> WHERE (NOT Parent.Profile.Name = '')
> ORDER BY SobjectType

#### ...based on Permission Set
> SELECT Id, SobjectType, PermissionsCreate, PermissionsRead, PermissionsEdit, PermissionsDelete, PermissionsViewAllRecords, PermissionsModifyAllRecords, Parent.Name
> FROM ObjectPermissions
> WHERE (NOT Parent.Name LIKE 'X00%')
> ORDER BY SobjectType

#### Field Permissions based on Profile
> SELECT Id, Field, PermissionsEdit, PermissionsRead, ParentId, Parent.Profile.Name
> FROM FieldPermissions
> WHERE (NOT Parent.Profile.Name = '')
> ORDER BY Field

#### ...based on Permission Set
> SELECT Id, Field, PermissionsEdit, PermissionsRead, ParentId, Parent.Name
> FROM FieldPermissions
> WHERE (NOT Parent.Name LIKE 'X00%')
> ORDER BY Field

#### ...on Specific Object
> SELECT Id, Field, PermissionsEdit, PermissionsRead, ParentId, Parent.Profile.Name
> FROM FieldPermissions
> WHERE SobjectType = 'Opportunity'
> ORDER BY Field

## Schema Stuff
#### All Record Types
This will list Custom Objects first - not sure why
> SELECT Id, IsActive, SobjectType, Name, DeveloperName, Description
> FROM RecordType
> ORDER BY SobjectType, Name

#### Field Information by Specific Object
> SELECT PublisherId, EntityDefinition.QualifiedApiName, MasterLabel, QualifiedApiName, DataType, Length, Description
> FROM FieldDefinition
> WHERE EntityDefinition.QualifiedApiName = 'Account'
> ORDER BY MasterLabel

#### Fields with History Tracking by Specific Object
> SELECT QualifiedApiName, LastModifiedDate
> FROM FieldDefinition
> WHERE IsFieldHistoryTracked = true AND EntityDefinition.QualifiedApiName = 'Opportunity'

#### Field History Tracking by Specific Object
> SELECT AccountId, Field, OldValue, NewValue, CreatedBy.Name
> FROM AccountHistory
> WHERE Field <> 'created'
> ORDER BY AccountId, Field

Other Objects:
- Account = AccountHistory
- Contact = ContactHistory
- Opportunity = OpportunityHistory
- etc. = etcHistory

#### Field History by Specific Custom Object
> SELECT Name, CreatedBy.Name, (SELECT OldValue, NewValue FROM Histories)
> FROM Project__c

#### Text-Related Field Lengths
> SELECT PublisherId, MasterLabel, QualifiedApiName, DataType, Length, Description
> FROM FieldDefinition
> WHERE EntityDefinition.QualifiedApiName = 'Task' AND DataType LIKE '%TEXT%'
> ORDER BY MasterLabel

#### Dynamic Dashboards
> SELECT Id,FolderName,Title,Type
> FROM Dashboard
> WHERE Type = 'LoggedInUser' OR Type = 'MyTeamUser'
> ORDER BY FolderName,Title

#### Scheduled Jobs - Reports/Apex
> SELECT CreatedDate, TimesTriggered, CronExpression, CreatedBy.Name, CronJobDetail.Name, CronJobDetail.JobType
> FROM CronTrigger
> ORDER BY CronJobDetail.Name
^ How To Interpret That In Excel ^
SWITCH Command for Excel to interpret the JobType (this is likely out of date): 
> =SWITCH(CELL,1,"Data Export",3,"Dashboard Refresh",4,"Reporting Snapshot",6,"Scheduled Flow",7,"Scheduled Apex",8,"Report Run",9,"Batch Job","A","Reporting Notification","E","Search Engine Incremental Optimization","G","Search Engine Optimization Generation")

## Other
#### Gathering info from SetupAuditTrail
###### The "Section" may change from month-to-month. Why this is called Section and not Type is beyond me. If you know, don't ruin the mystery for me.
> SELECT Id, CreatedDate, CreatedBy.UserName, ResponsibleNamespacePrefix, Display, Section, DelegateUser
> FROM SetupAuditTrail WHERE CreatedDate >= 2024-01-01T00:00:00.000Z
> AND CreatedDate < 2024-02-01T00:00:00.000Z

#### SOQL Lightning Components
> SELECT AuraDefinitionBundleInfoId, AuraDefinitionId, DefType, DeveloperName, DurableId, Format, Id, LastModifiedDate, NamespacePrefix, Source
> FROM AuraDefinitionInfo
> LIMIT 100

## Financial Services Cloud
Yeah... I know it's going away... but it MIGHT still be useful
#### All Account Contact Relations
> SELECT AccountId,Account.Name,ContactId,Contact.Name,Id,Roles,IsActive,IsDirect,FinServ__Primary__c,FinServ__PrimaryGroup__c,FinServ__IncludeInGroup__c,FinServ__Rollups__c
> FROM AccountContactRelation
> WHERE AccountId = '<ID>'

#### Roles & Reciprocal Roles
> SELECT FinServ__CreateInverseRole__c,Name,FinServ__InverseRole__c
> FROM FinServ__ReciprocalRole__c

<table>
  <tr>
   <th></th>
  </tr>
  <tr>
   <td></td>
  </tr>
</table>
