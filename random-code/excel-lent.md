#### Column Letter & Row Number
###### This must have had a purpose at some point, but I'm too tired to remember.
```excel
=SUBSTITUTE(ADDRESS(1,COLUMN(),4),"1","")
=COLUMN()
=ROW()
```
###### This shows the actual column number, but I also have it doing math so I can do VLOOKUP without having to physically count everything
```excel
="Column "&COLUMN()&CHAR(10)&"PermColumn "&COLUMN()-21
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
#### Conditional Formatting for Google Sheets
```excel
=regexmatch(C3,"Keyword")
=COUNTIF (A:A, A1)>1
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

#### Macro To Export Each Row as Text File (1 Cell Per Row)
For row = 1 assumes no column header<br />
For D:\Test\ this is where the TXT files would go
```vb
Sub SaveAsTextFile()
  Dim row As Long, lastRow As Long
  lastRow = Cells(Rows.Count, "A").End(xlUp).row
  For row = 1 To lastRow
      Open "D:\Test\" & "Row" & row & ".txt" For Output As #1
      Print #1, Cells(row, "A").Value
      Close #1
  Next
End Sub
```

#### Macro (VBA Function) To Pull URL From Cell That Is Not a HYPERLINK Cell
Exporting records from certain CRMs will let you click the field but not show the link itself - this is how you get it<br />
Build the following Macro
```vb
Public Function GetURL(c As Range) As String
   On Error Resume Next
   GetURL = c.Hyperlinks(1).Address
End Function
```
Use the following in an empty cell
```excel
=GetURL(A6)
```

#### Tab ID Hyperlink
A2 being the Google Sheets Tab ID (gid=1896709346)
```excel
=HYPERLINK("#gid="&A2,REGEXEXTRACT(CELL("address",SheetName!$A$1),"'?([^']+)'?!"))
```