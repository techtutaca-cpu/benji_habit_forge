// Authentication State
let currentUser = null;

// Game State
let player = {
    name: 'Hero',
    avatar: '🧙‍♂️',
    level: 1,
    hp: 50,
    maxHp: 50,
    xp: 0,
    xpToNextLevel: 100,
    gold: 0,
    equipment: {
        weapon: null,
        armor: null,
        accessory: null
    },
    inventory: [],
    achievements: [],
    stats: {
        totalHabitClicks: 0,
        totalPositiveClicks: 0,
        totalNegativeClicks: 0,
        totalTasksCompleted: 0,
        totalTodosCompleted: 0,
        easyTodosCompleted: 0,
        hardTodosCompleted: 0,
        deaths: 0,
        daysActive: 0,
        lastActiveDate: null,
        consecutiveDays: 0,
        todoCompletionTimes: [],
        nameChanged: false
    }
};

let habits = [];
let dailies = [];
let todos = [];
let currentAchievementCategory = 'all';

// Available avatars
const avatars = [
    '🧙‍♂️', '🧙‍♀️', '🧝‍♂️', '🧝‍♀️', '🧛‍♂️', '🧛‍♀️',
    '🧞‍♂️', '🧞‍♀️', '🧚‍♂️', '🧚‍♀️', '🦸‍♂️', '🦸‍♀️',
    '🦹‍♂️', '🦹‍♀️', '👨‍🎓', '👩‍🎓', '👨‍💼', '👩‍💼',
    '👨‍🔬', '👩‍🔬', '👨‍🎨', '👩‍🎨', '👨‍🚀', '👩‍🚀',
    '🤴', '👸', '👨‍⚕️', '👩‍⚕️', '👨‍🍳', '👩‍🍳',
    '👨‍🌾', '👩‍🌾', '👨‍🏫', '👩‍🏫', '🧑‍🎤', '👨‍🎤',
    '🐱', '🐶', '🐼', '🐨', '🦊', '🐯',
    '🦁', '🐸', '🐵', '🐔', '🐧', '🦉',
    '🐲', '🦄', '🐺', '🦝', '🐹', '🐰'
];

// Shop Items
const shopItems = [
    { id: 'sword1', name: 'Iron Sword', icon: '🗡️', price: 50, type: 'weapon', bonus: 5 },
    { id: 'sword2', name: 'Steel Sword', icon: '⚔️', price: 150, type: 'weapon', bonus: 10 },
    { id: 'sword3', name: 'Dragon Blade', icon: '🔪', price: 300, type: 'weapon', bonus: 20 },
    { id: 'armor1', name: 'Leather Armor', icon: '🛡️', price: 60, type: 'armor', bonus: 5 },
    { id: 'armor2', name: 'Chain Mail', icon: '🎽', price: 180, type: 'armor', bonus: 10 },
    { id: 'armor3', name: 'Dragon Scale', icon: '🦾', price: 350, type: 'armor', bonus: 20 },
    { id: 'ring1', name: 'Lucky Ring', icon: '💍', price: 80, type: 'accessory', bonus: 5 },
    { id: 'ring2', name: 'Magic Amulet', icon: '🔮', price: 200, type: 'accessory', bonus: 15 },
    { id: 'potion1', name: 'Health Potion', icon: '🧪', price: 25, type: 'consumable', effect: 'heal' }
];

// Achievements
const achievements = [
    // Getting Started
    { id: 'first_habit', name: 'Baby Steps', desc: 'Complete your first task', icon: '👶', category: 'starter' },
    { id: 'first_day', name: 'Day One Champion', desc: 'Complete all dailies in one day', icon: '🏁', category: 'starter' },
    { id: 'customized', name: 'Identity Crisis', desc: 'Change your character name', icon: '📛', category: 'starter' },

    // Level Milestones
    { id: 'level_5', name: 'Getting Warmed Up', desc: 'Reach level 5', icon: '⭐', category: 'levels' },
    { id: 'level_10', name: 'Double Digits!', desc: 'Reach level 10', icon: '🌟', category: 'levels' },
    { id: 'level_20', name: 'Halfway to Glory', desc: 'Reach level 20', icon: '💫', category: 'levels' },
    { id: 'level_50', name: 'Legendary Hero', desc: 'Reach level 50', icon: '👑', category: 'levels' },

    // Gold & Shopping
    { id: 'first_purchase', name: 'Capitalism Ho!', desc: 'Buy your first item from the shop', icon: '🛍️', category: 'shopping' },
    { id: 'rich', name: 'Money Bags', desc: 'Have 500 gold at once', icon: '💰', category: 'shopping' },
    { id: 'very_rich', name: 'Swimming in Gold', desc: 'Have 1000 gold at once', icon: '🤑', category: 'shopping' },
    { id: 'collector', name: 'Hoarder', desc: 'Own 5 different items', icon: '🎒', category: 'shopping' },
    { id: 'fully_equipped', name: 'Fashion Forward', desc: 'Equip items in all 3 slots', icon: '✨', category: 'shopping' },

    // Streaks & Consistency
    { id: 'streak_3', name: 'Getting Consistent', desc: 'Complete a daily for 3 days in a row', icon: '🔥', category: 'streaks' },
    { id: 'streak_7', name: 'Week Warrior', desc: 'Complete a daily for 7 days in a row', icon: '📅', category: 'streaks' },
    { id: 'streak_30', name: 'Monthly Master', desc: 'Complete a daily for 30 days in a row', icon: '📆', category: 'streaks' },
    { id: 'perfectionist', name: 'Perfectionist', desc: 'Complete all dailies every day for a week', icon: '💯', category: 'streaks' },

    // Habits - Fun Challenges
    { id: 'habit_spammer', name: 'Button Masher', desc: 'Click a habit + button 50 times', icon: '🖱️', category: 'habits' },
    { id: 'balanced', name: 'Perfectly Balanced', desc: 'Have a habit with equal + and - clicks', icon: '⚖️', category: 'habits' },
    { id: 'positive_vibes', name: 'Positive Vibes Only', desc: 'Click + on habits 100 times total', icon: '😊', category: 'habits' },
    { id: 'habit_master', name: 'Habit Master', desc: 'Create 10 different habits', icon: '🎯', category: 'habits' },

    // To-Dos
    { id: 'todo_easy', name: 'Taking It Easy', desc: 'Complete 10 easy to-dos', icon: '😌', category: 'todos' },
    { id: 'todo_hard', name: 'Challenge Accepted', desc: 'Complete 5 hard to-dos', icon: '💪', category: 'todos' },
    { id: 'todo_machine', name: 'Productivity Machine', desc: 'Complete 50 to-dos', icon: '⚙️', category: 'todos' },
    { id: 'speedrunner', name: 'Speedrunner', desc: 'Complete 5 to-dos in 5 minutes', icon: '⏱️', category: 'todos' },

    // Survival & Combat
    { id: 'near_death', name: 'Close Call', desc: 'Survive with 5 HP or less', icon: '😰', category: 'survival' },
    { id: 'died_once', name: 'Learning Experience', desc: 'Die for the first time', icon: '💀', category: 'survival' },
    { id: 'phoenix', name: 'Phoenix Rising', desc: 'Die and reach level 10', icon: '🔥', category: 'survival' },
    { id: 'full_health', name: 'Invincible', desc: 'Stay at full HP for 7 days', icon: '🛡️', category: 'survival' },
    { id: 'masochist', name: 'Masochist', desc: 'Click a bad habit 25 times', icon: '😈', category: 'survival' },

    // Milestones & Special
    { id: 'night_owl', name: 'Night Owl', desc: 'Complete a task after midnight', icon: '🦉', category: 'special' },
    { id: 'early_bird', name: 'Early Bird', desc: 'Complete a task before 6 AM', icon: '🐦', category: 'special' },
    { id: 'multitasker', name: 'Multitasker', desc: 'Have at least 5 habits, 5 dailies, and 5 to-dos', icon: '🎪', category: 'special' },
    { id: 'minimalist', name: 'Minimalist', desc: 'Complete all tasks with only 1 habit, 1 daily, and 1 to-do', icon: '🧘', category: 'special' },
    { id: 'the_grind', name: 'The Grind Never Stops', desc: 'Complete 100 tasks total', icon: '⛏️', category: 'special' },
    { id: 'dedication', name: 'True Dedication', desc: 'Use the app for 30 consecutive days', icon: '🏆', category: 'special' }
];

// AFK Detection
let afkTimer = null;
let afkActive = false;
let afkTextInterval = null;
const AFK_TIMEOUT = 20000; // 20 seconds

const afkMessages = [
    'STILL GRINDING',
    'NEVER LEFT',
    'ALWAYS WATCHING',
    'STILL HERE',
    'NOT AFK',
    'JUST THINKING',
    'PLOTTING GAINS',
    'LEVELING UP',
    'HABIT WARRIOR'
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

function setupEventListeners() {
    // Character name
    document.getElementById('characterName').addEventListener('change', (e) => {
        const newName = e.target.value || 'Hero';
        if (newName !== 'Hero' && !player.stats.nameChanged) {
            player.stats.nameChanged = true;
            checkAchievement('customized');
        }
        player.name = newName;
        saveGameState();
    });

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
        });
    });

    // Add buttons
    document.getElementById('addHabitBtn').addEventListener('click', addHabit);
    document.getElementById('addDailyBtn').addEventListener('click', addDaily);
    document.getElementById('addTodoBtn').addEventListener('click', addTodo);

    // Enter key support
    document.getElementById('habitInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') addHabit();
    });
    document.getElementById('dailyInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') addDaily();
    });
    document.getElementById('todoInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') addTodo();
    });

    // Modal buttons
    document.getElementById('gamesBtn').addEventListener('click', () => openModal('gamesModal'));
    document.getElementById('shopBtn').addEventListener('click', () => openModal('shopModal'));
    document.getElementById('achievementsBtn').addEventListener('click', () => openModal('achievementsModal'));
    document.getElementById('settingsBtn').addEventListener('click', () => openModal('settingsModal'));
    document.getElementById('customizeBtn').addEventListener('click', () => openModal('customizeModal'));

    // Achievement category tabs
    document.querySelectorAll('.category-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentAchievementCategory = btn.dataset.category;
            renderAchievements();
        });
    });
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
}

// Habit Functions
function addHabit() {
    const input = document.getElementById('habitInput');
    const text = input.value.trim();

    if (!text) {
        alert('Please enter a habit name!');
        return;
    }

    const habit = {
        id: Date.now(),
        text: text,
        positiveCount: 0,
        negativeCount: 0,
        createdAt: new Date().toISOString()
    };

    habits.push(habit);
    input.value = '';
    saveGameState();
    renderHabits();
}

function handleHabit(id, isPositive) {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    player.stats.totalHabitClicks++;

    if (isPositive) {
        habit.positiveCount++;
        player.stats.totalPositiveClicks++;
        player.stats.totalTasksCompleted++;
        gainXP(10);
        gainGold(5);
        checkAchievement('first_habit');
        checkAchievement('positive_vibes');
        checkAchievement('the_grind');
        checkTimeBasedAchievements();
    } else {
        habit.negativeCount++;
        player.stats.totalNegativeClicks++;
        loseHP(10);
        checkAchievement('masochist');
    }

    // Check for balanced habit
    if (habit.positiveCount === habit.negativeCount && habit.positiveCount > 0) {
        checkAchievement('balanced');
    }

    // Check for button masher
    if (habit.positiveCount >= 50) {
        checkAchievement('habit_spammer');
    }

    // Check for habit master
    if (habits.length >= 10) {
        checkAchievement('habit_master');
    }

    saveGameState();
    renderHabits();
    updateStats();
    checkMultitasker();
}

function renderHabits() {
    const list = document.getElementById('habitsList');

    if (habits.length === 0) {
        list.innerHTML = '<p class="empty-state">No habits yet. Create good (+) and bad (-) habits!</p>';
        return;
    }

    list.innerHTML = habits.map(habit => `
        <div class="task-item">
            <span class="task-text">${escapeHtml(habit.text)}</span>
            <div class="task-actions">
                <button class="habit-btn habit-btn-minus" onclick="handleHabit(${habit.id}, false)">- ${habit.negativeCount}</button>
                <button class="habit-btn habit-btn-plus" onclick="handleHabit(${habit.id}, true)">+ ${habit.positiveCount}</button>
                <button class="delete-btn" onclick="deleteTask('habits', ${habit.id})">×</button>
            </div>
        </div>
    `).join('');
}

// Daily Functions
function addDaily() {
    const input = document.getElementById('dailyInput');
    const text = input.value.trim();

    if (!text) {
        alert('Please enter a daily task!');
        return;
    }

    const daily = {
        id: Date.now(),
        text: text,
        completed: false,
        streak: 0,
        lastCompleted: null,
        createdAt: new Date().toISOString()
    };

    dailies.push(daily);
    input.value = '';
    saveGameState();
    renderDailies();
}

function toggleDaily(id) {
    const daily = dailies.find(d => d.id === id);
    if (!daily) return;

    const today = new Date().toDateString();

    if (!daily.completed) {
        daily.completed = true;
        daily.lastCompleted = today;
        daily.streak++;
        player.stats.totalTasksCompleted++;
        gainXP(15);
        gainGold(8);
        checkAchievement('first_habit');
        checkAchievement('the_grind');
        checkTimeBasedAchievements();

        if (daily.streak >= 3) checkAchievement('streak_3');
        if (daily.streak >= 7) checkAchievement('streak_7');
        if (daily.streak >= 30) checkAchievement('streak_30');

        // Check if all dailies completed
        const allCompleted = dailies.every(d => d.completed);
        if (allCompleted && dailies.length > 0) {
            checkAchievement('first_day');
        }
    } else {
        daily.completed = false;
        daily.streak = Math.max(0, daily.streak - 1);
        loseHP(5);
    }

    saveGameState();
    renderDailies();
    updateStats();
    checkMultitasker();
}

function renderDailies() {
    const list = document.getElementById('dailiesList');

    if (dailies.length === 0) {
        list.innerHTML = '<p class="empty-state">No dailies yet. Add tasks you do every day!</p>';
        return;
    }

    list.innerHTML = dailies.map(daily => `
        <div class="task-item ${daily.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" ${daily.completed ? 'checked' : ''} onchange="toggleDaily(${daily.id})">
            <span class="task-text">${escapeHtml(daily.text)}</span>
            ${daily.streak > 0 ? `<span class="task-difficulty difficulty-easy">🔥 ${daily.streak}</span>` : ''}
            <button class="delete-btn" onclick="deleteTask('dailies', ${daily.id})">×</button>
        </div>
    `).join('');
}

// Todo Functions
function addTodo() {
    const input = document.getElementById('todoInput');
    const difficulty = document.getElementById('todoDifficulty').value;
    const text = input.value.trim();

    if (!text) {
        alert('Please enter a to-do!');
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        difficulty: difficulty,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(todo);
    input.value = '';
    saveGameState();
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    if (!todo.completed) {
        todo.completed = true;
        player.stats.totalTodosCompleted++;
        player.stats.totalTasksCompleted++;

        // Track completion time
        player.stats.todoCompletionTimes.push(Date.now());

        // Track difficulty counts
        if (todo.difficulty === 'easy') player.stats.easyTodosCompleted++;
        if (todo.difficulty === 'hard') player.stats.hardTodosCompleted++;

        const rewards = {
            trivial: { xp: 5, gold: 3 },
            easy: { xp: 10, gold: 5 },
            medium: { xp: 20, gold: 10 },
            hard: { xp: 40, gold: 20 }
        };

        const reward = rewards[todo.difficulty];
        gainXP(reward.xp);
        gainGold(reward.gold);
        checkAchievement('first_habit');
        checkAchievement('the_grind');
        checkTimeBasedAchievements();

        if (player.stats.easyTodosCompleted >= 10) checkAchievement('todo_easy');
        if (player.stats.hardTodosCompleted >= 5) checkAchievement('todo_hard');
        if (player.stats.totalTodosCompleted >= 50) checkAchievement('todo_machine');

        // Check for speedrunner (5 todos in 5 minutes)
        const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
        const recentTodos = player.stats.todoCompletionTimes.filter(time => time >= fiveMinutesAgo);
        if (recentTodos.length >= 5) {
            checkAchievement('speedrunner');
        }
    } else {
        todo.completed = false;
        player.stats.totalTodosCompleted = Math.max(0, player.stats.totalTodosCompleted - 1);
        player.stats.totalTasksCompleted = Math.max(0, player.stats.totalTasksCompleted - 1);
    }

    saveGameState();
    renderTodos();
    updateStats();
    checkMultitasker();
}

function renderTodos() {
    const list = document.getElementById('todosList');

    if (todos.length === 0) {
        list.innerHTML = '<p class="empty-state">No to-dos yet. Add one-time tasks!</p>';
        return;
    }

    list.innerHTML = todos.map(todo => `
        <div class="task-item ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
            <span class="task-text">${escapeHtml(todo.text)}</span>
            <span class="task-difficulty difficulty-${todo.difficulty}">${todo.difficulty}</span>
            <button class="delete-btn" onclick="deleteTask('todos', ${todo.id})">×</button>
        </div>
    `).join('');
}

// Delete Task
function deleteTask(type, id) {
    if (!confirm('Delete this task?')) return;

    if (type === 'habits') {
        habits = habits.filter(h => h.id !== id);
        renderHabits();
    } else if (type === 'dailies') {
        dailies = dailies.filter(d => d.id !== id);
        renderDailies();
    } else if (type === 'todos') {
        todos = todos.filter(t => t.id !== id);
        renderTodos();
    }

    saveGameState();
}

// Character Stats Functions
function gainXP(amount) {
    player.xp += amount;

    if (player.xp >= player.xpToNextLevel) {
        levelUp();
    }

    updateStats();
}

function gainGold(amount) {
    player.gold += amount;
    if (player.gold >= 500) checkAchievement('rich');
    if (player.gold >= 1000) checkAchievement('very_rich');
    updateStats();
}

function loseHP(amount) {
    player.hp = Math.max(0, player.hp - amount);

    // Check for near death
    if (player.hp > 0 && player.hp <= 5) {
        checkAchievement('near_death');
    }

    updateStats();

    if (player.hp === 0) {
        player.stats.deaths++;
        checkAchievement('died_once');
        alert('💀 You died! Your HP has been restored, but you lost some gold.');
        player.hp = player.maxHp;
        player.gold = Math.max(0, player.gold - 20);
        updateStats();
        saveGameState();

        // Check for phoenix achievement
        if (player.level >= 10) {
            checkAchievement('phoenix');
        }
    }
}

function levelUp() {
    player.level++;
    player.xp = player.xp - player.xpToNextLevel;
    player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.2);
    player.maxHp += 10;
    player.hp = player.maxHp;
    player.gold += player.level * 10;

    showLevelUpNotification();
    checkAchievement('level_5');
    checkAchievement('level_10');
    checkAchievement('level_20');
    checkAchievement('level_50');
    updateStats();
    saveGameState();
}

function showLevelUpNotification() {
    const notification = document.getElementById('levelUpNotification');
    document.getElementById('newLevel').textContent = player.level;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function updateStats() {
    document.getElementById('hpValue').textContent = `${player.hp}/${player.maxHp}`;
    document.getElementById('hpFill').style.width = `${(player.hp / player.maxHp) * 100}%`;

    document.getElementById('xpValue').textContent = `${player.xp}/${player.xpToNextLevel}`;
    document.getElementById('xpFill').style.width = `${(player.xp / player.xpToNextLevel) * 100}%`;

    document.getElementById('levelValue').textContent = player.level;
    document.getElementById('goldValue').textContent = player.gold;

    // Update equipment
    document.getElementById('weaponSlot').textContent = player.equipment.weapon ?
        shopItems.find(i => i.id === player.equipment.weapon)?.name : 'None';
    document.getElementById('armorSlot').textContent = player.equipment.armor ?
        shopItems.find(i => i.id === player.equipment.armor)?.name : 'None';
    document.getElementById('accessorySlot').textContent = player.equipment.accessory ?
        shopItems.find(i => i.id === player.equipment.accessory)?.name : 'None';
}

// Shop Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');

    if (modalId === 'shopModal') {
        renderShop();
    } else if (modalId === 'achievementsModal') {
        currentAchievementCategory = 'all';
        document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
        renderAchievements();
    } else if (modalId === 'customizeModal') {
        renderAvatars();
    } else if (modalId === 'settingsModal') {
        updateSettingsStats();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Avatar Customization
function renderAvatars() {
    const avatarGrid = document.getElementById('avatarGrid');

    avatarGrid.innerHTML = avatars.map(avatar => `
        <div class="avatar-option ${player.avatar === avatar ? 'selected' : ''}"
             onclick="selectAvatar('${avatar}')">
            ${avatar}
        </div>
    `).join('');
}

function selectAvatar(avatar) {
    player.avatar = avatar;
    document.querySelector('.avatar-display').textContent = avatar;
    saveGameState();
    renderAvatars();
}

function renderShop() {
    const shopItemsDiv = document.getElementById('shopItems');

    shopItemsDiv.innerHTML = shopItems.map(item => {
        const owned = player.inventory.includes(item.id);
        const equipped = player.equipment[item.type] === item.id;
        const canAfford = player.gold >= item.price;

        return `
            <div class="shop-item ${owned ? 'owned' : ''} ${equipped ? 'equipped' : ''}"
                 onclick="${owned && item.type !== 'consumable' ? `equipItem('${item.id}')` : canAfford ? `buyItem('${item.id}')` : ''}">
                <div class="shop-item-icon">${item.icon}</div>
                <div class="shop-item-name">${item.name}</div>
                <div class="shop-item-price">
                    ${owned ? (equipped ? 'Equipped' : 'Click to Equip') : `💰 ${item.price}`}
                </div>
            </div>
        `;
    }).join('');
}

function buyItem(itemId) {
    const item = shopItems.find(i => i.id === itemId);
    if (!item || player.gold < item.price) {
        alert('Not enough gold!');
        return;
    }

    const isFirstPurchase = player.inventory.length === 0;

    player.gold -= item.price;
    player.inventory.push(itemId);

    if (item.type === 'consumable' && item.effect === 'heal') {
        player.hp = Math.min(player.maxHp, player.hp + 30);
    } else {
        player.equipment[item.type] = itemId;
    }

    if (isFirstPurchase) checkAchievement('first_purchase');
    if (player.inventory.length >= 5) checkAchievement('collector');

    // Check if all equipment slots filled
    if (player.equipment.weapon && player.equipment.armor && player.equipment.accessory) {
        checkAchievement('fully_equipped');
    }

    saveGameState();
    updateStats();
    renderShop();
}

function equipItem(itemId) {
    const item = shopItems.find(i => i.id === itemId);
    if (!item) return;

    player.equipment[item.type] = itemId;
    saveGameState();
    updateStats();
    renderShop();
}

// Achievements
function checkAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement || player.achievements.includes(achievementId)) return;

    let unlock = false;

    switch (achievementId) {
        // Starter
        case 'first_habit': unlock = true; break;
        case 'first_day': unlock = dailies.length > 0 && dailies.every(d => d.completed); break;
        case 'customized': unlock = player.stats.nameChanged; break;

        // Levels
        case 'level_5': unlock = player.level >= 5; break;
        case 'level_10': unlock = player.level >= 10; break;
        case 'level_20': unlock = player.level >= 20; break;
        case 'level_50': unlock = player.level >= 50; break;

        // Shopping
        case 'first_purchase': unlock = player.inventory.length >= 1; break;
        case 'rich': unlock = player.gold >= 500; break;
        case 'very_rich': unlock = player.gold >= 1000; break;
        case 'collector': unlock = player.inventory.length >= 5; break;
        case 'fully_equipped':
            unlock = player.equipment.weapon && player.equipment.armor && player.equipment.accessory;
            break;

        // Streaks
        case 'streak_3': unlock = dailies.some(d => d.streak >= 3); break;
        case 'streak_7': unlock = dailies.some(d => d.streak >= 7); break;
        case 'streak_30': unlock = dailies.some(d => d.streak >= 30); break;
        case 'perfectionist': unlock = false; break; // Checked separately

        // Habits
        case 'habit_spammer': unlock = habits.some(h => h.positiveCount >= 50); break;
        case 'balanced': unlock = habits.some(h => h.positiveCount === h.negativeCount && h.positiveCount > 0); break;
        case 'positive_vibes': unlock = player.stats.totalPositiveClicks >= 100; break;
        case 'habit_master': unlock = habits.length >= 10; break;

        // To-Dos
        case 'todo_easy': unlock = player.stats.easyTodosCompleted >= 10; break;
        case 'todo_hard': unlock = player.stats.hardTodosCompleted >= 5; break;
        case 'todo_machine': unlock = player.stats.totalTodosCompleted >= 50; break;
        case 'speedrunner':
            const fiveMinAgo = Date.now() - (5 * 60 * 1000);
            const recent = player.stats.todoCompletionTimes.filter(t => t >= fiveMinAgo);
            unlock = recent.length >= 5;
            break;

        // Survival
        case 'near_death': unlock = player.hp <= 5 && player.hp > 0; break;
        case 'died_once': unlock = player.stats.deaths >= 1; break;
        case 'phoenix': unlock = player.stats.deaths >= 1 && player.level >= 10; break;
        case 'full_health': unlock = false; break; // Checked separately
        case 'masochist': unlock = player.stats.totalNegativeClicks >= 25; break;

        // Special
        case 'night_owl': unlock = false; break; // Checked in time-based function
        case 'early_bird': unlock = false; break; // Checked in time-based function
        case 'multitasker':
            unlock = habits.length >= 5 && dailies.length >= 5 && todos.length >= 5;
            break;
        case 'minimalist': unlock = false; break; // Complex check
        case 'the_grind': unlock = player.stats.totalTasksCompleted >= 100; break;
        case 'dedication': unlock = player.stats.consecutiveDays >= 30; break;
    }

    if (unlock) {
        player.achievements.push(achievementId);
        achievement.unlocked = true;
        alert(`🏆 Achievement Unlocked: ${achievement.name}!\n${achievement.desc}`);
        saveGameState();
    }
}

// Helper functions for achievements
function checkTimeBasedAchievements() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) {
        checkAchievement('early_bird');
    }
    if (hour >= 0 && hour < 1) {
        checkAchievement('night_owl');
    }
}

function checkMultitasker() {
    if (habits.length >= 5 && dailies.length >= 5 && todos.length >= 5) {
        checkAchievement('multitasker');
    }
}

function renderAchievements() {
    const achievementsDiv = document.getElementById('achievementsList');

    // Filter by category
    let filteredAchievements = achievements;
    if (currentAchievementCategory !== 'all') {
        filteredAchievements = achievements.filter(a => a.category === currentAchievementCategory);
    }

    achievementsDiv.innerHTML = filteredAchievements.map(achievement => {
        const unlocked = player.achievements.includes(achievement.id);
        const progress = getAchievementProgress(achievement.id);

        let progressBar = '';
        if (!unlocked && progress.current !== undefined) {
            const percentage = Math.min(100, (progress.current / progress.max) * 100);
            progressBar = `
                <div class="achievement-progress">
                    <div class="progress-label">
                        <span>Progress</span>
                        <span>${progress.current}/${progress.max}</span>
                    </div>
                    <div class="achievement-progress-bar">
                        <div class="achievement-progress-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="achievement-item ${unlocked ? 'unlocked' : ''}">
                <div class="achievement-icon">${unlocked ? achievement.icon : '🔒'}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.desc}</div>
                    ${progressBar}
                </div>
            </div>
        `;
    }).join('');
}

function getAchievementProgress(id) {
    switch (id) {
        // Levels
        case 'level_5': return { current: player.level, max: 5 };
        case 'level_10': return { current: player.level, max: 10 };
        case 'level_20': return { current: player.level, max: 20 };
        case 'level_50': return { current: player.level, max: 50 };

        // Gold
        case 'rich': return { current: player.gold, max: 500 };
        case 'very_rich': return { current: player.gold, max: 1000 };
        case 'collector': return { current: player.inventory.length, max: 5 };

        // Streaks
        case 'streak_3': return { current: Math.max(...dailies.map(d => d.streak || 0), 0), max: 3 };
        case 'streak_7': return { current: Math.max(...dailies.map(d => d.streak || 0), 0), max: 7 };
        case 'streak_30': return { current: Math.max(...dailies.map(d => d.streak || 0), 0), max: 30 };

        // Habits
        case 'habit_spammer': return { current: Math.max(...habits.map(h => h.positiveCount || 0), 0), max: 50 };
        case 'positive_vibes': return { current: player.stats.totalPositiveClicks, max: 100 };
        case 'habit_master': return { current: habits.length, max: 10 };

        // To-Dos
        case 'todo_easy': return { current: player.stats.easyTodosCompleted, max: 10 };
        case 'todo_hard': return { current: player.stats.hardTodosCompleted, max: 5 };
        case 'todo_machine': return { current: player.stats.totalTodosCompleted, max: 50 };

        // Survival
        case 'masochist': return { current: player.stats.totalNegativeClicks, max: 25 };
        case 'died_once': return { current: player.stats.deaths, max: 1 };

        // Special
        case 'the_grind': return { current: player.stats.totalTasksCompleted, max: 100 };
        case 'dedication': return { current: player.stats.consecutiveDays, max: 30 };
        case 'multitasker':
            const minCount = Math.min(habits.length, dailies.length, todos.length);
            return { current: minCount, max: 5 };

        default: return {};
    }
}

// Storage Functions
function saveGameState() {
    if (!currentUser) return;

    const gameState = {
        player,
        habits,
        dailies,
        todos
    };
    localStorage.setItem(`habitQuest_${currentUser}`, JSON.stringify(gameState));
}

function loadGameState() {
    if (!currentUser) return;

    const saved = localStorage.getItem(`habitQuest_${currentUser}`);
    if (saved) {
        const gameState = JSON.parse(saved);
        player = gameState.player || player;
        habits = gameState.habits || [];
        dailies = gameState.dailies || [];
        todos = gameState.todos || [];

        // Initialize stats if missing (for backwards compatibility)
        if (!player.stats) {
            player.stats = {
                totalHabitClicks: 0,
                totalPositiveClicks: 0,
                totalNegativeClicks: 0,
                totalTasksCompleted: 0,
                totalTodosCompleted: 0,
                easyTodosCompleted: 0,
                hardTodosCompleted: 0,
                deaths: 0,
                daysActive: 0,
                lastActiveDate: null,
                consecutiveDays: 0,
                todoCompletionTimes: [],
                nameChanged: false
            };
        }
    }

    // Track consecutive days
    trackConsecutiveDays();

    document.getElementById('characterName').value = player.name;
}

function trackConsecutiveDays() {
    const today = new Date().toDateString();

    if (player.stats.lastActiveDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toDateString();

        if (player.stats.lastActiveDate === yesterdayString) {
            player.stats.consecutiveDays++;
        } else if (player.stats.lastActiveDate !== null) {
            player.stats.consecutiveDays = 1;
        } else {
            player.stats.consecutiveDays = 1;
        }

        player.stats.lastActiveDate = today;
        player.stats.daysActive++;
        saveGameState();

        checkAchievement('dedication');
    }
}

function renderAll() {
    renderHabits();
    renderDailies();
    renderTodos();
    updateStats();
}

// Utility
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Daily Reset (check if dailies should be reset)
function checkDailyReset() {
    const today = new Date().toDateString();
    const lastCheck = localStorage.getItem('lastDailyCheck');

    if (lastCheck !== today) {
        dailies.forEach(daily => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (daily.lastCompleted !== yesterday.toDateString() && daily.completed) {
                daily.streak = 0;
            }
            daily.completed = false;
        });

        localStorage.setItem('lastDailyCheck', today);
        saveGameState();
        renderDailies();
    }
}

setInterval(checkDailyReset, 60000);
checkDailyReset();

// Settings Functions
function updateSettingsStats() {
    document.getElementById('statDaysActive').textContent = player.stats.daysActive;
    document.getElementById('statConsecutiveDays').textContent = player.stats.consecutiveDays;
    document.getElementById('statTotalTasks').textContent = player.stats.totalTasksCompleted;
    document.getElementById('statHabitClicks').textContent = player.stats.totalHabitClicks;
    document.getElementById('statPositiveClicks').textContent = player.stats.totalPositiveClicks;
    document.getElementById('statDeaths').textContent = player.stats.deaths;
    document.getElementById('statAchievements').textContent = `${player.achievements.length}/${achievements.length}`;
}

function exportAllData() {
    const gameState = {
        player,
        habits,
        dailies,
        todos,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(gameState, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `habit-quest-backup-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);
    alert('✅ Data exported successfully!');
}

function resetAllData() {
    if (!confirm('⚠️ WARNING: This will delete ALL your progress permanently!\n\nAre you absolutely sure?')) {
        return;
    }

    if (!confirm('This is your LAST CHANCE! All your levels, gold, achievements, and tasks will be lost forever. Continue?')) {
        return;
    }

    localStorage.removeItem('habitQuest');
    localStorage.removeItem('lastDailyCheck');
    alert('🗑️ All data has been reset. The page will now reload.');
    location.reload();
}

// Import data handler
document.getElementById('importDataFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedData = JSON.parse(event.target.result);

            // Validate the imported data has required fields
            if (!importedData.player || !importedData.habits || !importedData.dailies || !importedData.todos) {
                alert('❌ Invalid backup file format!');
                return;
            }

            if (!confirm('⚠️ This will overwrite your current progress. Continue?')) {
                return;
            }

            // Import the data
            player = importedData.player;
            habits = importedData.habits;
            dailies = importedData.dailies;
            todos = importedData.todos;

            saveGameState();
            renderAll();
            updateSettingsStats();

            alert('✅ Data imported successfully!');
            closeModal('settingsModal');
        } catch (error) {
            alert('❌ Error importing data: ' + error.message);
        }
    };
    reader.readAsText(file);

    // Reset the file input
    e.target.value = '';
});

// AFK Screen Functions
function startAfkDetection() {
    const afkScreen = document.getElementById('afkScreen');

    // Reset AFK timer on any activity (excluding mouse movement when AFK is active)
    const resetAfkTimer = () => {
        // Don't reset if AFK screen is active
        if (afkActive) {
            return;
        }

        clearTimeout(afkTimer);
        afkTimer = setTimeout(() => {
            showAfkScreen();
        }, AFK_TIMEOUT);
    };

    // Listen for user activity (but not mousemove when AFK)
    document.addEventListener('mousedown', resetAfkTimer);
    document.addEventListener('keypress', resetAfkTimer);
    document.addEventListener('scroll', resetAfkTimer);
    document.addEventListener('touchstart', resetAfkTimer);

    // Click to dismiss AFK screen
    afkScreen.addEventListener('click', () => {
        hideAfkScreen();
        resetAfkTimer();
    });

    // Start the initial timer
    resetAfkTimer();
}

function showAfkScreen() {
    if (afkActive) return;

    afkActive = true;
    const afkScreen = document.getElementById('afkScreen');
    const afkCharacter = document.getElementById('afkCharacter');
    const afkText = document.getElementById('afkText');

    // Set character to current avatar
    afkCharacter.textContent = player.avatar;

    // Show screen
    afkScreen.classList.add('active');

    // Start text animation
    startAfkTextAnimation();
}

function hideAfkScreen() {
    if (!afkActive) return;

    afkActive = false;
    const afkScreen = document.getElementById('afkScreen');

    // Hide screen
    afkScreen.classList.remove('active');

    // Stop text animation
    stopAfkTextAnimation();
}

function startAfkTextAnimation() {
    const afkText = document.getElementById('afkText');
    let currentMessageIndex = 0;

    // Change message every 3 seconds
    afkTextInterval = setInterval(() => {
        // Clear previous text animation interval
        if (afkText.dataset.animationInterval) {
            clearInterval(parseInt(afkText.dataset.animationInterval));
        }

        currentMessageIndex = (currentMessageIndex + 1) % afkMessages.length;
        const message = afkMessages[currentMessageIndex];

        // Apply random capitalization animation
        animateTextWithRandomCaps(afkText, message);
    }, 3000);

    // Set initial message with animation
    animateTextWithRandomCaps(afkText, afkMessages[0]);
}

function stopAfkTextAnimation() {
    const afkText = document.getElementById('afkText');

    // Clear the message rotation interval
    if (afkTextInterval) {
        clearInterval(afkTextInterval);
        afkTextInterval = null;
    }

    // Clear the text animation interval
    if (afkText.dataset.animationInterval) {
        clearInterval(parseInt(afkText.dataset.animationInterval));
        delete afkText.dataset.animationInterval;
    }
}

function animateTextWithRandomCaps(element, text) {
    // Continuously animate without stopping
    const interval = setInterval(() => {
        // Randomly capitalize letters
        const animatedText = text.split('').map((char, index) => {
            if (char === ' ') return char;

            // Random chance to capitalize
            if (Math.random() > 0.5) {
                return char.toUpperCase();
            } else {
                return char.toLowerCase();
            }
        }).join('');

        element.textContent = animatedText;
    }, 100);

    // Store the interval so we can clear it later when hiding AFK screen
    element.dataset.animationInterval = interval;
}

// Authentication Functions
function checkAuth() {
    const loggedInUser = localStorage.getItem('currentUser');

    if (loggedInUser) {
        currentUser = loggedInUser;
        showGame();
    } else {
        showAuth();
    }
}

function showAuth() {
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
}

function showGame() {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'grid';
    document.getElementById('usernameDisplay').textContent = currentUser;

    // Initialize game
    loadGameState();
    setupEventListeners();
    setupLogoutButton();
    renderAll();
    startAfkDetection();
}

function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
}

function showSignup() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
}

function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        alert('⚠️ Please enter both username and password!');
        return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('habitQuestUsers') || '{}');

    if (!users[username]) {
        alert('❌ User not found! Please sign up first.');
        return;
    }

    if (users[username].password !== password) {
        alert('❌ Incorrect password!');
        return;
    }

    // Login successful
    currentUser = username;
    localStorage.setItem('currentUser', username);
    showGame();
}

function handleSignup() {
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (!username || !password || !confirmPassword) {
        alert('⚠️ Please fill in all fields!');
        return;
    }

    if (username.length < 3) {
        alert('⚠️ Username must be at least 3 characters long!');
        return;
    }

    if (password.length < 6) {
        alert('⚠️ Password must be at least 6 characters long!');
        return;
    }

    if (password !== confirmPassword) {
        alert('❌ Passwords do not match!');
        return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('habitQuestUsers') || '{}');

    if (users[username]) {
        alert('❌ Username already exists! Please choose another.');
        return;
    }

    // Create new user
    users[username] = {
        password: password,
        createdAt: new Date().toISOString()
    };

    localStorage.setItem('habitQuestUsers', JSON.stringify(users));

    // Auto login
    currentUser = username;
    localStorage.setItem('currentUser', username);
    alert('✅ Account created successfully! Welcome to Habit Quest!');
    showGame();
}

function setupLogoutButton() {
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}

function handleLogout() {
    if (!confirm('⚠️ Are you sure you want to logout?')) {
        return;
    }

    // Save current game state
    saveGameState();

    // Clear current user
    localStorage.removeItem('currentUser');
    currentUser = null;

    // Clear form inputs
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirmPassword').value = '';

    // Show login screen
    showLogin();
    showAuth();
}

// Floating Coins System
function spawnFloatingCoin() {
    const container = document.getElementById('floatingCoins');
    const coin = document.createElement('div');
    coin.className = 'floating-coin';
    coin.textContent = '💰';

    // Random position
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    coin.style.left = x + 'px';
    coin.style.top = y + 'px';

    // Click handler
    coin.addEventListener('click', () => {
        const goldAmount = Math.floor(Math.random() * 5) + 1;
        gainGold(goldAmount);
        coin.remove();

        // Show +gold animation
        const goldText = document.createElement('div');
        goldText.textContent = `+${goldAmount} 💰`;
        goldText.style.position = 'absolute';
        goldText.style.left = x + 'px';
        goldText.style.top = y + 'px';
        goldText.style.color = '#ffd700';
        goldText.style.fontWeight = 'bold';
        goldText.style.fontSize = '1.5rem';
        goldText.style.pointerEvents = 'none';
        goldText.style.animation = 'coinFloat 1s ease-out';
        goldText.style.zIndex = '3000';
        container.appendChild(goldText);

        setTimeout(() => goldText.remove(), 1000);
    });

    container.appendChild(coin);

    // Remove after animation
    setTimeout(() => coin.remove(), 3000);
}

// Spawn coins every 10 seconds
setInterval(() => {
    if (currentUser && document.getElementById('gameContainer').style.display !== 'none') {
        spawnFloatingCoin();
    }
}, 10000);

// Mini Games
let clickerGame = { clicks: 0, timeLeft: 10, timer: null };
let memoryGame = { cards: [], flipped: [], matches: 0, moves: 0 };
let mathGame = { score: 0, timeLeft: 30, timer: null, currentAnswer: 0 };

function startClickerGame() {
    closeModal('gamesModal');
    openModal('clickerGameModal');

    clickerGame = { clicks: 0, timeLeft: 10, timer: null };
    document.getElementById('clickerClicks').textContent = '0';
    document.getElementById('clickerTime').textContent = '10';
    document.getElementById('clickerResult').textContent = '';

    clickerGame.timer = setInterval(() => {
        clickerGame.timeLeft--;
        document.getElementById('clickerTime').textContent = clickerGame.timeLeft;

        if (clickerGame.timeLeft <= 0) {
            endClickerGame();
        }
    }, 1000);
}

function clickerClick() {
    if (clickerGame.timeLeft > 0) {
        clickerGame.clicks++;
        document.getElementById('clickerClicks').textContent = clickerGame.clicks;
    }
}

function endClickerGame() {
    clearInterval(clickerGame.timer);
    const goldEarned = clickerGame.clicks * 2;
    gainGold(goldEarned);
    document.getElementById('clickerResult').textContent = `🎉 You earned ${goldEarned} gold!`;
    document.getElementById('clickerResult').style.color = '#ffd700';
}

function startMemoryGame() {
    closeModal('gamesModal');
    openModal('memoryGameModal');

    const symbols = ['⚔️', '🛡️', '💰', '🏆', '⭐', '🔥', '💎', '👑'];
    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

    memoryGame = { cards, flipped: [], matches: 0, moves: 0 };

    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';

    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.symbol = symbol;
        card.textContent = '?';
        card.addEventListener('click', () => flipCard(index));
        grid.appendChild(card);
    });

    document.getElementById('memoryMatches').textContent = '0';
    document.getElementById('memoryMoves').textContent = '0';
    document.getElementById('memoryResult').textContent = '';
}

function flipCard(index) {
    if (memoryGame.flipped.length >= 2) return;
    if (memoryGame.flipped.includes(index)) return;

    const cards = document.querySelectorAll('.memory-card');
    const card = cards[index];

    if (card.classList.contains('matched')) return;

    card.textContent = card.dataset.symbol;
    card.classList.add('flipped');
    memoryGame.flipped.push(index);

    if (memoryGame.flipped.length === 2) {
        memoryGame.moves++;
        document.getElementById('memoryMoves').textContent = memoryGame.moves;

        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('.memory-card');
    const [first, second] = memoryGame.flipped;
    const card1 = cards[first];
    const card2 = cards[second];

    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        memoryGame.matches++;
        document.getElementById('memoryMatches').textContent = memoryGame.matches;

        if (memoryGame.matches === 8) {
            const goldEarned = Math.max(50 - memoryGame.moves * 2, 10);
            gainGold(goldEarned);
            document.getElementById('memoryResult').textContent = `🎉 You earned ${goldEarned} gold!`;
            document.getElementById('memoryResult').style.color = '#ffd700';
        }
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    memoryGame.flipped = [];
}

function startQuickMath() {
    closeModal('gamesModal');
    openModal('quickMathModal');

    mathGame = { score: 0, timeLeft: 30, timer: null, currentAnswer: 0 };
    document.getElementById('mathScore').textContent = '0';
    document.getElementById('mathTime').textContent = '30';
    document.getElementById('mathResult').textContent = '';
    document.getElementById('mathAnswer').value = '';

    generateMathQuestion();

    mathGame.timer = setInterval(() => {
        mathGame.timeLeft--;
        document.getElementById('mathTime').textContent = mathGame.timeLeft;

        if (mathGame.timeLeft <= 0) {
            endMathGame();
        }
    }, 1000);

    // Enter key support
    document.getElementById('mathAnswer').onkeypress = (e) => {
        if (e.key === 'Enter') submitMathAnswer();
    };
}

function generateMathQuestion() {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '*'];
    const op = operations[Math.floor(Math.random() * operations.length)];

    let answer;
    if (op === '+') answer = a + b;
    else if (op === '-') answer = a - b;
    else answer = a * b;

    mathGame.currentAnswer = answer;
    document.getElementById('mathEquation').textContent = `${a} ${op} ${b} = ?`;
}

function submitMathAnswer() {
    if (mathGame.timeLeft <= 0) return;

    const userAnswer = parseInt(document.getElementById('mathAnswer').value);

    if (userAnswer === mathGame.currentAnswer) {
        mathGame.score++;
        document.getElementById('mathScore').textContent = mathGame.score;
        document.getElementById('mathResult').textContent = '✅ Correct!';
        document.getElementById('mathResult').style.color = '#4caf50';
    } else {
        document.getElementById('mathResult').textContent = '❌ Wrong!';
        document.getElementById('mathResult').style.color = '#f44336';
    }

    document.getElementById('mathAnswer').value = '';
    setTimeout(() => {
        if (mathGame.timeLeft > 0) {
            document.getElementById('mathResult').textContent = '';
            generateMathQuestion();
        }
    }, 500);
}

function endMathGame() {
    clearInterval(mathGame.timer);
    const goldEarned = mathGame.score * 5;
    gainGold(goldEarned);
    document.getElementById('mathResult').textContent = `🎉 You earned ${goldEarned} gold! (${mathGame.score} correct)`;
    document.getElementById('mathResult').style.color = '#ffd700';
}
