// Define an object for all perlin implementation
let perlin = {
    // Gets a random vector - not seeded - however results will be saved into a map
    rand_vect: function(){
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },

    // Takes two points - the candidate point (x,y), and a grid corner (vx, vy)
    // Interpolates between the vector of the corner (grid_vector)
    // and the vector represented by corner->candidate point (candidate_vector)
    dot_prod_grid: function(x, y, vx, vy){
        let grid_vector;
        if (this.vector_map[[vx,vy]]){
            grid_vector = this.vector_map[[vx,vy]];
        } else {
            grid_vector = this.rand_vect();
            this.vector_map[[vx, vy]] = grid_vector;
        }
        // at this point, the grid vector is in the form grid_vector{x: int, y: int},
        // like the candidate vector below!

        let candidate_vector = {x: x - vx, y: y - vy};

        // TODO this should return the dot product between the grid vector and the candidate vector
        // |----------------|Code below this line!|----------------|
        let dotProduct = candidate_vector.x * grid_vector.x + candidate_vector.y * grid_vector.y;



        // |----------------|Code above this line!|----------------|
        return dotProduct;
    },


    // Interpolation function using smootherstep
    smootherstep: function(x){
        // Smoother step interpolation (version from Ken Perlin)
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    interpolate: function(weight, a, b){
        return a + this.smootherstep(weight) * (b-a);
    },

    // Initialises the object and clears any saved gradients or vectors
    // vector_map are saved vectors to use when calculating dot products
    // perlin_cache are saved perlin values so if the same coordinates are called, the same output is fetched
    seed: function(){
        this.vector_map = {};
        this.perlin_cache = {};
    },

    // Main function to get perlin noise
    get: function(x, y) {
        // Checks if the cache contains a value for this coordinate
        if (this.perlin_cache.hasOwnProperty([x,y]))
            return this.perlin_cache[[x,y]];

        // Get the corners of the coordinate
        let xFloor = Math.floor(x);
        let yFloor = Math.floor(y);

        // Calculate Grid Corner values from the two vectors at every point
        let TopLeft = this.dot_prod_grid(x, y, xFloor, yFloor);
        let TopRight = this.dot_prod_grid(x, y, xFloor + 1, yFloor);
        let BottomLeft = this.dot_prod_grid(x, y, xFloor, yFloor + 1);
        let BottomRight = this.dot_prod_grid(x, y, xFloor + 1, yFloor + 1);

        let v;
        // TODO - v should be the interpolated values between all the dot products.
        // Implement this yourself! (Hint - you will need 3 interpolations to bring the four values to one value!)
        // |----------------|Code below this line!|----------------|

        let xTop = this.interpolate(x - xFloor, TopLeft, TopRight);
        let xBottom = this.interpolate(x - xFloor, BottomLeft, BottomRight);
        v = this.interpolate(y - yFloor, xTop, xBottom);

        // |----------------|Code above this line!|----------------|
        // Saves to cache in case the same coord is called in the future
        this.perlin_cache[[x,y]] = v;
        return v;
    }
}





// WARNING - DO NOT EDIT ANYTHING BELOW THIS LINE

perlin.seed();

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
                let v = Math.round(perlin.get(x, y) * HSL_MULTIPLIER);
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

let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');

FillCanvasWithNoise("canvas", 4,32, 1, false)

let button = document.getElementById("button");
button.addEventListener("click", function () {
    FillCanvasWithNoise("canvas", 4,32, 1, false)
})