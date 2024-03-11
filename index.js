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
    .setAssetsLargeImage('https://media.discordapp.net/attachments/740833438352932920/1216583853481660446/hamster-kiss.png?ex=6600eb01&is=65ee7601&hm=07f10929fe7873d914f164783cdf7e3629b0bb9b3883d10b7c6d9bc03de6636d&=&format=webp&quality=lossless') //You can put links in tenor or discord and etc.

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
