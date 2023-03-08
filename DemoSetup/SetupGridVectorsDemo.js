
// Grid Vectors Demo

let GVD_Canvas = document.getElementById("demo_GridVectors");
let GVD_Context = GVD_Canvas.getContext('2d');


function GenerateRandomGridVectorsAndUpdateDOM() {
    // Create Background
    GVD_Context.fillStyle = "#808080";
    GVD_Context.fillRect(0, 0, GVD_Canvas.width, GVD_Canvas.height)


    // Draw Grid Lines
    GVD_Context.beginPath();
    GVD_Context.moveTo(1 * GVD_Canvas.width/4, 0);
    GVD_Context.lineTo(1 * GVD_Canvas.width/4, GVD_Canvas.height);
    GVD_Context.stroke();
    GVD_Context.beginPath();
    GVD_Context.moveTo(2 * GVD_Canvas.width/4, 0);
    GVD_Context.lineTo(2 * GVD_Canvas.width/4, GVD_Canvas.height);
    GVD_Context.stroke();
    GVD_Context.beginPath();
    GVD_Context.moveTo(3 * GVD_Canvas.width/4, 0);
    GVD_Context.lineTo(3 * GVD_Canvas.width/4, GVD_Canvas.height);
    GVD_Context.stroke();
    GVD_Context.beginPath();
    GVD_Context.moveTo(0, 1 * GVD_Canvas.width/4);
    GVD_Context.lineTo(GVD_Canvas.width, 1 * GVD_Canvas.width/4);
    GVD_Context.stroke();
    GVD_Context.beginPath();
    GVD_Context.moveTo(0, 2 * GVD_Canvas.width/4);
    GVD_Context.lineTo(GVD_Canvas.width, 2 * GVD_Canvas.width/4);
    GVD_Context.stroke();
    GVD_Context.beginPath();
    GVD_Context.moveTo(0, 3 * GVD_Canvas.width/4);
    GVD_Context.lineTo(GVD_Canvas.width, 3 * GVD_Canvas.width/4);
    GVD_Context.stroke();


    GVD_Context.strokeStyle = "#ff0000";
    GVD_Context.lineWidth = 3;

    for (let x = 128; x < 512; x+=128) {
        for (let y = 128; y < 512; y+=128) {
            // Calculate a random grid vector
            let rand_vect = perlin.rand_vect();
            let xEnd = x + (rand_vect.x * 128);
            let yEnd = y + (rand_vect.y * 128);

            canvas_arrow(GVD_Context, x, y, xEnd, yEnd)
        }
    }


    GVD_Context.strokeStyle = "#000";
    GVD_Context.lineWidth = 1;
}

button = document.getElementById("demo_GridVectors:NewGrid");
button.addEventListener("click", () => {
    GenerateRandomGridVectorsAndUpdateDOM();
})
GenerateRandomGridVectorsAndUpdateDOM();

