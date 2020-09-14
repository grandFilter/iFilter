import React, { useContext } from 'react';
import { useStoreActions } from '@/store';
import { FilterContext } from '../FilterContext';

import SliderRGB from '@/components/Slider/RGB';
import ScrollSnap from '@/components/ScrollSnap';

import styles from './styles.module.less';

/**
 * 调节 RGB 颜色
 *
 * @param {{}} props
 * @param {{id: string;name: string; colors: string[];}} props.value - 调色板数据
 * @param {Function} [props.onClose] - 回调函数，关闭当前组件的方法
 */
export default function Color({
    value,
    onClose,
}: {
    value: {
        id: string;
        name: string;
        colors: string[];
    };
    onClose?: Function;
}) {
    const [{ palette }, setCxt] = useContext(FilterContext);

    // 实时改变颜色，即改变 Context 数据
    const setLiveColors = (values: string[] | undefined) => {
        setCxt({
            palette: {
                ...palette,
                colors: values ?? [],
            },
        });
    };
    // 保存数据到 store
    const setPalatte = useStoreActions(({ SVG }) => SVG.setPalatte);

    const handleChange = (value: string, index: number) => {
        const colors = palette?.colors;
        colors?.splice(index, 1, value);
        setLiveColors(colors);
    };
    const onDone = () => {
        palette && setPalatte(palette);
        onClose && onClose();
    };
    const onCancel = () => {
        setLiveColors(value.colors);
        onClose && onClose();
    };

    const list =
        palette?.colors.map((color: string, index: number) => {
            return {
                color,
                children: <SliderRGB color={color} onChange={(value: string) => handleChange(value, index)} />,
            };
        }) || [];

    return (
        <div className={styles.color}>
            <ScrollSnap list={list} />
            <aside className={styles.aside}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onDone}>Done</button>
            </aside>
        </div>
    );
}
