function template(label, items, show) {

    let html = ``;

    (show)
        ? html += `<p class="checkbox-buttons__label checkbox-arrow_open" data-arrow="arrow">${label}</p>`
        : html += `<p class="checkbox-buttons__label checkbox-arrow_close" data-arrow="arrow">${label}</p>`;

    (show) 
        ? html += `<ul class="checkbox-buttons__list checkboxes" data-dropdown="dropdown">`
        : html += `<ul class="checkbox-buttons__list checkboxes nested_hide" data-dropdown="dropdown">`;

    items.forEach(({text, name, id}) => {
        html += `
            <li class="checkboxes__item">
                <input class="checkbox-input" type="checkbox" name="${name}" id="${id}"/>
                <label class="checkbox-label" for="${id}"></label>
                <p class="checkboxes__text">${text}</p>
            </li>
        `;
    })

    html += `</ul>`;

    return html;
}

export { template };