function selectUserOption(move) {
    let randomAiMove = Math.floor(Math.random() * 3 + 1);
    // Results: [-2, -1, 0, 1] = [Error, AI Win, Tie, User Win]
    let turnResult = rpsLogic(move, randomAiMove);

    toggleUserInput(true);
    setMoves(randomAiMove, move);
    setTimeout(() => {
        setMoves(randomAiMove, move);
        toggleUserInput(false);
    }, 1500);
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