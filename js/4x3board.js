// querySelector — это метод, который возвращает первый элемент, соответствующий указанному селектору или группе селекторов
const CHANGE_GAME_BOARD = document.querySelector("#change-game-board");
const CHANGE_GAME_BOARD2 = document.querySelector("#change-game-board2");
const CHANGE_GAME_BOARD3 = document.querySelector("#change-game-board3");

CHANGE_GAME_BOARD.addEventListener("click", function () {
    CARD_ELEMENTS = ["🍓", "🍉", "🍌", "🍏", "🥝", "🍇"];
    CARD_AMOUNT = 12;

    GAME_BOARD4X3 = document.querySelector("#game-board");
    GAME_BOARD4X3.style.gridTemplateColumns = "repeat(4, 1fr)";

    CARD_FLIP_TIMEOUT_MS = 500;

    startGame();
});
CHANGE_GAME_BOARD2.addEventListener("click", function () {
    CARD_ELEMENTS = ["🍓", "🍉", "🍌", "🍏", "🥝", "🍇", "🍑", "🍒"];
    CARD_AMOUNT = 16;

    GAME_BOARD4X4 = document.querySelector("#game-board");
    GAME_BOARD4X4.style.gridTemplateColumns = "repeat(4, 1fr)";

    CARD_FLIP_TIMEOUT_MS = 700;

    startGame();
});
CHANGE_GAME_BOARD3.addEventListener("click", function () {
    CARD_ELEMENTS = ["🍓", "🍉", "🍌", "🍏", "🥝", "🍇", "🍑", "🍒", "🫐", "🍍" , "🍅", "🍋"];
    CARD_AMOUNT = 24;

    GAME_BOARD6X4 = document.querySelector("#game-board");
    GAME_BOARD6X4.style.gridTemplateColumns = "repeat(6, 1fr)";

    CARD_FLIP_TIMEOUT_MS = 900;

    startGame();
});

const GAME_NODE = document.querySelector("#game-board");
const VICTORY_TEXT = document.querySelector("#victory-message");
const RESULT_TEXT = document.querySelector("#result-message")
const START_GAME_BUTTON = document.querySelector("#new-game-button") 

const TIMER_MINUTES = document.querySelector("#minutes");
const TRY_COUNT = document.querySelector("#try");

const TIMER_SECONDS = document.querySelector("#seconds");

const VISIBLE_CARD_CLASSNAME = 'visible';

// время за которое карточка будет поворачиваться
var CARD_FLIP_TIMEOUT_MS = 500;

// содержимое на обратной стороне карточки
var CARD_ELEMENTS = ["🍓", "🍉", "🍌", "🍏", "🥝", "🍇"];

// количество карточек на игровом поле
var CARD_AMOUNT = 12;

// для перевернутых карточек проверка на их совпадение
let VISIBLE_CARDS = [];

let tryCount = 0;


let timerInterval;
let seconds = 0;
let isTimerRunning = false;

// при нажатии на кнопку начинается новая игра. Кнопке, которая находится в html файле
// добавляет обработчик события нажатия кнопки
START_GAME_BUTTON.addEventListener("click", startGame)

// функция для счета ходов
function incrementMovesCount() {
    movesCount++;
    TRY_COUNT.textContent = movesCount;
}

// Запускаем таймер
// setInterval - это метод, который позволяет регулярно исполнять функцию через указанный промежуток времени
function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
}

// функция для остановки счетчика
// clearInterval — это функция, которая отменяет регулярное выполнение функции, установленное вызовом setInterval
function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

// Обновляем время в HTML
// с помощью функции Math.floor() мы округляем количество секунд вниз до целого количества минут
// метод padStart() значений String дополняет эту строку другой строкой до нужной длины 
function updateDisplay() {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    TIMER_MINUTES.textContent = minutes;
    TIMER_SECONDS.textContent = secs;
}

// эта функция очищает игровое поле
function startGame() {
    seconds = 0;
    stopTimer();
    seconds = 0;
    TIMER_MINUTES.textContent = '00';
    TIMER_SECONDS.textContent = '00';
    movesCount = 0;
    TRY_COUNT.textContent = movesCount;


    // очищаем игровое поле
    [GAME_NODE, VICTORY_TEXT, RESULT_TEXT].forEach((node) => (node.innerHTML = ""));

    const CARD_VALUES = generateArray(CARD_ELEMENTS, CARD_AMOUNT);
    console.log(CARD_VALUES)

    CARD_VALUES.forEach(renderCard);

    const renderedCards = document.querySelectorAll(".card");
    renderedCards.forEach((card) => card.classList.add(VISIBLE_CARD_CLASSNAME));

    setTimeout(() => {
        renderedCards.forEach(card => card.classList.remove(VISIBLE_CARD_CLASSNAME));
    }, CARD_FLIP_TIMEOUT_MS * 5)
}

// функция для перемешивания карт при каждой новой игре
function generateArray(emojis, cardAmount) {
    // в массив помещаются сгенерированные смайлики
    const randomArray = [];
    // считает сколько раз смайлик встретился в массиве
    const elementCounts = {};

    // обновляем объект и по каждому смайлику ставим значение 0
    for (const emoji of emojis) {
        elementCounts[emoji] = 0;
    }

    // пока массив сгенерированных эмодзи меньше чем кол-во необходимых карточек
    // берется рандомный индекс эмодзи и по этому индесу получаем эмодзи из массива CARD_ELEMENTS
    while (randomArray.length < cardAmount) {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        const randomElement = emojis[randomIndex];

        // если эмодзи встречается меньше двух раз в массиве randomArray, то добавляем его туда
        // и изменяем его значение в elementCounts
        if (elementCounts[randomElement] < 2) {
            randomArray.push(randomElement);
            elementCounts[randomElement]++;
        }
    }
    // возвращаем массив
    return randomArray;
}

// функция для отрисовки одной карты
function renderCard(emoji) {
    // создаем элементы и задаем им классы
    const card = document.createElement("div");
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    cardFront.textContent = "?";
    cardBack.textContent = emoji;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);

    card.appendChild(cardInner);

    card.addEventListener("click", () => {
        handleCardClick(card);
    })

    GAME_NODE.appendChild(card);
}

// функция для обработки нажатия на карточку
function handleCardClick(card) {

    // исключаем нажатие на уже открытые карточки (contains проверяет наличие класса у элемента)
    if (card.classList.contains(VISIBLE_CARD_CLASSNAME)){
        return;
    }

    startTimer();

    // функция для проверки победы
    const checkVictory = () => {
        const visibleCardNodes = document.querySelectorAll(".visible");

        const isVictory = visibleCardNodes.length === CARD_AMOUNT;
        const victoryMessage = 'Поздравляю, вы выиграли!';

        if (isVictory) {
            VICTORY_TEXT.textContent = victoryMessage;
            stopTimer();
            displayVictoryMessage();
        }
    }

    // проверяем выигрыш после открытия карточки transitionend запускается в тот момент,
    // когда css-переход завершен (в нашем случае, анимация карточки завершилась и все стили применились)
    card.querySelector(".card-inner").addEventListener("transitionend", checkVictory);

    // добавляем карте класс visible, запуская анимацию поворота
    card.classList.add(VISIBLE_CARD_CLASSNAME);

    // добавляем карту в массив открытых карт
    VISIBLE_CARDS.push(card);

    // если кол-во видимых карт нечетное, то возвращается пустой return,
    // чтобы не проверять одну открытую карточку 
    if (VISIBLE_CARDS.length % 2 !== 0){
        return;
    }

    // для проверки совпадения карт, мы проверяем предпоследний и последний элемент массива
    const [prelastCard, lastCard] = VISIBLE_CARDS.slice(-2);
    if (lastCard.textContent == prelastCard.textContent){
        incrementMovesCount();
    }
    // если карточки не совпадают, мы удаляем их из массива
    if (lastCard.textContent !== prelastCard.textContent){
        // если карточки не совпадают, мы удаляем их из массива и создаем новый массив
        // на основе VISIBLE_CARDS в котором остаются все элементы кроме двух последних, 
        // которые не совпали
        VISIBLE_CARDS = VISIBLE_CARDS.slice(0, VISIBLE_CARDS.length - 2);
        incrementMovesCount();
        // Через 500 мс закрываем те карты, которые не совпали
        setTimeout(() => {
            lastCard.classList.remove(VISIBLE_CARD_CLASSNAME);
            prelastCard.classList.remove(VISIBLE_CARD_CLASSNAME);
        }, CARD_FLIP_TIMEOUT_MS);
    }
}

function displayVictoryMessage() {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    // шаблонная строка, в которую мы передаем нужные переменные
    RESULT_TEXT.textContent = `Время: ${minutes}:${secs}. Количество попыток: ${movesCount}.`;
}

startGame()