let expenses = [];  // Stores expense data

// Sample group data for prototype
let groups = {
    "Krishna's Friends": ["Alice", "Bob", "Charlie", "David"]  // Default group with members
};

// Load groups dynamically into dropdown
function loadGroups() {
    let groupSelect = document.getElementById("group-select");
    groupSelect.innerHTML = '<option value="">-- Select Group --</option>';

    for (let group in groups) {
        let option = document.createElement("option");
        option.value = group;
        option.textContent = group;
        groupSelect.appendChild(option);
    }
}

// Load group members when a group is selected
function loadGroupMembers() {
    let selectedGroup = document.getElementById("group-select").value;
    let memberListDiv = document.getElementById("member-list");

    memberListDiv.innerHTML = "";  // Clear previous list

    if (selectedGroup && groups[selectedGroup]) {
        groups[selectedGroup].forEach(member => {
            let label = document.createElement("label");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = member;
            checkbox.classList.add("split-member");

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + member));
            memberListDiv.appendChild(label);
            memberListDiv.appendChild(document.createElement("br"));
        });
    }
}

// Add an expense
function addExpense() {
    let description = document.getElementById("description").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let payer = document.getElementById("payer").value;
    let selectedGroup = document.getElementById("group-select").value;
    
    let selectedMembers = [];
    document.querySelectorAll(".split-member:checked").forEach(checkbox => {
        selectedMembers.push(checkbox.value);
    });

    if (description && amount && payer && selectedMembers.length > 0) {
        let perPersonAmount = (amount / selectedMembers.length).toFixed(2);
        let expenseDetail = `${payer} paid ₹${amount} for ${description} (Each owes ₹${perPersonAmount})`;

        // Store the expense
        expenses.push({
            description,
            amount,
            payer,
            group: selectedGroup,
            splitAmong: selectedMembers,
            perPersonAmount
        });

        // Update UI
        let list = document.getElementById("expense-list");
        let listItem = document.createElement("li");
        listItem.textContent = expenseDetail;
        list.appendChild(listItem);

        // Reset inputs
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("payer").value = "";
        document.getElementById("group-select").value = "";
        document.getElementById("member-list").innerHTML = "";
    }
}

// Load groups on page load
window.onload = () => {
    loadGroups();
};
