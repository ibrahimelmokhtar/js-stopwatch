// Global variables:

let timerId = [null, null, null, null];                 // used to capture each setInterval() returned id
let elementId = [];                                     // used to capture each timer's id
let timeInterval = [1, 1000, 1000*60, 1000*60*60];      // used to set each timer's time interval
let upperLimit = [60, 60, 60, 24];                      // used to set each timer's upper limit


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
    // capture each timer's id:
    captureIDs();
    // start the timer if it did NOT start before:
    if (timerId[0] === null){
        console.log("Start btn is clicked!!!");         // console debugging ...
        // set interval for each timer value (milliseconds, seconds, minutes, hours):
        for (let i=0; i<timerId.length; i++){
            timerId[i] = setInterval(updateTime, timeInterval[i], elementId[i], upperLimit[i]);
        }
    }
}

function stopStopwatch(){
    console.log("Stop btn is clicked!!!");
}

function resetStopwatch(){
    console.log("Reset btn is clicked!!!");
}
