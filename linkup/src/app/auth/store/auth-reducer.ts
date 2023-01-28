export interface State {
  user: any;
}

const initialState: State = {
  user: null
};

export function authReducer(state = initialState, action: any) {
  return state;
}
