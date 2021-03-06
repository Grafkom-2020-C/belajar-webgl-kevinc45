function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");
    
    //How to write
    /*
    [X, Y, R, G, B];
    */
    
    var vertices = [
        0.045, 0.5, 0.95, 0.74, 0.44,      // Titik A
        0.5, -0.3, 0.96, 0.58, 0.30,     // Titik B
        -0.3, -0.3, 0.96, 0.58, 0.30,    // Titik C
        0.045, 0.5, 0.65, 0.42, 0.3,       // Titik A
        -0.5, 0.0, 0.65, 0.42, 0.3,      // Titik D
        -0.3, -0.3, 0.65, 0.42, 0.3      // Titik C
    ];
    
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    // Ibaratnya di bawah ini adalah .c
    var vertexShaderSource = `
    attribute vec2 a_Position;
    attribute vec3 a_Color;
    varying vec3 v_Color;
    void main() {
        gl_Position = vec4(a_Position, 0.0, 1.0);
        v_Color = a_Color;
    }
    `;
    var fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_Color;
    void main() {
        gl_FragColor = vec4(v_Color, 1.0);
    }
    `;
    
    // Ibaratnya di bawah ini adalah .o
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
    // Ibarat mengetikkan teks source code ke dalam penampung .c
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    
    // Ibarat mengompilasi .c menjadi .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    
    // Ibarat membuatkan penampung .exe
    var shaderProgram = gl.createProgram();
    
    // Ibarat memasukkan "adonan" .o ke dalam penampung .exe
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    
    // Ibarat menggabung-gabungkan "adonan" yang ada di dalam penampung .exe
    gl.linkProgram(shaderProgram);
    
    // Ibarat memulai menggunakan "cat" .exe ke dalam konteks grafika (penggambaran)
    gl.useProgram(shaderProgram);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    var aColor = gl.getAttribLocation(shaderProgram, "a_Color");
    gl.vertexAttribPointer(
        aPosition, 
        2, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0);
    gl.vertexAttribPointer(
        aColor, 
        3, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aColor);
            
    gl.clearColor(1, 0.87, 0.35, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(100,0,canvas.height, canvas.height)
        
    var primitive = gl.TRIANGLES;
    var offset = 0;
    var nVertex = 6;
    gl.drawArrays(primitive, offset, nVertex);
}