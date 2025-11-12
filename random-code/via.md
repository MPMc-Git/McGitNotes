## Macros from the site [Use Via](https://usevia.app/)

#### For Linux
- Launch Terminal
  - {KC_LGUI}{10}{KC_T,KC_E,KC_R,KC_M,KC_I,KC_N,KC_A,KC_L}{10}{KC_ENT}

#### For Minecraft
- Enter Spectator Mode
  - {KC_T}{100}{KC_SLSH}{KC_G}{KC_A}{KC_M}{KC_E}{KC_M}{KC_O}{KC_D}{KC_E}{KC_SPC}{KC_S}{KC_P}{KC_E}{KC_C}{KC_T}{KC_A}{KC_T}{KC_O}{KC_R}{100}{KC_ENT}

- Enter Creative Mode
  - {KC_T}{100}{KC_SLSH}{KC_G}{KC_A}{KC_M}{KC_E}{KC_M}{KC_O}{KC_D}{KC_E}{KC_SPC}{KC_C}{KC_R}{KC_E}{KC_A}{KC_T}{KC_I}{KC_V}{KC_E}{100}{KC_ENT}

#### Get Linux to detect it
Chrome Event Log :: chrome://system/#device_event_log
- SOLVED IT! Checked Chrome's Device-Log to get the device ID, then...
sudo chmod a+rw hidraw7
BOOM!
