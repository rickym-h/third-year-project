function updateLearnedPages() {
    if (!localStorage.LearnPagesStatus) {
        let myObject = {
            "Introduction": false,
            "GridVectors": false,
            "CandidatePointVectors": false,
            "DotProducts": false,
            "Interpolation": false,
            "Example": false,
            "FractalNoise": false,
            "BeyondPerlin": false,
        }
        localStorage.setItem("LearnPageStatus", JSON.stringify(myObject));
    }

    if (!localStorage.LearnPagesStatus) {
        return;
    }

    let myObject = JSON.parse(localStorage.getItem("LearnPageStatus"));

    myObject["Introduction"] = true;

    for (let key in myObject) {
        let value = myObject[key];
        console.log(key, value);
        if (value) {
            document.getElementById(key).classList.remove("incomplete-indicator");
        } else {
            document.getElementById(key).classList.add("incomplete-indicator");
        }
    }


}


updateLearnedPages()
