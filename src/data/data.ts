import { formatDate } from "../utils/DateFormater";

export const linksTypeArr = [
    { value: 'eros', label: 'Eros' },
    { value: 'mega', label: 'Mega' },
    { value: 'PD', label: 'PD' },
    { value: 'Skip', label: 'Skip' },
    { value: 'tryst', label: 'Tryst' },
  ];

  export const categoryLinkArr = [
    { value: 'login', label: 'Login Page' ,price:500 },
    { value: 'videoCall', label: 'Video Calling',price:500 },
    // { value: '2024', label: '2024 Update Links'},

  ];

 export const  createSubData =[
    

    {
        site: "mega",
        category: ['login'],
        startDate: formatDate(new Date(Date.now())),
        endDate: formatDate(new Date(Date.now() + 30*24*60*60*1000)),
        status: "trial"
    },
    {
        site: "eros",
        category: ['login'],
        startDate: formatDate(new Date(Date.now())),
        endDate: formatDate(new Date(Date.now() + 30*24*60*60*1000)),
        status: "trial"
    },
    {
        site: "PD",
        category: ['login'],
        startDate: formatDate(new Date(Date.now())),
        endDate: formatDate(new Date(Date.now() + 30*24*60*60*1000)),
        status: "trial"
    },
    {
        site: "tryst",
        category: ['login'],
        startDate: formatDate(new Date(Date.now())),
        endDate: formatDate(new Date(Date.now() + 30*24*60*60*1000)),
        status: "trial"
    },
    {
        site: "Skip",
        category: ['login'],
        startDate: formatDate(new Date(Date.now())),
        endDate: formatDate(new Date(Date.now() + 30*24*60*60*1000)),
        status: "trial"
    }
]

