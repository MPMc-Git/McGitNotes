###### I do love me some SOQL

## Licenses
#### Salesforce Licenses (Count)
`SELECT Id, Name, Status, TotalLicenses, UsedLicenses`<br />
`FROM UserLicense`<br />
`WHERE Name = 'Salesforce'`

#### PermSet Licenses (Count)
`SELECT Id, MasterLabel, Status, ExpirationDate, TotalLicenses, UsedLicenses`<br />
`FROM PermissionSetLicense`<br />
`WHERE Status = 'Active'`<br />
`ORDER BY MasterLabel`

#### CPQ Assigned (Count)
`SELECT Id, Name, Status, TotalLicenses, UsedLicenses`<br />
`FROM UserLicense`<br />
`WHERE Name LIKE 'Salesforce CPQ%'`

## Users
Sometimes there just isn't a Report already put together to show me the data I'm after, so I improvised
#### Find by Username
`SELECT Id, Name, Username, Email, UserRole.Name, Profile.Name`<br />
`FROM User`<br />
`WHERE username = 'name@domain.tld'`<br />
`ORDER BY Name`

