#### Excel / Sheets to Smartsheet COUNTIFS Formula
This will help you build COUNTIFS Summary Formula Fields in Smartsheet
- Column A :: Notes / Purpose -> You can put the name of the Formula Field here to help
- Column B :: Column with Values
- Column C :: Value from Column B
- Column D :: Column with Multiple Values
- Column E-I :: Multiple Values from Column D -> Column E will always show up, but the others will only show if there's a value
- Column J :: The below Formula

**NOTE**: as the image suggests, you will need to prepend = when pasting into Smartsheet. Having = in Excel / Sheets will only confuse it.
```visualbasic
=COUNTIFS(["&$B2&"]:["&$B2&"],"""&$C2&""",["&$D2&"]:["&$D2&"],OR(@cell="""&$E2&""""&
IF(LEN($F2)>0,",@cell="""&$F2&"""","")&
IF(LEN($G2)>0,",@cell="""&$G2&"""","")&
IF(LEN($H2)>0,",@cell="""&$H2&"""","")&
IF(LEN($I2)>0,",@cell="""&$I2&"""","")&"))
```
![image](https://github.com/user-attachments/assets/d1d6789d-1aad-4443-b1ae-61f9101fe4d2)
