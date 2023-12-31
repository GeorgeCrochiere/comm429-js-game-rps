initSessionStorage();

function selectUserOption(move) {
    let randomAiMove = Math.floor(Math.random() * 3 + 1);

    toggleUserInput(true);
    setMoves(randomAiMove, move);
    updateMoveResult(move, randomAiMove, 0);
    setTimeout(() => {
        setMoves(randomAiMove, move);
    }, 1500);
    setTimeout(() => {
        toggleUserInput(false);
        updateMoveResult(move, randomAiMove, 1);
    }, 1800);
}

function toggleUserInput(status) {
    let userButtons = document.getElementsByClassName('userOption');
    for (let i = 0; i < userButtons.length; i++) {
        userButtons[i].disabled = status;
    }
}

function setMoves(aiMove, userMove) {
    userElem = document.getElementById('user' + userMove.toString());
    aiElem = document.getElementById('ai' + aiMove.toString());

    switch (userMove) {
        case 1:
            userElem.classList.toggle('selectedButtonRock');
            break;
        case 2:
            userElem.classList.toggle('selectedButtonPaper');
            break;
        case 3:
            userElem.classList.toggle('selectedButtonScissors');
            break;
        default:
            break;
    }

    switch (aiMove) {
        case 1:
            aiElem.classList.toggle('selectedButtonRock');
            break;
        case 2:
            aiElem.classList.toggle('selectedButtonPaper');
            break;
        case 3:
            aiElem.classList.toggle('selectedButtonScissors');
            break;
        default:
            break;
    }
}

function rpsLogic(userMove, aiMove) {
    // [1, 2, 3] = [Rock, Paper, Scissors]
    // Return values: [-1, 0, 1] = [AI, Tie, User]
    switch (userMove) {
        case 1:
            if (aiMove === 1) {
                return 0;
            } else if (aiMove === 2) {
                return -1;
            } else {
                return 1;
            }

        case 2:
            if (aiMove === 1) {
                return 1;
            } else if (aiMove === 2) {
                return 0;
            } else {
                return -1;
            }

        case 3:
            if (aiMove === 1) {
                return -1;
            } else if (aiMove === 2) {
                return 1;
            } else {
                return 0;
            }
        default:
            console.log("Error: Invalid option found");
            return -2;
    }
}

function updateMoveResult(userMove, aiMove, stage) {
    // Results: [-2, -1, 0, 1] = [Error, AI Win, Tie, User Win]
    let turnResult = rpsLogic(userMove, aiMove);

    if (stage === 0) {
        let userText = document.getElementById('userChoice');
        let aiText = document.getElementById('aiChoice');
        let resultText = document.getElementById('logicResult');

        let items = ["Rock", "Paper", "Scissors"];
        let resultItems = [" does not beat ", " ties with ", " beats "];

        userText.innerText = items[userMove - 1];
        aiText.innerText = items[aiMove - 1].toLowerCase() + "! Play again!";
        resultText.innerHTML = resultItems[turnResult + 1];

        let scorePrefix = ["ai", "tie", "user"];
        let scoreAddition = document.getElementById(scorePrefix[turnResult + 1] + "Score");

        scoreAddition.innerHTML = parseInt(scoreAddition.innerHTML) + 1;
        scoreAddition.classList.toggle("dataChange");
        updateStorage(scorePrefix[turnResult + 1]);
    } else {
        let scorePrefix = ["ai", "tie", "user"];
        let scoreAddition = document.getElementById(scorePrefix[turnResult + 1] + "Score");
        scoreAddition.classList.toggle("dataChange");
    }

}

function initSessionStorage() {
    // Load/Get data
    let aiStore = sessionStorage.getItem("ai");
    if (aiStore === null) {
        sessionStorage.setItem("ai", 0);
        aiStore = sessionStorage.getItem("ai");
    }

    let userStore = sessionStorage.getItem("user");
    if (userStore === null) {
        sessionStorage.setItem("user", 0);
        userStore = sessionStorage.getItem("user");
    }

    let tieStore = sessionStorage.getItem("tie");
    if (tieStore === null) {
        sessionStorage.setItem("tie", 0);
        tieStore = sessionStorage.getItem("tie");
    }

    // Set initial
    document.getElementById("aiScore").innerHTML = parseInt(aiStore);
    document.getElementById("userScore").innerHTML = parseInt(userStore);
    document.getElementById("tieScore").innerHTML = parseInt(tieStore);
}

function updateStorage(storage) {
    sessionStorage.setItem(storage, parseInt(sessionStorage.getItem(storage)) + 1);
}

function reset() {
    sessionStorage.setItem("tie", 0);
    sessionStorage.setItem("ai", 0);
    sessionStorage.setItem("user", 0);
    document.getElementById("userChoice").innerText = "";
    document.getElementById("logicResult").innerText = "Play!";
    document.getElementById("aiChoice").innerText = "";
    initSessionStorage();
}