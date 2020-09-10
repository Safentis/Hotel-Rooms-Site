function dropdownMenu() {
    
    const dropdownOn = ({target}) => {
        if (!target.dataset.dropdown) return;
        const listIltems = target.nextElementSibling;

        if (listIltems.classList.contains('dropdown_hide')) {
            listIltems.classList.remove('dropdown_hide');
        } else {
            listIltems.classList.add('dropdown_hide');
        }
    }
    
    const dropdownValue = ({target}) => {
        if (!target.dataset.value) return;
        const itemValue = target.dataset.value;
        const input = target.closest('ul');
        
        input.classList.add('dropdown_hide');
        input.previousElementSibling.value = itemValue;
    }

    document.addEventListener('click', dropdownOn);
    document.addEventListener('click', dropdownValue);
}

dropdownMenu();