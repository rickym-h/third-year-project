let toggleProgress = document.getElementById("toggleSectionComplete");

toggleProgress.addEventListener("change", () => {
    let complete = toggleProgress.checked;
    MarkSectionProgress("BeyondPerlin", complete);
})


toggleProgress.checked = GetSectionProgress("BeyondPerlin");