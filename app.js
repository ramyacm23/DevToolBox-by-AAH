// app.js
// Handles UI rendering, event handling, and data loading for DevToolbox

// --- Data Import ---
// TOOL_CATEGORIES is loaded from tools.js

// --- DOM Elements ---
const tabsContainer = document.getElementById('category-tabs');
const toolsList = document.getElementById('tools-list');
const toolDetails = document.getElementById('tool-details');
const aboutSection = document.getElementById('about-section');
const roadmapsSection = document.getElementById('roadmaps-section');

let currentTab = 'category'; // 'category', 'about', 'roadmaps'
let currentCategoryIdx = 0;

// --- UI Rendering ---
function renderTabs() {
  tabsContainer.innerHTML = '';
  // About/Introduction tab
  const aboutBtn = document.createElement('button');
  aboutBtn.textContent = 'About';
  aboutBtn.className = 'dtb-tab-btn' + (currentTab === 'about' ? ' active' : '');
  aboutBtn.setAttribute('aria-label', 'About DevToolBox');
  aboutBtn.onclick = () => {
    currentTab = 'about';
    renderTabs();
    showAboutSection();
    hideToolDetails();
    hideToolsList();
    hideRoadmapsSection();
  };
  tabsContainer.appendChild(aboutBtn);

  // Category tabs
  TOOL_CATEGORIES.forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.textContent = cat.name;
    btn.className = 'dtb-tab-btn' + (currentTab === 'category' && idx === currentCategoryIdx ? ' active' : '');
    btn.setAttribute('aria-label', cat.name + ' tools');
    btn.onclick = () => {
      currentTab = 'category';
      currentCategoryIdx = idx;
      renderTabs();
      renderTools();
      hideToolDetails();
      hideAboutSection();
      hideRoadmapsSection();
    };
    tabsContainer.appendChild(btn);
  });

  // Roadmaps tab
  const roadmapBtn = document.createElement('button');
  roadmapBtn.textContent = 'Roadmaps';
  roadmapBtn.className = 'dtb-tab-btn' + (currentTab === 'roadmaps' ? ' active' : '');
  roadmapBtn.setAttribute('aria-label', 'Learning Roadmaps');
  roadmapBtn.onclick = () => {
    currentTab = 'roadmaps';
    renderTabs();
    showRoadmapsSection();
    hideToolDetails();
    hideToolsList();
    hideAboutSection();
  };
  tabsContainer.appendChild(roadmapBtn);
}

function renderTools() {
  toolsList.innerHTML = '';
  toolsList.classList.remove('hidden');
  const tools = TOOL_CATEGORIES[currentCategoryIdx].tools;
  tools.forEach((tool, idx) => {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', tool.name);
    card.innerHTML = `<h3>${tool.name}</h3><p>${tool.description}</p>`;
    card.onclick = () => showToolDetails(tool);
    card.onkeypress = (e) => { if (e.key === 'Enter') showToolDetails(tool); };
    toolsList.appendChild(card);
  });
  toolsList.style.display = '';
}

function hideToolsList() {
  toolsList.classList.add('hidden');
  toolsList.innerHTML = '';
}

function showToolDetails(tool) {
  let tutorialLinksHtml = '';
  if (tool.tutorialLinks && tool.tutorialLinks.length > 0) {
    tutorialLinksHtml = `<h4>Tutorials & Resources</h4><ul>` +
      tool.tutorialLinks.map(link => `<li><a href="${link.url}" target="_blank" rel="noopener">${link.label}</a></li>`).join('') +
      `</ul>`;
  }
  toolDetails.innerHTML = `
    <button id="close-details" class="dtb-close-btn" aria-label="Close details">&times;</button>
    <h2>${tool.name}</h2>
    <p>${tool.description}</p>
    <h4>Install</h4>
    <pre>${tool.install}</pre>
    <h4>Basic Syntax</h4>
    <pre>${tool.syntax}</pre>
    <h4>Docs</h4>
    <a href="${tool.docs}" target="_blank" rel="noopener">${tool.docs}</a>
    ${tutorialLinksHtml}
  `;
  toolDetails.classList.remove('hidden');
  document.getElementById('close-details').onclick = hideToolDetails;
}

function hideToolDetails() {
  toolDetails.classList.add('hidden');
  toolDetails.innerHTML = '';
}

function showAboutSection() {
  aboutSection.innerHTML = `
    <h2>About DevToolBox</h2>
    <p>DevToolBox is a modular, accessible web app that helps developers explore, learn, and compare popular tools by use case. All data is open and easy to contribute to.</p>
    <h3>Contributors</h3>
    <ul>
      <li><strong>Deepthi Balasubramanian</strong> – Project Owner<br>
        <span>Microsoft Student Ambassador (Gold Tier),<br>
        Co-founder of The Accessible AI Hub.<br>
        Passionate about using technology to empower developers and communities.</span>
      </li>
      <!-- Add more contributors below -->
    </ul>
    <div id="more-contributors"></div>
  `;
  aboutSection.classList.remove('hidden');
}

function hideAboutSection() {
  aboutSection.classList.add('hidden');
  aboutSection.innerHTML = '';
}

function showRoadmapsSection() {
  if (typeof ROADMAPS === 'undefined') {
    roadmapsSection.innerHTML = '<p>Roadmaps are not available.</p>';
    roadmapsSection.classList.remove('hidden');
    return;
  }
  let html = '<h2>Learning Roadmaps</h2>';
  ROADMAPS.forEach(rm => {
    html += `<section class="roadmap-category">
      <h3 tabindex="0">${rm.category}</h3>
      <ul>` +
      rm.steps.map(step => `<li>${step}</li>`).join('') +
      `</ul>
    </section>`;
  });
  roadmapsSection.innerHTML = html;
  roadmapsSection.classList.remove('hidden');
}

function hideRoadmapsSection() {
  roadmapsSection.classList.add('hidden');
  roadmapsSection.innerHTML = '';
}

// --- Init ---
renderTabs();
renderTools();
hideAboutSection();
hideRoadmapsSection();
