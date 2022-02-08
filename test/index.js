const child_process = require("child_process");
let cloneSpawn = child_process.spawn(
  "git",
  ["clone", "--progress", "git@github.com:thingsmatrix/things-docs.git"],
  { shell: true }
);
cloneSpawn.stderr.on("data", (d) => {
  console.log(d.toString());
});
