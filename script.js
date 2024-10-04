document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const taskDatetime = document.getElementById("task-datetime");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");

    addTaskButton.addEventListener("click", addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        const datetime = taskDatetime.value;

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${taskText} ${datetime ? `(${new Date(datetime).toLocaleString()})` : ''}</span>
            <div>
                <button class="edit-button" onclick="editTask(this)">Edit</button>
                <button class="delete-button" onclick="deleteTask(this)">Delete</button>
                <button class="complete-button" onclick="completeTask(this)">✔️</button>
            </div>
        `;

        taskList.appendChild(li);
        // Animation effect for the newly added task
        li.style.opacity = 0;
        setTimeout(() => {
            li.style.opacity = 1;
            li.style.transition = "opacity 0.5s";
        }, 100);

        taskInput.value = '';
        taskDatetime.value = '';
    }

    window.editTask = function(button) {
        const li = button.closest("li");
        const span = li.querySelector("span");
        const taskText = span.textContent.split(' (')[0]; // Extract task text
        const datetime = span.textContent.split(' (')[1]?.replace(')', ''); // Extract datetime

        taskInput.value = taskText;
        taskDatetime.value = datetime ? new Date(datetime).toISOString().slice(0, 16) : ''; // Format datetime for input
        li.remove();
    };

    window.deleteTask = function(button) {
        const li = button.closest("li");
        // Fade out animation before removal
        li.style.transition = "opacity 0.5s";
        li.style.opacity = 0;
        setTimeout(() => {
            li.remove();
        }, 500);
    };

    window.completeTask = function(button) {
        const li = button.closest("li");
        li.classList.toggle("completed");
    };
});
