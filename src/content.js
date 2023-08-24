
const paperId = window.location.pathname.split('/').pop();
const audioURL = `https://huggingface.co/datasets/taesiri/arxiv_audio/resolve/main/audio/${paperId}.mp3`;

// Check if the audio file exists
fetch(audioURL, { method: 'HEAD' })
  .then(response => {
    if (response.ok) {
      // Add an audio player to the page
      const audioPlayer = document.createElement('audio');
      audioPlayer.controls = true;
      audioPlayer.src = audioURL;
      
      const targetElement = document.querySelector('h1.title');
      targetElement.parentNode.insertBefore(audioPlayer, targetElement.nextSibling);
    }
  })
  .catch(error => {
    console.error('Error fetching the audio file:', error);
  });
