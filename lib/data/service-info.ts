export const serviceInfo = {
  schedule: {
    title: "Weekly Service Days & Times",
    description: "Join us for worship, prayer, and a message of hope.",
    times: [
      {
        day: "Saturday",
        times: [{ time: "10:30 AM – 12:15 PM", type: "Main Fellowship" }],
      },
      {
        day: "Tuesday",
        times: [{ time: "5:00 PM – 6:00 PM", type: "Bible Study Service" }],
      },
      {
        day: "Wednesday",
        times: [{ time: "6:00 PM – 7:00 PM", type: "Home Fellowship" }],
      },
      {
        day: "Thursday",
        times: [{ time: "11:00 AM – 12:00 PM", type: "Women's Fellowship" }],
      },
      {
        day: "Friday",
        times: [
          { time: "10:30 AM – 12:00 PM", type: "Fasting Prayer Fellowship" },
        ],
      },
    ],
    welcomeNote: {
      title: "All are welcome!",
      description:
        "Whether it's your first time or you've been with us for years, we'd love to see you.",
    },
  },
  location: {
    title: "Address & Map",
    name: "Siloam Raniban Church",
    address: "Sunrise height, Raniban, Nagarjun-1",
    directionsUrl: "https://maps.google.com/?q=123+Faith+Avenue+Riverston+CA",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.1684549112333!2d85.27905987552428!3d27.73495942427291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19007ae2a8ed%3A0x9a4a211ffa13ded6!2sSILOAM%20RANIBAN%20CHRUCH!5e1!3m2!1sen!2snp!4v1792747307487!5m2!1sen!2snp",
  },
  languages: {
    title: "Languages Used in Worship",
    description:
      "We offer services in multiple languages to make everyone feel at home.",
    list: ["Nepali"],
    note: "Interpretation services may be available upon request. Please contact us in advance.",
  },
  accessibility: {
    title: "Parking & Transport",
    items: [
      {
        icon: "parking",
        title: "Parking",
        description:
          "Free parking is available in our main lot and overflow lot",
      },
      {
        icon: "bus",
        title: "Public Transport",
        description: "Bus routes to Raniban Bus Station stop near the church.",
      },
    ],
  },
}
