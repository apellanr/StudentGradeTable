// listen for the document to load and reset the data to the initial state
$(document).ready(createSGT);

var sgt = null;

function createSGT() {
    sgt = new StudentGradeTable();
    sgt.init();
    console.log(sgt);
    // sgt.reset();
}

// CONTROLLER
function StudentGradeTable() {
    this.model = null;
    this.view = null;
    this.init = function() {
        console.log("init");
        this.model = new Model(this);
        this.view = new View(this);
        this.model.init();
        this.view.init();
        this.eventHandlers();
    };
    this.eventHandlers = function() {
        this.textInputs = $(".form-control");
        this.textInputs.keypress(this.validateKeypress);
        this.addButton = $(".add");
        this.addButton.click(this.addButtonClicked.bind(this.controller));
        this.cancelButton = $(".cancel");
        this.cancelButton.click(this.cancelButtonClicked.bind(this.controller)); // was experiencing cancel button error. need to use .bind(this)
    };

    this.reset = function() {
        this.model.reset();
        this.view.clearStudentAddForm();
    };

    this.validateKeypress = function(event) {
        if(event.keyCode === 13) {
            $(".add").click();
        }
    };

    this.addButtonClicked = function() {
        console.log("add button was clicked", this);
        this.model.addStudent();
        this.model.updateData();
    };

    this.cancelButtonClicked = function() {
        console.log("cancel button clicked");
        this.clearStudentAddForm();
    };

    // **** MODEL **** //
    // for the domain layer. adding and removing data
    function Model(View, Controller) {
        this.view= View;
        this.controller = Controller;
        this.studentArr = []; // will hold student object
        this.studentName = $("#studentName"); // id's of the elements that are used to add students
        this.studentCourse = $("#course"); // selector that selects the elements
        this.studentGrade = $("#studentGrade"); // need a DOC ready to test selector
        this.init = function() {
            this.addStudent();
        };

        // return undefined; ??
        this.addStudent = function() {
            var studentObject = { // need to pull values of input fields
                name: this.studentName.val(),
                course: this.studentCourse.val(),
                grade: this.studentGrade.val()
            };
            console.log("student obj test", studentObject);
            this.studentArr.push(studentObject);
            console.log(this);
            this.view.view.clearStudentAddForm();

        };

        this.updateStudentList = function() {
            $("tbody tr").remove(); // removes elements out of the DOM
            for(var i = 0; i < this.studentArr.length; i++) {
                this.addStudentToDom(this.studentArr[i]);
            }
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

        // resets the application to initial state. global variables reset
        // DOM get reset to initial load state
        this.reset = function() {
            this.studentArr = [];
            this.view.clearStudentAddForm();
        };
    }

    // **** VIEW **** //
    function View(controller) {
        this.controller = controller;
        // initialize constructor function
        this.init = function() {

        };

        this.addStudentToDom = function(studentObj) {
            console.log("element created");
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

        this.clearStudentAddForm = function() {
            $("#studentName").val('');
            $("#course").val('');
            $("#studentGrade").val('');
        };
    }
}




