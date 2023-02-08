import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {id, avatarUrl, name, starsCount, forksCount, issuesCount} = repoDetails

  return (
    <li className="list-card-item">
      <img className="avatar" src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <div className="count-con">
        <img
          className="icon-image"
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
        />
        <p>{starsCount}</p>
        <p>stars</p>
      </div>
      <div className="count-con">
        <img
          className="icon-image"
          alt="forks"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
        />
        <p>{forksCount}</p>
        <p>forks</p>
      </div>
      <div className="count-con">
        <img
          className="icon-image"
          alt="open issues"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
        />
        <p>{issuesCount}</p>
        <p>issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
