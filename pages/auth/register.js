import { useState } from 'react'
import styles from '../../styles/Register.module.css'
import { useRouter } from 'next/router'
import { ShopContext } from '@/components/contex/contex'
import { useContext } from 'react'
import Link from 'next/link'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [errorUserExist, setErrorUserExist] = useState(false)
  const [newUser, setNewUser] = useState({
    email: '',
    phone: '',
    userId: '',
    password: '',
    name: '',
    npCity: '',
    npDepartment: '',
    carInGarage: {},
  })

  const { user, authUser } = useContext(ShopContext)

  const router = useRouter()

  const createUser = async e => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch(`https://api.edetal.store/get_users`, {
      method: 'GET',
    })

    const usersData = await res.json()

    const newUserId = +usersData[usersData.length - 1].userId + 1

    let token = await fetch('https://api.edetal.store/create_user', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: newUser.email,
        userId: newUserId,
        password: newUser.password,
        name: newUser.name,
        npCity: newUser.npCity,
        npDepartment: newUser.npDepartment,
        carInGarage: newUser.carInGarage,
      }),
    })
    const body = await token.json()

    if (body.message === 'User exists') {
      setErrorUserExist(true)
      setLoading(false)
    } else {
      authUser({
        email: newUser.email,
        userId: newUserId,
        password: newUser.password,
        name: newUser.name,
        npCity: newUser.npCity,
        npDepartment: newUser.npDepartment,
        carInGarage: newUser.carInGarage,
      })
      setNewUser({
        email: '',
        userId: '',
        password: '',
        name: '',
        npCity: '',
        npDepartment: '',
        carInGarage: '',
      })
      setLoading(false)
      router.push('/')
    }
  }
  return (
    <>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        {!user ? (
          <form
            className={styles.registration_form}
            onSubmit={e => createUser(e)}
          >
            {!loading ? (
              <h1 className={styles.title_container}>
                Зареєструйтесь та отримайте знижку
              </h1>
            ) : (
              <h1 className={styles.title_container}>Хвильку...</h1>
            )}
            <label className={styles.name_of_field}>
              {' '}
              Ваша електронна пошта{' '}
            </label>
            <input
              className={styles.register_field}
              value={newUser.email}
              type="email"
              required
              onChange={e => {
                setNewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }}
            />
            <label className={styles.name_of_field}> ПІБ </label>
            <input
              value={newUser.name}
              required
              minLength={6}
              className={styles.register_field}
              onChange={e => {
                setNewUser({
                  ...newUser,
                  name: e.target.value,
                })
              }}
            />
            <label className={styles.name_of_field}> Створіть пароль </label>
            <input
              type="password"
              required
              minLength={6}
              className={styles.register_field}
              value={newUser.password}
              onChange={e => {
                setNewUser({
                  ...newUser,
                  password: e.target.value,
                })
              }}
            />
            {errorUserExist ? (
              <div className={styles.error_container}>
                Цей email вже зареєстрований
              </div>
            ) : null}
            <button type="submit" className={styles.submit_button}>
              Зареєструватись
            </button>
            <Link href="/auth/login" className={styles.go_to_reg_or_log}>
              Вже зареєстровані? Вам сюди
            </Link>
          </form>
        ) : (
          <h1>Ви вже зареєстровані</h1>
        )}
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default Register
