// ==========================================
// БАЗОВІ ФУНКЦІЇ ДЛЯ ДЕМОНСТРАЦІЙНОЇ СТОРІНКИ
// ==========================================
// Калькулятор
function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operator = document.getElementById('operator').value;
    let result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Помилка: ділення на 0';
            break;
        default:
            result = 'Невідома операція';
    }
    document.getElementById('calcResult').textContent = `Результат: ${result}`;
    document.getElementById('calcResult').classList.add('show');
}
// Аналіз тексту
function analyzeText() {
    const text = document.getElementById('textInput').value;
    if (text.trim() === '') {
        alert('Введіть текст!');
        return;
    }
    const length = text.length;
    const words = text.trim().split(/\s+/).length;
    const upper = text.toUpperCase();
    const lower = text.toLowerCase();
    const vowels = (text.match(/[аеиоуяюєії]/gi) || []).length;
    document.getElementById('textResult').innerHTML = `
<div class="analysis-result">
<p><strong>Символів:</strong> ${length}</p>
<p><strong>Слів:</strong> ${words}</p>
<p><strong>Голосних:</strong> ${vowels}</p>
<p><strong>Великі літери:</strong> ${upper}</p>
<p><strong>Малі літери:</strong> ${lower}</p>
</div>
`;
    document.getElementById('textResult').classList.add('show');
}
// Зміна кольору
function changeColor(color) {
    const box = document.getElementById('colorBox');
    box.style.backgroundColor = color;
    box.style.transform = 'scale(1.1)';
    setTimeout(() => {
        box.style.transform = 'scale(1)';
    }, 200);
}
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const box = document.getElementById('colorBox');
    box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    box.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => {
        box.style.transform = 'rotate(0deg) scale(1)';
    }, 500);
}
// Робота зі списком
function addItem() {
    const input = document.getElementById('itemInput');
    const list = document.getElementById('dynamicList');
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = input.value;
        li.className = 'list-item-animated';
        // Додаємо кнопку видалення
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function () {
            li.classList.add('removing');
            setTimeout(() => li.remove(), 300);
        };
        li.appendChild(deleteBtn);
        list.appendChild(li);
        input.value = '';
        // Анімація появи
        setTimeout(() => li.classList.add('show'), 10);
    }
}
function clearList() {
    const list = document.getElementById('dynamicList');
    if (confirm('Ви впевнені, що хочете очистити весь список?')) {
        list.innerHTML = '';
    }
}
// Лічильник
let counter = 0;
function incrementCounter() {
    counter++;
    updateDisplay();
}
function decrementCounter() {
    counter--;
    updateDisplay();
}
function resetCounter() {
    if (confirm('Скинути лічильник?')) {
        counter = 0;
        updateDisplay();
    }
}
function updateDisplay() {
    const display = document.getElementById('counterDisplay');
    display.textContent = counter;
    // Зміна кольору залежно від значення
    if (counter > 0) {
        display.style.color = '#2ecc71';
    } else if (counter < 0) {
        display.style.color = '#e74c3c';
    } else {
        display.style.color = '#3498db';
    }
    // Анімація
    display.classList.remove('pulse');
    void display.offsetWidth;
    display.classList.add('pulse');
}
// Обробка форми
function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    // Проста валідація email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Введіть коректний email!');
        return;
    }
    document.getElementById('formResult').innerHTML = `
<div class="success-message animated">
<h4>✓ Дані успішно відправлено!</h4>
<p><strong>Ім'я:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
</div>
`;
    document.getElementById('demoForm').reset();
}
// Перевірка віку
function checkAge() {
    const age = parseInt(document.getElementById('ageInput').value);
    const result = document.getElementById('ageResult');
    if (age < 0 || isNaN(age)) {
        result.innerHTML = '<div class="error">❌ Введіть коректний вік</div>';
    } else if (age < 18) {
        result.innerHTML = '<div class="info"> Ви неповнолітній</div>';
    } else if (age < 65) {
        result.innerHTML = '<div class="success"> Ви дорослий</div>';
    } else {
        result.innerHTML = '<div class="info"> Ви пенсіонер</div>';
    }
    result.classList.add('show');
}
// Генератор таблиці множення
function generateTable() {
    const num = parseInt(document.getElementById('tableNumber').value);
    if (isNaN(num) || num < 1) {
        alert('Введіть число від 1 до 20');
        return;
    }
    let html = '<table class="multiplication-table">';
    html += '<thead><tr><th colspan="3">Таблиця множення для ' + num + '</th></tr></thead>';
    html += '<tbody>';
    for (let i = 1; i <= 10; i++) {
        const result = num * i;
        html += `
<tr>
<td>${num} × ${i}</td>
<td>=</td>
<td><strong>${result}</strong></td>
</tr>
`;
    }
    html += '</tbody></table>';
    document.getElementById('tableResult').innerHTML = html;
    document.getElementById('tableResult').classList.add('show');
}
// TODO List
let todos = [];
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text === '') return;
    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    todos.push(todo);
    input.value = '';
    renderTodos();
}
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}
function renderTodos() {
    const list = document.getElementById('todoList');
    const completed = todos.filter(t => t.completed).length;
    list.innerHTML = todos.map(todo => `
<li class="todo-item ${todo.completed ? 'completed' : ''}">
<input type="checkbox"
${todo.completed ? 'checked' : ''}
onchange="toggleTodo(${todo.id})">
<span>${todo.text}</span>
<button onclick="deleteTodo(${todo.id})" class="delete-btn">×</button>
</li>
`).join('');
    document.getElementById('totalTodos').textContent = todos.length;
    document.getElementById('completedTodos').textContent = completed;
}
// Студентська база
const students = [
    { name: 'Іван Петренко', grade: 85, subject: 'JavaScript' },
    { name: 'Марія Коваленко', grade: 92, subject: 'HTML/CSS' },
    { name: 'Петро Сидоренко', grade: 78, subject: 'JavaScript' },
    { name: 'Ольга Шевченко', grade: 95, subject: 'React' }
];
function showStudents() {
    const average = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
    let html = `
<div class="students-info">
<p><strong>Середній бал:</strong> ${average.toFixed(1)}</p>
</div>
<ul class="students-list">
`;
    students.forEach(student => {
        const emoji = student.grade >= 90 ? ' ' : student.grade >= 80 ? '✅' : ' ';
        html += `
<li class="student-item">
<span class="student-name">${emoji} ${student.name}</span>
<span class="student-grade">${student.grade}</span>
<span class="student-subject">${student.subject}</span>
</li>
`;
    });
    html += '</ul>';
    document.getElementById('studentsResult').innerHTML = html;
}
function addStudent() {
    const name = prompt('Ім\'я студента:');
    const grade = parseInt(prompt('Оцінка (0-100):'));
    const subject = prompt('Предмет:');
    if (name && !isNaN(grade) && grade >= 0 && grade <= 100 && subject) {
        students.push({ name, grade, subject });
        showStudents();
    } else {
        alert('Невірні дані!');
    }
}
// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function () {
    console.log(' JavaScript завантажено успішно!');
    // Додати обробники подій для Enter
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const button = this.parentElement.querySelector('button');
                if (button) button.click();
            }
        });
    });
});