function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}


function dsigmoid(y) {
  // return sigmoid(x) * (1s - sigmoid(x));
  return y * (1 - y);
}

// function tanh(x) {
//   var y = Math.tanh(x);
//   return y;
// }
//
// function dtanh(x) {
//   var y = 1 / (pow(Math.cosh(x), 2));
//   return y;
// }


class fnn {
  constructor(arr,lr) {
    this.neurons = [];
    this.weights = [];
    this.lr = lr || 0.01;
    let arrlen = arr.length;
    for(let i=0; i<arrlen; i++){
      this.neurons.push(arr[i]);
    }
    for(let i=0; i<arrlen-1; i++){
      let weight = new matrix(this.neurons[i+1], this.neurons[i]);
      weight.randomize();
      this.weights.push(weight);
    }

  }
  predict(inputarr){
    let inputs = matrix.fromArray(inputarr);
    let outputs = [];
    let weightlen = this.weights.length;
    for(let i=0; i<weightlen; i++){
      inputs = matrix.multiply(this.weights[i], inputs);
      inputs.map(sigmoid);
      outputs.push(inputs);
    }
    return outputs;

  }
  query(arr){
  	let outputs = this.predict(arr);
  	let output = outputs[outputs.length-1].toArray();
  	return output;

  }

  learn(input, outputarr){
  	let inputs = matrix.fromArray(input);
    let weightlen = this.weights.length;
    for(let i=0; i<weightlen; i++){
      inputs = matrix.multiply(this.weights[i], inputs);
      inputs.map(sigmoid);
    }
    let output = inputs;
  	let answer = matrix.fromArray(outputarr);
  	let err = matrix.subtract(answer, output);
  	let errors = [];
  	for (var i = this.weights.length - 1; i >= 0; i--) {
  		errors.push(err);
  		err = matrix.multiply(matrix.transpose(this.weights[i]), err);
  	}
  	errors.reverse();
  	let outputs = [];
  	let inpout = [];
  	inpout.push(matrix.fromArray(input));
  	let inp = matrix.fromArray(input)
    for(let i=0; i<weightlen; i++){
      inp = matrix.multiply(this.weights[i], inp);
      inp.map(sigmoid);
      outputs.push(inp);
      inpout.push(inp);
    }

   for (let i = 0; i < errors.length; i++) {
   	  let gradient = errors[i].multiply(matrix.map(outputs[i], dsigmoid));
   	  let dweight = matrix.multiply(gradient, matrix.transpose(inpout[i]));
   	  dweight.multiply(this.lr);
      this.weights[i] = this.weights[i].add(dweight);
   }



  }
  setLearningRate(learn){
  	this.lr = learn;

  }


  download(filename){
    let arr = {
      "weights": this.weights
    }

    let datStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arr));
    let downloadNode = document.createElement("a");
    downloadNode.setAttribute("href", datStr);
    downloadNode.setAttribute("download", filename + ".json");
    downloadNode.click();
    downloadNode.remove();

  }
  upload(weights){
    for(let i=0; i<this.weights.length; i++){
      for (let m = 0; m < this.weights[i].rows; m++) {
        for (let n = 0; n < this.weights[i].cols; n++) {
          this.weights[i].data[m][n] = weights[i].data[m][n];
        }
      }
    }
  }
  accuracy(input, arr){
    let answer = arr;
    let output = this.query(input);
    answer = math.findmax(answer);
    output = math.findmax(output);
    let score = [];
    if(answer == output){
      score.push(1);
    }else{
      score.push(0);
    }
    let accuracy = math.sumArray(score)/score.length*100;
    return accuracy;

  }

}
