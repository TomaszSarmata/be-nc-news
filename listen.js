const app = require("./app");

app.listen(9090, (err) => {
  if (err) console.log("error:", err);
  else console.log("Server running on port 9090");
});
