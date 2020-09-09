import React, { ReactNode } from 'react';
import attributes from '@/store/SVG/attributes';

export default function Filter({ id, filter, playgrounds }: { id: string; filter: Object; playgrounds: {}[] }) {
    return (
        <filter id={id} {...filter}>
            {playgrounds.map((primitive: any, index: number) => {
                let { children } = primitive;

                children = !children
                    ? null
                    : children.map((item: any, index: number) => <Primitive key={index} primitive={item} />);

                return <Primitive key={index} primitive={primitive} children={children} />;
            })}
        </filter>
    );
}

function Primitive({ primitive, children }: { primitive: any; children?: ReactNode }) {
    const { groupName, params } = primitive;
    const attribute = (attributes as any)[groupName] as any;

    const options = Object.keys(params).reduce((prev, key) => {
        const { value, disabled } = params[key];
        if (!disabled) {
            prev[key] = value;
        }
        return prev;
    }, {} as any);

    return <attribute.name {...options}>{children}</attribute.name>;
}
