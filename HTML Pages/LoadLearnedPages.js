function updateLearnedPages() {
    if (localStorage.getItem("LearnPageStatus") == null) {
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
        console.log(localStorage.getItem("LearnPageStatus"))
    }

    if (localStorage.getItem("LearnPageStatus") == null) {
        console.log("No LearnPageStatus object - exiting...")
        return;
    }
    console.log(localStorage.getItem("LearnPageStatus"))

    let myObject = JSON.parse(localStorage.getItem("LearnPageStatus"));

    myObject["Introduction"] = true;

    for (let key in myObject) {
        let value = myObject[key];
        console.log(key, value);
        if (value) {
            document.getElementById(key).classList.remove("incomplete-indicator");
            document.getElementById(key).innerText = "DONE";
        } else {
            document.getElementById(key).classList.add("incomplete-indicator");
            document.getElementById(key).innerText = "Incomplete";
        }
    }


}


updateLearnedPages()


