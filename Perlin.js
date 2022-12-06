'use strict';
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
        let candidate_vector = {x: x - vx, y: y - vy};
        if (this.vector_map[[vx,vy]]){
            grid_vector = this.vector_map[[vx,vy]];
        } else {
            grid_vector = this.rand_vect();
            this.vector_map[[vx, vy]] = grid_vector;
        }
        return candidate_vector.x * grid_vector.x + candidate_vector.y * grid_vector.y;
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
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        // interpolate between these corners.
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interpolate(x-xf, tl, tr);
        let xb = this.interpolate(x-xf, bl, br);
        let v = this.interpolate(y-yf, xt, xb);

        // Saves to cache in case the same coord is called in the future
        this.perlin_cache[[x,y]] = v;
        return v;
    }
}
perlin.seed();