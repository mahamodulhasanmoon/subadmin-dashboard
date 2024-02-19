export function manageCount(infoData: any) {



 let info = infoData.filter((item:any) => "email" in item);
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayFormatted = yesterday.toISOString().split('T')[0];
  
    const totalDataLength = info.length;
    const todayDataLength = info.filter((item: any) => (item as any).updatedAt.split('T')[0] === todayFormatted).length;
    const yesterdayDataLength = info.filter((item: any) => (item as any).updatedAt.split('T')[0] === yesterdayFormatted).length;
    const thisMonthDataLength = info.filter((item: any) => {
      const itemMonthYear = (item as any).createdAt.split('T')[0].slice(0, 7);
      const currentMonthYear = todayFormatted.slice(0, 7);
      return itemMonthYear === currentMonthYear;
    }).length;
    // total Click Count
    const totalClick = infoData.filter((item: any) => {
      const itemMonthYear = (item as any).createdAt.split('T')[0].slice(0, 7);
      const currentMonthYear = todayFormatted.slice(0, 7);
      return itemMonthYear === currentMonthYear;
    }).length;


  
    const todayIncrementPercentage =  parseFloat((Math.max(Math.min(((todayDataLength - yesterdayDataLength) / yesterdayDataLength) * 100, 100), -100)).toFixed(2))
      
  
    const yesterdayIncrementPercentage = parseFloat((Math.max(Math.min(((yesterdayDataLength*30 - thisMonthDataLength) / (yesterdayDataLength*30)) * 100, 100), -100)).toFixed(2))
     
  
    const totalIncrementPercentage =  parseFloat((Math.max(Math.min(((todayDataLength - totalDataLength) / totalDataLength) * 100, 100), -100)).toFixed(2))
 

    const averageLeadData =  parseFloat((Math.max(Math.min(( totalDataLength/totalClick ) * 100, 100), -100)).toFixed(2))
     
  
    return {
      yesterdayDataLength,
      todayDataLength,
      thisMonthDataLength,
      totalIncrementPercentage,
      todayIncrementPercentage,
      yesterdayIncrementPercentage,
      totalClick,
      averageLeadData,
      
    };
  }
  