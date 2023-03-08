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





