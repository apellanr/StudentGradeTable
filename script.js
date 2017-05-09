// listen for the document to load and reset the data to the initial state
$(document).ready(createSGT);

var studentInfo = null;

function createSGT() {
    studentInfo = new StudentGradeTable();
    studentInfo.init();
}

function StudentGradeTable() {
    var self = this;
    this.studentArr = []; // will hold student object
    this.studentName = $("#studentName"); // id's of the elements that are used to add students
    this.studentCourse = $("#course"); // selector that selects the elements
    this.studentGrade = $("#studentGrade"); // need a DOC ready to test selector

    // initialize constructor function
    this.init = function() {
        this.addButton = $(".add");
        this.cancelButton = $(".cancel");
        this.eventHandlers();
    };

    // function for event listeners
    this.eventHandlers = function() {
        this.addButton.click(this.addClicked);
        this.cancelButton.click(this.cancelClicked.bind(this)); // was experiencing cancel button error. need to use .bind(this)
    };

    // event handler when user clicks the add button
    this.addClicked = function() {
        console.log("add button was clicked");
        self.addStudent();
    };

    // event handler when user clicks the cancel button, should clear out student form too
    this.cancelClicked = function() {
        console.log("cancel button clicked");
        this.clearStudentAddForm();
    };

    //creates a student object based on input fields in the form
    // and adds the object to global student array
    // calls clearAddStudentForm();
    // return undefined;
    this.addStudent = function() {
        // need to pull values of input fields
        var studentObject = {
            name: this.studentName.val(),
            course: this.studentCourse.val(),
            grade: this.studentGrade.val()
        };
        console.log("student obj test", studentObject);
        this.studentArr.push(studentObject);
        this.clearStudentAddForm();
    };

    // clears out the form values based on inputIds variable
    this.clearStudentAddForm = function() {
        self.studentName.val('');
        self.studentCourse.val('');
        self.studentGrade.val('');
    };

    // loop through the global student array and calculate average grade
    // return the value { number }
    // calculate average at the end of the for loop
    this.calculateAverage = function() {

    };

    // centralized function to update the average and call student list update function
    this.updateData = function() {

    };

    // loops through global student arrat and appends each objects data into the table structure
    // incorrect so modify necessary references : student-list-container > list-body
    this.updateStudentList = function() {

    };

    // take in a studentObject, create HTML elements from the values
    // append the element into the .student_list tbody
    // @ param studentObj
    this.addStudentToDom = function(studentObj) {

    };

    // resets the application to initial state. global variables reset
    // DOM get reset to initial load state
    this.reset = function() {
        self.studentArr = [];

    };

}

