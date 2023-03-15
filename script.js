const showPassword = document.querySelector("#showPassword");
const range = document.querySelector("#range");
let rangeValue = 10;
range.addEventListener("input", () => {
  rangeValue = range.value;
  document.querySelector("#range-value").innerText = rangeValue;
});

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomNumber() {
  return generateRandom(0, 9);
}

function generateRandomUppercase() {
  let random = generateRandom(65, 90);
  return String.fromCharCode(random);
}

function generateRandomLowercase() {
  let random = generateRandom(97, 122);
  return String.fromCharCode(random);
}

function generateRandomSymbol() {
  let symbols = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "[", "]"];
  let random = generateRandom(0, symbols.length - 1);
  return symbols[random];
}

let randArray = [generateRandomUppercase];

let upperCase = document.querySelector("#uppercase");
upperCase.addEventListener("change", () => {
  if (upperCase.checked) {
    randArray.push(generateRandomUppercase);
  } else {
    randArray.splice(randArray.indexOf(generateRandomUppercase), 1);
  }
});

let lowerCase = document.querySelector("#lowercase");
lowerCase.addEventListener("change", () => {
  if (lowerCase.checked) {
    randArray.push(generateRandomLowercase);
  } else {
    randArray.splice(randArray.indexOf(generateRandomLowercase), 1);
  }
});

let number = document.querySelector("#number");
number.addEventListener("change", () => {
  if (number.checked) {
    randArray.push(generateRandomNumber);
  } else {
    randArray.splice(randArray.indexOf(generateRandomNumber), 1);
  }
});

let symbols = document.querySelector("#symbol");
symbols.addEventListener("change", () => {
  if (symbols.checked) {
    randArray.push(generateRandomSymbol);
  } else {
    randArray.splice(randArray.indexOf(generateRandomSymbol), 1);
  }
});

function generateRandomPassword() {
  let randPass = "";
  if (randArray.length == 0) {
    alert("Please Check Atleast One Checkbox");
    return;
  }

  for (let i = 0; i < rangeValue; i++) {
    let random = generateRandom(0, randArray.length - 1);
    let randomType = randArray[random]();
    randPass = randPass + randomType;
  }
  showPassword.value = randPass;
}

let generateBtn = document.querySelector("#generate-btn");
generateBtn.addEventListener("click", () => {
  generateRandomPassword();
});

async function copyPassword() {
  let password = showPassword.value;
  if (password == "") {
    alert("Nothing To Copy. Generate Password First");
    return;
  }
  try {
    await navigator.clipboard.writeText(password);
    document.querySelector("#copyMsg").style.display = "block";
    setTimeout(() => {
      document.querySelector("#copyMsg").style.display = "none";
    }, 2000);
  } catch (err) {
    document.querySelector("#copyMsg").innerText = "Error! Can't Copy"
    setTimeout(() => {
      document.querySelector("#copyMsg").innerText = "";
    }, 2000);
  }
}
