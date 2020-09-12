import actionType from '../constant/constant';

export function SaveResult(data) {
  return {
    type: actionType.SAVE_RESULT,
    data: data,
  };
}
