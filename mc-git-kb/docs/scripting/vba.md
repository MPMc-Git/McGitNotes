## Visual Basic for Applications (VBA)

#### Macro To Export Each Row as Text File (1 Cell Per Row)
For row = 1 assumes no column header<br>
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
Exporting records from certain CRMs will let you click the field but not show the link itself - this is how you get it<br>
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