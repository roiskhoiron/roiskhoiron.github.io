import { motion } from "motion/react";
import { Youtube, Sparkles, Users, PlayCircle, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useMemo, useState } from "react";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { IframeDialog } from "./IframeDialog";
import imgCharacter1 from "../assets/hqdefault.png";
import imgCharacter2 from "../assets/hqdefault2.png";
import imgCharacter3 from "../assets/hqdefault3.png";

type CreatorVideo = {
  id: string;
  videoId: string;
  title: string;
  thumbnail: string;
};

type ChannelStats = {
  subscribers: string;
  videos: string;
  views: string;
};

type ChannelSummary = {
  id: string;
  title: string;
  uploadsPlaylistId: string;
  customUrl?: string;
  statistics?: {
    subscriberCount?: string;
    videoCount?: string;
    viewCount?: string;
  };
};

type YtChannelsResponse = {
  items?: Array<{
    id?: string;
    snippet?: { title?: string; customUrl?: string };
    statistics?: { subscriberCount?: string; videoCount?: string; viewCount?: string };
    contentDetails?: { relatedPlaylists?: { uploads?: string } };
  }>;
};

type YtSearchResponse = {
  items?: Array<{
    snippet?: { channelId?: string };
  }>;
};

type YtPlaylistResponse = {
  items?: Array<{
    id?: string;
    contentDetails?: { videoId?: string };
    snippet?: {
      title?: string;
      thumbnails?: {
        maxres?: { url?: string };
        high?: { url?: string };
        medium?: { url?: string };
        standard?: { url?: string };
        default?: { url?: string };
      };
    };
  }>;
};

const YT_API_BASE = "https://www.googleapis.com/youtube/v3";
const YT_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;
const YT_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID as string | undefined;
const YT_CHANNEL_HANDLE = (import.meta.env.VITE_YOUTUBE_CHANNEL_HANDLE as string | undefined) || "codingskuy";

const FALLBACK_CHANNEL_LINK = "https://www.youtube.com/@codingskuy/videos";

const FALLBACK_VIDEOS: CreatorVideo[] = [
  { id: "fallback-1", videoId: "s2OFRR2ZCPc", title: "CodingSkuy Video", thumbnail: imgCharacter1 },
  { id: "fallback-2", videoId: "M7lc1UVf-VE", title: "CodingSkuy Video", thumbnail: imgCharacter2 },
  { id: "fallback-3", videoId: "rfscVS0vtbw", title: "CodingSkuy Video", thumbnail: imgCharacter3 },
  { id: "fallback-4", videoId: "s2OFRR2ZCPc", title: "CodingSkuy Video", thumbnail: imgCharacter1 },
];

const copy: Record<Language, {
  sectionTitle: string;
  subtitle: string;
  description: string;
  subscribers: string;
  videos: string;
  views: string;
  joinText: string;
  subscribe: string;
  coverAlt: string;
  characterAlt: string;
  watchNow: string;
  loadingVideo: string;
  openInTab: string;
}> = {
  id: {
    sectionTitle: "CodingSkuy!",
    subtitle: "Belajar Ngoding Harus Seru!",
    description: "Channel YouTube edukasi yang membuat belajar pemrograman lebih menyenangkan dengan karakter lucu dan penjelasan yang mudah dipahami.",
    subscribers: "Subscriber",
    videos: "Video Tutorial",
    views: "Total Tayangan",
    joinText: "Gabung bersama ribuan developer yang belajar bersama CodingSkuy!",
    subscribe: "Subscribe ke Channel",
    coverAlt: "Channel YouTube CodingSkuy",
    characterAlt: "Karakter CodingSkuy",
    watchNow: "Tonton Sekarang",
    loadingVideo: "Memuat video...",
    openInTab: "Buka Tab",
  },
  en: {
    sectionTitle: "CodingSkuy!",
    subtitle: "Learning to Code Should Be Fun!",
    description: "An educational YouTube channel that makes learning programming more fun with cute characters and easy-to-understand explanations!",
    subscribers: "Subscribers",
    videos: "Tutorial Videos",
    views: "Total Views",
    joinText: "Join thousands of developers who learn with Coding Skuy!",
    subscribe: "Subscribe to Channel",
    coverAlt: "CodingSkuy YouTube Channel",
    characterAlt: "CodingSkuy Character",
    watchNow: "Watch Now",
    loadingVideo: "Loading video...",
    openInTab: "Open Tab",
  },
  zh: {
    sectionTitle: "CodingSkuy!",
    subtitle: "学编程也可以很有趣！",
    description: "一个教育向 YouTube 频道，用可爱角色和易懂讲解让编程学习更轻松。",
    subscribers: "订阅者",
    videos: "教程视频",
    views: "总播放量",
    joinText: "加入上千位在 CodingSkuy 学习的开发者！",
    subscribe: "订阅频道",
    coverAlt: "CodingSkuy YouTube 频道",
    characterAlt: "CodingSkuy 角色",
    watchNow: "立即观看",
    loadingVideo: "正在加载视频...",
    openInTab: "新标签打开",
  },
  ja: {
    sectionTitle: "CodingSkuy!",
    subtitle: "コーディング学習はもっと楽しく！",
    description: "かわいいキャラクターとわかりやすい解説で、プログラミング学習を楽しくする教育系YouTubeチャンネルです。",
    subscribers: "登録者",
    videos: "チュートリアル動画",
    views: "総再生数",
    joinText: "CodingSkuyで学ぶ何千人もの開発者の仲間に加わろう！",
    subscribe: "チャンネル登録",
    coverAlt: "CodingSkuy YouTubeチャンネル",
    characterAlt: "CodingSkuy キャラクター",
    watchNow: "今すぐ見る",
    loadingVideo: "動画を読み込み中...",
    openInTab: "新しいタブで開く",
  },
};

function toYouTubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function toYouTubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

function pickThumbnail(item: YtPlaylistResponse["items"][number], fallback: string) {
  const thumbs = item?.snippet?.thumbnails;
  return (
    thumbs?.maxres?.url ||
    thumbs?.high?.url ||
    thumbs?.standard?.url ||
    thumbs?.medium?.url ||
    thumbs?.default?.url ||
    fallback
  );
}

function localeByLanguage(language: Language) {
  if (language === "id") return "id-ID";
  if (language === "zh") return "zh-CN";
  if (language === "ja") return "ja-JP";
  return "en-US";
}

function formatCompactCount(value: string | undefined, language: Language) {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || number <= 0) return "0";

  return new Intl.NumberFormat(localeByLanguage(language), {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

async function ytFetch<T>(path: string, params: Record<string, string>) {
  if (!YT_API_KEY) throw new Error("Missing VITE_YOUTUBE_API_KEY");

  const url = new URL(`${YT_API_BASE}/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  url.searchParams.set("key", YT_API_KEY);

  const response = await fetch(url.toString(), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`YouTube API ${response.status}`);
  }

  return (await response.json()) as T;
}

function normalizeHandle(value: string) {
  return value.replace(/^@/, "").trim();
}

async function resolveChannelSummary(): Promise<ChannelSummary | null> {
  const byId = async () => {
    if (!YT_CHANNEL_ID) return null;
    const data = await ytFetch<YtChannelsResponse>("channels", {
      part: "snippet,statistics,contentDetails",
      id: YT_CHANNEL_ID,
      maxResults: "1",
    });
    return data.items?.[0] || null;
  };

  const byHandle = async () => {
    const handle = normalizeHandle(YT_CHANNEL_HANDLE);
    if (!handle) return null;

    const data = await ytFetch<YtChannelsResponse>("channels", {
      part: "snippet,statistics,contentDetails",
      forHandle: handle,
      maxResults: "1",
    });
    return data.items?.[0] || null;
  };

  const bySearch = async () => {
    const query = normalizeHandle(YT_CHANNEL_HANDLE) || "codingskuy";
    const found = await ytFetch<YtSearchResponse>("search", {
      part: "snippet",
      q: query,
      type: "channel",
      maxResults: "1",
    });

    const channelId = found.items?.[0]?.snippet?.channelId;
    if (!channelId) return null;

    const channel = await ytFetch<YtChannelsResponse>("channels", {
      part: "snippet,statistics,contentDetails",
      id: channelId,
      maxResults: "1",
    });

    return channel.items?.[0] || null;
  };

  const channel = (await byId()) || (await byHandle()) || (await bySearch());
  if (!channel?.id || !channel.contentDetails?.relatedPlaylists?.uploads) return null;

  return {
    id: channel.id,
    title: channel.snippet?.title || "CodingSkuy",
    uploadsPlaylistId: channel.contentDetails.relatedPlaylists.uploads,
    customUrl: channel.snippet?.customUrl,
    statistics: channel.statistics,
  };
}

async function fetchLatestVideos(uploadsPlaylistId: string): Promise<CreatorVideo[]> {
  const data = await ytFetch<YtPlaylistResponse>("playlistItems", {
    part: "snippet,contentDetails",
    playlistId: uploadsPlaylistId,
    maxResults: "8",
  });

  const fallbackImages = [imgCharacter1, imgCharacter2, imgCharacter3, imgCharacter1];

  return (data.items || [])
    .filter((item) => {
      const videoId = item.contentDetails?.videoId;
      const title = item.snippet?.title || "";
      return Boolean(videoId) && title !== "Private video" && title !== "Deleted video";
    })
    .map((item, index) => ({
      id: item.id || `yt-${index}`,
      videoId: item.contentDetails?.videoId || "",
      title: item.snippet?.title || "CodingSkuy Video",
      thumbnail: pickThumbnail(item, fallbackImages[index % fallbackImages.length]),
    }))
    .filter((item) => Boolean(item.videoId));
}

export function CreatorSection() {
  const { language } = useLanguage();
  const text = copy[language];

  const [videos, setVideos] = useState<CreatorVideo[]>(FALLBACK_VIDEOS);
  const [channelTitle, setChannelTitle] = useState("CodingSkuy");
  const [channelUrl, setChannelUrl] = useState(FALLBACK_CHANNEL_LINK);
  const [stats, setStats] = useState<ChannelStats>({
    subscribers: "10K+",
    videos: "100+",
    views: "50K+",
  });
  const [activeVideo, setActiveVideo] = useState<{ title: string; embedUrl: string; watchUrl: string } | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadYoutubeData = async () => {
      if (!YT_API_KEY) return;

      try {
        const channel = await resolveChannelSummary();
        if (!channel) return;

        const latestVideos = await fetchLatestVideos(channel.uploadsPlaylistId);
        if (!mounted) return;

        if (latestVideos.length > 0) {
          setVideos(latestVideos);
        }

        setChannelTitle(channel.title || "CodingSkuy");
        setChannelUrl(
          channel.customUrl
            ? `https://www.youtube.com/${channel.customUrl.startsWith("@") ? channel.customUrl : `@${channel.customUrl}`}/videos`
            : `https://www.youtube.com/channel/${channel.id}/videos`,
        );

        setStats({
          subscribers: formatCompactCount(channel.statistics?.subscriberCount, language),
          videos: formatCompactCount(channel.statistics?.videoCount, language),
          views: formatCompactCount(channel.statistics?.viewCount, language),
        });
      } catch {
        if (!mounted) return;
      }
    };

    loadYoutubeData();
    return () => {
      mounted = false;
    };
  }, [language]);

  const featuredVideo = videos[0] || FALLBACK_VIDEOS[0];

  const showcaseVideos = useMemo(() => {
    const fromLatest = videos.slice(1, 4);
    if (fromLatest.length === 3) return fromLatest;

    const needed = 3 - fromLatest.length;
    return [...fromLatest, ...FALLBACK_VIDEOS.slice(0, needed)];
  }, [videos]);

  return (
    <section id="content" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-cyan-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnpNNDQgNDR2Mi0yem0wLTMwdjItMnptLTIwLTIwdjItMnpNMiAydjItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-6"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Youtube className="w-12 h-12 text-red-500 mx-auto mb-4" />
          </motion.div>

          <h2 className="text-4xl sm:text-6xl text-white">{text.sectionTitle}</h2>

          <div className="space-y-3">
            <p className="text-xl sm:text-2xl text-cyan-200">{text.subtitle}</p>
          </div>

          <p className="text-slate-300 max-w-2xl mx-auto">
            {text.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <button
            type="button"
            className="w-full relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group cursor-pointer"
            onClick={() =>
              setActiveVideo({
                title: featuredVideo.title,
                embedUrl: toYouTubeEmbedUrl(featuredVideo.videoId),
                watchUrl: toYouTubeWatchUrl(featuredVideo.videoId),
              })
            }
          >
            <img
              src={featuredVideo.thumbnail}
              alt={text.coverAlt}
              className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl"
              >
                <PlayCircle className="w-16 h-16 text-white fill-current" />
              </motion.div>
            </div>

            <div className="absolute left-4 right-4 bottom-4 text-left">
              <p className="text-white text-sm sm:text-base line-clamp-2">{featuredVideo.title}</p>
            </div>

            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-8 left-8"
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              className="absolute top-8 right-8"
            >
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {showcaseVideos.map((video, index) => (
            <motion.button
              type="button"
              key={`${video.id}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative text-left"
              onClick={() =>
                setActiveVideo({
                  title: video.title,
                  embedUrl: toYouTubeEmbedUrl(video.videoId),
                  watchUrl: toYouTubeWatchUrl(video.videoId),
                })
              }
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:border-white/40 transition-colors h-full">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={video.thumbnail}
                    alt={`${text.characterAlt} ${index + 1}`}
                    className="w-full h-auto min-h-[180px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between gap-2">
                    <p className="text-sm text-white line-clamp-2 leading-snug">{video.title}</p>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/40 px-2 py-1 text-[11px] text-white shrink-0">
                      <PlayCircle className="w-3.5 h-3.5" />
                      {text.watchNow}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
          >
            <Users className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
            <p className="text-3xl text-white mb-1">{stats.subscribers}</p>
            <p className="text-slate-300">{text.subscribers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
          >
            <PlayCircle className="w-10 h-10 text-blue-300 mx-auto mb-3" />
            <p className="text-3xl text-white mb-1">{stats.videos}</p>
            <p className="text-slate-300">{text.videos}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
          >
            <TrendingUp className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <p className="text-3xl text-white mb-1">{stats.views}</p>
            <p className="text-slate-300">{text.views}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-white mb-6 text-lg">
            {text.joinText}
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white group"
            onClick={() => window.open(channelUrl, "_blank")}
          >
            <Youtube className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            {text.subscribe}
          </Button>
        </motion.div>
      </div>

      <IframeDialog
        open={Boolean(activeVideo)}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setActiveVideo(null);
        }}
        title={activeVideo?.title || ""}
        description={channelTitle}
        url={activeVideo?.embedUrl || "about:blank"}
        externalUrl={activeVideo?.watchUrl}
        openLabel={text.openInTab}
        loadingLabel={text.loadingVideo}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      />
    </section>
  );
}
