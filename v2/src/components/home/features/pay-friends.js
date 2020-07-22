import React from 'react';
import Feature from '../../feature/feature';
import { EN_PAY_FRIENDS_FEATURE_TITLE, EN_PAY_FRIENDS_FEATURE_BODY, EN_PAY_FRIENDS_FEATURE_BTN } from '../../../global/strings';
import friends from '../../../assets/images/home/features/payFriends.png';
import Spend from '../../../assets/icons/pay_friends.svg';

const PayFriendsFeature = () => {
    return (
        <Feature
            featureTitle={EN_PAY_FRIENDS_FEATURE_TITLE}
            featureBodyText={EN_PAY_FRIENDS_FEATURE_BODY}
            featureButtonText={EN_PAY_FRIENDS_FEATURE_BTN} 
            featureIcon={<div style={{position:'relative', left:'-50px'}}><Spend></Spend></div>}
            featureImage={<img src={friends} alt="bch-cafe"></img>}
            btnHref={"/wallets.html"}>
        </Feature>
    )
}

export default PayFriendsFeature;