---
tags:
  - City of Heroes
  - COH
  - Game
  - Links
  - URLs
---

!!! abstract
    City of Heroes was/is a game...

### URLs
- [Homecoming Wiki](https://homecoming.wiki/wiki/Main_Page)
- [COH Icons](https://docs.google.com/spreadsheets/d/1uHUi6BWFTYj4wbfGBs3LjZL88Fym6B-8EwDr18YZcY8/edit?gid=852710698#gid=852710698)
- [Mids Reborn - GitHub](https://github.com/LoadedCamel/MidsReborn)
- [Mids Reborn - Install](https://updates.midsreborn.com/full_updates/)

### Macros
<small>...using macro_image</small>

| Why | Macro Image Command | Image |
| :--- | :--- | :--: |
| Fast Travel | `/macroimage "badge_defeat_burrspectrum" "Portals" "popmenu FastTravel"` | <img src="../../assets/images/coh-burrspectrum.png"> |

### Keybinds

### PopMenus
!!! info "Folder (Homecoming)"
    Homecoming\\data\\texts\\english\\menus

!!! info "Folder (Other Servers)"
    data\\texts\\English\\menus

!!! example "Load the popmenu"
    /popmenu [MenuName]

### Costume Change Macros
| Costume Style | Macro Image Command | Image |
| :--- | :--- | :--: |
| Spectrum Only |  /macro_image "BeastMastery_PetTerribleHowl" "Spectrum" "cce 0 CCEnergyMorph" | <img src="https://docs.google.com/thumbnail?id=1SeEAXy5XekQRR3xjB6W2383hu-4XADoN"> |
| Blacklight & Spectrum | /macro_image "AlignmentPower_Duplicity" "Black Spec" "cce 1 CCEnergyMorph" | <img src="https://lh7-rt.googleusercontent.com/sheetsz/AHOq17GrXx0L9snrnRhyf-7aYhNdS_zbt5etaIhdFrzBpbCg6WBNKLnNzS2kXj2gBciLeEeFxlHOfmuIAG1qQkGq2Ls0ecXAOAgchRmmQR1qZ3PowvpYB-pu1q6_FOKUH4mVxm5s?key=z6odnz4KsZmw6Zg5vvz8CQ"> |

### Loading on Linux
Used GE-Proton through Steam

### Mids Reborn on Linux Mint (not working)
flatpak install bottes
- Found ref ‘app/com.usebottles.bottles/x86_64/stable’ in remote ‘flathub’ (system).
- Version: 60

Started Bottles
- Created New Bottle
  - "MidsReborn"
  - Application
  - Runner: sys-wine-10.0
  - Settings: Windows Version: Windows 11
  - Dependencies: dotnet481, dotnetcoredesktop8, vcredist2022
- Downloaded Mids
  - https://updates.midsreborn.com/full_updates/mids_3.8.0.0%2Bdb2025.12.1240.zip
  - Extracted to ~/.var/app/com.userbottles.bottles/data/bottles/bottles/MidsReborn/drive_c/users/uname/AppData/Roaming/LoadedCamel/MidsReborn (I did create the LoadedCamel & MidsReborn folders)
- Downloaded Font SegoeUI
  - https://archive.org/details/segoeui_win8-10
  - Extracted to ~/.var/app/com.userbottles.bottles/data/bottles/bottles/MidsReborn/drive_c/windows/fonts
- Back in Bottles
  - Added Shortcut: ~/.var/app/com.userbottles.bottles/data/bottles/bottles/MidsReborn/drive_c/users/yourusername/AppData/Roaming/LoadedCamel/MidsReborn/MidsReborn.exe

Clicked the Play Icon to launch MidsReborn
- A window pops-up, and the Play button goes to Stop and then back to Play

Tried again with Launch with Terminal...

DLL Overrides
- mscoree.dll: Native, then Builtin

flatpak install Flatseal
- Version: 2.4.0

All User Files: Enabled

Advanced Display Settings: Renderer: Vulkan
