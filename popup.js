// Get references to elements
const addColorBtn = document.getElementById('addColorBtn');
const colorHexInput = document.getElementById('colorHexInput');
const addProjectBtn = document.getElementById('addProjectBtn');
const projectTitleInput = document.getElementById('projectTitleInput');
const projectsContainer = document.getElementById('projectsContainer');

// Load stored projects and display them
window.onload = function () {
  displayProjects();
};

// Add color to a project
addColorBtn.addEventListener('click', function () {
  const colorHex = colorHexInput.value.trim();
  if (!isValidHex(colorHex)) {
    alert('Please enter a valid hex code.');
    return;
  }

  const projectTitle = projectTitleInput.value.trim();
  if (!projectTitle) {
    alert('Please provide a project title.');
    return;
  }

  let projects = JSON.parse(localStorage.getItem('projects')) || {};
  if (!projects[projectTitle]) {
    projects[projectTitle] = [];
  }

  projects[projectTitle].push(colorHex);
  localStorage.setItem('projects', JSON.stringify(projects));

  colorHexInput.value = '';  // Clear input field
  displayProjects(); // Re-render projects
});

// Add project
addProjectBtn.addEventListener('click', function () {
  const projectTitle = projectTitleInput.value.trim();
  if (!projectTitle) {
    alert('Please provide a project title.');
    return;
  }

  let projects = JSON.parse(localStorage.getItem('projects')) || {};
  if (!projects[projectTitle]) {
    projects[projectTitle] = [];
  }
  localStorage.setItem('projects', JSON.stringify(projects));

  projectTitleInput.value = '';  // Clear input field
  displayProjects(); // Re-render projects
});

// Function to check if a hex code is valid
function isValidHex(hex) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

// Display projects from localStorage
function displayProjects() {
  projectsContainer.innerHTML = ''; // Clear existing content

  const projects = JSON.parse(localStorage.getItem('projects')) || {};

  for (let projectTitle in projects) {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    const projectHeader = document.createElement('h2');
    projectHeader.textContent = projectTitle;
    projectDiv.appendChild(projectHeader);

    const colorsContainer = document.createElement('div');
    colorsContainer.classList.add('colorsContainer');

    projects[projectTitle].forEach(colorHex => {
      const colorItem = document.createElement('div');
      colorItem.classList.add('colorItem');

      const colorBox = document.createElement('div');
      colorBox.classList.add('colorBox');
      colorBox.style.backgroundColor = colorHex;

      const hexCode = document.createElement('span');
      hexCode.classList.add('hexCode');
      hexCode.textContent = colorHex;

      const copyBtn = document.createElement('button');
      copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', () => copyHexCode(colorHex));

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = 'Delete';
      deleteBtn.addEventListener('click', () => deleteColor(colorHex, projectTitle));

      colorItem.appendChild(colorBox);
      colorItem.appendChild(hexCode);
      colorItem.appendChild(copyBtn);
      colorItem.appendChild(deleteBtn);

      colorsContainer.appendChild(colorItem);
    });

    projectDiv.appendChild(colorsContainer);
    projectsContainer.appendChild(projectDiv);
  }
}

// Copy hex code to clipboard
function copyHexCode(hexCode) {
  navigator.clipboard.writeText(hexCode);
  alert('Hex code copied!');
}

// Delete a color from a project
function deleteColor(colorHex, projectTitle) {
  let projects = JSON.parse(localStorage.getItem('projects')) || {};
  const updatedColors = projects[projectTitle].filter(color => color !== colorHex);

  if (updatedColors.length === 0) {
    delete projects[projectTitle]; // Remove project if no colors left
  } else {
    projects[projectTitle] = updatedColors;
  }

  localStorage.setItem('projects', JSON.stringify(projects));
  displayProjects(); // Re-render projects
}

