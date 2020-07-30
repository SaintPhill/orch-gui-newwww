import React from 'react';

import './Header.scss';
import { SvgIcon } from '../SvgIcon/';
import { Button } from '../../UI/Button';

export function HeaderTemplate(): JSX.Element {
    const ROOT_CLASS = 'header';

    return (
        <header className={ROOT_CLASS}>
            <SvgIcon spriteId={'tricolor'} className={`${ROOT_CLASS}__icon`} />
            <div className={`${ROOT_CLASS}__wrapper`}>
                <div className={`${ROOT_CLASS}__buttons-wrapper`}>
                    <Button className={`${ROOT_CLASS}__button ${ROOT_CLASS}__button_active`}>
                        Работоспособность системы
                    </Button>
                    <Button className={`${ROOT_CLASS}__button`}>
                        Массовые операции
                    </Button>
                </div>
                <div className={`${ROOT_CLASS}__login-information`}>
                    <div className={`${ROOT_CLASS}__user-name`}>
                        Фамилияя Имя / Должность
                    </div>
                    <Button svgId={'logout'} className={`${ROOT_CLASS}__logout-button`}>
                        Выход
                    </Button>
                </div>
            </div>
        </header>
    );
}
