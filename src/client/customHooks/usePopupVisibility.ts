import { useState } from 'react';


export function usePopupVisibility(): [boolean, () => void, () => void] {
    const [isPopupVisible, togglePopupVisibility] = useState(false);

    function openPopup(): void {
        togglePopupVisibility(true);
    }
    function closePopup(): void {
        togglePopupVisibility(false);
    }

    return [isPopupVisible, openPopup, closePopup];
}
