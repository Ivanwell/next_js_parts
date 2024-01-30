import styles from '../../styles/Proposal.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

import * as ga from '../lib/gtag'

const Proposal_to_request_from_main = () => {
  const [vin, setVin] = useState('')
  const [phone, setPhone] = useState('')
  const [part, setPart] = useState('')

  const router = useRouter()

  const viber = (
    <a className={styles.viberBtn} href="viber://chat?number=%2B380937289485">
      <img
        className={styles.viberSVG}
        src="https://bonapart.pro/media/Viber-Icon-Purple-Logo.wine.svg"
        alt="viberSVG"
      />
    </a>
  )

  const whatsUp = (
    <a className={styles.viberBtn} href="https://wa.me/380937289485/">
      <img
        className={styles.viberSVG}
        src="https://bonapart.pro/media/WhatsApp-Logo.wine.svg"
        alt="vwhatsUpSVG"
      />
    </a>
  )

  const telegram = (
    <a className={styles.telegramrBtn} href="https://telegram.me/Ivanwell">
      <img
        className={styles.telegramSVG}
        src="https://bonapart.pro/media/Telegram_(software)-Logo.wine.svg"
        alt="viberSVG"
      />
    </a>
  )

  const submitFormInMain = e => {
    e.preventDefault()
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=BayrakParts головна ${
        vin + ' ' + part + ' ' + phone
      }`
    )
    router.push('/thankyou')
    window.scrollTo(0, 0)
    ga.event({
      action: 'generate_lead',
    })
    setVin(''), setPhone(''), setPart('')
  }

  return (
    <div className={styles.proposal_container}>
      <h2 className={styles.proposal_title}>
        Підкажіть що шукаєте і через 20 хвилин ціна у Вас
      </h2>
      <form className={styles.form_box} onSubmit={e => submitFormInMain(e)}>
        <div className={styles.box_for_input}>
          <span>Запчастина яку шукаєте</span>
          <input
            className={styles.inputField}
            placeholder="наприклад водяна помпа"
            required
            minLength="5"
            value={part}
            onChange={e => setPart(e.target.value)}
          />
        </div>
        <div className={styles.box_for_input}>
          <span>Вінкод авто</span>
          <input
            className={styles.inputField}
            placeholder="- - - - - - - - - - - - - - - - -"
            required
            minLength="17"
            value={vin}
            onChange={e => setVin(e.target.value)}
          />
        </div>
        <div className={styles.box_for_input}>
          <span>Номер телефону</span>
          <input
            className={styles.inputField}
            placeholder="+380 -- --- ---"
            required
            minLength="10"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.big_seen}></div>
        <button
          className={styles.submit_proposal_btn}
          type="submit"
          onClick={() => {
            onsubmit
          }}
        >
          Знайти
        </button>
      </form>
      <h2> Або одразу напишіть нам. Ми швидко відповідаємо</h2>
      <div className={styles.contact_box}>
        {whatsUp}
        {viber}
        {telegram}
      </div>
    </div>
  )
}

export default Proposal_to_request_from_main
