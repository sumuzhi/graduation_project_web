import io from 'socket.io-client'
const socket = io('ws://localhost:3000')

socket.on('receiveMsg', function (data) { // sdas 
  console.log(data);
})

socket.emit('sendMsg', { name: 'dasdddd', data: "112sss3211" })