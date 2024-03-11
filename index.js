const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Asia/Manila', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1216562877583069325')
    .setType('PLAYING')
    .setURL('https://www.twitch.tv/thirstymonster') //Must be a youtube video link 
    .setState('KIFFY')
    .setName('HAMUSTA')
    .setDetails(`HAMUSTA 👋⚓ [${formatTime()}]`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1060830136414519336/1180670570862485645/1_-KlOGKrl0EJsPWncAZ6FiQ.gif?ex=65f63ca7&is=65e3c7a7&hm=d9102f1cbd2ebda861df7f811a85467d423fb2eec09288d13dd8a63927d82f87&') //You can put links in tenor or discord and etc.

    .setAssetsSmallImage('https://cdn.discordapp.com/emojis/731154864360390726.gif?size=96&quality=lossless') //You can put links in tenor or discord and etc.

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `HAMUSTA 👋⚓ [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
