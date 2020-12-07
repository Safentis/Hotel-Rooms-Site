function template(data, buttons = false) {
    let html = '';

    data.map(item => {
        html += `
            <li class="nested__item" data-value="${item.count}">
                <p class="nested__category">${item.category}</p>
                <div class="counter">
                    <button class="counter__button counter__button_noactive" type="button" data-button="minus">
                        -
                    </button>
                    <span class="counter__value" data-category="${item.category}">
                        ${item.count}
                    </span>
                    <button class="counter__button counter__button_active" type="button" data-button="plus">
                        +
                    </button>
                </div>
            </li>
        `;
    });

    if (buttons) {
        html += `
            <li class="nested__item nested__buttons">
                <button class="nested__clear-btn nested__clear-btn_hide" type="button" data-button="clear-all">очистить</button>
                <button class="nested__apply-btn" type="button" data-button="apply-all">применить</button>
            </li>
        `;
    }

    return html;
}

export { template };