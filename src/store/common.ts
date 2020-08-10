import { action, computed, thunk } from 'easy-peasy';
import { STORAGE_BASE64 } from '@/constants';
import { setItem, getItem } from '@/utils/storage';

import { ICommonModel } from '@/types/store/common';

const commonModel: ICommonModel = {
    base64: getItem<string>(STORAGE_BASE64, ''),
    setBase64: action((state, base64) => {
        setItem<string>(STORAGE_BASE64, base64);
        Object.assign(state, { base64 });
    }),
};

export default commonModel;
