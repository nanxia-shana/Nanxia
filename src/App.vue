<template>
  <a-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component" @contextmenu.stop="rightClick" />
    </router-view>
  </a-config-provider>
  <audio v-show="false" ref="audioPlayerRef" controls @play="musicPlaying" @pause="musicPause" @timeupdate="musicTimeupdate">
    <source :src="musicUrl" type="audio/mpeg" />
    <source :src="musicUrl" type="audio/flac" />
  </audio>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, provide, getCurrentInstance } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";
import jaJP from "ant-design-vue/es/locale/ja_JP";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
const instance: any = getCurrentInstance();
const store = useGlobalStore();
const { language, music } = storeToRefs(store);
dayjs.locale("zh-cn");
const locale = ref(zhCN);

const audioPlayerRef = ref<HTMLAudioElement>();
const musicId = ref<number>(music.value.id);
const musicUrl = ref<string>(music.value.url);
const musicImgUrl = ref<string>(music.value.imgUrl);
const musicName = ref<string>(music.value.name);
const musicAuthor = ref<string>(music.value.author);
const musicLyric = ref<string>(music.value.lyric);
const musicTlyric = ref<string>(music.value.tlyric);
const musicDuration = ref<number>(0);
const musicCurTime = ref<number>(0);
const musicIsPlay = ref<boolean>(false);
provide("musicId", musicId);
provide("musicImgUrl", musicImgUrl);
provide("musicName", musicName);
provide("musicAuthor", musicAuthor);
provide("musicLyric", musicLyric);
provide("musicTlyric", musicTlyric);
provide("musicDuration", musicDuration);
provide("musicCurTime", musicCurTime);
provide("musicIsPlay", musicIsPlay);
provide("audioPlayerRef", audioPlayerRef);
onMounted(() => {
  audioPlayerRef.value.preload = "none";
  // instance.proxy.$request
  //   .get("/user/getMusicList", {
  //     currentPage: 0,
  //     pageSize: 5,
  //   })
  //   .then((res: any) => {
  //     console.log(res);
  //     // store.loadingMusic(res.data);
  //     // store.musicLoadMsg(res.data[1]);
  //   });
  // instance.proxy.$request
  // .post("/user/addUser", {
  //   userName: "甘雨",
  //   password: 'ganyu',
  // })
  // .then((res: any) => {
  //   console.log(res);
  // });

  store.loadingMusic([
    {
      id: 1,
      url: "https://nanxia-1309728409.cos.ap-chongqing.myqcloud.com/Shana/audio/II.%20Largo%20appassionato.mp3",
      imgUrl: "file05.jpeg",
      name: "II. Largo appassionato",
      author: "Ludwig van Beethoven",
      lyric: "[00:00.00] 纯音乐，暂无歌词\\n",
      tlyric: null,
    },
    {
      id: 2,
      url: "https://nanxia-1309728409.cos.ap-chongqing.myqcloud.com/Shana/audio/%E5%B7%9D%E7%94%B0%E3%81%BE%E3%81%BF%20-%20%E5%85%89%E8%8A%92.mp3",
      imgUrl: "guangmang.png",
      name: "光芒",
      author: "川田まみ",
      lyric:
        "[00:16.900]\\n[00:21.920]少し笑って街を眺めた〖带着笑容眺望街道〗\\n[00:26.250]遥か記憶〖久远的记忆〗\\n[00:31.850]風に吹かれて  髪が微かに頬を撫でる〖随风飘逸的发丝  微微轻抚脸颊〗\\n[00:40.970]\\n[00:41.920]遠回りして手に入てたのは  一つの鍵〖绕了那么多远路得到的是  一条钥匙〗\\n[00:51.870]痛みは強さ  時間は思い出に変わる時〖痛楚即是坚强  当光阴化作回忆之时〗\\n[01:01.940]扉を開けた〖就打开门扉〗\\n[01:05.550]\\n[01:07.170]shine  朝日がさす  僕が見ているのは未来〖shine  朝阳洒落  我注视着的是未来〗\\n[01:16.930]fine  手を差し出す君は  僕を照らす光〖fine  伸出双手的你  是照耀我的光芒〗\\n[01:27.580]\\n[01:46.900]雨に打たれた冷えた体で寄せ合った夢〖任雨拍打  冰冷的身体梦中相互依偎〗\\n[01:56.650]夢見る事も過ちのような気がした宵〖感觉连做梦也是一种罪的夜晚〗\\n[02:06.790]僕らに夜明け〖为我们迎来黎明〗\\n[02:10.320]\\n[02:12.180]rise  朝日昇る  伏せた目をもう一度上げて〖rise  朝阳缓升  再次睁开闭合的双眼〗\\n[02:22.130]eyes  瞳映す  君の核心を見つめたい〖eyes  眼睛渐亮  想望见你的人〗\\n[02:32.100]shine  朝日がさす  僕が見ているのは未来〖shine  朝阳洒落  我注视着的是未来〗\\n[02:42.210]fine  手を差し出す君は  僕を照らす光〖fine  伸出双手的你  是照耀我的光芒〗\\n[02:51.480]\\n[02:52.230]「一人きり」そう言い捨て困らせた〖「自己一人」这句话令你十分为难〗\\n[03:01.140]この両手に余るほど抱えて〖其实想用这双手狠狠抱住你〗\\n[03:10.600]\\n[03:17.230]flight  旅立つ朝  あの日背伸びしてた肩に〖flight  启程之晨  在你那天逞强的肩膀上〗\\n[03:27.010]bright  小さな手を掛けて  同じ空見上げた〖bright  搭上我的小手  一起仰望同一片天空〗\\n[03:36.760]\\n[03:37.330]shine  朝日がさす  僕が見ているのは未来〖shine  朝阳洒落  我注视着的是未来〗\\n[03:47.110]fine  手を差し出す君は  僕を照らす光〖fine  伸出双手的你  是照耀我的光芒〗\\n[03:57.010]ray  君と歩く光  ray  この想いを歌おう〖ray  与你同行的光芒  ray  让我歌颂这份情感〗\\n[04:16.030]\\n[04:17.010]la lalalalalala lalala~\\n",
      tlyric: "",
    },
    {
      id: 3,
      // url: "/src/assets/audios/コツキミヤ - mirage.flac",
      url: "https://nanxia-1309728409.cos.ap-chongqing.myqcloud.com/Shana/audio/%E3%82%B3%E3%83%84%E3%82%AD%E3%83%9F%E3%83%A4%20-%20mirage.flac",
      imgUrl: "コツキミヤ.jpg",
      name: "コツキミヤ",
      author: "mirage",
      lyric:
        "[00:00.00] 作词 : 西田圭稀\\n[00:00.20] 作曲 : 西田圭稀\\n[00:00.41]時間から背けた目を\\n[00:03.60]今あなたと合わせ 笑っていたいの\\n[00:34.36]移りゆく季節はただ\\n[00:39.10]私を置いて行く\\n[00:44.32]いつだってこのまま\\n[00:47.00]これからも\\n[00:49.52]眺めるだけの時を過ごすの\\n[00:55.06]流れゆく時間はただ\\n[00:59.95]あなたを連れて行く\\n[01:05.06]いつもよりおめかし\\n[01:07.81]新しい服を着ても\\n[01:10.45]鏡に映る姿は変わらない\\n[01:17.82]普通の女の子じゃないからよね\\n[01:25.09]あなたが変わろうとも\\n[01:28.66]私はこのままでいい\\n[01:31.49]永遠に そう\\n[01:35.72]あぁでもなぜかしら\\n[01:38.57]何一つ変われないのに\\n[01:41.34]不思議な夢のような心地だわ\\n[01:45.36]嬉しいの？\\n[01:47.11]溶け出した氷の雫の中\\n[01:51.46]映るのは 誰？\\n[01:56.36]あぁでもなぜかしら\\n[01:59.48]あなたといればいるほど\\n[02:02.13]少しだけ背伸びしたくなるの\\n[02:06.18]おかしいな\\n[02:08.05]時間から背けた目を\\n[02:11.39]今あなたと合わせ 笑っていたいの\\n[02:21.40]不意に見せる笑顔はただ\\n[02:26.06]暖かな花を咲かせ\\n[02:31.25]僅かに感じた心地好さも\\n[02:36.38]何かを遂げたかのように\\n[02:41.09]溢れていく\\n[02:43.59]砂浜 足を取られて 上手く進めず\\n[02:51.17]伸ばした手が\\n[02:53.72]あなたの背中触れる前に\\n[02:57.51]消える そっと\\n[03:01.65]あぁまたなぜかしら\\n[03:04.64]何もかも手に入るのに\\n[03:07.32]満たされないこの心の裏\\n[03:11.39]哀しいの？\\n[03:13.29]降り出した氷雨の水溜りに\\n[03:17.43]映るのは 誰？\\n[03:23.36]変われないことも\\n[03:24.98]変わりたくないこともそのまま\\n[03:28.25]同じ時を過ごす それでいいの\\n[03:35.31]だけど足元に\\n[03:37.61]散りばめられたこの棘は 私？\\n[03:46.20]なぜかしら\\n[03:47.68]何一つ変われないのに\\n[03:50.34]不思議な夢のような心地だわ\\n[03:54.38]嬉しいの？\\n[03:56.25]溶け出した氷の雫の中\\n[04:00.29]映るのは 誰？\\n[04:05.60]あぁでもなぜかしら\\n[04:08.56]あなたといればいるほど\\n[04:11.19]少しだけ背伸びしたくなるの\\n[04:15.31]おかしいな\\n[04:17.13]時間から背けた目を\\n[04:20.23]今あなたと合わせ 笑っていたいの\\n[04:51.50]移りゆく季節はただ\\n[04:55.94]私を置いて行く\\n[05:01.26]いつまでもこのまま 暖かな想い\\n[05:09.21]消えないように\\n",
      tlyric:
        "[00:00.41]收回那凝望着流逝光阴的目光\\n[00:03.60]如今的我 多么想能与你相视而笑\\n[00:34.36]四季流转 但是\\n[00:39.10]只有我被停留在原地徘徊\\n[00:44.32]无论何时都像是这般\\n[00:47.00]从今往后的日夜\\n[00:49.52]也将是在沉浸于往日中度过吗\\n[00:55.06]时光荏苒 只是\\n[00:59.95]仅仅将你一人带向了明日\\n[01:05.06]即便比往常打扮得更加耀眼\\n[01:07.81]换上新衣也好\\n[01:10.45]镜中所照映的身影并无丝毫改变\\n[01:17.82]因为我可不是普通的女孩子呀\\n[01:25.09]即便你已经不同于往昔\\n[01:28.66]我只要一直这样下去就好\\n[01:31.49]是啊 永远地\\n[01:35.72]啊啊 但是为什么呀\\n[01:38.57]明明什么都无法改变\\n[01:41.34]但这心情却犹如不可思议的梦一般\\n[01:45.36]如此喜悦呢\\n[01:47.11]融化的冰的水珠所映现的那个身影\\n[01:51.46]又是谁呢\\n[01:56.36]啊啊 但是为什么呢\\n[01:59.48]越是陪伴在你身边\\n[02:02.13]就越是有些变得想要逞强了呢\\n[02:06.18]好奇怪呀\\n[02:08.05]收回那凝望着流逝光阴的目光\\n[02:11.39]如今的我 多么想能与你相视而笑\\n[02:21.40]不经意间你所展现的笑容\\n[02:26.06]犹如让花儿绽放般温暖\\n[02:31.25]微微感受到的欣愉\\n[02:36.38]像是愿望实现一般地\\n[02:41.09]在心中满溢着\\n[02:43.59]在海滨的沙滩上 双足被阻挡 无法前行时\\n[02:51.17]那伸出的手\\n[02:53.72]指尖在触及你的背影之前\\n[02:57.51]你却悄悄地离开了 不留声响\\n[03:01.65]啊啊 但是为什么呀\\n[03:04.64]明明无论什么我都可以得到的\\n[03:07.32]但这颗无法被满足的心的深处\\n[03:11.39]却如此悲伤呢\\n[03:13.29]突然降临的冷雨 那水洼中所照映的身影\\n[03:17.43]又是谁呢\\n[03:23.36]无法改变之物也好\\n[03:24.98]不想改变之物也好 都像那样\\n[03:28.25]一同在时光中消逝 这样就好了吗\\n[03:35.31]可是这脚下\\n[03:37.61]零乱四散的花儿 是我吗？\\n[03:46.20]为什么呀\\n[03:47.68]明明什么都无法改变\\n[03:50.34]但这心情却犹如不可思议的梦一般\\n[03:54.38]如此喜悦呢\\n[03:56.25]融化的冰的水珠所映现的那个身影\\n[04:00.29]究竟是谁呢\\n[04:05.60]啊啊 但是为什么呢\\n[04:08.56]越是陪伴在你身边\\n[04:11.19]就越是有些变得想要逞强了呢\\n[04:15.31]好奇怪呀\\n[04:17.13]收回那凝望着流逝光阴的目光\\n[04:20.23]如今的我 多么想能与你相视而笑\\n[04:51.50]季节交替\\n[04:55.94]只有我被时光抛下 在此处等待\\n[05:01.26]无论岁月变迁 我会就这样 将这温暖的回忆\\n[05:09.21]紧紧怀抱 不愿抹去你的痕迹\\n",
    },
  ]);
  store.musicLoadMsg({
    id: 2,
    url: "https://nanxia-1309728409.cos.ap-chongqing.myqcloud.com/Shana/audio/%E5%B7%9D%E7%94%B0%E3%81%BE%E3%81%BF%20-%20%E5%85%89%E8%8A%92.mp3",
    imgUrl: "guangmang.png",
    name: "光芒",
    author: "川田まみ",
    lyric:
      "[00:16.900]\\n[00:21.920]少し笑って街を眺めた〖带着笑容眺望街道〗\\n[00:26.250]遥か記憶〖久远的记忆〗\\n[00:31.850]風に吹かれて  髪が微かに頬を撫でる〖随风飘逸的发丝  微微轻抚脸颊〗\\n[00:40.970]\\n[00:41.920]遠回りして手に入てたのは  一つの鍵〖绕了那么多远路得到的是  一条钥匙〗\\n[00:51.870]痛みは強さ  時間は思い出に変わる時〖痛楚即是坚强  当光阴化作回忆之时〗\\n[01:01.940]扉を開けた〖就打开门扉〗\\n[01:05.550]\\n[01:07.170]shine  朝日がさす  僕が見ているのは未来〖shine  朝阳洒落  我注视着的是未来〗\\n[01:16.930]fine  手を差し出す君は  僕を照らす光〖fine  伸出双手的你  是照耀我的光芒〗\\n[01:27.580]\\n[01:46.900]雨に打たれた冷えた体で寄せ合った夢〖任雨拍打  冰冷的身体梦中相互依偎〗\\n[01:56.650]夢見る事も過ちのような気がした宵〖感觉连做梦也是一种罪的夜晚〗\\n[02:06.790]僕らに夜明け〖为我们迎来黎明〗\\n[02:10.320]\\n[02:12.180]rise  朝日昇る  伏せた目をもう一度上げて〖rise  朝阳缓升  再次睁开闭合的双眼〗\\n[02:22.130]eyes  瞳映す  君の核心を見つめたい〖eyes  眼睛渐亮  想望见你的人〗\\n[02:32.100]shine  朝日がさす  僕が見ているのは未来〖shine  朝阳洒落  我注视着的是未来〗\\n[02:42.210]fine  手を差し出す君は  僕を照らす光〖fine  伸出双手的你  是照耀我的光芒〗\\n[02:51.480]\\n[02:52.230]「一人きり」そう言い捨て困らせた〖「自己一人」这句话令你十分为难〗\\n[03:01.140]この両手に余るほど抱えて〖其实想用这双手狠狠抱住你〗\\n[03:10.600]\\n[03:17.230]flight  旅立つ朝  あの日背伸びしてた肩に〖flight  启程之晨  在你那天逞强的肩膀上〗\\n[03:27.010]bright  小さな手を掛けて  同じ空見上げた〖bright  搭上我的小手  一起仰望同一片天空〗\\n[03:36.760]\\n[03:37.330]shine  朝日がさす  僕が見ているのは未来〖shine  朝阳洒落  我注视着的是未来〗\\n[03:47.110]fine  手を差し出す君は  僕を照らす光〖fine  伸出双手的你  是照耀我的光芒〗\\n[03:57.010]ray  君と歩く光  ray  この想いを歌おう〖ray  与你同行的光芒  ray  让我歌颂这份情感〗\\n[04:16.030]\\n[04:17.010]la lalalalalala lalala~\\n",
    tlyric: "",
  });
  store.switchLang(localStorage.getItem("Shana-locale") ? localStorage.getItem("Shana-locale") : "zh_CN");
  store.switchTheme(localStorage.getItem("Shana-theme") ? localStorage.getItem("Shana-theme") : "violet");
  store.switchMode(localStorage.getItem("Shana-mode") ? localStorage.getItem("Shana-mode") : "light");
});
watch(language, (val: string) => {
  locale.value = val == "zh_CN" ? zhCN : val == "en_US" ? enUS : jaJP;
});
watch(
  () => music.value,
  (val: any) => {
    musicId.value = val.id;
    musicUrl.value = val.url;
    musicImgUrl.value = val.imgUrl;
    musicName.value = val.name;
    musicAuthor.value = val.author;
    musicLyric.value = val.lyric;
    musicTlyric.value = val.tlyric;
    audioPlayerRef.value.src = val.url;
  },
  {
    deep: true,
  },
);
const rightClick = (e) => {
  console.log(e);
};
const musicPlaying = () => {
  musicDuration.value = audioPlayerRef.value.duration;
  musicIsPlay.value = true;
  console.log("paly");
};
const musicPause = () => {
  musicIsPlay.value = false;
  console.log("pause");
};
const musicTimeupdate = (e: any) => {
  musicCurTime.value = Math.floor(e.srcElement.currentTime);
};
</script>
<style>
#app {
  min-width: 1200px;
  min-height: 800px;
  height: 100vh;
}
* {
  transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0s,
    background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.buttonP:hover,
.buttonP:focus {
  color: #fff !important;
}
:root {
  --animate-duration: 0.3s;
  --animate-delay: 0s;
}
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
