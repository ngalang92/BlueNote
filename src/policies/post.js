const ApplicationPolicy = require("./application");
 module.exports = class PostPolicy extends ApplicationPolicy {
   new() {
    return (this._isAdmin() || this._isMember());
  }
   create() {
    return (this._isAdmin() || this._isMember());
  }
   edit() {
    return ( this._isMember() || this._isAdmin());
  }
   update() {
    return this.edit();
  }
   destroy() {
    return (this._isMember() || this._isAdmin());
  }
 }
