import React from 'react'
import { Notification } from 'bloomer/lib/elements/Notification';
import { connect } from 'react-redux';
import { removeToast } from '../redux/toasts/toasts';
import { Delete } from 'bloomer/lib/elements/Delete';
import posed, { PoseGroup } from 'react-pose'

const Toasts = ({ toasts, removeToast }) => (
  <ToastContainer className="columns is-multiline toasts-container">
    <PoseGroup pose="enter" initialPose="exit">
    {toasts && toasts.length > 0 &&
      toasts.map((t, index) => <Toast key={index} {...t} onDelete={removeToast} />)
    }
    </PoseGroup>
  </ToastContainer>
)

const ToastContainer = posed.div({
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
})

const PosedDiv = posed.div({
  enter: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -100
  }
})

const Toast = ({ message, id, onDelete, isColor, ...props }) => {
  console.log(props);
  return (
    <PosedDiv key={id} className="column" {...props}>
      <Notification isColor={isColor || 'info'} >
        {message()}
        <Delete onClick={() => onDelete(id)} />
      </Notification>
    </PosedDiv>
  )
}

const mapStateToProps = state => ({
  toasts: state.toasts
})

const mapDispatchToProps = dispatch => ({
  removeToast: id => dispatch(removeToast(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Toasts)