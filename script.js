let btn = document.querySelector('#btn');
let voiceSIgnal = document.querySelector(".ai-image img");


function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1.5;
    text_speak.volume = 1;
    text_speak.pitch = 1.5;
    text_speak.lang = "en-IN"
    window.speechSynthesis.speak(text_speak)
}




let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.onresult = (event) => {
    let spokenText = event.results[0][0].transcript;
    document.querySelector("#userVoic").innerHTML = spokenText;

    takeCommand(spokenText);


}

btn.addEventListener("click", () => {
    recognition.start();
    btn.innerHTML = 'Listning......';
})


function takeCommand(message) {
    btn.innerHTML = 'Get Start';
    message = message.toLowerCase();

    if (message.includes("hello")) {
        speak("Hello sir, what can I help you ");
    } else if (message.includes("your name")) {
        speak("My name is sipra Assistant.");
    }
    else if (message.includes("who are you")) {
        speak('my name is sipra, i am a virtual assistant, devolopde by saurabh sir')
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak("The current time is " + time);
    }
    else if (message.includes("open youtube")) {
        speak("openin youtube")
        window.open('https://www.youtube.com/')
    }
    else if (message.includes('open google')) {
        speak("openin google")
        window.open('https://www.google.co.in/')
    }
    else if (message.includes('good morning')) {
        speak('good morning sir what can i help you');

    } else if (message.includes('good afternoon')) {
        speak('good afternoon sir what can i help you');

    } else if (message.includes('good evening')) {
        speak('good evening sir what can i help you');

    } else if (message.includes('good night')) {
        speak('good night sir what can i help you');
        
    } else if (message.includes('open instagram')) {
        speak('openin instagram')
        window.open("https://www.instagram.com/")
    }
    else if (message.includes('open facebook')) {
        speak('openin facebook')
        window.open('https://www.facebook.com/')
    } else if (message.includes("search")) {
        let query = message.replace("search", "").trim();
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
        speak("Searching Google for " + message);
    }
    else if (message.includes("who is") || message.includes("tell me about")) {
        let searchQuery = message.replace("who is", "").replace("tell me about", "").replace(/[^a-zA-Z0-9 ]/g, "").trim();
        console.log(searchQuery);
        fetchWikipedia(searchQuery);

    }
    else if (message.includes("what is") || message.includes("search")) {
        let search = message.replace("what is", "").replace("search", "").replace(/[^a-zA-Z0-9 ]/g, "").trim();
        speak('according to google')
        window.open(`https://www.google.co.in/search?q=what+is+javascript&sca_esv=e4784d011bb8751d&source=hp&ei=ijEjaNWjM6aX4-EPqY34iAU&iflsig=ACkRmUkAAAAAaCM_mt0MR5fZmlpMCATeh4YHemeoBJv2&oq=${search}`)


    }

}


function fetchWikipedia(query) {
    let apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    fetch(apiUrl)
        .then((respone) => {
            return respone.json();
        })
        .then((data) => {
            if (data.extract) {

                speak('accodrding to wikipedia' + data.extract)
            } else {
                speak("Sorry, I couldn't find anything on Wikipedia about " + query);
                window.open(`https://www.google.co.in/search?q=what+is+javascript&sca_esv=e4784d011bb8751d&source=hp&ei=ijEjaNWjM6aX4-EPqY34iAU&iflsig=ACkRmUkAAAAAaCM_mt0MR5fZmlpMCATeh4YHemeoBJv2&oq=${query}`)


            }


        })
        .catch(error => {
            console.error(error);


        })
}


