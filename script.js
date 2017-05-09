// listen for the document to load and reset the data to the initial state
$(document).ready(createSGT);

var sgt = null;

function createSGT() {
    sgt = new StudentGradeTable();
    sgt.init();
    // sgt.reset();
}

function StudentGradeTable() {
    var self = this;
    this.studentArr = []; // will hold student object
    this.studentName = $("#studentName"); // id's of the elements that are used to add students
    this.studentCourse = $("#course"); // selector that selects the elements
    this.studentGrade = $("#studentGrade"); // need a DOC ready to test selector

    // initialize constructor function
    this.init = function() {
        this.textInputs = $(".form-control");
        this.addButton = $(".add");
        this.cancelButton = $(".cancel");
        this.eventHandlers();
    };

    // function for event listeners
    this.eventHandlers = function() {
        this.textInputs.keypress(this.validateKeypress);
        this.addButton.click(this.addButtonClicked.bind(this));
        this.cancelButton.click(this.cancelButtonClicked.bind(this)); // was experiencing cancel button error. need to use .bind(this)
    };

    this.validateKeypress = function(event) {
        if(event.keyCode === 13) {
            $(".add").click();
        }
    };

    // event handler when user clicks the add button
    this.addButtonClicked = function() {
        console.log("add button was clicked");
        this.addStudent();
        this.updateData();
    };

    // event handler when user clicks the cancel button, should clear out student form too
    this.cancelButtonClicked = function() {
        console.log("cancel button clicked");
        this.clearStudentAddForm();
    };

    // creates a student object based on input fields in the form
    // adds the object to global student array
    // calls clearAddStudentForm();
    // return undefined;

    this.addStudent = function() {
        var studentObject = { // need to pull values of input fields
            name: this.studentName.val(),
            course: this.studentCourse.val(),
            grade: this.studentGrade.val()
        };
        console.log("student obj test", studentObject);
        this.studentArr.push(studentObject);
        this.clearStudentAddForm();
    };

    // loops through global student array and appends each objects data into the table structure
    // incorrect so modify necessary references : student-list-container > list-body
    this.updateStudentList = function() {
        $("tbody tr").remove(); // removes elements out of the DOM
        for(var i = 0; i < this.studentArr.length; i++) {
            this.studentArr[i].id = i;
            this.addStudentToDom(this.studentArr[i]);
        }
    };

    this.addStudentToDom = function(studentObj) {
        var $tRow = $("<tr>");
        var $tdName = $("<td>").text(studentObj.name);
        var $tdCourse = $("<td>").text(studentObj.course);
        var $tdGrade = $("<td>").text(studentObj.grade);
        var $tdDelete = $("<td>");
        var $deleteButton = $("<button>",{
            class: "btn btn-danger",
            text: "Delete",
            type: "button",
            id: studentObj.id
        });
        console.log('elements created');
        (function(self){
            $tdDelete.append($deleteButton);
            $tRow.append($tdName, $tdCourse, $tdGrade, $tdDelete);
            $('#tableBody').append($tRow);
            $tRow.on('click', 'button', function(){
                var deletePosition = $tRow.index(); // gets index of element relative to selector
                $tRow.remove(); // need to remove the selected element
                self.studentArr.splice(deletePosition, 1);
                self.updateData();
            });
        })(this);
    };

    // centralized function to update the average and call student list update function
    this.updateData = function() {
        this.updateStudentList();
    };

    // loop through the global student array and calculate average grade
    // return the value { number }
    // calculate average at the end of the for loop
    this.calculateAverage = function() {

    };

    // clears out the form values based on inputIds variable
    this.clearStudentAddForm = function() {
        this.studentName.val('');
        this.studentCourse.val('');
        this.studentGrade.val('');
    };

    // resets the application to initial state. global variables reset
    // DOM get reset to initial load state
    this.reset = function() {
        this.studentArr = [];
    };
}

