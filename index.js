const userForm = document.getElementById("user-form");
let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

const saveUserData = (event) => {
  event.preventDefault();

  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const password = document.getElementById("password").value;
  const checkBox = document.getElementById("tac").checked;

  const age = calculateAge(dob);

  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  if (!emailInput.checkValidity() || !passwordInput.checkValidity()) {
    return;
  }

  const entry = {
    username,
    email,
    dob,
    password,
    checkBox,
  };

  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  userForm.reset();
  displayEntries();
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const retrieveUserData = () => {
  const entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

const displayEntries = () => {
  const entries = retrieveUserData();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td>${entry.username}</td>`;
      const emailCell = `<td>${entry.email}</td>`;
      const passwordCell = `<td>${entry.password}</td>`;
      const dobCell = `<td>${entry.dob}</td>`;
      const tacCell = `<td>${entry.checkBox}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${tacCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
      </tr>
      ${tableEntries}
    </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

userForm.addEventListener("submit", saveUserData);
displayEntries();

const passwordInput = document.getElementById("password");
passwordInput.addEventListener("input", () => {
  validatePassword(passwordInput);
});

const emailInput = document.getElementById("email");
emailInput.addEventListener("input", () => {
  validateEmail(emailInput);
});

function validateEmail(emailInput) {
  if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity("Email is not in the right format!");
    emailInput.reportValidity();
  } else {
    emailInput.setCustomValidity("");
  }
}

function validatePassword(passwordInput) {
  if (passwordInput.value.length < 8) {
    passwordInput.setCustomValidity("Minimum 8 characters must be present!");
    passwordInput.reportValidity();
  } else {
    passwordInput.setCustomValidity("");
  }
}
