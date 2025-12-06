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