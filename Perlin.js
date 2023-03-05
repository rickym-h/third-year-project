'use strict';
// Base code for Perlin Generation for all Website

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
    dot_prod_grid: function(x, y, vx, vy, octave){
        // Calculate the candidate vector from the co-ordinate
        let candidate_vector = {x: x - vx, y: y - vy};

        // Generate the unit-length Grid Vector, or fetch from cache if it exists
        let key = [vx, vy, octave].join(",");
        let grid_vector;
        if (this.vector_map.has(key)){
            grid_vector = this.vector_map.get(key);
        } else {
            grid_vector = this.rand_vect();
            this.vector_map.set(key, grid_vector);
        }

        // Return the dot-product
        return candidate_vector.x * grid_vector.x + candidate_vector.y * grid_vector.y;
    },


    // Weight Interpolation using various functions
    smootherstep: function(x) {
        // Smoother step interpolation (version from Ken Perlin)
        return (x**3 * (x * ((x*6) - 15) + 10));
    },
    smoothstep: function(x) {
        // Smoothstep interpolation (3x^2 - 2x^2)
        return x**2 * (3 - (2*x));
    },
    linear: function(x) {
        // Linear interpolation
        return x
    },
    // Value interpolation utilising various weight interpolation functions
    interpolate: function(weight, a, b) {
        return a + this.smootherstep(weight) * (b-a);
    },

    // Initialises the object and clears any saved gradients or vectors
    // vector_map are saved vectors to use when calculating dot products
    // perlin_cache are saved perlin values so if the same coordinates are called, the same output is fetched
    seed: function(){
        this.vector_map = new Map();
        this.perlin_cache = new Map();
    },

    // Main function to get perlin noise
    get: function(x, y, octave = 1) {

        // TotalPerlin is the accumulated value of multiple layers of perlin noise added to a point
        let TotalPerlin = 0;

        // Loop over every octave. At each octave a new value of perlin noise is generated and added to TotalPerlin
        for (let currentOctave = 1; currentOctave <= octave; currentOctave++) {

            // Checks if the cache contains a value for this coordinate
            let key = [x,y,currentOctave].join(",");
            if (this.perlin_cache.has(key))
                return this.perlin_cache.get(key);

            // Get the corners of the coordinate
            let xFloor = Math.floor(x);
            let yFloor = Math.floor(y);

            // Calculate Grid Corner values from the two vectors at every point
            let TopLeft = this.dot_prod_grid(x, y, xFloor,   yFloor, currentOctave);
            let TopRight = this.dot_prod_grid(x, y, xFloor+1, yFloor, currentOctave);
            let BottomLeft = this.dot_prod_grid(x, y, xFloor,   yFloor+1, currentOctave);
            let BottomRight = this.dot_prod_grid(x, y, xFloor+1, yFloor+1, currentOctave);

            // Interpolate between values at Grid Corners
            let xTop = this.interpolate(x-xFloor, TopLeft, TopRight);
            let xBottom = this.interpolate(x-xFloor, BottomLeft, BottomRight);
            let Value = this.interpolate(y-yFloor, xTop, xBottom);

            // Adjust amplitude based on octave
            Value /= (Math.pow(2, currentOctave-1));

            // Saves to cache in case the same coord is called in the future
            this.perlin_cache.set(key, Value);
            TotalPerlin += Value;

            // Adjust x and y to octaves for future iterations
            x *= 2;
            y *= 2;
        }
        return TotalPerlin;
    }
}

// Initialises the caches as soon as the object is defined
perlin.seed();
