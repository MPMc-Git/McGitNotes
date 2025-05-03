#### Conditional Formatting for Google Sheets
> =regexmatch(C3,"Keyword")<br />
> =COUNTIF (A:A, A1)>1

#### Column Letter & Row Number
###### This must have had a purpose at some point, but I'm too tired to remember.
> =SUBSTITUTE(ADDRESS(1,COLUMN(),4),"1","")
> =COLUMN()

#### Concat Fields with Carriage Returns
> =A2&IF(B2<>"",CHAR(10)&B2,"")&IF(C2<>"",CHAR(10)&C2,"")

#### Convert All Zips Variants to Leading Zeroes
> =SWITCH(LEN(A2),4,TEXT(A2,"00000"),5,A2,8,TEXT(A2,"00000-0000"),9,TEXT(A2,"00000-0000"))

#### Day in Previous Quarter (First / Last)
> =DATE(YEAR(DateCell),FLOOR(MONTH(DateCell)-1,3)-1,0)<br />
> =DATE(YEAR(DateCell),FLOOR(MONTH(DateCell)-1,3)+1,0)

#### Macro To Export Each Row as Text File (1 Cell Per Row)
For row = 1 assumes no column header<br />
For D:\Test\ this is where the TXT files would go<br />
> Sub SaveAsTextFile()<br />
>   Dim row As Long, lastRow As Long<br />
>   lastRow = Cells(Rows.Count, "A").End(xlUp).row<br />
>   For row = 1 To lastRow<br />
>       Open "D:\Test\" & "Row" & row & ".txt" For Output As #1<br />
>       Print #1, Cells(row, "A").Value<br />
>       Close #1<br />
>   Next<br />
> End Sub

#### Macro (VBA Function) To Pull URL From Cell That Is Not a HYPERLINK Cell
Exporting records from certain CRMs will let you click the field but not show the link itself - this is how you get it<br />
Build the following Macro<br />
> Public Function GetURL(c As Range) As String<br />
>    On Error Resume Next<br />
>    GetURL = c.Hyperlinks(1).Address<br />
> End Function<br />
Use the following in an empty cell<br />
> =GetURL(A6)

#### Tab ID Hyperlink
> =HYPERLINK("#gid="&A2,REGEXEXTRACT(CELL("address",SheetName!$A$1),"'?([^']+)'?!"))
A2 being the Google Sheets Tab ID (gid=1896709346)
