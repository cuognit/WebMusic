module.exports.setActiveMenu = (req, res, next) => {
  // Lấy đường dẫn URL, ví dụ: /courses/edit/123
  const path = req.originalUrl;

  // Mặc định không có menu nào active
  res.locals.activeMenu = "";

  if (path === "/") {
    res.locals.activeMenu = "home";
  } else if (path.startsWith("/courses")) {
    // đều sẽ kích hoạt menu 'courses'
    res.locals.activeMenu = "courses";
  } else if (path.startsWith("/blog")) {
    res.locals.activeMenu = "blog";
  } else if (path.startsWith("/contact")) {
    res.locals.activeMenu = "contact";
  } else if (path.startsWith("/admin/dashboard")) { 
    res.locals.activeMenu = "dashboard";
  } else if (path.startsWith("/admin/songManage")) {
    res.locals.activeMenu = "songManage";
  } else if (path.startsWith("/admin/artistManage")) {
    res.locals.activeMenu = "artistManage";
  } else if (path.startsWith("/admin/settings")) {
    res.locals.activeMenu = "settings";
  } else if (path.startsWith("/admin/trashManage")) {
    res.locals.activeMenu = "settings";
  }

  // Thêm các menu khác nếu cần

  next(); // Chuyển sang middleware hoặc controller tiếp theo
};
