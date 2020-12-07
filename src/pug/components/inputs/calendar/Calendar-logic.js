import { template, createCellHTML, controlsHtml } from './calendar-template';

class Calendar {
    constructor(id, options) {
        this.$element = document.querySelector(id);
        this.options = options;
        
        this.curentDate = new Date().toLocaleDateString();
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();
        this.entry = { flag: false, date: 0 };
        this.departure = { flag: false, date: 0 };

        this._render();
        this._events();
    }


    get $calendar() {
        return (this.$element === null) ? null : this.$element.querySelector('[data-main="calendar-main"]');
    }


    _render() {
        if (this.$element === null || this.$calendar === null) return;

        const { weekDays, months, buttonClearText, buttonApplyText, show } = this.options;

        this.$calendar.innerHTML = template(weekDays, buttonClearText, buttonApplyText, show);
        this.renderCalendarBody(this.year, this.month, months);

        (show) ? this.$calendar.classList.remove('calendar_hide') : '';
    }


    _events() {
        if (this.$element === null || this.$calendar === null) return;

        this.handleArrows = this.handleArrows.bind(this);
        this.handleCell = this.handleCell.bind(this);

        this.$calendar.addEventListener('click', this.handleArrows);
        this.$calendar.addEventListener('click', this.handleCell);
    }


    getDay(date) {
        let day = date.getDay();

        if (day === 0) {
            day = 7;
        }
        return day - 1;
    }


    getMonthNums(year, month) {
        return 32 - new Date(year, month, 32).getDate();
    }


    getDateCurentDay(year, month, day) {
        return new Date(year, month, day).toLocaleDateString();
    }


    renderCalendarBody(year, month, months) {
        const $monthElem = this.$element.querySelector('[data-month="month"]');
        const $daysElem = this.$element.querySelector('[data-body="body"]');


        let date = new Date(year, month);
        let prevDate = ((month - 1) !== -1) ? this.getMonthNums(year, month - 1) : this.getMonthNums(year, 11);
        let nextDate = 1;
        let html = '';
        

        // Рендер чисел предыдущего месяца
        prevDate -= this.getDay(date);
        
        for (let i = 0; i < this.getDay(date); i++) {
            let prevDateAttr = this.getDateCurentDay(year, month - 1, prevDate + 1);
            
            html += createCellHTML(++prevDate, 'calendar__other-num', prevDateAttr);
        }
        

        // Рендер чисел текущего месяца
        while (date.getMonth() == month) {
            let day = date.getDate();
            let curentDateAttr = this.getDateCurentDay(year, month, day);

            html += createCellHTML(day, 'calendar__num', curentDateAttr); 
            
            if (this.getDay(date) % 7 == 6) {
                html += '</tr><tr>';
            }

            date.setDate(day + 1);
        }


        // Рендер чисел следующего месяца
        let dayCount = 1;

        if (this.getDay(date) !== 0) {
            for (let i = this.getDay(date); i < 7; i++) {
                let nextDateAttr = this.getDateCurentDay(year, month + 1, dayCount++);

                html += createCellHTML(nextDate++, 'calendar__other-num', nextDateAttr);
            }
        }

        $monthElem.innerHTML = `${months[month]} ${year}`; 
        $daysElem.innerHTML = html;
    }


    handleArrows(e) {
        if (!e.target.dataset.arrow) return;
        
        const arrow = e.target.dataset.arrow;
        const { months } = this.options;        

        switch(arrow) {
            case 'prev':
                if (this.month === 0) {
                    this.year--;
                    this.month = 12;
                }        
                
                this.renderCalendarBody(this.year, --this.month, months);
                this.clearDate();

                break;
            case 'next':
                if (this.month === 11) {
                    this.year++;
                    this.month = -1;
                }
                
                this.renderCalendarBody(this.year, ++this.month, months);
                this.clearDate();

                break;
            default:
                return;
        }
    }


    handleCell(e) {
        
        let td = e.target.closest('td');

        if (this.entry.flag && this.departure.flag || td === null) return;
        
        if (this.entry.flag) {
            // если дата выезда будет меньше даты въезда
            // то маркер не отметит ячейку и не запишет
            // дату в объект this.departure
            if (!this.compareDate(td.dataset.date, true)) return;

            if (this.compareDate(td.dataset.date)) {
                this.departure.flag = true;
                this.departure.date = td.dataset.date;
                td.classList.add('calendar_active-date');
                this.handleBetweenCells(e);
            }

        } else {

            if (this.compareDate(td.dataset.date)) {
                this.entry.flag = true;
                this.entry.date = td.dataset.date;
                td.classList.add('calendar_active-date');
            }

            return;

        }
    }


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


    compareDate(date, flag = false) {
        let curentDate = flag ? this.entry.date.split('.') : this.curentDate.split('.');
        let selectDate = date.split('.');
        
        let [curentDay, curentMonth, curentYear] = curentDate;
        let [selectDay, selectMonth, selectYear] = selectDate;

        if (
            (selectDay >= curentDay) === true &&
            (selectMonth < curentMonth) === true &&
            (selectMonth === curentMonth) === false &&
            (selectYear > curentYear) === false
                ||
            (selectDay >= curentDay) === false &&
            (selectMonth < curentMonth) === false &&
            (selectMonth === curentMonth) === true &&
            (selectYear > curentYear) === false
                ||
            (selectDay >= curentDay) === false &&
            (selectMonth < curentMonth) === true &&
            (selectMonth === curentMonth) === false &&
            (selectYear > curentYear) === false
        ) 
        {
            return false;
        }
        else {
            return true;
        }
    }


    clearDate() {
        this.entry.date = 0;
        this.departure.date = 0;
        this.entry.flag = false;
        this.departure.flag = false;
    }
}

class CalendarWithInput extends Calendar {
    constructor(id, options) {
        super(id, options);
    }


    get $controls() {
        return (this.$element === null) ? null : this.$element.querySelector('[data-main="calendar-inputs"]');
    }


    get input() {
        if (this.$element === null) return;

        let $entry = undefined;
            $entry = this.$element.querySelectorAll('[data-dropdown="dropdown"]');

        return $entry;
    }


    set input(value) {

        if (value === '') {
            this.input.forEach(item => item.value = value);
        }
        else {
            let { entry, departure } = value;
            this.input[0].value = entry;
            this.input[1].value = departure;
        }
    }


    _render() {
        if (this.$element === null || this.$calendar === null || this.$controls === null) return;

        super._render();
        const $controls = this.$element.querySelector('[data-main="calendar-inputs"]');
        const { input } = this.options;
        const { placeholder, firstId, secondId, firstLabel, secondLabel, double } = input;

        $controls.innerHTML = controlsHtml(placeholder, firstId, secondId, firstLabel, secondLabel, double);
    }


    _events() {
        super._events();
        this.calendarToggle = this.calendarToggle.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleApply = this.handleApply.bind(this);
        
        
        if (this.$element === null || this.$calendar === null) return;

        this.input.forEach(input => input.addEventListener('click', this.calendarToggle));
        this.$calendar.addEventListener('click', this.handleClear);
        this.$calendar.addEventListener('click', this.handleApply);
    }


    // TOGGLE
    calendarToggle() {
        this.$calendar.classList.contains('calendar_hide') ? this.open() : this.close();
    }


    open() {
        this.$calendar.classList.remove('calendar_hide');
    }


    close() {
        this.$calendar.classList.add('calendar_hide');
    }
    // TOGGLE-END

    handleClear(e) {
        if (e.target.dataset.button !== 'clear-all') return; 

        let entry = this.$element.querySelector(`td[data-date="${this.entry.date}"]`);
        let departure = this.$element.querySelector(`td[data-date="${this.departure.date}"]`);

        if (this.entry.date) {
            entry.classList.remove('calendar_active-date');
            entry.classList.remove('entry-edge', 'departure-edge');
        }

        if (this.entry.date && this.departure.date) {
            departure.classList.remove('calendar_active-date');
            departure.classList.remove('departure-edge', 'entry-edge');
            
            let betweenCells;
            
            betweenCells = this.$element.querySelectorAll('.calendar_grey-line');
            betweenCells.forEach(item => item.classList.remove('calendar_grey-line'));
        }

        this.input = '';
        this.clearDate();
    }

    handleApply(e) {

        if (e.target.dataset.button !== 'apply-all' || (this.entry.date && this.departure.date) === 0) return;
        
        this.input = { 
            entry: this.entry.date, 
            departure: this.departure.date
        };
    }
}

export { Calendar, CalendarWithInput };