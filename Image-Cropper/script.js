// CONFIGURATION
const minWidth = 32;
const minHeight = 32;
const baseline = 12;

(() => {
    const startPoint = [0, 0];
    let dragging = false;
    const dir = [0, 0, 0, 0];
    let currentElement, currentMove, startMovement;
    const TOP = 0, RIGHT = 1, BOTTOM = 2, LEFT = 3;
    let moving = false;

    //MOVE THE MOUSE ON IMAGE
    const onMouseMove = evt => {
        if (!dragging) return;
        const { clientX: x, clientY: y } = evt.touches && evt.touches[0] || evt;
        const diff = [x - startPoint[0], y - startPoint[1]];

        if (moving) {
            diff[0] = Math.min(Math.max(diff[0], -startMovement[LEFT]), startMovement[RIGHT]);
            diff[1] = Math.min(Math.max(diff[1], -startMovement[TOP]), startMovement[BOTTOM]);
        }

        currentMove[LEFT] = Math.min(Math.max(startMovement[LEFT] + dir[LEFT] * diff[0], 0), currentElement.clientWidth - currentMove[RIGHT] - minWidth);
        currentMove[RIGHT] = Math.min(Math.max(startMovement[RIGHT] + dir[RIGHT] * diff[0], 0), currentElement.clientWidth - currentMove[LEFT] - minWidth);
        currentMove[TOP] = Math.min(Math.max(startMovement[TOP] + dir[TOP] * diff[1], 0), currentElement.clientHeight - currentMove[BOTTOM] - minHeight);
        currentMove[BOTTOM] = Math.min(Math.max(startMovement[BOTTOM] + dir[BOTTOM] * diff[1], 0), currentElement.clientHeight - currentMove[TOP] - minHeight);
        setMove(currentElement, currentMove);
    }

    // ON MOUSE UP
    const onMouseUp = evt => {
        dragging = false;

    }

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('touchmove', onMouseMove);

    document.body.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('touchend', onMouseUp);

    // SET THE MOVEMENT
    const setMove = (e, movement) => {
        e.style.setProperty('--top', movement[TOP]);
        e.style.setProperty('--right', movement[RIGHT]);
        e.style.setProperty('--bottom', movement[BOTTOM]);
        e.style.setProperty('--left', movement[LEFT]);
    }

    // SELECT THE IMAGE BOX TO MOVE AROUND
    [...document.querySelectorAll('.wrapper')].forEach(e => {

        const handler = document.createElement('span');
        e.append(handler);

        const min = Math.min(e.clientWidth, e.clientHeight);
        const movement = [
            e.clientHeight > min ? (e.clientHeight - min) / 2 : 0,
            e.clientWidth > min ? (e.clientWidth - min) / 2 : 0,
            e.clientHeight > min ? (e.clientHeight - min) / 2 : 0,
            e.clientWidth > min ? (e.clientWidth - min) / 2 : 0,
        ];

        setMove(e, movement);

        // WITH MOUSE MOVEMENT
        const onMouseMove = evt => {
            const { clientX: _x, clientY: _y } = evt.touches && evt.touches[0] || evt;
            const [x, y] = [_x - handler.getBoundingClientRect().x, _y - handler.getBoundingClientRect().y];
            if (dragging) return;
            if (y <= baseline) {
                dir[TOP] = 1;
                dir[BOTTOM] = 0;
            } else if (y >= handler.clientHeight - baseline) {
                dir[TOP] = 0;
                dir[BOTTOM] = -1;
            } else {
                dir[TOP] = 0;
                dir[BOTTOM] = 0;
            }

            if (x <= baseline) {
                dir[LEFT] = 1;
                dir[RIGHT] = 0;
            } else if (x >= handler.clientWidth - baseline) {
                dir[LEFT] = 0;
                dir[RIGHT] = -1;
            } else {
                dir[LEFT] = 0;
                dir[RIGHT] = 0;
            }

            if ((dir[TOP] || dir[BOTTOM]) && !(dir[LEFT] || dir[RIGHT])) {
                handler.style.cursor = 'ns-resize';
            } else if ((dir[LEFT] || dir[RIGHT]) && !(dir[TOP] || dir[BOTTOM])) {
                handler.style.cursor = 'ew-resize';
            } else if ((dir[TOP] && dir[LEFT]) || (dir[BOTTOM] && dir[RIGHT])) {
                handler.style.cursor = 'nwse-resize';
            } else if ((dir[TOP] && dir[RIGHT]) || (dir[BOTTOM] && dir[LEFT])) {
                handler.style.cursor = 'nesw-resize';
            } else {
                handler.style.cursor = 'move';
            }

            if (!dir.some(e => e)) {
                dir[TOP] = 1;
                dir[BOTTOM] = -1;
                dir[LEFT] = 1;
                dir[RIGHT] = -1;
                moving = true;
            } else {
                moving = false;
            }
        }

        // MOVE THE MOUSE DOWN
        const onMouseDown = evt => {
            const { clientX: x, clientY: y } = evt.touches && evt.touches[0] || evt;
            startPoint[0] = x;
            startPoint[1] = y;
            dragging = true;
            currentElement = e;
            currentMove = movement;
            startMovement = [...movement];
        }

        handler.addEventListener('mousemove', onMouseMove);
        handler.addEventListener('touchstart', onMouseMove);

        e.addEventListener('mousedown', onMouseDown);
        e.addEventListener('touchstart', onMouseDown);
    });
})();
