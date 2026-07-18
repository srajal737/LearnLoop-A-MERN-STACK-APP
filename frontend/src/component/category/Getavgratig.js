const getAvgRating = (ratingArr = []) => {
  if (ratingArr.length === 0) {
    return 0;
  }

  const sum = ratingArr.reduce((sum, curr) => sum + curr.rating, 0);

  return Math.round((sum / ratingArr.length) * 10) / 10;
};

export default getAvgRating;