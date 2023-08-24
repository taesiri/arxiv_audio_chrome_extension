// content.js

const insertAudioPlayer = () => {
  // Extract the arXiv paper ID from the current URL
  const paperID = window.location.pathname.split('/abs/')[1];

  // Form the audio URL based on the paper ID
  const audioURL = `https://huggingface.co/datasets/taesiri/arxiv_audio/resolve/main/audio/${paperID}.mp3`;

  // Create the audio player element
  const audioElement = document.createElement('audio');
  audioElement.controls = true;
  audioElement.src = audioURL;

  // Style the audio player
  audioElement.style.width = '100%';  // Set the width to 100% of its container
  audioElement.style.height = '32px'; // Set a slim height
  audioElement.style.marginTop = '10px';
  audioElement.style.marginBottom = '10px';

  // Check if the audio file exists before inserting it
  fetch(audioURL, { method: 'HEAD' }).then(response => {
    if (response.ok) {
      // Find the abstract's blockquote element
      const abstractElement = document.querySelector('blockquote.abstract.mathjax');

      // If found, insert the audio player after the blockquote element
      if (abstractElement) {
        abstractElement.parentNode.insertBefore(audioElement, abstractElement.nextSibling);
      }
    }
  }).catch(error => {
    // Handle any errors, like network issues, here
    console.error('Error fetching the audio:', error);
  });
};

// Call the function to insert the audio player
insertAudioPlayer();
