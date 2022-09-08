import Card from "@components/UI/Card";
import Pagination from "@components/UI/Pagination";
import { CoinListModel } from "@store/models";
import paginationStore from "@store/paginationStore";
import { rounding } from "@utils/rounding";
import { Link } from "react-router-dom";

import styles from "./CoinList.module.scss";

type CoinListProps = {
  searchedCoins: CoinListModel[];
  currency: string;
  paginationHide?: boolean;
  contentCount: number;
  paginationStore: paginationStore;
};

const CoinList = ({
  /** Найденные в поиске монеты */
  searchedCoins,
  /** Валюта */
  currency,
  /** Показать/скрыть пагинацию */
  paginationHide = false,
  /** Количество контента */
  contentCount,
  /**  */
  paginationStore,
}: CoinListProps) => {
  const labels: string[] = [];
  for (let i = 0; i < contentCount; i++) {
    labels[i] = `${i}`;
  }
  return (
    <div className={styles["coin-list"]}>
      {searchedCoins
        .slice(
          paginationStore.firstContentIndex,
          paginationStore.lastContentIndex
        )
        .map((coin: CoinListModel) => {
          return (
            <Link
              className={styles["coin-list__link"]}
              key={`link_${coin.id}`}
              to={`/${coin.id}`}
            >
              <Card
                currency={currency.toUpperCase()}
                key={coin.id}
                name={coin.name}
                subtitle={coin.symbol}
                image={coin.image}
                price={rounding(coin.currentPrice, 5)}
                priceChange={rounding(coin.priceChangePercentage24h, 5)}
                className={styles["coin-list__item"]}
                priceType={true}
                coinData={coin.sparkline7d.price}
                coinLabels={labels}
                onMouseEvent={false}
              ></Card>
            </Link>
          );
        })}
      {!paginationHide && (
        <Pagination
          page={paginationStore.page}
          nextPage={paginationStore.nextPage}
          prevPage={paginationStore.prevPage}
          pageCount={paginationStore.pageCount}
          setPage={paginationStore.setPage}
        ></Pagination>
      )}
    </div>
  );
};
export default CoinList;
