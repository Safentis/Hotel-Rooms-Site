// доделать эффект + - если счётчик равен нулю добавить соответствующий класс
// если не равен то убрать

class Counter {
    constructor() {
        this.counterValues = 0;
    }
    counter(elem, symbol) {
        let count = +elem.dataset.integer;
        let counterHTML = elem.querySelector('.counter__value');
        
        switch(symbol) {
            case 'plus':
                count += 1;
                elem.dataset.integer = count;
                this.counterValues++;
                this.setCountInHTML(counterHTML, count);
            break;
            case 'minus':
                count -= 1;
                elem.dataset.integer = count;
                this.counterValues--;
                this.setCountInHTML(counterHTML, count);
            break;
            default:
                return;
        }
    }
    setCountInHTML(counterHTML, count) {
        counterHTML.textContent = count;
    }
}
class ButtonsCounter {
    findElements(target) {
        const ul = target.closest('ul');
        return {
            input: ul.previousElementSibling,
            allCountHTML: ul.querySelectorAll('.counter__value'),
            allDatasetInteger: ul.querySelectorAll('ul[data-integer]'),
            cleare: ul.querySelector('.button-clear'),
            ul
        }
    }
    toClearCounter(target) {
        const { input, allCountHTML, allDatasetInteger, ul } = this.findElements(target);

        input.value = '';

        allCountHTML.forEach(count => count.textContent = '0');
        allDatasetInteger.forEach(ul => ul.dataset.integer = '0');

        target.classList.add('button-cleare_hide');
    }
    toApplyCounter(target) {
        const { input, allCountHTML, allDatasetInteger, cleare, ul } = this.findElements(target);
        let intagers = 0;
        
        allDatasetInteger.forEach(elem => {
            intagers += +elem.dataset.integer
        });
        
        input.value = intagers;
        cleare.classList.remove('button-cleare_hide');
        ul.classList.add('dropdown_hide');
    }
}
class EventsCounter {
    handleEvent(e) {
        let method = 'on' + e.type[0].toUpperCase() + e.type.slice(1);
        this[method](e);
    }
    onClick({target}) {
        if (!target.dataset.count) return;
            const elem = target.closest('ul[data-integer]');
                
        switch(target.dataset.count) {
            case 'plus':
                if (+elem.dataset.integer !== 99) {
                    counter.counter(elem, 'plus')
                }
            break;
            case 'minus':
                if (+elem.dataset.integer !== 0) {
                    counter.counter(elem, 'minus');
                }
            break;
            case 'clear':
                buttonsCounter.toClearCounter(target);
            break;
            case 'apply':
                buttonsCounter.toApplyCounter(target);
            break;
            default:
                return;
        }
    }
}

const counter = new Counter();
const buttonsCounter = new ButtonsCounter();
const eventsCounter = new EventsCounter();

document.addEventListener('click', eventsCounter);