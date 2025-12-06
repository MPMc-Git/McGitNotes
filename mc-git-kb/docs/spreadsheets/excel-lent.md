## Basic Info
This returns the Column Letter but removes the Row Number
```excel
=SUBSTITUTE(ADDRESS(1,COLUMN(),4),"1","")
```

The column number, but also doing math so I can do VLOOKUP without having to physically count everything
```excel
="ColNUM "&COLUMN()&CHAR(10)&"ColSUM "&COLUMN()-21
```

Conditional Formatting for Google Sheets
```excel
=regexmatch(C3,"Keyword")
=COUNTIF (A:A, A1)>1
```

#### CONCAT or NOT - both do the same thing
...use the &, though
```excel
=CONCATENATE(A1," ",B1)
=A1&" "&B1
```
![image](https://github.com/user-attachments/assets/d96bfb6b-0a17-446a-88e0-bc5868561e1e)

#### Concatenate Fields with Carriage Returns
```excel
=A2&IF(B2<>"",CHAR(10)&B2,"")&IF(C2<>"",CHAR(10)&C2,"")
```

#### Convert All Zips Variants to Leading Zeroes
```excel
=SWITCH(LEN(A2),4,TEXT(A2,"00000"),5,A2,8,TEXT(A2,"00000-0000"),9,TEXT(A2,"00000-0000"))
```

#### Day in Previous Quarter (First / Last)
```excel
=DATE(YEAR(DateCell),FLOOR(MONTH(DateCell)-1,3)-1,0)
=DATE(YEAR(DateCell),FLOOR(MONTH(DateCell)-1,3)+1,0)
```

#### Tab ID Hyperlink
A2 being the Google Sheets Tab ID (gid=1896709346)
```excel
=HYPERLINK("#gid="&A2,REGEXEXTRACT(CELL("address",SheetName!$A$1),"'?([^']+)'?!"))
```