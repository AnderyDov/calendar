const input = document.querySelector('.input');
const icon = document.querySelector('.icon');
const calendar = document.querySelector('.calendar');
const numbers = document.querySelectorAll('.number');

const yearVal = document.querySelector('.year-val');
const monthVal = document.querySelector('.month-val');
const dateVal = document.querySelector('.date-val');
const hourVal = document.querySelector('.hour-val');
const minVal = document.querySelector('.min-val');

const hourField = document.querySelector('.hour-field');
const minField = document.querySelector('.min-field');
const sliderHour = document.querySelector('.hour-slider');
const sliderMin = document.querySelector('.min-slider');

const year = document.querySelector('.year');
const month = document.querySelector('.month');
const up = document.querySelector('.up');
const down = document.querySelector('.down');

const delet = document.querySelector('.delet');
const now = document.querySelector('.now');

const currentTime = new Date();

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
    console.log(num, num * 43 - 129);
    selector.scrollTo({
        top: num * 43 - 129,
        left: 0,
        behavior: 'smooth',
    });
}

// Установка первоначальных значений
window.onload = () => {
    for (let i = 0; i < 24; i++) {
        let item = document.createElement('div');
        item.classList.add('item-hour', 'cl');
        if (currentTime.getHours() === i) {
            item.classList.add('current');
        }
        item.innerHTML = format(i);
        item.onclick = () => {
            hourVal.innerHTML = item.innerHTML;
            document.querySelectorAll('.item-hour').forEach((el) => {
                el.classList.remove('current');
            });
            item.classList.add('current');
            scrollTime(hourField, +item.innerHTML);
        };
        sliderHour.append(item);
    }
    for (let i = 0; i < 60; i++) {
        let item = document.createElement('div');
        item.classList.add('item-min', 'cl');
        if (currentTime.getMinutes() === i) {
            item.classList.add('current');
        }
        item.innerHTML = format(i);
        item.onclick = () => {
            minVal.innerHTML = item.innerHTML;
            document.querySelectorAll('.item-min').forEach((el) => {
                el.classList.remove('current');
            });
            item.classList.add('current');
            scrollTime(minField, +item.innerHTML);
        };
        sliderMin.append(item);
    }
    year.value = currentTime.getFullYear();
    month.value = currentTime.getMonth();
    scrollTime(hourField, currentTime.getHours());
    scrollTime(minField, currentTime.getMinutes());
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

// Обработчики выбора месяца
month.onchange = (e) => {
    monthVal.innerHTML = format(+e.target.value + 1);
};

up.onclick = () => {
    if (month.value === '11') {
        month.value = '0';
    } else {
        month.value = +month.value + 1;
    }
    monthVal.innerHTML = format(+month.value + 1);
};

down.onclick = () => {
    if (month.value === '0') {
        month.value = '11';
    } else {
        month.value = +month.value - 1;
    }
    monthVal.innerHTML = format(+month.value + 1);
};

// Обработчикик сброса значений к первоначальныйм
delet.onclick = () => {
    yearVal.innerHTML = 'гггг';
    monthVal.innerHTML = 'мм';
    dateVal.innerHTML = 'дд';
    hourVal.innerHTML = '--';
    minVal.innerHTML = '--';
};

// Обработчик выбора текущнго времени и даты
now.onclick = () => {
    yearVal.innerHTML = currentTime.getFullYear();
    monthVal.innerHTML = format(currentTime.getMonth() + 1);
    dateVal.innerHTML = format(currentTime.getDate());
    hourVal.innerHTML = format(currentTime.getHours());
    minVal.innerHTML = format(currentTime.getMinutes());

    document.querySelectorAll('.item-hour').forEach((el) => {
        el.classList.remove('current');
        if (format(currentTime.getHours()) === el.innerHTML) {
            el.classList.add('current');
            scrollTime(hourField, currentTime.getHours());
        }
    });

    document.querySelectorAll('.item-min').forEach((el) => {
        el.classList.remove('current');
        if (format(currentTime.getMinutes()) === el.innerHTML) {
            el.classList.add('current');
            scrollTime(minField, currentTime.getMinutes());
        }
    });
};
