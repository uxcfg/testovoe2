export default class Server {
  async fetchData(searchName) {
    const res = await fetch(
      `https://api.github.com/search/users?q=${searchName}`
    );
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    return await res.json();
  }

  getAvatar(name) {
    return this.fetchData(name);
  }
}
