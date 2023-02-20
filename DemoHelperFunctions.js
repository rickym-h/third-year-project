'use strict';

// Contains purely helper functions to be used in the demos

function getColour(value) {
    // if ((value < 5) && (value > -5)) {
    //     return "#00ff00"
    // }
    let SAND_THRESHOLD = 0
    let GRASS_THRESHOLD = 30
    let FOREST_THRESHOLD = 90
    let ROCK_THRESHOLD = 130
    let SNOW_THRESHOLD = 150
    if (value < SAND_THRESHOLD) {
        return "#11ADC1"
    } else if (value < GRASS_THRESHOLD) {
        return "#F7B69E"
    } else if (value < FOREST_THRESHOLD) {
        return "#5BB361"
    } else if (value < ROCK_THRESHOLD) {
        return "#1E8875"
    } else if (value < SNOW_THRESHOLD){
        return "#606C81"
    } else {
        return "#FFFFFF"
    }
}


function getIntensity(value){

    // maps -215 to 215 to 0-255

    value = Math.round((value+215)/2.078431373)
    if (value < 0) {
        console.log("converting " + value + " to 0")
        value = 0;
    } else if (value > 255) {
        console.log("converting " + value + " to 255")
        value = 255
    }
    let hex = value.toString(16);
    if (hex.length === 1) {
        hex = "0" + hex;
    }
    return "#"+hex+hex+hex;
}

function FillCanvasWithNoise(canvasID, GridSize, PixelsPerGridCell, OctaveCount, ShowGrid=true) {
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
            if (ShowGrid && ((x % 1 === 0) || (y % 1 === 0))) {
                context.fillStyle = "#ff0000";
            } else {
                let v = Math.round(perlin.get(x, y, OctaveCount) * HSL_MULTIPLIER);
                context.fillStyle = getIntensity(v);
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



function FillCanvasWithHeightMap(canvasID, GridSize, PixelsPerGridCell, OctaveCount, ShowGrid=true) {
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
            if (ShowGrid && ((x % 1 === 0) || (y % 1 === 0))) {
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