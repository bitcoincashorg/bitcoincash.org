import React from 'react';
import Feature from '../../../components/feature/feature';
import moneyPrivate from '../../../assets/images/home/features/moneyPrivate.png';
import { EN_MONEY_PRIVATE_FEATURE_BODY, EN_MONEY_PRIVATE_FEATURE_BTN, EN_MONEY_PRIVATE_FEATURE_TITLE } from '../../../global/strings';
import Privacy from '../../../assets/icons/privacy.svg';

const MoneyPrivateFeature = () => {
    return (
        <Feature
            featureTitle={EN_MONEY_PRIVATE_FEATURE_TITLE}
            featureBodyText={EN_MONEY_PRIVATE_FEATURE_BODY}
            featureButtonText={EN_MONEY_PRIVATE_FEATURE_BTN} 
            featureIcon={<Privacy></Privacy>}
            isReversed={true}
            isDarkBg={true}
            featureImage={<img src={moneyPrivate} alt="bch-money-private"></img>}
            btnHref={"https://cashshuffle.com/"}>
        </Feature>
    )
}

export default MoneyPrivateFeature;