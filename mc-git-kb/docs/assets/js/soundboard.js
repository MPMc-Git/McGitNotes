// ===============================================================
// GLOBAL TRACKER: This array holds references to ALL currently playing Audio objects.
let activeSounds = []; 
// ===============================================================


document.addEventListener('DOMContentLoaded', () => {
    console.log("Soundboard script initialized! Ready to play sounds.");

    const soundButtons = document.querySelectorAll('.sound-button');
    const stopButton = document.getElementById('stop-btn'); // Get the STOP button element

    // 1. Attach event listeners to all play buttons
    soundButtons.forEach(button => {
        button.addEventListener('click', function() {
            const soundPath = this.dataset.soundFile;
            if (soundPath) {
                console.log(`Attempting to play sound: ${soundPath}`); 

                // Call the dedicated playing function
                playAndTrackSound(soundPath);
            }
        });
    }); 

    // 2. Attach event listener to the STOP button
    if (stopButton) {
        stopButton.addEventListener('click', stopAllSounds);
    }


    /**
     * Core function that plays a sound and tracks it for later stopping.
     * @param {string} soundPath - The path to the MP3 file.
     */
    function playAndTrackSound(soundPath) {
        try {
            // Create audio object, handle error detection (keep your excellent error handling!)
            const audio = new Audio(soundPath); 
            audio.onerror = function() {
                console.error("🔊 SOUND ERROR: Failed to load or play sound.", soundPath);
                alert(`[Playback Error]: Could not find the sound at path: ${soundPath}. Please check your file paths.`);
            };

            // === CRITICAL STEP 1: Add object to tracking array BEFORE playing ===
            activeSounds.push(audio);
            
            // The actual playback command
            audio.play().catch(error => {
                console.error("JS Execution Error:", error);
                alert("A JavaScript error occurred while trying to play the sound.");
            });

        } catch (e) {
            console.error("General Scripting Error:", e);
            alert("An unexpected scripting error occurred.");
        }
    }


    /**
     * Stops every sound currently tracked in the activeSounds array.
     */
    function stopAllSounds() {
        // Check if there are any sounds to stop
        if (activeSounds.length === 0) {
            console.log("No sounds currently playing.");
            return; // Exit function early if nothing is running
        }

        console.log(`Stopping ${activeSounds.length} active sound(s)...`);
        
        // Iterate over every audio object we are tracking
        activeSounds.forEach(audio => {
            if (audio.paused === false) {
                audio.pause(); // Stop the playback immediately
                // Resetting time is good practice so the user can click it again right away
                audio.currentTime = 0; 
            }
        });

        // CRITICAL STEP 2: Clear the array after stopping everything
        activeSounds = []; 
    }

}); // End of DOMContentLoaded listener
