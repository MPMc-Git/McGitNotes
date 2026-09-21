// This wrapper ensures that all our code waits until the entire HTML page structure is loaded 

document.addEventListener('DOMContentLoaded', () => {

    console.log("Soundboard script initialized!");

    const buttons = document.querySelectorAll('.sound-button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const soundPath = this.dataset.soundFile;

            if (soundPath) {
                console.log(`Attempting to play sound: ${soundPath}`); 

                // --- CRITICAL IMPROVEMENT HERE ---
                try {
                    const audio = new Audio(soundPath);
                    
                    // Add an error handler! This will force a console log if the file fails to load or play.
                    audio.onerror = function() {
                        console.error("🔊 SOUND ERROR: Failed to load or play sound.", soundPath);
                        alert(`[Playback Error]: Could not find the sound at path: ${soundPath}. Please check your file paths.`);
                    };

                    // The actual playback command
                    audio.play();
                } catch (e) {
                    console.error("JS Execution Error:", e);
                    alert("A JavaScript error occurred while trying to play the sound.");
                }
            }
        });
    }); // --- END SOUNDBOARD LOGIC ---
}); // End of DOMContentLoaded listener
