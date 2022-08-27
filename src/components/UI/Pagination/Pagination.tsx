import styles from "./Pagination.module.scss";

type PaginationProps = {
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
};

const Pagination = ({
  page,
  pageCount,
  setPage,
  prevPage,
  nextPage,
}: PaginationProps) => {
  let content = [];
  for (let i = 1; i <= pageCount; i++) {
    content.push(
      <div
        className={`${styles["pagination__page"]} ${
          page === i ? `${styles["active"]}` : ""
        }`}
        key={i}
        onClick={() => setPage(i)}
      >
        {i}
      </div>
    );
  }

  return (
    <div className={`${styles["pagination"]}`}>
      <div
        className={`${styles["pagination__page"]}`}
        key="prev"
        onClick={prevPage}
      >
        Prev
      </div>
      {content}
      <div
        className={`${styles["pagination__page"]}`}
        key="next"
        onClick={nextPage}
      >
        Next
      </div>
    </div>
  );
};

export default Pagination;
