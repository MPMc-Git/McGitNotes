## NMAP Basic Commands
#### COMMAND &emsp;&emsp;&emsp;&emsp;&emsp; DESCRIPTION
nmap -sP &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Ping Scan<br/>
nmap -sS &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; TCP SYN Scan<br/>
nmap -sT &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; TCP Connect Scan<br/> 
nmap -sU &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; UDP Scan<br/>
nmap -sn &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; SYN Scan<br/>
nmap -sX &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; XMAS Scan<br/>
nmap -sF &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; FIN Scan<br/>
nmap -sN &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Null Scan<br/>
nmap -sA &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; ACK Scan<br/>
nmap -sV &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Version Detection<br/>
nmap -T4 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Timeout<br/>
nmap -iL &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Input from File<br/>
nmap -sC &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Default Scripts Scan<br/>

nmap -A &nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Aggressive Scan<br/>
nmap -O &nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; OS Detection<br/>
nmap -p '<'port'>' &emsp;&emsp;&emsp; Port Scan<br/>
nmap -p-&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; All Ports Scan</br> 

nmap --top-ports '<'number'>' &nbsp;&nbsp; Top Ports<br/>
nmap --script '<'script'>' &nbsp;&nbsp; Script Scan<br/>
