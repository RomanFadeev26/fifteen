import {initialGraph} from './graph';
import {move} from './move';
import {render} from './render';

let graph = initialGraph;

const clickHandler = (cell, isUser) => {
    const newGraph = move(Number(cell), graph);
    if (!newGraph) {
        return null;
    }
    graph = newGraph;
    render(graph);
    if(JSON.stringify(graph) === JSON.stringify(initialGraph) && isUser) {
        document.querySelector('audio').play();
    }
    const cells = [...document.querySelectorAll('.cell')];
    cells.forEach(cellElement => {
        cellElement.addEventListener('click', e => {
            clickHandler(e.target.dataset.cell, true);
        });
    })
};
const randomGenerator = () => Math.floor(Math.random() * 16);

render(graph);

const startButton = document.querySelector('.empty');

const start = () => {
    const intervalId = setInterval(() => {
        clickHandler(randomGenerator());
    }, 10);

    setTimeout(() => {
        clearInterval(intervalId);
    }, 2000);
    startButton.removeEventListener('click', start);
};

startButton.addEventListener('click', start);

const cells = [...document.querySelectorAll('.cell')];
cells.forEach(cellElement => {
    cellElement.addEventListener('click', e => {
        clickHandler(e.target.dataset.cell, true);
    });
});
