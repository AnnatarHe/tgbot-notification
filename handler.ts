const BOT_TOKEN = Deno.env.get("BOT_TOKEN");
const TG_CHAT_ID = Deno.env.get("TG_CHAT_ID");

export async function onTgCallbackHandler(request: Request) {
	// [{"id":0,"title":"Bad Blood: Secrets and Lies in a Silicon Valley Startup","content":"the reader called a photomultiplier","bookId":"30473907","pageAt":"27","dataId":"e75095e2cc9e31463dbba3fe4197d3a5f15b1c78675462353565a14a1f044e57","visible":true,"createdBy":2,"createdAt":"2019-02-19T19:32:33Z","updatedAt":"2021-08-25T21:07:10.9602076+08:00","seq":-1,"source":1}]
	const msg = await request.json();
	if (!msg || !Array.isArray(msg)) {
		return new Response("Data is invalid", {
			status: 400,
		});
	}

	const msgList = msg.map((x) =>
		`*${x.title.replaceAll("-", "")}*\n${x.content.replaceAll("-", "")}\n`
	);
	const title = `*Congrts*\\. got an update here ${msg.length}\\.\n\n\n`;

	const bot_url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
	const text = title + msgList.join("\n");
	const messageSend = JSON.stringify(
		{ "chat_id": TG_CHAT_ID, text, parse_mode: "MarkdownV2" },
	);
	try {
		return await fetch(bot_url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: messageSend,
		});
	} catch (error) {
		console.error(error);
		return new Response("Error when sending notification");
	}
}
