const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const { Keyboard, Key } = require("telegram-keyboard");
const data = require("./const");

function randArray(array) {
  var rand = Math.floor(Math.random() * array.length) | 0;
  var rValue = array[rand];
  return rValue;
}

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.help((ctx) => {
  ctx.reply(data.commands);
  ctx.reply("Ты можешь выбрать разные действия с помощью кнопок.");
  ctx.replyWithPhoto({ source: `./photos/helper.jpg` });
});
bot.start(async (ctx) => {
  const keyboard = Keyboard.make([
    ["Комплиментики 🥰"],
    ["Фоточки 🥰", "Видосики 🥰"],
    ["Мои большие теплые слова, \nкоторые я тебе уже писал 🥰"],
    ["Помощь"],
    ["/start"],
  ]);

  await ctx.reply(`${randArray(data.greetings)}`, keyboard.reply());
  setTimeout(() => {
    ctx.reply("секундочку... 💅");
    setTimeout(() => {
      ctx.reply("Ты можешь выбрать разные действия с помощью кнопок.");
      ctx.replyWithPhoto({ source: `./photos/helper.jpg` });
    }, 2000);
  }, 1000);
});

bot.on("text", async (ctx) => {
  let text = ctx.message.text;

  if (text == "Комплиментики 🥰") {
    ctx.reply(randArray(data.compliments));
  } else if (text == "Фоточки 🥰") {
    let random = Math.floor(Math.random() * 10);
    await ctx.replyWithPhoto({ source: `./photos/${random}.jpg` });
    if (random == 8) {
      await ctx.reply(
        "Именно начиная с этой фотки я в тебя влюбился просто пздц😍❤️"
      );
    }
  } else if (text == "Помощь") {
    await ctx.reply(
      `Все еще находится в разроботке, \nбуду иногда что то новое добовлять. \nВсе (фоточки и видео) может повторятся, там просто работает все с рандомными числами.`
    );
    await ctx.reply(data.commands);
    await ctx.reply("Ты можешь выбрать разные действия с помощью кнопок.");
    await ctx.replyWithPhoto({ source: `./photos/helper.jpg` });
  } else if (
    text == "Мои большие теплые слова, \nкоторые я тебе уже писал 🥰"
  ) {
    await ctx.reply(randArray(data.bigTexts));
  } else if (text == "Видосики 🥰") {
    await ctx.reply("секундочку... 💅");
    let random = Math.floor(Math.random() * 11);
    ctx.replyWithVideo({ source: `./videos/${random}.mp4` });
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
