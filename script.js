var sgt = null;

function createSGT() {
    sgt = new StudentGradeTable();
    sgt.init();
    sgt.reset();
}

/**
 * SGT constructor
 */
function StudentGradeTable() {
    this.studentArr = []; // will hold student object
    this.studentName = $("#studentName"); // id's of the elements that are used to add students
    this.studentCourse = $("#course"); // selector that selects the elements
    this.studentGrade = $("#studentGrade"); // need a DOC ready to test selector

    /**
     * initialize constructor components
     */
    this.init = function() {
        this.textInputs = $(".form-control");
        this.addButton = $(".add");
        this.cancelButton = $(".cancel");
        this.eventHandlers();
    };

/**
 * function for event listeners within app
 */
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

/**
 * addClicked - Event Handler when user clicks the add button
 */
    this.addButtonClicked = function() {
        console.log("add button was clicked");
        this.addStudent();
        this.updateData();
    };

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
    this.cancelButtonClicked = function() {
        console.log("cancel button clicked");
        this.clearStudentAddForm();
    };

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @return undefined
 */
    this.addStudent = function() {
        var studentObject = { // need to pull values of input fields
            name: this.studentName.val(),
            course: this.studentCourse.val(),
            grade: this.studentGrade.val()
        };
        // users are required to input valid values into input fields
        if(studentObject.name === '' || studentObject.course === '' || studentObject.grade === '') {
            return;
        }
        // eliminates users from entering input other than a num
        if(isNaN(studentObject.grade)) {
            return;
        }
        console.log("student obj test", studentObject);
        this.studentArr.push(studentObject);
        this.clearStudentAddForm();
    };

/**
 * loops through global student array and appends each objects data into the appropriate tbody row *
 */
    this.updateStudentList = function() {
        $("tbody tr").remove(); // removes elements out of the DOM
        for(var i = 0; i < this.studentArr.length; i++) {
            this.addStudentToDom(this.studentArr[i]);
        }
    };

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
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

/**
 * updateData - centralized function to update the average and call student list update **
 */
    this.updateData = function() {
        this.updateStudentList();
        this.calculateAverage();
    };

/**
 * loop through the global student array and calculate average grade and return that value
 * @returns the value {number}
 * calculate average at the end of the for loop
 */
    this.calculateAverage = function() {
        var gradeValue;
        var gradeTotal = 0;
        var average;
        for(var i = 0; i < this.studentArr.length; i++) {
            gradeValue = parseInt(this.studentArr[i].grade);
            gradeTotal += gradeValue; // concatenate gradeValue to total
            console.log(gradeTotal);
        }
        average = Math.floor(gradeTotal / this.studentArr.length);
        console.log("testing average calc", average);
        $(".avgGrade").text(average);
    };

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
    this.clearStudentAddForm = function() {
        this.studentName.val('');
        this.studentCourse.val('');
        this.studentGrade.val('');
    };

/**
 * reset - resets the application to initial state.
 * Global variables reset
 * DOM get reset to initial load state
 */
    this.reset = function() {
        this.studentArr = [];
        this.clearStudentAddForm();
    };
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(createSGT);