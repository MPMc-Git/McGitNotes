## VLOOKUP or INDEX-MATCH?

#### VLOOKUP
VLOOKUP is easily the standard lookup method in the various spreadsheet applications that support it. It's simple, it works, so why am I proposing an alternative? Easy. VLOOKUP only goes ONE DIRECTION! INDEX-MATCH lets you go all over the place!

##### DATA Example
| | A | B | C | D | E |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Franchise** | **Villain** | **Weapon** | **Feature** | **Loves** |
| 2 | Star Wars | Darth Vader | Lightsaber | Helmet | Padme |
| 3 | Pirates | Davy Jones | Organ | Octopus | Calypso |
| 4 | Shrek | Farquad | Stepstool | Short | Fiona |

##### VLOOKUP Sample
If I want to know who the Villain is in Star Wars, this is how VLOOKUP locates that:
```excel
=VLOOKUP(A2:A3,1,0)
```

##### INDEX-MATCH Sample
What if I want to see what Franchise Davy Jones is from?
```excel
=INDEX(A:A,MATCH(B:B="Davy Jones",0))
```

##### INDEX-MATCH AND Sample
What if I want to find information based on more than one criteria?
```excel
=INDEX(A:A,MATCH(1,(C:C="Organ")*(E:E="Calypso")))
```
...but, why? Because the MATCH is looking for a result of 1, and each option will return either a 1 or a 0. Multiple those together.

#### INDEX-MATCH OR Sample
```excel
=INDEX(A:A,MATCH(1,(C:C="Organ")+(E:E="Calypso")))
```
...but, why? Because the MATCH is looking for a result of 1, and each option will return either a 1 or a 0. Add those together.
