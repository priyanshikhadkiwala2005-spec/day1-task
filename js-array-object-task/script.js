
let students = [];

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function(){

    let name = document.getElementById("studentName").value;
    let marks = Number(document.getElementById("studentMarks").value);

    let result;

    
    if(marks >= 40){
        result = "Pass";
    }else{
        result = "Fail";
    }

    
    let student = {
        name: name,
        marks: marks,
        result: result
    };

    
    students.push(student);

    displayStudents();
    showSummary();

    document.getElementById("studentName").value = "";
    document.getElementById("studentMarks").value = "";
});

function displayStudents(){

    let studentList = document.getElementById("studentList");

    studentList.innerHTML = "";

    for(let i = 0; i < students.length; i++){

        studentList.innerHTML += `
            <tr>
                <td>${students[i].name}</td>
                <td>${students[i].marks}</td>
                <td>${students[i].result}</td>
            </tr>
        `;
    }
}

function showSummary(){

    let passCount = 0;
    let failCount = 0;

    for(let i = 0; i < students.length; i++){

        if(students[i].result == "Pass"){
            passCount++;
        }else{
            failCount++;
        }
    }

    document.getElementById("totalStudents").innerText = students.length;
    document.getElementById("passCount").innerText = passCount;
    document.getElementById("failCount").innerText = failCount;
}
