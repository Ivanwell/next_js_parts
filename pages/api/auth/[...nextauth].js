import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'логін та пароль',
      credentials: {
        email: {
          label: 'Електронна пошта',
          type: 'email',
          placeholder: 'Ваша пошта',
        },
        password: {
          label: 'Пароль',
          type: 'password',
          placeholder: 'Ваш пароль',
        },
      },

      async authorize(credentials, req) {
        const res = await fetch(
          'https://api.bayrakparts.com/admin/user/login',
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          }
        )
        const user = await res.json()

        console.log('-------------------', user)

        if (res.ok && user) {
          return user
        }
        return null
      },
    }),
  ],
  pages: { signIn: '/auth/signin' },
}
export default NextAuth(authOptions)
