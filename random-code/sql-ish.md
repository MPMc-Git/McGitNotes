## Information Gathering
#### Get All Tables & Fields
`SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE`<br />
`FROM INFORMATION_SCHEMA.COLUMNS`

#### Zips Variants wLeading Zeros
Replace all "ZipCode" with appropriate field and "tTable" with appropriate table name<br />
` SELECT CASE`<br />
`	WHEN LEN(ZipCode) = 4 THEN FORMAT(CAST(ZipCode AS numeric),'00000')`<br />
`	WHEN LEN(ZipCode) = 5 THEN FORMAT(CAST(ZipCode AS numeric),'00000')`<br />
`	WHEN LEN(ZipCode) = 8 THEN FORMAT(CAST(ZipCode AS numeric),'00000-0000')`<br />
`	WHEN LEN(ZipCode) = 9 THEN FORMAT(CAST(ZipCode AS numeric),'00000-0000')`<br />
`	ELSE ZipCode`<br />
`	END`<br />
`FROM tTable`

#### Store Procedure to Search All Tables
https://gist.github.com/chrispret/959420810973b60d2c3b7f136f5f1cc0<br />
SP_SearchTables.sql

##System Specific Examples
#### Get Labels / API Names - Dynamics CRM
https://axforum.info/forums/showthread.php?t=27429<br />
http://mscrm-chandan.blogspot.com/2013/04/get-all-attribute-detail-of-entity-in.html<br />
Note the line above ORDER BY can be changed to reflect other tables/objects<br />
`SELECT EntityView.Name AS EntityName, LocalizedLabelView_1.Label AS EntityDisplayName, AttributeView.Name AS AttributeName, LocalizedLabelView_2.Label AS AttributeDisplayName`<br />
`FROM LocalizedLabelView AS LocalizedLabelView_2`<br />
`INNER JOIN AttributeView ON LocalizedLabelView_2.ObjectId = AttributeView.AttributeId`<br />
`RIGHT OUTER JOIN EntityView`<br />
`INNER JOIN LocalizedLabelView AS LocalizedLabelView_1`<br />
`   ON EntityView.EntityId = LocalizedLabelView_1.ObjectId`<br />
`   ON AttributeView.EntityId = EntityView.EntityId`<br />
`WHERE LocalizedLabelView_1.ObjectColumnName = 'LocalizedName'`<br />
`   AND LocalizedLabelView_2.ObjectColumnName = 'DisplayName'`<br />
`   AND LocalizedLabelView_1.LanguageId = '1033'`<br />
`   AND LocalizedLabelView_2.LanguageId = '1033'`<br />
`   AND EntityView.Name IN ('Account')`<br />
/* ^^^ This can be changed to Contact, etc. ^^^ */<br />
`ORDER BY EntityName, AttributeName`<br />

#### An XML PATH example
If you want counts, I’ve only been able to do that via Excel (Remove Duplicates)<br />
`SELECT DISTINCT tc.ID,`<br />
` (SELECT SUBSTRING(`<br />
`    (SELECT ',' +  Classification`<br />
`    FROM tblClientClassifications tcc`<br />
`    WHERE tc.ID = tcc.ClientID`<br />
`    ORDER BY Classification FOR XML PATH('')),2,200000)`<br />
` ) AS Classifications,`<br />
` (SELECT SUBSTRING(`<br />
`    (SELECT ',' +  Keyword`<br />
`    FROM tblClientKeywords tck`<br />
`    WHERE tc.ID = tck.ClientID`<br />
`    ORDER BY Keyword FOR XML PATH('')),2,200000)`<br />
` ) AS Keywords,`<br />
` (SELECT SUBSTRING(`<br />
`    (SELECT ',' +  Interest`<br />
`    FROM tblClientInterests tci`<br />
`    WHERE tc.ID = tci.ClientID`<br />
`    ORDER BY Keyword FOR XML PATH('')),2,200000)`<br />
` ) AS Interests`<br />
`FROM tblClients tc`
