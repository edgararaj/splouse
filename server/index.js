const { Server } = require("socket.io");

const io = new Server(1609);

console.log("Server Started")

io.on("connection", (socket) => {
  console.log("Connected")
  socket.on("direction", (direction) => {
    console.log(direction)
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected - ${reason}`)
  });
});
