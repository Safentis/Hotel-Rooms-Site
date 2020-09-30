function dropdownMenu() {
    
    const dropdownToggle = ({target}) => {
        if (!target.dataset.dropdown) return;

        const listIltems = target.nextElementSibling;
        listIltems.classList.toggle('dropdown_hide');
    }
    
    const dropdownSetValue = ({target}) => {
        const listValue = target.dataset.value; 
        
        if (!listValue) return;
        const itemValue = listValue;
        const list = target.closest('ul');
        
        list.previousElementSibling.value = itemValue;
    }

    document.addEventListener('click', dropdownToggle);
    document.addEventListener('click', dropdownSetValue);
}

dropdownMenu();