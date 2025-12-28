### Mids Reborn on Linux Mint (working)
From Psyonico in the [Discord](https://discord.com/channels/593336669004890113/1453791106755203127/1453943802174902375), plus my edits<br>

Here's what I did step by step

1. Open Software Manager

1. Download Bottles (flatpak) and Flatseal (flatpak) from software manager

1. Open Terminal and run flatpak install wine

1. When given options of what version, choose 24.08

Once everything is installed, open bottles and click through the menu until it finishes its initial set up, then

1. Create New Bottle

1. Name it MidsReborn

1. Change Runner to sys-wine-10.0, leave everything else the same

1. Click Create

1. After bottle is created go to Settings and switch Windows version to 11

1. Hit Back arrow then go to Dependencies
    - Download dotnetcoredesktop8
    - Download vcredist2022

1. DLL Overrides
    - mscoree.dll: Native, then Builtin
Bottles is now set up

Download Mids

1. Download latest ZIP file from https://updates.midsreborn.com/full_updates/

1. Extract to ~/.var/app/com.userbottles.bottles/data/bottles/bottles/MidsReborn/drive_c/users/yourusername/AppData/Roaming/LoadedCamel/MidsReborn 
    - You will need to create the LoadedCamel and MidsReborn Folders

1. Download Font SegoeUI https://archive.org/details/segoeui_win8-10

1. Extract to ~/.var/app/com.userbottles.bottles/data/bottles/bottles/MidsReborn/drive_c/windows/fonts

Back in Bottles

1. Run Executable ~/.var/app/com.userbottles.bottles/data/bottles/bottles/MidsReborn/drive_c/users/yourusername/AppData/Roaming/LoadedCamel/MidsReborn/MidsReborn.exe

1. **NOTE**: Do NOT Update
