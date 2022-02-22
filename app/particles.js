//Matrix Canvas
var matrixCanvas = document.getElementById("matrix-canvas");
matrixCanvas.height = window.innerHeight;
matrixCanvas.width = window.innerWidth;
var matrixCtx = matrixCanvas.getContext('2d');

//Wireframe Canvas
var wireframeCanvas = document.getElementById("wireframe-canvas");
wireframeCanvas.height = window.innerHeight;
wireframeCanvas.width = window.innerWidth;
var wireframeCtx = wireframeCanvas.getContext('2d');

var matrixYPositions = Array(75).join(0).split('');
function updateMatrixEffect() {
    /*
    let w = x = y = matrixCanvas.width;
    matrixCtx.fillRect(0, 0, w, w);

    while(w > 0){
        x = y * x >> 8;
        let z = x % 4;
        matrixCtx.fillStyle = 'rgba(0, ' + y/z + ', 0, 1)';
        matrixCtx.fillText(w % 2 ? "1" : "0", w, (x + t*y / z)%y);
        w -= 1;
    }
    */
    let width = matrixCanvas.width;
    let height = matrixCanvas.height;
    let quarterHeight = height/4;
    matrixCtx.fillStyle='rgba(0,0,0,.05)';
    matrixCtx.fillRect(0, 0, width, height);
    matrixCtx.fillStyle='#0F0';
    //matrixCtx.font = '10pt Georgia';
    matrixYPositions.map(function(y, index) {
        let rand = Math.random();
        text = String.fromCharCode(33 + rand*200);
        x = (index * 25) + 10;
        matrixCtx.fillText(text, x, y);
        if (y > quarterHeight + rand * 4e3) {
            matrixYPositions[index] = 0;
        } else {
            matrixYPositions[index] = y + 10;
        }
    });
}


function getRGBAString(r=0, g=0, b=0, a=1) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function updateWireframeEffect(t) {
    var width = wireframeCanvas.width = window.innerWidth;
    var height = wireframeCanvas.height = window.innerHeight;
    wireframeCtx.strokeStyle = 'rgb(0, 184, 255)';
    for(i=-10; ++i < 10; getRGBAString = a => wireframeCtx.lineTo(width/2 + a*220/(z=j-t%1), z + (height/1.4) + (150+Math.tan(j+t&a+9|8)+a*a)/z)) {
        for(j=12; wireframeCtx.beginPath(wireframeCtx.stroke()), getRGBAString(i), --j; getRGBAString(i+1)) {
            getRGBAString(i);
        }
    }

}

var start = Date.now();
function animate() {
    requestAnimationFrame(animate);

    //Update effects
    let t = Date.now() - start;
    updateMatrixEffect();
    updateWireframeEffect(t / 2e3);
}

animate();
