import { useState } from 'react'
import styles from '../../styles/Compatibility.module.css'
import { rightArrow } from '../SVGs/SVGs'

const Engines = ({ engines }) => {
  return (
    <div className={styles.one_model_engines}>
      {engines.map(engine => (
        <div>{engine.engine}</div>
      ))}
    </div>
  )
}

const OneModel = ({ model }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <div
        className={styles.title_model}
        onClick={() => setIsVisible(prev => !prev)}
      >
        {rightArrow}
        {model.model}
      </div>
      {isVisible ? <Engines engines={model.engines} /> : null}
    </div>
  )
}

const Models = ({ models }) => {
  return (
    <div className={styles.one_brand_models}>
      {models.map(model => (
        <div className={styles.one_brand_model}>
          <OneModel model={model} />
        </div>
      ))}
    </div>
  )
}

const OneBrand = ({ brand }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={styles.one_brand_cont}>
      <div
        className={styles.one_brand_title}
        onClick={() => setIsVisible(prev => !prev)}
      >
        {rightArrow}
        {brand.brand}
      </div>
      {isVisible ? <Models models={brand.models} /> : null}
    </div>
  )
}

const Compatibility = ({ fits }) => {
  return (
    <div className={styles.compatib_cont}>
      {fits.map(brand => (
        <OneBrand brand={brand} />
      ))}
    </div>
  )
}

export default Compatibility
