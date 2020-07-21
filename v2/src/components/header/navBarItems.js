import React from 'react';
import CommunityDropdown, { MobileCommunityDropdown } from "../dropdownButtons/community-dropdown";

const communityDropdownLinks = [
     {text:"Services", href:"https://bitcoincash.org/services.html"},
     {text:"Projects", href:"https://bitcoincash.org/projects.html"},
     {text:"Exchanges", href:"https://bitcoincash.org/exchanges.html"},
     {text:"Nodes", href:"https://bitcoincash.org/nodes.html"},
     {text:"Developer Portal", href:"https://bitcoincash.org/developers.html"},
     {text: "Whitepaper", href:"https://www.bitcoincash.org/bitcoin.pdf"}
]

const navBarItems =[{index:1, text:"Get started", href:"https://bitcoincash.org/start-here.html"},
     {index:2, text:"Wallets", href:"https://bitcoincash.org/wallets.html"},
     {index:3, text:"Logos", href:"https://bitcoincash.org/graphics.html"},
     {dropdown: <CommunityDropdown links={communityDropdownLinks} index={4} text={"Community"}></CommunityDropdown>, mobileDropdown: <MobileCommunityDropdown links={communityDropdownLinks} text={"Community"}></MobileCommunityDropdown>},
     {index:5, text:"About", href:"https://bitcoincash.org/faq.html"}];

export const footerItems = [
     {text: "Get Listed", href:"https://bitcoincash.org/get-listed.html"},
     {text: "Privacy Policy", href: "https://bitcoincash.org/privacy-policy.html"},
     {text: "Legal", href:"https://bitcoincash.org/legal.html"}
]


export default navBarItems;