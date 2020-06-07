export const render = graph => {
    const search = window.location.search.slice(1);
    const searchParams = Object.fromEntries([search.split('=')]);
    const {id} = searchParams;
    if(graph === null) {
        return null;
    }
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    const cells = graph.map(vertex => vertex.vertex);
    const getCellClassName = cell => id ? `cell cell${cell}_${id}` : `cell cell${cell}`;
    const cellElements = cells.map(cell => {
        const cellElement = document.createElement('div');
        cellElement.className = getCellClassName(cell);
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
