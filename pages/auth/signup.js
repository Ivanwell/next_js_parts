'use client'
import styles from '../../styles/Loginpage.module.css'
import { useState } from 'react'

export default function SignUp() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmedPass: '',
  })

  const [error, setError] = useState(null)

  const changeUserData = e => {
    setUserData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const registUser = async e => {
    e.preventDefault()
    setError(null)
    if (userData.password !== userData.confirmedPass) {
      setError('Паролі не співпадають')
    } else {
      const res = await fetch(
        `https://api.bayrakparts.com/admin/user/createUser`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
          }),
        }
      )
      const body = await res.json()

      if (body.result === 'success') {
        console.log('yes')
      } else {
        console.log(body)
        setError(body.message)
      }
    }
  }

  return (
    <form className={styles.from_wrapper} onSubmit={registUser}>
      <h2>Реєстрація користувача</h2>
      <label for="email" className={styles.label_inp_cont}>
        Ваша електронна пошта
        <input
          placeholder="@email.com"
          autoComplete="off"
          type="email"
          id="email"
          name="email"
          onChange={changeUserData}
        />
      </label>
      <label className={styles.label_inp_cont}>
        Ваш пароль
        <input onChange={changeUserData} type="password" name="password" />
      </label>
      <label className={styles.label_inp_cont}>
        Підтвердіть пароль
        <input onChange={changeUserData} type="password" name="confirmedPass" />
      </label>
      <div className={styles.btn_cont}>
        <button type="submit" className={styles.btn_submit}>
          Зареєструватись
        </button>
      </div>
      {error ? <span>{error}</span> : null}
    </form>
  )
}
