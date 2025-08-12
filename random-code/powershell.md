Active Directory computers should be reviewed about once a year. 
Old operating systems can hold back security progress like keeping SMBv1 and NTLMv1 active. Inactive computers should be discovered and disabled when no longer in use (and eventually removed). 

The OperatingSystem & PasswordLastSet attributes are self-explanatory, though we can use the LastLogonDate which represents the last reboot of the computer. 
The computer password should change every ~30 days by default. We can correlate the PasswordLastSet & LastLogonDate attribute values to determine if a computer is active or not. 
A blank LastLogonDate value means the computer object is just that and not associated with an actual system. 

get-adcomputer -filter * -Prop * | sort OperatingSystem | select name,OperatingSystem,LastLogonDate,PasswordLastSet