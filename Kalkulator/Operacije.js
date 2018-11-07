
let onScreen = [];
let nums = [];
let result = 0;

function show(num) {
  //  vnos stevilke max 10 vnosov dolg
  if (onScreen.length === 10) {
    $('#screen').val(onScreen.join(''));
  }
  if (onScreen.length === 0 && num === '0') {
    $('#screen').val(0);
  } else {
    onScreen.push(num);
    $('#screen').val(onScreen.join(''));
  }
}

function calculate(operator) {
  // shrani vse stevilke in operatorje 
  switch (operator) {
    case "plus":
      operator = "+";
      break;
    case "minus":
      operator = "-";
      break;
    case "krat":
      operator = "*";
      break;
    case "deljeno":
      operator = "/";
      break;
    case "okl1":
      operator = "(";
      break;
    case "okl2":
      operator = ")";
      break;
  }

  if (onScreen.length > 0) {
    onScreen = onScreen.join(''); 
  }

  // when pressing sign after sign
  if (operator !== "equals" && typeof nums[nums.length-1] === 'string' && typeof onScreen === 'number') {
    nums.pop();
    nums.push(operator);
  } else if (operator !== "equals" && nums.length >= 0 && onScreen.length > 0) {
    $('#screen').val(onScreen);
    nums.push(parseFloat(onScreen), operator)
    onScreen = [];
  }

  // rezultat operacije
  if (operator === "equals") {
    if (onScreen.length > 0) {
      nums.push(parseFloat(onScreen))
    }
    if (typeof nums[nums.length-1] === 'string') {
      nums.pop();
    }
    result = nums[0];
    nums.forEach(function(number, i) {
      if (number === "+") {
        result += nums[i+1];
      }
      if (number === "-") {
        result -= nums[i+1];
      }
      if (number === "*") {
        result *= nums[i+1];
      }
      if (number === "/") {
        result /= nums[i+1];
      }
    })
    $('#screen').val(result);
    lastOperation = [nums[nums.length-2], nums[nums.length-1]];
    onScreen = [result];
    result = 0;

    //prikaze 0 v primeru nobenega vnosa
    if (nums.length === 0) {
      $('#screen').val(result);
      onScreen = []
    }
    nums = []; // iznici display
  }

}

function addComma() {
  if (onScreen.length === 0) {
    onScreen.push(0, ".");
    $('#screen').val(onScreen.join(''));
  } else if (onScreen.join('').indexOf(".") === -1) {
    onScreen.push(".");
    $('#screen').val(onScreen.join(''));
  } else if (onScreen[0].toString().indexOf(".") > 0) {
    $('#screen').val(onScreen.join(''));
  }
}

function erase() {
  $('#screen').val(0);
  onScreen = [];
  nums = [];
  total = 0;
}
