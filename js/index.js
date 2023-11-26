// элементы в DOM можно получить при помощи функции querySelector
const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input');
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/
const display = () => {
 
  // Очищаем fruitsList от вложенных элементов
  fruitsList.innerHTML = "";

  // Отрисовываем карточки для каждого фрукта
  for (let i = 0; i < fruits.length; i++) {
    const fruit = fruits[i];

    // Создаем новый элемент <li>
    const li = document.createElement("li");

    // Задаем класс для элемента <li>
    switch (fruit.color) {
      case "фиолетовый":
        li.className = "fruit__item fruit_violet";
        break;
      case "зеленый":
        li.className = "fruit__item fruit_green";
        break;
      case "розово-красный":
        li.className = "fruit__item fruit_carmazin";
        break;
      case "желтый":
        li.className = "fruit__item fruit_yellow";
        break;
      case "светло-коричневый":
        li.className = "fruit__item fruit_lightbrown";
        break;
      default:
        li.className = "fruit__item";
    }

    const div = document.createElement("div");
    div.className = "fruit__info"

    const index = document.createElement("div")
    index.innerHTML = "index: " + i;

    const h2 = document.createElement("div");
    h2.innerHTML = "kind: " + fruit.kind;
    h2.className = "fruit__name";

    const p1 = document.createElement("div");
    p1.innerHTML = "Цвет: " + fruit.color;

    const p2 = document.createElement("div");
    p2.innerHTML = "Вес: " + fruit.weight + " кг";
  
    li.appendChild(div);
    div.appendChild(index);
    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);
    fruitsList.appendChild(li);
  }
};

display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива при помощи алгоритма Фишера-Йетса
const shuffleFruits = () => {
  try {
  for (let i = fruits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fruits[i], fruits[j]] = [fruits[j], fruits[i]];
  }
} catch (err) {
  alert("Не удалось перемешать фрукты: ")
}
};
 
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {  
  const min = minWeight.value || 0;
  const max = maxWeight.value || 50; 
  console.log(min,max);
  return fruits.filter(item => item.weight>=min && item.weight<=max); 
 };
 
 filterButton.addEventListener('click', () => {
   const filteredArray=filterFruits();
   display(filteredArray);
 });

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = '-';

const comparationColor = (index1, index2) => {
  // сравнение двух элементов по длине строки в названии цвета
  return fruits[index1].color.length > fruits[index2].color.length;
};

const bubbleSort = (arr, comparation) => {
  const n = arr.length;
  // внешняя итерация по элементам
  for (let i = 0; i < n - 1; i++) {
    // внутренняя итерация для перестановки элемента в конец массива
    for (let j = 0; j < n - 1 - i; j++) {
      // сравниваем элементы
      if (comparation(j, j + 1)) {
        // делаем обмен элементов
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
};

function partition(arr, start, end) {
  // последний элемент берем за стержень
  const pivotValue = arr[end].color.length;
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i].color.length < pivotValue) {
      // меняем элементы местами
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // берем следующий элемент
      pivotIndex++;
    }
  }
  // перемещаем стержень в середину
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
  return pivotIndex;
};

function quickSortRecursive(arr, start, end) {
  // выход из рекурсии
  if (start >= end) {
    return;
  }

  // возвращение индекса стержня
  let index = partition(arr, start, end);

  // та же функция для правого и левого подмассивов
  quickSortRecursive(arr, start, index - 1);
  quickSortRecursive(arr, index + 1, end);
};

sortChangeButton.addEventListener('click', () => {
  //переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKindLabel.textContent == 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
});

sortActionButton.addEventListener('click', () => {
  const start = new Date().getTime();
  sortKindLabel.textContent == 'bubbleSort' ? bubbleSort(fruits, comparationColor) : quickSortRecursive(fruits, 0, fruits.length - 1);
  const end = new Date().getTime();
  display();
  sortTimeLabel.textContent = `${end - start} ms`;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});


