import Counter from './counter.js';

const dropdownOn = (e) => {
    let dropdown = e.target.dataset.dropdown;
    
    if (!dropdown) return;
    let nested = e.target.nextElementSibling;
    let checkbox = e.target.classList.contains('checkbox-arrow_close');
    let calendar = e.target.classList.contains('input-calendar');

    if (checkbox) {
        e.target.classList.toggle('checkbox-arrow_open');
        nested.classList.toggle('nested_hide');
    }
    else if (calendar) {
        let calendar = e.target.closest('.calendar-wrapper');
        let nested = calendar.querySelector('.calendar');
        nested.classList.toggle('nested_hide');
    }
    else {
        nested.classList.toggle('nested_hide')
    }
}

const counter = new Counter();

document.addEventListener('click', dropdownOn);    
document.addEventListener('click', counter);

