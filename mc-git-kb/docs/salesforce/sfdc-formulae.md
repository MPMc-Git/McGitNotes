## For Excel
#### Custom Column Format For Insert, Upload, Upserts (Date, Date/Time)
> yyyy-mm-ddThh:mm:ssZ

#### Convert ID 15 to ID 18
> =CONCATENATE(A2,<br />
> MID("ABCDEFGHIJKLMNOPQRSTUVWXYZ012345",(<br />
>  IFERROR(IF(FIND(MID(A2,1,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,1,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,2,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,2,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,3,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,4,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,4,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,8,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,5,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,16,0),0)<br />
> +1),1),<br />
> MID("ABCDEFGHIJKLMNOPQRSTUVWXYZ012345",(<br />
>  IFERROR(IF(FIND(MID(A2,6,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,1,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,7,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,2,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,8,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,4,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,9,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,8,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,10,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,16,0),0)<br />
> +1),1),<br />
> MID("ABCDEFGHIJKLMNOPQRSTUVWXYZ012345",(<br />
>  IFERROR(IF(FIND(MID(A2,11,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,1,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,12,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,2,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,13,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,4,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,14,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,8,0),0)<br />
>  +IFERROR(IF(FIND(MID(A2,15,1),"ABCDEFGHIJKLMNOPQRSTUVWXYZ")>0,16,0),0)<br />
> +1),1))

## Formula Fields
#### Hyperlink to Record
This creates a Hyperlink that'll work in any Salesforce Organization - no hardcoding the URL<br />
'Task Link' is what will be displayed<br />
> HYPERLINK(<br />
> LEFT($Api.Partner_Server_URL_550, FIND( '/services', $Api.Partner_Server_URL_550)) & Id, 'Task Link')<br />

Same code but for a Flow<br />
> HYPERLINK(<br />
> LEFT($Api.Partner_Server_URL_550, FIND( '/services', $Api.Partner_Server_URL_550)) & {!$Record.Id}, 'Task Link')

#### Show a Date Field as YYYY-MM-DD
```excel
TEXT(YEAR(TODAY()))
&"-"&
LPAD(TEXT(MONTH(TODAY())),2,"0")
&"-"&
LPAD(TEXT(MONTH(DAY())),2,"0")
```

#### How Long Have You Been Employed?
> IF(ISBLANK(<HireDate>),'',<br />
> TEXT(FLOOR((TODAY() - <HireDate>)/365)) &' Year(s)' & ' ' &<br />
> TEXT(FLOOR(MOD((TODAY() - <HireDate>),365)/30)) &' Month(s)' & ' ' &<br />
> TEXT(MOD(MOD((TODAY() - <HireDate>),365),30)) &' Day(s)')

#### Determine User’s Time Offset
https://trailhead.salesforce.com/trailblazer-community/feed/0D54S00000A8oF2SAJ<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 00:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 01:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 02:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 03:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 04:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 05:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 06:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 07:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 08:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 09:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 10:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 11:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 12:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 13:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 14:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 15:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 16:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 17:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 18:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 19:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 20:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 21:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 22:00:00")) - TODAY()) +<br />
> (DATEVALUE(DATETIMEVALUE(TEXT(TODAY())+" 23:00:00")) - TODAY())

### Weekday Determinations
#### Calculate Future Weekday
Based on Review Frequency, set the next correct date. The below is for a Flow.<br />
...no more rhyming now, I mean it!<br />
> CASE({!$Record.<FrequencyField>},<br />
> "Quarterly",<br />
> IF(AND(<br />
>  WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},3)) > 1,<br />
>  WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},3)) < 7<br />
>  ),<br />
>  ADDMONTHS({!$Record.<LastReviewField>},3),<br />
> IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},3)) = 1,<br />
>  ADDMONTHS({!$Record.<LastReviewField>},3) + DAY(ADDMONTHS({!$Record.<LastReviewField>},3)) + 1,<br />
> IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},3)) = 7,<br />
>  ADDMONTHS({!$Record.<LastReviewField>},3) + DAY(ADDMONTHS({!$Record.<LastReviewField>},3)) - 1,<br />
> NULL))),<br />
> "Semi-Annually",<br />
> IF(AND(<br />
>  WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},6)) > 1,<br />
>  WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},6)) < 7<br />
>  ),<br />
> ADDMONTHS({!$Record.<LastReviewField>},6),<br />
> IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},6)) = 1,<br />
>  ADDMONTHS({!$Record.<LastReviewField>},6) + DAY(ADDMONTHS({!$Record.<LastReviewField>},6)) + 1,<br />
> IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},6)) = 7,<br />
>  ADDMONTHS({!$Record.<LastReviewField>},6) + DAY(ADDMONTHS({!$Record.<LastReviewField>},6)) - 1,<br />
> NULL))),<br />
> "Annually",<br />
>  IF(AND(<br />
>  WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},12)) > 1,<br />
>  WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},12)) < 7<br />
>  ),<br />
>  ADDMONTHS({!$Record.<LastReviewField>},12),<br />
> IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},12)) = 1,<br />
>  ADDMONTHS({!$Record.<LastReviewField>},12) + DAY(ADDMONTHS({!$Record.<LastReviewField>},12)) + 1,<br />
> IF(WEEKDAY(ADDMONTHS({!$Record.<LastReviewField>},12)) = 7,<br />
>  ADDMONTHS({!$Record.<LastReviewField>},12) + DAY(ADDMONTHS({!$Record.<LastReviewField>},12)) - 1,<br />
> NULL))),<br />
> NULL)

#### Anniversary Date
This is just a Formula to use in a Flow to update a custom Anniversary Date field. It basically just jumps the year ahead. This field is what's required for the next bit so I'm including it here.<br />
> DATE( YEAR(TODAY()) +1, MONTH(TODAY()), DAY(TODAY()) )

This is so you know a week ahead of time an anniversary date is coming - which is based on a custom field updated by a Flow that's mentioned directly above.<br />
> CASE(1,<br />
> /* Sunday */<br />
>  IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 6, WEEKDAY(TODAY()) = 2), 1, 0), 7,<br />
> /* Monday */<br />
>  IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 2), 1, 0), 7,<br />
> /* Tuesday */<br />
>  IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 3), 1, 0), 7,<br />
> /* Wednesday */<br />
>  IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 4), 1, 0), 7,<br />
> /* Thursday */<br />
>  IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 5), 1, 0), 7,<br />
> /* Friday */<br />
>  IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 6), 1, 0), 7,<br />
> /* Saturday */<br />
>  IF(AND(DAYOFYEAR({!$Record.<AnniversaryDate>}) - DAYOFYEAR(TODAY()) = 8, WEEKDAY(TODAY()) = 6), 1, 0), 7,<br />
> NULL)

The same formula above but as a Formula field. I built this while troubleshooting and it helped me figure out which day is the day.<br />
> CASE(1,<br />
> /* Sunday */<br />
> IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 6, WEEKDAY(TODAY()) = 2), 1, 0), 17,<br />
> /* Monday */<br />
> IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 2), 1, 0), 27,<br />
> /* Tuesday */<br />
> IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 3), 1, 0), 37,<br />
> /* Wednesday */<br />
> IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 4), 1, 0), 47,<br />
> /* Thursday */<br />
> IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 5), 1, 0), 57,<br />
> /* Friday */<br />
> IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 7, WEEKDAY(TODAY()) = 6), 1, 0), 67,<br />
> /* Saturday */ IF(AND(DAYOFYEAR(Anniversary_Date__c) - DAYOFYEAR(TODAY()) = 8, WEEKDAY(TODAY()) = 6), 1, 0), 77, <br />
> NULL)

