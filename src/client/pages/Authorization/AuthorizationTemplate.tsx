 import React, { useState } from 'react'

import './Authorization.scss'
import { Button } from '../../UI/button'
import { SvgIcon } from '../../components/SvgIcon'

export function AuthorizationTemplate() {
    const [user, setUser] = useState({
        login: '',
        password: ''
    })

    const login = () => {
        console.log('ВОЙТИ')
    }

    const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
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
                    <input 
                        type="text" 
                        className={`${ROOT_CLASS}-form__input`}
                        name='login'
                        onChange={onChangeUser}
                        value={user.login}
                    />
                </div>
                <div className={`${ROOT_CLASS}-form__item`}>
                    <label className={`${ROOT_CLASS}-form__label`}>Пароль</label>
                    <input 
                        type="password" 
                        className={`${ROOT_CLASS}-form__input`}
                        name='password'
                        onChange={onChangeUser}
                        value={user.password}
                    />
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
