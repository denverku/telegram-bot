const Telegraf = require('telegraf')
const getJSON = require('get-json')
const https = require('https');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');
const app  = require('firebase/app');
const auth  = require('firebase/auth');
const config = {
    apiKey: "AIzaSyAcg30KKYSju6g9BhtvUKlXZJSHKh4lx6U",
    authDomain: "XXXXX",
    databaseURL: "https://ifirerat-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ifirerat",
    storageBucket: "tweetgo-main.appspot.com",
    messagingSenderId: "XXXXXX"
}

var defaultApp = app.initializeApp(config);
console.log(defaultApp.name);



const bot = new Telegraf('5721390328:AAEGgmLU--NgLl9DHFK0jKDGKJLUz6SqbWM')

bot.start((ctx) => ctx.reply("Hello world"))

const helpMessage = `\n/start - start bot\n/menu - list menu`;
bot.use((ctx, next) => {
  if(ctx.updateSubTypes[0] == "text"){
    console.log("[ @"+ctx.from.username+" ]  Mengeksekusi : "+ctx.message.text);
  }else if(ctx.updateSubTypes[0] == "document"){
      console.log(ctx.message.document.file_id);
      axios.get('https://api.telegram.org/bot5721390328:AAEGgmLU--NgLl9DHFK0jKDGKJLUz6SqbWM/getFile?file_id='+ctx.message.document.file_id)
    .then(res => {
         const result = res.data.result;
         ctx.reply("https://api.telegram.org/file/bot5721390328:AAEGgmLU--NgLl9DHFK0jKDGKJLUz6SqbWM/"+result.file_path);
    }).catch(e => {
         console.log(e);
   })
  }else{
    console.log("[ @"+ctx.from.username+" ]  Mengirim : "+ctx.updateSubTypes[0]);
  }
  
  next();
})

bot.command("start", ctx => {
    ctx.reply("Halo "+ctx.from.first_name);
    ctx.reply("Silahkan pilih menu dibawah ini...",
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Menu', callback_data: 'menu'},
                    { text: 'Profile', callback_data: 'profile'}
                ]
            ]
        }
    })
})
bot.command('delete', async (ctx) => {
    let i = 0;
    while(true) {
        try {
            await ctx.deleteMessage(ctx.message.message_id - i++);
        } catch(e) {
            break;
        }
    }
})
bot.hears('Ge', (ctx) => {
    https.get("https://www.google.com/index.html", function(res) {
    console.log(res.statusCode);
    res.setEncoding('utf8');
    res.on('data', function(data) {
        const dom = new JSDOM(data);
         
        ctx.reply(dom.window.document.querySelector("p"));
    });
}).on('error', function(err) {
    console.log(err);
});
})

bot.hears('Test', (ctx) => {
    getJSON('https://api.themoviedb.org/3/search/movie?query=hugas&api_key=680c99274ddab12ffac27271d9445d45', function(error, response){
    console.log(response);
    ctx.reply(response);
})
})

bot.hears('/', (ctx) => {
    ctx.reply(helpMessage);
})

bot.hears('/shutdown', (ctx) => {
    console.log(ctx.updateSubTypes[0].document.file_id);
})

const startBot = async () => { 
     try { 
         await bot.launch() 
         console.log('Bot started successfully') 
     } catch(error) { 
         console.error(error) 
     } 
 } 
  
 startBot()
