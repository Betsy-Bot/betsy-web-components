export class ScrollPageStep {
  run(navigationInstruction, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return next();
  }
}
