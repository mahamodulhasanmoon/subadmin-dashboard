export const showPushNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Notification Title', {
            body: "An User is Being Signup. Please check.",
            icon: 'favicon.ico',
          });
        } else if (permission === 'denied') {
          console.log('Notification permission denied');
        } else {
          console.log('Notification permission not granted or denied');
        }
      });
    } else {
      console.log('Notifications not supported in this browser');
    }
  };
  