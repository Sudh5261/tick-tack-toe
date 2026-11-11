let boxes = document.querySelectorAll(".box");
let body = document.querySelector("body");
let resetBtn = document.querySelector("#reset-game");
let turn0 = true;
let newGameButton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
let mode = document.querySelector(".mode");
let modebtn=document.querySelector("#mode")
let currMode = "dark";

mode.addEventListener("click", () => {
    if (currMode === "dark") {
        currMode = "light";
        body.classList.add("light-mode-body");
        boxes.forEach((box) => box.classList.add("light-mode-boxes"));
        msg.classList.add("light-mode-msg");
        modebtn.classList.add("mode-light-mode");

    } else {
        currMode = "dark";
        body.classList.remove("light-mode-body");
        boxes.forEach((box) => box.classList.remove("light-mode-boxes"));
        msg.classList.remove("light-mode-msg");
        modebtn.classList.remove("mode-light-mode");
    }
});

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBtnsAndBoxEmpty();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0 === true) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        console.log(count);
        checkWinner();
    });
});

const enableBtnsAndBoxEmpty = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBtns = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, The winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
};

const showDraw = () => {
    msg.innerText = `The game is a draw! No one won.`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    let isWinner = false;
    for (let patterns of winPatterns) {
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                isWinner = true;
                return; // Return early so draw check isn't falsely triggered
            }
        }
    }

    if (count === 9 && !isWinner) {
        showDraw();
    }
};

newGameButton.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);