import React from 'react';
import Feature from '../../../components/feature/feature';
import { EN_FROM_PHONE_FEATURE_TITLE, EN_FROM_PHONE_FEATURE_BODY, EN_FROM_PHONE_FEATURE_BTN } from '../../../global/strings';
import cafe from '../../../assets/images/home/features/cafe.png';
import Spend from '../../../assets/icons/spend.svg';

const FromPhoneFeature = () => {
    return (
        <Feature
            featureTitle={EN_FROM_PHONE_FEATURE_TITLE}
            featureBodyText={EN_FROM_PHONE_FEATURE_BODY}
            featureButtonText={EN_FROM_PHONE_FEATURE_BTN} 
            featureIcon={<Spend></Spend>}
            extraPaddingTop={true}
            isReversed={true}
            isDarkBg={true}
            featureImage={<img src={cafe} alt="bch-cafe"></img>}
            btnHref={"https://www.bitcoincash.org/spend-bitcoin-cash.html"}>
        </Feature>
    )
}

export default FromPhoneFeature;