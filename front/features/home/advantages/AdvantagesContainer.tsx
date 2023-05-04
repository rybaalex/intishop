import Styles from "./Advantages.module.scss";
import { AvailableIcon, PriceIcon, TrackIcon } from "components/icons";

const AdvantagesContainer = () => {
  return (
    <div className={Styles.advantages_container}>
      <div className={Styles.truck}>
        <TrackIcon />
        <div className={Styles.text_item}>
          <h3>
            БЕСПЛАТНАЯ ДОСТАВКА
          </h3>
          <span>
            При заказе от 4000 рублей
          </span>
        </div>
      </div>
      <div className={Styles.best_price}>
        <PriceIcon />
        <div className={Styles.text_item}>
          <h3>
            ЛУЧШАЯ ЦЕНА
          </h3>
          <span>
              Работаем напрямую с производителем
          </span>
        </div>

      </div>
      <div className={Styles.available}>
        <AvailableIcon />
        <div className={Styles.text_item}>
          <h3>
            ВСЕГДА В НАЛИЧИИ
          </h3>
          <span>
            Не нужно ждать
          </span>
        </div>

      </div>
    </div>
  );

};

export { AdvantagesContainer };