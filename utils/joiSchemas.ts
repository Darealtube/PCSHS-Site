import Joi from "joi";

export const EventSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().max(50).min(1),
  description: Joi.string().max(400).min(1),
  day: Joi.number().min(1).max(31),
  month: Joi.number().min(1).max(12),
  year: Joi.number(),
});

export const AnnouncementSchema = Joi.object({
  id: Joi.string(),
  header: Joi.string().min(1).max(150),
  body: Joi.string().min(1).max(1500),
  footer: Joi.string().min(1).max(800),
  image: Joi.array().items(Joi.string()),
  video: Joi.string(),
  authorName: Joi.string().min(1).max(40),
  type: Joi.string().valid(
    "Apply Announcement",
    "SSG Announcement",
    "School Announcement"
  ),
});
