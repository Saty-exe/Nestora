import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [
    {
      id: 1,
      tenantId: 1,
      tenantName: "Aarav Sharma",
      subject: "Need help with Wi-Fi",
      category: "Wi-Fi",
      status: "Open",
      priority: "Medium",
      createdAt: "2026-09-02 10:30",
      messages: [
        {
          id: 1,
          sender: "resident",
          text: "The Wi-Fi speed is low in my room.",
          createdAt: "2026-09-02 10:30",
        },
        {
          id: 2,
          sender: "admin",
          text: "Thanks, we will check the router near your floor.",
          createdAt: "2026-09-02 10:45",
        },
      ],
    },
  ],
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    addTicket(state, action) {
      state.tickets.unshift({
        id: action.payload.id ?? Date.now(),
        status: "Open",
        priority: "Medium",
        createdAt: new Date().toLocaleString("en-IN"),
        messages: [],
        ...action.payload,
      });
    },

    addTicketMessage(state, action) {
      const ticket = state.tickets.find(
        (item) => item.id === action.payload.ticketId,
      );

      if (!ticket) {
        return;
      }

      ticket.messages.push({
        id: Date.now(),
        sender: action.payload.sender,
        text: action.payload.text,
        createdAt: new Date().toLocaleString("en-IN"),
      });
    },

    updateTicketStatus(state, action) {
      const ticket = state.tickets.find((item) => item.id === action.payload.id);

      if (ticket) {
        ticket.status = action.payload.status;
      }
    },
  },
});

export const {
  addTicket,
  addTicketMessage,
  updateTicketStatus,
} = ticketSlice.actions;

export default ticketSlice.reducer;
