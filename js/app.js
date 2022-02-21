// Global variables:

let timerId = [null, null, null, null];                 // used to capture each setInterval() returned id
let elementId = [];                                     // used to capture each timer's id
let timeInterval = [10, 1000, 1000*60, 1000*60*60];      // used to set each timer's time interval
let upperLimit = [100, 60, 60, 24];                      // used to set each timer's upper limit


function updateTime(elementId, upperLimit){
    // get the timer's current value:
    let timeUnit = Number(document.querySelector(elementId).textContent);
    // increase the timer's value by one:
    timeUnit += 1;
    // check the upper limit of each timer:
    if (timeUnit >= upperLimit){
        timeUnit = 0;
    }
    // format the displayed timer:
    if (timeUnit < 10){
        timeUnit = "0" + String(timeUnit);
    }
    // set the timer's new value:
    document.querySelector(elementId).textContent = timeUnit;
}

function resetTime(elementId){
    document.querySelector(elementId).textContent = "00";
}

function captureIDs(){
    // get the elements of first container class, which contains the timers' values:
    let childElements = document.querySelector(".container").children;

    // modify each timer's id, by adding the symbol (#) to it:
    for (let i=0; i<childElements.length; i++){
        let foundElementId = "#"+childElements[i].id;
        elementId.push(foundElementId);
    }
    // reverse the created array to be ["#milliseconds", "#seconds", "#minutes", "#hours"]:
    elementId.reverse();
}

function startStopwatch(){
    // start the timer if it did NOT start before:
    if (timerId[0] === null){
        // set interval for each timer value (milliseconds, seconds, minutes, hours):
        for (let i=0; i<timerId.length; i++){
            timerId[i] = setInterval(updateTime, timeInterval[i], elementId[i], upperLimit[i]);
        }
    }
}

function stopStopwatch(){
    // stop the timer if it did start before:
    if (timerId[0] !== null){
        // clear interval for each timer value (milliseconds, seconds, minutes, hours):
        for (let i=0; i<timerId.length; i++){
            clearInterval(timerId[i]);
            timerId[i] = null;
        }
    }
}

function resetStopwatch(){
    // get captured laps:
    let captureArea = document.querySelector("#captured-laps");
    // remove each displayed element in a specific area:
    while(captureArea.children.length !== 0){
        captureArea.children[0].remove();
    }

    // clear interval for each timer value (milliseconds, seconds, minutes, hours):
    for (let i=0; i<timerId.length; i++){
        clearInterval(timerId[i]);
        resetTime(elementId[i]);            // reset each timer's value to be (00)
        timerId[i] = null;
    }
}

function captureLap(){
    // get captured laps:
    let captureArea = document.querySelector("#captured-laps");
    // create new (p) element:
    let newCapture = document.createElement('p');
    // initial text to be displayed:
    let displayedText = "";
    // modify the displayed test with the actual captured time:
    for (let i=elementId.length-1; i>=0; i--){
        displayedText += document.querySelector(elementId[i]).textContent;
        if (i !== 0){
            displayedText += " : ";
        }
    }
    // add the final constructed text to be displayed:
    newCapture.textContent = displayedText;
    // add the created element to the DOM:
    captureArea.appendChild(newCapture);
}

// main entry:
// capture each timer's id:
captureIDs();