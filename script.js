/****************************************************
 * Part 1: Variables, Data Types & Conditionals
 ****************************************************/
document.getElementById("checkAgeBtn").addEventListener("click", () => {
  // Declare a variable for age (simulated user input)
  let age = prompt("Enter your age to check eligibility:");
  age = Number(age);

  let result = "";

  // Conditional logic
  if (age >= 18) {
    result = "✅ You are eligible to join OncoChain as a researcher.";
  } else {
    result = "❌ You must be at least 18 to join OncoChain.";
  }

  document.getElementById("ageResult").textContent = result;
});

/****************************************************
 * Part 2: Functions
 ****************************************************/

// Function 1: Calculate a "research score"
function calculateResearchScore(papers, collaborations) {
  return papers * 10 + collaborations * 20;
}

// Function 2: Format researcher name
function formatName(name) {
  return "Dr. " + name.charAt(0).toUpperCase() + name.slice(1);
}

document.getElementById("calcBtn").addEventListener("click", () => {
  // Prompt user for input
  const name = prompt("Enter your name:");
  const papers = Number(prompt("Enter the number of research papers you have:"));
  const collaborations = Number(prompt("Enter the number of collaborations you have:"));

  // Use the functions
  const score = calculateResearchScore(papers, collaborations);
  const formattedName = formatName(name);

  // Display result in DOM
  document.getElementById("scoreResult").textContent =
    `${formattedName}, your research score is: ${score}`;
});


/****************************************************
 *  Part 3: Loops
 ****************************************************/
document.getElementById("loopBtn").addEventListener("click", () => {
  const areas = ["Precision Medicine", "Drug Discovery", "Immuno-Oncology", "Cancer Genomics"];
  const list = document.getElementById("researchList");

  // Clear previous content
  list.innerHTML = "";

  // Instruction
  const instruction = document.createElement("p");
  instruction.textContent = "✅ Choose your preferred research area(s):";
  list.appendChild(instruction);

  // Generate checkboxes dynamically
  areas.forEach(area => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = area;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + area));
    list.appendChild(label);
    list.appendChild(document.createElement("br"));
  });

  // Add a button to confirm choice
  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Start Countdown";
  list.appendChild(confirmBtn);

  // Handle countdown for selected areas
  confirmBtn.addEventListener("click", () => {
    const selectedAreas = [];
    list.querySelectorAll("input[type='checkbox']:checked").forEach(cb => {
      selectedAreas.push(cb.value);
    });

    // Clear old countdowns
    const oldCountdowns = document.getElementById("countdownContainer");
    if (oldCountdowns) oldCountdowns.remove();

    const countdownContainer = document.createElement("div");
    countdownContainer.id = "countdownContainer";

    // If nothing selected
    if (selectedAreas.length === 0) {
      countdownContainer.textContent = "⚠️ Please select at least one research area!";
      list.appendChild(countdownContainer);
      return;
    }

    // For each selected area, show countdown
    selectedAreas.forEach(area => {
      let countdown = 5;
      const areaDiv = document.createElement("div");
      areaDiv.textContent = `⏳ ${area}: Conference begins in ${countdown} days`;

      countdownContainer.appendChild(areaDiv);

      const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          areaDiv.textContent = `⏳ ${area}: Conference begins in ${countdown} days`;
        } else {
          areaDiv.textContent = `🎉 ${area}: Conference Day is here!`;
          clearInterval(interval);
        }
      }, 1000); // update every second
    });

    list.appendChild(countdownContainer);
  });
});


/****************************************************
 *  Part 4: DOM Manipulation
 ****************************************************/

// 1. Toggle Dark Mode
document.getElementById("toggleThemeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// 2. Change text content
document.getElementById("message").addEventListener("click", () => {
  document.getElementById("message").textContent = "🎉 Thanks for joining OncoChain!";
});

// 3. Add new items dynamically
document.getElementById("addNewsBtn").addEventListener("click", () => {
  const newsList = document.getElementById("newsList");
  const li = document.createElement("li");
  li.textContent = "📰 New collaboration announced with WHO!";
  newsList.appendChild(li);
});
