import { useEffect, useState } from 'react';

export enum PaginationSize {
    small = 'small',
    default = 'default',
}

export function usePaginationSize(): PaginationSize {
    const [isPaginationSmall, togglePaginationSize] = useState(false);


    useEffect(() => {
        const maximumClientWidth = 1366;
        if (document.body.clientWidth <= maximumClientWidth) {
            togglePaginationSize(true);
        }
    }, []);

    return isPaginationSmall ? PaginationSize.small : PaginationSize.default;
}
