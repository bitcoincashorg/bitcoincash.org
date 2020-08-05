import React, { useState } from "react";
import { useHover, useToggleLayer, Arrow } from "react-laag";
import dropdownStyles from './dropdown.module.css';
import headerStyles from '../header/header.module.scss';
import communityDropdownStyles from './community-dropdown.module.css';
import { useStaticQuery, graphql} from "gatsby";
import Link from '../../global/link';
import ResizeObserver from 'resize-observer-polyfill';

const CommunityDropdownContent = ({layerSide, arrowStyle, links}) => {
  const data = useStaticQuery(graphql`
  query CommunityDropdownThemeQuery {
    site {
      siteMetadata {
        themeColours {
          background_dark,
          primary_dark
        }
      }
    }
  }
`)
const theme = data.site.siteMetadata.themeColours;
  return (
    <div className={communityDropdownStyles.dropdownContainer}>
        {layerSide && arrowStyle && 
           <Arrow
            style={arrowStyle}
            layerSide={layerSide}
            size={8}
            angle={45}
            roundness={1}
            backgroundColor={theme.primary_dark}
          />}
          {links.map(dropdownLink => { 
            return <Link className={communityDropdownStyles.link} key={dropdownLink.text} style={{backgroundColor: theme.primary_dark}} to={dropdownLink.href}>{dropdownLink.text}</Link>
          })}
    </div>
  )
}

function MobileCommunityDropdown({links, text}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
    <div onClick={() => setExpanded(!expanded)}>
      <div className={headerStyles.mobileNavLink}>{text}</div>
      {expanded && <div><CommunityDropdownContent links={links}></CommunityDropdownContent></div>}
    </div>
  </>
);
}

function CommunityDropdown({links, index, text}) {
  const triggerRef = React.useRef();
  const [element, toggleLayerProps] = useToggleLayer(
    ({ isOpen, layerProps, layerSide, arrowStyle }) => 
      isOpen &&
        <div {...layerProps} className={dropdownStyles.dropdownContent}>
          <CommunityDropdownContent layerSide={layerSide} arrowStyle={arrowStyle} links={links}></CommunityDropdownContent>
        </div>,  
        {
        ResizeObserver,
      placement: {
        anchor: "BOTTOM_CENTER",
        autoAdjust: true,
        snapToAnchor: true,
        triggerOffset: 12,
        scrollOffset: 16,
        possibleAnchors: [
          "BOTTOM_CENTER",
          "LEFT_CENTER",
          "RIGHT_CENTER"
        ]
      },
      closeOnOutsideClick: true
    });
    
  const hoverProps = useHover({
    delayEnter: 300,
    delayLeave: 200,
    onShow: () => toggleLayerProps.openFromRef(triggerRef),
    onHide: () => toggleLayerProps.close()
  });

  return (
      <>
      <div data-sal="slide-down"
            data-sal-delay={100 + (index * 100)}
            data-sal-duration="1000"
            data-sal-easing="ease"
            ref={triggerRef} {...hoverProps} className={communityDropdownStyles.mainNavLink}>
        {text}
        <div>{element}</div>
      </div>
    </>
  );
}

export default CommunityDropdown;
export { MobileCommunityDropdown };