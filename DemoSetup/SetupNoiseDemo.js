// greyscale noise demo
button = document.getElementById("demo_2DPerlin:GenerateNoise");
button.addEventListener("click", function () {
    FillCanvasWithNoise("demo_2DPerlin", 4, 32, 1, false)
})
FillCanvasWithNoise("demo_2DPerlin", 4, 32, 1, false)


let toggleProgress = document.getElementById("toggleSectionComplete");

toggleProgress.addEventListener("change", () => {
    let complete = toggleProgress.checked;
    MarkSectionProgress("Introduction", complete);
})


toggleProgress.checked = GetSectionProgress("Introduction");