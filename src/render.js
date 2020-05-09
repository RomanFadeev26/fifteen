export const render = graph => {
    if(graph === null) {
        return null;
    }
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    const cells = graph.map(vertex => vertex.vertex);
    const cellElements = cells.map(cell => {
        const cellElement = document.createElement('div');
        cellElement.className = `cell cell${cell}`;
        if(cell === 0) {
            cellElement.classList.add('empty');
            cellElement.innerHTML = '';
        }
        cellElement.dataset.cell = cell;
        return cellElement;
    });
    cellElements.forEach(cellElement => {
        grid.appendChild(cellElement);
    });
};
