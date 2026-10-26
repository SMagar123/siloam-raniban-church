export const mediaPageInfo = {
  hero: {
    tag: "Media Gallery",
    title: "Moments at Siloam",
    description:
      "Explore photos and videos from our worship services, community outreach, and special events.",
  },
  mediaItems: [
    // --- PHOTOS ---
    {
      id: "p1",
      type: "photo",
      src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop",
      alt: "Worship team leading songs",
      span: "md:col-span-1 md:row-span-2", // Tall photo
    },
    {
      id: "p2",
      type: "photo",
      src: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1000&auto=format&fit=crop",
      alt: "Congregation praying",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "p3",
      type: "photo",
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
      alt: "Church gathering",
      span: "md:col-span-1 md:row-span-1",
    },
    // --- VIDEOS ---
    {
      id: "v1",
      type: "video",
      title: "Sunday Worship Recap",
      date: "July 20, 2024",
      src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop", // Thumbnail
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      span: "md:col-span-2 md:row-span-1", // Wide video
    },
    {
      id: "p4",
      type: "photo",
      src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
      alt: "Microphone on stage",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "p5",
      type: "photo",
      src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1000&auto=format&fit=crop",
      alt: "Community fellowship",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "v2",
      type: "video",
      title: "Youth Camp Highlights",
      date: "June 15, 2024",
      src: "https://images.unsplash.com/photo-1523580494112-071d4576651b?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "p6",
      type: "photo",
      src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1000&auto=format&fit=crop",
      alt: "Bible study group",
      span: "md:col-span-1 md:row-span-1",
    },
  ],
}
