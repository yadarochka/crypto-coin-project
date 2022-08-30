import Card from "@components/UI/Card";
import Pagination from "@components/UI/Pagination";
import { Coin } from "@type/CoinType";
import { rounding } from "@utils/rounding";
import { Link } from "react-router-dom";

import usePagination from "../../../../hooks/usePagination";
import styles from "./CoinList.module.scss";

type CoinListProps = {
  searchedCoins: Coin[];
  currency: string;
  paginationHide?: boolean;
  contentCount: number;
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
}: CoinListProps) => {
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 10,
    count: contentCount,
  });

  const labels: string[] = [];
  for (let i = 0; i < contentCount; i++) {
    labels[i] = `${i}`;
  }

  return (
    <div className={styles["coin-list"]}>
      {searchedCoins
        .slice(firstContentIndex, lastContentIndex)
        .map((coin: Coin) => {
          return (
            <Link
              className={styles["coin-list__link"]}
              key={`link_${coin.id}`}
              to={`/coins/${coin.id}`}
            >
              <Card
                currency={currency.toUpperCase()}
                key={coin.id}
                name={coin.name}
                subtitle={coin.symbol}
                image={coin.image}
                price={rounding(coin.current_price, 5)}
                priceChange={rounding(coin.price_change_percentage_24h, 5)}
                className={styles["coin-list__item"]}
                priceType={true}
                coinData={coin.sparkline_in_7d.price}
                coinLabels={labels}
                onMouseEvent={false}
              ></Card>
            </Link>
          );
        })}
      {paginationHide && (
        <Pagination
          page={page}
          nextPage={nextPage}
          prevPage={prevPage}
          pageCount={totalPages}
          setPage={setPage}
        ></Pagination>
      )}
    </div>
  );
};

export default CoinList;
