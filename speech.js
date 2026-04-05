const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-IN";

function startVoice() {
  recognition.start();
}

recognition.onresult = function(event) {
  document.getElementById("crop").value =
    event.results[0][0].transcript;
};

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  speechSynthesis.speak(speech);
}