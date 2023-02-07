'use strict';



function FillCanvasWithHeightMap(canvasID, GridSize, PixelsPerGridCell, OctaveCount) {
    perlin.seed()
    let canvas = document.getElementById(canvasID);
    let context = canvas.getContext('2d');

    const GRID_SIZE = GridSize;
    const PIXELS_PER_GRID_CELL = PixelsPerGridCell;
    const HSL_MULTIPLIER = 300;

    let pixel_size = canvas.width / PIXELS_PER_GRID_CELL;
    let num_pixels = GRID_SIZE / PIXELS_PER_GRID_CELL;

// Colour each pixel according to the perlin values
    for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE){
        for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE){
            // If the pixel is on a grid line - set as red, otherwise get the map colour from perlin.
            if ((x % 1 === 0) || (y % 1 === 0)) {
                context.fillStyle = "#ff0000";
            } else {
                let v = Math.round(perlin.get(x, y, OctaveCount) * HSL_MULTIPLIER);
                context.fillStyle = getColour(v);
            }
            // Colour in the pixel at the given x and y as the colour found above
            context.fillRect(
                x / GRID_SIZE * canvas.width,
                y / GRID_SIZE * canvas.width,
                pixel_size,
                pixel_size
            );
        }
    }
}