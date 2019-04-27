import React from 'react'
import { Notification } from 'bloomer/lib/elements/Notification';
import { connect } from 'react-redux';
import { removeToast } from '../redux/toasts';
import { Delete } from 'bloomer/lib/elements/Delete';

const Toasts = ({toasts, removeToast}) => (
  <ToastContainer>
    {toasts && toasts.length > 0 && 
      toasts.map((t, index) => <Toast key={index} {...t} onDelete={removeToast} />)
    }
  </ToastContainer>
)

const ToastContainer = ({ children }) => (
  <div className="toasts-container">
    {children}
  </div>
)

const Toast = ({ message, id, onDelete, ...props }) => {
  console.log(props);
  return (
  <Notification {...props}>
    {message}
    <Delete onClick={() => onDelete(id)} />
  </Notification>
)}

const mapStateToProps = state => ({
  toasts: state.toasts
})

const mapDispatchToProps = dispatch => ({
  removeToast: id => dispatch(removeToast(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Toasts)