'use client'
import {createUser, loginUser} from "@/api/user";
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import {useDispatch} from "react-redux";
import {updateUser} from "@/store/features/userSlice";
import {useAppSelector} from "@/store/hooks";
import Cookies from "js-cookie";

export default function Login () {
	const router = useRouter()
	const [isAuth, setIsAuth] = useState(false)
	const dispatch = useDispatch()

	const {user} = useAppSelector(state => state.userSlice)
	useEffect(() => {
		console.log('Z USER',user)
	}, [user]);

async function createUserHandler(event: { preventDefault: () => void; target: { value: any; }[]; }) {
	try {
		event.preventDefault()
		let typeEvent = event.target
		let body = {}
		if(isAuth) {
			body = {
				mail: typeEvent[0].value,
				username: typeEvent[1].value,
				password: typeEvent[2].value,
			}
		} else {
			body = {
				username: typeEvent[0].value,
				password: typeEvent[1].value,
				// username: 'PCBoyarin',
				// password: 'PH15ju74Vi23'
			}
		}

		if(isAuth) {
			let predicate = confirmPassword(typeEvent[2].value, typeEvent[3].value)

				if(predicate) {
					await createUser(body)
					return router.push('/')
				}

		} else {
			const response = await loginUser(body)
			if(response) {
				console.log(response)
				dispatch(updateUser(response.data))
				router.push('/')
			}
		}
	} catch (err) {
		console.log('Произошла ошибка', err)
	}
}

const confirmPassword = (password: string, confirmPass: string) => password === confirmPass

	return (
		<form onSubmit={(event: any) => createUserHandler(event)} className={'login-container'}>
			<div className={isAuth ? 'auth-block' : 'login-block'}>
				{
					isAuth &&
            <input className={'login-input'} placeholder={'Email'} required type={'text'}/>
				}
				<input className={'login-input'} placeholder={'Имя пользователя'} required type={'text'}/>
				<input className={'login-input'} placeholder={'Пароль'} type={'password'} required autoComplete="on"/>
				{
					isAuth &&
            <input
							className={'login-input'}
							placeholder={'Подтвердите пароль'}
							type={'password'}
							required
							 autoComplete="on"
						/>
				}
				<button className={'login-button'}>{isAuth ? 'Зарегистрироваться' : 'Авторизоваться'}</button>
				<div className={isAuth ? 'auth-button-block' : 'register-button-block'}>
					<button
						onClick={() => setIsAuth(!isAuth)}
						className={'register-button'}
					>{isAuth ? 'Авторизоваться' : 'Зарегистрироваться'}
					</button>
				</div>
			</div>
		</form>
	)
}
