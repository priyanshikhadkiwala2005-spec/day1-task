// Array to store students
let students = [
    { name: "Rahul", marks: 75 },
    { name: "Priya", marks: 35 },
    { name: "Amit", marks: 50 }
];

// Function to check result
function checkResult(marks) {
    if (marks >= 40) {
        return "Pass";
    } else {
        return "Fail";
    }
}

// Function to display one student
function showStudent(name, marks, result) {
    return `
        <p>
            Name: ${name} |
            Marks: ${marks} |
            Result: ${result}
        </p>
    `;
}

// Function to display all students using loop
function displayStudents() {
    let output = "";

    for (let i = 0; i < students.length; i++) {
        let result = checkResult(students[i].marks);

        output += showStudent(
            students[i].name,
            students[i].marks,
            result
        );
    }

    document.getElementById("studentList").innerHTML = output;
}

// Function called when button is clicked
function addStudent() {
    let name = document.getElementById("studentName").value;
    let marks = Number(document.getElementById("studentMarks").value);

    if (name === "" || isNaN(marks)) {
        alert("Please enter valid details");
        return;
    }

    students.push({
        name: name,
        marks: marks
    });

    displayStudents();

    document.getElementById("studentName").value = "";
    document.getElementById("studentMarks").value = "";
}

// Show initial 3 students
displayStudents();
