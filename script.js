
//inputIds - id's of the elements that are used to add students
// ask Dan or Bill about this
// @type {string[]}

//Define all global variables here

var student_array = [];

// addClicked - Event Handler when user clicks the add button
// only call other functions

function addClicked() {
    console.log("add was clicked");
    addStudent();
    addStudentToDom();
    updateStudentList();
    updateData();

}// cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
//only call other functions

function cancelClicked() {
    console.log("cancel button clicked");
    clearAddStudentForm();
}

// addStudent - creates a student objects based on input fields in the form and adds the object to global student array
// written in such a way that you should not get the data from the inputs directly
// @return undefined

function addStudent() {
    var student = {
        name: $("#studentName").val(),
        course: $("#studentCourse").val();
        grade: $("#studentGrade").val();
    }
    student_array.push(student);
}

//clearAddStudentForm - clears out the form values based on inputIds variable

function clearAddStudentForm() {
    $("#studentName").val("");
    $("#studentCourse").val("");
    $("#studentGrade").val("");
}

// calculateAverage - loop through the global student array and calculate average grade and return that value
// @returns {number}
// needs a function that finds min and max
// recompute highest and lowest grade with red and green table rows

function calculateAverage () {
    var total = 0;
    for (x = 0; x < student_array.length; x++) {
     total += parseFloat(student_array[x].studentGrade);
    }
    return total / student_array.length;
}

// updateData - centralized function to update the average and call student list update
// no other code but other functions

function updateData() {
    var avg = calculateAverage();
    updateStudentList();
}

// updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body

function updateStudentList() {

}

// addStudentToDom - take in a student object, create html elements from the values and then append the elements
// into the .student_list tbody
// @param studentObj

function addStudentToDom(studentObj) {

}

// reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state

function reset() {

}

// Listen for the document to load and reset the data to the initial state

$(document).ready(function(){

});