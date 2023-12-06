import { useState } from 'react'
import styles from '../../styles/Register.module.css'
import { useRouter } from 'next/router'
import { ShopContext } from '@/components/contex/contex'
import { useContext } from 'react'
import Link from 'next/link'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [userNew, setUserNew] = useState({
    email: '',
    password: '',
  })
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPass, setErrorPass] = useState(false)

  const router = useRouter()
  const { authUser, user } = useContext(ShopContext)

  const login = async e => {
    e.preventDefault()
    setLoading(true)

    let token = await fetch(`https://api.edetal.store/find_user`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: userNew.email,
        password: userNew.password,
      }),
    })
    setErrorEmail(false)
    setErrorPass(false)
    const body = await token.json()

    console.log(body)

    if (body?.email) {
      authUser({
        email: body?.email,
        phone: body?.phone,
        userId: body?.userId,
        name: body?.name,
        npCity: body?.npCity,
        npDepartment: body?.npDepartment,
        carInGarage: body?.carInGarage,
      })
      router.push('/')
    } else if (body.message === 'User does not exist') {
      setErrorEmail(true)
    } else if (body.message === 'Wrong password') {
      setErrorPass(true)
    }
    setLoading(false)
  }

  return (
    <>
      <main className={styles.main}>
        {!user ? (
          <form className={styles.registration_form} onSubmit={e => login(e)}>
            {!loading ? (
              <h1 className={styles.title_container}>Увійти в свій кабінет</h1>
            ) : (
              <h1 className={styles.title_container}>Перевіряємо...</h1>
            )}
            <label className={styles.name_of_field}>
              {' '}
              Ваша електронна пошта{' '}
            </label>
            <input
              className={styles.register_field}
              value={userNew.email}
              type="email"
              required
              onChange={e => {
                setUserNew({
                  ...userNew,
                  email: e.target.value,
                })
              }}
            />
            <label className={styles.name_of_field}> Пароль </label>
            <input
              type="password"
              required
              minLength={6}
              className={styles.register_field}
              value={userNew.password}
              onChange={e => {
                setUserNew({
                  ...userNew,
                  password: e.target.value,
                })
              }}
            />
            {errorEmail ? (
              <div className={styles.error_container}>
                Невірний email або пароль
              </div>
            ) : errorPass ? (
              <div className={styles.error_container}>
                Невірний email або пароль
              </div>
            ) : null}
            <button type="submit" className={styles.submit_button}>
              Увійти
            </button>
            <Link href="/auth/register" className={styles.go_to_reg_or_log}>
              Ще не зареєстровані? Вам сюди
            </Link>
          </form>
        ) : (
          <h1>Ви вже увійшли</h1>
        )}
      </main>
    </>
  )
}

export default Login
