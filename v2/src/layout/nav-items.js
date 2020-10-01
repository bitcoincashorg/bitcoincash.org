import React from "react"
import fbt from "fbt"
import World from "assets/icons/world.svg"
import locales from "i18n/locales"

const languageDropdownLinks = Object.entries(locales).map(([_, locale]) => {
  let link = "/"
  if (locale.slug) {
    link += locale.slug + "/"
  }

  return { text: locale.displayName, href: link, localize: false }
})

const communityDropdownLinks = [
  {
    text: "Services",
    href: "/services/",
  },
  {
    text: "Projects",
    href: "/projects/",
  },
  {
    text: "Exchanges",
    href: "/exchanges/",
  },
  {
    text: "Nodes",
    href: "/nodes/",
  },
  {
    text: "Developer Portal",
    href: "/developers/",
  },
  {
    text: "Logos",
    href: "/graphics/",
  },
  {
    text: "Whitepaper",
    href: "/bitcoin.pdf",
    localize: false,
  },
  {
    text: "Roadmap",
    href: "/roadmap/",
  },
]

const navItems = [
  {
    text: "Start Here",
    href: "/start-here/",
    header: true,
  },
  {
    text: "Getting Started",
    href: "/getting-started/",
    footerCategory: "start-here",
  },
  {
    text: "Wallets",
    href: "/wallets/",
    header: true,
    footerCategory: "start-here",
  },
  {
    text: "Explorer",
    href: "https://explorer.bitcoincash.org/",
    header: true,
  },
  {
    text: "Community",
    links: communityDropdownLinks,
    header: true,
    communityDropdown: true,
  },
  {
    text: "About",
    href: "/faq/",
    header: true,
  },
  {
    text: (
      <>
        <World />
        <span style={{ paddingLeft: "5px" }}>Language</span>
      </>
    ),
    links: languageDropdownLinks,
    header: true,
  },
  {
    text: "Buy Bitcoin Cash",
    href: "/buy-bitcoin-cash/",
    footerCategory: "start-here",
  },
  {
    text: "Spend Bitcoin Cash",
    href: "/spend-bitcoin-cash/",
    footerCategory: "start-here",
  },
  {
    text: "Accept Bitcoin Cash",
    href: "/accept-bitcoin-cash/",
    footerCategory: "start-here",
  },
  {
    text: "FAQ",
    href: "/faq/",
    footerCategory: "about",
  },
  {
    text: "Get Listed",
    href: "/get-listed.html",
    footerCategory: "about",
  },
  {
    text: "Privacy Policy",
    href: "/privacy-policy.html",
    footerCategory: "about",
  },
  {
    text: "Legal",
    href: "/legal.html",
    footerCategory: "about",
  },
  {
    text: "Help",
    href: "https://help.bitcoincash.org/support/home",
    footerCategory: "about",
  },
]

export default navItems
