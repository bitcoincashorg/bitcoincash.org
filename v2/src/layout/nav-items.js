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

const communityDropdownLinks = () => {
  return [
    {
      text: fbt("Services", "Community menu 'services' link"),
      href: "/services/",
    },
    {
      text: fbt("Projects", "Community menu 'projects' link"),
      href: "/projects/",
    },
    {
      text: fbt("Exchanges", "Community menu 'exchanges' link"),
      href: "/exchanges/",
    },
    {
      text: fbt("Nodes", "Community menu 'nodes' link"),
      href: "/nodes/",
    },
    {
      text: fbt("Developer Portal", "Community menu 'developper portal' link"),
      href: "/developers/",
    },
    {
      text: fbt("Logos", "Community menu 'logos' link"),
      href: "/graphics/",
    },
    {
      text: fbt("Whitepaper", "Community menu 'whitepaper' link"),
      href: "/bitcoin.pdf",
      localize: false,
    },
    {
      text: fbt("Roadmap", "Community menu 'roadmap' link"),
      href: "/roadmap/",
    },
  ]
}

const NavItems = () => {
  const dropdownLinks = communityDropdownLinks()
  return [
    {
      text: fbt("Start Here", "Top 'Start here' link"),
      href: "/start-here/",
      header: true,
    },
    {
      text: fbt("Getting Started", "Getting started page footer title"),
      href: "/getting-started/",
      footerCategory: "start-here",
    },
    {
      text: fbt("Wallets", "Top 'wallets' link"),
      href: "/wallets/",
      header: true,
      footerCategory: "start-here",
    },
    {
      text: fbt("Explorer", "Link to the block explorer"),
      href: "https://explorer.bitcoincash.org/",
      header: true,
    },
    {
      text: fbt("Community", "Commnity menu"),
      links: dropdownLinks,
      header: true,
    },
    {
      text: fbt("About", "Top 'about' link"),
      href: "/faq/",
      header: true,
    },
    {
      text: (
        <>
          <World />
          <span style={{ paddingLeft: "5px" }}>
            <fbt desc="Language selector menu">Language</fbt>
          </span>
        </>
      ),
      links: languageDropdownLinks,
      header: true,
    },
    {
      text: fbt("Buy Bitcoin Cash", "Buy page footer title"),
      href: "/buy-bitcoin-cash/",
      footerCategory: "start-here",
    },
    {
      text: fbt("Spend Bitcoin Cash", "Spend page footer title"),
      href: "/spend-bitcoin-cash/",
      footerCategory: "start-here",
    },
    {
      text: fbt("Accept Bitcoin Cash", "Accept page footer title"),
      href: "/accept-bitcoin-cash/",
      footerCategory: "start-here",
    },
    {
      text: fbt("FAQ", "FAQ page footer title"),
      href: "/faq/",
      footerCategory: "about",
    },
    {
      text: fbt("Get Listed", "Get Listed page footer title"),
      href: "/get-listed.html",
      footerCategory: "about",
    },
    {
      text: fbt("Privacy Policy", "privacy policy page footer title"),
      href: "/privacy-policy.html",
      footerCategory: "about",
    },
    {
      text: fbt("Legal", "legal page footer title"),
      href: "/legal.html",
      footerCategory: "about",
    },
    {
      text: fbt("Help", "help page footer title"),
      href: "https://help.bitcoincash.org/support/home",
      footerCategory: "about",
    },
  ]
}

export default NavItems
export { communityDropdownLinks }
