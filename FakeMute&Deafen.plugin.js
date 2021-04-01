//META{"name":"ExampleLibraryPlugin", "authorId":"575933571186032641", "invite":"TQ2dePQ", "website":"https://github.com/ali0sam"}*//
//import {DiscordModules as Modules} from "modules";
class ExampleLibraryPlugin {
  getName() {
    return "Fake Mute&Deafen";
  }
  getDescription() {
    return "Join voice channel, mute and deafen yourself, start and stop plugin, now you can Un-mute and Listen and speak!";
  }
  getVersion() {
    return "0.0.1";
  }
  getAuthor() {
    return "ali_s";
  }

  start() {
    var text = new TextDecoder("utf-8");
    var old_channel_id;

    WebSocket.prototype.original = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
      if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
        var textData = text.decode(data);
        console.log(textData);
        var channel_id = textData.substring(
          textData.lastIndexOf("channel_id") + 15,
          textData.lastIndexOf("channel_id") + 33
        );
        console.log(channel_id);
        if (old_channel_id === channel_id) {
          console.log("Found mute/deafen");
          data = data.replace('"self_mute":false', "NiceOneDiscord");
          console.log("Faked mute/deafen");
        } else {
          old_channel_id = channel_id;
        }
      }
      WebSocket.prototype.original.apply(this, [data]);
    };
  }

  stop() {
      WebSocket.prototype.send = WebSocket.prototype.original;
      WebSocket.prototype.original = null;
  }
}
