import { AnyAction } from "redux";
import { Dispatch } from "redux";

import { getAPI } from "../../httpClient/httpClient";
import { NotesA2OTransformService } from "../../services/NotesA2OTransform.service";
import { getUserNotesSuccess } from "../ActionCreators/notes.actionCreators";

export const getUserNotes =
  (userId: string) =>
  async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    const notesResponse = await getAPI(
      `${process.env.REACT_APP_BACKEND_API}/notepad/${userId}`
    );
    console.log(">>>> res", notesResponse);
    if (notesResponse.status === 200) {
      dispatch(
        getUserNotesSuccess(
          NotesA2OTransformService(JSON.parse(notesResponse.data))
        )
      );
    }
  };
