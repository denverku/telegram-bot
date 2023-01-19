const Telegraf = require('telegraf')

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
bot.hears('Test', (ctx) => {
    const res = fetch(
   // "https://api.themoviedb.org/3/movie/now_playing?api_key=680c99274ddab12ffac27271d9445d45&language=en&page=2"
   "https://api.themoviedb.org/3/search/movie?query=hugas&api_key=680c99274ddab12ffac27271d9445d45"
  );
  const data = res.json();
   console.log(data);
})

bot.hears('/', (ctx) => {
    ctx.reply(helpMessage);
})

bot.hears('/shutdown', (ctx) => {
    console.log(ctx.updateSubTypes[0].document.file_id);
})

bot.launch()
