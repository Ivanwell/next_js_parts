import styles from '../../styles/New_car_choose_form.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { arrrowDown, carChoosed, changeCar } from '../SVGs/SVGs'
import { useDispatch } from 'react-redux'
import { setSelectedCar } from '@/global_state/features/cardata_redux'
import { useRouter } from 'next/router'

const BrandsList = ({ setChoosenBrand, brands }) => {
  const [showedBrands, setShowBrands] = useState([])
  const [searchPhrase, setSearchPhrase] = useState('')

  useEffect(() => {
    const values = brands
      .filter(brand =>
        brand.name.toUpperCase().includes(searchPhrase.toUpperCase())
      )
      .map(({ products_count }) => products_count)
      .sort((a, b) => b - a)
      .slice(0, 40)

    const top40 = brands.filter(({ products_count }) =>
      values.includes(products_count)
    )

    setShowBrands(
      top40.filter(brand =>
        brand.name.toUpperCase().includes(searchPhrase.toUpperCase())
      )
    )
  }, [brands, searchPhrase])

  return (
    <div className={styles.whole_container_for_search}>
      <div className={styles.search_input_cont}>
        <span className={styles.title_search}>Пошук</span>
        <input
          value={searchPhrase}
          onChange={e => setSearchPhrase(e.target.value)}
        />
      </div>
      {showedBrands.length === 0 ? (
        <div className={styles.loading_brands_process}>Завантажуємо...</div>
      ) : (
        <div className={styles.cont_for_brands_etc}>
          <ul className={styles.brands_column}>
            {showedBrands.slice(0, 10).map(brand => (
              <li
                title={brand.name}
                key={brand.name}
                onClick={() => setChoosenBrand(brand.name)}
              >
                {brand.name}
              </li>
            ))}
          </ul>
          <ul className={styles.brands_column}>
            {showedBrands.slice(10, 20).map(brand => (
              <li
                title={brand.name}
                key={brand.name}
                onClick={() => setChoosenBrand(brand.name)}
              >
                {brand.name}
              </li>
            ))}
          </ul>
          <ul className={styles.brands_column}>
            {showedBrands.slice(20, 30).map(brand => (
              <li
                title={brand.name}
                key={brand.name}
                onClick={() => setChoosenBrand(brand.name)}
              >
                {brand.name}
              </li>
            ))}
          </ul>
          <ul className={styles.brands_column}>
            {showedBrands.slice(30, 40).map(brand => (
              <li
                title={brand.name}
                key={brand.name}
                onClick={() => setChoosenBrand(brand.name)}
              >
                {brand.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const ModelList = ({ setChoosenModel, models }) => {
  const [showedModels, setShowModels] = useState([])
  const [searchPhrase, setSearchPhrase] = useState('')

  useEffect(() => {
    const values = models
      .filter(brand =>
        brand.name.toUpperCase().includes(searchPhrase.toUpperCase())
      )
      .map(({ products_count }) => products_count)
      .sort((a, b) => b - a)
      .slice(0, 40)

    const top40 = models.filter(({ products_count }) =>
      values.includes(products_count)
    )

    setShowModels(
      top40.filter(brand =>
        brand.name.toUpperCase().includes(searchPhrase.toUpperCase())
      )
    )
  }, [models, searchPhrase])

  return (
    <div className={styles.whole_container_for_search}>
      <div className={styles.search_input_cont}>
        <span className={styles.title_search}>Пошук</span>
        <input
          value={searchPhrase}
          onChange={e => setSearchPhrase(e.target.value)}
        />
      </div>
      <div className={styles.cont_for_brands_etc}>
        <ul className={styles.brands_column}>
          {showedModels.slice(0, 10).map(model => (
            <li
              title={model.name}
              key={model.name}
              onClick={() => setChoosenModel(model.name)}
            >
              {model.name}
            </li>
          ))}
        </ul>
        <ul className={styles.brands_column}>
          {showedModels.slice(10, 20).map(model => (
            <li
              title={model.name}
              key={model.name}
              onClick={() => setChoosenModel(model.name)}
            >
              {model.name}
            </li>
          ))}
        </ul>
        <ul className={styles.brands_column}>
          {showedModels.slice(20, 30).map(model => (
            <li
              title={model.name}
              key={model.name}
              onClick={() => setChoosenModel(model.name)}
            >
              {model.name}
            </li>
          ))}
        </ul>
        <ul className={styles.brands_column}>
          {showedModels.slice(30, 40).map(model => (
            <li
              title={model.name}
              key={model.name}
              onClick={() => setChoosenModel(model.name)}
            >
              {model.name}
            </li>
          ))}
        </ul>
      </div>{' '}
    </div>
  )
}

const EngineList = ({ setChoosenEngine, engines }) => {
  const [showedEngines, setShowEngines] = useState([])
  const [searchPhrase, setSearchPhrase] = useState('')

  useEffect(() => {
    const values = engines
      .filter(brand =>
        brand.name.toUpperCase().includes(searchPhrase.toUpperCase())
      )
      .map(({ products_count }) => products_count)
      .sort((a, b) => b - a)
      .slice(0, 40)

    const top40 = engines.filter(({ products_count }) =>
      values.includes(products_count)
    )

    setShowEngines(
      top40.filter(brand =>
        brand.name.toUpperCase().includes(searchPhrase.toUpperCase())
      )
    )
  }, [engines, searchPhrase])

  return (
    <div className={styles.whole_container_for_search}>
      <div className={styles.search_input_cont}>
        <span className={styles.title_search}>Пошук</span>
        <input
          value={searchPhrase}
          onChange={e => setSearchPhrase(e.target.value)}
        />
      </div>
      <div className={styles.cont_for_brands_etc}>
        <ul className={styles.brands_column}>
          {showedEngines.slice(0, 10).map(engine => (
            <li
              key={engine.name}
              onClick={() => setChoosenEngine(engine.name)}
              title={engine.name}
            >
              {engine.name}
            </li>
          ))}
        </ul>
        <ul className={styles.brands_column}>
          {showedEngines.slice(10, 20).map(engine => (
            <li
              key={engine.name}
              onClick={() => setChoosenEngine(engine.name)}
              title={engine.name}
            >
              {engine.name}
            </li>
          ))}
        </ul>
        <ul className={styles.brands_column}>
          {showedEngines.slice(20, 30).map(engine => (
            <li
              key={engine.name}
              onClick={() => setChoosenEngine(engine.name)}
              title={engine.name}
            >
              {engine.name}
            </li>
          ))}
        </ul>
        <ul className={styles.brands_column}>
          {showedEngines.slice(30, 40).map(engine => (
            <li
              key={engine.name}
              onClick={() => setChoosenEngine(engine.name)}
              title={engine.name}
            >
              {engine.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const New_car_choose_form = () => {
  const [brands, setBrands] = useState([])
  const [startSearching, setSartSearching] = useState(false)
  const [openedBrandsCont, setOpenedBrandCont] = useState(false)
  const [openedModelsCont, setOpenedModelsCont] = useState(false)
  const [openedEnginesCont, setOpenedEnginesCont] = useState(false)
  const [choosenBrand, setChoosenBrand] = useState(null)
  const [models, setModels] = useState([])
  const [choosenModel, setChoosenModel] = useState(null)
  const [engines, setEngines] = useState([])
  const [choosenEnagine, setChoosenEngine] = useState(null)
  const [finallyChooseCar, setFinnalychooseCar] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  const startSearchProcess = () => {
    if (!startSearching) {
      setSartSearching(true)
    }
    setOpenedBrandCont(prev => !prev)
  }

  const goToFindPage = () => {
    let path

    dispatch(
      setSelectedCar(
        `?brand=${choosenBrand}&model=${choosenModel}&engine=${choosenEnagine}`
      )
    )

    if (
      router.asPath.includes('product') ||
      router.asPath.includes('categories')
    ) {
      path = `${
        router.asPath.split('?')[0]
      }?brand=${choosenBrand}&model=${choosenModel}&engine=${choosenEnagine}&fits=${
        router.query.fits
      }`

      router.push(path)
    }
  }

  const goToFindPageWithQuerys = () => {
    let path

    dispatch(
      setSelectedCar(
        `?brand=${router.query.brand}&model=${router.query.model}&engine=${router.query.engine}`
      )
    )

    if (
      router.asPath.includes('product') ||
      router.asPath.includes('categories')
    ) {
      path = `${router.asPath.split('?')[0]}?brand=${
        router.query.brand
      }&model=${router.query.model}&engine=${router.query.engine}&fits=${
        router.query.fits
      }`

      router.push(path)
    }
  }

  useEffect(() => {
    if (router.query.brand && router.query.model && router.query.engine) {
      setChoosenBrand(router.query.brand)
      setChoosenModel(router.query.model)
      setChoosenEngine(router.query.engine)
      setFinnalychooseCar(true)
      goToFindPageWithQuerys()
    }
  }, [])

  useEffect(() => {
    if (startSearching) {
      setLoading(true)
      const abortController = new AbortController()
      const { signal } = abortController
      const apiCall = async () => {
        try {
          const res = await fetch(
            `https://backend.bayrakparts.com/getAllCarBrands`,
            {
              method: 'GET',
              signal: signal,
            }
          )

          const body = await res.json()

          setBrands(body)
        } catch (error) {
          if (!signal?.aborted) {
          }
        } finally {
          setLoading(false)
        }
      }
      apiCall()

      return () => {
        abortController.abort()
      }
    }
  }, [startSearching])

  useEffect(() => {
    if (choosenBrand && !router.query.brand) {
      setChoosenModel(null)
      setChoosenEngine(null)
      setLoading(true)
      const abortController = new AbortController()
      const { signal } = abortController
      const apiCall = async () => {
        try {
          const res = await fetch(
            `https://backend.bayrakparts.com/getAllCarModelsByBrand/${choosenBrand}`,
            {
              method: 'GET',
              signal: signal,
            }
          )

          const body = await res.json()

          if (router.query.model) {
            const sameModel = body.find(
              model => model.name === router.query.model
            )

            if (sameModel) {
              setChoosenModel(sameModel.name)
            }
          }

          setModels(body)

          setOpenedBrandCont(false)
          setOpenedModelsCont(true)
          if ((choosenModel, choosenEnagine)) {
            setChoosenModel(null)
            setChoosenEngine(null)
            setEngines([])
          }
          setLoading(false)
        } catch (error) {
          if (!signal?.aborted) {
            console.error(error)
          }
          setLoading(false)
        }
      }
      apiCall()

      return () => {
        abortController.abort()
      }
    }
  }, [choosenBrand])

  useEffect(() => {
    if (
      choosenBrand &&
      choosenModel &&
      !router.query.model &&
      !router.query.brand
    ) {
      setLoading(true)
      const abortController = new AbortController()
      const { signal } = abortController
      const apiCall = async () => {
        try {
          const res = await fetch(
            `https://backend.bayrakparts.com/getAllEnginesByModel/${choosenBrand}?model=${choosenModel}`,
            {
              method: 'GET',
              signal: signal,
            }
          )

          const body = await res.json()

          if (router.query.engine) {
            const sameEngine = body.find(
              engine => engine.name === router.query.engine
            )

            if (sameEngine) {
              setChoosenEngine(sameEngine.name)
            }
          }

          setOpenedModelsCont(false)
          setOpenedEnginesCont(true)

          // const values = body
          //   .map(({ products_count }) => products_count)
          //   .sort((a, b) => b - a)
          //   .slice(0, 30)
          // const top30 = body.filter(({ products_count }) =>
          //   values.includes(products_count)
          // )

          setEngines(body)
          if (choosenEnagine) {
            setChoosenEngine(null)
          }
          setLoading(false)
        } catch (error) {
          if (!signal?.aborted) {
            console.error(error)
          }
          setLoading(false)
        }
      }
      apiCall()

      return () => {
        abortController.abort()
      }
    }
  }, [choosenModel])

  useEffect(() => {
    if (
      choosenBrand &&
      choosenModel &&
      choosenEnagine &&
      !router.query.model &&
      !router.query.brand &&
      !router.query.engine
    ) {
      setFinnalychooseCar(true)
      setOpenedEnginesCont(false)

      goToFindPage()
    }
  }, [choosenEnagine])

  const chooseNewCar = () => {
    setFinnalychooseCar(false)
    dispatch(setSelectedCar(''))
    setChoosenBrand(null)
    setChoosenModel(null)
    setChoosenEngine(null)
    setModels([])
    setEngines([])

    if (
      router.asPath.includes('product') ||
      router.asPath.includes('categories')
    ) {
      router.push(router.asPath.split('?')[0])
    }
  }

  const openCloseBrand = () => {
    if (openedBrandsCont) {
      setOpenedBrandCont(false)
      setOpenedModelsCont(false)
      setOpenedEnginesCont(false)
    } else {
      setOpenedBrandCont(true)
      setOpenedModelsCont(false)
      setOpenedEnginesCont(false)
    }
  }

  const openCloseModel = () => {
    if (openedModelsCont) {
      setOpenedBrandCont(false)
      setOpenedModelsCont(false)
      setOpenedEnginesCont(false)
    } else {
      setOpenedBrandCont(false)
      setOpenedModelsCont(true)
      setOpenedEnginesCont(false)
    }
  }

  const openCloseEngine = () => {
    if (openedEnginesCont) {
      setOpenedBrandCont(false)
      setOpenedModelsCont(false)
      setOpenedEnginesCont(false)
    } else {
      setOpenedBrandCont(false)
      setOpenedModelsCont(false)
      setOpenedEnginesCont(true)
    }
  }

  return (
    <>
      {router.query.viewport != 'mobile' ? (
        <div className={styles.main_container_for_serach}>
          {!finallyChooseCar ? (
            <>
              {!choosenBrand ? (
                <div
                  className={styles.search_form}
                  onClick={startSearchProcess}
                >
                  <div className={styles.container_for_text_search}>
                    <h2>Обрати своє авто</h2>
                    <h3>для перевірки сумісності автозапчастин</h3>
                  </div>
                  {arrrowDown}
                </div>
              ) : (
                <>
                  <div className={styles.search_form_edit}>
                    {carChoosed}
                    <div
                      className={styles.container_for_text_search_edit}
                      onClick={openCloseBrand}
                    >
                      <div className={styles.cont_text_and_arrow}>
                        {arrrowDown}
                        <span className={styles.name_of_fieled}>
                          {choosenBrand}
                        </span>
                      </div>
                    </div>
                    {choosenModel ? (
                      <div
                        className={styles.container_for_text_search_edit}
                        onClick={openCloseModel}
                      >
                        <div className={styles.cont_text_and_arrow}>
                          {arrrowDown}
                          <span className={styles.name_of_fieled}>
                            {choosenModel}
                          </span>
                        </div>
                      </div>
                    ) : choosenBrand && !choosenModel ? (
                      <div
                        className={styles.container_for_text_search_edit}
                        onClick={openCloseModel}
                      >
                        <div className={styles.cont_text_and_arrow}>
                          {arrrowDown}
                          <span className={styles.name_of_fieled_orange}>
                            Модель
                          </span>
                        </div>
                      </div>
                    ) : null}
                    {choosenEnagine ? (
                      <div
                        className={styles.container_for_text_search_edit}
                        onClick={openCloseEngine}
                      >
                        <div className={styles.cont_text_and_arrow}>
                          {arrrowDown}
                          <span className={styles.name_of_fieled}>
                            {choosenEnagine}
                          </span>
                        </div>
                      </div>
                    ) : !choosenEnagine && choosenBrand && choosenModel ? (
                      <div
                        className={styles.container_for_text_search_edit}
                        onClick={openCloseEngine}
                      >
                        <div className={styles.cont_text_and_arrow}>
                          {arrrowDown}
                          <span className={styles.name_of_fieled_orange}>
                            Двигун
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className={styles.search_form_choosed}>
              <div className={styles.choosen_car_text_icon}>
                {carChoosed}
                <h3 className={styles.name_of_choosen_car}>
                  {choosenBrand} {choosenModel} {choosenEnagine}
                </h3>
              </div>
              <div
                className={styles.choosen_car_return_cont}
                onClick={chooseNewCar}
              >
                {changeCar}
                <span>Обрати інше авто</span>
              </div>
            </div>
          )}
          {openedBrandsCont ? (
            <BrandsList setChoosenBrand={setChoosenBrand} brands={brands} />
          ) : null}
          {openedModelsCont ? (
            <ModelList setChoosenModel={setChoosenModel} models={models} />
          ) : null}
          {openedEnginesCont ? (
            <EngineList setChoosenEngine={setChoosenEngine} engines={engines} />
          ) : null}
        </div>
      ) : (
        <div className={styles.main_container_for_search_mobile}>
          {!choosenBrand ? (
            <div
              className={styles.search_box_mobile}
              onClick={startSearchProcess}
            >
              <span className={styles.search_title}>Обрати своє авто</span>
              <span className={styles.search_description}>
                Для перевірки сумісності запчастин
              </span>
            </div>
          ) : (
            <div className={styles.search_box_mobile_edit}>
              {carChoosed}
              <div className={styles.car_name_cont}>
                <div className={styles.row_brand_model}>
                  {choosenBrand ? (
                    <span onClick={openCloseBrand}>{choosenBrand}</span>
                  ) : null}
                  {choosenModel ? (
                    <span onClick={openCloseModel}>{choosenModel}</span>
                  ) : !choosenModel && choosenBrand ? (
                    <span
                      className={styles.edit_mode_arrow}
                      onClick={openCloseModel}
                    >
                      {arrrowDown}Модель
                    </span>
                  ) : null}
                </div>
                <div className={styles.engine_choosen_title}>
                  {choosenEnagine ? (
                    <span onClick={openCloseEngine}>{choosenEnagine}</span>
                  ) : !choosenEnagine && choosenModel && choosenBrand ? (
                    <span
                      className={styles.edit_mode_arrow}
                      onClick={openCloseEngine}
                    >
                      {arrrowDown}Двигун
                    </span>
                  ) : null}
                </div>
              </div>
              <div
                onClick={chooseNewCar}
                className={styles.change_auto_icon_cont}
              >
                {changeCar}
              </div>
            </div>
          )}
          {openedBrandsCont ? (
            <BrandsList setChoosenBrand={setChoosenBrand} brands={brands} />
          ) : null}
          {openedModelsCont ? (
            <ModelList setChoosenModel={setChoosenModel} models={models} />
          ) : null}
          {openedEnginesCont ? (
            <EngineList setChoosenEngine={setChoosenEngine} engines={engines} />
          ) : null}
        </div>
      )}
    </>
  )
}

export default New_car_choose_form
