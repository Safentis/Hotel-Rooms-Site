class Counter {
    handleEvent(e) {
        let method = 'on' + e.type[0].toUpperCase() + e.type.slice(1);
        this[method](e); 
    }
    onClick(e) {
        let target = e.target;
        let button = target.dataset.button;
        let curentElem = target.closest('li');
        let curentListSum = target.closest('ul');

        switch(button) {
            case 'minus':
                this.handleMinus(curentElem, curentListSum, target, button);
                break;
            case 'plus':
                this.handlePlus(curentElem, curentListSum, target, button);
                break;
            case 'apply-all':
                this.handleButtons(button, curentListSum, target);
                break;
            case 'clear-all':
                this.handleButtons(button, curentListSum, target);
                break;
            case 'set-minus':
                this.handleMinus(curentElem, curentListSum, target, button);
                break;
            case 'set-plus':
                this.handlePlus(curentElem, curentListSum, target, button);
                break;
            default:
                return;
        }
    }
    handleMinus(elem, sum, target, button) {

        if (+elem.dataset.value !== 0) {
            let category = target.nextElementSibling;
            let int = --elem.dataset.value;
            
            this.addClassButtons(category, int);

            category.textContent = int;
            +sum.dataset.count--;
            
            if (button === 'set-minus') {
                this.handleSetInput(elem, sum, target, button);
            }
        }

        return;
    }
    handlePlus(elem, sum, target, button) {
        
        if (+elem.dataset.value !== 5) {
            let category = target.previousElementSibling;
            let int = ++elem.dataset.value;

            this.addClassButtons(category, int);

            category.textContent = int;
            +sum.dataset.count++;

            if (button === 'set-plus') {
                this.handleSetInput(elem, sum, target, button);
            }
        }

        return;
    }
    handleButtons(button, sum, target) {
        let count = +sum.dataset.count;

        switch(button) {
            case 'apply-all':
                if (count === 0) return;
                this.handleApply(sum, target, count);
                break;
            case 'clear-all':
                this.handleClear(sum, target, count);
                break;
            default:
                return;
        }
    }
    handleApply(ul, target, count) {
        let input = ul.previousElementSibling;
        let clearBtn = ul.querySelector('button[data-button="clear-all"]');

        if (count === 1) {
            input.value = count + ' ' + 'гость';
        }
        else if (count >= 5 && count <= 30) {
            input.value = count + ' ' + 'гостей';
        }
        else {
            input.value = count + ' ' + 'гостя';
        }

        clearBtn.classList.remove('nested__clear-btn_hide');
    }
    handleClear(ul, target, count) {
        let input = ul.previousElementSibling;
        let counts = ul.querySelectorAll('.nested__item');
        let values = ul.querySelectorAll('.counter__value');
        let clearBtn = ul.querySelector('button[data-button="clear-all"]');
        let minuses = ul.querySelectorAll('button[data-button="minus"]');
        let setMinuses = ul.querySelectorAll('button[data-button="set-minus"]');

        counts.forEach(item => item.dataset.value = 0);
        values.forEach(item => item.textContent = 0);
        minuses.forEach(item => {
            item.classList.remove('counter__button_active');
            item.classList.add('counter__button_noactive');
        });
        setMinuses.forEach(item => {
            item.classList.remove('counter__button_active');
            item.classList.add('counter__button_noactive');
        });
        
        input.value = '';
        ul.dataset.count = 0;
        clearBtn.classList.add('nested__clear-btn_hide');
    }
    handleSetInput(elem, sum, target, button) {
        let count = sum.querySelectorAll('span[data-category]');
        let input = sum.previousElementSibling;
        let category = '';

        count.forEach((item, i) => {
            if (+item.textContent !== 0) {
                category += `${item.textContent} ${item.dataset.category}, `;
            }
        });

        if (category.length >= 20) {
            category = category.split('').slice(0, 20).join('') + '...';
        }


        input.value = category;
    }
    addClassButtons(category, int) {
        
        if (int === 5) {
            category.nextElementSibling.classList.add('counter__button_noactive');
            category.previousElementSibling.classList.remove('counter__button_noactive');
            category.previousElementSibling.classList.add('counter__button_active');
        }
        if (int === 0) {
            category.nextElementSibling.classList.add('counter__button_active');
            category.previousElementSibling.classList.remove('counter__button_active');
            category.previousElementSibling.classList.add('counter__button_noactive');
        }
        if (int > 0 && int < 5) {
            category.nextElementSibling.classList.add('counter__button_active');
            category.previousElementSibling.classList.add('counter__button_active');
            category.nextElementSibling.classList.remove('counter__button_noactive');
            category.previousElementSibling.classList.remove('counter__button_noactive');
        }
    }
}

export default Counter;