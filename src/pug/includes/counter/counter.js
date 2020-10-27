class Counter {
    counter(elem, symbol, target) {
        let count = +elem.dataset.integer;
        let counterHTML = elem.querySelector('.counter__value');
        
        switch(symbol) {
            case 'plus':
                count += 1;
                elem.dataset.integer = count;
                this.setEffectInButtons(count, elem);   
                this.setCountInHTML(counterHTML, count);
            break;
            case 'minus':
                count -= 1;
                elem.dataset.integer = count;
                this.setEffectInButtons(count, elem);
                this.setCountInHTML(counterHTML, count);
            break;
            default:
                return;
        }
    }
    setCountInHTML(counterHTML, count) {
        counterHTML.textContent = count;
    }
    setEffectInButtons(count, elem) {
        if (count > 0 && count < 5) {
            elem.children[0].classList.remove('control_view_grey');
            elem.children[2].classList.remove('control_view_grey');
        }
        if (count === 0) {
            elem.children[0].classList.add('control_view_grey');
            elem.children[2].classList.remove('control_view_grey');
        }
        if (count === 5) {
            elem.children[0].classList.remove('control_view_grey');
            elem.children[2].classList.add('control_view_grey');
        }
    }
}
class ButtonsCounter {
    findElements(target) {
        const ul = target.closest('ul');
        return {
            input: ul.previousElementSibling,
            allCountHTML: ul.querySelectorAll('.counter__value'),
            allDatasetInteger: ul.querySelectorAll('ul[data-integer]'),
            cleare: ul.querySelector('button[data-count="clear"]'),
            ul
        }
    }
    toClearCounter(target) {
        const { input, allCountHTML, allDatasetInteger, ul } = this.findElements(target);
        
        input.value = '';
        allCountHTML.forEach(count => count.textContent = '0');
        allDatasetInteger.forEach(ul => {
            ul.dataset.integer = '0';
            counter.setEffectInButtons(0, ul);
        });

        target.classList.add('button-clear_hide');
    }
    toApplyCounter(target) {
        const { input, allCountHTML, allDatasetInteger, cleare, ul } = this.findElements(target);
        let peoples = 0;
        let peoplesType = '';


        allDatasetInteger.forEach(elem => {
            let count = +elem.dataset.integer;
            peoples += count;
            
            if (count > 0) {
                let type = elem.previousElementSibling.textContent.toLowerCase();
                peoplesType += `${count} ${type}, `;
            }
        });
        
        if (peoples === 0) return;
        
        let inputValueString = `${peoples} гостя, ${peoplesType}`;

        if (inputValueString.length > 10) {
            inputValueString = inputValueString.split('').slice(0, 19).join('');
            inputValueString += '...';
        }

        input.value = inputValueString;
        cleare.classList.remove('button-clear_hide');
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
                if (+elem.dataset.integer < 5) {
                    counter.counter(elem, 'plus', target);
                }
                break;
            case 'minus':
                if (+elem.dataset.integer !== 0) {
                    counter.counter(elem, 'minus', target);
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