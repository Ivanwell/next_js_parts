import { useState, useContext } from 'react'
import { ShopContext } from '@/components/contex/contex'
import { BRANDS } from '../../components/selects/BRADNS'
import { MODELS } from '../../components/selects/toyotaModels'
import { EXECT_PARTS } from '../../components/selects/exectParts'
import { CATEGORIES_TO_SELECT } from '../../components/selects/categoriesToSelect'
import { useRouter } from 'next/router'
import styles from '../../styles/Search.module.css'

const searchDefault = () => {
  const [brand, setBrand] = useState('Оберіть бренд')
  const [model, setModel] = useState('Оберіть модель')
  const [category, setCategory] = useState('Оберіть категорію')
  const [part, setPart] = useState('Оберіть запчастину')

  const router = useRouter()

  const goToSearch = () => {
    const article = part + ' ' + brand + ' ' + model
    router.push(`/search/${article}`)
  }
  return (
    <div className={styles.main_search}>
      <div className="selectAndCheck">
        <select
          className="selectModel"
          value={brand}
          onChange={e => setBrand(e.target.value)}
        >
          {BRANDS.map(Brand => (
            <option value={Brand}>{Brand}</option>
          ))}
        </select>
        <select
          className="selectModel"
          value={model}
          onChange={e => setModel(e.target.value)}
        >
          {MODELS.find(product => product.brandName === brand).Models.map(
            model1 => (
              <option value={model1}>{model1}</option>
            )
          )}
        </select>
        <select
          className="selectModel"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES_TO_SELECT.map(category => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <select
          className="selectModel"
          value={part}
          onChange={e => setPart(e.target.value)}
        >
          {EXECT_PARTS.find(
            castogory3 => castogory3.catigory === category
          ).Models.map(part => (
            <option value={part}>{part}</option>
          ))}
        </select>
      </div>

      <button onClick={() => goToSearch()}>Знайти</button>
    </div>
  )
}

export default searchDefault
