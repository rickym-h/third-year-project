// Heightmap Demo

// greyscale noise demo
button = document.getElementById("demo_2DPerlinHeightMap:GenerateNoise");
button.addEventListener("click", function () {
    FillCanvasWithHeightMap("demo_2DPerlinHeightMap", 4,32, 1, false)
})
FillCanvasWithHeightMap("demo_2DPerlinHeightMap", 4,32, 1, false)

let toggleProgress = document.getElementById("toggleSectionComplete");

toggleProgress.addEventListener("change", ()=> {
    let complete = toggleProgress.checked;
    MarkSectionProgress("Example", complete);
})
toggleProgress.checked = GetSectionProgress("Example");