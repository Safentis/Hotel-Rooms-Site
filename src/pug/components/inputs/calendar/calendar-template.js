function template(weekDays, buttonClearText, buttonApplyText) {
    let htmlWeekDays = ``;

    weekDays.forEach(item => htmlWeekDays += `<th class="calendar__days-item">${item}</th>`);

    return `
        <span class="calendar__arrow-prev" data-arrow="prev"></span>
        <span class="calendar__arrow-next" data-arrow="next"></span>
        <div class="calendar__date">
            <p class="calendar__month" data-month="month"></p>
        </div>
        <table class="calendar__table">
            <thead class="calendar__header">
                <tr class="calendar__days" data-days="weekdays">
                    ${htmlWeekDays}
                </tr>
            </thead>
            <tbody class="calendar__body" data-body='body'>

            </tbody>
        </table>
        <div class="calendar__buttons">
            <button class="button-select calendar__clear" type="button" data-button="clear-all">
                ${buttonClearText}
            </button> 
            <button class="button-select calendar__apply" type="button" data-button="apply-all">
                ${buttonApplyText}
            </button> 
        </div>
    `;
}

function createCellHTML(value, classValue, date) {
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

function controlsHtml(placeholder, firstId, secondId, firstLabel, secondLabel, double) {

    if (double === true) {

        return `
            <label class="label-calendar">
                ${firstLabel}    
                <input class="input-calendar" data-dropdown="dropdown" id="${firstId}" placeholder="${placeholder}" type="text" readonly/>
            </label>
            <label class="label-calendar">
                ${secondLabel}
                <input class="input-calendar" data-dropdown="dropdown" id="${secondId}" placeholder="${placeholder}" type="text" readonly/>
            </label>
        `;
    }
    else {
        return `
            <label class="label-calendar">
                ${firstLabel}    
                <input class="input-calendar" data-dropdown="dropdown" id="${firstId}" placeholder="${placeholder}" type="text" readonly/>
            </label>
        `;
    }
}

export { template, createCellHTML, controlsHtml };