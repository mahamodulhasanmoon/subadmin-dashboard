export const playNotificationSound = async() => {
try {
    const audio = new Audio('notification.mp3');
    await audio.play()
} catch (error:any) {
    console.error('Failed to play notification',error.message)
}
  };
