import Video from "../models/Video"

export const home = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { pageTitle: "Home", videos:videos});
};
export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).exec();
  res.render("watchVideo", {
    pageTitle: `Watching`,
    video: video
  });
};

export const deleteVideo = (req, res) => {
  res.send("Delete Video");
};

export const search = (req, res) => {
  res.send("Search");
};

export const uploadVideo = (req, res) => res.send("Upload");

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).exec();
  res.render("editVideo", { pageTitle: `Editing`, video:video});
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const newTitle = req.body.title;
  res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  res.render("uploadVideo", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title } = req.body;
  const video = await Video.create({
    title: title,
  })
  return res.redirect("/");
};
