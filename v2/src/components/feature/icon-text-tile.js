import React from 'react';
import tileStyles from './icon-text-tile.module.css';

const IconTextTile = ({icon, text}) => {
    return (
        <div className={tileStyles.tileContainer}>
            <div>{icon}</div>
            <div className={tileStyles.textContainer}>
                {text}
            </div>
        </div>
    )
}

export default IconTextTile;