const slugify = require("slugify");

exports.slug = (value) => {
  return (slug = slugify(value, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: false,
    locale: "vi",
    trim: true,
  }));
};
