import React, { useEffect } from 'react';

const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void): void => {
    function handleClick(event: Event): void {
        if (event.target instanceof HTMLElement
            && ref.current
            && !ref.current.contains(event.target)) {
            callback();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClick, false);
        return () => document.removeEventListener('mousedown', handleClick, false);
    });
};

export default useOutsideClick;
