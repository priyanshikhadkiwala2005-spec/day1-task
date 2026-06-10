let employees = [];

let form = document.getElementById("employeeForm");

form.addEventListener("submit", function(event){

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let department = document.getElementById("department").value;
    let salary = Number(document.getElementById("salary").value);

    let message = document.getElementById("message");

    
    if(name == ""){
        message.innerText = "Name cannot be empty";
        return;
    }

    if(email == ""){
        message.innerText = "Email cannot be empty";
        return;
    }

    if(salary <= 0){
        message.innerText = "Salary must be greater than 0";
        return;
    }

    message.innerText = "";

    let employee = {
        name: name,
        email: email,
        department: department,
        salary: salary
    };

    employees.push(employee);

    form.reset();

    showEmployees();
    showStatistics();

});

function showEmployees(){

    let employeeList = document.getElementById("employeeList");

    employeeList.innerHTML = "";

    for(let i = 0; i < employees.length; i++){

        employeeList.innerHTML +=
        "<div class='card'>" +
        "<p>Name : " + employees[i].name + "</p>" +
        "<p>Email : " + employees[i].email + "</p>" +
        "<p>Department : " + employees[i].department + "</p>" +
        "<p>Salary : " + employees[i].salary + "</p>" +
        "<button onclick='deleteEmployee(" + i + ")'>Delete</button>" +
        "</div>";
    }
}

function showStatistics(){

    let totalSalary = 0;
    let highestSalary = 0;

    for(let i = 0; i < employees.length; i++){

        totalSalary += employees[i].salary;

        if(employees[i].salary > highestSalary){
            highestSalary = employees[i].salary;
        }
    }

    let averageSalary = 0;

    if(employees.length > 0){
        averageSalary = totalSalary / employees.length;
    }

    document.getElementById("totalEmployees").innerText =
    employees.length;

    document.getElementById("averageSalary").innerText =
    averageSalary;

    document.getElementById("highestSalary").innerText =
    highestSalary;
}

function deleteEmployee(index){

    employees.splice(index, 1);

    showEmployees();
    showStatistics();
}
