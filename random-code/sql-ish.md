## Information Gathering
#### Get All Tables & Fields
```sql
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
```

#### Search for Column in all Tables
```sql
SELECT O.Name 'Table', C.Name 'Column'
FROM Sys.columns C
INNER JOIN sys.objects O ON C.object_id=O.object_id
WHERE C.name LIKE '%class%'
ORDER by O.name;
```

#### Column Info from Specific Table
```sql
SELECT column_name 'Column Name', data_type 'Data Type', Character_maximum_length 'Maximum Length'
FROM information_schema.columns
WHERE table_name = table_name
ORDER BY column_name
```

#### Columns that match between two Tables (this was from Epicor v9.0.5)
```sql
SELECT A.COLUMN_NAME 'Column Name',
	A.TABLE_NAME 'Table 1',
	B.TABLE_NAME 'Table 2'
FROM INFORMATION_SCHEMA.COLUMNS A
JOIN INFORMATION_SCHEMA.COLUMNS B
	ON A.COLUMN_NAME = B.COLUMN_NAME
WHERE A.TABLE_NAME = 'part'
	AND B.TABLE_NAME = 'partbin'
	AND A.COLUMN_NAME NOT LIKE 'Character%'
	AND A.COLUMN_NAME NOT LIKE 'CheckBox%'
	AND A.COLUMN_NAME NOT LIKE 'Date%'
	AND A.COLUMN_NAME NOT LIKE 'Number%'
	AND A.COLUMN_NAME NOT LIKE 'ShortChar%'
	AND A.COLUMN_NAME NOT IN ('BitFlag','Company','PROGRESS_RECID','PROGRESS_RECID_IDENT_','SysRevID','SysRowID','XRefPartNum','XRefPartType')
ORDER BY A.COLUMN_NAME;
```

## Data Manipulation (CAST, FOR XML PATH, etc.)
#### Zips Variants wLeading Zeros
Replace all "ZipCode" with appropriate field and "tTable" with appropriate table name
```sql
SELECT CASE
 WHEN LEN(ZipCode) = 4 THEN FORMAT(CAST(ZipCode AS numeric),'00000')
 WHEN LEN(ZipCode) = 5 THEN FORMAT(CAST(ZipCode AS numeric),'00000')
 WHEN LEN(ZipCode) = 8 THEN FORMAT(CAST(ZipCode AS numeric),'00000-0000')
 WHEN LEN(ZipCode) = 9 THEN FORMAT(CAST(ZipCode AS numeric),'00000-0000')
 ELSE ZipCode
END
FROM tTable
```

#### An XML PATH example (This is from Junxure)
If you want counts, I’ve only been able to do that via Excel (Remove Duplicates)
```sql
SELECT DISTINCT tc.ID,
 (SELECT SUBSTRING(
    (SELECT ',' +  Classification
    FROM tblClientClassifications tcc
    WHERE tc.ID = tcc.ClientID
    ORDER BY Classification FOR XML PATH('')),2,200000)
 ) AS Classifications,
 (SELECT SUBSTRING(
    (SELECT ',' +  Keyword
    FROM tblClientKeywords tck
    WHERE tc.ID = tck.ClientID
    ORDER BY Keyword FOR XML PATH('')),2,200000)
 ) AS Keywords,
 (SELECT SUBSTRING(
    (SELECT ',' +  Interest
    FROM tblClientInterests tci
    WHERE tc.ID = tci.ClientID
    ORDER BY Keyword FOR XML PATH('')),2,200000)
 ) AS Interests
FROM tblClients tc
```

## Data Cleaning
#### I got this list from LinkedIn but I forgot where :worried:
| Steps | Commands |
| :--- | :--- |
| 1: Remove Duplicates | SELECT DISTINCT * FROM table; | 
| 2: Trim Whitespace | SELECT TRIM(column) AS column<br/>FROM table; |
| 3: Filter Invalid Values | SELECT * FROM table<br/>WHERE column IS NOT NULL<br/>AND column <> '';
| 4: Standardize Formats | SELECT FORMAT(date_column,'yyyy-MM-dd') AS clean_date<br/>FROM table; |
| 5: Handle NULLs | SELECT COALESCE(column,'default') AS column<br/>FROM table; |
| 6: Fix Inconsistent Case | SELECT LOWER(column) AS column<br/>FROM table; |
| 7: Correct Data Types | SELECT CAST(column AS INT) AS column<br/>FROM table; |
| 8: Remove Invalid Char | UPDATE table_name<br/>SET column_name = REPLACE(column_name,'#',''); |

## System Specific Examples
#### Get Labels / API Names - Dynamics CRM
- [AxForum Link](https://axforum.info/forums/showthread.php?t=27429)
- [Blog Post](http://mscrm-chandan.blogspot.com/2013/04/get-all-attribute-detail-of-entity-in.html)

Note the line above ORDER BY can be changed to reflect other tables/objects
```sql
SELECT EntityView.Name AS EntityName, LocalizedLabelView_1.Label AS EntityDisplayName, AttributeView.Name AS AttributeName, LocalizedLabelView_2.Label AS AttributeDisplayName
FROM LocalizedLabelView AS LocalizedLabelView_2
INNER JOIN AttributeView ON LocalizedLabelView_2.ObjectId = AttributeView.AttributeId
RIGHT OUTER JOIN EntityView
INNER JOIN LocalizedLabelView AS LocalizedLabelView_1
   ON EntityView.EntityId = LocalizedLabelView_1.ObjectId
   ON AttributeView.EntityId = EntityView.EntityId
WHERE LocalizedLabelView_1.ObjectColumnName = 'LocalizedName'
   AND LocalizedLabelView_2.ObjectColumnName = 'DisplayName'
   AND LocalizedLabelView_1.LanguageId = '1033'
   AND LocalizedLabelView_2.LanguageId = '1033'
   AND EntityView.Name IN ('Account')
/* ^^^ This can be changed to Contact, etc. ^^^ */
ORDER BY EntityName, AttributeName
```