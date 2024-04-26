import { guideline, sidebarMenu } from "./config/nova-settings.mjs";

document.addEventListener("DOMContentLoaded", function (e) {

  const intro = document.querySelector("nova-intro");
  const sidebar = document.querySelector("nova-sidebar");
  const guidelinecontent = document.querySelector("nova-guideline");

  const form = document.querySelector("nova-form");
  const healthCardNumber = document.querySelector("nova-field[name='health_card_number']");
  const email = document.querySelector("nova-field[name='email']");
  const address = document.querySelector("nova-field[name='address']");
  const dateOfBirth = document.querySelector("nova-field[name='date_of_birth']");
  const testLocation = document.querySelector("nova-select[name='test_location']");
  const availableDate = document.querySelector("nova-field[name='available_date']");
  const availableTime = document.querySelector("nova-field[name='available_time']");

  const submitButton = document.querySelector("nova-button");

  function initComponent() {
    intro.textheader = `Book your COVID-19 Test appointment in NovaLand`;
    intro.textbody = `If you need assistance with booking your COVID-19 Test appointment or if you don’t have a NovaLand Health Card number, you can call 1-888-700-7890 (7 days a week, 7:30-3:30pm, excluding holidays) for support.`;

    sidebar.link = JSON.stringify(sidebarMenu);
    sidebar.header = "Government's response to COVID-19"; 

    guidelinecontent.content = JSON.stringify(guideline.testAppointments);

    testLocation.options = JSON.stringify([
      { label: "Location 1", value: "location-1" },
      { label: "Location 2", value: "location-2" },
    ]);

  }

  // Initialize this component
  initComponent();

  submitButton && submitButton.shadowRoot.querySelector(".button-wrapper button")
    .addEventListener('click', (event) => {

      const valid = validateFields();
      if (valid) {
        const data = formData();
        console.log("Data: ", data);
      }
    });

  function validateFields() {
    if (!healthCardNumber.value) {
      healthCardNumber.error = "true";
      healthCardNumber.errormessage = "Health card number is required";
    } else {
      healthCardNumber.error = "false";
      healthCardNumber.errormessage = "";
    }

    if (!email.value) {
      email.error = "true";
      email.errormessage = "Email address is required";
    } else {
      email.error = "false";
      email.errormessage = "";
    }

    if (!address.value) {
      address.error = "true";
      address.errormessage = "Address is required";
    } else {
      address.error = "false";
      address.errormessage = "";
    }

    if (!dateOfBirth.value) {
      dateOfBirth.error = "true";
      dateOfBirth.errormessage = "Date of birth is required";
    } else {
      dateOfBirth.error = "false";
      dateOfBirth.errormessage = "";
    }

    if (!testLocation.value) {
      testLocation.error = "true";
      testLocation.errormessage = "Vaccine location is required";
    } else {
      testLocation.error = "false";
      testLocation.errormessage = "";
    }

    if (!availableDate.value) {
      availableDate.error = "true";
      availableDate.errormessage = "Available date is required";
    } else {
      availableDate.error = "false";
      availableDate.errormessage = "";
    }

    if (!availableTime.value) {
      availableTime.error = "true";
      availableTime.errormessage = "Available time is required";
    } else {
      availableTime.error = "false";
      availableTime.errormessage = "";
    }

    return healthCardNumber.value
      && email.value
      && address.value
      && dateOfBirth.value
      && testLocation.value
      && availableDate.value
      && availableTime.value;
  }

  function formData() {
    return {
      [healthCardNumber.name]: healthCardNumber.value,
      [email.name]: email.value,
      [address.name]: address.value,
      [dateOfBirth.name]: dateOfBirth.value,
      [testLocation.name]: testLocation.value,
      [availableDate.name]: availableDate.value,
      [availableTime.name]: availableTime.value,
    };
  }
});