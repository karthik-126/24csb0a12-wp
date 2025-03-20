function calculateBMI() {
  const height = document.getElementById("height").value / 100;
  const weight = document.getElementById("weight").value;
  const results = document.getElementById("results");
  const condition = document.querySelector(".checkcondition");

  if (height > 0 && weight > 0) {
    const bmi = (weight / (height * height)).toFixed(2);
    results.innerText = `Your BMI: ${bmi}`;

    let category = "";
    if (bmi < 18.6) {
      category = "Underweight";
    } else if (bmi >= 18.6 && bmi <= 24.9) {
      category = "Normal weight";
    } else {
      category = "Overweight";
    }

    condition.innerText = `Category: ${category}`;
    saveBMI(bmi, category);
  } else {
    results.innerText = "Please enter valid values.";
  }
}

function saveBMI(bmi, category) {
  const username = localStorage.getItem("loggedInUser") || "Guest";
  let history = JSON.parse(localStorage.getItem("bmiHistory")) || {};

  if (!history[username]) {
    history[username] = [];
  }

  history[username].push({ bmi, category, date: new Date().toLocaleString() });
  localStorage.setItem("bmiHistory", JSON.stringify(history));

  displayHistory();
}

function displayHistory() {
  const username = localStorage.getItem("loggedInUser") || "Guest";
  const history = JSON.parse(localStorage.getItem("bmiHistory")) || {};
  const historyList = document.getElementById("bmi-history");

  historyList.innerHTML = "";
  if (history[username]) {
    history[username].forEach(entry => {
      const li = document.createElement("li");
      li.innerText = `BMI: ${entry.bmi} (${entry.category}) - ${entry.date}`;
      historyList.appendChild(li);
    });
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", displayHistory);
