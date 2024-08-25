import React from 'react';

const ImportIcon = {
    next: () => (
        <svg
            id="Layer_1"
            height="300"
            viewBox="0 0 24 24"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            data-name="Layer 1"
        >
            <linearGradient
                id="linear-gradient"
                gradientUnits="userSpaceOnUse"
                x1="6.793"
                x2="17.207"
                y1="6.793"
                y2="17.207"
            >
                <stop offset="0" stopColor="#eaf6ff" />
                <stop offset="1" stopColor="#addcff" />
            </linearGradient>
            <linearGradient
                id="linear-gradient-2"
                gradientUnits="userSpaceOnUse"
                x1="-.207"
                x2="10.207"
                y1="6.793"
                y2="17.207"
            >
                <stop offset="0" stopColor="#00c0ff" />
                <stop offset="1" stopColor="#1f9bff" />
            </linearGradient>
            <g id="Nest">
                <path
                    d="m10 20a1 1 0 0 1 -1-1v-14a1 1 0 0 1 1.537-.844l11 7a1 1 0 0 1 0 1.688l-11 7a1 1 0 0 1 -.537.156z"
                    fill="url(#linear-gradient)"
                />
                <path
                    d="m3 20a1 1 0 0 1 -1-1v-14a1 1 0 0 1 1.537-.844l11 7a1 1 0 0 1 0 1.688l-11 7a1 1 0 0 1 -.537.156z"
                    fill="url(#linear-gradient-2)"
                />
            </g>
        </svg>
    )
};

export default ImportIcon;
