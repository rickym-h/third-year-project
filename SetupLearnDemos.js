// Contains code to set up demos to be used (e.g. initialising sliders to interact with variables)

// demo_final
let demo_final_OctaveSlider = document.getElementById("demo_final:OctaveSlider");
let demo_final_OctaveValue = document.getElementById("demo_final:OctaveValue");
demo_final_OctaveValue.innerHTML = demo_final_OctaveSlider.value;
demo_final_OctaveSlider.oninput = function () {
    demo_final_OctaveValue.innerHTML = this.value;
}


let demo_final_CellCountSlider = document.getElementById("demo_final:CellCountSlider");
let demo_final_CellCountValue = document.getElementById("demo_final:CellCountValue");
demo_final_CellCountValue.innerHTML = demo_final_CellCountSlider.value;
demo_final_CellCountSlider.oninput = function () {
    demo_final_CellCountValue.innerHTML = this.value;
}

let demo_final_CellResSlider = document.getElementById("demo_final:CellResSlider");
let demo_final_CellResValue = document.getElementById("demo_final:CellResValue");
demo_final_CellResValue.innerHTML = Math.pow(2, parseInt(demo_final_CellResSlider.value)+1).toString();
demo_final_CellResSlider.oninput = function () {
    demo_final_CellResValue.innerHTML = Math.pow(2, parseInt(this.value)+1).toString();
}

let button = document.getElementById("demo_final:GenerateHeightMap");
button.addEventListener("click", function () {
    let ShowGrid = document.querySelector("#demo_final_ShowGrid").checked;
    FillCanvasWithHeightMap("demo_final", demo_final_CellCountSlider.value, Math.pow(2, parseInt(demo_final_CellResSlider.value)+1), demo_final_OctaveSlider.value, ShowGrid)
})
let ShowGrid = document.querySelector("#demo_final_ShowGrid").checked;
FillCanvasWithHeightMap("demo_final", demo_final_CellCountSlider.value, Math.pow(2, parseInt(demo_final_CellResSlider.value)+1), demo_final_OctaveSlider.value, ShowGrid)


// greyscale noise demo
button = document.getElementById("demo_2DPerlin:GenerateNoise");
button.addEventListener("click", function () {
    FillCanvasWithNoise("demo_2DPerlin", 4,32, 1, false)
})
FillCanvasWithNoise("demo_2DPerlin", 4,32, 1, false)


// Candidate point vectors demo

let CPV_Canvas = document.getElementById("demo_CandidatePointVectors");
let CPV_Context = CPV_Canvas.getContext('2d');
CPV_Context.fillStyle = "#808080";
CPV_Context.fillRect(0, 0, CPV_Canvas.width, CPV_Canvas.height)

function CPVDemoClicked(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    GenerateCandidateVectorsAndUpdateDOM(x, y);
}

function GenerateCandidateVectorsAndUpdateDOM(x, y) {
    CPV_Context.fillStyle = "#808080";
    CPV_Context.fillRect(0, 0, CPV_Canvas.width, CPV_Canvas.height)
    CPV_Context.fillStyle = "#ff0000";
    CPV_Context.fillRect(
        x-10,
        y-10,
        20,
        20
    );

    CPV_Context.beginPath();
    CPV_Context.moveTo(0, 0);
    CPV_Context.lineTo(x, y);
    CPV_Context.stroke();
    CPV_Context.beginPath();
    CPV_Context.moveTo(CPV_Canvas.width, 0);
    CPV_Context.lineTo(x, y);
    CPV_Context.stroke();
    CPV_Context.beginPath();
    CPV_Context.moveTo(0, CPV_Canvas.height);
    CPV_Context.lineTo(x, y);
    CPV_Context.stroke();
    CPV_Context.beginPath();
    CPV_Context.moveTo(CPV_Canvas.width, CPV_Canvas.height);
    CPV_Context.lineTo(x, y);
    CPV_Context.stroke();

    // Calculate the data to show to the user
    x = Math.round(x*1000 / CPV_Canvas.width)/1000;
    y = Math.round(y*1000 / CPV_Canvas.height)/1000;
    let span = document.getElementById("demo_CandidatePointVectors:PointCoord");
    span.innerHTML = "(" + x + ", " + y + ")"

    // Calculate and show the vectors
    let v1, v2;
    // A
    v1 = x;
    v2 = -y;
    span = document.getElementById("demo_CandidatePointVectors:A")
    span.innerHTML ="(" + v1+ ", " + v2 + ")"

    // B
    v1 = -x;
    v2 = -y;
    span = document.getElementById("demo_CandidatePointVectors:B")
    span.innerHTML ="(" + v1+ ", " + v2 + ")"

    // C
    v1 = x;
    v2 = y;
    span = document.getElementById("demo_CandidatePointVectors:C")
    span.innerHTML ="(" + v1+ ", " + v2 + ")"

    // D
    v1 = -x;
    v2 = y;
    span = document.getElementById("demo_CandidatePointVectors:D")
    span.innerHTML ="(" + v1+ ", " + v2 + ")"
}
CPV_Canvas.addEventListener('mousedown', (e) => {
    CPVDemoClicked(CPV_Canvas, e)
})

button = document.getElementById("demo_CandidatePointVectors:PickCoord");
button.addEventListener("click", () => {
    let x = 512 * Math.round(Math.random() * 100)/100
    let y = 512 * Math.round(Math.random() * 100)/100
    GenerateCandidateVectorsAndUpdateDOM(x, y)
})



// Grid Vectors Demo

let GVD_Canvas = document.getElementById("demo_GridVectors");
let GVD_Context = GVD_Canvas.getContext('2d');

function canvas_arrow(context, fromx, fromy, tox, toy) {
    let headlen = 10; // length of head in pixels
    let dx = tox - fromx;
    let dy = toy - fromy;
    let angle = Math.atan2(dy, dx);
    context.beginPath()
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

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

    for (let x = 128; x < 512; x+=128) {
        for (let y = 128; y < 512; y+=128) {
            // Calculate a random grid vector
            let rand_vect = perlin.rand_vect();
            let xEnd = x + (rand_vect.x * 128);
            let yEnd = y + (rand_vect.y * 128);

            canvas_arrow(GVD_Context, x, y, xEnd, yEnd)
        }
    }
}

GenerateRandomGridVectorsAndUpdateDOM();
button = document.getElementById("demo_GridVectors:NewGrid");
button.addEventListener("click", () => {
    GenerateRandomGridVectorsAndUpdateDOM();
})



/// Dot Product Demo

function UpdateDotProductDemo() {
    // Take the values from the 4 inputs
    let Ax = Number(document.getElementById("demo_DotProduct:Ax").value);
    let Ay = -Number(document.getElementById("demo_DotProduct:Ay").value);
    let Bx = Number(document.getElementById("demo_DotProduct:Bx").value);
    let By = -Number(document.getElementById("demo_DotProduct:By").value);

    if ((Ax < -1) || (Ax > 1) || (Bx < -1) || (Bx > 1) || (Ay < -1) || (Ay > 1) || (By < -1) || (By > 1)) {
        // At least one value out of range
        document.getElementById("demo_DotProduct:RangeWarning").style.display = "block";
        return;
    }
    document.getElementById("demo_DotProduct:RangeWarning").style.display = "none";

    // Construct the vectors and calculate the dot product
    let DotProduct = (Ax * Bx) + (Ay * By);

    // Update dot product
    let DotID = document.getElementById("demo_DotProduct:DotProduct");
    DotID.textContent = DotProduct.toString();

    // Colour background
    let DP_Canvas = document.getElementById("demo_DotProduct");
    let DP_Context = DP_Canvas.getContext('2d');
    DP_Context.fillStyle = "#808080";
    DP_Context.fillRect(0, 0, DP_Canvas.width, DP_Canvas.height)

    // Draw grid lines
    DP_Context.beginPath();
    DP_Context.moveTo(DP_Canvas.width/2, 0);
    DP_Context.lineTo(DP_Canvas.width/2, DP_Canvas.height);
    DP_Context.stroke();
    DP_Context.beginPath();
    DP_Context.moveTo(0, DP_Canvas.height/2);
    DP_Context.lineTo(DP_Canvas.width, DP_Canvas.height/2);
    DP_Context.stroke();

    // Draw Vector A and B
    DP_Context.strokeStyle = "#ff0000";
    DP_Context.lineWidth = 3;
    console.log(
        Ax,
        Ay
    )
    console.log(
        (Ax + 1)*256,
        (Ay + 1)*256
    )
    canvas_arrow(DP_Context,
        (DP_Canvas.width/2),
        (DP_Canvas.width/2),
        (Ax + 1)*256,
        (Ay + 1)*256
    )
    canvas_arrow(DP_Context,
        (DP_Canvas.width/2),
        (DP_Canvas.width/2),
        (Bx+1)*(DP_Canvas.width/2),
        (By+1)*(DP_Canvas.width/2)
    )
    DP_Context.strokeStyle = "#000";
    DP_Context.lineWidth = 1;

}

UpdateDotProductDemo();





// Interpolation Demo

function UpdateInterpolationDemo() {
    let A = Number(document.getElementById("demo_Interpolation:A").value);
    let B = Number(document.getElementById("demo_Interpolation:B").value);
    let W = Number(document.getElementById("demo_Interpolation:W").value);

    if ((isNaN(A)) || isNaN(B) || isNaN(W)) {
        return;
    }

    let value = perlin.interpolate(W, A, B);

    document.getElementById("demo_Interpolation:Value").innerText = value.toString();
}

UpdateInterpolationDemo();