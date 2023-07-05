import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export const initializeWebsocket = () => {
  (window as Window & typeof globalThis & { Pusher: any; Echo: Echo }).Pusher =
    Pusher;
  (window as Window & typeof globalThis & { Pusher: any; Echo: Echo }).Echo =
    new Echo({
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      cluster: ['eu'],
      forceTLS: true,
      authEndpoint: `${process.env.NEXT_PUBLIC_API_BASE_URL}/broadcasting/auth`,
      auth: {
        headers: {
          'X-CSRF-Token': document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content'),
        },
      },
    });
};
