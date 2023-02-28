// global variable indicating who's turn it is.
let playerXisPlaying = true;

// helper variables
const announcementCell = document.getElementById("announcement");
const modalBody = document.getElementById("modalBody");
const modalTitle = document.querySelector("p.modal-title");

// For each cell in the Tic-Tac-To grid...
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {

  // Add an event listener, to respond to each play...
  cell.addEventListener("click", () => {

    // If this cell is not already full...
    if (!cell.classList.contains("X") && !cell.classList.contains("O")) {

      // Add class X or class O to the cell to identify it's content, 
      // replace the blank image with a X or O image,
      // and update the announcement alert to show whose turn it is.
      if (playerXisPlaying) {
        cell.classList.add("X");
        cell.innerHTML = "<img src='images/x.png' class='img-fluid'/>";
        announcementCell.innerHTML = "It is currently O's turn.";

      } else {
        cell.classList.add("O");
        cell.innerHTML = "<img src='images/o.png' class='img-fluid'/>";
        announcementCell.innerHTML = "It is currently X's turn.";
      }

      // If there is a winner, update the announcement alert,
      // update the content of the modal and display it.
      if (thereIsAWinner(playerXisPlaying)) {
        announcementCell.innerHTML = "Let's play again!";
        modalBody.innerHTML = (playerXisPlaying ? "X" : "O") + " is the winner!";
        modalTitle.innerHTML = "Congratulations!";
        myModal.show();

      // If it's a draw (there are no blank images on the page),
      // update the announcement alert,
      // update the content of the modal and display it.
      } else if (document.querySelectorAll(".empty").length === 0) {
        announcementCell.innerHTML = "Let's play again!";
        modalBody.innerHTML = "It's a draw!";
        modalTitle.innerHTML = "Well now!";
        myModal.show();
      }

      // Toggle the global variable 
      // indicating who's turn it is.
      playerXisPlaying = !playerXisPlaying;
    }
  });
});

// Determine if the game is over.
function thereIsAWinner(playerXisPlaying) {

  // Get the cell class name for the player who played last.
  let playerClass = playerXisPlaying ? "X" : "O";

  // Get three arrays holding the cells for each row.
  let row1 = document.querySelectorAll(".row1");
  let row2 = document.querySelectorAll(".row2");
  let row3 = document.querySelectorAll(".row3");

  // If every cell of any row has class playerClass
  // we have a winner.
  if (
    (row1[0].classList.contains(playerClass) &&
      row1[1].classList.contains(playerClass) &&
      row1[2].classList.contains(playerClass)) ||
    (row2[0].classList.contains(playerClass) &&
      row2[1].classList.contains(playerClass) &&
      row2[2].classList.contains(playerClass)) ||
    (row3[0].classList.contains(playerClass) &&
      row3[1].classList.contains(playerClass) &&
      row3[2].classList.contains(playerClass))
  )
    return true;

  // If every cell of any column has class playerClass
  // we have a winner.
  if (
    (row1[0].classList.contains(playerClass) &&
      row2[0].classList.contains(playerClass) &&
      row3[0].classList.contains(playerClass)) ||
    (row1[1].classList.contains(playerClass) &&
      row2[1].classList.contains(playerClass) &&
      row3[1].classList.contains(playerClass)) ||
    (row1[2].classList.contains(playerClass) &&
      row2[2].classList.contains(playerClass) &&
      row3[2].classList.contains(playerClass))
  )
    return true;

  // If the cells corresponding to the diagonals 
  // have class playerClass, we have a winner.
  if (
    (row1[0].classList.contains(playerClass) &&
      row2[1].classList.contains(playerClass) &&
      row3[2].classList.contains(playerClass)) ||
    (row1[2].classList.contains(playerClass) &&
      row2[1].classList.contains(playerClass) &&
      row3[0].classList.contains(playerClass))
  )
    return true;

  // If we get this far, there was no winner found.
  return false;
}

// Create our Modal dialog object.
let myModal = new bootstrap.Modal(document.getElementById("banner"), {
  keyboard: true,
});
