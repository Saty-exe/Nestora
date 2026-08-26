const complaintData = [
  {
    id: 1,

    tenantId: 101,
    tenantName: "Rahul Sharma",

    category: "Maintenance",

    title: "AC not working",

    description:
      "The AC in my room is not cooling properly and has been making unusual noise since yesterday.",

    photos: [
      "/complaints/ac-room-101.jpg",
      "/complaints/ac-panel-101.jpg",
    ],

    date: "2026-08-20",
    time: "21:30",

    priority: "High",

    status: "Pending",

    assignedTo: "Maintenance Team",

    resolution: "",

    resolvedAt: null,
  },

  {
    id: 2,

    tenantId: 102,
    tenantName: "Ankit Verma",

    category: "Cleaning",

    title: "Bathroom not cleaned",

    description:
      "The common bathroom on the second floor has not been cleaned properly for the last two days.",

    photos: [
      "/complaints/bathroom-2nd-floor.jpg",
    ],

    date: "2026-08-21",
    time: "09:15",

    priority: "Medium",

    status: "In Progress",

    assignedTo: "Cleaning Staff",

    resolution: "",

    resolvedAt: null,
  },

  {
    id: 3,

    tenantId: 103,
    tenantName: "Priya Singh",

    category: "Food",

    title: "Food quality issue",

    description:
      "The dinner served yesterday was too salty and the food was not served at the scheduled time.",

    photos: [
      "/complaints/dinner-food.jpg",
    ],

    date: "2026-08-21",
    time: "20:45",

    priority: "Medium",

    status: "Resolved",

    assignedTo: "Food Staff",

    resolution:
      "Kitchen staff was informed and the dinner preparation process was reviewed.",

    resolvedAt: "2026-08-22 10:30",
  },

  {
    id: 4,

    tenantId: 104,
    tenantName: "Arjun Mehta",

    category: "Electricity",

    title: "Power socket not working",

    description:
      "The power socket near the study table is not working. Other sockets in the room are working normally.",

    photos: [
      "/complaints/socket-room-104.jpg",
    ],

    date: "2026-08-22",
    time: "14:20",

    priority: "High",

    status: "Assigned",

    assignedTo: "Electrician",

    resolution: "",

    resolvedAt: null,
  },

  {
    id: 5,

    tenantId: 105,
    tenantName: "Neha Gupta",

    category: "Wi-Fi",

    title: "Wi-Fi connection unstable",

    description:
      "The Wi-Fi connection keeps disconnecting during the evening, especially between 7 PM and 10 PM.",

    photos: [],

    date: "2026-08-22",
    time: "22:10",

    priority: "Medium",

    status: "Pending",

    assignedTo: "",

    resolution: "",

    resolvedAt: null,
  },

  {
    id: 6,

    tenantId: 106,
    tenantName: "Vivek Kumar",

    category: "Security",

    title: "Visitor entry issue",

    description:
      "My visitor had to wait for a long time at the entrance because the entry verification process was delayed.",

    photos: [],

    date: "2026-08-23",
    time: "18:40",

    priority: "Low",

    status: "Resolved",

    assignedTo: "Security Supervisor",

    resolution:
      "Security staff was instructed to improve visitor verification during peak hours.",

    resolvedAt: "2026-08-23 20:00",
  },

  {
    id: 7,

    tenantId: 107,
    tenantName: "Sneha Patel",

    category: "Laundry",

    title: "Clothes delayed",

    description:
      "Laundry collected two days ago has still not been returned.",

    photos: [],

    date: "2026-08-23",
    time: "11:25",

    priority: "Medium",

    status: "In Progress",

    assignedTo: "Laundry Staff",

    resolution: "",

    resolvedAt: null,
  },

  {
    id: 8,

    tenantId: 108,
    tenantName: "Rohit Yadav",

    category: "Plumbing",

    title: "Water leakage",

    description:
      "There is water leakage underneath the bathroom sink and the floor is getting wet.",

    photos: [
      "/complaints/sink-leakage-108.jpg",
      "/complaints/bathroom-floor-108.jpg",
    ],

    date: "2026-08-24",
    time: "08:10",

    priority: "High",

    status: "Pending",

    assignedTo: "Plumber",

    resolution: "",

    resolvedAt: null,
  },

  {
    id: 9,

    tenantId: 109,
    tenantName: "Karan Malhotra",

    category: "Room",

    title: "Ceiling fan making noise",

    description:
      "The ceiling fan has started making a loud clicking noise while running.",

    photos: [
      "/complaints/fan-room-109.jpg",
    ],

    date: "2026-08-24",
    time: "16:35",

    priority: "Low",

    status: "Assigned",

    assignedTo: "Maintenance Team",

    resolution: "",

    resolvedAt: null,
  },

  {
    id: 10,

    tenantId: 110,
    tenantName: "Aman Singh",

    category: "Other",

    title: "Common area light issue",

    description:
      "One of the lights in the common area near the staircase is not working.",

    photos: [],

    date: "2026-08-24",
    time: "19:50",

    priority: "Low",

    status: "Pending",

    assignedTo: "",

    resolution: "",

    resolvedAt: null,
  },
];

export default complaintData;