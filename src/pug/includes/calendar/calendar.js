class Calendar {
    constructor() {
        this.entry = document.getElementById('arrival');
        this.departure = document.getElementById('departure');
        this.calendar = document.getElementById('calendar');
        this.allMonths = [
            "Январь", "Февраль", "Март", 
            "Апрель", "Май", "Июнь", 
            "Июль", "Август", "Сентябрь", 
            "Октябрь", "Ноябрь", "Декабрь"
        ];
        this.allDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
        this.valuesForInput = {};
    }
    getAllMonthDays(curentYear, curentMonth) {
        return 32 - new Date(curentYear, curentMonth, 32).getDate();
    }
    getFullCurentDate() {
        return {
            curentDay: new Date().getDate(),
            curentMonth: new Date().getMonth(),
            curentYear: new Date().getFullYear()
        }
    }
    getCurentMonthDay() {
        const { curentDay, curentMonth, curentYear } = this.getFullCurentDate();
        return curentNumber = new Date(
            curentYear, 
            curentMonth, 
            curentDay
        ).toLocaleDateString();
    }
    setCurentMonthDay(year, month, day) {
        return new Date(year, month, day).toLocaleDateString();
    }
    getCurentWeekDay(date) {
        let day = date.getDay();
        if (day == 0) {
            day = 7;
        }
        return day - 1;
    }
    setInputValues(ok) {
        if (ok) {
            this.entry.value = this.valuesForInput.entry;
            this.departure.value = this.valuesForInput.departure;
        } else {
            const curentNumber = this.getCurentMonthDay();
            const td = document.querySelector(`td[data-date="${curentNumber}"]`);
            
            this.entry.value = '';
            this.departure.value = '';

            for (let item in this.valuesForInput) {
                delete this.valuesForInput[item];
            }
            
            td.classList.add('calendar_curent-date');
        }
    }
    getAllCells() {
        return document.querySelectorAll('td');
    }
}
class CalendarRender {
    constructor() {
        this.datePickerBody = document.getElementById('calendar-body') || '';
        this.datePickerHead = document.getElementById('calendar-head') || '';
    }
    calendarViewRender(year, month) {
        const date = new Date(year, month);
        const days = calendarActions.getAllMonthDays(year, month);
        const { curentDay, curentMonth, curentYear } = calendarActions.getFullCurentDate();

        let prevMonth = calendarActions.getAllMonthDays(year, month - 1) - calendarActions.getCurentWeekDay(date);
        let table = `
            <tr class="week-names">
                <th class="week-names__item">пн</th>
                <th class="week-names__item">вт</th>
                <th class="week-names__item">ср</th>
                <th class="week-names__item">чт</th>
                <th class="week-names__item">пт</th>
                <th class="week-names__item">сб</th>
                <th class="week-names__item">вс</th>
            </tr>
            <tr>
        `;

        for (let i = 0; i < calendarActions.getCurentWeekDay(date); i++) {
            let prevMonthDate = new Date(year, month - 1, ++prevMonth).toLocaleDateString();
            if (calendarActions.getCurentMonthDay() === prevMonthDate) {
                table += `
                    <td class="other-cell-color calendar_curent-date" 
                        data-entry="false" 
                        data-departure="false"
                        data-date="${prevMonthDate}"
                    >
                        ${prevMonth}
                    </td>
                `;
            } else {
                table += `
                    <td class="other-cell-color" 
                        data-entry="false" 
                        data-departure="false"
                        data-date="${prevMonthDate}"
                    >
                        ${prevMonth}
                    </td>
                `;
            }
        }
        for (let i = 1; i <= days; i++) {
            let curentMonthDate = new Date(year, month, i).toLocaleDateString();
            
            if (curentDay === i && curentMonth === month && curentYear === year) {
                table += `
                    <td class="main-cell-color calendar_curent-date" 
                        data-entry="false" 
                        data-departure="false"
                        data-date="${curentMonthDate}"
                    >
                        ${i}
                    </td>
                `;
            } else {
                table += `
                    <td class="main-cell-color" 
                        data-entry="false" 
                        data-departure="false"
                        data-date="${curentMonthDate}" 
                    >
                        ${i}
                    </td>
                `;
            }
            if (calendarActions.getCurentWeekDay(date) % 7 == 6) {
                table += `
                    <tr></tr>
                `;
            }
            date.setDate(date.getDate() + 1);
        }
        if (calendarActions.getCurentWeekDay(date) != 0) {
            let count = 1;
    
            for (let i = calendarActions.getCurentWeekDay(date); i < 7; i++) {
                let nextMonthDate = new Date(year, month + 1, count).toLocaleDateString();
                if (calendarActions.getCurentMonthDay() === nextMonthDate) {
                    table += `
                        <td class="other-cell-color calendar_curent-date" 
                            data-entry="false" 
                            data-departure="false"
                            data-date="${nextMonthDate}"
                        >
                            ${count++}
                        </td>
                    `;
                } else {
                    table += `
                        <td class="other-cell-color" 
                            data-entry="false" 
                            data-departure="false"
                            data-date="${nextMonthDate}"
                        >
                            ${count++}
                        </td>
                    `;
                }

            }
        }
        this.datePickerHead.innerHTML = `
            <h2 class="calendar__month-title">
                ${calendarActions.allMonths[month]} ${year}
            </h2>
        `;
        this.datePickerBody.innerHTML = table;
    }
}
class CalendarActions extends Calendar {
    constructor() {
        super();
        this.curentMonth = new Date().getMonth();
        this.curentYear = new Date().getFullYear();
    }
    arrowLeftCalendarScroll() {
        if (this.curentMonth === 0) {
            this.curentMonth = 12;
            this.curentYear -= 1;
        }

        this.curentMonth--;
        calendarRender.calendarViewRender(this.curentYear, this.curentMonth);
    }
    arrowRightCalendarScroll() {
        if (this.curentMonth === 11) {
            this.curentMonth = -1;
            this.curentYear += 1;
        }

        this.curentMonth++;
        calendarRender.calendarViewRender(this.curentYear, this.curentMonth);
    }
    createDate(elem, target) {
        const dateBoolArray = [];
        const dateEntry = target.dataset.date.split('.');
        const dateToday = new Date().toLocaleDateString().split('.');

        dateEntry.map((item, i) => {
            if (+item > +dateToday[i]) {
                dateBoolArray.push(true);
            }
            if (+item === +dateToday[i]) {
                dateBoolArray.push(true);
            } else {
                dateBoolArray.push(false);
            }
        });

        if (
            (
                dateBoolArray[0] === true && dateBoolArray[1] === false && 
                dateBoolArray[2] === false && dateBoolArray[3] === true
            ) 
                || 
            (
                dateBoolArray[0] === false && dateBoolArray[1] === true && 
                dateBoolArray[2] === true
            )
                ||
            (
                dateBoolArray[0] === false && dateBoolArray[1] === false && 
                dateBoolArray[2] === true
            )
        ) return;

        this.valuesForInput[elem] = target.dataset.date;
        this.getAllCells().forEach(item => {
            item.dataset[elem] = true;
        });
        
        target.classList.add('calendar_active-cell');
        target.classList.remove('calendar_curent-date');
    }
    calcLineBetweenCells() {
        const betweenNumbers = [];

        this.getAllCells().forEach((item, i) => {
            if (item.classList.contains('calendar_active-cell')) {
                betweenNumbers.push(i);
            }
        });

        this.getAllCells().forEach((item, i) => {
            if (i > betweenNumbers[0] && i < betweenNumbers[1]) {
                item.classList.add('data-picker_active-between');
            }
            // Доделать уголки
            // if (i === betweenNumbers[0]) {
            //     item.classList.add('data-picker_active-entry');
            // }
            // if (i === betweenNumbers[1]) {
            //     item.classList.add('data-picker_active-entry');
            // }
        });
    }
    toCleareButton() {
        this.getAllCells().forEach(item => {
            item.dataset.entry = false;
            item.dataset.departure = false;
    
            if (
                item.classList.contains('calendar_active-cell') || 
                item.classList.contains('data-picker_active-between')
            ) {
                item.classList.remove('calendar_active-cell', 'data-picker_active-between');
            }
        });
        this.setInputValues(false);
    }
    toApplyButton() {
        const values = Object.keys(this.valuesForInput).length;
    
        if (values === 2) {
            this.setInputValues(true);
            this.calendar.classList.add('calendar_off')
        }

        return;
    }
    viewDatePicker() {
        this.calendar.classList.toggle('calendar_off');
    }
}
class Events {
    handleEvent(e) {
        let method = 'on' + e.type[0].toUpperCase() + e.type.slice(1);
        this[method](e);
    }
    onClick(e) {
        const attr = e.target.dataset;
        const target = e.target;
        
        if (attr.entry === 'false') {
            calendarActions.createDate('entry', target);
        } 
        else if (
            attr.departure === 'false' && 
            !target.classList.contains('calendar_active-cell')
        ) {
            calendarActions.createDate('departure', target);
            calendarActions.calcLineBetweenCells();
        } 


        if (target.id === 'arrival' || target.id === 'departure') {
            calendarActions.viewDatePicker();
        }
        if (attr.arrow === 'left') {
            calendarActions.arrowLeftCalendarScroll();
        }
        if (attr.arrow === 'right') {
            calendarActions.arrowRightCalendarScroll();
        }
        if (attr.button === 'apply-pick') {
            calendarActions.toApplyButton(e);
        }
        if (attr.button === 'cleare-pick') {
            calendarActions.toCleareButton(e);
        }

        return;
    }
}


const calendarActions = new CalendarActions();
const calendarRender = new CalendarRender();
const events = new Events();

calendarRender.calendarViewRender(
    new Date().getFullYear(), 
    new Date().getMonth()
);

document.addEventListener('click', events);