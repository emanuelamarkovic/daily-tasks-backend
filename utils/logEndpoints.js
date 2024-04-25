export default function logEndpoints(app, port) {
  if (app._router && app._router.stack) {
    app._router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        const url = `http://localhost:${port}${r.route.path}`;
        const method = Object.keys(r.route.methods)[0].toUpperCase();
        console.log(`${method} ${url}`);
      }
    });
  }
}
