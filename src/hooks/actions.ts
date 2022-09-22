import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import {selectSliceActions} from '../redux/slices'

const actions = {
  ...selectSliceActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}