import React, { useState, useContext, FormEvent } from 'react';
import { useStoreState } from '@/store';

import { FilterContext } from '../../FilterContext';

import { SVG_EDITOR_TYPE } from '@/constants';

import SliderIndex from '@/components/Slider';

// import CN from 'classnames';
import styles from './styles.module.less';

export default function Operator({ type, onClose }: { type: string; onClose?: Function }) {
    const [{ imageOpacity, blendMode, grayscaleType, colorInterpolationFilters }, setCtx] = useContext(FilterContext);

    const { blendModeList, typesList, colorTypeList } = useStoreState(({ SVG }) => SVG);

    // 初始状态
    const [state] = useState({ imageOpacity, blendMode, grayscaleType, colorInterpolationFilters });

    const onDone = () => {
        // console.log('onDone');
        onClose && onClose();
    };
    const onCancel = () => {
        // console.log('onCancel');
        setCtx(state);
        onClose && onClose();
    };

    const handleOpacity = (imageOpacity: number) => setCtx({ imageOpacity });
    const handleBlendMode = (event: FormEvent<HTMLSelectElement>) => setCtx({ blendMode: event.currentTarget.value });
    const handleGrayscaleType = (event: FormEvent<HTMLSelectElement>) =>
        setCtx({ grayscaleType: event.currentTarget.value });
    const handleColorInterpolationFilters = (event: FormEvent<HTMLSelectElement>) =>
        setCtx({ colorInterpolationFilters: event.currentTarget.value });

    if (!type) return <></>;

    return (
        <div className={styles.operator}>
            <div className={styles.slider}>
                {(() => {
                    switch (type) {
                        case SVG_EDITOR_TYPE.Transparency: {
                            return <SliderIndex initValue={state.imageOpacity} onUpdate={handleOpacity} />;
                        }
                        case SVG_EDITOR_TYPE.Blend: {
                            return (
                                <select onChange={handleBlendMode} value={blendMode}>
                                    {blendModeList.map((name: string) => {
                                        return (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        );
                                    })}
                                </select>
                            );
                        }
                        case SVG_EDITOR_TYPE.Channel: {
                            return (
                                <select onChange={handleGrayscaleType} value={grayscaleType}>
                                    {typesList.map(({ name, id }: any) => {
                                        return (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        );
                                    })}
                                </select>
                            );
                        }
                        case SVG_EDITOR_TYPE.Interpolation: {
                            return (
                                <select onChange={handleColorInterpolationFilters} value={colorInterpolationFilters}>
                                    {colorTypeList.map((name: string) => {
                                        return (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        );
                                    })}
                                </select>
                            );
                        }
                        default:
                            return <></>;
                    }
                })()}
            </div>
            <aside className={styles.aside}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onDone}>Done</button>
            </aside>
        </div>
    );
}
