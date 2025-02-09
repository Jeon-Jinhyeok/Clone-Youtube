let videos = [
  {
    title: "First Video",
    ratings: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    ratings: 3,
    comments: 1,
    createdAt: "1 hour ago",
    views: 11,
    id: 2,
  },
  {
    title: "Third Video",
    ratings: 4,
    comments: 3,
    createdAt: "1 day ago",
    views: 23,
    id: 3,
  },
];

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};
export const watchVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("watchVideo", {
    pageTitle: `Watching ${video.title}`,
    video: video,
  });
};

export const deleteVideo = (req, res) => {
  res.send("Delete Video");
};

export const search = (req, res) => {
  res.send("Search");
};

export const uploadVideo = (req, res) => res.send("Upload");

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("editVideo", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  const newTitle = req.body.title;

  video.title = newTitle;
  res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  res.render("uploadVideo", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;

  const video = {
    title: title,
    ratings: 0,
    comments: 0,
    createdAt: "1 miniutes ago",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(video);
  return res.redirect("/");
};
