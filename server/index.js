const { Server } = require("socket.io");
var robot = require("robotjs");

const io = new Server(1609);

console.log("Server Started")

io.on("connection", (socket) => {
  console.log("Connected")
  socket.on("direction", (direction) => {
    console.log(direction)

    const {x: currentX, y: currentY} = robot.getMousePos();

    console.log(currentX, currentY)

    switch (direction) {
      case "top":
          robot.moveMouse(currentX, currentY - 5);   
        break;
      
      case "bottom":
        robot.moveMouse(currentX, currentY + 5);  
        break;

      case "left":
          robot.moveMouse(currentX - 5, currentY);   
        break;
      
      case "right":
        robot.moveMouse(currentX + 5, currentY);  
        break;
    
      default:
        break;
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected - ${reason}`)
  });
});
