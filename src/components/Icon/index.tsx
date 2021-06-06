import React from 'react';
import { IDictionary } from '@/types';
import { ReactComponent as Home } from '@/assets/svg/home.svg';
import { ReactComponent as Plus } from '@/assets/svg/plus.svg';
import { ReactComponent as Camera } from '@/assets/svg/camera.svg';
import { ReactComponent as Transparency } from '@/assets/svg/transparency.svg';
import { ReactComponent as Brightness } from '@/assets/svg/brightness.svg';
import { ReactComponent as Blend } from '@/assets/svg/blend.svg';
import { ReactComponent as Channel } from '@/assets/svg/channel.svg';
import { ReactComponent as Interpolarion } from '@/assets/svg/interpolation.svg';

import styles from './styles.module.less';

function CreateAntIcon(Component: any) {
    return (props: IDictionary) => (
        <i className={styles.svg}>
            <span {...props}>{Component && <Component />}</span>
        </i>
    );
}

export const HomeIcon = CreateAntIcon(Home);
export const CameraIcon = CreateAntIcon(Camera);
export const PlusIcon = CreateAntIcon(Plus);
export const TransparencyIcon = CreateAntIcon(Transparency);
export const BrightnessIcon = CreateAntIcon(Brightness);
export const BlendIcon = CreateAntIcon(Blend);
export const ChannelIcon = CreateAntIcon(Channel);
export const InterpolarionIcon = CreateAntIcon(Interpolarion);
