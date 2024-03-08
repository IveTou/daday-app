import { getUser } from "@/app/profile/actions"
import { createSlice, Dispatch } from "@reduxjs/toolkit"

type ProfileState = {
  id: string
  name: string
  email: string | null
  address: string | null
  phone: string | null
  role: string
}

const initialState: { profile: ProfileState} = {
  profile: {
    id: "",
    name: "",
    email: null,
    address: null,
    phone: null,
    role: ""
  }
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfileSuccess(state, action) {
      state.profile = action.payload
    },
  },
})


export const { getProfileSuccess } = profileSlice.actions

export default profileSlice.reducer

export function getProfile() {
  return async (dispatch: Dispatch) => {
    try {
      const { data, error, errorMessage } = await getUser()

      if(error) {
        throw new Error(errorMessage)
      }

      dispatch(getProfileSuccess(data));
    } catch (error) {
      console.error("Error fetching profile resources:", error);
    }
  };
}
