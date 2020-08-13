import React from 'react';
import { IDictionary } from '@/types';

import { ReactComponent as Plus } from '@/assets/svg/plus.svg';
import { ReactComponent as Camera } from '@/assets/svg/camera.svg';

import styles from './styles.module.less';

function CreateAntIcon(Component: any) {
    return (props: IDictionary) => (
        <i className={styles.svg}>
            <span {...props}>{Component && <Component />}</span>
        </i>
    );
}

export const CameraIcon = CreateAntIcon(Camera);
export const PlusIcon = CreateAntIcon(Plus);
