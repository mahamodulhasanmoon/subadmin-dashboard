// BrevoConversations.js
import React, { useEffect } from 'react';

// TypeScript declaration for the global `window` object
declare global {
  interface Window {
    BrevoConversationsID?: string;
    BrevoConversations?: (...args: any[]) => void;
  }
}

const LiveChat: React.FC = () => {
  useEffect(() => {
    (function(d: Document, w:any, c: string) {
      w.BrevoConversationsID = '66be37ded32661da5704d594';
      w[c] = w[c] || function() {
        (w[c] as any[]).push(arguments);
      };
      const s = d.createElement('script');
      s.async = true;
      s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
      if (d.head) d.head.appendChild(s);
    })(document, window, 'BrevoConversations');
  }, []);

  return null; // This component does not render anything
};

export default LiveChat;