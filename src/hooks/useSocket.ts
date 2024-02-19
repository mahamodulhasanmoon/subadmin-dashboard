

import io from 'socket.io-client'
import { socketUrl } from '../constant/environment'

const socket = io(socketUrl)

export default function useSocket() {
  return {
    socket,
    socketId: socket.id,
    sendToServer: function (key: string, data: any) {
      socket.emit(key, data)
    },
    receive: function (key: string, f: any) {
      socket.on(key, f)
    },
    joinRoom: function (roomName: any) {
        socket.emit('joinRoom', roomName);
      },
  }
}