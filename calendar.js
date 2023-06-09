// ТЕЛУЩИЙ ОБЪЕКТ ВРЕМЕНИ
let currentTime = new Date();

// НАЧАЛЬНОЕ СОСТОЯНИЕ КОПОНЕНТА
let yearState = currentTime.getFullYear();
let monthState = currentTime.getMonth();
let dateState = currentTime.getDate();
let hourState = currentTime.getHours();
let minState = currentTime.getMinutes();
let choosedState = null;

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// ЭЛЕМЕНТЫ
// Основные элементы для взаимодействия
const input = document.querySelector('.input');
const icon = document.querySelector('.icon');
const calendar = document.querySelector('.calendar');
const numbers = document.querySelectorAll('.number');

// Внутренние элементы кастомного инпута
const yearVal = document.querySelector('.year-val');
const monthVal = document.querySelector('.month-val');
const dateVal = document.querySelector('.date-val');
const hourVal = document.querySelector('.hour-val');
const minVal = document.querySelector('.min-val');

// Поля показа времени и реализация прокрутки,  внутри календаря
const hourField = document.querySelector('.hour-field');
const minField = document.querySelector('.min-field');
const sliderHour = document.querySelector('.hour-slider');
const sliderMin = document.querySelector('.min-slider');

// Элементы для вывода значений даты и времени, внутри календаря
const year = document.querySelector('.year');
const month = document.querySelector('.month');
const dateTable = document.querySelector('.date-table');
const up = document.querySelector('.up');
const down = document.querySelector('.down');

// Кнопки управления сбросом и выводом текущего времени
const delet = document.querySelector('.delet');
const now = document.querySelector('.now');

// ОБРАБОТЧИКИ
// Получение последнего дня прошдого месяца
function getlastDateLastMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// Получение последнего дня текущего месяца
function getlastDateCurrentMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// Получение дня неделм последнего дня прошлого месяца
function geLastDayLastMonth(year, month) {
    return new Date(year, month, 0).getDay();
}

// Форматировщик числа
function format(num) {
    if (num < 10) {
        return (num = '0' + num);
    } else {
        return num.toString();
    }
}

// Обработчик скрола для показа выбранного времени
function scrollTime(selector, num) {
    selector.scrollTo({
        top: num * 43 - 129,
        left: 0,
        behavior: 'smooth',
    });
}

// Обработчикик сброса значений к первоначальныйм
function defaultValues() {
    yearVal.innerHTML = 'гггг';
    monthVal.innerHTML = 'мм';
    dateVal.innerHTML = 'дд';
    hourVal.innerHTML = '--';
    minVal.innerHTML = '--';
}

// РЕНДЕРИНГ
// Отрисовка таблици календаря
function render(year, month) {
    dateTable.innerHTML = `<div class="cell cl">в</div>
    <div class="cell cl">п</div>
    <div class="cell cl">в</div>
    <div class="cell cl">с</div>
    <div class="cell cl">ч</div>
    <div class="cell cl">п</div>
    <div class="cell cl">с</div>`;

    let arr = [];
    // Получение последних дней прошлого месяца
    for (let i = 0; i <= geLastDayLastMonth(year, month); i++) {
        arr.unshift((getlastDateLastMonth(year, month) - i).toString());
    }
    // Получение дней текущего месяца
    for (let i = 1; i <= getlastDateCurrentMonth(year, month); i++) {
        arr.push(i);
    }
    // Получение первыхдней следующего месяца
    let num = 42 - arr.length;
    for (let i = 1; i <= num; i++) {
        arr.push(i.toString());
    }
    // Отрисовка ячеек календаря
    for (let i of arr) {
        let cell = document.createElement('div');
        cell.classList.add('cl');
        cell.innerHTML = i;
        if (typeof i === 'number') {
            cell.classList.add('cell');
            cell.onclick = () => {
                chooseDate(i);
            };
            if (choosedState === i) {
                cell.classList.add('choosed');
            }
        } else {
            cell.classList.add('noclick');
        }
        if (currentTime.getDate() === i) {
            cell.classList.add('current');
        }
        dateTable.append(cell);
    }
    writeValues();
    writeCalendar();
}

// Обработчик изменения текстового поля
function edit(e, type) {
    console.log(e);
    if (!nums.includes(e.data)) {
        e.target.innerHTML = '';
        return false;
    }
    if (e.target.innerHTML.length > 4) {
        e.target.innerHTML = 2023;

        return false;
    }
    switch (type) {
        case 'year':
            yearState = e.target.innerHTML;
            break;
        case 'month':
            monthState = e.target.innerHTML;
            break;
        case 'date':
            dateState = e.target.innerHTML;
            break;
        case 'hour':
            hourState = e.target.innerHTML;
            break;
        case 'min':
            minState = e.target.innerHTML;
            break;

        default:
            break;
    }
}

// УСТАНОВКА НАЧАЛЬНЫХ ЗНАЧЕНИЙ
window.onload = () => {
    // В цикле вешаются обработчики события фокус и блюр, для изменения ширины бордера в инпуте
    numbers.forEach((el) => {
        el.onfocus = () => {
            input.classList.add('border');
        };
        el.onblur = () => {
            input.classList.remove('border');
        };
    });
    for (let i = 0; i < 24; i++) {
        let item = document.createElement('div');
        item.classList.add('item-hour', 'cl');
        if (hourState === i) {
            item.classList.add('current');
        }
        item.innerHTML = format(i);
        item.onclick = () => {
            hourState = i;
            document.querySelectorAll('.item-hour').forEach((el) => {
                el.classList.remove('current');
            });
            item.classList.add('current');
            scrollTime(hourField, +item.innerHTML);
            writeValues();
        };
        sliderHour.append(item);
    }
    for (let i = 0; i < 60; i++) {
        let item = document.createElement('div');
        item.classList.add('item-min', 'cl');
        if (minState === i) {
            item.classList.add('current');
        }
        item.innerHTML = format(i);
        item.onclick = () => {
            minState = i;
            document.querySelectorAll('.item-min').forEach((el) => {
                el.classList.remove('current');
            });
            item.classList.add('current');
            scrollTime(minField, +item.innerHTML);
            writeValues();
        };
        sliderMin.append(item);
    }
    year.value = yearState;
    month.value = monthState;

    yearVal.oninput = (e) => edit(e, 'year');
    monthVal.oninput = (e) => edit(e, 'month');
    dateVal.oninput = (e) => edit(e, 'date');
    hourVal.oninput = (e) => edit(e, 'hour');
    minVal.oninput = (e) => edit(e, 'min');

    render(yearState, monthState);
    defaultValues();
};

// фУНКЦИОНАЛ
// Скрывает и показывает календарь
icon.onclick = () => {
    calendar.classList.toggle('hide');
};

// Скрывает календарь при клике на любой области кроме иконки календаря
document.body.onclick = (e) => {
    if (!e.target.classList.contains('cl')) {
        calendar.classList.add('hide');
    }
};

//  Обработчик выбора года
year.oninput = (e) => {
    const val = e.target.value;
    if (val.length < 5) {
        yearState = +val;
        yearVal.innerHTML = val;
    } else {
        e.target.value = 2023;
        yearState = 2023;
        yearVal.innerHTML = 2023;
    }
    render(yearState, monthState);
};

// Обработчики выбора месяца
month.onchange = (e) => {
    monthVal.innerHTML = format(+e.target.value + 1);
    monthState = +e.target.value;
    render(yearState, monthState);
};

up.onclick = () => {
    if (month.value === '11') {
        month.value = '0';
        monthState = 0;
        ++yearState;
    } else {
        ++month.value + 1;
        ++monthState;
    }
    render(yearState, monthState);
};

down.onclick = () => {
    if (month.value === '0') {
        month.value = '11';
        monthState = 11;
        --yearState;
    } else {
        --month.value + 1;
        --monthState;
    }
    render(yearState, monthState);
};
// Сброс значения на показанной панели
delet.onclick = defaultValues;

// Обработчик установки значений для кастомного инпута
function writeValues() {
    yearVal.innerHTML = yearState;
    monthVal.innerHTML = format(monthState + 1);
    dateVal.innerHTML = format(dateState);
    hourVal.innerHTML = format(hourState);
    minVal.innerHTML = format(minState);
}
// Обработчик изменения в календаре
function writeCalendar() {
    month.value = monthState.toString();
    year.value = yearState;
    scrollTime(hourField, hourState);
    scrollTime(minField, minState);
}

// Обработчик выбора текущнго времени и даты
now.onclick = () => {
    yearState = new Date().getFullYear();
    monthState = new Date().getMonth();
    dateState = new Date().getDate();
    hourState = new Date().getHours();
    minState = new Date().getMinutes();

    document.querySelectorAll('.item-hour').forEach((el) => {
        el.classList.remove('current');
        if (el.innerHTML === format(hourState)) {
            el.classList.add('current');
        }
    });
    document.querySelectorAll('.item-min').forEach((el) => {
        el.classList.remove('current');
        if (el.innerHTML === format(minState)) {
            el.classList.add('current');
        }
    });

    render(yearState, monthState);
};

// Обработчик выбора даты
function chooseDate(date) {
    dateState = date;
    choosedState = date;
    render(yearState, monthState);
}

// Обработчик копировать данные
function unsecuredCopyToClipboard(text) {
    const s = document.querySelector('.git');
    const textArea = document.createElement('textarea');
    textArea.value = text;
    s.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    s?.removeChild(textArea);
}

document.querySelector('.copy').onclick = () => {
    console.log('work');
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard
            .writeText(
                `${yearState}.${monthState}.${hourState}, ${hourState}:${minState}`,
            )
            .catch((err) => {
                console.log('Something went wrong', err);
            });
    } else {
        unsecuredCopyToClipboard(
            `${yearState}.${monthState}.${hourState}, ${hourState}:${minState}`,
        );
    }
};
