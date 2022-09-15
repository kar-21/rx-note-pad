import {
  setSpinner,
  resetSpinner,
} from "./../ActionCreators/commonState.actionCreators";
import { AnyAction, Dispatch } from "redux";
import { getUserDetailsSuccess } from "./../ActionCreators/userDetails.actionCreator";
import { getAPI } from "../../httpClient/httpClient";

export const redirectOauth2URI =
  () =>
  async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    try {
      if (process.env.REACT_APP_BACKEND_API) {
        dispatch(setSpinner("Redirecting to Google login..."));
        const redirectURI = await getAPI(
          `${process.env.REACT_APP_BACKEND_API}/login`
        );
        if (redirectURI.status === 200) {
          dispatch(resetSpinner());
          window.location.replace(redirectURI.data.redirectURL);
        }
      }
    } catch (error) {
      dispatch(resetSpinner());
      console.error(">>:::>>", error);
    }
  };

export const getUserDetails =
  (userId: string) => async (dispatch: Dispatch) => {
    try {
      if (process.env.REACT_APP_BACKEND_API) {
        const userDetails = await getAPI(
          `${process.env.REACT_APP_BACKEND_API}/user`,
          { sub: userId }
        );
        if (userDetails.status === 200) {
          dispatch(getUserDetailsSuccess(userDetails.data));
        }
      }
    } catch (error) {
      console.error(">>:::>>", error);
    }
  };
