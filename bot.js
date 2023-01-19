const Telegraf = require('telegraf')
const getJSON = require('get-json')
const bot = new Telegraf('5721390328:AAEGgmLU--NgLl9DHFK0jKDGKJLUz6SqbWM')

const helpMessage = `\n/start - start bot\n/menu - list menu`;
bot.use((ctx, next) => {
  if(ctx.updateSubTypes[0] == "text"){
    console.log("[ @"+ctx.from.username+" ]  Mengeksekusi : "+ctx.message.text);
  }else if(ctx.updateSubTypes[0] == "document"){
      console.log(ctx.message.document.file_id);
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
    fetch('https://www.google.com')
    .then(resp=> resp.text()).then(body => console.log(body)) ; 
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

bot.launch()
