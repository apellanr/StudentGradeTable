// Listen for the document to load and reset the data to the initial state

$(document).ready(init);

//Define all global variables here
var student_array = [];

function init() {
    console.log('SGT loaded');
    $('.btn-success').click(addClicked);
    $('.btn-default').click(cancelClicked);
    reset();
    deleteClicked();
}

//inputIds - id's of the elements that are used to add students
// ask Dan or Bill about this
// @type {string[]}

// var inputIds = ('studentName', 'course', 'studentGrade');

// addClicked - Event Handler when user clicks the add button
// only call other functions

function addClicked() {
    console.log("add was clicked");
    addStudent();
}

// addStudent - creates a student objects based on input fields in the form and adds the object
// to global student array written in such a way that you should not get the data from the inputs directly
// @return undefined

function addStudent() {
    var studentData = {
        name: $("#studentName").val(),
        course: $("#course").val(),
        grade: $("#studentGrade").val()
    };
    student_array.push(studentData);
    clearAddStudentForm();
    updateData();
}

// cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
//only call other functions

function cancelClicked() {
    console.log("cancel button clicked");
    clearAddStudentForm();
}

//clearAddStudentForm - clears out the form values based on inputIds variable

function clearAddStudentForm() {
    console.log("form cleared");
    $("#studentName").val("");
    $("#course").val("");
    $("#studentGrade").val("");
}

// calculateAverage - loop through the global student array and calculate average grade and return that value
// @returns {number}
// needs a function that finds min and max
// recompute highest and lowest grade with red and green table rows

function calculateAverage() {
    var total = 0;
    for (x = 0; x < student_array.length; x++) {
        total += parseFloat(student_array[x].grade);
    }
    return Math.round(total / student_array.length);
}

// updateData - centralized function to update the average and call student list update
// no other code but other functions

function updateData() {
    updateStudentList();
    if(isNaN(calculateAverage) == true) {
        $('.avgGrade').text(0);
    }
    else {
        $('.avgGrade').text(calculateAverage);
    }
}

// updateStudentList - loops through global student array and appends
// each objects data into the student-list-container > list-body

function updateStudentList() {
    $('tbody tr').remove();
    for (i = 0; i < student_array.length; i++) {
        var studentObj = student_array[i];
        addStudentToDom(studentObj);
    }
    calculateAverage();
}

// addStudentToDom - take in a student object, create html elements from the values
// and then append the elements into the .student_list tbody
// @param studentObj

function addStudentToDom(studentObj) {
    var $row = $('<tr>');
    var name = $('<td>').text(studentObj.name);
    var course = $('<td>').text(studentObj.course);
    var grade = $('<td>').text(studentObj.grade);
    var $deleteDom = $('<td>');
    var $deleteBtn = $('<button>', {
        type: 'button',
        class: 'btn btn-danger',
        text: 'Delete'
    });
    $deleteDom.append($deleteBtn);
    ($row).append(name, course, grade, $deleteDom);
    $('.student-list tbody').append($row);
}

// remove student data

// function removeStudent(event) {
//
// }

// delete button clicked

function deleteClicked() {
 console.log("delete button clicked");
 // removeStudent();
}

// reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state

function reset() {
    student_array = [];
    updateData();
    clearAddStudentForm();
}