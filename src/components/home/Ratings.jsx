import "./product.css";
function Ratings(props) {
  const { ratings } = props;
  return (
    <div className="ratings">
      <span>
        <i
          className={
            ratings >= 1
              ? "bx bxs-star"
              : ratings >= 0.5
                ? "bx bxs-star-half"
                : "bx bx-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            ratings >= 2
              ? "bx bxs-star"
              : ratings >= 1.5
                ? "bx bxs-star-half"
                : "bx bx-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            ratings >= 3
              ? "bx bxs-star"
              : ratings >= 2.5
                ? "bx bxs-star-half"
                : "bx bx-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            ratings >= 4
              ? "bx bxs-star"
              : ratings >= 3.5
                ? "bx bxs-star-half"
                : "bx bx-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            ratings >= 5
              ? "bx bxs-star"
              : ratings >= 4.5
                ? "bx bxs-star-half"
                : "bx bx-star"
          }
        ></i>
      </span>
    </div>
  );
}

export default Ratings;
