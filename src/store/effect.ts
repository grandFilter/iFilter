import { action, computed, thunk } from 'easy-peasy';

import { IEffectModel } from '@/types/store/effect';

const effectModel: IEffectModel = {
    active: -1,
    CSSgramList: [
        {
            name: '1997',
            filter: `contrast(1.1) brightness(1.1) saturate(1.3)`,
        },
        {
            name: 'aden',
            filter: `hue-rotate(-20deg) contrast(0.9) saturate(0.85) brightness(1.2)`,
        },
        {
            name: 'amaro',
            filter: `hue-rotate(-10deg) contrast(0.9) brightness(1.1) saturate(1.5)`,
        },
        {
            name: 'brannan',
            filter: `sepia(0.5) contrast(1.4)`,
        },
        {
            name: 'brooklyn',
            filter: `contrast(0.9) brightness(1.1)`,
        },
        {
            name: 'clarendon',
            filter: `contrast(1.2) saturate(1.35)`,
        },
        {
            name: 'cssgram', // aden
            filter: `hue-rotate(-20deg) contrast(0.9) saturate(0.85) brightness(1.2)`,
        },
        {
            name: 'earlybird',
            filter: `contrast(0.9) sepia(0.2)`,
        },

        /* {
            name: '',
            filter: ``,
        }, */
    ],

    activeFilter: computed(({ active, CSSgramList }) => CSSgramList[active]?.filter),

    setActive: action((state, active) => {
        Object.assign(state, { active });
    }),
};

export default effectModel;
