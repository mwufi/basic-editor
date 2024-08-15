'use client'

import React from 'react';

interface CharacterCountProps {
    current: number;
    limit: number;
    display: 'characters' | 'words' | 'both';
}

const CharacterCountMarker: React.FC<CharacterCountProps> = ({ current, limit, display }) => {
    const percentage = (current / limit) * 100;

    const renderCount = () => {
        switch (display) {
            case 'characters':
                return <>{current} / {limit} characters</>;
            case 'words':
                return <>{current} words</>;
            case 'both':
                return (
                    <>
                        {current} / {limit} characters
                        <br />
                        {current} words
                    </>
                );
            default:
                return null;
        }
    };
    return (
        <div className={`character-count ${current === limit ? 'character-count--warning' : ''}`}>
            <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
            >
                <circle
                    r="10"
                    cx="10"
                    cy="10"
                    fill="#e9ecef"
                />
                <circle
                    r="5"
                    cx="10"
                    cy="10"
                    fill="transparent"
                    stroke={current > limit ? '#2dd4bf' : '#00FF00'}
                    strokeWidth="10"
                    strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                    transform="rotate(-90) translate(-20)"
                />
                <circle
                    r="6"
                    cx="10"
                    cy="10"
                    fill="white"
                />
            </svg>

            {renderCount()}
        </div>
    );
};

export default CharacterCountMarker;