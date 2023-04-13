/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.bio = null;
    this.totalscore = null;
    this.placing = null;
    Object.assign(this, data);
  }
}
export default User;
