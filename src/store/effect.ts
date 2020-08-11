import { action, computed, thunk } from 'easy-peasy';

import { IEffectModel } from '@/types/store/effect';

const effectModel: IEffectModel = {
    active: -1,
    CSSgramList: [
        {
            name: '1997',
            filter: `contrast(1.1) brightness(1.1) saturate(1.3)`,
            after: {
                background: 'rgba(243,106,188,.3)',
                mixBlendMode: 'screen',
            },
        },
        {
            name: 'Aden',
            filter: `hue-rotate(-20deg) contrast(0.9) saturate(0.85) brightness(1.2)`,
            after: {
                background: `linear-gradient(to right, rgba(66, 10, 14, 0.2), transparent)`,
                mixBlendMode: 'darken',
            },
        },
        {
            name: 'Amaro',
            filter: `hue-rotate(-10deg) contrast(0.9) brightness(1.1) saturate(1.5)`,
            after: {
                background: '',
                mixBlendMode: 'screen',
            },
        },
        {
            name: 'Brannan',
            filter: `sepia(0.5) contrast(1.4)`,
            after: {
                background: `rgba(161, 44, 199, 0.31)`,
                mixBlendMode: 'lighten',
            },
        },
        {
            name: 'Brooklyn',
            filter: `contrast(0.9) brightness(1.1)`,
            after: {
                background: `radial-gradient(circle, rgba(168, 223, 193, 0.4) 70%, #c4b7c8)`,
                mixBlendMode: 'overlay',
            },
        },
        {
            name: 'Clarendon',
            filter: `contrast(1.2) saturate(1.35)`,
            after: {
                background: 'rgba(127, 187, 227, 0.2)',
                mixBlendMode: 'screen',
            },
        },
        {
            name: 'Earlybird',
            filter: `contrast(0.9) sepia(0.2)`,
            after: {
                background: 'radial-gradient(circle, #d0ba8e 20%, #360309 85%, #1d0210 100%)',
                mixBlendMode: 'overlay',
            },
        },

        {
            name: `Gingham`,
            filter: `brightness(1.05) hue-rotate(-10deg)`,
            after: {
                background: `lavender`,
                mixBlendMode: `soft-light`,
            },
        },

        {
            name: `Hudson`,
            filter: `brightness(1.2) contrast(0.9) saturate(1.1)`,
            after: {
                background: `radial-gradient(circle, #a6b1ff 50%, #342134)`,
                mixBlendMode: `multiply`,
                opacity: 0.5,
            },
        },
        {
            name: `Inkwell`,
            filter: `sepia(0.3) contrast(1.1) brightness(1.1) grayscale(1`,
            after: {
                background: ``,
                mixBlendMode: ``,
            },
        },
        {
            name: `Kelvin`,
            filter: ``,
            before: {
                background: `#b77d21`,
                mixBlendMode: `color-dodge`,
            },
            after: {
                background: `#382c34`,
                mixBlendMode: `overlay`,
            },
        },
        {
            name: `Lark`,
            filter: `contrast(0.9)`,
            before: {
                background: `#22253f`,
                mixBlendMode: `color-dodge`,
            },
            after: {
                background: `rgba(242, 242, 242, 0.8)`,
                mixBlendMode: `darken`,
            },
        },
        {
            name: `Lo-fi`,
            filter: `saturate(1.1) contrast(1.5)`,
            before: {
                background: ``,
                mixBlendMode: ``,
            },
            after: {
                background: `radial-gradient(circle, transparent 70%, #222222 150%)`,
                mixBlendMode: `multiply`,
            },
        },
        {
            name: `Maven`,
            filter: `sepia(0.25) brightness(0.95) contrast(0.95) saturate(1.5)`,
            before: {
                background: ``,
                mixBlendMode: ``,
            },
            after: {
                background: `rgba(3, 230, 26, 0.2)`,
                mixBlendMode: `hue`,
            },
        },
        {
            name: `Mayfair`,
            filter: `contrast(1.1) saturate(1.1)`,
            before: {
                background: ``,
                mixBlendMode: ``,
            },
            after: {
                background: `radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.8), rgba(255, 200, 200, 0.6), #111111 60%)`,
                mixBlendMode: `overlay`,
                opacity: 0.4,
            },
        },
        {
            name: `Moon`,
            filter: `grayscale(1) contrast(1.1) brightness(1.1)`,
            before: {
                background: `#a0a0a0`,
                mixBlendMode: `soft-light`,
            },
            after: {
                background: `#383838`,
                mixBlendMode: `lighten`,
            },
        },
        {
            name: `Nashville`,
            filter: `sepia(0.2) contrast(1.2) brightness(1.05) saturate(1.2)`,
            before: {
                background: `rgba(247, 176, 153, 0.56)`,
                mixBlendMode: `darken`,
            },
            after: {
                background: `rgba(0, 70, 150, 0.4`,
                mixBlendMode: `lighten`,
            },
        },
        {
            name: `Perpetua`,
            filter: ``,
            before: {
                background: ``,
                mixBlendMode: ``,
            },
            after: {
                background: `linear-gradient(to bottom, #005b9a, #e6c13d)`,
                mixBlendMode: `soft-light`,
                opacity: 0.5,
            },
        },
        {
            name: `Reyes`,
            filter: `sepia(0.22) brightness(1.1) contrast(0.85) saturate(0.75`,
            before: {
                background: ``,
                mixBlendMode: ``,
            },
            after: {
                background: `#efcdad`,
                mixBlendMode: `soft-light`,
                opacity: 0.5,
            },
        },
        {
            name: `Rise`,
            filter: `brightness(1.05) sepia(0.2) contrast(0.9) saturate(0.9)`,
            before: {
                background: `radial-gradient(circle, rgba(236, 205, 169, 0.15) 55%, rgba(50, 30, 7, 0.4))`,
                mixBlendMode: `multiply`,
            },
            after: {
                background: `radial-gradient(circle, rgba(232, 197, 152, 0.8), transparent 90%)`,
                mixBlendMode: `overlay`,
                opacity: 0.6,
            },
        },
        {
            name: `Slumber`,
            filter: `saturate(0.66) brightness(1.05)`,
            before: {
                background: `rgba(69, 41, 12, 0.4)`,
                mixBlendMode: `lighten`,
            },
            after: {
                background: `rgba(125, 105, 24, 0.5)`,
                mixBlendMode: `soft-light`,
            },
        },

        {
            name: `Stinson`,
            filter: `contrast(0.75) saturate(0.85) brightness(1.15)`,
            before: {
                background: ``,
                mixBlendMode: ``,
            },
            after: {
                background: `rgba(240, 149, 128, 0.2)`,
                mixBlendMode: `soft-light`,
            },
        },
        {
            name: `Toaster`,
            filter: `contrast(1.5) brightness(0.9)`,
            before: {
                background: ``,
                mixBlendMode: ``,
            },
            after: {
                background: `radial-gradient(circle, #804e0f, #3b003b)`,
                mixBlendMode: `screen`,
            },
        },
        {
            name: `Valencia`,
            filter: ``,
            before: {
                background: ``,
                mixBlendMode: ``,
            },
            after: {
                background: `#3a0339`,
                mixBlendMode: `exclusion`,
                opacity: 0.5,
            },
        },
        {
            name: `Walden`,
            filter: `brightness(1.1) hue-rotate(-10deg) sepia(0.3) saturate(1.6)`,
            before: {
                background: ``,
                mixBlendMode: ``,
            },
            after: {
                background: `#0044cc`,
                mixBlendMode: `screen`,
                opacity: 0.3,
            },
        },
        {
            name: `Willow`,
            filter: `grayscale(0.5) contrast(0.95) brightness(0.9)`,
            before: {
                background: `radial-gradient(40%, circle, #d4a9af 55%, black 150%)`,
                mixBlendMode: `overlay`,
            },
            after: {
                background: `#d8cdcb`,
                mixBlendMode: `color`,
            },
        },
        {
            name: `X-Pro II`,
            filter: `sepia(0.3`,
            before: {
                background: ``,
                mixBlendMode: ``,
            },
            after: {
                background: `radial-gradient(circle, #e6e7e0 40%, rgba(43, 42, 161, 0.6) 110%)`,
                mixBlendMode: `color-burn`,
            },
        },
    ],

    activeFilter: computed(({ active, CSSgramList }) => CSSgramList[active] || {}),

    setActive: action((state, active) => {
        Object.assign(state, { active });
    }),
};

export default effectModel;
