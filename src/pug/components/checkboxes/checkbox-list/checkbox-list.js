import Checkbox from './Checkbox-dropdown.js';

const data = [
    { id: 0, name: 'breakfast', text: 'Завтрак' },
    { id: 1, name: 'desk', text: 'Письменный стол' },
    { id: 2, name: 'chair', text: 'Стул для кормления' },
    { id: 3, name: 'bed', text: 'Кроватка' },
    { id: 4, name: 'tv', text: 'Телевизор' },
    { id: 5, name: 'shampoo', text: 'Шампунь' },
];

const checkbox = new Checkbox('#ui-checkbox-dropdown', {
    label : 'expandable checkbox list',
    data: data,
    show: true,
});

const checkboxDropdown = new Checkbox('#checkbox-dropdown', {
    label : 'дополнительные удобства',
    data: data,
    show: true,
});