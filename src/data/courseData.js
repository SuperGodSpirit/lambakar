export const courseData = {
  freePreview: {
    id: 0,
    title: "Free Preview: Is This Course For You?",
    lessons: [
      { id: "free-1", title: "Introduction to Lambakar", videoId: "-vl7fZPIumc", duration: "1:00" },
      { id: "free-2", title: "Why Most Height Advice is Fake", videoId: "XqVqLrLF2NE", duration: "1:00" },
      { id: "free-3", title: "The Science of Micro-Fractures", videoId: "BChZ9dhbwpM", duration: "1:00" },
      { id: "free-4", title: "Can You Still Grow After 18?", videoId: "kvakBgTVSec", duration: "1:00" },
    ]
  },
  modules: [
    {
      id: 1,
      title: "Module 01: Height का असली Science",
      lessons: Array.from({ length: 5 }).map((_, i) => ({
        id: `m1-l${i + 1}`,
        title: `Lesson ${i + 1}: Biology & HGH Fundamentals`,
        videoId: "QDia3e12czc",
        duration: "9:00"
      }))
    },
    {
      id: 2,
      title: "Module 02: Posture Fix",
      lessons: Array.from({ length: 7 }).map((_, i) => ({
        id: `m2-l${i + 1}`,
        title: `Lesson ${i + 1}: Spine Decompression Techniques`,
        videoId: "QDia3e12czc",
        duration: "8:30"
      }))
    },
    {
      id: 3,
      title: "Module 03: Stretching & Decompression",
      lessons: Array.from({ length: 8 }).map((_, i) => ({
        id: `m3-l${i + 1}`,
        title: `Lesson ${i + 1}: Advanced Leg Stretches`,
        videoId: "QDia3e12czc",
        duration: "11:15"
      }))
    },
    {
      id: 4,
      title: "Module 04: Sleep Protocol",
      lessons: Array.from({ length: 5 }).map((_, i) => ({
        id: `m4-l${i + 1}`,
        title: `Lesson ${i + 1}: Deep Sleep Optimization`,
        videoId: "QDia3e12czc",
        duration: "8:00"
      }))
    },
    {
      id: 5,
      title: "Module 05: Diet & Nutrition Blueprint",
      lessons: Array.from({ length: 6 }).map((_, i) => ({
        id: `m5-l${i + 1}`,
        title: `Lesson ${i + 1}: Macro and Micro Nutrients`,
        videoId: "QDia3e12czc",
        duration: "9:10"
      }))
    },
    {
      id: 6,
      title: "Module 06: Exercise & Sports",
      lessons: Array.from({ length: 7 }).map((_, i) => ({
        id: `m6-l${i + 1}`,
        title: `Lesson ${i + 1}: High-Impact Micro-Fractures`,
        videoId: "QDia3e12czc",
        duration: "10:45"
      }))
    },
    {
      id: 7,
      title: "Module 07: 100-Day Master Action Plan",
      lessons: Array.from({ length: 4 }).map((_, i) => ({
        id: `m7-l${i + 1}`,
        title: `Lesson ${i + 1}: Daily Tracker & Discipline`,
        videoId: "QDia3e12czc",
        duration: "7:30"
      }))
    }
  ]
};
