export type NowPlayingAudioType = {
  title: string;
  description: string;
  id?: number;
  cid?: number;
};

export type NowPlayingAudioItem = {
  info?: NowPlayingAudioType;
  url: string;
  duration: number;
  currentTime?: number;
};
