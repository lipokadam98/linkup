import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {UserService} from "../../services/user-services/user.service";

/**Effects are listening to actions being dispatched and can make async calls towards backend services.
 *They way we can react to actions is because we need to inject the Actions into our constructor,
 * after that we will have the stream of actions and can differentiate between action types
 */
@Injectable()
export class UserEffects{

  constructor(
              private _store: Store<AppState>,
              private _userService: UserService) {
  }

}


