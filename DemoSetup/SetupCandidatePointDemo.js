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
    // Fill background
    CPV_Context.fillStyle = "#808080";
    CPV_Context.fillRect(0, 0, CPV_Canvas.width, CPV_Canvas.height)

    // Draw the candidate point vectors
    DrawCanvasArrow(CPV_Context, 0,0,x,y);
    DrawCanvasArrow(CPV_Context, CPV_Canvas.width,0,x,y);
    DrawCanvasArrow(CPV_Context, 0,CPV_Canvas.height,x,y);
    DrawCanvasArrow(CPV_Context, CPV_Canvas.width,CPV_Canvas.height,x,y);

    // Draw the red dot at the candidate point
    CPV_Context.beginPath();
    CPV_Context.arc(x, y, 3, 0, 2 * Math.PI, false);
    CPV_Context.fillStyle = "#ff0000";
    CPV_Context.fill();

    // Calculate the data to show to the user
    x = Math.round(x * 1000 / CPV_Canvas.width) / 1000;
    y = Math.round(y * 1000 / CPV_Canvas.height) / 1000;
    let span = document.getElementById("demo_CandidatePointVectors:PointCoord");
    span.innerHTML = "(" + x + ", " + y + ")"

    // Calculate and show the vectors
    let v1, v2;
    // A
    v1 = x;
    v2 = -y;
    span = document.getElementById("demo_CandidatePointVectors:A")
    span.innerHTML = "(" + v1 + ", " + v2 + ")"

    // B
    v1 = -x;
    v2 = -y;
    span = document.getElementById("demo_CandidatePointVectors:B")
    span.innerHTML = "(" + v1 + ", " + v2 + ")"

    // C
    v1 = x;
    v2 = y;
    span = document.getElementById("demo_CandidatePointVectors:C")
    span.innerHTML = "(" + v1 + ", " + v2 + ")"

    // D
    v1 = -x;
    v2 = y;
    span = document.getElementById("demo_CandidatePointVectors:D")
    span.innerHTML = "(" + v1 + ", " + v2 + ")"
}

CPV_Canvas.addEventListener('mousedown', (e) => {
    CPVDemoClicked(CPV_Canvas, e)
})

button = document.getElementById("demo_CandidatePointVectors:PickCoord");
button.addEventListener("click", () => {
    let x = 512 * Math.round(Math.random() * 100) / 100
    let y = 512 * Math.round(Math.random() * 100) / 100
    GenerateCandidateVectorsAndUpdateDOM(x, y)
})


let toggleProgress = document.getElementById("toggleSectionComplete");

toggleProgress.addEventListener("change", () => {
    let complete = toggleProgress.checked;
    MarkSectionProgress("CandidatePointVectors", complete);
})
toggleProgress.checked = GetSectionProgress("CandidatePointVectors");