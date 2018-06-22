$(document).ready(function() {
    var winCounter, lossesCounter, unansweredCounter = 0;
    var index = 0;  // index for the array q
    var count = 0;  // after answering 10 questions, end the game
    var correct, timeOut = false;
    var timeMsg = "";
    var number = 30;
    var intervalId;
    var path = "assets/images/";
    var q = 
        [
            {
                question: "What type of animal is a seahorse?",
                answers: ["Crustacean", "Arachnid", "Fish", "Shell"],
                correctAnswer: "Crustacean",
                image: path + "seahorse.gif"
            },
            {
                question: "Which of the following dogs is the smallest?",
                answers: ["Dachshund", "Poodle", "Pomeranian", "Chihuahua"],
                correctAnswer: "Chihuahua",
                image: path + "chihuahua.gif"
            },
            {
                question: "What color are zebras?",
                answers: ["White with black stripes.", "Black with white stripes.", "Both of the above.", "None of the above."],
                correctAnswer: "Black with white stripes.",
                image: path + "zebra.gif"
            },
            {
                question: "What existing bird has the largest wingspan?",
                answers: ["Stork", "Swan", "Condor", "Albatross"],
                correctAnswer: "Albatross",
                image: path + "albatross.gif"
            },
            {
                question: "What is the biggest animal that has ever lived?",
                answers: ["Blue whale", "African elephant", "Apatosaurus (aka brontosaurus)", "Spinosaurus"],
                correctAnswer: "Blue whale",
                image: path + "blue-whale.gif"
            },
            {
                question: "What pets do more families own?",
                answers: ["Birds", "Cats", "Dogs", "Horses"],
                correctAnswer: "Dogs",
                image: path + "dog.gif"
            },
            {
                question: "What animal lives the longest?",
                answers: ["Ocean quahog (clam)", "Red sea urchin", "Galapagos tortois", "Rougheye rockfish"],
                correctAnswer: "Ocean quahog (clam)",
                image: path + "quahog-clams.gif"
            },
            {
                question: "What are female elephants called?",
                answers: ["Mares", "Sows", "Cows", "Dams"],
                correctAnswer: "Cows",
                image: path + "cow.gif"
            },
            {
                question: "Which of the following animals sleep standing up?",
                answers: ["Gorillas", "Flamingos", "Camels", "Ravens"],
                correctAnswer: "Flamingos",
                image: path + "flamingos.gif"
            },
            {
                question: "What is the fastest water animal?",
                answers: ["Porpoise", "Sailfish", "Flying fish", "Tuna"],
                correctAnswer: "Sailfish",
                image: path + "sailfish.gif"
            }
        ];

    function decrement() {
        number--;
        timeMsg = "Time Remaining: " + number + " " + "Seconds";
        $(".timer").text(timeMsg);
        if (number === 0) {
            unansweredCounter++;
            timeOut = true;
            clearInterval(intervalId);
            revealAnswer(timeOut);
        }
        $(document).click(function(event) {
            resetTimer();
        });
    }

    function resetTimer() {
        number = 30
        timeMsg = "Time Remaining: " + number + " Seconds";
        $(".timer").text(timeMsg);
    }

    function reset() {
        winCounter = 0;
        lossesCounter = 0;
        unansweredCounter = 0;
        count = 0;
    }

    function emptyDiv() {
        $(".question, .answer, .choices, .reveal").empty();
    }

    function start() {
        reset();
        $(".timer, .question, .choices").empty();
        $(".choices").append("<div class='start'>Start</div>");
        $(".start").on("click", initialize);
    }
    
    function restart() {
        reset();
        initialize();
    }
    function initialize() {
        count++;
        if (count === 11) {
            scorePage();
        } else { 
            number = 30;
            index = randomNum(0, 9);
            timeMsg = "Time Remaining: " + number + " " + "Seconds";
            $(".timer").text(timeMsg);
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
            emptyDiv();
            displayQuestion();
        }
    }

    function displayQuestion() {
        $(".question").html(q[index].question);
        multipleChoice();
    }

    function randomNum(min, max) {
        var random = Math.floor(Math.random() * (max + 1));
        while (index === random) {
            random = Math.floor(Math.random() * (max + 1));
        }
        return random;
    }

    function multipleChoice() {
        for (var i = 0; i < 4; i++) {
            var a = $("<div>");
            a.addClass("answer");
            a.attr("data-answer", q[index].answers[i]);
            a.text(q[index].answers[i]);
            $(".choices").append(a);
        }
    }

    function pickAnswer() {
        var bingo = q[index].correctAnswer;
        var yourAnswer = $(this).data('answer');

        if (yourAnswer === bingo) {
            winCounter++;
            correct = true;
        } else {
            lossesCounter++;
            correct = false;
        }
        revealAnswer();
    }

    function revealAnswer() {
        emptyDiv();
        clearInterval(intervalId);
        resetTimer();

        var msg = '';
        var ans = '';

        $(".choices").append("<div class='reveal'>");
        $(".reveal").append("<div class='ans'>");
        $(".reveal").append("<div class='no'>");

        if (timeOut) {
            msg = "Time Out!";
            timeOut = false;
            $(".no").text("The correct answer is: " + q[index].correctAnswer);
        } else {
            if (!correct) {
                msg = 'Nope!';
                $(".no").text("The correct answer is: " + q[index].correctAnswer); 
            } else {
                msg = "Correct!";
            }
        }
        $(".ans").text(msg);
        var image = randomNum(0, 22);
        $(".reveal").append("<div class='funny-gif'>");
        $(".funny-gif").append("<img id='theImg' src=" + q[index].image + ">");
        $("#theImg").css({ height: "200px", width: "200px" });
        window.setTimeout(initialize, 6000);
    }

    function scorePage() {
        emptyDiv();
        resetTimer();
        $(".question").append("<div class='result'>All done, here's how you did!</div>");
        $(".result").append("<div class='correct score'>Correct Answers: " + winCounter + "</div>");
        $(".result").append("<div class='incorrect score'>Incorrect Answers: " + lossesCounter + "</div>");
        $(".result").append("<div class='unanswered score'>Unanswers: " + unansweredCounter + "</div>");
        $(".choices").append("<div class='restart'>Start Over?</div>");
        $(".restart").on("click", restart);
    }

    start();
    $(document).on("click", ".answer", pickAnswer);
})
