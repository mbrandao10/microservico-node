export const validateTypeOfFile = (url?: unknown | string): boolean => {
  if (!url || typeof url !== "string") return false;

  if (
    /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp|\.tiff|\.svg|\.mp4|\.avi|\.mkv|\.mov|\.wmv|\.mp3|\.wav|\.ogg|\.webm|\.mpeg)$/i.test(
      url
    )
  ) {
    return true;
  }
  return false;
};

export const getTypeUrl = (url: string | unknown) => {
  if (!url || typeof url !== "string") {
    return "unknow";
  }

  if (validateTypeOfFile(url)) {
    const testImage = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp|\.tiff|\.svg)$/i;

    const testVideo = /(\.mp4|\.avi|\.mkv|\.mov|\.wmv|\.webm)$/i;

    const testAudio = /(\.mp3|\.wav|\.ogg|\.mpeg)$/i;

    if (testImage.test(url)) {
      return "image";
    }

    if (testVideo.test(url)) {
      return "video";
    }

    if (testAudio.test(url)) {
      return "audio";
    }
  }

  return "ivalid";
};
