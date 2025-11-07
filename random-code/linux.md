### Just me trying things

| What | Why |
| :--- | :--- |
| `systemctl list-unit-files --type=service` | See running services |
| `sudo systemctl soft-reboot` | "Soft reboot" user-space services |
| `sync` | Flush filesystem buffers |
| `sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'` | Clear page cache, dentries, and inodes |
| `sudo systemctl restart <PROCESS>` | Restart a specific process |
| `kill <PID>` | Kill Process by Number |
| `kill -9 <PID>` | Force Kill Process by Number |
---

#### Converting FILE to PDF then Combining PDFs
| What | Why |
| :--- | :--- |
| `libreoffice --headless --convert-to pdf FILE.EXT` | Convert file to PDF |
| `pdfunite INPUT1.pdf INPUT2.pdf OUTPUT.pdf` | Combine PDFs |

##### Use a Spreadsheet to batch this
| Cell Header | Cell Content |
| :--- | :--- |
| LS -L | Output of ls -l |
| FILENAMES | `=TRIM(REGEXEXTRACT($A2,"2014 (.*)"))` |
| | Assuming 2014 is the associated year |
| CONV2PDF | `="libreoffice --headless --convert-to pdf "&$B2` |
| | Run these all at once to create the PDFs |
| PDFs | `=SUBSTITUTE($B2,"docx","pdf")` |
| COMBINE | `="pdfunite "&TEXTJOIN(" ",TRUE,$D2:D25)&" OUTPUT.pdf"` |
| | You only need one of these to combine all the PDFs in the directory |


---
#### KEEBMONKEY Megalodon Triple Knob Macro Pad Programmable Designer Mini Keyboard 16 Keys (via Vial)
- [Keyboard](https://www.keebmonkey.com/products/megalodon-triple-knob-macro-pad)
- [Configuring udev rules for VIA and Vial on Linux](https://get.vial.today/manual/linux-udev.html)
- [Create keyboard definition JSON](https://get.vial.today/docs/porting-to-via.html)
- [Vial](https://get.vial.today/)
