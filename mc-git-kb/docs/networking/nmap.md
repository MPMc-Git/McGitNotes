## NMAP Basic Commands
| COMMAND | DESCRIPTION |
|:--- | :--- |
| nmap -sP | Ping Scan|
| nmap -sS | TCP SYN Scan |
| nmap -sT | TCP Connect Scan | 
| nmap -sU | UDP Scan |
| nmap -sn | SYN Scan |
| nmap -sX | XMAS Scan |
| nmap -sF | FIN Scan |
| nmap -sN | Null Scan |
| nmap -sA | ACK Scan |
| nmap -sV | Version Detection |
| nmap -T4 | Timeout |
| nmap -iL | Input from File |
| nmap -sC | Default Scripts Scan |
| nmap -A | Aggressive Scan |
| nmap -O | OS Detection |
| nmap -p '<'port'>' | Port Scan |
| nmap -p- <IP> | All Ports Scan</br> 
| nmap --top-ports '<'number'>' | Top Ports |
| nmap --script '<'script'>' | Script Scan |
