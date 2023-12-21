
export function randomColor(){
    var randomRed = Math.floor(Math.random() * 256);
    var randomGreen = Math.floor(Math.random() * 256);
    var randomBlue = Math.floor(Math.random() * 256);
    return  "rgb(" + randomRed + "," + randomGreen + "," + randomBlue + ")";
}
