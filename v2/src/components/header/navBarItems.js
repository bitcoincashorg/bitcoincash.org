import React from 'react';
import CommunityDropdown, { MobileCommunityDropdown } from "../dropdownButtons/community-dropdown";

const communityDropdownLinks = [
    {text:"Services", href:"/services.html"},
    {text:"Projects", href:"/projects.html"},
    {text:"Exchanges", href:"/exchanges.html"},
    {text:"Nodes", href:"/nodes.html"},
    {text:"Developer Portal", href:"/developers.html"},
    {text: "Whitepaper", href:"/bitcoin.pdf"},
]

const navBarItems =[
    {text:"Get started", href:"/start-here.html"},
    {text:"Wallets", href:"/wallets.html"},
    {text:"Logos", href:"/graphics.html"},
    {dropdown: <CommunityDropdown links={communityDropdownLinks} index={4} key={4} text={"Community"}></CommunityDropdown>, mobileDropdown: <MobileCommunityDropdown links={communityDropdownLinks} text={"Community"} key={4}></MobileCommunityDropdown>},
    {text:"About", href:"/faq.html"},
];

export const footerItems = [
    {text: "Get Listed", href:"/get-listed.html"},
    {text: "Privacy Policy", href: "/privacy-policy.html"},
    {text: "Legal", href:"/legal.html"},
]

export default navBarItems;

