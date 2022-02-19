let blob = new Blob([1,2,3,4,5]);
file.onload = function(result) {
    console.log(this.result)
}
file.readAsArrayBuffer(blob);