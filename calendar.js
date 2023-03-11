const input = document.querySelector('.input');
const icon = document.querySelector('.icon');
const calendar = document.querySelector('.calendar');
const numbers = document.querySelectorAll('.number');

icon.onclick = () => {
    calendar.classList.toggle('hide');
};
document.body.onclick = (e) => {
    console.log(e.target);
    if (!e.target.classList.contains('icon')) {
        calendar.classList.add('hide');
    }
};

numbers.forEach((el) => {
    el.onfocus = () => {
        input.classList.add('border');
    };
    el.onblur = () => {
        input.classList.remove('border');
    };
});
