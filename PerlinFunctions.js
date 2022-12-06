// Returns a random vector with unit length 1.
function getRandom2DUnitVector() {
    let theta = Math.random() * 2 * Math.PI;
    return {x: Math.cos(theta), y: Math.sin(theta)}
}

let grid = [];
const nodes = 5;

for (let i = 0; i < nodes; i++) {
    let row = [];
    for (let j = 0; j < nodes; j++) {
        row.push(getRandom2DUnitVector());
    }
    grid.push(row);
}

function dotProduct(nodeX, nodeY, candidateX, candidateY) {
    try {
        let nodeVec = grid[nodeX][nodeY];
        let candidateVec = {x: candidateX-nodeX, y: candidateY-nodeY}
        return (nodeVec.x * candidateVec.x) + (nodeVec.y * candidateVec.y)
    } catch (e) {
        console.log(nodeX, nodeY, candidateX, candidateY);
        console.log("RETURNING 0")
        return 0;
    }
}

function interpolate(weight, a, b) {
    // Smoother step interpolation (version from Ken Perlin)
    weight = 6*weight**5 - 15*weight**4 + 10*weight**3;
    return (a + (weight * (b-a)));
}


function getPerlin(x, y) {
    let x0 = Math.floor(x);
    let x1 = x0+1;
    let y0 = Math.floor(y);
    let y1 = y0+1;

    let topLeft = dotProduct(x0, y1, x, y);
    let topRight = dotProduct(x1, y1, x, y);
    let botLeft = dotProduct(x0, y0, x, y);
    let botRight = dotProduct(x1, y0, x, y);

    let xWeight = x - x0;
    let yWeight = y - y0;

    let left = interpolate(yWeight, botLeft, topLeft);
    let right = interpolate(yWeight, botRight, topRight);

    return interpolate(xWeight, left, right);
}

// let string = "";
// console.log("nodes: " + nodes)
// for (let x = 0; x < nodes-1; x+=0.1) {
//     string += "(" + x + "," + getPerlin(x, 3.2) + "),"
// }
// console.log(string);

