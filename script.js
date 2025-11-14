// script.js
// База данных материалов (в реальном приложении это будет на сервере)
const materialsData = [
    {
        id: 1,
        title: "Введение в программирование",
        subject: "Программирование",
        faculty: "it",
        description: "Основные понятия и принципы программирования. Языки программирования, переменные, операторы.",
        type: "Лекция",
        date: "2023-10-15",
        file: "intro_programming.pdf"
    },
    {
        id: 2,
        title: "Линейная алгебра",
        subject: "Высшая математика",
        faculty: "it",
        description: "Матрицы, векторы, системы линейных уравнений. Основные теоремы и методы решения.",
        type: "Презентация",
        date: "2023-10-10",
        file: "linear_algebra.ppt"
    },
    {
        id: 3,
        title: "Основы экономики",
        subject: "Экономика",
        faculty: "economics",
        description: "Введение в экономическую теорию. Спрос, предложение, рыночное равновесие.",
        type: "Лекция",
        date: "2023-10-12",
        file: "economics_basics.pdf"
    },
    {
        id: 4,
        title: "История права",
        subject: "История",
        faculty: "law",
        description: "Развитие правовых систем от древности до наших дней. Основные правовые семьи.",
        type: "Методичка",
        date: "2023-10-08",
        file: "law_history.pdf"
    },
    {
        id: 5,
        title: "Объектно-ориентированное программирование",
        subject: "Программирование",
        faculty: "it",
        description: "Классы, объекты, наследование, полиморфизм. Практические примеры на Java.",
        type: "Лекция",
        date: "2023-10-20",
        file: "oop_lecture.pdf"
    },
    {
        id: 6,
        title: "Микроэкономика",
        subject: "Экономика",
        faculty: "economics",
        description: "Теория потребителя, теория фирмы, рыночные структуры. Графики и анализ.",
        type: "Презентация",
        date: "2023-10-18",
        file: "microeconomics.pptx"
    }
];

// Функция для отображения материалов
function displayMaterials(materials) {
    const grid = document.getElementById('materials-grid');
    
    if (materials.length === 0) {
        grid.innerHTML = '<p class="no-results">По вашему запросу ничего не найдено.</p>';
        return;
    }
    
    grid.innerHTML = materials.map(material => `
        <div class="material-card">
            <div class="card-header">
                <h3>${material.title}</h3>
                <div class="subject">${material.subject}</div>
            </div>
            <div class="card-body">
                <p>${material.description}</p>
                <div class="meta-info">
                    <span class="type">${material.type}</span>
                    <span class="date">${formatDate(material.date)}</span>
                </div>
            </div>
            <div class="card-footer">
                <a href="#" class="download-btn" data-file="${material.file}">Скачать</a>
                <span class="faculty">${getFacultyName(material.faculty)}</span>
            </div>
        </div>
    `).join('');
    
    // Добавляем обработчики событий для кнопок скачивания
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const fileName = this.getAttribute('data-file');
            alert(`Файл "${fileName}" начал загрузку! (В реальном приложении здесь будет скачивание)`);
        });
    });
}

// Форматирование даты
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDate('ru-RU', options);
}

// Получение названия факультета
function getFacultyName(facultyCode) {
    const faculties = {
        'it': 'ИТ',
        'economics': 'Экономика',
        'law': 'Юриспруденция'
    };
    return faculties[facultyCode] || facultyCode;
}

// Функция фильтрации материалов
function filterMaterials() {
    const facultyValue = document.getElementById('faculty-select').value;
    const subjectValue = document.getElementById('subject-select').value;
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    
    const filteredMaterials = materialsData.filter(material => {
        const matchesFaculty = !facultyValue || material.faculty === facultyValue;
        const matchesSubject = !subjectValue || material.subject.toLowerCase() === subjectValue.toLowerCase();
        const matchesSearch = !searchValue || 
            material.title.toLowerCase().includes(searchValue) || 
            material.description.toLowerCase().includes(searchValue);
        
        return matchesFaculty && matchesSubject && matchesSearch;
    });
    
    displayMaterials(filteredMaterials);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Показываем все материалы при первой загрузке
    displayMaterials(materialsData);
    
    // Добавляем обработчики событий для фильтров
    document.getElementById('faculty-select').addEventListener('change', filterMaterials);
    document.getElementById('subject-select').addEventListener('change', filterMaterials);
    document.getElementById('search-input').addEventListener('input', filterMaterials);
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});