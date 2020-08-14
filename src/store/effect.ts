import { action, computed } from 'easy-peasy';

import { IEffectModel } from '@/types/store/effect';

const effectModel: IEffectModel = {
    active: 0,
    CSSgramList: [
        {
            name: 'NONE',
            className: '',
        },
        {
            name: '1977',
            className: '_1977',
        },
        {
            name: 'Aden',
            className: 'aden',
        },
        {
            name: 'Amaro',
            className: 'amaro',
        },
        {
            name: 'Brannan',
            className: 'brannan',
        },
        {
            name: 'Brooklyn',
            className: '',
        },
        {
            name: 'Clarendon',
            className: '',
        },
        {
            name: 'Earlybird',
            className: '',
        },

        {
            name: `Gingham`,
            className: 'gingham',
        },

        {
            name: `Hudson`,
            className: 'hudson',
        },
        {
            name: `Inkwell`,
            className: 'inkwell',
        },
        {
            name: `Kelvin`,
            className: 'kelvin',
        },
        {
            name: `Lark`,
            className: 'lark',
        },
        {
            name: `Lo-fi`,
            className: 'lofi',
        },
        {
            name: `Maven`,
            className: 'maven',
        },
        {
            name: `Mayfair`,
            className: 'mayfair',
        },
        {
            name: `Moon`,
            className: 'moon',
        },
        {
            name: `Nashville`,
            className: 'nashville',
        },
        {
            name: `Perpetua`,
            className: 'perpetua',
        },
        {
            name: `Reyes`,
            className: 'reyes',
        },
        {
            name: `Rise`,
            className: 'rise',
        },
        {
            name: `Slumber`,
            className: 'slumber',
        },

        {
            name: `Stinson`,
            className: 'stinson',
        },
        {
            name: `Toaster`,
            className: 'toaster',
        },
        {
            name: `Valencia`,
            className: 'valencia',
        },
        {
            name: `Walden`,
            className: 'walden',
        },
        {
            name: `Willow`,
            className: 'willow',
        },
        {
            name: `X-Pro II`,
            className: 'xpro2',
        },
    ],

    activeFilter: computed(({ active, CSSgramList }) => CSSgramList[active] || {}),

    setActive: action((state, active) => {
        Object.assign(state, { active });
    }),
};

export default effectModel;
