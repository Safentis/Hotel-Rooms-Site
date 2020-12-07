import { Calendar, CalendarWithInput } from './Calendar-logic';

const options = {
    weekDays: ['Пн', 'Вн', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: [
        'Январь', 'Февраль', 'Март',
        'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь',
        'Октябрь', 'Ноябрь', 'Декабрь',
    ],
    buttonClearText: 'очистить',
    buttonApplyText: 'применить',
    show: true,
};

const uiFormsCalendar = {
    input: { 
        double: true, firstId: '#ui-entry', secondId: '#ui-departure', 
        placeholder: 'ДД.ММ.ГГГГ', firstLabel: 'date dropdown', secondLabel: 'date dropdown' 
    },
    show: false,
}

const cardReg = {
    input: { 
        double: true, firstId: '#regEntry', secondId: '#regDeparture', 
        placeholder: 'ДД.ММ.ГГГГ', firstLabel: 'въезд', secondLabel: 'выезд' 
    },
    show: false,
}

const cardSearch = {
    input: { 
        double: true, firstId: '#searchEntry', secondId: '#searchDeparture', 
        placeholder: 'ДД.ММ.ГГГГ', firstLabel: 'въезд', secondLabel: 'выезд' 
    },
    show: false,
}

Object.setPrototypeOf(uiFormsCalendar, options);
Object.setPrototypeOf(cardReg, options);
Object.setPrototypeOf(cardSearch, options);

const arrCalendar = [
    { id: '#ui-body-calendar', obj: options },
]

const arrCalendarWithButtons = [
    { id: '#ui-calendar-wrapper', obj: uiFormsCalendar },
    { id: '#calendar-card-info', obj: cardReg },
    { id: '#calendar-card-search', obj: cardSearch },
];


arrCalendarWithButtons.forEach(({id, obj}, i) => {
    new CalendarWithInput(id, obj);
})

arrCalendar.forEach(({id, obj}, i) => {
    new Calendar(id, obj)
})