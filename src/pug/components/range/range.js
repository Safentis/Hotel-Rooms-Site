function init(props) {
    const { button1Id, button2Id } = props;

    const buttonLeft = document.querySelector(`#${button1Id}`) || document.querySelector(`${button1Id}`);
    const buttonRight = document.querySelector(`#${button2Id}`) || document.querySelector(`${button2Id}`);

    if (buttonRight === null) return;
    
    buttonLeft.addEventListener('mousedown', handlerMouseDownEvent);
    buttonRight.addEventListener('mousedown', handlerMouseDownEvent);

    // * Функция calcCommonProcents используется для простого расчёта процентов
    // * минимальной и максимальной цены от допустимого порога.

    const calcCommonProcents = (int, totalCost) => Math.floor(int / totalCost * 100);

    // * Функция calcProcents используется для расчёта процентов
    // * той или иной кнопки относительно левой иили правой сторон.

    const calcProcents = (int, slider, button) => Math.floor(int / (slider.clientWidth - button.offsetWidth) * 100);

    // * Функция getButtonsCoords используется для расчёта растояния кнопок
    // * от правого и ливого края слайдера.

    function getButtonsCoords(button, slider) {
        let right = slider.clientWidth - button.offsetLeft;
        let left = button.offsetLeft;

        return { right, left };
    }

    // * Функция calcCostValue используется для расчёта 
    // * минимальной и максимальной цены во время движения ползунков.

    function calcCostValue(int, slider, button, elem) {
        const { totalCost } = props;
        let procent = calcProcents(int, slider, button);
        let number = totalCost * +procent / 100;

        elem.innerHTML = number + '₽';

        return;
    }

    function handlerMouseDownEvent(e) {
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
        
        const button = e.target;
        const slider = button.parentElement;
        const between = button.nextElementSibling || button.previousElementSibling;

        const { minCostId, maxCostId } = props;

        let shiftX = e.clientX - button.getBoundingClientRect().left;
        let sliderLeftCoordsX = button.parentElement.getBoundingClientRect().x;

        let min = document.querySelector(`#${minCostId}`) || document.querySelector(`${minCostId}`);
        let max = document.querySelector(`#${maxCostId}`) || document.querySelector(`${maxCostId}`);

        function mouseMove(e) {
            e.stopPropagation();
            e.preventDefault();
        
            let curentButton = +(e.pageX - shiftX - sliderLeftCoordsX).toFixed(0);
            let sliderWidth = slider.clientWidth - button.offsetWidth

            if (curentButton > sliderWidth) curentButton = sliderWidth; 
            if (curentButton < 0) curentButton = 0;
            
            let { left, right } = getButtonsCoords(button, slider);
            let attr = button.dataset.btn;            
            
            switch(attr) {
                case 'button1':
                    button.style.left = curentButton + 'px';
                    between.style.marginLeft = left + button.offsetWidth / 2 + 'px';
                    calcCostValue(left, slider, button, min);
                break;
                case 'button2':
                    button.style.left = curentButton + 'px';
                    between.style.marginRight = right - button.offsetWidth / 2 + 'px';
                    calcCostValue(left, slider, button, max);
                break;
                default:
                    return;
            }

            return false;
        }

        function mouseUp() {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        }
    }

    // * Функция setStartCost выставляет стартовое значение минимальной и максимальной цены,
    // * высчитывает и применяет стили для "средней линии" и кнопок-маркеров. 
    // * Положение кнопок относительно левой и правой стороны, 
    // * зависит от минимальной и максимальной цены.

    function setStartCost() {
        const { minCostId, maxCostId, minCost, maxCost, totalCost } = props;

        document.querySelector(`#${minCostId}`).innerHTML = minCost + '₽';
        document.querySelector(`#${maxCostId}`).innerHTML = maxCost + '₽';
        
        let between = buttonLeft.nextElementSibling || buttonRight.previousElementSibling;

        let xMin = calcCommonProcents(minCost, totalCost);
        let xMax = calcCommonProcents(maxCost, totalCost);

        buttonLeft.style.left = xMin + '%';
        buttonRight.style.left = xMax + '%';

        between.style.marginLeft = xMin + '%';
        between.style.marginRight = 100 - xMax + '%';
    }

    setStartCost()

    buttonLeft.ondragstart = () => false;
    buttonRight.ondragstart = () => false;
}

const props = {
    totalCost: 15000,
    minCost: 5000,
    maxCost: 10000,
    button1Id: 'button1',
    button2Id: 'button2',
    minCostId: 'min',
    maxCostId: 'max',
};

init(props);