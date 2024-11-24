const GAME_NODE = document.querySelector("#game-board");
const VICTORY_TEXT = document.querySelector("#victory-message");
const RESULT_TEXT = document.querySelector("#result-message")
const START_GAME_BUTTON = document.querySelector("#new-game-button")

const TIMER_MINUTES = document.querySelector("#minutes");
const TRY_COUNT = document.querySelector("#try");

const TIMER_SECONDS = document.querySelector("#seconds");

const VISIBLE_CARD_CLASSNAME = 'visible';

// время за которое карточка будет поворачиваться
const CARD_FLIP_TIMEOUT_MS = 500;

const CARD_ELEMENTS = ["🍓", "🍉", "🍌", "🍏", "🥝", "🍇", "🍑", "🍒", "🫐", "🍍" , "🍋‍🟩", "🍋"];

const CARD_AMOUNT = 24;

// для перевернутых карточек проверка на их совпадение
let VISIBLE_CARDS = [];

let tryCount = 0;


let timerInterval;
let seconds = 0;
let isTimerRunning = false;

// при нажатии на кнопку начинается новая игра. Кнопке, которая находится в html файле
// задается вызов функции при ее нажатии
START_GAME_BUTTON.addEventListener("click", startGame)

function incrementMovesCount() {
    movesCount++;
    TRY_COUNT.textContent = movesCount;
}

// Запускаем таймер
function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

// Обновляем время в HTML
function updateDisplay() {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    TIMER_MINUTES.textContent = minutes;
    TIMER_SECONDS.textContent = secs;
}

// эта функция очищает игровое поле, а также выводит сообщение о выигрыше
function startGame() {
    seconds = 0;
    stopTimer();
    seconds = 0;
    TIMER_MINUTES.textContent = '00';
    TIMER_SECONDS.textContent = '00';
    movesCount = 0;
    TRY_COUNT.textContent = movesCount;

    [GAME_NODE, VICTORY_TEXT].forEach((node) => (node.innerHTML = ""));

    const CARD_VALUES = generateArray(CARD_ELEMENTS, CARD_AMOUNT);
    // console.log(CARD_VALUES)

    CARD_VALUES.forEach(renderCard);

    const renderedCards = document.querySelectorAll(".card");
    renderedCards.forEach((card) => card.classList.add(VISIBLE_CARD_CLASSNAME));

    setTimeout(() => {
        renderedCards.forEach(card => card.classList.remove(VISIBLE_CARD_CLASSNAME));
    }, CARD_FLIP_TIMEOUT_MS * 8)
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

    card.querySelector(".card-inner").addEventListener("transitionend", checkVictory);

    card.classList.add(VISIBLE_CARD_CLASSNAME);

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
    if (lastCard.textContent !== prelastCard.textContent){
        // если карточки не совпадают, мы удаляем их из массива и создаем новый массив
        // на основе VISIBLE_CARDS в котором остаются все элементы кроме двух последних, 
        // которые не совпали
        VISIBLE_CARDS = VISIBLE_CARDS.slice(0, VISIBLE_CARDS.length - 2);
        incrementMovesCount();
        setTimeout(() => {
            lastCard.classList.remove(VISIBLE_CARD_CLASSNAME);
            prelastCard.classList.remove(VISIBLE_CARD_CLASSNAME);
        }, CARD_FLIP_TIMEOUT_MS);
    }
}

function displayVictoryMessage() {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    RESULT_TEXT.textContent = `Время: ${minutes}:${secs}. Количество попыток: ${movesCount}.`;
}

startGame()