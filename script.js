const form = document.getElementById("calorieForm");
const tableBody = document.getElementById("CaloriesTableBody");

const openBtn = document.getElementById("open");
const overlay = document.getElementById("forms");
const closeBtn = document.getElementById("close");

openBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
});

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.style.display = "none";
    }
});

function saveData() {
    localStorage.setItem("calorieData", tableBody.innerHTML);
}

function loadData() {
    const data = localStorage.getItem("calorieData");
    if (data) {
        tableBody.innerHTML = data;
    }
    updateStats();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const food = document.getElementById("food").value.trim();
     const category = document.getElementById("Category").value.trim();
     const description = document.getElementById("Description").value.trim();
     const calories = document.getElementById("calories").value.trim();

    if (!food || !category || !description || !calories) {
        return;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
         <td class="food">${food}</td>
            <td class="category">${category}</td>
             <td class="notes">${description}</td>
               <td class="cals">${calories}</td>
                 <td><button class="Remove">Remove</button></td>
    `;
    tableBody.appendChild(row);

    saveData();
    form.reset();
    updateStats();
});

tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("Remove")) {
        e.target.closest("tr").remove();
        saveData();
        updateStats();
    }
});

const reset = document.getElementById("Reset");
reset.addEventListener("click", () => {
    tableBody.innerHTML = "";
    saveData();
    updateStats();
});

const highestSpan = document.getElementById("highest");
const lowestSpan = document.getElementById("lowest");
const totalSpan = document.getElementById("total");

function updateStats() {
  let rows = tableBody.querySelectorAll(".cals");
  let values = [...rows].map(td => parseInt(td.textContent));
  if (values.length === 0) {
     highestSpan.textContent = "0";
    lowestSpan.textContent = "0";
    totalSpan.textContent = "0";
    return;
  }
  highestSpan.textContent = Math.max(...values);
  lowestSpan.textContent = Math.min(...values);
  totalSpan.textContent = values.reduce((a, b) => a + b, 0);
}
loadData();
