
import { HiInformationCircle } from "react-icons/hi2";
import { CgWebsite } from "react-icons/cg";
import { GoBell, GoPerson } from "react-icons/go";
import { CiLink } from "react-icons/ci";
export const sideBarRoutes:Array<any> = [

    {
        title:"Information",
        icon: HiInformationCircle,
        link:'/information'
    },
    {
        title:"Shortener",
        icon: CiLink,
        link:'/shorter',
        new:true
    },
    {
        title:"Websites",
        icon: CgWebsite,
        link:'/web_links'
    },
    {
        title:"Notice",
        icon: GoBell,
        link:'/notices'
    }
];

export const sideBarAdminRoutes:Array<any> = [

    {
        title:"Information",
        icon: HiInformationCircle,
        link:'/information'
    },
    // {
    //     title:"Manage Websites",
    //     icon: GoBell,
    //     link:'/manage_links'
    // },
    {
        title:"All user",
        icon: GoPerson,
        link:'/users'
    },
    // {
    //     title:"Pending Requests",
    //     icon: GoPerson,
    //     link:'/pending'
    // },
    {
        title:"Shortener",
        icon: CiLink,
        link:'/shorter',
        new:true
    },
    {
        title:"Websites",
        icon: CgWebsite,
        link:'/web_links'
    },
    {
        title:"Notice",
        icon: GoBell,
        link:'/notices'
    },
    // {
    //     title:"Add Service",
    //     icon: GoBell,
    //     link:'/services'
    // }

];



