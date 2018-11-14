class Zen {
  get url() {
    return "https://api.github.com/zen"
  }

  get() {
    return fetch(this.url).then(res => res.text())
  }
}

export default Zen
