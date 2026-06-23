let habits = JSON.parse(localStorage.getItem("habits")) || [];

// SAVE
function save() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

// ADD HABIT
function addHabit() {

    let name = document.getElementById("habitInput").value;

    if (name === "") {
        alert("Enter habit");
        return;
    }

    let habit = {
        name: name,
        streak: 0,

        broken: false,
        savedStreak: 0,
        breakTime: 0,
        breakClicks: 0
    };

    habits.push(habit);

    save();
    display();

    document.getElementById("habitInput").value = "";
}

// COMPLETE
function completeHabit(i) {

    habits[i].streak++;

    save();
    display();
}

// BREAK STREAK (2 Click Required)
function breakHabit(i) {

    habits[i].breakClicks++;

    if (habits[i].breakClicks === 1) {
        alert("Click Break again to confirm!");
        save();
        return;
    }

    habits[i].savedStreak = habits[i].streak;

    habits[i].broken = true;

    habits[i].breakTime = Date.now();

    save();
    display();
}

// RESTORE STREAK
function restoreHabit(i) {

    let currentTime = Date.now();

    let diff =
        currentTime -
        habits[i].breakTime;

    // 10 minutes = 600000 ms
    if (diff <= 600000) {

        habits[i].streak =
            habits[i].savedStreak;

        habits[i].broken = false;

        habits[i].savedStreak = 0;

        habits[i].breakTime = 0;

        habits[i].breakClicks = 0;

        alert("Streak Restored!");
    }
    else {

        habits[i].streak = 0;

        habits[i].broken = false;

        habits[i].savedStreak = 0;

        habits[i].breakTime = 0;

        habits[i].breakClicks = 0;

        alert("Restore Time Expired! Streak Lost.");
    }

    save();
    display();
}

// DELETE
function deleteHabit(i) {

    habits.splice(i, 1);

    save();
    display();
}

// BADGE
function badge(streak) {

    if (streak >= 10) return "Gold Badge";
    if (streak >= 7) return "Silver Badge";
    if (streak >= 3) return "Bronze Badge";

    return "";
}

// DISPLAY
function display() {

    let output = "";

    for (let i = 0; i < habits.length; i++) {

        // Remaining timer
        let timerText = "";

        if (habits[i].broken) {

            let remaining =
                Math.max(
                    0,
                    600 -
                    Math.floor(
                        (Date.now() -
                        habits[i].breakTime) / 1000
                    )
                );

            let min =
                Math.floor(remaining / 60);

            let sec =
                remaining % 60;

            timerText =
                `<p>Restore Time: ${min}:${String(sec).padStart(2,"0")}</p>`;

            // Auto lose streak after 10 min
            if (remaining <= 0) {

                habits[i].streak = 0;

                habits[i].broken = false;

                habits[i].savedStreak = 0;

                habits[i].breakTime = 0;

                habits[i].breakClicks = 0;

                save();
            }
        }

        let b = badge(habits[i].streak);

        output += `
        <div class="habit">

            <h3>${habits[i].name}</h3>

            <p>Streak: ${habits[i].streak}</p>

            <p class="badge">${b}</p>

            ${timerText}

            <button onclick="completeHabit(${i})">
                Complete
            </button>

            <button onclick="deleteHabit(${i})">
                Delete
            </button>

            ${
                habits[i].broken
                ?
                `<button onclick="restoreHabit(${i})">
                    Restore
                </button>`
                :
                `<button onclick="breakHabit(${i})">
                    Break
                </button>`
            }

        </div>
        `;
    }

    document.getElementById("habitList").innerHTML = output;

    updateStats();
}

// SEARCH
function searchHabit() {

    let text =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let output = "";

    for (let i = 0; i < habits.length; i++) {

        if (
            habits[i].name
            .toLowerCase()
            .includes(text)
        ) {

            let b =
                badge(habits[i].streak);

            output += `
            <div class="habit">

                <h3>${habits[i].name}</h3>

                <p>Streak: ${habits[i].streak}</p>

                <p class="badge">${b}</p>

            </div>
            `;
        }
    }

    document.getElementById("habitList").innerHTML = output;
}

// STATS
function updateStats() {

    let active = 0;
    let longest = 0;

    for (let i = 0; i < habits.length; i++) {

        if (habits[i].streak > 0) {
            active++;
        }

        if (habits[i].streak > longest) {
            longest = habits[i].streak;
        }
    }

    document.getElementById("totalHabits").innerText =
        habits.length;

    document.getElementById("activeStreaks").innerText =
        active;

    document.getElementById("longestStreak").innerText =
        longest;
}

// Timer Live Update Every Second
setInterval(display, 1000);

// LOAD
display();
