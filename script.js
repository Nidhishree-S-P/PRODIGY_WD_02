let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        if (!tInterval) {
            tInterval = setInterval(getShowTime, 10);
        }
        document.getElementById('startStop').textContent = 'Pause';
        document.getElementById('lap').disabled = false;
        document.getElementById('reset').disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        tInterval = null;
        document.getElementById('startStop').textContent = 'Resume';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    tInterval = null;
    running = false;
    document.getElementById('display').textContent = '00:00:00.0';
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
    document.getElementById('lap').disabled = true;
    document.getElementById('reset').disabled = true;
}

function lap() {
    if(running) {
        const lapTime = document.getElementById('display').textContent;
        const lapDiv = document.createElement('li');
        lapDiv.textContent = lapTime;
        document.getElementById('laps').appendChild(lapDiv);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % (1000)) / 100);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds.toString()[0];
    
    document.getElementById('display').textContent = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);
