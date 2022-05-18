// data model which will be stored to the database and represents one game
export class Game {
  id; // appid=123456
  name; // name="Metro"
  image; // imgData=['D%', '7Z', 'HJ', ')I', 'LK'...'M;'];
  imageUrl; // imageUrl=`https://cdn.akamai.steamstatic.com/steam/apps/${this.id}/header.jpg`
  playerHistory; // playerHistory=[{ date: "05.04.22", players: 122 }, { date: "04.04.22", players: 200 }, { date: "03.04.22", players: 150 }]
  // playerHistory is set to an empty array if is has been checked on steamcharts but returned no info on the player history.

  constructor(steamApp) {
    this.id = steamApp.appid;
    this.name = steamApp.name;
    this.imageUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${this.id}/header.jpg`
    // for games that need age verification - need to get link elsewhere possibly?
  }
}
