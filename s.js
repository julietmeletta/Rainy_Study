function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") return;

    let list = document.getElementById("taskList");

    let item = document.createElement("li");
    item.innerHTML =
        '<input type="checkbox" onclick="updateProgress()"> ' + taskText +
        '<h3 onclick="deleteTask(this)">🗑</h3>';
    list.appendChild(item);

    input.value = "";
    updateProgress();
}

document.getElementById("taskInput")
.addEventListener("keydown", function(event) {
    if (event.key === "Enter") addTask();
});

let timeLeft = 25 * 60;
let timer = null;

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("time").innerText =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    if (timer) return;

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            timer = null;
            alert("Study session done 🍵 Take a break!");
        }
    }, 1000);
}

function pauseTimer() {
    if (!timer) return;

    clearInterval(timer)
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    timeLeft = 25 * 60;
    updateDisplay();
}

updateDisplay();

function updateProgress() {
    let tasks = document.querySelectorAll("#taskList li");
    let checked = document.querySelectorAll("#taskList input:checked");

    let percent = tasks.length ? (checked.length / tasks.length) * 100 : 0;

    document.getElementById("progressFill").style.width = percent + "%";
}

function deleteTask(element) {
    element.parentElement.remove();
    updateProgress();
}

updateProgress();