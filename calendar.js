const input = document.querySelector('.input');
const icon = document.querySelector('.icon');
const calendar = document.querySelector('.calendar');
const numbers = document.querySelectorAll('.number');

const yearVal = document.querySelector('.year-val');
const monthVal = document.querySelector('.month-val');

const year = document.querySelector('.year');
const month = document.querySelector('.month');
const up = document.querySelector('.up');
const down = document.querySelector('.down');

const now = new Date();

window.onload = () => {
    year.value = now.getFullYear();
    month.value = now.getMonth();
};

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

// В цикле вешаются обработчики события фокус и блюр, для изменения ширины бордера в инпуте
numbers.forEach((el) => {
    el.onfocus = () => {
        input.classList.add('border');
    };
    el.onblur = () => {
        input.classList.remove('border');
    };
});

//  Обработчик выбора года
year.oninput = (e) => {
    const val = e.target.value;
    if (val.length < 5) {
        yearVal.innerHTML = val;
    } else {
        e.target.value = 2023;
        yearVal.innerHTML = 2023;
    }
};

// Обработчик выбора месяца
month.onchange = (e) => {
    let val = e.target.value;
    console.log(val.length);
    if (+val > 8) {
        monthVal.innerHTML = +val + 1;
    } else {
        monthVal.innerHTML = '0' + (+val + 1);
    }
};

up.onclick = () => {
    console.log(month.value);
    if (month.value === '11') {
        month.value = '0';
    } else {
        month.value = +month.value + 1;
    }
    if (+month.value > 8) {
        monthVal.innerHTML = +month.value + 1;
    } else {
        monthVal.innerHTML = '0' + (+month.value + 1);
    }
};

down.onclick = () => {
    console.log(month.value);
    if (month.value === '0') {
        month.value = '11';
    } else {
        month.value = +month.value - 1;
    }
    if (+month.value > 8) {
        monthVal.innerHTML = +month.value + 1;
    } else {
        monthVal.innerHTML = '0' + (+month.value + 1);
    }
};
