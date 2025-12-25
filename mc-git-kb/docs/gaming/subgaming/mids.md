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
