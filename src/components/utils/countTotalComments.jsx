const countTotalComments = (comments) => {
  let total = comments.length;
  comments.forEach((comment) => {
    if (comment.sub_comments && comment.sub_comments.length > 0) {
      total += countTotalComments(comment.sub_comments);
    }
  });
  return total;
};

export default countTotalComments;
