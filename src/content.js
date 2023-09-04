const insertAudioPlayerForArxiv = () => {
  const paperID = window.location.pathname.split('/abs/')[1];
  const audioURL = `https://huggingface.co/datasets/taesiri/arxiv_audio/resolve/main/audio/${paperID}.mp3`;

  const audioElement = document.createElement('audio');
  audioElement.controls = true;
  audioElement.src = audioURL;
  audioElement.style.width = '100%';
  audioElement.style.height = '32px';
  audioElement.style.marginTop = '10px';
  audioElement.style.marginBottom = '10px';

  fetch(audioURL, { method: 'HEAD' }).then(response => {
    if (response.ok) {
      const abstractElement = document.querySelector('blockquote.abstract.mathjax');
      if (abstractElement) {
        abstractElement.parentNode.insertBefore(audioElement, abstractElement.nextSibling);
      }
    }
  });
};

const insertAudioPlayerForHuggingface = () => {
  const paperID = window.location.pathname.split('/papers/')[1];
  const audioURL = `https://huggingface.co/datasets/taesiri/arxiv_audio/resolve/main/audio/${paperID}.mp3`;

  const audioElement = document.createElement('audio');
  audioElement.controls = true;
  audioElement.src = audioURL;
  audioElement.style.width = '100%';
  audioElement.style.height = '32px';
  audioElement.style.marginTop = '10px';
  audioElement.style.marginBottom = '10px';

  const insertAudioIfMissing = () => {
    fetch(audioURL, { method: 'HEAD' }).then(response => {
      if (response.ok) {
        const abstractElement = document.querySelector('div.pb-8 > p.text-gray-700');
        if (abstractElement && !document.contains(audioElement)) {
          abstractElement.parentNode.insertBefore(audioElement, abstractElement.nextSibling);
        }
      }
    });
  };

  // Insert the audio player initially
  insertAudioIfMissing();

  // Set up a mutation observer to watch for changes to the abstract section
  const targetNode = document.querySelector('div.pb-8');
  if (targetNode) {
    const observerOptions = {
      childList: true,
      subtree: true
    };

    const observer = new MutationObserver(insertAudioIfMissing);
    observer.observe(targetNode, observerOptions);
  }
};

if (window.location.hostname === 'arxiv.org') {
  insertAudioPlayerForArxiv();
} else if (window.location.hostname === 'huggingface.co') {
  insertAudioPlayerForHuggingface();
}
