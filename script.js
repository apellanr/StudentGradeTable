// Listen for the document to load and reset the data to the initial state

$(document).ready(init);

//Define all global variables here
var student_array = [];

function init() {
    console.log('SGT loaded');
    $('.btn-success').click(addClicked);
    $('.btn-default').click(cancelClicked);
    $('.btn-danger').click(deleteClicked);
    reset();
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
    calculateAverage(student_array);
    clearAddStudentForm(student_array);
    updateData();
    return studentData;
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
    var studentAvg = (total / student_array.length);
    studentAvg = Math.round(studentAvg);
    if (isNaN(studentAvg)) {
        console.log('no data available');
        $('.avgGrade').text(0);
    } else {
        console.log('student avg: ', studentAvg);
        $('.avgGrade').text(studentAvg);
    }
    return studentAvg;
}

// updateData - centralized function to update the average and call student list update
// no other code but other functions

function updateData() {
    updateStudentList();
    calculateAverage();
}

// updateStudentList - loops through global student array and appends
// each objects data into the student-list-container > list-body

function updateStudentList() {
    $('tbody tr').remove();
    for (i = 0; i < student_array.length; i++) {
        var studentObj = student_array[i];
        addStudentToDom(studentObj);
    }
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
    var $deleteBtn = $('<button>').addClass('btn btn-danger').attr('onclick','deleteClicked(this)').text('Delete');
    $deleteDom.append($deleteBtn);
    ($row).append(name, course, grade, $deleteDom);
    $('.student-list tbody').append($row);
}

// remove student data * need to go back and review this code

function removeStudent() {
    console.log('removeStudent');
    var rowIndex = $(this).parents('tr');
    rowIndex = rowIndex[0].rowIndex;
    student_array.splice(rowIndex - 1, 1);
    updateData();
}

// delete button clicked

function deleteClicked($deleteBtn) {
    console.log("delete button clicked");
    $($deleteBtn).closest('tr').remove();
    removeStudent();
}

// reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state

function reset() {
    student_array = [];
    $('.avgGrade').text(0);
    updateStudentList();
}