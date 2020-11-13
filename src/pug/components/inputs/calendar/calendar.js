'use strict';

class Calendar {
    constructor() {
        this.tbody = document.querySelectorAll('[data-body="body"]');
        this.thead = document.querySelectorAll('[data-month="month"]');
        this.months = [
            'Январь', 'Февраль', 'Март',
            'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь',
        ];
    }
    /**
     * Метод getDay(date) принимает в качестве аргумента день недели (new Date().getDay()),
     * если этот день воскресение, присваивает возвращаемому значению номер 7,
     * В остальных случаях возвращает номер дня недели (-1)
     */
    getDay(date) {
        let day = date.getDay();

        if (day === 0) day = 7;
        return day - 1;
    }
    /**
     * Метод getMonthNums(year, month) принимает в качестве аргументов year = год и month = месяц,
     * и возвращает количество дней в месяце
     */
    getMonthNums(year, month) {
        return 32 - new Date(year, month, 32).getDate();
    }
    /**
     * Метод createCellHTML(value, classValue) принимает в качестве аргументов value = день месяца,
     * classValue = класс для ячейки и возвращает строку c HTML ячейки таблицы
     */
    createCellHTML(value, classValue, date) {
        let curentDate = new Date().toLocaleDateString();
        
        if (curentDate == date) {
            return `
                <td class="calendar__cell ${classValue} calendar__curent-date" data-date="${date}">
                    ${value}
                </td>
            `;
        }
        else {
            return `
                <td class="calendar__cell ${classValue}" data-date="${date}">
                    ${value}
                </td>
            `;
        }
    }
    createDate(year, month, day) {
        return new Date(year, month, day).toLocaleDateString();
    }
    /**
     * Метод render(year, month) принимает дату в качестве аргумента, year = год и month = месяц
     * генерирует на основании полученных данных год, месяц и дни
     * (по мимо текущего, дни прошлого и будущего месяца)
     */
    render(year, month) {
        let date = new Date(year, month);
        let prevDate = ((month - 1) !== -1) ? this.getMonthNums(year, month - 1) : this.getMonthNums(year, 11);
        let nextDate = 1;
        let html = '';

        // Рендер чисел предыдущего месяца
        prevDate -= this.getDay(date);
        
        for (let i = 0; i < this.getDay(date); i++) {
            let prevDateAttr = this.createDate(year, month - 1, prevDate + 1);
            
            html += this.createCellHTML(++prevDate, 'calendar__other-num', prevDateAttr);
        }
        
        // Рендер чисел текущего месяца
        while (date.getMonth() == month) {
            let day = date.getDate();
            let curentDateAttr = this.createDate(year, month, day);

            html += this.createCellHTML(day, 'calendar__num', curentDateAttr); 
            
            if (this.getDay(date) % 7 == 6) {
                html += '</tr><tr>';
            }
    
            date.setDate(day + 1);
        }

        // Рендер чисел следующего месяца
        let dayCount = 1;

        if (this.getDay(date) !== 0) {
            for (let i = this.getDay(date); i < 7; i++) {
                let nextDateAttr = this.createDate(year, month + 1, dayCount++);

                html += this.createCellHTML(nextDate++, 'calendar__other-num', nextDateAttr);
            }
        }

        this.tbody.forEach(item => item.innerHTML = html);
        this.thead.forEach(item => item.innerHTML = `${this.months[month]} ${year}`);
    }
}

class Handlers {
    constructor() {
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();
        this.curentDate = new Date().toLocaleDateString();
        this.entry = {flag: false, date: 0};
        this.departure = {flag: false, date: 0};
        this.entryInput = undefined;
        this.departureInput = undefined;
    }
    handleArrows(arrows) {
        switch(arrows) {
            case 'prev':
                if (this.month === 0) {
                    this.year--;
                    this.month = 12;
                }        
                
                calendar.render(this.year, --this.month);
                this.clearDate();

                break;
            case 'next':
                if (this.month === 11) {
                    this.year++;
                    this.month = -1;
                }
                
                calendar.render(this.year, ++this.month);
                this.clearDate();

                break;
            default:
                return;
        }
    }

    /**
     * Метод handleCell(e, td) принимает в качестве аргументов
     * объект события (e) и td (ячейка таблицы с датой).
     * handleCell обрабатывает клики по ячейкам календаря, 
     * добавляет класс 'calendar_active-date' к ячейке, и записывает выбранную дату в объекты
     * this.entry и this.departure соответственно.
     * Если даты выбраны запрещает выставлять новые значения.
     * Так же этот метод вызывает другой метод this.handleBetweenCells(e) который
     * обрабатывает промежутки между выбранными ячейками
     */  
    handleCell(e, td) {
        if (this.entry.flag && this.departure.flag) return;

        if (this.entry.flag) {
            this.departure.flag = true;
            this.departure.date = td.dataset.date;
            this.compareDate(this.departure.date);
            td.classList.add('calendar_active-date');
            this.handleBetweenCells(e);
        } else {
            this.entry.flag = true;
            this.entry.date = td.dataset.date;
            this.compareDate(this.entry.date);
            td.classList.add('calendar_active-date');
        }
    }
    /**
     * Метод handleCleare
     */  
    handleClear(e) {
        let calendar = e.target.closest('.calendar-wrapper');
        let entry = calendar.querySelector(`td[data-date="${this.entry.date}"]`);
        let departure = calendar.querySelector(`td[data-date="${this.departure.date}"]`);

        if (this.entry.date) {
            entry.classList.remove('calendar_active-date', 'entry-edge');
        }

        if (this.departure.date) {
            let betweenCells;
            
            departure.classList.remove('calendar_active-date', 'departure-edge');
            betweenCells = calendar.querySelectorAll('.calendar_grey-line');
            betweenCells.forEach(item => item.classList.remove('calendar_grey-line'));
        }

        this.clearDate();

        if ((this.entryInput || this.departureInput) === undefined) return;

        this.entryInput.value = '';
        this.departureInput.value = '';
    }
    /**
     * Метод handleApply(e)
     */
    handleApply(e) {
        let calendar = e.target.closest('.calendar-wrapper');
        this.entryInput = calendar.querySelector('#entry');
        this.departureInput = calendar.querySelector('#departure');

        if ((this.entry.date && this.departure.date) === 0) return;

        this.entryInput.value = this.entry.date;
        this.departureInput.value = this.departure.date;
    }
    /**
     * Метод handleBetweenCells(e)
     */
    handleBetweenCells(e) {
        let calendar = e.target.closest('.calendar-wrapper');
        let allCells = calendar.querySelectorAll('td[data-date]');

        let betweenCellsNums = [];

        allCells.forEach((item, i) => {
            if (item.classList.contains('calendar_active-date')) {
                betweenCellsNums.push(i);
            }

            return;
        });

        allCells.forEach((item, i) => {
            if (i === betweenCellsNums[0]) {
                item.classList.add('entry-edge');
            }
            if (i === betweenCellsNums[1]) {
                item.classList.add('departure-edge');
            }
            if (i > betweenCellsNums[0] && i < betweenCellsNums[1]) {
                item.classList.add('calendar_grey-line');
            }
    
            return;
        });
    }
    /**
     * clearDate()
     */
    clearDate() {
        this.entry.date = 0;
        this.departure.date = 0;
        this.entry.flag = false;
        this.departure.flag = false;
    }
    compareDate(date) {
        
    }
}

class Events {
    handleEvent(e) {
        let method = `on${e.type[0].toUpperCase() + e.type.slice(1)}`;
        this[method](e);        
    }
    onClick(e) {
        const target = e.target;

        if (!target.closest('.calendar-wrapper')) return;

        if (target.dataset.arrow) {
            let arrows = target.dataset.arrow;
            handlers.handleArrows(arrows);
        }
        if (target.closest('td[data-date]')) {
            let td = target.closest('td[data-date]')
            handlers.handleCell(e, td);
        }
        if (target.classList.contains('calendar__clear')) {
            handlers.handleClear(e);
        }
        if (target.classList.contains('calendar__apply')) {
            handlers.handleApply(e);
        }
            
        return;
    }
}

const calendar = new Calendar();
const handlers = new Handlers();
const events = new Events();

calendar.render(new Date().getFullYear(), new Date().getMonth())

document.addEventListener('click', events);