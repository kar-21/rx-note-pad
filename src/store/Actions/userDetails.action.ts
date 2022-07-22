import { AnyAction, Dispatch } from "redux";
import { getUserDetailsSuccess } from "./../ActionCreators/userDetails.actionCreator";
import { getAPI } from "../../httpClient/httpClient";

export const redirectOauth2URI =
  () =>
  async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    if (process.env.REACT_APP_BACKEND_API) {
      const redirectURI = await getAPI(
        `${process.env.REACT_APP_BACKEND_API}/login`
      );
      if (redirectURI.status === 200) {
        window.location.replace(JSON.parse(redirectURI.data).redirectURL);
      }
    }
  };

export const getUserDetails =
  (userId: string) => async (dispatch: Dispatch) => {
    if (process.env.REACT_APP_BACKEND_API) {
      const userDetails = await getAPI(
        `${process.env.REACT_APP_BACKEND_API}/user`,
        { sub: userId }
      );
      if (userDetails.status === 200) {
        dispatch(getUserDetailsSuccess(userDetails.data));
      }
    }
  };
