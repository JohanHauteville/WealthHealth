import { STATES_LIST } from "../../utils/constants";

export function checkInput(id, type, defaultName, parentTarget) {
  const REGEX_TYPE = {
    ZIPCODE: /^\d{5}$/,
    NAME: /^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]+$/,
    STREET: /^[a-zA-Z0-9À-ÖØ-öø-ÿ-,.' ]+$/,
    DATE: /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
  };
  const elementToCheck = document.getElementById(id);
  const parentElementToCheck = elementToCheck.parentNode;
  const regex = REGEX_TYPE[type];
  let testRegex = null;
  let testDefault = false;

  if (type === "DATE" || defaultName) {
    testRegex = regex.test(elementToCheck.innerHTML);
    if (elementToCheck.innerHTML === defaultName) {
      testDefault = true;
    }
  } else {
    testRegex = regex.test(elementToCheck.value);
  }

  if (testRegex && !testDefault) {
    if (parentTarget) {
      parentElementToCheck.classList.remove("error");
      parentElementToCheck.classList.add("valid");
    } else {
      elementToCheck.classList.remove("error");
      elementToCheck.classList.add("valid");
    }
  } else {
    if (parentTarget) {
      parentElementToCheck.classList.add("error");
      parentElementToCheck.classList.remove("valid");
    } else {
      elementToCheck.classList.add("error");
      elementToCheck.classList.remove("valid");
    }
  }

  return testRegex && !testDefault;
}

function getState() {
  const foundedState = STATES_LIST.find(
    (state) => state.name === document.getElementById("state").innerHTML
  );
  return foundedState.abbreviation;
}

function getAdressInfos() {
  const addressInfos = {
    street: document.getElementById("street").value,
    city: document.getElementById("city").value,
    state: getState(),
    zipCode: document.getElementById("zip-code").value,
  };
  return addressInfos;
}

export function getProfile() {
  const profileinformation = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    dateOfBirth: document.getElementById("date-of-birth").innerHTML,
    startDate: document.getElementById("start-date").innerHTML,
    address: getAdressInfos(),
    department: document.getElementById("department").innerHTML,
  };
  console.log(profileinformation);
  return profileinformation;
}
