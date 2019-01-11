import React, { Component } from 'react'
import { addItem } from '../../store/actions/shoppingListActions'
import { connect } from 'react-redux'
import Autocomplete from 'react-autocomplete'
import { backendService } from '../../services/backendService'

class EnterItem extends Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  state = {
    name: '',
    quantity: 1,
    userId: '',
    autoCompleteData: []
  }
  handleChange = async (e) => {
    console.log('change')
    await this.setState({
      name: e.target.value
    })
    if (this.state.name.length > 2) {
      const data = await backendService.getAutoCompleteData(this.state.name)
      await this.setState({
        autoCompleteData: data
      })
    }
  }

  handleSelect = (value, item) => {
    console.log('selected')
    this.setState({
      name: value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    if (this.state.name.length > 1) {
      const items = this.state.autoCompleteData
      const item = items.find(item => item.name === this.state.name)
      console.log('itema')
      console.log(item)
      await this.props.addListItem(item)
      this.setState({ name: '' })
      await this.props.loadListItems()
    }
  }
  componentDidMount = () => {
    // this.nameInput.focus()
  }

  render () {

    return (
      <div className="row enter-item">
        <form className="white z-depth-1" onSubmit={this.handleSubmit}>
          <div className="row">
            <Autocomplete
              className="autocomplete"
              getItemValue={(item) => item.name}
              items={this.state.autoCompleteData}
              renderItem={(item, isHighlighted) =>
                  isHighlighted ? <div className="highlighted suggestion" style={{ background: '#ef5350' }}>
                  {item.name}
                </div> :
                  <div className="suggestion" style={{ background: 'white'}}>
                  {item.name}
                  </div>
              }
              shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
              value={this.state.name}
              onChange={this.handleChange}
              wrapperStyle={{display: 'block'}}
              onSelect={this.handleSelect}
              inputProps={{
                style: {
                  borderBottomColor: '#ffcdd2',
                  paddingLeft: '15px',
                  paddingRight: '15px'
                }
              }}
            />
            </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shoppingList: state.shoppingList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addListItem: (itemInfo) => dispatch(addItem(itemInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterItem)