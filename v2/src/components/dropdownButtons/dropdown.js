import React, { useState } from "react";
import { useHover, useToggleLayer, Arrow } from "react-laag";
import dropdownStyles from './dropdown.module.scss';
import { useStaticQuery, graphql} from "gatsby";
import Link from '../../global/link';
import ResizeObserver from 'resize-observer-polyfill';

const DropdownContent = ({layerSide, arrowStyle, links}) => {
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

  var arrow = null
  if (layerSide && arrowStyle) {
    arrow = <Arrow
      style={arrowStyle}
      layerSide={layerSide}
      size={8}
      angle={45}
      roundness={1}
      backgroundColor={theme.primary_dark}
    />
  }

  return (
    <div className={dropdownStyles.dropdownContainer}>
      {arrow}
      {links.map(dropdownLink => {
        return <Link
          className={dropdownStyles.link}
          key={dropdownLink.text}
          style={{backgroundColor: theme.primary_dark, borderBottom: `1px solid ${theme.primary_dark}`}}
          to={dropdownLink.href}>{dropdownLink.text}
        </Link>
      })}
    </div>
  )
}

function MobileDropdown({links, text, navLinkClass}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div onClick={() => setExpanded(!expanded)}>
      <div className={navLinkClass}>{text}</div>
      {expanded && <div><DropdownContent links={links} /></div>}
    </div>
  );
}

function Dropdown({links, index, text}) {
  const triggerRef = React.useRef();
  const [element, toggleLayerProps] = useToggleLayer(
    ({ isOpen, layerProps, layerSide, arrowStyle }) => {
      if (!isOpen) {
        return null;
      }

      return (
        <div {...layerProps} className={dropdownStyles.dropdownContent}>
          <DropdownContent layerSide={layerSide} arrowStyle={arrowStyle} links={links} />
        </div>
      );
    },
    {
      ResizeObserver,
      closeOnOutsideClick: true,
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
    },
  );

  const hoverProps = useHover({
    delayEnter: 300,
    delayLeave: 200,
    onShow: () => toggleLayerProps.openFromRef(triggerRef),
    onHide: () => toggleLayerProps.close()
  });

  return (
    <div data-sal="slide-down"
      data-sal-delay={100 + (index * 100)}
      data-sal-duration="1000"
      data-sal-easing="ease"
      ref={triggerRef} {...hoverProps} className={dropdownStyles.mainNavLink}>
      {text}
      <div>{element}</div>
    </div>
  );
}

export default Dropdown;
export { MobileDropdown };
