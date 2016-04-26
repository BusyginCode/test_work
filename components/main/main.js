import { ajax, documentClick } from 'utils'
import Modal from 'react-modal'

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
    const modalStyles = {
      content: {
        textAlign: 'center'
      }
    }
    return(
      <div className="container">
      {
        this.state.openPhoto ?
          <Modal isOpen={!!this.state.openPhoto} style={ modalStyles }>
            <img src={ this.state.openPhoto.url } />
            <h5>{ this.state.openPhoto.description }</h5>
            <h3>Click anywhere to close</h3>
          </Modal>
        : null
      }
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
            {
              // check min step
              this.state.step > 1 ?
              <button className="btn btn-default" onClick={ this.changeStep.bind(this, false) }>Prev. page</button>
            : null
            }
            {
              // check max step
              this.state.step < this.state.totalPages ?
                <button 
                  className="btn btn-primary" 
                  onClick={ this.changeStep.bind(this, true) } 
                  style={{ marginLeft: 10 + 'px' }}
                >
                  Next page
                </button>
              : null
            }
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

