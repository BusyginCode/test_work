import Modal from 'react-modal'

export default class MyModal extends React.Component {

  render() {

    const modalStyles = {
      content: {
        textAlign: 'center'
      }
    }

    return (
      <div>
        {
          this.props.openPhoto ?
            <Modal isOpen={ !!this.props.openPhoto } style={ modalStyles }>
              <img src={ this.props.openPhoto.url } />
              <h5>{ this.props.openPhoto.description }</h5>
              <h3>Click anywhere to close</h3>
            </Modal>
          : null
        }
      </div>
    )
  }

}