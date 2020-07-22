 import React from 'react'

import './Authorization.scss'
import { Button } from '../../UI/buttons/Button'
import { SvgIcon } from '../../components/SvgIcon'

export function AuthorizationTemplate() {
    const login = () => {
        console.log('ВОЙТИ')
    }

    const ROOT_CLASS = 'authorization'

    return (
        <div className={ROOT_CLASS}>
            <header className={`${ROOT_CLASS}__header`}>
                <SvgIcon
                    spriteId='tricolor'
                    className={`${ROOT_CLASS}__logo`}
                />
                <SvgIcon
                    spriteId='iflex'
                    className={`${ROOT_CLASS}__logo`}
                />
            </header>
            <h1 className={`${ROOT_CLASS}__title`}>
                Вход в систему управления оркестрационными процессами
            </h1>
            <form className={`${ROOT_CLASS}-form`}>
                <div className={`${ROOT_CLASS}-form__item`}>
                    <label className={`${ROOT_CLASS}-form__label`}>Пользователь</label>
                    <input type="text" className={`${ROOT_CLASS}-form__input`}/>
                </div>
                <div className={`${ROOT_CLASS}-form__item`}>
                    <label className={`${ROOT_CLASS}-form__label`}>Пароль</label>
                    <input type="password" className={`${ROOT_CLASS}-form__input`}/>
                </div>
                <Button
                    isPrimary={true}
                    onClick={login}
                >
                    Вход
                </Button>
            </form>
        </div>
    )
}
