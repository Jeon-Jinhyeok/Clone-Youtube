import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos: videos });
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).exec();
  return res.render("watchVideo", {
    pageTitle: `Watching`,
    video: video,
  });
};

export const deleteVideo = (req, res) => {
  res.send("Delete Video");
};

export const search = (req, res) => {
  res.send("Search");
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).exec();
  return res.render("editVideo", { pageTitle: `Editing`, video: video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const newTitle = req.body.title;
  const updatedVideo = await Video.findByIdAndUpdate(id, { title: newTitle })
    .then(() => {
      return res.redirect(`videos/${id}`);
    })
    .catch((err) => {
      return;
    });
};

export const getUpload = (req, res) => {
  return res.render("uploadVideo", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;

  await Video.create({
    title: title,
    description: description,
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    createdAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  })
    .then(() => {
      return res.redirect("/", {});
    })
    .catch((err) => {
      return res.render("uploadVideo", {
        pageTitle: "Upload Video",
        error: err._message,
      });
    });
};
