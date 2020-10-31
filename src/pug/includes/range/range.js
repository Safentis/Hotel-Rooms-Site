function init(maxPriceValue, min, max, rangeId) {

    if (!document.querySelector(`#${rangeId}`)) return;

    function setCost() {
        let xMin = min / maxPriceValue * 100;
        let xMax = max / maxPriceValue * 100;

        let range = document.querySelector(`#${rangeId}`);
        let b2 = range.querySelector('[data-btn="button2"]');
        let b1 = range.querySelector('[data-btn="button1"]');
        
        let between = b2.nextElementSibling || 
            b2.previousElementSibling || 
            b1.nextElementSibling || 
            b1.previousElementSibling;

        b2.style.left = xMin + '%';
        b1.style.left = xMax + '%';
        between.style.marginLeft = xMin + '%';
        between.style.marginRight = 100 - xMax + '%';
    
        let mrgLeft2 = parseFloat(getComputedStyle(b2).left);
        let mrgLeft1 = parseFloat(getComputedStyle(b1).left);

        calculatePrices(mrgLeft2, 'min', range, b2);
        calculatePrices(mrgLeft1, 'max', range, b1);
    }

    setCost();
    
    function getCoords(btn, slider) {
        let right = slider.clientWidth - btn.offsetLeft;
        let left = btn.offsetLeft;

        return { right, left };
    }

    function calculatePrices(value, type, slider, btn) {
        const minHTML = slider.previousElementSibling.querySelector('[data-cost="min"]');
        const maxHTML = slider.previousElementSibling.querySelector('[data-cost="max"]');
        let procent = (value / (slider.clientWidth - btn.offsetWidth) * 100).toFixed(0);
        let number = maxPriceValue * +procent / 100;
        
        switch(type) {
            case 'min':
                minHTML.innerHTML = number + '₽';
            break;
            case 'max':
                maxHTML.innerHTML = number + '₽';
            break;
            default:
                return
        }
    }

    document.addEventListener('mousedown', (e) => {

        if (!e.target.dataset.btn) return;
       
        e.stopPropagation();
        e.preventDefault();

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        const btn = e.target;
        const slider = e.target.parentElement;
        const between = e.target.nextElementSibling || e.target.previousElementSibling;

        let shiftX = e.clientX - btn.getBoundingClientRect().left;
        let sliderLeftCoordsX = slider.getBoundingClientRect().x;

        function mouseMove(e) {
            let btnDragTarget = +(e.pageX - shiftX - sliderLeftCoordsX).toFixed(0);
            let sliderWidth = slider.clientWidth - btn.offsetWidth

            if (btnDragTarget > sliderWidth) btnDragTarget = sliderWidth; 
            if (btnDragTarget < 0) btnDragTarget = 0;

            const { right, left } = getCoords(btn, slider);
            const type = btn.dataset.btn;

            switch(type) {
                case 'button1':
                    calculatePrices(btnDragTarget, 'max', slider, btn);

                    btn.style.left = btnDragTarget + 'px';
                    between.style.marginRight = right - btn.offsetWidth / 2 + 'px';
                break;
                case 'button2':
                    calculatePrices(btnDragTarget, 'min', slider, btn);

                    btn.style.left = btnDragTarget + 'px';
                    between.style.marginLeft = left + btn.offsetWidth / 2 + 'px';
                break;
                default:
                    return;
            }
        }

        function mouseUp() {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        }

        return false;
    });

}

// TOTAL_VALUE / MIN_VALUE / MAX_VALUE / RANGE_ID
init(50000, 30000, 40000, 'range');