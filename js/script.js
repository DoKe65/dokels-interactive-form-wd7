// set autocomplete to off to be able to see the hints

const fields = document.querySelectorAll("input");
for (let i = 0; i < fields.length; i++) {
  fields[i].setAttribute("autocomplete", "off");
}

// ******************
// User Info Section
// ******************

// Variables for the user info Section
const nameField = document.getElementById("name");
const selectJobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");

// Set the first input field "Name" into active focus state when page loads
nameField.focus();

// Hide the "Other job role" field until a user choses "Other" in "job role"
otherJobRole.style.display = "none";

// Display "Other job role" field when a user choses "Other" in "job role"
selectJobRole.addEventListener("change", () => {
  const selectedJobRole = selectJobRole.options[selectJobRole.selectedIndex].value;

  if(selectedJobRole === "other") {
    otherJobRole.style.display = "inline-block";
  } else {
    otherJobRole.style.display = "none";
  }
});

// **************************
// T-Shirt Selection Section
// **************************

// Variables for the T-Shirt Section
const designs = document.getElementById("design");
const colorSelect = document.getElementById("color");

// disable the color choser for t-shirts as long the design isn't chosen
colorSelect.disabled = true;

// Enables the color choser with options depending on the chosen design
designs.addEventListener("change", () => {
  // stores the value of the selected design
  const selectedDesign = designs.options[designs.selectedIndex].value;
  // stores all color options
  const colors = colorSelect.options;
  // enables the colorSelect
  colorSelect.disabled = false;
  colorSelect.selectedIndex = 0;

  // loop through the colors to test if their data-theme matches the value of the chosen design
  // if it doesn't match, set it's this display property to none, otherwise to block
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    if (selectedDesign !== color.getAttribute("data-theme")) {
      color.style.display = "none";
      // color.setAttribute("hidden", true);
    } else {
      color.style.display = "block";
      // color.setAttribute("hidden", false);
    }
  }
});

// ********************************
// Activities Registration Section
// ********************************

// variables for the Activities section
const activities = document.querySelector("#activities-box");
const totalCosts = document.querySelector("#activities-cost");
const allActivities = activities.getElementsByTagName("label");
const activityHint = document.querySelector("#activities-hint");

// variable keeping track of costs
let total = 0;

/**
 * 'costs' function
 * @param {element} activity - checked item (activity) inside activities section
 * @returns {number} - total of all chosen (checked) activities
 * Updates variable 'total' for chosen activities
 */
const costs = (activity) => {
  const cost = activity.getAttribute("data-cost");
  // add the cost of the checked activity to the total
  if (activity.checked) {
    total += parseInt(cost);
  // deduce cost of activity when it's unchecked
  } else if (activity.checked === false) {
    total -= parseInt(cost);
  }
  return cost;
}

/**
 * 'checkConflicts' function
 * @param {element} activity - checked item (activity) inside activities section
 * checks for timeoverlaps and deactivates conflicting activities
 */
const checkConflicts = (activity) => {
  // variables storing the name and the time and date of the chosen activity
  const activityName = activity.getAttribute("name");
  const dayTime = activity.getAttribute("data-day-and-time")
  // check all other activities for timelaps with chosen activity, without the main conference
  for(let i = 1; i < allActivities.length; i++) {
    // store all necessary values of the current activity in the array of activities
    const currItem = allActivities[i].children[0];
    const currItemName = currItem.getAttribute("name");
    const currItemDayTime = currItem.getAttribute("data-day-and-time");
    // add hint and visuals to indicate why the activity was disabled
    const currItemParent = currItem.parentElement;
    const currItemSibling = currItem.nextElementSibling;
    const hint = document.createElement("span");
    hint.style.fontSize = "0.8rem";
    hint.style.marginTop = "8px";
    hint.style.color = "red";

    // compares day and time of chosen activity with current activity in the array of activities
    if (currItemDayTime === dayTime ) {
      // Make sure to not test the chosen activity with itself
      if (currItemName !== activityName) {
        // if there's a time overlap, disable the current array item and add the hint
        if (!activity.checked && currItemDayTime === dayTime) {
          currItem.disabled = false;
          currItemParent.style.backgroundColor = "#fffdf9";
          currItemParent.style.color = "#000000bf";
          currItemSibling.style.color = "#000000bf";
          if (hint) {
            currItemParent.children[2].remove();
          }
        // make sure to remove the disabled state and hints when chosen activity is unchecked
        } else {
          currItem.disabled = true;
          currItemParent.style.backgroundColor = "#f5f3f3";
          currItemParent.style.color = "#b6b4b4";
          currItemSibling.style.color = "#b6b4b4";
          const activityDisplayName = activity.nextElementSibling.textContent;
          hint.innerHTML = `Time conflict with ${activityDisplayName}`;
          currItemParent.insertBefore(hint, currItem.parentElement.children[2]);
        }
      }
    }
  }
}

// calls the costs and checkConflicts functions when checking an activity
activities.addEventListener("click", e => {
  costs(e.target);
  checkConflicts(e.target);
  if (total > 1) {
    activities.classList.add("valid");
    activities.classList.remove("not-valid");
    activityHint.style.display = "none";
  } else {
    activities.classList.add("not-valid");
    activities.classList.remove("valid");
    activityHint.style.display = "block";
  }
  // Print out the current cost of activities
  totalCosts.innerHTML = `Total: \$${total}`;
});

// ********************************
// Payment Info Section
// ********************************

// variables for the payment info section
const paymentInfo = document.querySelector(".payment-methods");
const paymentInfoDivs = Array.from(paymentInfo.children).slice(2);
const paymentSelector = document.querySelector("#payment");
const paymentOptions = paymentSelector.options;

// set payment per creditcard as default payment value
for (let i = 0; i < paymentOptions.length; i++) {
  if (paymentOptions[i].value === "credit-card") {
    paymentOptions[i].setAttribute("selected", true);
  }
}
// hide payment infos for paypal and bitcoin
for (let info of paymentInfoDivs) {
  if (info.className !== "credit-card") {
    info.style.display = "none";
  } else {
    info.style.display = "block";
  }
}

// display payment info section for selected payment method
paymentSelector.addEventListener("change", () => {
  const selectedPayment = paymentSelector.options[paymentSelector.selectedIndex].value;
  for (let info of paymentInfoDivs) {
    if (selectedPayment !== info.className) {
      info.style.display = "none";
    } else {
      info.style.display = "block";
    }
  }
});

// ********************************
// Form Validation
// ********************************

// Variables for form validation
const form = document.querySelector("form");
// - nameField, already declared in line 6

// const submitBtn = document.querySelector("button[type='submit']");
const nameHint = document.querySelector("#name-hint");
const emailField = document.querySelector("#email");
const emailHint = document.querySelector("#email-hint");
// const acitivites already declared
// const activityHint already declared
// - creditcard, needed to test corresponding fields, was already declared
const ccDate = document.querySelector("#exp-month");
const ccYear = document.querySelector("#exp-year");
const ccNum = document.querySelector("#cc-num");
const ccNumHint = document.querySelector("#cc-hint");
const zipCode = document.querySelector("#zip");
const zipCodeHint = document.querySelector("#zip-hint");
const cvv = document.querySelector("#cvv");
const cvvHint = document.querySelector("#cvv-hint");

/**
 * 'testUsername'  function
 * @param {string} username - string that has to pass the regex test
 * @returns testresult (false or true)
 * helper function, tests for username validity and adds a corresponding hint
 */
const testUsername = (username) => {
  const chars = /^.{2,}$/.test(username);
  if (username === "") {
    nameHint.innerHTML = "Name field cannot be blank";
  } else if(!chars) {
    nameHint.innerHTML = "Please enter at least 2 characters";
  } else {
    return true;
  }
}
/**
 * 'testUsername'  function
 * @param {string} email - string that has to pass the regex test
 * @returns testresult (false or true)
 * helper function, tests for email validity and adds a corresponding hint
 */
const testEmail = (email) => {
  const at = /^.+@/.test(email);
  const domain = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  if (email === "") {
    emailHint.innerHTML = "Email field cannot be blank";
  } else if (!at) {
    emailHint.innerHTML = 'Seems that the "@" is missing';
  } else if (!domain) {
    emailHint.innerHTML = "Please check the domain you used.";
  } else {
    return true;
  }
}

// helper function that tests for activities in form validation
const testActivity = () => total > 0;

/**
 * 'setToInvalid` helper function
 * @param {element} field - sets the field's parent to invalid
 */
function setToInvalid(field) {
  field.parentElement.classList.add("not-valid");
  field.parentElement.classList.remove("valid");
}

/**
 * 'setToValid` helper function
 * @param {element} field - sets the field's parent to valid
 */
function setToValid(field) {
  field.parentElement.classList.add("valid");
  field.parentElement.classList.remove("not-valid");
}

/**
 * 'fieldTester' function
 * @param {target} e
 * @param {function} tester - tester function
 * @param {element} field - form field
 * @param {element} hint - hint of the form field
 * helper functions that tests the basic infos and activity fields validity
 */
function fieldTester(e, tester, field, hint) {
  // things to do if tester returns false, depending on field to test
  if (!tester(field.value) || !tester) {
    e.preventDefault();
    hint.style.display = "block";
    if (field === nameField || field === emailField) {
      setToInvalid(field);
    } else if (tester === testActivity) {
      activities.classList.add("not-valid");
      activities.classList.remove("valid");
    }
  } else {
    // removes the hint if test changes from false to true
    if (hint.style.display = "block") {
      hint.style.display = "none";
    }
    // sets the field's parent to valid if test changes from false to true
    if (field === nameField || field === emailField) {
      setToValid(field);
    } else if (tester === testActivity) {
      activities.classList.add("valid");
      activities.classList.remove("not-valid");
    }
  }
}

/**
 * 'isNotNumber' function
 * @param {element} field - field to test
 * @returns true, if there are non-digits
 * helper function testing for non-digits
 */
const isNotNumber = (field) => {
  const val = field.value;
  const regex = new RegExp("[^0-9]+");
  return regex.test(val);
}

/**
 * 'ccNotNums' function
 * @param {element} field - field to test
 * @param {element} hint - the field's hint
 * @param {num} min - minimum of digits to enter
 * @param {num} max - maximum of digits to enter
 * realtime test if entries in cc fields are not numbers and adjusts the hint text
 */
function ccNotNums (field, hint, min, max) {
  let valLength = field.value.length;
  let origMsg = "";
  // sets back the hint message depending on the field
  if (field === ccNum) {
    origMsg = "Credit card number must be between 13 - 16 digits";
  } else if (field === zipCode) {
    origMsg = "Zip code must be 5 digits";
  } else {
    origMsg = "CVV must be 3 digits";
  }
  // make sure to run this special block only as long as the maximum of characters is not entred
  if (valLength <= max) {
    // shows hint when non digital characters where entred
    if (isNotNumber(field)) {
      hint.textContent = "Only numbers are allowed";
      hint.style.display = "block";
      setToInvalid(field);
    // make sure to not display hint as long the max is not reached
    } else {
      hint.textContent = origMsg;
      hint.style.display = "none";
      // if field's parent was marked true or false, remove when deleting chars
      if (valLength < min) {
        field.parentElement.classList.remove("not-valid");
        field.parentElement.classList.remove("valid");
      // set field to valid if number of digits is reached
      } else if (valLength >= min && valLength <= max) {
        setToValid(field);
      }
    }
  // set field's parent to invalid and show hint when to much digits are entred
  } else if (valLength > max) {
    hint.textContent = origMsg;
    hint.style.display = "block";
    setToInvalid(field);
  }
}

// tests for digits while the user types
ccNum.addEventListener("keyup", (e) => {
  ccNotNums(ccNum, ccNumHint, 13, 16);
});

zipCode.addEventListener("keyup", (e) => {
  ccNotNums(zipCode, zipCodeHint, 5, 5);
});

cvv.addEventListener("keyup", (e) => {
  ccNotNums(cvv, cvvHint, 3, 3);
});

/**
 * 'testCCfields' function
 * @param {element} field - field to test
 * @param {*} range - min/max numbers to enter
 * @returns result, false or true
 * helper function for validity testing
 */
const testCCfields = (field, range) => {
  const val = field.value;
  const regex = new RegExp("^[1-9]{" + range + "}$");
  return regex.test(val);
}

/**
 * 'ccFinal' function
 * @param {target} e - event target
 * @param {element} field - field to test
 * @param {element} hint - the field's hint
 * helper function, tests for cc validities on blur and form submit
 */
function ccFinal(e, field, hint) {
  // runs the tester functions and changes the value of the verification variable correspondingly
  let verification = false;
  if (field === zipCode) {
    verification = testCCfields(zipCode, 5);
  } else if (field === cvv) {
    verification = testCCfields(cvv, 3);
  } else {
    const num = "13,16";
    verification = testCCfields(ccNum, "13,16");
  }
  // displays the field's hint if the validation returns false
  if (verification === false) {
    e.preventDefault();
    hint.style.display = "block";
    setToInvalid(field);
  // hides the hint if it was perviously displayed and sets the field's parent to valid
  } else {
    if (hint.style.display === "block") {
      hint.style.display = "none";
      setToValid(field);
    }
  }
}

// Test the fields when using tab key to jump to next field
nameField.addEventListener("blur", (e) => {
  fieldTester(e, testUsername, nameField, nameHint);
});
emailField.addEventListener("blur", (e) => {
  fieldTester(e, testEmail, emailField, emailHint);
});

ccNum.addEventListener("blur", (e) => {
  ccFinal(e, ccNum, ccNumHint);
});

zipCode.addEventListener("blur", (e) => {
  ccFinal(e, zipCode, zipCodeHint);
});

cvv.addEventListener("blur", (e) => {
  ccFinal(e, cvv, cvvHint);
});

// form validation
form.addEventListener("submit", (e) => {
  let submitter = e.submitter;
  fieldTester(e, testUsername, nameField, nameHint);
  fieldTester(e, testEmail, emailField, emailHint);
  fieldTester(e, testActivity, "activity", activityHint);
  // only execute test of cc related values, if the payment method is creditcard
  if (paymentSelector.value === "credit-card") {
    ccFinal(e, ccNum, ccNumHint);
    ccFinal(e, zipCode, zipCodeHint);
    ccFinal(e, cvv, cvvHint);
  }
});


// ********************************
// Accessibility
// ********************************

// variable "activities" used is already declared
const activityCheckboxes = activities.querySelectorAll("input[type='checkbox']");

// makes the focus states of the activity checkbox elements more obvious by adding the class "focus" on focus
// and removes it when it's not in focus anymore
for (let i = 0; i < activityCheckboxes.length; i++) {
  activityCheckboxes[i].addEventListener("focus", e => {
    const activity = e.target;
    const activityLabel = activity.parentElement;
    activityLabel.classList.add("focus");
  });
  activityCheckboxes[i].addEventListener("blur", e => {
    const activity = e.target;
    const activityLabel = activity.parentElement;
    activityLabel.classList.remove("focus");
  });
}
