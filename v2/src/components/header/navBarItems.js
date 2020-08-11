import React from 'react';
import CommunityDropdown, { MobileCommunityDropdown } from "../dropdownButtons/community-dropdown";
import LanguageDropdown from '../dropdownButtons/language-dropdown';
import World from '../../assets/icons/world.svg';

const communityDropdownLinks = [
    {text:"Services", href:"/services.html"},
    {text:"Projects", href:"/projects.html"},
    {text:"Exchanges", href:"/exchanges.html"},
    {text:"Nodes", href:"/nodes.html"},
    {text:"Developer Portal", href:"/developers.html"},
    {text: "Whitepaper", href:"/bitcoin.pdf"},
]
const languageDropdownLinks = [
     {text: "English", href:"/"},
     {text: "Deutsch Deutschland", href:"https://www.bitcoincash.org/de/"},
     {text: "Español", href:"https://www.bitcoincash.org/es/"},
     {text: "Français", href:"https://www.bitcoincash.org/fr/"},
     {text: "日本語", href:"https://www.bitcoincash.org/ja/"},
     {text: "Nederlands", href:"https://www.bitcoincash.org/nl/"},
     {text: "Русский", href:"https://www.bitcoincash.org/ru/"},
     {text: "简体中文", href:"https://www.bitcoincash.org/zh-CN/"},
     {text: "Español Latin América", href:"https://www.bitcoincash.org/es_419/"},
     {text: "Bahasa Indonesia", href:"https://www.bitcoincash.org/id/"},
     {text: "한국어", href:"https://www.bitcoincash.org/ko/"},
     {text: "Português Brasil", href:"https://www.bitcoincash.org/pt-BR/"},
     {text: "Türkçe", href:"https://www.bitcoincash.org/tr/"},
     {text: "繁體中文", href:"https://www.bitcoincash.org/zh-TW/"}
]

const languageDropdown =(<><World></World><span style={{paddingLeft:'5px'}}>Language</span></>);

const navBarItems =[
    {text:"Get started", href:"/start-here.html"},
    {text:"Wallets", href:"/wallets.html"},
    {text:"Logos", href:"/graphics.html"},
    {dropdown: <CommunityDropdown links={communityDropdownLinks} index={4} key={4} text={"Community"}></CommunityDropdown>, mobileDropdown: <MobileCommunityDropdown links={communityDropdownLinks} text={"Community"} key={4}></MobileCommunityDropdown>},
    {text:"About", href:"/faq.html"},
    {dropdown: <LanguageDropdown links={languageDropdownLinks} index={6} key={6} text={languageDropdown}></LanguageDropdown>, mobileDropdown: <MobileCommunityDropdown links={languageDropdownLinks} text={languageDropdown} key={6}></MobileCommunityDropdown>},
];

export const footerItems = [
    {text: "Get Listed", href:"/get-listed.html"},
    {text: "Privacy Policy", href: "/privacy-policy.html"},
    {text: "Legal", href:"/legal.html"},
]

export default navBarItems;

