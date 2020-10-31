function dropdownMenu() {
  
    const toggle = ({target}) => {
        let attr = target.dataset.dropdown;
        
        if (!attr) return;
        let arrow = target.classList.contains('checkbox-select__arrow') ? target : target.children[0];
        let elem = target.nextElementSibling || target.children[0] || arrow.parentNode.nextElementSibling;

        elem.classList.toggle('dropdown_hide');

        if (arrow) {
            arrow.classList.toggle('checkbox-select__arrow_rotate');
        }

        return;
    }

    document.addEventListener('click', toggle);
}

dropdownMenu();