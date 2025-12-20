### Just me trying things

| What | Why |
| :--- | :--- |
| `ln -s path/to/file/name.ext new/path/name.ext` | Symbolic Link |
| `sudo apt update` | Seriously, have APT run an Update Check |
| `apt list --upgradable 2>/dev/null &#124; grep '/' &#124; cut -d/ -f1 > upgrade.txt` | Export list of Apps to TXT file |
| `sudo apt install code` | You guessed it, update ONLY VSCode |
| `cat upgradable_apps.txt &#124; xargs -r sudo apt install -y` | Update Apps from that TXT file |
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
