// convert json string into an array of objects
var tasksParsed = JSON.parse(tasks);

// create loop to return parsed json data inside of bootstrap cards
function displayResults() {
    document.getElementsByClassName("results")[0].innerHTML = "";

    for (let task of tasksParsed) {
        document.getElementsByClassName("results")[0].innerHTML +=
            `
    <div class="col">
        <div class="card shadow p-3 mb-5 bg-body rounded">
            <img src="${task.taskImg}" class="card-img-top" alt="${task.taskName}">
            <div class="card-body">
                <h5 class="card-title">${task.taskName}</h5>
                <p class="card-text"><strong>Description:</strong> ${task.taskDesc}</p>
                <p class="card-text"><strong>Priority: </strong><span class="prioritySpan">${task.taskPriority}</span></p>
                <div class="cardButtons">
                    <button class="btn priorityBtn btn-primary" type="submit">Importance</button>
                    <button class="btn completeBtn btn-primary" type="submit">Complete</button>
                </div>
            </div>
        </div>
    </div>
    `;
    }

    var priorityBtns = document.getElementsByClassName("priorityBtn");


    for (let i = 0; i < tasksParsed.length; i++) {

        priorityBtns[i].addEventListener("click", function () {
            addPriority(i);
            colorPriority(i);
        });
    }

}
// run to display cards for first time
displayResults();

// define prioritySpans variable which will be colored when priorityBtns are clicked
var prioritySpans = document.getElementsByClassName("prioritySpan");


// program function for priority levels to loop 1-5
function addPriority(i) {
    if (tasksParsed[i].taskPriority == 5) {
        tasksParsed[i].taskPriority = 0;
        prioritySpans[i].innerHTML = tasksParsed[i].taskPriority;

    } else {
        tasksParsed[i].taskPriority++
        prioritySpans[i].innerHTML = tasksParsed[i].taskPriority;
    }
}

// function to color spans based on priortiy level
function colorPriority(i) {
    if (tasksParsed[i].taskPriority < 2) {
        prioritySpans[i].style.backgroundColor = "#5cb85c";

    } else if (tasksParsed[i].taskPriority < 4) {
        prioritySpans[i].style.backgroundColor = "#f0ad4e";

    } else if (tasksParsed[i].taskPriority > 3) {
        prioritySpans[i].style.backgroundColor = "#d9534f";
    }
}

// create sort
var sortBtn = document.getElementById("sortBtn");

sortBtn.addEventListener("click", sortPriority);
console.table(tasksParsed.taskPriority);


function sortPriority() {
    tasksParsed.sort(function (a, b) {
        return b.taskPriority - a.taskPriority;        
    });
    displayResults();  
    colorPriority(); // why are spans not coloring after sort??
}

// disappearing cards NOT WORKING!!??

// define variables
var cards = document.getElementsByClassName("card");
var completeBtns = document.getElementsByClassName("completeBtn");

//create loop, initiate event listener and list functions
for (let i = 0; i < tasksParsed.length; i++) {
    completeBtns[i].addEventListener("click", function () {
        disappear(i);
    });
}
//program function to make cards disappear
function disappear(i) {
    cards[i].style.opacity = "0";
    cards[i].style.transition = "1s";
    setTimeout(() => { cards[i].remove() }, 1000);
}


