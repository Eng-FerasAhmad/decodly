import { ReactElement } from 'react';

interface IconProps {
    size?: number;
    color?: string;
}
export function MenuSymbol({
    size = 24,
    color = '#33363F',
}: IconProps): ReactElement {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5 7H19"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M5 12H19"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M5 17H19"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
