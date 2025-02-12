let groups = {};  // Stores group details

// Function to toggle between Email and Phone input
function toggleInput(type) {
    let inputField = document.getElementById("member-input");
    if (type === "email") {
        inputField.placeholder = "Enter email";
        inputField.type = "email";
    } else {
        inputField.placeholder = "Enter phone number";
        inputField.type = "tel";
    }
}

// Function to add members dynamically
function addMember() {
    let member = document.getElementById("member-input").value.trim();
    let memberList = document.getElementById("member-list");

    if (member) {
        let listItem = document.createElement("li");
        listItem.textContent = member;
        memberList.appendChild(listItem);
        document.getElementById("member-input").value = '';  // Reset input
    }
}

// Function to create a group with added members
function createGroup() {
    let groupName = document.getElementById("group-name").value.trim();
    let members = document.querySelectorAll("#member-list li");

    if (groupName && members.length > 0) {
        let memberArray = [];
        members.forEach(member => memberArray.push(member.textContent));

        // Store group in object
        groups[groupName] = memberArray;

        // Display in the group list
        let groupList = document.getElementById("group-list");
        let listItem = document.createElement("li");
        listItem.textContent = `${groupName} (Members: ${memberArray.join(", ")})`;
        groupList.appendChild(listItem);

        // Reset fields
        document.getElementById("group-name").value = '';
        document.getElementById("member-list").innerHTML = '';
    }
}

// Export groups for use in expense splitting
function getGroups() {
    return groups;
}
