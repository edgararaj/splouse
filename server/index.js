const dgram = require('node:dgram');
const robot = require("robotjs");

const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.on('connect', () => {
  console.log(`Somebody connected`);
});

server.on('close', () => {
  console.log(`Connection Closed`);
});

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

const handleDirection = ({x, z}) => {
  console.log('Moving')

  const {x: currentX, y: currentY} = robot.getMousePos();
  robot.moveMouse(currentX - (z * 10), currentY - (x * 10))
}

const handleAction = action => {
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
}

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  console.log({msg, rinfo});
 
})

server.bind(1609)