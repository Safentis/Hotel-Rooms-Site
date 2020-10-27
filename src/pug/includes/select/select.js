function dropdownMenu() {
  
    const toggle = ({target}) => {
        let attr = target.dataset.dropdown;
        
        if (!attr) return;
        let elem = target.nextElementSibling;
        elem.classList.toggle('dropdown_hide');
    }

    document.addEventListener('click', toggle);
}

dropdownMenu();