import { template } from './checkbox-template.js';

class Checkbox {
    constructor(id, items) {
        this.$elem = document.querySelector(`${id}`);
        this.items = items;

        this._render();
        this._event();
    }
    
    
    _render() {
        if (this.$elem === null) return;
        const { label, data, show } = this.items;
        
        this.$elem.innerHTML = template(label, data, show);
    }
    
    
    _event() {
        if (this.$elem === null) return;
        
        this.toggle = this.toggle.bind(this);
        this.$checkboxToggle.addEventListener('click', this.toggle);
    }


    get $checkboxDropdown() {
        return this.$elem.querySelector('[data-dropdown]');
    }
    
    
    get $checkboxToggle() {
        return this.$elem.querySelector('[data-arrow="arrow"]');
    }


    toggle(e) {
        (this.$checkboxDropdown.classList.contains('nested_hide')) 
        ? this.open() 
        : this.close();
    }


    open() {
        this.$checkboxDropdown.classList.remove('nested_hide');
        this.$checkboxToggle.classList.remove('checkbox-arrow_close');
        this.$checkboxToggle.classList.add('checkbox-arrow_open');
    }
    
    
    close() {
        this.$checkboxDropdown.classList.add('nested_hide');
        this.$checkboxToggle.classList.add('checkbox-arrow_close');
        this.$checkboxToggle.classList.remove('checkbox-arrow_open');
    }
}

export default Checkbox;