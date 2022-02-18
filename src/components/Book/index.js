import './index.css'

const Book = props => {
  const {bookDetails} = props
  const {
    authorName,
    coverPic,

    title,
    readStatus,
    rating,
  } = bookDetails
  return (
    <>
      <div className="container1">
        <div className="books-container">
          <img className="book-image" alt="" src={coverPic} />
          <div className=" book-details">
            <h1 className="books-heading">{title}</h1>
            <p className="books-pera">{authorName}</p>
            <p className="rating">Rating:{rating}</p>
            <p className="status">
              Status:<span className="spanEl">{readStatus}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Book
