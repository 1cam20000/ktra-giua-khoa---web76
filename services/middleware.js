const checkLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log("🚀 ~ checkLoggedIn ~ :");

    next();
  } else {
    res.send("no login");
  }
};

export { checkLoggedIn };
