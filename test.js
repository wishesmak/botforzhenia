bot.command("course", async (ctx) => {
  await ctx.replyWithHTML(
    "<b>Courses</b>",
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Redaktori", "btn_1"),
        Markup.button.callback("Redaktori2", "btn_2"),
        Markup.button.callback("Redaktori3", "btn_3"),
      ],
      [Markup.button.callback("RedaktoriB", "btn_4")],
    ])
  );
});

bot.action("btn_1", async (ctx) => {
  ctx.replyWithHTML("Heeey");
});

bot.on("text", (ctx) => ctx.reply(ctx.message.text));
