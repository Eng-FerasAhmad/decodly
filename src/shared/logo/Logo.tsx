import { ReactElement } from 'react';

interface IconProps {
    size?: number;
    primaryColor?: string;
    secondaryColor?: string;
    tertiaryColor?: string;
}

export default function Logo({
    size = 30,
    primaryColor = '#904BBE',
    secondaryColor = '#6E6DDF',
    tertiaryColor = '#1FBFBF',
}: IconProps): ReactElement {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 31 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Layers icon"
        >
            <path
                d="M15.5 24.9167C15.5 26.6059 15.5 27.4505 16.0248 27.9752C16.5495 28.5 17.3941 28.5 19.0833 28.5H25.6667C27.3559 28.5 28.2005 28.5 28.7252 27.9752C29.25 27.4505 29.25 26.6059 29.25 24.9167V14.75H15.5V24.9167Z"
                stroke={primaryColor}
                strokeWidth="1.79167"
                strokeLinecap="round"
            />
            <path
                d="M15.5 14.75H5.33333C3.64413 14.75 2.79953 14.75 2.27477 14.2252C1.75 13.7005 1.75 12.8559 1.75 11.1667V4.58333C1.75 2.89413 1.75 2.04953 2.27477 1.52477C2.79953 1 3.64413 1 5.33333 1H15.5V14.75Z"
                stroke={secondaryColor}
                strokeWidth="1.79167"
                strokeLinecap="round"
            />
            <path
                d="M15.5 1H25.6667C27.3559 1 28.2005 1 28.7252 1.52477C29.25 2.04953 29.25 2.89413 29.25 4.58333V14.75H15.5V1Z"
                stroke={tertiaryColor}
                strokeWidth="1.79167"
                strokeLinecap="round"
            />
        </svg>
    );
}
