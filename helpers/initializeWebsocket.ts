import { broadcastAuth } from '@/services';
import Echo from 'laravel-echo';
import { SocketIoChannel } from 'laravel-echo/dist/channel';
import Pusher, { AuthorizerCallback } from 'pusher-js';

export const initializeWebsocket = () => {
  (window as Window & typeof globalThis & { Pusher: any; Echo: Echo }).Pusher =
    Pusher;
  (window as Window & typeof globalThis & { Pusher: any; Echo: Echo }).Echo =
    new Echo({
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      cluster: ['eu'],
      forceTLS: true,
      authorizer: (channel: SocketIoChannel) => {
        return {
          authorize: (socketId: number, callback: AuthorizerCallback) => {
            broadcastAuth(socketId, callback, channel);
          },
        };
      },
    });
};
