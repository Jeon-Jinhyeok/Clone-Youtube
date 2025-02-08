export const trending = (req, res) => {
  const videos = [
    {
      title: "First Video",
      ratings: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
    },
    {
      title: "Second Video",
      ratings: 3,
      comments: 1,
      createdAt: "1 hour ago",
      views: 11,
    },
    {
      title: "Third Video",
      ratings: 4,
      comments: 3,
      createdAt: "1 day ago",
      views: 23,
    },
  ];
  res.render("home", { pageTitle: "Home", videos });
};
export const watchVideo = (req, res) => {
  res.render("watchVideo", { pageTitle: "Watch" });
};

export const deleteVideo = (req, res) => {
  res.send("Delete Video");
};

export const search = (req, res) => {
  res.send("Search");
};

export const uploadVideo = (req, res) => res.send("Upload");
export const editVideo = (req, res) => res.send("Edit Video");
export const edit = (req, res) => res.send("Edit");
