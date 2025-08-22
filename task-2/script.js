let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function timeToString(time) {
  let diffInHrs = Math.floor(time / 3600000);
  let diffInMin = Math.floor((time % 3600000) / 60000);
  let diffInSec = Math.floor((time % 60000) / 1000);
  let diffInMs  = Math.floor((time % 1000) / 10);

  let formattedHrs = diffInHrs.toString().padStart(2, "0");
  let formattedMin = diffInMin.toString().padStart(2, "0");
  let formattedSec = diffInSec.toString().padStart(2, "0");
  let formattedMs = diffInMs.toString().padStart(2, "0"); 

  return `${formattedHrs}:${formattedMin}:${formattedSec}<span class="ms">.${formattedMs}</span>`;
}

function start() {
  if (!running) {
    startTime = performance.now() - elapsedTime;
    timerInterval = setInterval(function() {
      elapsedTime = performance.now() - startTime;
      document.getElementById("time").innerHTML = timeToString(elapsedTime);
    }, 10); 
    running = true;
  }
}

function pause() {
  clearInterval(timerInterval);
  running = false;
}

function reset() {
  clearInterval(timerInterval);
  document.getElementById("time").innerHTML = "00:00:00 <span class='ms'>.00</span>"; 
  elapsedTime = 0;
  running = false;
  document.getElementById("laps").innerHTML = "";
}

function recordLap() {
  if (elapsedTime > 0) {
    let lapTime = timeToString(elapsedTime,true);

    
    let parts = lapTime.split(".");
    let li = document.createElement("li");
    li.innerHTML = `Lap: ${parts[0]}<span class="lap-ms">.${parts[1]}</span>`;

    
    document.getElementById("laps").appendChild(li);
  }
}

