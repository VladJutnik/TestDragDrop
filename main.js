const tasksListElement = document.querySelectorAll(`.tasks__list`);
tasksListElement.forEach(function(item, i, arr) {
    console.log(item)
    const taskElements = item.querySelectorAll(`.tasks__item`);

    for (const task of taskElements) {
        task.draggable = true;
    }

    item.addEventListener(`dragstart`, (evt) => {
        evt.target.classList.add(`selected`);
    });

    item.addEventListener(`dragend`, (evt) => {
        evt.target.classList.remove(`selected`);
    });

    const getNextElement = (cursorPosition, currentElement) => {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;

        return nextElement;
    };

    item.addEventListener(`dragover`, (evt) => {
        evt.preventDefault();

        const activeElement = item.querySelector(`.selected`);
        const currentElement = evt.target;
        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains(`tasks__item`);

        if (!isMoveable) {
            return;
        }

        const nextElement = getNextElement(evt.clientY, currentElement);

        if (
            nextElement &&
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
        ) {
            return;
        }

        item.insertBefore(activeElement, nextElement);
    });
})

