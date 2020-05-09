const initialCells = Array(16).fill(undefined).map((_, i) => i);

export const MIN_CELL = 0;
export const MAX_CELL = 15;
const borderLeft = [0, 4, 8, 12];
const borderRight = borderLeft.map(cellN => cellN + 3);

export const calculateGraph = cells => cells.map((cell, i) => {
    const left = i - 1;
    const right = i + 1;
    const top = i - 4;
    const down = i + 4;
    const isLeft = borderLeft.includes(i);
    const isRight = borderRight.includes(i);
    const isTop = top < MIN_CELL;
    const isDown = down > MAX_CELL;
    let edges = [cells[left], cells[right], cells[top], cells[down]];
    if(isTop) {
        edges = edges.filter(edge => edge !== cells[top]);
    }
    if(isDown) {
        edges = edges.filter(edge => edge !== cells[down]);
    }
    if(isRight) {
        edges = edges.filter(edge => edge !== cells[right]);
    }
    if(isLeft) {
        edges = edges.filter(edge => edge !== cells[left]);
    }
    return {
        vertex: cells[i],
        edges
    };
});

export const initialGraph = calculateGraph(initialCells);

/*
* todo Нужна функция, которая принимает список HTML-элементов и возвращает новый граф
*      так мы будем знать, куда переехала новая вершина и какие у неё соседи
* */
