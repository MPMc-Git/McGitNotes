#### Stripping folders & filenames via Sheets
<small>Using an Audiobook as an example</small>

| What | Value |
| :--- | :--- |
| File Path | `./Fiction/Dune/1 Dune by Frank Herbert [Scott Brick].mp3 \| 21:02:06` |
| Folder | Fiction/Dune |
| | `=REGEXEXTRACT($A2, "\.\/([\w\/]+)\/")` |
| Title | 1 Dune |
| | `=REGEXEXTRACT($A2, "\/([^\/\|]+) by")` |
| Authored By... | Frank Herbert |
| | `=REGEXEXTRACT($A2, "by (.*?)\\[")` |
| Voiced By... | Scott Brick |
| | `=REGEXEXTRACT($A2, "\[(.*?)\]")` |
| Length | 21:02:06 |
| | `=REGEXEXTRACT($A2, "\\| (.*)")` |
