import styles from "../../styles/Card.module.css";
import { ShopContext } from "../contex/contex";
import { useContext } from "react";
import { close } from "../SVGs/SVGs";
import { deleteRed } from "../SVGs/SVGs";
import { useRouter } from "next/router";

const Card = () => {
  const router = useRouter();

  const goToCheckOut = () => {
    setOpenCard(false);
    router.push(`/checkout`);
  };
  const {
    setOpenCard,
    cartItems,
    cartsItemsObj,
    addToCart,
    removeOneUnit,
    removeFromBusket,
  } = useContext(ShopContext);

  var total = 0;

  var sum = cartItems.reduce(function (accumulator, currentValue) {
    return (
      accumulator + currentValue.price * cartsItemsObj[currentValue.article]
    );
  }, total);

  return typeof cartItems[0] != "undefined" ? (
    <div className={styles.card}>
      <h2>Товари у кошику</h2>
      <div className={styles.item_list_names}>
        <div></div>
        <span>Назва</span>
        <span className={styles.count_in_desctop}>К-сть</span>
        <span>Ціна</span>
      </div>
      {cartItems.map((item) => (
        <div className={styles.item_list}>
          <img src={item.img} />
          <span className={styles.item_description_in_card}>{item.title}</span>
          <span className={styles.amount_cont}>
            <button
              className={styles.plus_min_btn}
              onClick={() => removeOneUnit(item.article)}
            >
              -
            </button>
            {cartsItemsObj[item.article]}
            <button
              className={styles.plus_min_btn}
              onClick={() => addToCart(item)}
            >
              +
            </button>
          </span>
          <span>{item.price * cartsItemsObj[item.article]} грн</span>
          <button
            className={styles.delete_btn}
            onClick={() => removeFromBusket(item.article)}
          >
            {deleteRed}
          </button>
        </div>
      ))}

      <button className={styles.close_btn} onClick={() => setOpenCard(false)}>
        {close}
      </button>
      <h3>Загальна сума : {sum} грн</h3>
      <button
        className={styles.go_to_checkout_btn}
        onClick={() => goToCheckOut()}
      >
        Перейти до замовлення
      </button>
    </div>
  ) : (
    <div className={styles.card_empty}>
      <h2>Ваш кошик порожній</h2>
      <button className={styles.close_btn} onClick={() => setOpenCard(false)}>
        {close}
      </button>
    </div>
  );
};

export default Card;
