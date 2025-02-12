// Script for handling group creation
function createGroup() {
    let groupName = document.getElementById('group-name').value;
    if (groupName) {
        let list = document.getElementById('group-list');
        let listItem = document.createElement('li');
        listItem.textContent = groupName;
        list.appendChild(listItem);
        document.getElementById('group-name').value = '';
    }
}

// Script for adding an expense
function addExpense() {
    let description = document.getElementById('description').value;
    let amount = document.getElementById('amount').value;
    let payer = document.getElementById('payer').value;

    // Get selected members from the dropdown
    let selectedMembers = [];
    let checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedMembers.push(checkbox.value);
    });

    if (description && amount && payer && selectedMembers.length > 0) {
        let list = document.getElementById('expense-list');
        let listItem = document.createElement('li');
        listItem.textContent = `${payer} paid ₹${amount} for ${description} (Split among: ${selectedMembers.join(', ')})`;
        list.appendChild(listItem);

        // Reset fields
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('payer').value = '';
        checkboxes.forEach(checkbox => checkbox.checked = false);
        document.getElementById('selected-members').textContent = 'Selected: None';
    }
}

// Script for handling dropdown selection
function toggleDropdown() {
    document.getElementById('split-dropdown').classList.toggle('show');
}

function updateSelectedMembers() {
    let selectedMembers = [];
    let checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedMembers.push(checkbox.value);
    });

    let displayText = selectedMembers.length > 0 ? `Selected: ${selectedMembers.join(', ')}` : 'Selected: None';
    document.getElementById('selected-members').textContent = displayText;
}

// Script for settling payments
function settleUp() {
    let payer = document.getElementById('payer').value;
    let receiver = document.getElementById('receiver').value;
    let amount = document.getElementById('amount').value;

    if (payer && receiver && amount) {
        let list = document.getElementById('settlement-list');
        let listItem = document.createElement('li');
        listItem.textContent = `${payer} settled ₹${amount} with ${receiver}`;
        list.appendChild(listItem);
        document.getElementById('payer').value = '';
        document.getElementById('receiver').value = '';
        document.getElementById('amount').value = '';
    }
}

// Close the dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
