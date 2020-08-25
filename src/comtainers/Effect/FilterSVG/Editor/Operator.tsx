import React, { useState, FormEvent } from 'react';
import { useStoreState, useStoreActions } from '@/store';

import { SVG_EDITOR_TYPE } from '@/constants';

import SliderIndex from '@/components/Slider';

// import CN from 'classnames';
import styles from './styles.module.less';

export default function Operator({ type, onClose }: { type: string; onClose?: Function }) {
    const {
        filterConfig: {
            imageOpacity,
            blendMode,
            grayscaleType,
            filter: { colorInterpolationFilters },
        },
        blendModeList,
        typesList,
        colorTypeList,
    } = useStoreState(({ SVG }) => SVG);

    const { setBlendMode, setGrayscaleType, setColorInterpolationFilters } = useStoreActions(({ SVG }) => SVG) as any;

    const [state, setState] = useState({ opacity: imageOpacity });

    const onDone = () => {
        console.log('onDone');
    };
    const onCancel = () => {
        console.log('onCancel');
        onClose && onClose();
    };
    // setOpacity(value)
    const handleOpacity = (opacity: number = state.opacity) => setState({ opacity });
    const handleBlendMode = (event: FormEvent<HTMLSelectElement>) => setBlendMode(event.currentTarget.value);
    const handleGrayscaleType = (event: FormEvent<HTMLSelectElement>) => setGrayscaleType(event.currentTarget.value);
    const handleColorInterpolationFilters = (event: FormEvent<HTMLSelectElement>) =>
        setColorInterpolationFilters(event.currentTarget.value);

    if (!type) return <></>;

    return (
        <div className={styles.layer}>
            <div className={styles.slider}>
                {(() => {
                    switch (type) {
                        case SVG_EDITOR_TYPE.Transparency: {
                            return <SliderIndex initValue={imageOpacity} onUpdate={handleOpacity} />;
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
