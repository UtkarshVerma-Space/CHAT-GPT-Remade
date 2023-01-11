var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var textbyuser = [];

var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var searchbox = document.querySelector('.output');



function startrec() {
    
    recognition.start();
}


function stoprecording() {
    recognition.stop();
}





recognition.onresult = function(event) {

  var texts = event.results[0][0].transcript;
  searchbox.value = texts;
}


