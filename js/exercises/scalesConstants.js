var ROOT = localStorage.getItem("selectedKey");
var selectedScale = localStorage.getItem("selectedScale");

var SCALE_NAMES = [
    "Major",
    "Minor Pentatonic",
    "Major Pentatonic",
    "Major Triad",
    "Major 7th",
    "Dominant 7th",
    "Mixolydian"
];

var ROOT_NOTE_COORDINATES = [
    [3,4], // A
    [3,5], // A#
    [3,6], // B
    [2,2], // C
    [2,3], // C#
    [2,4], // D
    [2,5], // D#
    [2,6], // E
    [2,7], // F
    [2,8], // F#
    [3,2], // G
    [3,3]  // G#
];

var ROOT_NOTE = ROOT_NOTE_COORDINATES[ROOT];

var SCALE_LIST = [
    Major = [
        "Major 2nd",
        "Major 3rd",
        "Perfect 4th",
        "Perfect 5th",
        "Major 6th",
        "Major 7th",
        "Octave"
    ],

    MinorPentatonic =[
        "Minor 3rd",
        "Perfect 4th",
        "Perfect 5th",
        "Minor 7th",
        "Octave"
    ],

    MajorPentatonic =[
        "Major 2nd",
        "Major 3rd",
        "Perfect 5th",
        "Major 6th",
        "Octave"
    ],

    MajorTriad = [
        "Major 3rd",
        "Perfect 5th",
        "Octave"
    ],

    Major7th = [
        "Major 3rd",
        "Perfect 5th",
        "Major 7th",
        "Octave"
    ],

    Dominant7th = [
        "Major 3rd",
        "Perfect 5th",
        "Minor 7th",
        "Octave"
    ],

    Mixolydian =[
        "Major 2nd",
        "Major 3rd",
        "Perfect 4th",
        "Perfect 5th",
        "Major 6th",
        "Minor 7th",
        "Octave"
    ]
];

var SELECTED_SCALE_LIST = SCALE_LIST[selectedScale];

var SCALE_NAME = NOTES[ROOT_NOTE[0]][ROOT_NOTE[1]] + " " + SCALE_NAMES[selectedScale];

var INTERVAL_DIFFERENCE = {
    "Minor 2nd": [0,1],
    "Major 2nd": [0,2],
    "Minor 3rd": [0, 3],
    "Major 3rd": [-1,-1],
    "Perfect 4th": [-1,0],
    "Tritone": [-1,1],
    "Perfect 5th": [-1,2],
    //"minor 6th": "", //UNUSED
    "Major 6th": [-2,-1],
    "Minor 7th": [-2,0],
    "Major 7th": [-2,1],
    "Octave": [-2,2],
};

var INTERVAL_DIFFERENCE_KEYS = Object.keys(INTERVAL_DIFFERENCE);
