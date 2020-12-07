import { template } from './dropdown-template.js';

class Select {
    constructor(id, options) {
        this.$element = document.querySelector(`${id}`);
        this.options = options;
        this.count = 0;
        this._render()
        this._events()
    }
    

    // Геттер nested возвращает неупорядоенный список
    get $nested() {
        return this.$element.querySelector('.nested');
    }
    
    
    // Геттер input возвращает поле ввода
    get $input() {
        return this.$element.querySelector('.dropdown__input');
    }


    get $label() {
        return this.$element.querySelector('.dropdown__label');
    }


    // Метод _render() передаёт функции template 
    // данные(data) после чего функция template возвращает 
    // разметку и вставляет html на страницу
    // так же данный метод выставляет placeholder у input
    _render() {
        const { data, placeholder, state, label, buttons } = this.options;
        this.$nested.innerHTML = template(data);
        this.$input.placeholder = placeholder;
        this.$label.textContent = label;
        
        data.forEach(item => this.count += +item.count);

        if (buttons === false) {
            this.$input.value = this.allCountValues;
        }

        state ? this.open() : this.close();
    }


    // Метод _events() вешает события на документ
    _events() {
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleCount = this.handleCount.bind(this);

        this.$input.addEventListener('click', this.handleDropdown);
        this.$element.addEventListener('click', this.handleCount);
    }
    

    // Метод open расскрывает вложенный список
    open() {
        this.$nested.classList.remove('nested_hide');
    }
    
    
    // Метод close закрывает вложенный список
    close() {
        this.$nested.classList.add('nested_hide');
    }


    // Метод handleDropdown обрабатывает события открытия и закрытия dropdown
    handleDropdown(e) {

        if (this.$nested.classList.contains('nested_hide')) {
            this.open();
        } else {
            this.close();
        }
    }


    // Метод handleCount обрабатывает события клика по кнопка increment и decrement
    handleCount(e) {
        let target = e.target;
        
        if (
            target.dataset.button === 'plus' || 
            target.dataset.button === 'minus'
        ) {

            let button = target.dataset.button;
            let item = target.closest('li');
            let list = target.closest('ul');
            
            switch (button) {
                case "plus":
                    this.increment = item;
                    break;
                case "minus":
                    this.decrement = item;
                    break;
                default:
                    return;
            }

            list.dataset.count = this.count;
        }
       
    }


    set countValue(item) {
        let countValue = item.querySelector('.counter__value');
        countValue.textContent = item.dataset.value;
    }


    get allCountValues() {
        let counts = this.$element.querySelectorAll('.counter__value');
        let values = '';

        counts.forEach(item => {
            if (+item.textContent > 0) {
                values += `${item.textContent.trim()} ${item.dataset.category.trim()}, `;
            }
        });

        if (values.length >= 20) {
            values = values.split('').slice(0, 20).join('') + '...';
        }

        return values;
    }

    set increment(item) {
        if (item.dataset.value < 5) {
            const { buttons } = this.options;
            
            ++item.dataset.value;
            this.count++;
            this.countValue = item;
            
            if (buttons === false) {
                this.$input.value = this.allCountValues;
            }
        }
    }

    set decrement(item) {
        if (item.dataset.value > 0) {
            const { buttons } = this.options;
    
            --item.dataset.value;
            this.count--;
            this.countValue = item;
            
            if (buttons === false) {
                this.$input.value = this.allCountValues;
            }
        }
    }
}

class SelectWithButtons extends Select {
    constructor(id, element) {
        super(id, element);
    }


    _render() {
        super._render();
        const { data, buttons } = this.options;
        this.$nested.innerHTML = template(data, buttons);
        
        this.handleApply();
    }


    _events() {
        super._events();
        this.handleButtons = this.handleButtons.bind(this);
        this.$element.addEventListener('click', this.handleButtons);
    }


    handleButtons(e) {
        let target = e.target;
        
        if (
            target.dataset.button === 'clear-all' || 
            target.dataset.button === 'apply-all'
        ) {

            let button = target.dataset.button;
            
            switch (button) {
                case "clear-all":
                    this.handleClear();
                    break;
                case "apply-all":
                    this.handleApply();
                    break;
                default:
                    return;
            }
        }
    }


    get $buttonClear() {
        return this.$element.querySelector('[data-button="clear-all"]');
    }

    
    handleClear() {
        this.$input.value = '';
        this.$buttonClear.classList.add('nested__clear-btn_hide');
    }


    handleApply() {
        let count = +this.count;
        if (count === 0) return;

        this.$input.value = `${count} гостя`;
        this.$buttonClear !== null 
            ? this.$buttonClear.classList.remove('nested__clear-btn_hide') 
            : false;
    }
}

const idSelectsWithNoBtn = [
    { 
        id : '#ui-options1', placeholder: 'Особенности', buttons: false, state : false, label: 'dropdown',
        data: [
            {category: "Спальни", count: 2},
            {category: "Кровати", count: 2},
            {category: "Ванные комнаты", count: 0}
        ]
    }, 
    { 
        id : '#ui-options2', placeholder: 'Особенности', buttons: false, state : true, label: 'dropdown',
        data: [
            {category: "Спальни", count: 0},
            {category: "Кровати", count: 0},
            {category: "Ванные комнаты", count: 0}
        ]
    }, 
    { 
        id : '#beds-filter', placeholder: 'Особенности', buttons: false, state : false, label: 'удобства номера',
        data: [
            {category: "Спальни", count: 2},
            {category: "Кровати", count: 2},
            {category: "Ванные комнаты", count: 0}
        ]
    }, 
]


const idSelectsWithBtn = [
    { 
        id : '#ui-peoples1', placeholder: 'Сколько гостей', buttons: true, state : false, label: 'dropdown',
        data: [
            {category: "Взрослые", count: 0},
            {category: "Дети", count: 0},
            {category: "Младенцы", count: 0}
        ]
    }, 
    { 
        id : '#ui-peoples2', placeholder: 'Сколько гостей', buttons: true, state : true, label: 'dropdown',
        data: [
            {category: "Взрослые", count: 0},
            {category: "Дети", count: 0},
            {category: "Младенцы", count: 0}
        ]
    }, 
    { 
        id : '#ui-peoples3', placeholder: 'Сколько гостей', buttons: true, state : true, label: 'dropdown',
        data: [
            {category: "Взрослые", count: 1},
            {category: "Дети", count: 2},
            {category: "Младенцы", count: 0}
        ]
    }, 
    { 
        id : '#guests', placeholder: 'Сколько гостей', buttons: true, state : false, label: 'Гости',
        data: [
            {category: "Спальни", count: 0},
            {category: "Кровати", count: 0},
            {category: "Ванные комнаты", count: 0}
        ]
    }, 
    { 
        id : '#guests-card-info', placeholder: 'Сколько гостей', buttons: true, state : false, label: 'Гости',
        data: [
            {category: "Спальни", count: 0},
            {category: "Кровати", count: 0},
            {category: "Ванные комнаты", count: 0}
        ]
    }, 
    { 
        id : '#guests-filter', placeholder: 'Сколько гостей', buttons: true, state : false, label: 'Гости',
        data: [
            {category: "Спальни", count: 0},
            {category: "Кровати", count: 0},
            {category: "Ванные комнаты", count: 0}
        ]
    }, 
];

idSelectsWithNoBtn.forEach(({id, placeholder, data, buttons, label, state}) => {
    if (document.querySelector(`${id}`) === null) return;

    new Select(id, {
        placeholder: placeholder,
        data: data,
        label: label,
        buttons: buttons,
        state: state
    });
});

idSelectsWithBtn.forEach(({id, placeholder, data, buttons, label, state}) => {
    if (document.querySelector(`${id}`) === null) return;

    new SelectWithButtons(id, {
        placeholder: placeholder,
        data: data,
        label: label,
        buttons: buttons,
        state: state
    });
});