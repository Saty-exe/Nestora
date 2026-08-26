const tenantData = [
  {
    id: 1,
    name: "Aarav Sharma",
    age: 21,
    gender: "Male",
    phone: "9876543210",
    email: "aarav.sharma@example.com",

    avatar: "https://i.pravatar.cc/150?img=12",

    roomNumber: "101",
    bedNumber: "A",

    occupation: "Student",
    college: "GL Bajaj Institute",
    company: "",

    joiningDate: "2026-01-10",
    status: "active",

    address: "Lucknow, Uttar Pradesh",

    emergencyContact: {
      name: "Rajesh Sharma",
      relation: "Father",
      phone: "9876501001",
    },

    documents: {
      aadhaar: "XXXX XXXX 1201",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 13000,
      securityDeposit: 13000,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 2,
    name: "Rohan Verma",
    age: 22,
    gender: "Male",
    phone: "9812345678",
    email: "rohan.verma@example.com",

    avatar: "https://i.pravatar.cc/150?img=13",

    roomNumber: "102",
    bedNumber: "A",

    occupation: "Student",
    college: "Galgotias University",
    company: "",

    joiningDate: "2026-01-15",
    status: "active",

    address: "Kanpur, Uttar Pradesh",

    emergencyContact: {
      name: "Suresh Verma",
      relation: "Father",
      phone: "9876501002",
    },

    documents: {
      aadhaar: "XXXX XXXX 1202",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 9000,
      securityDeposit: 9000,
      lastPayment: "2026-08-03",
      paymentStatus: "Paid",
    },
  },

  {
    id: 3,
    name: "Aditya Singh",
    age: 20,
    gender: "Male",
    phone: "9898989898",
    email: "aditya.singh@example.com",

    avatar: "https://i.pravatar.cc/150?img=14",

    roomNumber: "102",
    bedNumber: "B",

    occupation: "Student",
    college: "Sharda University",
    company: "",

    joiningDate: "2026-02-01",
    status: "active",

    address: "Agra, Uttar Pradesh",

    emergencyContact: {
      name: "Vijay Singh",
      relation: "Father",
      phone: "9876501003",
    },

    documents: {
      aadhaar: "XXXX XXXX 1203",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 9000,
      securityDeposit: 9000,
      lastPayment: "2026-08-04",
      paymentStatus: "Paid",
    },
  },

  {
    id: 4,
    name: "Kunal Yadav",
    age: 23,
    gender: "Male",
    phone: "9765432109",
    email: "kunal.yadav@example.com",

    avatar: "https://i.pravatar.cc/150?img=15",

    roomNumber: "103",
    bedNumber: "A",

    occupation: "Working Professional",
    college: "JSS Academy",
    company: "TCS",

    joiningDate: "2026-02-05",
    status: "active",

    address: "Lucknow, Uttar Pradesh",

    emergencyContact: {
      name: "Rajesh Yadav",
      relation: "Father",
      phone: "9876501004",
    },

    documents: {
      aadhaar: "XXXX XXXX 1204",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 11000,
      securityDeposit: 11000,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 5,
    name: "Vivek Mishra",
    age: 21,
    gender: "Male",
    phone: "9123456789",
    email: "vivek.mishra@example.com",

    avatar: "https://i.pravatar.cc/150?img=16",

    roomNumber: "104",
    bedNumber: "A",

    occupation: "Student",
    college: "NIET",
    company: "",

    joiningDate: "2026-01-20",
    status: "active",

    address: "Varanasi, Uttar Pradesh",

    emergencyContact: {
      name: "Ramesh Mishra",
      relation: "Father",
      phone: "9876501005",
    },

    documents: {
      aadhaar: "XXXX XXXX 1205",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 7500,
      securityDeposit: 7500,
      lastPayment: "2026-08-02",
      paymentStatus: "Paid",
    },
  },

  {
    id: 6,
    name: "Harsh Gupta",
    age: 22,
    gender: "Male",
    phone: "9345678123",
    email: "harsh.gupta@example.com",

    avatar: "https://i.pravatar.cc/150?img=17",

    roomNumber: "104",
    bedNumber: "B",

    occupation: "Student",
    college: "GL Bajaj Institute",
    company: "",

    joiningDate: "2026-01-22",
    status: "active",

    address: "Meerut, Uttar Pradesh",

    emergencyContact: {
      name: "Anil Gupta",
      relation: "Father",
      phone: "9876501006",
    },

    documents: {
      aadhaar: "XXXX XXXX 1206",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 7500,
      securityDeposit: 7500,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 7,
    name: "Ankit Raj",
    age: 21,
    gender: "Male",
    phone: "9456781234",
    email: "ankit.raj@example.com",

    avatar: "https://i.pravatar.cc/150?img=18",

    roomNumber: "104",
    bedNumber: "C",

    occupation: "Student",
    college: "IIMT University",
    company: "",

    joiningDate: "2026-02-12",
    status: "active",

    address: "Patna, Bihar",

    emergencyContact: {
      name: "Sanjay Raj",
      relation: "Father",
      phone: "9876501007",
    },

    documents: {
      aadhaar: "XXXX XXXX 1207",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 7500,
      securityDeposit: 7500,
      lastPayment: "2026-08-01",
      paymentStatus: "Paid",
    },
  },

  {
    id: 8,
    name: "Mohit Kumar",
    age: 24,
    gender: "Male",
    phone: "9567891234",
    email: "mohit.kumar@example.com",

    avatar: "https://i.pravatar.cc/150?img=19",

    roomNumber: "107",
    bedNumber: "A",

    occupation: "Working Professional",
    college: "",
    company: "TCS",

    joiningDate: "2026-01-05",
    status: "active",

    address: "Delhi",

    emergencyContact: {
      name: "Rakesh Kumar",
      relation: "Brother",
      phone: "9876501008",
    },

    documents: {
      aadhaar: "XXXX XXXX 1208",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 9000,
      securityDeposit: 9000,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 9,
    name: "Sahil Agarwal",
    age: 23,
    gender: "Male",
    phone: "9678123456",
    email: "sahil.agarwal@example.com",

    avatar: "https://i.pravatar.cc/150?img=20",

    roomNumber: "107",
    bedNumber: "B",

    occupation: "Student",
    college: "NIU",
    company: "",

    joiningDate: "2026-02-18",
    status: "active",

    address: "Jaipur, Rajasthan",

    emergencyContact: {
      name: "Amit Agarwal",
      relation: "Father",
      phone: "9876501009",
    },

    documents: {
      aadhaar: "XXXX XXXX 1209",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 9000,
      securityDeposit: 9000,
      lastPayment: "2026-08-04",
      paymentStatus: "Paid",
    },
  },

  {
    id: 10,
    name: "Devansh Jain",
    age: 22,
    gender: "Male",
    phone: "9781234567",
    email: "devansh.jain@example.com",

    avatar: "https://i.pravatar.cc/150?img=21",

    roomNumber: "108",
    bedNumber: "A",

    occupation: "Student",
    college: "Bennett University",
    company: "",

    joiningDate: "2026-01-28",
    status: "active",

    address: "Noida, Uttar Pradesh",

    emergencyContact: {
      name: "Manoj Jain",
      relation: "Father",
      phone: "9876501010",
    },

    documents: {
      aadhaar: "XXXX XXXX 1210",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 9000,
      securityDeposit: 9000,
      lastPayment: "2026-08-03",
      paymentStatus: "Paid",
    },
  },

  {
    id: 11,
    name: "Yash Tiwari",
    age: 21,
    gender: "Male",
    phone: "9891234567",
    email: "yash.tiwari@example.com",

    avatar: "https://i.pravatar.cc/150?img=22",

    roomNumber: "108",
    bedNumber: "B",

    occupation: "Student",
    college: "Amity University",
    company: "",

    joiningDate: "2026-02-02",
    status: "active",

    address: "Gorakhpur, Uttar Pradesh",

    emergencyContact: {
      name: "Rajiv Tiwari",
      relation: "Father",
      phone: "9876501011",
    },

    documents: {
      aadhaar: "XXXX XXXX 1211",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 9000,
      securityDeposit: 9000,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 12,
    name: "Abhishek Pandey",
    age: 25,
    gender: "Male",
    phone: "9012345678",
    email: "abhishek.pandey@example.com",

    avatar: "https://i.pravatar.cc/150?img=23",

    roomNumber: "201",
    bedNumber: "A",

    occupation: "Working Professional",
    college: "",
    company: "Infosys",

    joiningDate: "2026-01-08",
    status: "active",

    address: "Prayagraj, Uttar Pradesh",

    emergencyContact: {
      name: "Dinesh Pandey",
      relation: "Father",
      phone: "9876501012",
    },

    documents: {
      aadhaar: "XXXX XXXX 1212",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 13500,
      securityDeposit: 13500,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 13,
    name: "Nikhil Saini",
    age: 22,
    gender: "Male",
    phone: "9123987654",
    email: "nikhil.saini@example.com",

    avatar: "https://i.pravatar.cc/150?img=24",

    roomNumber: "202",
    bedNumber: "A",

    occupation: "Student",
    college: "Galgotias University",
    company: "",

    joiningDate: "2026-02-10",
    status: "active",

    address: "Aligarh, Uttar Pradesh",

    emergencyContact: {
      name: "Mahesh Saini",
      relation: "Father",
      phone: "9876501013",
    },

    documents: {
      aadhaar: "XXXX XXXX 1213",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 9500,
      securityDeposit: 9500,
      lastPayment: "2026-08-04",
      paymentStatus: "Paid",
    },
  },

  {
    id: 14,
    name: "Ayush Srivastava",
    age: 21,
    gender: "Male",
    phone: "9234567890",
    email: "ayush.srivastava@example.com",

    avatar: "https://i.pravatar.cc/150?img=25",

    roomNumber: "203",
    bedNumber: "A",

    occupation: "Student",
    college: "Sharda University",
    company: "",

    joiningDate: "2026-01-17",
    status: "active",

    address: "Lucknow, Uttar Pradesh",

    emergencyContact: {
      name: "Ashok Srivastava",
      relation: "Father",
      phone: "9876501014",
    },

    documents: {
      aadhaar: "XXXX XXXX 1214",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 11000,
      securityDeposit: 11000,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 15,
    name: "Manish Chauhan",
    age: 23,
    gender: "Male",
    phone: "9345678901",
    email: "manish.chauhan@example.com",

    avatar: "https://i.pravatar.cc/150?img=26",

    roomNumber: "203",
    bedNumber: "B",

    occupation: "Working Professional",
    college: "",
    company: "Accenture",

    joiningDate: "2026-02-14",
    status: "active",

    address: "Ghaziabad, Uttar Pradesh",

    emergencyContact: {
      name: "Raj Chauhan",
      relation: "Father",
      phone: "9876501015",
    },

    documents: {
      aadhaar: "XXXX XXXX 1215",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 11000,
      securityDeposit: 11000,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 16,
    name: "Ritik Sharma",
    age: 20,
    gender: "Male",
    phone: "9456789012",
    email: "ritik.sharma@example.com",

    avatar: "https://i.pravatar.cc/150?img=27",

    roomNumber: "204",
    bedNumber: "A",

    occupation: "Student",
    college: "GL Bajaj Institute",
    company: "",

    joiningDate: "2026-01-25",
    status: "active",

    address: "Bareilly, Uttar Pradesh",

    emergencyContact: {
      name: "Pankaj Sharma",
      relation: "Father",
      phone: "9876501016",
    },

    documents: {
      aadhaar: "XXXX XXXX 1216",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 8000,
      securityDeposit: 8000,
      lastPayment: "2026-08-03",
      paymentStatus: "Paid",
    },
  },

  {
    id: 17,
    name: "Shubham Verma",
    age: 21,
    gender: "Male",
    phone: "9567890123",
    email: "shubham.verma@example.com",

    avatar: "https://i.pravatar.cc/150?img=28",

    roomNumber: "204",
    bedNumber: "B",

    occupation: "Student",
    college: "JSS Academy",
    company: "",

    joiningDate: "2026-02-20",
    status: "active",

    address: "Moradabad, Uttar Pradesh",

    emergencyContact: {
      name: "Vivek Verma",
      relation: "Father",
      phone: "9876501017",
    },

    documents: {
      aadhaar: "XXXX XXXX 1217",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 8000,
      securityDeposit: 8000,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 18,
    name: "Pranav Kapoor",
    age: 22,
    gender: "Male",
    phone: "9678901234",
    email: "pranav.kapoor@example.com",

    avatar: "https://i.pravatar.cc/150?img=29",

    roomNumber: "204",
    bedNumber: "C",

    occupation: "Student",
    college: "Bennett University",
    company: "",

    joiningDate: "2026-02-22",
    status: "active",

    address: "Chandigarh",

    emergencyContact: {
      name: "Rohit Kapoor",
      relation: "Brother",
      phone: "9876501018",
    },

    documents: {
      aadhaar: "XXXX XXXX 1218",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 8000,
      securityDeposit: 8000,
      lastPayment: "2026-08-04",
      paymentStatus: "Paid",
    },
  },

  {
    id: 19,
    name: "Arjun Mehta",
    age: 24,
    gender: "Male",
    phone: "9789012345",
    email: "arjun.mehta@example.com",

    avatar: "https://i.pravatar.cc/150?img=30",

    roomNumber: "206",
    bedNumber: "A",

    occupation: "Working Professional",
    college: "",
    company: "Wipro",

    joiningDate: "2026-01-12",
    status: "active",

    address: "Delhi",

    emergencyContact: {
      name: "Sanjay Mehta",
      relation: "Father",
      phone: "9876501019",
    },

    documents: {
      aadhaar: "XXXX XXXX 1219",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 11000,
      securityDeposit: 11000,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 20,
    name: "Rahul Bansal",
    age: 25,
    gender: "Male",
    phone: "9890123456",
    email: "rahul.bansal@example.com",

    avatar: "https://i.pravatar.cc/150?img=31",

    roomNumber: "206",
    bedNumber: "B",

    occupation: "Working Professional",
    college: "",
    company: "HCL",

    joiningDate: "2026-01-30",
    status: "active",

    address: "Faridabad, Haryana",

    emergencyContact: {
      name: "Sunil Bansal",
      relation: "Father",
      phone: "9876501020",
    },

    documents: {
      aadhaar: "XXXX XXXX 1220",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 11000,
      securityDeposit: 11000,
      lastPayment: "2026-08-03",
      paymentStatus: "Paid",
    },
  },

  {
    id: 21,
    name: "Aman Singh",
    age: 21,
    gender: "Male",
    phone: "9001234567",
    email: "aman.singh@example.com",

    avatar: "https://i.pravatar.cc/150?img=32",

    roomNumber: "207",
    bedNumber: "A",

    occupation: "Student",
    college: "Lloyd Institute",
    company: "",

    joiningDate: "2026-02-25",
    status: "active",

    address: "Ayodhya, Uttar Pradesh",

    emergencyContact: {
      name: "Ravi Singh",
      relation: "Father",
      phone: "9876501021",
    },

    documents: {
      aadhaar: "XXXX XXXX 1221",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 9000,
      securityDeposit: 9000,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 22,
    name: "Rajeev Malhotra",
    age: 26,
    gender: "Male",
    phone: "9112345678",
    email: "rajeev.malhotra@example.com",

    avatar: "https://i.pravatar.cc/150?img=33",

    roomNumber: "301",
    bedNumber: "A",

    occupation: "Working Professional",
    college: "",
    company: "Tech Mahindra",

    joiningDate: "2026-01-03",
    status: "active",

    address: "Delhi",

    emergencyContact: {
      name: "Amit Malhotra",
      relation: "Brother",
      phone: "9876501022",
    },

    documents: {
      aadhaar: "XXXX XXXX 1222",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 14000,
      securityDeposit: 14000,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },

  {
    id: 23,
    name: "Kartik Arora",
    age: 22,
    gender: "Male",
    phone: "9223456789",
    email: "kartik.arora@example.com",

    avatar: "https://i.pravatar.cc/150?img=34",

    roomNumber: "302",
    bedNumber: "A",

    occupation: "Student",
    college: "Amity University",
    company: "",

    joiningDate: "2026-02-06",
    status: "active",

    address: "Noida, Uttar Pradesh",

    emergencyContact: {
      name: "Vikas Arora",
      relation: "Father",
      phone: "9876501023",
    },

    documents: {
      aadhaar: "XXXX XXXX 1223",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 11500,
      securityDeposit: 11500,
      lastPayment: "2026-08-04",
      paymentStatus: "Paid",
    },
  },

  {
    id: 24,
    name: "Varun Joshi",
    age: 23,
    gender: "Male",
    phone: "9334567890",
    email: "varun.joshi@example.com",

    avatar: "https://i.pravatar.cc/150?img=35",

    roomNumber: "302",
    bedNumber: "B",

    occupation: "Student",
    college: "Galgotias University",
    company: "",

    joiningDate: "2026-02-08",
    status: "active",

    address: "Dehradun, Uttarakhand",

    emergencyContact: {
      name: "Rakesh Joshi",
      relation: "Father",
      phone: "9876501024",
    },

    documents: {
      aadhaar: "XXXX XXXX 1224",
      idProof: "Verified",
    },

    payment: {
      monthlyRent: 11500,
      securityDeposit: 11500,
      lastPayment: "2026-08-05",
      paymentStatus: "Paid",
    },
  },
];

export default tenantData;