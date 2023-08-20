const { Server } = require("socket.io");
var robot = require("robotjs");

const io = new Server(1609);

console.log("Server Started")

io.on("connection", (socket) => {
  console.log("Connected")
  socket.on("direction", ({x, _, z}) => {
    console.log({x, z})

    const {x: currentX, y: currentY} = robot.getMousePos();
    robot.moveMouse(currentX - (z * 10), currentY - (x * 10))
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected - ${reason}`)
  });
});
