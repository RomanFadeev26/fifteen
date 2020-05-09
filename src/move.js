import {calculateGraph, MAX_CELL, MIN_CELL} from './graph';

export const move = (cell, graph) => {
    if(cell > MAX_CELL || cell < MIN_CELL) {
        return null;
    }
    const cellVertex = graph.find(vertex => vertex.vertex === cell);
    const hasEmptyCell = cellVertex.edges.filter(edge => edge === 0).length > 0;
    if(!hasEmptyCell) {
        return null;
    }
    const vertexes = graph.map(vertex => vertex.vertex);
    const emptyIndex = vertexes.indexOf(0);
    const cellIndex = vertexes.indexOf(cell);
    vertexes.splice(emptyIndex, 1, cell);
    vertexes.splice(cellIndex, 1, 0);
    return calculateGraph(vertexes);
};
