import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

import type { AppState } from '../../app/store'
// import { fetchCart } from './cartAPI'

export interface UserState {
  value: null | User
  status: 'idle' | 'loading' | 'failed'
}

const initialState: UserState = {
  value: null,
  status: 'idle',
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'product/check',
  async (product: User) => {
    // const response = await fetchCart(amount)
    // The value we return becomes the `fulfilled` action payload
    // return response.data
    return true
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    load: (state, action: PayloadAction<User>) => {
      state.value = action.payload
    },
    update: (state, action: PayloadAction<User>) => {
      state.value = { ...state.value, ...action.payload }
    },
    destroy: (state) => {
      state.value = null
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        // action.payload
        // boolean with availability data
      })
  },
})

export const { load, destroy } = userSlice.actions

export const userActions = userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.cart.value)`
export const selectUser = (state: AppState) => state.user.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//     (dispatch, getState) => {
//       const currentValue = selectUser(getState())
//       if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount))
//       }
//     }

const userReducer = userSlice.reducer
export default userReducer