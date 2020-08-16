import { action, computed } from 'easy-peasy';

import { IEffectModel } from '@/types/store/effect';

const effectModel: IEffectModel = {
    active: 0,
    CSSgramList: [
        {
            name: 'NONE',
            className: '',
            opacity: 1,
        },
        {
            name: '1977',
            className: '_1977',
            opacity: 1,
        },
        {
            name: 'Aden',
            className: 'aden',
            opacity: 1,
        },
        {
            name: 'Amaro',
            className: 'amaro',
            opacity: 1,
        },
        {
            name: 'Brannan',
            className: 'brannan',
            opacity: 1,
        },
        {
            name: 'Brooklyn',
            className: '',
            opacity: 1,
        },
        {
            name: 'Clarendon',
            className: '',
            opacity: 1,
        },
        {
            name: 'Earlybird',
            className: '',
            opacity: 1,
        },

        {
            name: `Gingham`,
            className: 'gingham',
            opacity: 1,
        },

        {
            name: `Hudson`,
            className: 'hudson',
            opacity: 1,
        },
        {
            name: `Inkwell`,
            className: 'inkwell',
            opacity: 1,
        },
        {
            name: `Kelvin`,
            className: 'kelvin',
            opacity: 1,
        },
        {
            name: `Lark`,
            className: 'lark',
            opacity: 1,
        },
        {
            name: `Lo-fi`,
            className: 'lofi',
            opacity: 1,
        },
        {
            name: `Maven`,
            className: 'maven',
            opacity: 1,
        },
        {
            name: `Mayfair`,
            className: 'mayfair',
            opacity: 1,
        },
        {
            name: `Moon`,
            className: 'moon',
            opacity: 1,
        },
        {
            name: `Nashville`,
            className: 'nashville',
            opacity: 1,
        },
        {
            name: `Perpetua`,
            className: 'perpetua',
            opacity: 1,
        },
        {
            name: `Reyes`,
            className: 'reyes',
            opacity: 1,
        },
        {
            name: `Rise`,
            className: 'rise',
            opacity: 1,
        },
        {
            name: `Slumber`,
            className: 'slumber',
            opacity: 1,
        },

        {
            name: `Stinson`,
            className: 'stinson',
            opacity: 1,
        },
        {
            name: `Toaster`,
            className: 'toaster',
            opacity: 1,
        },
        {
            name: `Valencia`,
            className: 'valencia',
            opacity: 1,
        },
        {
            name: `Walden`,
            className: 'walden',
            opacity: 1,
        },
        {
            name: `Willow`,
            className: 'willow',
            opacity: 1,
        },
        {
            name: `X-Pro II`,
            className: 'xpro2',
            opacity: 1,
        },
    ],

    activeFilter: computed(({ active, CSSgramList }) => CSSgramList[active] || {}),

    setActive: action((state, active) => {
        Object.assign(state, { active });
    }),
    setOpacity: action(({ active, CSSgramList }, opacity) => {
        Object.assign(CSSgramList[active] || {}, { opacity });
    }),
};

export default effectModel;
