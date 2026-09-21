// This wrapper ensures that all our code waits until the entire HTML page structure is loaded 
document.addEventListener('DOMContentLoaded', () => {
    
    console.log("Soundboard script initialized!");
    
    // --- PUT ALL YOUR SOUNDBOARD LOGIC HERE ---
    
    const buttons = document.querySelectorAll('.sound-button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const filename = this.dataset.soundFile;
            if (filename) {
                // Logic to play the sound... 
                const audio = new Audio(`assets/audio/${filename}`);
                audio.play();
            }
        });
    });
    // --- END SOUNDBOARD LOGIC ---

}); // End of DOMContentLoaded listener

