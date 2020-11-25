class Toggle {
    handleEvent(e) {
        let method = 'on' + e.type[0].toUpperCase() + e.type.slice(1);
        this[method](e);
    }
    onClick(e) {
        const toggle = e.target.closest('.toggle');
        
        if (!toggle) return;
        if (toggle.classList.contains('toggle_noactive')) {
            this.toggleMove(
                toggle,
                { onToggle: 'toggle_active', offToggle: 'toggle_noactive' },
                { onElem: 'toggle__element_active', offElem: 'toggle__element_noactive' },
            );
        }
        else if (toggle.classList.contains('toggle_active')) {
            this.toggleMove(
                toggle,
                { onToggle: 'toggle_noactive', offToggle: 'toggle_active' },
                { onElem: 'toggle__element_noactive', offElem: 'toggle__element_active' },
            );
        }
       
        return;
    }
    toggleMove(toggle, classOfToggle, classOfElement) {
        let { onToggle, offToggle } = classOfToggle;
        let { onElem, offElem } = classOfElement;

        toggle.classList.remove(offToggle);
        toggle.classList.add(onToggle);
        toggle.children[0].classList.remove(offElem);
        toggle.children[0].classList.add(onElem);
    }
}

const toggle = new Toggle();

document.addEventListener('click', toggle);