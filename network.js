function sigmoid(z) {return z.map((x) => 1/(1+Math.exp(-x)))}
function sigmoidDerivative(z) {let c = 0; return z.map(() => sigmoid(z)[c] * (1 - sigmoid(z)[c++]))}

let np = new Numpy();

class Network {
  constructor(sizes) {
    let c = 1;
    this.w = new Array(sizes.length - 1).fill().map(() => np.newRand(sizes[c],sizes[(++c)-2]));
    c = 1;
    this.b = new Array(sizes.length - 1).fill().map(() => np.newRand(sizes[c++]));
    c = 0;
    this.a = new Array(sizes.length).fill().map(() => new Array(sizes[c++]).fill(0));
    this.sizes = sizes;
  }

  predict(input) {
    this.a[0] = input;
    for (let i = 0; i < this.sizes.length-1; i++) {
      this.a[i+1] = sigmoid(np.add(np.mult(this.w[i], this.a[i]), this.b[i]))
    }
    return this.a[this.a.length-1];
  }

  costDerivative(outputActivations, y) {
    return np.subtract(outputActivations, y);
  }

  backprop(x, y) {

    let c = 0;
    let nablaW = new Array(this.sizes.length - 1).fill().map(() => np.newNumber(0, this.sizes[c],this.sizes[++c-2]));
    c = 1;
    let nablaB = new Array(this.sizes.length - 1).fill().map(() => np.newNumber(0, this.sizes[c++]));

    //console.log(nablaW);

    let activation = x;
    let activations = [x];

    let zs = [];

    for (let i = 0; i < this.sizes.length-1; i++) {
      let z = np.add(np.mult(this.w[i], activation), this.b[i]);
      zs.push(z);

      activation = sigmoid(z);
      activations.push(activation);
    }

    let delta = np.hadamard(this.costDerivative(activations[activations.length-1], y), sigmoidDerivative(zs[zs.length-1]));
    nablaB[nablaB.length-1] = delta;
    nablaW[nablaW.length-1] = np.weirdMultStuff(delta, activations[activations.length-1]);

    for (let l = 2; l < this.sizes.length; l++) {
      let z = zs[zs.length-l];
      let sp = sigmoidDerivative(z);

      delta = np.hadamard(np.mult(np.transpose(this.w[this.w.length-l+1]), delta), sp);

      nablaB[nablaB.length-l] = delta;
      nablaW[nablaW.length-l] = np.weirdMultStuff(delta, activations[activations.length-l-1]);
    }


    return [nablaB, nablaW];
  }

  updateMiniBatch(miniBatch, learingRate) {

    let nablaW = this.w;
    let nablaB = this.b;

    for (let i = 0; i < this.w.length; i++) {
      nablaW[i] = this.w[i].fillWith(0);
      nablaB[i] = this.b[i].fillWith(0);
    }

    //console.log(nablaB);

    for (let i = 0; i < miniBatch.length; i++) {
      let deltaNablaB = this.backprop(miniBatch[i][0], miniBatch[i][1]);
      let deltaNablaW = deltaNablaB[1];
      deltaNablaB = deltaNablaB[0];

      //console.log(nablaW, deltaNablaW);

      for (let l = 0; l < deltaNablaB.length; l++) {
        nablaB[l] = np.add(nablaB[l], deltaNablaB[l]);
        //console.log(deltaNablaW, nablaW);
        nablaW[l] = np.add(nablaW[l], deltaNablaW[l]);
      }


    }
    for (let l = 0; l < this.w.length; l++) {
      this.w[l].subtract(nablaW[l].mult(learingRate/miniBatch.length));
      this.b[l].subtract(nablaB[l].mult(learingRate/miniBatch.length));
    }
  }

  sgd(trainingData, epochs, miniBatchSize, learingRate) {
    for (let i = 0; i < epochs; i++) {
      trainingData.shuffle();

      let miniBatches = trainingData.chunk(miniBatchSize);
      for (let i = 0; i < miniBatches.length; i++) {
        this.updateMiniBatch(miniBatches[i], learingRate);
      }
    }
  }
}

let net = new Network([2, 2, 1]);


net.sgd([[[1, 0],[1]],[[0, 1],[1]], [[0, 0], [0]], [[1, 1], [0]]], 1, 2, 0.01);


console.log(net.predict([1, 0]));
