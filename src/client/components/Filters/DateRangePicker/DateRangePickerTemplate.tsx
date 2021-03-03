import React from 'react';
import moment from 'moment';
import { ConfigProvider, DatePicker } from 'antd';
import ru from 'antd/lib/locale-provider/ru_RU';
import 'react-datepicker/dist/react-datepicker';
import 'moment/locale/ru';

import { FilterName } from '../Dropdown/Dropdown';
import { SvgIcon } from '../../../UI/SvgIcon';
import { SpriteId } from '../../../UI/SvgIcon/SvgIconTemplate';
import { dateRange } from '../../../../store/StoreSlices/selectedFilters';
import './DateRangePicker.scss';

const { RangePicker } = DatePicker;

type Props = {
    dates: dateRange | null
    label: FilterName
    handleDate(dates: any): void
    onDeleteSvgClick(): void
};

export function DateRangePickerTemplate({
    dates,
    label,
    handleDate,
    onDeleteSvgClick,
}: Props): JSX.Element {
    const ROOT_CLASS = 'date-range-picker';

    return (
        <div className={ROOT_CLASS}>
            <div className={`${ROOT_CLASS}__title`}>
                {label}
                <SvgIcon
                    onClick={onDeleteSvgClick}
                    className={`${ROOT_CLASS}__delete-svg`}
                    spriteId={SpriteId.blackCruce}
                />
            </div>
            <ConfigProvider locale={ru}>
                <RangePicker
                    className={`${ROOT_CLASS}__date-picker`}
                    allowClear
                    picker={'date'}
                    showTime={{ format: 'HH:mm:ss' }}
                    format="DD-MM-YYYY HH:mm:ss"
                    onChange={handleDate}
                    value={dates && [moment(dates.from), moment(dates.to)]}
                />
            </ConfigProvider>
        </div>
    );
}
