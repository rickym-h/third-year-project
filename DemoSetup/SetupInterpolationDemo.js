// Interpolation Demo

function UpdateInterpolationDemo() {
    let A = Number(document.getElementById("demo_Interpolation:A").value);
    let B = Number(document.getElementById("demo_Interpolation:B").value);
    let W = Number(document.getElementById("demo_Interpolation:W").value);

    if ((isNaN(A)) || isNaN(B) || isNaN(W)) {
        return;
    }

    let valueL = perlin.interpolate(W, A, B, 0);
    let valueS = perlin.interpolate(W, A, B, 1);
    let valueSS = perlin.interpolate(W, A, B, 2);

    document.getElementById("demo_Interpolation:Value_L").innerText = valueL.toString();
    document.getElementById("demo_Interpolation:Value_S").innerText = valueS.toString();
    document.getElementById("demo_Interpolation:Value_SS").innerText = valueSS.toString();
}

UpdateInterpolationDemo();

