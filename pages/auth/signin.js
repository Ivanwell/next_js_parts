'use client'

import { getCsrfToken } from 'next-auth/react'
import styles from '../../styles/Loginpage.module.css'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SignIn({ csrfToken, query }) {
  const { data: session, status } = useSession()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const showSeesion = () => {
    console.log(session)
  }

  const formChange = e => {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'

  const login = async e => {
    e.preventDefault()
    await signIn('credentials', {
      callbackUrl,
      email: formData.email,
      password: formData.password,
    })
      .catch(error => {
        console.log('Error signing in:', error)
      })
      .finally(() => {
        redirect(callbackUrl)
      })
  }
  return (
    <form onSubmit={login} className={styles.from_wrapper}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      {query.error ? <h2>Помилка аутентифікації</h2> : null}
      <label for="email" className={styles.label_inp_cont}>
        Ваша електронна пошта
        <input
          onChange={formChange}
          placeholder="@email.com"
          autoComplete="off"
          type="email"
          id="email"
          name="email"
        />
      </label>
      <label for="password" className={styles.label_inp_cont}>
        Ваш пароль
        <input
          onChange={formChange}
          type="password"
          name="password"
          id="password"
        />
      </label>
      <div className={styles.btn_cont}>
        <button type="submit" className={styles.btn_submit}>
          Увійти
        </button>
      </div>

      <Link href={`/auth/signup`}>
        Ще не маєте аккаунту з нами? Вам сюди...
      </Link>
    </form>
  )
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)

  return {
    props: { csrfToken, query: context.query },
  }
}
