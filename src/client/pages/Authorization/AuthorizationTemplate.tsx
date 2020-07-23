 import React, { useState } from 'react'

import './Authorization.scss'
import { Button } from '../../UI/button'
import { SvgIcon } from '../../components/SvgIcon'

export function AuthorizationTemplate() {
    const [user, setUser] = useState({
        login: '',
        password: ''
    })

    const [error, setError] = useState('')

    const login = (e: any) => {
        e.preventDefault()

        console.log('ВОЙТИ')

        if (!user.login && !user.password) {
            setError('Неверное имя пользователя или пароль')
        }

        if (user.login && user.login !== 'admin' && !user.password) {
            setError('Неверное имя пользователя или пароль')
        }

        if (user.login === 'admin' && !user.password) {
            setError('Пароль не соответствует требованиям')
        }

        if (user.login === 'admin' && user.password !== 'password') {
            setError('Пароль не соответствует требованиям')
        }

        if (user.login === 'admin' && user.password === 'password') {
            setError('')
        }
    }

    const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const ROOT_CLASS = 'authorization'

    console.log('user -', user);
    
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
            <form className={`${ROOT_CLASS}-form`} onSubmit={(e) => login(e)}>
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
                    <div className={`${ROOT_CLASS}-form__error`}>
                        {error}
                    </div>
                </div>
                <Button
                    isPrimary={true}
                >
                    Вход
                </Button>
            </form>
        </div>
    )
}
