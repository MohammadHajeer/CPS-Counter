let counter = document.querySelector(".counter");
let counterFinishState = document.querySelector(".finish");
let cpsMath = document.querySelector(".finish p span");
let cpsText = document.querySelector(".finish h2");

let startAndCountingButton = document.querySelector(".counter .start");
let cpsBox = document.querySelector(".counter .cps");
let countCps = document.querySelector(".counter .cps .count");
let seconds = 5;
let buttons = document.querySelectorAll("ul li");

let mediaQuery = window.matchMedia("(max-width: 767px)");

//Lock the CPS Box
cpsBox.style.pointerEvents = "none";

buttons.forEach((button) => {
  button.onclick = () => {
    buttons.forEach((button) => button.classList.remove("active"));
    button.classList.add("active");
    seconds = +button.innerHTML
      .split("")
      .filter((n) => !isNaN(n))
      .join("");
  };
});

startAndCountingButton.onclick = () => {
  //Return font size to normal
  countCps.style.fontSize = "3rem";
  //Return cps value to 0
  countCps.innerHTML = 0;
  //Unlock the CPS Box
  cpsBox.style.pointerEvents = "all";
  //Lock the buttons
  buttons.forEach((button) => (button.style.pointerEvents = "none"));
  let i = seconds;
  startAndCountingButton.style.pointerEvents = "none";
  let handler = setInterval((e) => {
    if (i === 0) {
      //Lock the CPS Box
      cpsBox.style.pointerEvents = "none";
      //unlock the buttons
      buttons.forEach((button) => (button.style.pointerEvents = "all"));
      //return to original form
      startAndCountingButton.innerHTML = "Start";
      startAndCountingButton.style.pointerEvents = "all";
      //Calculate CPS
      calculateCPS();
      //Finish State
      finish();
      clearInterval(handler);
      //Return to the chosen value
      i = seconds;
    } else {
      startAndCountingButton.innerHTML = i--;
    }
  }, 1000);
};
console.log(mediaQuery);
function finish() {
  counterFinishState.classList.add("done");

  if (mediaQuery.matches) {
    counter.style.transform = "rotateX(360deg)";
  } else {
    counter.style.transform = "rotate(360deg)";
  }

  setTimeout((e) => {
    counter.style.transform = "rotate(0deg)";
    counterFinishState.classList.remove("done");
  }, 3000);
}

cpsBox.onclick = () => {
  countCps.innerHTML++;

  if (countCps.innerHTML % 10 === 0) {
    countCps.style.color = "#2196f3";
    if (mediaQuery.matches) {
      countCps.style.fontSize = "2rem";
    } else {
      countCps.style.fontSize = "5rem";
    }
    setTimeout((e) => {
      countCps.style.fontSize = "3rem";
      countCps.style.color = "rgba(255, 255, 255, 0.421)";
    }, 300);
  }

  let ripple = document.createElement("span");
  ripple.classList.add("ripple");

  ripple.style.backgroundColor = `rgba(33, 149, 243, 0.368)`;
  cpsBox.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 500);
};

function calculateCPS() {
  let cps = (+countCps.innerHTML / seconds).toFixed(2);
  cpsMath.innerHTML = cps;

  if (cps < 5) {
    cpsText.innerHTML = "Slow like a turtle, try again!!";
  } else if (cps >= 5 && cps < 7) {
    cpsText.innerHTML = "Not Bad, good job!!";
  } else {
    cpsText.innerHTML = "Amazing!!";
  }
}

window.onload = () => {
  let div = document.createElement("div");
  div.className = "loading";
  document.body.appendChild(div);
  counter.style.filter = "blur(70px) brightness(0)";
  setTimeout((e) => {
    counter.style.filter = "blur(0px) brightness(100%)";
    div.remove();
  }, 2000);
};
