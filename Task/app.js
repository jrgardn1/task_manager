//Get form elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

//Task array
let task = [];

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const date = document.getElementById('task-date').value;
    const priority = document.getElementById('task-priority').value;

    const task = {
        title,
        desc,
        date,
        priority,
        completed: false
    };

    //Ask task to the array
    task.push(task);
    displayTasks();

    //Reset form
    taskForm.reset();

});

//Display tasks
function displayTasks() {
    taskList.innerHTML = '';


    task.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');


        taskItem.innerHTML =
            <><div>
                <strong>${task.title}</strong><br>
                    ${task.desc} - ${task.date} - Priority: ${task.priority}
                    </br>
                </div><button onclick="removeTask(${index})">Delete</button></>

            ;

            taskList.appendChild(taskItem);

    });
}


//Remove task
function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

//connects the front end to the back end
async function fetchTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    displayTasks(tasks);
}

fetchTasks();

