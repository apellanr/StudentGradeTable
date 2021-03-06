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
    var self = this;
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
        this.serverButton = $(".server");
        this.eventHandlers();
        this.getServerData();
    };

/**
 * function for event listeners within app
 */
    this.eventHandlers = function() {
        this.textInputs.keypress(this.validateKeypress);
        this.addButton.click(this.addButtonClicked.bind(this));
        this.cancelButton.click(this.cancelButtonClicked.bind(this)); // was experiencing cancel button error. need to use .bind(this)
        this.serverButton.click(this.getServerData.bind(this));
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
 * Get Server data AJAX call
 */
this.getServerData = function() {
    console.log('grabbing server data');
    $.ajax({
        // url: 'getjson.php',
        // url: 'get.json',
        url: 'http://s-apis.learningfuze.com/sgt/get',
        data: {
          'api_key': 'cAP8RUHTOI'
        },
        dataType: 'json',
        method: 'post',
        success : function(response) { // store response in a variable
            console.log(response);
            var server_data = response.data;
            var hints = server_data.hint;
            console.log("SGT hints: ", hints);
            self.studentArr = self.studentArr.concat(server_data);
            self.updateStudentList(self.studentArr);
            self.calculateAverage();
        },
        error: function(response) {
            console.error('error in ajax call', response);
            self.errorModal();
        }
    });
};

/**
 * Upload to Server AJAX
 * make sure to record the student's ID, given by the database
 */
this.addStudentToServer = function(name, course, grade) {
    console.log('adding student to server');
    $.ajax({
        url: 'http://s-apis.learningfuze.com/sgt/create',
        data: {
            'api_key': 'cAP8RUHTOI',
            'name': name,
            'course': course,
            'grade': grade
        },
        dataType: 'json',
        method: 'post',
        success: function(data) {
            console.log('data sent to server: ', data);
            self.studentArr[self.studentArr.length - 1].id = data.new_id;

        },
        error: function(data) {
            console.log('error with data submission: ', data);
            self.errorModal();
        }
    });
};

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @return undefined
 */
    this.addStudent = function() {
        var studentObj = { // need to pull values of input fields
            name: this.studentName.val(),
            course: this.studentCourse.val(),
            grade: this.studentGrade.val()
        };
        // users are required to input valid values into input fields
        if(studentObj.name === '' || studentObj.course === '' || studentObj.grade === '') {
            return;
        }
        // eliminates users from entering input other than a num
        if(isNaN(studentObj.grade) && studentObj.grade < 0) {
            return;
        }
        console.log("student obj test", studentObj);
        this.studentArr.push(studentObj);
        this.addStudentToServer(studentObj.name, studentObj.course, studentObj.grade);
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
                self.deleteStudentFromServer(self.studentArr[deletePosition]);
                self.studentArr.splice(deletePosition, 1);
                self.updateData();
            });
        })(this);
    };

    this.deleteStudentFromServer = function(object) {
        console.log('deleting student from server');
        $.ajax({
            url: 'http://s-apis.learningfuze.com/sgt/delete',
            data: {
                'api_key': 'cAP8RUHTOI',
                'student_id': object.id
            },
            dataType: 'json',
            method: 'post',
            success : function(response) {
                console.log('deletion worked!!!', response);
            },
            error : function(response) {
                console.log("error in deletion process: ", response);
            }
        });
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

    this.errorModal = function() {
        console.log('error has occurred');
        $("#modalHeader").text("ERROR HAS OCCURRED");
        $(".modal-body div").remove();
        var $errorDiv = $("<div>");
        var $errorImg = $("<img src='500_error.jpeg' class='img-responsive'>");
        $errorDiv.append($errorImg);
        $(".modal-body").append($errorDiv);
        $("#errorModal").modal('show');
    };
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(createSGT);