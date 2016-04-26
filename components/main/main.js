import { ajax, documentClick } from 'utils'
import { MyModal, Navigation } from 'components'

export default class Main extends React.Component {

  constructor() {
    super()
    this.state = {
      photos: null,
      openPhoto: null,
      step: 1,
      totalPages: null
    }
  }

  /*
  * In componentDidMount method, photos initializes photos state
  */

  componentDidMount() {
    ajax (
     'https://api.500px.com/v1/photos?feature=popular&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF&page=' + this.state.step,
      '',
      (data) => {
        this.setState({
          photos: data.photos,
          totalPages: data.total_pages
        })
      },
      'GET'
    )
  }

  /*
  * openModal method, open modal with image
  */

  openModal(photo) {
    this.setState({
      openPhoto: {
        url: photo.image_url,
        description: photo.description
      } 
    }, () => {
      documentClick.subscribe(this.closeModal)
    })
  }

  /*
  * closeModal method close the modal 
  */

  closeModal = () => {
    this.setState({
      openPhoto: null
    }, () => {
      documentClick.unsubscribe(this.closeModal)
    })
  };

  /*
  * changeStep method change pages
  */

  changeStep(add) {
    if (add) {
      ++this.state.step
    } else {
      --this.state.step
    }
    this.state.photos = null
    this.componentDidMount()
    this.setState({
      step: this.state.step
    })
  }

  render() {
    return(
      <div className="container">
      <MyModal openPhoto={ this.state.openPhoto }/>
      {
        this.state.photos ?
          <div className="images_container">
            {
              this.state.photos.map((photo, key) => {
                return (
                  <div 
                    className="image_container" 
                    key={ key } 
                    style={{ display: 'inline-block', paddingBottom: 10 + 'px', paddingLeft: (key % 2 !== 0 ? 10 + 'px' : null) }}
                  >
                    <img 
                      src={ photo.image_url } 
                      onClick={ this.openModal.bind(this, photo) }
                    />
                  </div>
                )
              })
            }
            <Navigation 
              totalPages={ this.state.totalPages }
              step={ this.state.step } 
              changeStepPlus={ this.changeStep.bind(this, true) } 
              changeStepMinus={ this.changeStep.bind(this, false) } 
            />
          </div>
        :
        <div className="loader">
          <img src="./images/loading.gif" style={{ width: 200 + 'px' }} />
        </div>
      }
      </div>
    )
  }
}

