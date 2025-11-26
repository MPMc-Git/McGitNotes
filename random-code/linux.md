### Just me trying things

| What | Why |
| :--- | :--- |
| `sudo strings /sys/firmware/acpi/tables/MSDM` | Get Product Key from BIOS/UEFI |
| `systemctl list-unit-files --type=service` | See running services |
| `sudo systemctl soft-reboot` | Reboots the O/S but not the computer |
| `sync` | Flush filesystem buffers |
| `sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'` | Clear page cache, dentries, and inodes |
| `sudo systemctl restart <PROCESS>` | Restart a specific process |
| `kill <PID>` | Kill Process by Number |
| `kill -9 <PID>` | Force Kill Process by Number |
| `cinnamon-looking-glass` | Troubleshooting Tool |
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

#### List MP3s in their subfolders and show their duration HH:MM:SS
###### I used Gemini to put this together. Only took me 3 questions...
```bash
#!/bin/bash

# Define the output file name
OUTPUT_FILE="mp3_durations.txt"

# Clear the output file before starting (optional, use >> to append)
> "$OUTPUT_FILE"

# Use 'find' to locate all MP3 files recursively (including subdirectories)
# and pipe the results safely to 'while read'.
echo "Full Path | Duration (HH:MM:SS)" >> "$OUTPUT_FILE"
echo "--- | ---" >> "$OUTPUT_FILE"

find . -name "*.mp3" -print0 | while IFS= read -r -d $'\0' f; do
  # 1. Get the duration in total seconds (cutting off milliseconds)
  duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$f" | cut -d. -f1)

  # 2. Calculate Hours, Minutes, and remaining Seconds
  hours=$((duration / 3600))
  minutes=$(((duration % 3600) / 60))
  seconds=$((duration % 60))
  
  # Format the duration string
  duration_str=$(printf "%02d:%02d:%02d" "$hours" "$minutes" "$seconds")

  # 3. Print the result: Full Path and Duration, separated by a pipe for clarity
  printf "%s | %s\n" "$f" "$duration_str" >> "$OUTPUT_FILE"

done

echo "Processing complete. Results saved to $OUTPUT_FILE"
```
#### Strawberry via MPRIS
###### Programming the Keebmonkey to control Strawberry Music Player using playerctl
```bash
sudo apt update
sudo apt install playerctl
```
##### Keyboard Custom Shortcuts
| Name | Command | Keebmonkey |
| :--- | :--- | :--: |
| Strawberry Play/Pause | `playerctl play-pause -p strawberry` | KC_MPLY |
| Strawberry Next | `playerctl next -p strawberry` | KC_MPRV |
| Strawberry Previous | `playerctl previous -p strawberry` | KC_MNXT |
| Strawberry Shuffle | `playerctl shuffle toggle -p strawberry` | KC_MFFD* |
| Strawberry Loop Playlist | `playerctl loop Playlist -p strawberry` | KC_MRWD* |
###### \* = No default keys for this in Via, so I improvised.

##### Backup/Load Custom Keyboard Shortcuts
```bash
dconf dump /org/cinnamon/desktop/keybindings/ > ~/cinnamon-custom-keybinds.dconf
dconf load /org/cinnamon/desktop/keybindings/ < ~/cinnamon-custom-keybinds.dconf
```

---
#### KEEBMONKEY Megalodon Triple Knob Macro Pad Programmable Designer Mini Keyboard 16 Keys (via Vial)
- [Keyboard](https://www.keebmonkey.com/products/megalodon-triple-knob-macro-pad)
- [Configuring udev rules for VIA and Vial on Linux](https://get.vial.today/manual/linux-udev.html)
- [Create keyboard definition JSON](https://get.vial.today/docs/porting-to-via.html)
- [Vial](https://get.vial.today/)
