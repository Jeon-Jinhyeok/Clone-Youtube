import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos: videos });
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).exec();

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }

  return res.render("watchVideo", {
    pageTitle: `Watching`,
    video: video,
  });
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    });
  }

  return res.render("searchVideo", { pageTitle: "Search Video", videos });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).exec();

  if (!video) {
    return res.render("404", "Video not found");
  }
  return res.render("editVideo", {
    pageTitle: `Editing ${video.title}`,
    video: video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  const video = await Video.exists({ _id: id });

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("uploadVideo", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;

  await Video.create({
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
    createdAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  })
    .then(() => {
      return res.redirect("/");
    })
    .catch((err) => {
      return res.render("uploadVideo", {
        pageTitle: "Upload Video",
        error: err._message,
      });
    });
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
