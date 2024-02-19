export const getStatusColor = (status:string) => {
    switch (status) {
      case 'paid':
        return 'text-success'; 
      case 'expired':
        return 'text-[#ff0000]'; 
      case 'trial':
        return 'text-[#00ff45]'; 
      default:
        return '';
    }
  };
  