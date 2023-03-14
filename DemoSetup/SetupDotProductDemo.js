

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
    DrawCanvasArrow(DP_Context,
        (DP_Canvas.width/2),
        (DP_Canvas.width/2),
        (Ax + 1)*256,
        (Ay + 1)*256
    )
    DrawCanvasArrow(DP_Context,
        (DP_Canvas.width/2),
        (DP_Canvas.width/2),
        (Bx+1)*(DP_Canvas.width/2),
        (By+1)*(DP_Canvas.width/2)
    )
    DP_Context.strokeStyle = "#000";
    DP_Context.lineWidth = 1;
}

button = document.getElementById("demo_DotProduct:NormaliseA");
button.addEventListener("click", function () {

    let x = Number(document.getElementById("demo_DotProduct:Ax").value);
    let y = Number(document.getElementById("demo_DotProduct:Ay").value);

    let length = Math.sqrt(x*x + y*y);
    x /= length;
    y /= length;

    document.getElementById('demo_DotProduct:Ax').value = x;
    document.getElementById('demo_DotProduct:Ay').value = y;
    UpdateDotProductDemo();
})

button = document.getElementById("demo_DotProduct:NormaliseB");
button.addEventListener("click", function () {

    let x = Number(document.getElementById("demo_DotProduct:Bx").value);
    let y = Number(document.getElementById("demo_DotProduct:By").value);

    let length = Math.sqrt(x*x + y*y);
    x /= length;
    y /= length;

    document.getElementById('demo_DotProduct:Bx').value = x;
    document.getElementById('demo_DotProduct:By').value = y;
    UpdateDotProductDemo();
})

UpdateDotProductDemo();

let toggleProgress = document.getElementById("toggleSectionComplete");

toggleProgress.addEventListener("change", ()=> {
    let complete = toggleProgress.checked;
    MarkSectionProgress("DotProducts", complete);
})



toggleProgress.checked = GetSectionProgress("DotProducts");