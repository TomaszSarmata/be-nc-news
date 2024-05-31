const app = require("./app");

const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) console.log("error:", err);
  else console.log(`Server running on ${PORT}`);
});
