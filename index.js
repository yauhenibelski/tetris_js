class App {
  field = new Array(20).fill(new Array(13).fill(0));

  run() {
    document.body.innerHTML = this.field.join('<br>');
  }
}

const app = new App();
app.run();
