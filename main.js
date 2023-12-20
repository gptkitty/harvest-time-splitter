document.getElementById('fetch-entries').addEventListener('click', function() {
  // Fetch time entries from the backend
  fetch('/api/time-entries')
    .then(response => response.json())
    .then(data => {
      updateEntriesTable(data.entries);
    });
});

document.getElementById('split-time').addEventListener('click', function() {
  // Gather selected time entries and projects
  const selectedEntries = getSelectedEntries(); // Implement this function
  const selectedProjects = getSelectedProjects(); // Implement this function

  // Send data to the backend
  fetch('/api/split-time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ entries: selectedEntries, projects: selectedProjects })
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response
    if (data.success) {
      alert('Time split successfully');
    } else {
      alert('Error splitting time');
    }
  });
});

function updateEntriesTable(entries) {
  const table = document.getElementById('time-entries');
  // Clear current entries
  table.innerHTML = '';
  // Add new entries to the table
  entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.textContent = `Entry: ${entry.description}`;
    table.appendChild(entryElement);
  });
}

function updateProjectsDropdown(projects) {
  const dropdown = document.getElementById('project-select');
  // Populate dropdown with projects
  projects.forEach(project => {
    const option = document.createElement('option');
    option.value = project.id;
    option.textContent = project.name;
    dropdown.appendChild(option);
  });
}

// Additional functions to get selected entries and projects will be needed
