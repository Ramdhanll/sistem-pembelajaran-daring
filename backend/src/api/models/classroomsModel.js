import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const bannerColors = [
   '#65EBE0',
   '#bcff57',
   '#9AE450',
   '#E0C0C9',
   '#E3E04B',
   '#D8CFB1',
   '#0ff54c',
   '#ff5757',
   '#ff7357',
   '#ffa057',
   '#ffbc57',
   '#ffe957',
   '#fff957',
   '#eeff57',
   '#95ff57',
   '#57ff7e',
   '#57ffa0',
   '#57ffc1',
   '#57f9ff',
   '#57d8ff',
   '#57b9ff',
   '#cea1ff',
   '#dca1ff',
   '#eca1ff',
   '#ffa1ef',
]

const classroomsSchema = mongoose.Schema({
   banner: {
      type: String,
      default: bannerColors[Math.floor(Math.random() * bannerColors.length)],
   },
   teacher: {
      type: ObjectId,
      ref: 'Teachers',
   },
   subject: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   classroom: {
      type: String,
      required: true,
   },
   school_year: {
      type: String,
      required: true,
   },
   code: {
      type: String,
      required: true,
   },
   silabus: {
      type: String,
   },
   day_schedule: {
      type: String,
      required: true,
   },
   from: {
      type: String,
      required: true,
   },
   to: {
      type: String,
      required: true,
   },
   members: [{ type: ObjectId, ref: 'Students', unique: true }],
   status: {
      type: String,
      default: 'Active',
      enum: ['Active', 'InActive'],
   },
   syllabus: {
      type: String,
   },
})

const Classrooms = mongoose.model('Classrooms', classroomsSchema)

export default Classrooms
