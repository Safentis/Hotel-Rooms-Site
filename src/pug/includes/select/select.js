function dropdownMenu() {
    
    const dropdownToggle = ({target}) => {
        if (!target.dataset.dropdown) return;

        const listIltems = target.nextElementSibling;
        listIltems.classList.toggle('dropdown_hide');
    }
    
    const dropdownSetValue = ({target}) => {
        if (!target.closest('dropdownWrapper')) return;
        const listValue = target.dataset.value; 
        
        if (!listValue) return;
        const list = target.closest('ul');
        
        list.previousElementSibling.value = listValue;
    }

    document.addEventListener('click', dropdownToggle);
    document.addEventListener('click', dropdownSetValue);
}

dropdownMenu();