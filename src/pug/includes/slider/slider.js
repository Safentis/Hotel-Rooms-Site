function slideEnable({target}) {
    let bool = false;

    const classController = (elem, classes) => {
        const {sliderAdd, sliderElemAdd, sliderRemove, sliderElemRemove} = classes;

        elem.classList.add(sliderElemAdd);
        elem.classList.remove(sliderElemRemove);
        elem.closest('.slide').classList.add(sliderAdd);
        elem.closest('.slide').classList.remove(sliderRemove);

        const slide = target.classList.contains('.slide') || target.closest('.slide');
              slide.dataset.value = bool;
    }
    const slideElem = (element) => {
        const elem = element || target.children[0];
        const on = {
            sliderAdd: 'slide_on',
            sliderElemAdd: 'slide__element_on',
            sliderRemove: 'slide_off',
            sliderElemRemove: 'slide__element_off'
        };
        const off = {
            sliderAdd: 'slide_off',
            sliderElemAdd: 'slide__element_off',
            sliderRemove: 'slide_on',
            sliderElemRemove: 'slide__element_on'
        };

        if (elem.classList.contains('slide__element_off')) {
            bool = true;
            classController(
                elem, 
                on
            );
        } else {
            bool = false;
            classController(
                elem, 
                off
            );
        }
    }

    if (target.dataset.slider === 'slider') {
        slideElem();
    } else if (target.dataset.slider === 'slider-element') {
        slideElem(target);
    } else {
        return;
    }

    return bool;
}

document.addEventListener('click', slideEnable);