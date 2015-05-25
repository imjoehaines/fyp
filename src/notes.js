var shared = require('./exercisesShared');

var FEEDBACK_DIV = document.getElementById('feedback');
var FEEDBACK_DISPLAY = document.getElementById('feedbackDisplay');

var previousRecordNotes = localStorage.getItem('previousRecordNotes');
var currentNote;
var exerciseIsRunning = true;

var stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height: 150
});

var stringLength = stage.getWidth() - 50;

// layer to hold notes
var circleLayer = new Kinetic.Layer();

// empty function as button clicks wont do anything in this exercise
// TODO: fix this
function buttonClicked() {}

/**
 * Draws a circle at a random position on the fretboard. Updates currentNote
 * variable with the new note.
 */
function drawRandomNote() {
    // Intersections are at x = (50 + ((stringLength / MAX_FRETS) / 2)) + (((stringLength - 50) / MAX_FRETS)
    // y values are 50, 100, 150, 200 for G, D, A, E strings
    var fret = Math.floor(Math.random() * shared.MAX_FRETS);
    var string = Math.floor(Math.random() * 4);

    // centerX, centerY, radius, id, fillColour, layer, opacity
    shared.drawCircle(
        (50 + ((stringLength / shared.MAX_FRETS) / 2)) + (((stringLength - 50) / shared.MAX_FRETS)  * fret),
        50 + (string * 25),
        15,
        string.toString() + fret.toString(),
        '#E51400',
        circleLayer,
        1,
        buttonClicked
    );

    currentNote = shared.NOTES[string][fret];

    stage.add(circleLayer);
}

/**
 * Function called when a button is clicked on the notes page. Handles answers,
 * updates score and draws a new random note.
 * @param  {object} link The link that was clicked
 */
function answerButton(link) {
    if (exerciseIsRunning) {
        var answer = link.innerHTML;

        if (currentNote === answer) {
            shared.score += 1;
            FEEDBACK_DISPLAY.innerHTML = 'Correct!';
        } else {
            FEEDBACK_DISPLAY.innerHTML = 'Incorrect!';
        }

        displayFeedback();
        shared.totalQuestions += 1;
        shared.TOTAL_DISPLAY.innerHTML = shared.totalQuestions;
        shared.SCORE_DISPLAY.innerHTML = Math.round((shared.score / shared.totalQuestions) * 100);
        shared.CORRECT_DISPLAY.innerHTML = shared.score;

        // remove old drawn notes
        circleLayer.removeChildren();

        drawRandomNote();
    }
}

/**
 * Displays feedback (correct/incorrect) after an answer has been submitted
 */
function displayFeedback() {
    var classToAdd;
    var timeout = 1250;

    if (FEEDBACK_DISPLAY.innerHTML == 'Correct!') {
        classToAdd = 'correctAnswer';
    } else {
        classToAdd = 'incorrectAnswer';
    }

    setTimeout(function() {
        FEEDBACK_DIV.classList.remove(classToAdd);
        FEEDBACK_DIV.style.opacity = 0;
    }, timeout);

    FEEDBACK_DIV.style.opacity = 1;
    FEEDBACK_DIV.classList.add(classToAdd);
}

/**
 * Called every second to update the timer
 */
function updateTimer() {
    var extraZero = 0;

    shared.timerSeconds -= 1;

    if (shared.timerSeconds < 0) {
        shared.timerMinutes -= 1;
        shared.timerSeconds = 59;
    }

    if (shared.timerSeconds < 10) {
        extraZero = 0;
    } else {
        extraZero = '';
    }

    shared.TIMER_DISPLAY.innerHTML = shared.timerMinutes + ':' + extraZero + shared.timerSeconds;

    // check if out of time
    if (shared.timerSeconds === 0 && shared.timerMinutes === 0) {
        endExercise();
    }
}

/**
 * Ends the exercise, showing total score and record
 */
function endExercise() {
    exerciseIsRunning = false;
    clearInterval(shared.timerR);
    shared.TIMER_DISPLAY.innerHTML = '0:00';

    document.getElementById('ootHeader').innerHTML = 'Time\'s up!';
    document.getElementById('finalCorrect').innerHTML = shared.score;
    document.getElementById('finalTotal').innerHTML = shared.totalQuestions;
    document.getElementById('outOfTime').style.display = 'block';

    if (!previousRecordNotes) {
        document.getElementById('noRecord').style.display = 'block';
        document.getElementById('noPreviousRecordValue').innerHTML = shared.score;
        localStorage.setItem('previousRecordNotes', shared.score);
    } else if (previousRecordNotes < shared.score) {
        document.getElementById('beatRecord').style.display = 'block';
        document.getElementById('beatPreviousRecordValue').innerHTML = previousRecordNotes;
        localStorage.setItem('previousRecordNotes', shared.score);
    } else {
        document.getElementById('lostRecord').style.display = 'block';
        document.getElementById('lostPreviousRecordValue').innerHTML = previousRecordNotes;
    }
}

// update the timer before interval starts so it displays correctly on page load
updateTimer();

// create a variable to allow clearInterval to work
shared.timerR = setInterval(updateTimer, shared.TIMER_TICK_MS);

// overwrite string spacing as this canvas is smaller than others
var stringSpacing = 25;
shared.drawStrings(stage, stringSpacing);

drawRandomNote();

var notesAnswerButtons = document.getElementsByClassName('notesAnswerButton');
for (var i = notesAnswerButtons.length - 1; i >= 0; i--) {
    notesAnswerButtons[i].onclick = function () {
        answerButton(this);
    };
}