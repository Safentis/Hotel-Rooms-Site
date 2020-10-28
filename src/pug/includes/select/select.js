function dropdownMenu() {
  
    const toggle = ({target}) => {
        let attr = target.dataset.dropdown;
        
        if (!attr) return;
        let elem = target.nextElementSibling || target.children[0];
        elem.classList.toggle('dropdown_hide');
    }

    document.addEventListener('click', toggle);
}

dropdownMenu();