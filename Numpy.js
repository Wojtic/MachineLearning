class Numpy {
  constructor() {

  }

  newRand(rows, columns=0) {
    let final = new Array(rows).fill();
    if (columns > 0) {
      final = final.map(() => new Array(columns).fill().map(Math.random)); // Math.random
    } else {
      final = final.map(Math.random); // Math.random
    }
    return final;
  }

  newNumber(number, rows, columns=0) {
    let final = new Array(rows).fill();
    if (columns > 0) {
      final = final.map(() => new Array(columns).fill().map(() => number));
    } else {
      final = final.map(() => number);
    }
    return final;

  }

  mult(matrix, vector) {
    let final = new Array(matrix.length).fill(0);
    for (let i = 0; i < vector.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        final[j] += matrix[j][i] * vector[i];
      }
    }
    return final;
  }

  hadamard(vector1, vector2) { // doesn't work for matricies
    let final = new Array(vector1.length).fill(0);
    for (let i = 0; i < vector1.length; i++) {
      final[i] += vector1[i] * vector2[i];
    }
    return final;
  }

  add(x1, x2) {
    let final;
    if (x1[0][0] != undefined) { // Matrix
      final = x1;
      for (let i = 0; i < x1.length; i++) {
        for (let j = 0; j < x1[i].length; j++) {
          final[i][j] = x1[i][j] + x2[i][j];
        }
      }
    } else { // Vector
      for (let i = 0; i < x1.length; i++) {
        final = new Array(x1.length).fill(0);
        for (let i = 0; i < x1.length; i++) {
          final[i] += x1[i] + x2[i];
        }
      }
    }
    return final;
  }

  subtract(vector1, vector2) {
    let final = new Array(vector1.length).fill();
    for (let i = 0; i < vector1.length; i++) {
      final[i] = vector1[i] - vector2[i];
    }
    return final;
  }

  transpose(array) {
    let final = [];
    for (let i = 0; i < array[0].length; i++) {
      let part = [];
      for (let j = 0; j < array.length; j++) {
        part.push(array[j][i]);
      }
      final.push(part);
    }
    return final;
  }

  weirdMultStuff(vec1, vec2) {
    let final = new Array(vec1.length);
    for (let i = 0; i < vec1.length; i++) {
      let part = new Array(vec2.length);
      for (let j = 0; j < vec2.length; j++) {
        part[j] = vec2[j] * vec1[i];
      }
      final[i] = part;
    }
    return final;
  }

}

Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this[i];
      this[i] = this[j];
      this[j] = temp;
  }
}

Array.prototype.chunk = function(size) {
  let final = [];
  for (let i = 0; i < this.length; i += size) {
    final.push(this.slice(i, i+size))
  }
  return final;
}

Array.prototype.subtract = function(num) {
  if (this[0][0] != undefined) { // Matrix
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this[i].length; j++) {
        this[i][j] -= num;
      }
    }
  } else { // Vector
    for (let i = 0; i < this.length; i++) {
      this[i] -= num;
    }
  }
}

Array.prototype.mult = function(num) {
  if (this[0][0] != undefined) { // Matrix
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this[i].length; j++) {
        this[i][j] *= num;
      }
    }
  } else { // Vector
    for (let i = 0; i < this.length; i++) {
      this[i] *= num;
    }
  }
}

Array.prototype.fillWith = function(num) {
  let final = this;
  if (this[0][0] != undefined) { // Matrix
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this[i].length; j++) {
        final[i][j] = num;
      }
    }
  } else { // Vector
    for (let i = 0; i < this.length; i++) {
      final[i] = num;
    }
  }
  return final;
}
// function sigmoid(z) {return z.map((x) => 1/(1+Math.exp(-x)))}
//
//
//
// let np = new Numpy();
// let sizes = [2, 2, 1];
// //
// // let counter = 0;
// // let w = new Array(sizes.length - 1).fill().map(() => np.newRand(sizes[counter+1],sizes[counter++]));
// // counter = 1;
// // let b = new Array(sizes.length - 1).fill().map(() => np.newRand(sizes[counter++]));
// // counter = 0;
// // let a = new Array(sizes.length).fill().map(() => new Array(sizes[counter++]).fill(1));
// //
// // let testMat = np.newRand(2, 2);
// // let test = [[10, 4, 9, 2, 100], [3, 2, 4]];
// // test.mult(5);
// let c = 0;
// let nablaW = new Array(sizes.length - 1).fill().map(() => np.newNumber(0, sizes[c],sizes[++c-2]));
// console.log(nablaW);
