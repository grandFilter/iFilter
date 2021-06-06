import React, { useState, useContext, FormEvent } from 'react';
import { useStoreState, useStoreActions } from '@/store';

import { FilterContext } from '../../FilterContext';

import { SVG_EDITOR_TYPE } from '@/constants';

import SliderIndex from '@/components/Slider';

// import CN from 'classnames';
import styles from './styles.module.less';

export default function Operator({ type, onClose }: { type: string; onClose?: Function }) {
    const [{ imageOpacity, blendMode, grayscaleType, colorInterpolationFilters }, setCtx] = useContext(FilterContext);

    const { blendModeList, typesList, colorTypeList } = useStoreState(({ SVG }) => SVG);
    const { setConfig } = useStoreActions(({ SVG }) => SVG);

    // 初始状态
    const [state] = useState({ imageOpacity, blendMode, grayscaleType, colorInterpolationFilters });

    const onDone = () => {
        setConfig({ imageOpacity, blendMode, grayscaleType, colorInterpolationFilters });
        onClose && onClose();
    };
    const onCancel = () => {
        setCtx(state);
        onClose && onClose();
    };

    if (!type) return <></>;

    const getOperator = () => {
        switch (type) {
            case SVG_EDITOR_TYPE.Transparency: {
                const onUpdate = (imageOpacity: number) => setCtx({ imageOpacity });
                return <SliderIndex value={state.imageOpacity} onUpdate={onUpdate} />;
            }
            case SVG_EDITOR_TYPE.Blend: {
                const onChange = (event: FormEvent<HTMLSelectElement>) =>
                    setCtx({ blendMode: event.currentTarget.value });
                return (
                    <div className={styles.selectWrap}>
                        <label>{blendMode}</label>
                        <select onChange={onChange} value={blendMode}>
                            {blendModeList.map((name: string) => {
                                return (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                );
            }
            case SVG_EDITOR_TYPE.Channel: {
                const onChange = (event: FormEvent<HTMLSelectElement>) =>
                    setCtx({ grayscaleType: event.currentTarget.value });
                return (
                    <div className={styles.selectWrap}>
                        <label>{typesList.find(i => i.id === grayscaleType)?.name || ''}</label>
                        <select onChange={onChange} value={grayscaleType}>
                            {typesList.map(({ name, id }: any) => {
                                return (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                );
            }
            case SVG_EDITOR_TYPE.Interpolation: {
                const onChange = (event: FormEvent<HTMLSelectElement>) =>
                    setCtx({ colorInterpolationFilters: event.currentTarget.value });
                return (
                    <div className={styles.selectWrap}>
                        <label>{colorInterpolationFilters}</label>
                        <select onChange={onChange} value={colorInterpolationFilters}>
                            {colorTypeList.map((name: string) => {
                                return (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                );
            }
            default:
                return <></>;
        }
    };

    return (
        <div className={styles.operator}>
            {getOperator()}
            <aside className={styles.aside}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onDone}>Done</button>
            </aside>
        </div>
    );
}
