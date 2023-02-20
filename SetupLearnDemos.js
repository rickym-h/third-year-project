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
