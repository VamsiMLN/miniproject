import './index.css'

const BookDetailsRoute = props => {
  const {data} = props
  return (
    <>
      <div className="detailsRoute-container">
        <div className="details-route">
          <div className="details-book">
            <img
              alt=""
              className="book-image"
              src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644900733/Rectangle_1430_b5wy3v.png"
            />
            <div className="description">
              <h1 className="books-heading">The Begining of the evening</h1>
              <p className="books-pera">Robyn Schnider</p>
              <p className="rating">Avg Rating * 4.5</p>
              <p className="status">
                Status:<span className="spanEl">Read</span>
              </p>
            </div>
          </div>
          <hr className="hr" />
          <div>
            <h1 className="about-author">About Author</h1>
            <p className="about-pera">
              James Clear is a writer and speaker focused on habits, decision
              making, and continuous improvement. He is the author of the #1 New
              York Times bestseller, Atomic Habits. The book has sold over 5
              million copies worldwide and has been translated into more than 50
              languages.
            </p>
            <h1 className="about-author">About Author</h1>
            <p className="about-pera">
              James Clear is a writer and speaker focused on habits, decision
              making, and continuous improvement. He is the author of the #1 New
              York Times bestseller, Atomic Habits. The book has sold over 5
              million copies worldwide and has been translated into more than 50
              languages.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default BookDetailsRoute
