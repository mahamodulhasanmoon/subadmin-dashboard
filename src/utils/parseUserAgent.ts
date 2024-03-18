function parseUserAgent(userAgent:any) {
    const ua = userAgent || navigator.userAgent;
    const os = {
       name: '',
       version: '',
    };
    const browser = {
       name: '',
       version: '',
    };
   
    // Detect OS
    if (/Windows NT 10.0/.test(ua)) {
       os.name = 'Windows 10';
    } else if (/Mac OS X/.test(ua)) {
       os.name = 'Mac OS X';
    } else if (/Linux/.test(ua)) {
       os.name = 'Linux';
    }
   
    // Detect browser
    if (/Chrome\/(\d+)/.test(ua)) {
       browser.name = 'Chrome';
       browser.version = RegExp.$1;
    } else if (/Firefox\/(\d+)/.test(ua)) {
       browser.name = 'Firefox';
       browser.version = RegExp.$1;
    } else if (/Safari\/(\d+)/.test(ua)) {
       browser.name = 'Safari';
       browser.version = RegExp.$1;
    }
   
    // Detect device
    let device = 'Unknown';
    if (/iPhone/.test(ua)) {
       device = 'iPhone';
    } else if (/iPad/.test(ua)) {
       device = 'iPad';
    } else if (/Android/.test(ua)) {
       device = 'Android';
    }
   
    return {
       os: `${os.name} ${os.version}`,
       browser: `${browser.name} ${browser.version}`,
       device: device,
    };
   }

   export default parseUserAgent