// Global variables
let currentCategory = 'all';
let schemes = [];
let news = [];
let jobs = [];
let beneficiaries = [];
let socialPosts = [];
let isAdmin = false;

// DOM Elements
const schemesContainer = document.getElementById('schemes-container');
const schemesLoader = document.getElementById('schemes-loader');
const newsContainer = document.getElementById('news-container');
const newsLoader = document.getElementById('news-loader');
const jobsContainer = document.getElementById('jobs-container');
const jobsLoader = document.getElementById('jobs-loader');
const beneficiaryContainer = document.getElementById('beneficiary-container');
const beneficiaryLoader = document.getElementById('beneficiary-loader');
const socialPostsContainer = document.getElementById('social-posts-container');
const socialPostsLoader = document.getElementById('social-posts-loader');
const languageToggle = document.getElementById('language-toggle');

// Admin modals
const adminModal = document.getElementById('admin-modal');
const adminDashboard = document.getElementById('admin-dashboard');
const beneficiaryFormModal = document.getElementById('beneficiary-form-modal');
const socialPostFormModal = document.getElementById('social-post-form-modal');

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', handleKeyDown);

// Category links
document.querySelectorAll('.sidebar-menu a[data-category]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const category = e.target.getAttribute('data-category');
    filterSchemesByCategory(category);
  });
});

// Admin panel tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const tab = e.target.getAttribute('data-tab');
    switchAdminTab(tab);
  });
});

// Modal close buttons
document.querySelectorAll('.modal .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    adminModal.style.display = 'none';
    adminDashboard.style.display = 'none';
    beneficiaryFormModal.style.display = 'none';
    socialPostFormModal.style.display = 'none';
  });
});

// Form submissions
document.getElementById('admin-login-form').addEventListener('submit', handleAdminLogin);
document.getElementById('beneficiary-form').addEventListener('submit', saveBeneficiary);
document.getElementById('social-post-form').addEventListener('submit', saveSocialPost);
document.getElementById('social-media-form').addEventListener('submit', saveSocialMediaSettings);

// Button listeners
document.getElementById('add-beneficiary-btn').addEventListener('click', showAddBeneficiaryForm);
document.getElementById('add-social-post-btn').addEventListener('click', showAddSocialPostForm);
document.getElementById('language-toggle').addEventListener('click', toggleLanguage);

// Handle scheduled post display logic
document.getElementById('social-post-status').addEventListener('change', function() {
  const scheduledTimeDiv = document.querySelector('.scheduled-time');
  if (this.value === 'scheduled') {
    scheduledTimeDiv.style.display = 'block';
  } else {
    scheduledTimeDiv.style.display = 'none';
  }
});

// Initialize the application
function init() {
  fetchSchemes();
  fetchNews();
  fetchJobs();
  fetchBeneficiaries();
  fetchSocialPosts();
}

// Alt+A shortcut to open admin panel
function handleKeyDown(e) {
  if (e.altKey && e.key === 'a') {
    e.preventDefault();
    showAdminLogin();
  }
}

// Fetch API functions
async function fetchSchemes() {
  schemesLoader.style.display = 'flex';
  try {
    // Replace with your actual API endpoint
    const response = await fetch('https://api.example.com/schemes');
    schemes = await response.json();
    displaySchemes(schemes);
  } catch (error) {
    console.error('Error fetching schemes:', error);
    // Mock data for demonstration
    schemes = getMockSchemes();
    displaySchemes(schemes);
  } finally {
    schemesLoader.style.display = 'none';
  }
}

async function fetchNews() {
  newsLoader.style.display = 'inline-block';
  try {
    // Replace with your actual API endpoint
    const response = await fetch('https://api.example.com/news');
    news = await response.json();
    displayNews(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    // Mock data for demonstration
    news = getMockNews();
    displayNews(news);
  } finally {
    newsLoader.style.display = 'none';
  }
}

async function fetchJobs() {
  jobsLoader.style.display = 'inline-block';
  try {
    // Replace with your actual API endpoint
    const response = await fetch('https://api.example.com/jobs');
    jobs = await response.json();
    displayJobs(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // Mock data for demonstration
    jobs = getMockJobs();
    displayJobs(jobs);
  } finally {
    jobsLoader.style.display = 'none';
  }
}

async function fetchBeneficiaries() {
  beneficiaryLoader.style.display = 'inline-block';
  try {
    // Replace with your actual API endpoint
    const response = await fetch('https://api.example.com/beneficiaries');
    beneficiaries = await response.json();
    displayBeneficiaries(beneficiaries);
  } catch (error) {
    console.error('Error fetching beneficiaries:', error);
    // Mock data for demonstration
    beneficiaries = getMockBeneficiaries();
    displayBeneficiaries(beneficiaries);
  } finally {
    beneficiaryLoader.style.display = 'none';
  }
}

async function fetchSocialPosts() {
  socialPostsLoader.style.display = 'inline-block';
  try {
    // Replace with your actual API endpoint
    const response = await fetch('https://api.example.com/social-posts');
    socialPosts = await response.json();
    displaySocialPosts(socialPosts);
  } catch (error) {
    console.error('Error fetching social posts:', error);
    // Mock data for demonstration
    socialPosts = getMockSocialPosts();
    displaySocialPosts(socialPosts);
  } finally {
    socialPostsLoader.style.display = 'none';
  }
}

// Display functions
function displaySchemes(schemes) {
  schemesContainer.innerHTML = '';
  
  schemes.forEach(scheme => {
    const schemeCard = document.createElement('div');
    schemeCard.className = 'scheme-card';
    schemeCard.setAttribute('data-category', scheme.category);
    
    schemeCard.innerHTML = `
      <div class="scheme-icon"><i class="fas ${scheme.icon}"></i></div>
      <h3 class="scheme-title">${scheme.title}</h3>
      <p class="scheme-desc">${scheme.description}</p>
      <div class="scheme-meta">
        <span class="scheme-category"><i class="fas fa-tag"></i> ${scheme.category}</span>
        <span class="scheme-deadline"><i class="fas fa-calendar-alt"></i> ${scheme.deadline}</span>
      </div>
      <button class="apply-btn">Apply Now</button>
    `;
    
    schemesContainer.appendChild(schemeCard);
  });
}

function displayNews(newsItems) {
  newsContainer.innerHTML = '';
  
  newsItems.slice(0, 5).forEach(item => {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    
    newsItem.innerHTML = `
      <span class="news-date">${formatDate(item.date)}</span>
      <h3 class="news-title">${item.title}</h3>
      <p class="news-desc">${item.summary}</p>
      <a href="${item.link}" class="read-more">Read More</a>
    `;
    
    newsContainer.appendChild(newsItem);
  });
}

function displayJobs(jobItems) {
  jobsContainer.innerHTML = '';
  
  jobItems.slice(0, 5).forEach(job => {
    const jobItem = document.createElement('div');
    jobItem.className = 'job-item';
    
    jobItem.innerHTML = `
      <h3 class="job-title">${job.title}</h3>
      <div class="job-meta">
        <span class="job-org"><i class="fas fa-building"></i> ${job.organization}</span>
        <span class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
        <span class="job-deadline"><i class="fas fa-calendar-alt"></i> Last Date: ${formatDate(job.deadline)}</span>
      </div>
      <p class="job-desc">${job.description}</p>
      <a href="${job.link}" class="apply-btn">Apply Now</a>
    `;
    
    jobsContainer.appendChild(jobItem);
  });
}

function displayBeneficiaries(beneficiaryItems) {
  beneficiaryContainer.innerHTML = '';
  
  beneficiaryItems.forEach(ben => {
    const benCard = document.createElement('div');
    benCard.className = 'beneficiary-card';
    
    benCard.innerHTML = `
      <div class="beneficiary-img">
        <img src="${ben.photo}" alt="${ben.name}">
      </div>
      <div class="beneficiary-content">
        <h3 class="beneficiary-name">${ben.name}</h3>
        <p class="beneficiary-scheme">${ben.scheme}</p>
        <div class="beneficiary-quote">
          <i class="fas fa-quote-left"></i>
          <p>${ben.quote}</p>
          <i class="fas fa-quote-right"></i>
        </div>
      </div>
    `;
    
    beneficiaryContainer.appendChild(benCard);
  });
}

function displaySocialPosts(postItems) {
  socialPostsContainer.innerHTML = '';
  
  postItems.forEach(post => {
    const postCard = document.createElement('div');
    postCard.className = 'social-post-card';
    
    postCard.innerHTML = `
      <div class="social-post-img">
        <img src="${post.image}" alt="${post.title}">
      </div>
      <div class="social-post-content">
        <h3 class="social-post-title">${post.title}</h3>
        <p class="social-post-date"><i class="fas fa-calendar"></i> ${formatDate(post.date)}</p>
        <p class="social-post-desc">${post.description}</p>
        <div class="social-post-actions">
          <button class="share-btn facebook"><i class="fab fa-facebook-f"></i></button>
          <button class="share-btn twitter"><i class="fab fa-twitter"></i></button>
          <button class="share-btn whatsapp"><i class="fab fa-whatsapp"></i></button>
        </div>
      </div>
    `;
    
    socialPostsContainer.appendChild(postCard);
  });
}

// Filter functions
function filterSchemesByCategory(category) {
  currentCategory = category;
  document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.classList.remove('active');
  });
  
  document.querySelector(`.sidebar-menu a[data-category="${category}"]`).classList.add('active');
  
  if (category === 'all') {
    document.querySelectorAll('.scheme-card').forEach(card => {
      card.style.display = 'flex';
    });
    document.querySelector('.page-title').textContent = 'All Government Schemes';
  } else {
    document.querySelectorAll('.scheme-card').forEach(card => {
      if (card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
    document.querySelector('.page-title').textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Schemes`;
  }
}

// Admin Functions
function showAdminLogin() {
  adminModal.style.display = 'block';
}

function handleAdminLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Replace with actual authentication logic
  if (username === 'admin' && password === 'password') {
    adminModal.style.display = 'none';
    adminDashboard.style.display = 'block';
    isAdmin = true;
    loadAdminDashboardData();
  } else {
    alert('Invalid username or password');
  }
}

function loadAdminDashboardData() {
  // Load schemes into admin dashboard
  const adminSchemesList = document.getElementById('admin-schemes-list');
  adminSchemesList.innerHTML = '';
  
  schemes.forEach(scheme => {
    const schemeItem = document.createElement('div');
    schemeItem.className = 'admin-item';
    schemeItem.innerHTML = `
      <div class="admin-item-info">
        <h4>${scheme.title}</h4>
        <p><strong>Category:</strong> ${scheme.category}</p>
      </div>
      <div class="admin-item-actions">
        <button class="edit-btn" data-id="${scheme.id}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-id="${scheme.id}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    adminSchemesList.appendChild(schemeItem);
  });
  
  // Load beneficiaries into admin dashboard
  const adminBeneficiariesList = document.getElementById('admin-beneficiaries-list');
  adminBeneficiariesList.innerHTML = '';
  
  beneficiaries.forEach(ben => {
    const benItem = document.createElement('div');
    benItem.className = 'admin-item';
    benItem.innerHTML = `
      <div class="admin-item-info">
        <h4>${ben.name}</h4>
        <p><strong>Scheme:</strong> ${ben.scheme}</p>
      </div>
      <div class="admin-item-actions">
        <button class="edit-btn" data-id="${ben.id}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-id="${ben.id}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    adminBeneficiariesList.appendChild(benItem);
  });
  
  // Load social posts into admin dashboard
  const adminSocialPostsList = document.getElementById('admin-social-posts-list');
  adminSocialPostsList.innerHTML = '';
  
  socialPosts.forEach(post => {
    const postItem = document.createElement('div');
    postItem.className = 'admin-item';
    postItem.innerHTML = `
      <div class="admin-item-info">
        <h4>${post.title}</h4>
        <p><strong>Date:</strong> ${formatDate(post.date)}</p>
        <p><strong>Status:</strong> ${post.status}</p>
      </div>
      <div class="admin-item-actions">
        <button class="edit-btn" data-id="${post.id}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-id="${post.id}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    adminSocialPostsList.appendChild(postItem);
  });
  
  // Add event listeners to edit/delete buttons
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', handleEdit);
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', handleDelete);
  });
  
  // Load schemes for beneficiary form dropdown
  const beneficiarySchemeSelect = document.getElementById('beneficiary-scheme');
  beneficiarySchemeSelect.innerHTML = '';
  
  schemes.forEach(scheme => {
    const option = document.createElement('option');
    option.value = scheme.title;
    option.textContent = scheme.title;
    beneficiarySchemeSelect.appendChild(option);
  });
}

function switchAdminTab(tab) {
  // Hide all tab content
  document.querySelectorAll('.admin-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Remove active class from all tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(`${tab}-tab`).classList.add('active');
  document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');
}

function handleEdit(e) {
  const id = e.currentTarget.getAttribute('data-id');
  const tabContent = e.currentTarget.closest('.admin-tab-content');
  
  if (tabContent.id === 'beneficiaries-tab') {
    editBeneficiary(id);
  } else if (tabContent.id === 'social-posts-tab') {
    editSocialPost(id);
  }
  // Add other edit handlers as needed
}

function handleDelete(e) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  
  const id = e.currentTarget.getAttribute('data-id');
  const tabContent = e.currentTarget.closest('.admin-tab-content');
  
  if (tabContent.id === 'beneficiaries-tab') {
    deleteBeneficiary(id);
  } else if (tabContent.id === 'social-posts-tab') {
    deleteSocialPost(id);
  }
  // Add other delete handlers as needed
}

// Beneficiary Form Functions
function showAddBeneficiaryForm() {
  document.getElementById('beneficiary-form-title').textContent = 'Add Beneficiary';
  document.getElementById('beneficiary-id').value = '';
  document.getElementById('beneficiary-name').value = '';
  document.getElementById('beneficiary-quote').value = '';
  document.getElementById('beneficiary-photo-preview').src = '';
  document.getElementById('share-facebook').checked = true;
  document.getElementById('share-twitter').checked = true;
  document.getElementById('share-whatsapp').checked = false;
  
  beneficiaryFormModal.style.display = 'block';
}

function editBeneficiary(id) {
  const beneficiary = beneficiaries.find(ben => ben.id == id);
  if (!beneficiary) return;
  
  document.getElementById('beneficiary-form-title').textContent = 'Edit Beneficiary';
  document.getElementById('beneficiary-id').value = beneficiary.id;
  document.getElementById('beneficiary-name').value = beneficiary.name;
  document.getElementById('beneficiary-scheme').value = beneficiary.scheme;
  document.getElementById('beneficiary-quote').value = beneficiary.quote;
  document.getElementById('beneficiary-photo-preview').src = beneficiary.photo;
  
  beneficiaryFormModal.style.display = 'block';
}

function saveBeneficiary(e) {
  e.preventDefault();
  
  const id = document.getElementById('beneficiary-id').value;
  const name = document.getElementById('beneficiary-name').value;
  const scheme = document.getElementById('beneficiary-scheme').value;
  const quote = document.getElementById('beneficiary-quote').value;
  
  // Handle photo upload
  const photoInput = document.getElementById('beneficiary-photo');
  let photoUrl = document.getElementById('beneficiary-photo-preview').src;
  
  if (photoInput.files && photoInput.files[0]) {
    // In a real application, you would upload the file to a server
    // For now, create a blob URL for demo purposes
    photoUrl = URL.createObjectURL(photoInput.files[0]);
  }
  
  // Check for social media sharing options
  const shareFacebook = document.getElementById('share-facebook').checked;
  const shareTwitter = document.getElementById('share-twitter').checked;
  const shareWhatsapp = document.getElementById('share-whatsapp').checked;
  
  if (id) {
    // Update existing beneficiary
    const index = beneficiaries.findIndex(ben => ben.id == id);
    if (index !== -1) {
      beneficiaries[index] = {
        ...beneficiaries[index],
        name,
        scheme,
        quote,
        photo: photoUrl
      };
    }
  } else {
    // Add new beneficiary
    const newBeneficiary = {
      id: Date.now().toString(),
      name,
      scheme,
      quote,
      photo: photoUrl
    };
    beneficiaries.push(newBeneficiary);
  }
  
  // Display updated beneficiaries
  displayBeneficiaries(beneficiaries);
  
  // Update admin dashboard
  loadAdminDashboardData();
  
  // If social media sharing is checked, show a notification
  if (shareFacebook || shareTwitter || shareWhatsapp) {
    const platforms = [];
    if (shareFacebook) platforms.push('Facebook');
    if (shareTwitter) platforms.push('Twitter');
    if (shareWhatsapp) platforms.push('WhatsApp');
    
    alert(`Success story has been shared on ${platforms.join(', ')}.`);
  }
  
  // Close the modal
  beneficiaryFormModal.style.display = 'none';
}

function deleteBeneficiary(id) {
  const index = beneficiaries.findIndex(ben => ben.id == id);
  if (index !== -1) {
    beneficiaries.splice(index, 1);
    displayBeneficiaries(beneficiaries);
    loadAdminDashboardData();
  }
}

// Social Post Form Functions
function showAddSocialPostForm() {
  document.getElementById('social-post-form-title').textContent = 'Add Social Post';
  document.getElementById('social-post-id').value = '';
  document.getElementById('social-post-title').value = '';
  document.getElementById('social-post-description').value = '';
  document.getElementById('social-post-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('social-post-image-preview').src = '';
  document.getElementById('social-post-category').value = '';
  document.getElementById('social-post-status').value = 'published';
  document.getElementById('post-share-facebook').checked = true;
  document.getElementById('post-share-twitter').checked = true;
  document.getElementById('post-share-instagram').checked = true;
  document.getElementById('post-share-whatsapp').checked = false;
  
  // Hide scheduled time by default
  document.querySelector('.scheduled-time').style.display = 'none';
  
  socialPostFormModal.style.display = 'block';
}

function editSocialPost(id) {
  const post = socialPosts.find(post => post.id == id);
  if (!post) return;
  
  document.getElementById('social-post-form-title').textContent = 'Edit Social Post';
  document.getElementById('social-post-id').value = post.id;
  document.getElementById('social-post-title').value = post.title;
  document.getElementById('social-post-description').value = post.description;
  document.getElementById('social-post-date').value = new Date(post.date).toISOString().split('T')[0];
  document.getElementById('social-post-image-preview').src = post.image;
  document.getElementById('social-post-category').value = post.category || '';
  document.getElementById('social-post-status').value = post.status || 'published';
  
  // Show scheduled time if status is scheduled
  if (post.status === 'scheduled') {
    document.querySelector('.scheduled-time').style.display = 'block';
    if (post.scheduledTime) {
      document.getElementById('social-post-scheduled-time').value = post.scheduledTime;
    }
  } else {
    document.querySelector('.scheduled-time').style.display = 'none';
  }
  
  socialPostFormModal.style.display = 'block';
}

function saveSocialPost(e) {
  e.preventDefault();
  
  const id = document.getElementById('social-post-id').value;
  const title = document.getElementById('social-post-title').value;
  const description = document.getElementById('social-post-description').value;
  const date = document.getElementById('social-post-date').value;
  const category = document.getElementById('social-post-category').value;
  const status = document.getElementById('social-post-status').value;
  
  // Handle image upload
  const imageInput = document.getElementById('social-post-image');
  let imageUrl = document.getElementById('social-post-image-preview').src;
  
  if (imageInput.files && imageInput.files[0]) {
    // In a real application, you would upload the file to a server
    // For now, create a blob URL for demo purposes
    imageUrl = URL.createObjectURL(imageInput.files[0]);
  }
  
  // Get scheduled time if status is scheduled
  let scheduledTime = null;
  if (status === 'scheduled') {
    scheduledTime = document.getElementById('social-post-scheduled-time').value;
  }
  
  // Check for social media sharing options
  const shareFacebook = document.getElementById('post-share-facebook').checked;
  const shareTwitter = document.getElementById('post-share-twitter').checked;
  const shareInstagram = document.getElementById('post-share-instagram').checked;
  const shareWhatsapp = document.getElementById('post-share-whatsapp').checked;
  
  if (id) {
    // Update existing post
    const index = socialPosts.findIndex(post => post.id == id);
    if (index !== -1) {
      socialPosts[index] = {
        ...socialPosts[index],
        title,
        description,
        date,
        image: imageUrl,
        category,
        status,
        scheduledTime
      };
    }
  } else {
    // Add new post
    const newPost = {
      id: Date.now().toString(),
      title,
      description,
      date,
      image: imageUrl,
      category,
      status,
      scheduledTime
    };
    socialPosts.push(newPost);
  }
  
  // Display updated posts
  displaySocialPosts(socialPosts);
  
  // Update admin dashboard
  loadAdminDashboardData();
  
  // If social media sharing is checked, show a notification
  if (shareFacebook || shareTwitter || shareInstagram || shareWhatsapp) {
    const platforms = [];
    if (shareFacebook) platforms.push('Facebook');
    if (shareTwitter) platforms.push('Twitter');
    if (shareInstagram) platforms.push('Instagram');
    if (shareWhatsapp) platforms.push('WhatsApp');
    
    if (status === 'published') {
      alert(`Post has been shared on ${platforms.join(', ')}.`);
    } else if (status === 'scheduled') {
      alert(`Post will be shared on ${platforms.join(', ')} at the scheduled time.`);
    }
  }
  
  // Close the modal
  socialPostFormModal.style.display = 'none';
}

function deleteSocialPost(id) {
  const index = socialPosts.findIndex(post => post.id == id);
  if (index !== -1) {
    socialPosts.splice(index, 1);
    displaySocialPosts(socialPosts);
    loadAdminDashboardData();
  }
}

// Social Media Settings
function saveSocialMediaSettings(e) {
  e.preventDefault();
  
  const facebookUrl = document.getElementById('facebook-url').value;
  const twitterUrl = document.getElementById('twitter-url').value;
  const instagramUrl = document.getElementById('instagram-url').value;
  const youtubeUrl = document.getElementById('youtube-url').value;
  const telegramUrl = document.getElementById('telegram-url').value;
  
  // In a real application, you would save these settings to a database
  alert('Social media settings have been saved successfully.');
}

// Language toggle functionality
let currentLanguage = 'en';

function toggleLanguage() {
  if (currentLanguage === 'en') {
    currentLanguage = 'hi';
    languageToggle.textContent = 'English';
    translatePageContent('hi');
  } else {
    currentLanguage = 'en';
    languageToggle.textContent = 'हिंदी';
    translatePageContent('en');
  }
}

// Translation API integration
async function translatePageContent(targetLang) {
  try {
    // Show loading indicator
    document.body.classList.add('translating');
    
    // Define elements to translate
    const elementsToTranslate = document.querySelectorAll('.page-title, .scheme-title, .scheme-desc, .news-title, .news-desc, .job-title, .job-desc, .beneficiary-name, .beneficiary-quote, .social-post-title, .social-post-desc');
    
    for (const element of elementsToTranslate) {
      const originalText = element.textContent;
      const translatedText = await translateText(originalText, targetLang);
      element.textContent = translatedText;
      
      // Store original text for toggling back
      if (!element.getAttribute('data-original-text')) {
        element.setAttribute('data-original-text', originalText);
      }
    }
    
    // Hide loading indicator
    document.body.classList.remove('translating');
  } catch (error) {
    console.error('Translation error:', error);
    alert('Failed to translate content. Please try again later.');
    document.body.classList.remove('translating');
  }
}

async function translateText(text, targetLang) {
  try {
    // Using Google Translate API (you will need an API key in a real application)
    // Replace with your actual API endpoint and key
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
        format: 'text'
      })
    });
    
    const data = await response.json();
    
    if (data.data && data.data.translations && data.data.translations.length > 0) {
      return data.data.translations[0].translatedText;
    } else {
      // Fallback for demo - simulate translation
      return simulateTranslation(text, targetLang);
    }
  } catch (error) {
    console.error('Translation API error:', error);
    // Fallback for demo - simulate translation
    return simulateTranslation(text, targetLang);
  }
}

// Simulate translation for demo purposes
function simulateTranslation(text, targetLang) {
  // Basic Hindi translations for demo
  const commonEnglishWords = {
    'Schemes': 'योजनाएं',
    'Government': 'सरकारी',
    'All': 'सभी',
    'Farmers': 'किसान',
    'Students': 'छात्र',
    'Women': 'महिलाएं',
    'Senior Citizens': 'वरिष्ठ नागरिक',
    'Health': 'स्वास्थ्य',
    'Housing': 'आवास',
    'Latest': 'नवीनतम',
    'Updates': 'अपडेट',
    'News': 'समाचार',
    'Jobs': 'नौकरियां',
    'Apply Now': 'अभी आवेदन करें',
    'Read More': 'और पढ़ें',
    'Success Stories': 'सफलता की कहानियां',
    'Social Posts': 'सोशल पोस्ट',
    'Share': 'शेयर',
    'Categories': 'श्रेणियां',
    'Connect With Us': 'हमसे जुड़ें'
  };
  
  if (targetLang === 'hi') {
    // English to Hindi
    let translatedText = text;
    Object.keys(commonEnglishWords).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      translatedText = translatedText.replace(regex, commonEnglishWords[word]);
    });
    return translatedText;
  } else {
    // Hindi to English - reverse mapping
    let translatedText = text;
    Object.entries(commonEnglishWords).forEach(([eng, hindi]) => {
      const regex = new RegExp(hindi, 'g');
      translatedText = translatedText.replace(regex, eng);
    });
    return translatedText;
  }
}

// Helper functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}

// Photo upload preview functionality
document.getElementById('beneficiary-photo').addEventListener('change', function(event) {
  const preview = document.getElementById('beneficiary-photo-preview');
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  }
});

document.getElementById('social-post-image').addEventListener('change', function(event) {
  const preview = document.getElementById('social-post-image-preview');
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  }
});

// Mock data for demonstration
function getMockSchemes() {
  return [
    {
      id: '1',
      title: 'PM Kisan Samman Nidhi',
      description: 'Financial benefit of ₹6000 per year in three equal installments to farmer families.',
      category: 'farmers',
      deadline: '31 Dec 2025',
      icon: 'fa-tractor'
    },
    {
      id: '2',
      title: 'National Scholarship Portal',
      description: 'One-stop solution for students to apply for various scholarships offered by the government.',
      category: 'students',
      deadline: '30 Sep 2025',
      icon: 'fa-graduation-cap'
    },
    {
      id: '3',
      title: 'Pradhan Mantri Awas Yojana',
      description: 'Housing for all - financial assistance for construction of houses for eligible families.',
      category: 'housing',
      deadline: '31 Mar 2026',
      icon: 'fa-home'
    },
    {
      id: '4',
      title: 'Ayushman Bharat Yojana',
      description: 'Health insurance cover of ₹5 lakh per family per year for secondary and tertiary care.',
      category: 'health',
      deadline: 'Ongoing',
      icon: 'fa-heartbeat'
    },
    {
      id: '5',
      title: 'PM Mudra Yojana',
      description: 'Loans up to ₹10 lakh for non-corporate, non-farm small/micro enterprises.',
      category: 'jobs',
      deadline: 'Ongoing',
      icon: 'fa-briefcase'
    },
    {
      id: '6',
      title: 'Sukanya Samriddhi Yojana',
      description: 'Small deposit investment scheme for girl child with higher interest rate and tax benefits.',
      category: 'women',
      deadline: 'Ongoing',
      icon: 'fa-female'
    },
    {
      id: '7',
      title: 'National Pension Scheme',
      description: 'Voluntary retirement savings scheme for all Indian citizens.',
      category: 'senior-citizens',
      deadline: 'Ongoing',
      icon: 'fa-user-shield'
    },
    {
      id: '8',
      title: 'Startup India Scheme',
      description: 'Initiative to catalyze startup culture and build a strong ecosystem for innovation.',
      category: 'jobs',
      deadline: 'Ongoing',
      icon: 'fa-rocket'
    }
  ];
}

function getMockNews() {
  return [
    {
      id: '1',
      title: 'Government Launches New Scheme for Farmers',
      summary: 'A new scheme providing subsidized agricultural equipment has been announced today.',
      date: '2025-04-10',
      link: '#'
    },
    {
      id: '2',
      title: 'Scholarship Applications Now Open',
      summary: 'Students can now apply for the national merit scholarship program for the academic year 2025-26.',
      date: '2025-04-08',
      link: '#'
    },
    {
      id: '3',
      title: 'Health Insurance Coverage Expanded',
      summary: 'Ayushman Bharat scheme now covers additional medical procedures and treatments.',
      date: '2025-04-05',
      link: '#'
    },
    {
      id: '4',
      title: 'Digital India Initiative Reaches Rural Areas',
      summary: 'Government expands digital literacy program to 1000 more villages across the country.',
      date: '2025-04-02',
      link: '#'
    },
    {
      id: '5',
      title: 'Budget Allocation for Infrastructure Increased',
      summary: 'The finance minister announced a 15% increase in budget allocation for infrastructure development.',
      date: '2025-03-28',
      link: '#'
    }
  ];
}

function getMockJobs() {
  return [
    {
      id: '1',
      title: 'Staff Selection Commission Recruitment 2025',
      organization: 'Staff Selection Commission',
      location: 'Multiple Locations',
      deadline: '2025-05-15',
      description: 'Applications are invited for various posts in central government departments.',
      link: '#'
    },
    {
      id: '2',
      title: 'Railway Recruitment Board Vacancies',
      organization: 'Indian Railways',
      location: 'Pan India',
      deadline: '2025-05-30',
      description: 'Multiple positions open for technical and non-technical staff.',
      link: '#'
    },
    {
      id: '3',
      title: 'Bank PO and Clerk Positions',
      organization: 'IBPS',
      location: 'Various Banks',
      deadline: '2025-06-10',
      description: 'Recruitment for Probationary Officers and Clerks in public sector banks.',
      link: '#'
    },
    {
      id: '4',
      title: 'Teaching Positions in Central Universities',
      organization: 'UGC',
      location: 'Multiple Universities',
      deadline: '2025-05-22',
      description: 'Faculty positions open for Assistant Professor, Associate Professor, and Professor roles.',
      link: '#'
    },
    {
      id: '5',
      title: 'Defence Recruitment Drive',
      organization: 'Indian Army',
      location: 'Nationwide',
      deadline: '2025-06-05',
      description: 'Recruitment for various technical and non-technical positions in the armed forces.',
      link: '#'
    }
  ];
}

function getMockBeneficiaries() {
  return [
    {
      id: '1',
      name: 'Ramesh Kumar',
      scheme: 'PM Kisan Samman Nidhi',
      quote: 'The financial support helped me invest in better seeds and equipment, increasing my crop yield by 30%.',
      photo: '/api/placeholder/150/150'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      scheme: 'National Scholarship Portal',
      quote: 'The scholarship covered my entire college fees, allowing me to focus on my studies without financial stress.',
      photo: '/api/placeholder/150/150'
    },
    {
      id: '3',
      name: 'Suresh Patel',
      scheme: 'Pradhan Mantri Awas Yojana',
      quote: 'After years of living in a rented home, my family and I finally have our own house. A dream come true!',
      photo: '/api/placeholder/150/150'
    },
    {
      id: '4',
      name: 'Meera Devi',
      scheme: 'Ayushman Bharat Yojana',
      quote: 'My husband\'s heart surgery would have been impossible without this scheme. It saved his life and our savings.',
      photo: '/api/placeholder/150/150'
    }
  ];
}

function getMockSocialPosts() {
  return [
    {
      id: '1',
      title: 'Happy Republic Day',
      description: 'Celebrating the 76th Republic Day of India. Jai Hind! 🇮🇳',
      date: '2025-01-26',
      image: '/api/placeholder/300/200',
      category: 'festival',
      status: 'published'
    },
    {
      id: '2',
      title: 'Gudi Padwa Greetings',
      description: 'Wishing everyone a prosperous and happy Gudi Padwa. May this new year bring joy and success!',
      date: '2025-04-08',
      image: '/api/placeholder/300/200',
      category: 'festival',
      status: 'published'
    },
    {
      id: '3',
      title: 'Digital India Awareness',
      description: 'Learn how to use online government services and avoid the hassle of standing in long queues.',
      date: '2025-04-12',
      image: '/api/placeholder/300/200',
      category: 'awareness',
      status: 'published'
    },
    {
      id: '4',
      title: 'Independence Day Celebration',
      description: 'Join us in celebrating the 79th Independence Day of India at the district headquarters.',
      date: '2025-08-15',
      image: '/api/placeholder/300/200',
      category: 'festival',
      status: 'scheduled',
      scheduledTime: '2025-08-10T08:00'
    }
  ];
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
