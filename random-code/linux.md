### Just me trying things

| What | Why |
| :--- | :--- |
| `systemctl list-unit-files --type=service` | Running services |
| `sudo systemctl soft-reboot` | "Soft reboot" user-space services |
| `sync` | Flush filesystem buffers |
| `sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'` | Clear page cache, dentries, and inodes |
| `sudo systemctl restart <PROCESS>` | Restart a specific process |
| `kill <PID>` | Kill Process by Number |
| `kill -9 <PID>` | Force Kill Process by Number |
