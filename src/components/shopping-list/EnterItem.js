import React, { Component } from 'react'
import { addListItem, addItem } from '../../store/actions/shoppingListActions'
import { connect } from 'react-redux'
import Autocomplete from 'react-autocomplete'
import { backendService } from '../../services/backendService'
import { Redirect, withRouter } from 'react-router-dom'

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

  redirectUnauthorized = () => {
    const authenticatedUser = localStorage.getItem('user')
    if (!authenticatedUser) {
      this.props.history.push('/login')
    }
  }

  addListItem = async (item) => {
    await this.props.addListItem(item)
    this.redirectUnauthorized()
  }

  handleChange = async (e) => {
    await this.setState({
      name: e.target.value
    })
    if (this.state.name.length > 2) {
      try {
        const response = await backendService.getAutoCompleteData(this.state.name)
        const {data} = response
        if (data) {
          await this.setState({
            autoCompleteData: data
          })
        }
      } catch (error) {
        this.redirectUnauthorized(error)
      }
    }
  }

  handleSelect = (value) => {
    this.setState({
      name: value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    if (this.state.name.length > 1) {

      if (this.props.listItems.some(listItem => listItem.item.name === this.state.name)) {
        return
      }

      const items = this.state.autoCompleteData
      let item
      item = items.find(item => item.name === this.state.name)
      if (!item) {
        const res = await this.props.addItem(this.state.name)
        const { data } = res
        if (!data) {
          this.redirectUnauthorized()
        }
        await this.addListItem(res.data)
      } else {
        await this.addListItem(item)
      }
      this.setState({ name: '' })
      await this.props.loadListItems()
    }
  }

  render () {
    const authenticatedUser = localStorage.getItem('user')
    if (!authenticatedUser) {
      return <Redirect to='/login'/>
    }

    return (
      <div className="row enter-item">
        <form className="white z-depth-1" onSubmit={this.handleSubmit}>
          <div className="row without-after">
            <div className="col l11 m10 s10">
              <Autocomplete
                getItemValue={(item) => item.name}
                items={this.state.autoCompleteData}
                renderItem={(item, isHighlighted) =>
                    isHighlighted ? <div className="highlighted suggestion" style={{ background: '#ef5350' }} key={item._id}>
                    {item.name}
                  </div> :
                    <div className="suggestion" style={{ background: 'white'}} key={item._id}>
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
                    boxSizing: 'border-box'
                  }
                }}
              />
              </div>
            <div className="col l1 m2 s2" id="submit">
              <a class="btn-floating waves-effect waves-light red lighten-1" onClick={this.handleSubmit}><i class="material-icons">add</i></a>
            </div>
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
    addListItem: (itemInfo) => dispatch(addListItem(itemInfo)),
    addItem: (itemName) => dispatch(addItem(itemName))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnterItem))