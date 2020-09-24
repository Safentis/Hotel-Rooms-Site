// const datePickerBody = document.getElementById('date-picker-body');
// const datePickerHead = document.getElementById('date-picker-head');

// const entry = document.getElementById('entry');
// const departure = document.getElementById('departure');

Date.prototype.curentMonthDays = function(curentYear, curentMonth) {
    return 32 - new Date(curentYear, curentMonth, 32).getDate();
}

function datePicker(body, head, year, month) {
    const weekDay = (date) => {
        let day = date.getDay();
        if (day == 0) {
            day = 7;
        }
        return day - 1;
    }
    
    const date = new Date(year, month);
    const days = date.curentMonthDays(year, month);

    const curentDay = new Date().getDate();
    const curentMonth = new Date().getMonth();
    const curentYear = new Date().getFullYear();

    const allMonth = [
        "Январь", "Февраль", "Март", 
        "Апрель", "Май", "Июнь", 
        "Июль", "Август", "Сентябрь", 
        "Октябрь", "Ноябрь", "Декабрь"
    ];

    let prevMonth = date.curentMonthDays(year, month - 1) - weekDay(date);
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

    for (let i = 0; i < weekDay(date); i++) {
        table += `
            <td data-entry="false" data-departure="false" class="other-cell-color">
                ${prevMonth += 1}
            </td>
        `;
    }
    for (let i = 1; i <= days; i++) {
        if (curentDay === i && curentMonth === month && curentYear === year) {
            table += `
                <td data-entry="false" data-departure="false" class="main-cell-color date-picker_active-cell">
                    ${i}
                </td>
            `;
        } else {
            table += `
                <td data-entry="false" data-departure="false" class="main-cell-color">
                    ${i}
                </td>
            `;
        }
        if (weekDay(date) % 7 == 6) {
            table += `
                <tr></tr>
            `;
        }
        date.setDate(date.getDate() + 1);
    }
    if (weekDay(date) != 0) {
        let count = 1;
        for (let i = weekDay(date); i < 7; i++) {
            table += `
                <td class="other-cell-color">
                    ${count++}
                </td>
            `;
        }
    }

    head.innerHTML = `
        <h4 class="date-picker__month-title">
            ${allMonth[month]} ${year}
        </h4>
    `;
    body.innerHTML = table;
}

function calendarManagement() {
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    return function({target}) {
        if (target.dataset.right) {
            if (month === 11) {
                month = -1;
                year += 1;
            }
            month++;
            datePicker(datePickerBody, datePickerHead, year, month);
        }
        if (target.dataset.left) {
            if (month === 0) {
                month = 12;
                year -= 1;
            }
            month--;
            datePicker(datePickerBody, datePickerHead, year, month);
        }
        return;
    }
}

// const calendarArrows = calendarManagement();

// function calendarReservation() {
//     // reservation    
// }


// datePicker(datePickerBody, datePickerHead, 2020, new Date().getMonth());
// document.addEventListener('click', calendarArrows);