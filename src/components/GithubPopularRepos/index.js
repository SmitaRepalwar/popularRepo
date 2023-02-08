import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatus = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class GithubPopularRepos extends Component {
  state = {
    selectedButtonId: languageFiltersData[0].id,
    language: languageFiltersData[0].language,
    selectedApiStatus: apiStatus.inProgress,
    selectedRepo: [],
  }

  componentDidMount() {
    this.fetchingApi()
  }

  fetchingApi = async () => {
    const {language} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${language}`

    const response = await fetch(url)
    const data = await response.json()

    const updatedData = data.popular_repos.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))

    if (response.ok === true) {
      this.setState({
        selectedRepo: updatedData,
        selectedApiStatus: apiStatus.success,
      })
    } else {
      this.setState({selectedApiStatus: apiStatus.failure})
    }
  }

  onClickButton = id => {
    const selectedItem = languageFiltersData.find(
      eachLanguage => id === eachLanguage.id,
    )
    this.setState(
      {
        language: selectedItem.language,
        selectedButtonId: id,
        selectedApiStatus: apiStatus.inProgress,
      },
      this.fetchingApi,
    )
  }

  renderTabsList = () => {
    const {selectedButtonId} = this.state
    return (
      <ul className="tab-list">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            languageDetails={eachItem}
            key={eachItem.id}
            onClickButton={this.onClickButton}
            selectedButtonId={selectedButtonId}
          />
        ))}
      </ul>
    )
  }

  renderOnSuccess = () => {
    const {selectedRepo} = this.state
    return (
      <ul className="git-hub-con">
        {selectedRepo.map(eachItem => (
          <RepositoryItem repoDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderOnFailure = () => (
    <img
      className="failure-image"
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
    />
  )

  renderOnLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderApiStatus = () => {
    const {selectedApiStatus} = this.state

    switch (selectedApiStatus) {
      case apiStatus.inProgress:
        return this.renderOnLoading()
      case apiStatus.success:
        return this.renderOnSuccess()
      case apiStatus.failure:
        return this.renderOnFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-con">
        <h1>Popular</h1>
        <div> {this.renderTabsList()} </div>
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default GithubPopularRepos
