class lstm {
  constructor(nIn, nHidden, nOutput, lr) {
    this.input = nIn
    this.hidden = nHidden
    this.output = nOutput
    this.lr = lr || 0.3

    this.wc = new Matrix(nHidden, nIn).randomize()
    this.wo = new Matrix(nHidden, nIn).randomize()
    this.wi = new Matrix(nHidden, nIn).randomize()
    this.wf = new Matrix(nHidden, nIn).randomize()

    this.uc = new Matrix(nHidden, nHidden).randomize()
    this.uo = new Matrix(nHidden, nHidden).randomize()
    this.ui = new Matrix(nHidden, nHidden).randomize()
    this.uf = new Matrix(nHidden, nHidden).randomize()

    this.V = new Matrix(nOutput, nHidden).randomize()
  }

  forward(x){
    let tl = x.length  //time length
    //forget gate
    let f = new Array()
    // Input gate
    let i = new Array()
    //output gate
    let o = new Array()
    //intermediate cellstate
    let ic = new Array()
    //cellstate
    let c = new Array()
    //new state
    let h = new Array()
    h.push(new Matrix(this.hidden, 1))
    console.log(this.ui, h[0])
    let it = Matrix.add(this.wi.multiply(x[0]), this.ui.multiply(h[0]))
    i.push(it)
    // for(let t=0; t<tl; t++){
    // }
    console.log(i)
  }
}
