import actionType from '../constant/constant';

export function saveAdmin(name, email) {
  return {
    type: actionType.ADD_ADMIN,
    name: name,
    email: email,
  };
}
