// ==========================================
// ІНТЕРАКТИВНЕ ПОРТФОЛІО
// ==========================================
// База даних проектів
let projects = [
    {
        id: 1,
        name: 'E-commerce Website',
        description: 'Сучасний інтернет-магазин з адаптивним дизайном',
        category: 'web',
        technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
        image: 'images/grid-1.jpg',
        date: '2024-01-15'
    },
    {
        id: 2,
        name: 'Mobile App UI',
        description: 'Дизайн інтерфейсу мобільного додатку',
        category: 'mobile',
        technologies: ['Figma', 'UI/UX', 'Prototyping'],
        image: 'images/grid-2.jpg',
        date: '2024-02-20'
    },
    {
        id: 3,
        name: 'Portfolio Website',
        description: 'Особистий сайт-портфоліо з анімаціями',
        category: 'web',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        image: 'images/grid-3.jpg',
        date: '2024-03-10'
    },
    {
        id: 4,
        name: 'Brand Identity',
        description: 'Розробка фірмового стилю компанії',
        category: 'design',
        technologies: ['Illustrator', 'Photoshop', 'Branding'],
        image: 'images/grid-4.jpg',
        date: '2024-02-05'
    },
    {
        id: 5,
        name: 'Weather App',
        description: 'Мобільний додаток прогнозу погоди',
        category: 'mobile',
        technologies: ['React Native', 'API', 'Weather'],
        image: 'images/grid-5.jpg',
        date: '2024-03-01'
    },
    {
        id: 6,
        name: 'Dashboard Design',
        description: 'Адміністративна панель для аналітики',
        category: 'web',
        technologies: ['Vue.js', 'Charts', 'Dashboard'],
        image: 'images/grid-6.jpg',
        date: '2024-01-25'
    }
];
// Поточний фільтр
let currentFilter = 'all';
// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function () {
    renderProjects();
    setupEventListeners();
    updateStats();
});
// Рендеринг проектів
function renderProjects(filter = 'all', searchTerm = '') {
    const grid = document.getElementById('projectsGrid');
    const filteredProjects = projects.filter(project => {
        const matchesFilter = filter === 'all' || project.category === filter;
        const matchesSearch = searchTerm === '' ||
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.technologies.some(tech =>
                tech.toLowerCase().includes(searchTerm.toLowerCase())
            );
        return matchesFilter && matchesSearch;
    });
    if (filteredProjects.length === 0) {
        grid.innerHTML = '<p class="no-results">Проекти не знайдено </p>';
        return;
    }
    grid.innerHTML = filteredProjects.map(project => `
<article class="project-card" data-category="${project.category}">
<div class="project-image">
<img src="${project.image}" alt="${project.name}">
<div class="project-overlay">
<button onclick="showProjectDetails(${project.id})"
class="btn-view">Детальніше</button>
</div>
</div>
<div class="project-info">
<h3>${project.name}</h3>
<p>${project.description}</p>
<div class="project-tech">
${project.technologies.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('')}
</div>
<div class="project-footer">
<span class="project-date">${formatDate(project.date)}</span>
<button onclick="deleteProject(${project.id})"
class="btn-delete">Видалити</button>
</div>
</div>
</article>
`).join('');
    // Анімація появи карток
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, index * 100);
    });
    updateProjectCount(filteredProjects.length);
}
// Налаштування обробників подій
function setupEventListeners() {
    // Фільтрація
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderProjects(currentFilter, document.getElementById('searchInput').value);
        });
    });
    // Пошук
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        renderProjects(currentFilter, this.value);
    });
    // Форма додавання проекту
    const form = document.getElementById('addProjectForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addNewProject();
    });
    // Закриття модального вікна при кліку поза ним
    window.addEventListener('click', function (e) {
        const modal = document.getElementById('projectModal');
        if (e.target === modal) {
            closeModal();
        }
    });
}
// Показати деталі проекту
function showProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
<div class="project-details">
<img src="${project.image}" alt="${project.name}" class="detail-image">
<h2>${project.name}</h2>
<p class="detail-description">${project.description}</p>
<div class="detail-section">
<h3>Технології</h3>
<div class="project-tech">
${project.technologies.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('')}
</div>
</div>
<div class="detail-section">
<h3>Категорія</h3>
<span class="category-badge">${getCategoryName(project.category)}</span>
</div>
<div class="detail-section">
<h3>Дата створення</h3>
<p>${formatDate(project.date)}</p>
</div>
<div class="detail-actions">
<button onclick="editProject(${project.id})" class="btn-edit">
Редагувати
</button>
<button onclick="shareProject(${project.id})" class="btn-share">
Поділитися
</button>
</div>
</div>
`;
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}
// Закрити модальне вікно
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}
// Додати новий проект
function addNewProject() {
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;
    const category = document.getElementById('projectCategory').value;
    const technologies = document.getElementById('projectTechnologies').value
        .split(',')
        .map(tech => tech.trim());
    const newProject = {
        id: Date.now(),
        name: name,
        description: description,
        category: category,
        technologies: technologies,
        image: 'images/photo1.jpg', // Дефолтне зображення
        date: new Date().toISOString().split('T')[0]
    };
    projects.unshift(newProject); // Додати на початок
    renderProjects(currentFilter);
    updateStats();
    // Очистити форму
    document.getElementById('addProjectForm').reset();
    // Показати повідомлення
    showNotification('Проект успішно додано! ✓');
}
// Видалити проект
function deleteProject(projectId) {
    if (confirm('Ви впевнені, що хочете видалити цей проект?')) {
        projects = projects.filter(p => p.id !== projectId);
        renderProjects(currentFilter);
        updateStats();
        showNotification('Проект видалено');
    }
}
// Редагувати проект
function editProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const newName = prompt('Нова назва:', project.name);
    if (newName) {
        project.name = newName;
        renderProjects(currentFilter);
        closeModal();
        showNotification('Проект оновлено! ✓');
    }
}
// Поділитися проектом
function shareProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const shareText = `Подивіться на мій проект: ${project.name}`;
    if (navigator.share) {
        navigator.share({
            title: project.name,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback - копіювання в буфер обміну
        navigator.clipboard.writeText(shareText);
        showNotification('Посилання скопійовано в буфер обміну! ');
    }
}
// Оновити статистику
function updateStats() {
    document.getElementById('totalProjects').textContent = projects.length;
    document.getElementById('webProjects').textContent =
        projects.filter(p => p.category === 'web').length;
    document.getElementById('mobileProjects').textContent =
        projects.filter(p => p.category === 'mobile').length;
    document.getElementById('designProjects').textContent =
        projects.filter(p => p.category === 'design').length;
}
// Оновити кількість проектів
function updateProjectCount(count) {
    const countElement = document.getElementById('projectCount');
    countElement.textContent = `Показано проектів: ${count}`;
}
// Форматувати дату
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('uk-UA', options);
}
// Отримати назву категорії
function getCategoryName(category) {
    const names = {
        'web': 'Веб-розробка',
        'mobile': 'Мобільні додатки',
        'design': 'Дизайн'
    };
    return names[category] || category;
}
// Показати сповіщення
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
// Клавіатурні скорочення
document.addEventListener('keydown', function (e) {
    // ESC - закрити модальне вікно
    if (e.key === 'Escape') {
        closeModal();
    }
    // Ctrl+F - фокус на пошук
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});