#### Sub-pages
- [Salesforce ID-18 Breakdown](subsfdc/salesforce-id18.md)

## For Excel
#### Custom Column Format For Insert, Upload, Upserts (Date, Date/Time)
```excel
yyyy-mm-ddThh:mm:ssZ
```

#### Convert ID 15 to ID 18
```excel
=CONCATENATE(A2,
MID("ABCDEFGHIJKLMNOPQRSTUVWXYZ012345",(
 IFERROR(IF(FIND(MID(A2,1,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,1,0),0)
 +IFERROR(IF(FIND(MID(A2,2,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,2,0),0)
 +IFERROR(IF(FIND(MID(A2,3,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,4,0),0)
 +IFERROR(IF(FIND(MID(A2,4,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,8,0),0)
 +IFERROR(IF(FIND(MID(A2,5,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,16,0),0)
+1),1),
MID("ABCDEFGHIJKLMNOPQRSTUVWXYZ012345",(
 IFERROR(IF(FIND(MID(A2,6,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,1,0),0)
 +IFERROR(IF(FIND(MID(A2,7,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,2,0),0)
 +IFERROR(IF(FIND(MID(A2,8,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,4,0),0)
 +IFERROR(IF(FIND(MID(A2,9,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,8,0),0)
 +IFERROR(IF(FIND(MID(A2,10,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,16,0),0)
+1),1),
MID("ABCDEFGHIJKLMNOPQRSTUVWXYZ012345",(
 IFERROR(IF(FIND(MID(A2,11,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,1,0),0)
 +IFERROR(IF(FIND(MID(A2,12,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,2,0),0)
 +IFERROR(IF(FIND(MID(A2,13,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,4,0),0)
 +IFERROR(IF(FIND(MID(A2,14,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,8,0),0)
 +IFERROR(IF(FIND(MID(A2,15,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,16,0),0)
+1),1))
```

## Formula Fields
#### Hyperlink to Record
This creates a Hyperlink that'll work in any Salesforce Organization - no hardcoding the URL<br>
'Task Link' is what will be displayed
```excel
HYPERLINK(
LEFT($Api.Partner_Server_URL_550, FIND( '/services', $Api.Partner_Server_URL_550)) & Id, 'Task Link')
```

Same code but for a Flow
```excel
HYPERLINK(
LEFT($Api.Partner_Server_URL_550, FIND( '/services', $Api.Partner_Server_URL_550)) & {!$Record.Id}, 'Task Link')
```

#### Show a Date Field as YYYY-MM-DD

```excel
TEXT(YEAR(TODAY()))
&"-"&
LPAD(TEXT(MONTH(TODAY())),2,"0")
&"-"&
LPAD(TEXT(MONTH(DAY())),2,"0")
```

#### How Long Have You Been Employed?
Assumes that "HireDate" is a Custom Field and you're not using the CreatedDate

```excel
IF(ISBLANK(<HireDate>),'',
TEXT(FLOOR((TODAY() - <HireDate>)/365)) &' Year(s)' & ' ' &
TEXT(FLOOR(MOD((TODAY() - <HireDate>),365)/30)) &' Month(s)' & ' ' &
TEXT(MOD(MOD((TODAY() - <HireDate>),365),30)) &' Day(s)')
```

#### Determine User’s Time Offset
https://trailhead.salesforce.com/trailblazer-community/feed/0D54S00000A8oF2SAJ

```excel
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 00:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 01:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 02:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 03:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 04:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 05:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 06:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 07:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 08:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 09:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 10:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 11:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 12:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 13:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 14:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 15:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 16:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 17:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 18:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 19:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 20:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 21:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 22:00:00")) - TODAY()) +
(DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 23:00:00")) - TODAY())
```

### Weekday Determinations
#### Calculate Future Weekday
Based on Review Frequency, set the next correct date. The below is for a Flow.<br>
<small>...no more rhyming now, I mean it!</small>

```excel
CASE({!$Record.<FrequencyField>},
"Quarterly",
IF(AND(
 WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},3)) > 1,
 WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},3)) < 7
 ),
 ADDMONTHS({!$Record.<LastReviewField>},3),
IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},3)) = 1,
 ADDMONTHS({!$Record.<LastReviewField>},3) + DAY(ADDMONTHS({!$Record.<LastReviewField>},3)) + 1,
IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},3)) = 7,
 ADDMONTHS({!$Record.<LastReviewField>},3) + DAY(ADDMONTHS({!$Record.<LastReviewField>},3)) - 1,
NULL))),
"Semi-Annually",
IF(AND(
 WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},6)) > 1,
 WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},6)) < 7
 ),
ADDMONTHS({!$Record.<LastReviewField>},6),
IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},6)) = 1,
 ADDMONTHS({!$Record.<LastReviewField>},6) + DAY(ADDMONTHS({!$Record.<LastReviewField>},6)) + 1,
IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},6)) = 7,
 ADDMONTHS({!$Record.<LastReviewField>},6) + DAY(ADDMONTHS({!$Record.<LastReviewField>},6)) - 1,
NULL))),
"Annually",
 IF(AND(
 WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},12)) > 1,
 WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},12)) < 7
 ),
 ADDMONTHS({!$Record.<LastReviewField>},12),
IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},12)) = 1,
 ADDMONTHS({!$Record.<LastReviewField>},12) + DAY(ADDMONTHS({!$Record.<LastReviewField>},12)) + 1,
IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},12)) = 7,
 ADDMONTHS({!$Record.<LastReviewField>},12) + DAY(ADDMONTHS({!$Record.<LastReviewField>},12)) - 1,
NULL))),
NULL)
```

#### Anniversary Date
This is just a Formula to use in a Flow to update a custom Anniversary Date field. It basically just jumps the year ahead. This field is what's required for the next bit so I'm including it here.

```excel
DATE( YEAR(TODAY()) +1, MONTH(TODAY()), DAY(TODAY()) )
```

This is so you know a week ahead of time an anniversary date is coming - which is based on a custom field updated by a Flow that's mentioned directly above.
```excel
CASE(1,
/* Sunday */
 IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 6, WEEKDAY(TODAY()) = 2), 1, 0), 7,
/* Monday */
 IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 2), 1, 0), 7,
/* Tuesday */
 IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 3), 1, 0), 7,
/* Wednesday */
 IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 4), 1, 0), 7,
/* Thursday */
 IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 5), 1, 0), 7,
/* Friday */
 IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 6), 1, 0), 7,
/* Saturday */
 IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 8, WEEKDAY(TODAY()) = 6), 1, 0), 7,
NULL)
```

The same formula above but as a Formula field. I built this while troubleshooting and it helped me figure out which day is the day.
```excel
CASE(1,
/* Sunday */
IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 6, WEEKDAY(TODAY()) = 2), 1, 0), 17,
/* Monday */
IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 2), 1, 0), 27,
/* Tuesday */
IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 3), 1, 0), 37,
/* Wednesday */
IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 4), 1, 0), 47,
/* Thursday */
IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 5), 1, 0), 57,
/* Friday */
IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 6), 1, 0), 67,
/* Saturday */ IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 8, WEEKDAY(TODAY()) = 6), 1, 0), 77, 
NULL)
```
