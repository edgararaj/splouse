const { Server } = require("socket.io");
var robot = require("robotjs");

const io = new Server(1609);

console.log("Server Started")

io.on("connection", (socket) => {
  console.log("Connected")

  socket.on("direction", ({x, _, z}) => {
    console.log('Moving')

    const {x: currentX, y: currentY} = robot.getMousePos();
    robot.moveMouse(currentX - (z * 10), currentY - (x * 10))
  });

  socket.on("action", action => {
    console.log(`Action - ${action}`)
    const {width: screenWidth, height: screenHeight} = robot.getScreenSize();

    switch (action) {
      case 'center':
        robot.moveMouse(screenWidth / 2, screenHeight / 2)
        break;
      case 'left-click':
        robot.mouseClick()
        break;
      case 'middle-click':
        robot.mouseClick("middle")
        break;
      case 'right-click':
        robot.mouseClick("right")
        break;
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected - ${reason}`)
  });
});
