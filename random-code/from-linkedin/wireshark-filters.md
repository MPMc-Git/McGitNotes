## Wireshark Filters
###### - No clue where I got this from

| Filter | Purpose |
|:-- | :-- |
| ip.addr = 10.0.0.1 | All traffic with IP as Src/Dst |
| ip.addr = 10.0.0.0/24 | All traffic with range as Src/Dst |
| ip.src = 10.0.0.1 && ip.dst == 10.0.0.2 | All traffic from .1 to .2 |
