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
