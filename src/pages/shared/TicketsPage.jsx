import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTicket,
  addTicketMessage,
  updateTicketStatus,
} from "../../features/tickets/ticketSlice";
import { addNotification } from "../../features/notifications/notificationSlice";

const categories = ["Payment", "Room", "Food", "Laundry", "Visitor", "Other"];
const statuses = ["Open", "In Progress", "Resolved", "Closed"];

export default function TicketsPage({ role }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.loggedInUser);
  const tickets = useSelector((state) => state.ticket?.tickets ?? []);

  const visibleTickets = useMemo(() => {
    if (role === "admin") {
      return tickets;
    }

    return tickets.filter((ticket) => ticket.tenantId === user?.id);
  }, [role, tickets, user?.id]);

  const [selectedId, setSelectedId] = useState(visibleTickets[0]?.id ?? null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    subject: "",
    category: "Room",
    message: "",
  });

  const selectedTicket =
    visibleTickets.find((ticket) => ticket.id === selectedId) ??
    visibleTickets[0] ??
    null;

  const handleFormChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const createTicket = (event) => {
    event.preventDefault();

    const ticket = {
      id: Date.now(),
      tenantId: user?.id,
      tenantName: user?.name ?? "Resident",
      subject: formData.subject,
      category: formData.category,
      messages: [
        {
          id: Date.now(),
          sender: "resident",
          text: formData.message,
          createdAt: new Date().toLocaleString("en-IN"),
        },
      ],
    };

    dispatch(addTicket(ticket));
    dispatch(
      addNotification({
        audience: "admin",
        title: "New ticket",
        message: `${ticket.tenantName} opened ${ticket.subject}.`,
        type: "ticket",
      }),
    );
    setSelectedId(ticket.id);
    setFormData({ subject: "", category: "Room", message: "" });
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (!selectedTicket || !message.trim()) {
      return;
    }

    const sender = role === "admin" ? "admin" : "resident";
    dispatch(
      addTicketMessage({
        ticketId: selectedTicket.id,
        sender,
        text: message.trim(),
      }),
    );

    dispatch(
      addNotification({
        audience: role === "admin" ? "resident" : "admin",
        userId: selectedTicket.tenantId,
        title: "Ticket updated",
        message: `${selectedTicket.subject} has a new reply.`,
        type: "ticket",
      }),
    );
    setMessage("");
  };

  const changeStatus = (event) => {
    dispatch(
      updateTicketStatus({
        id: selectedTicket.id,
        status: event.target.value,
      }),
    );
  };

  return (
    <div className="ticket-page">
      <div className="ticket-header">
        <div>
          <h1>Tickets</h1>
          <p>
            {role === "admin"
              ? "Reply to resident tickets"
              : "Talk with admin about your requests"}
          </p>
        </div>
        <span>{visibleTickets.length} tickets</span>
      </div>

      {role !== "admin" && (
        <form className="ticket-create" onSubmit={createTicket}>
          <h2>Create Ticket</h2>
          <div className="ticket-form-grid">
            <label>
              Subject
              <input
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                placeholder="Short title"
                required
              />
            </label>
            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Message
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleFormChange}
              placeholder="Write what you need help with"
              required
            />
          </label>
          <button type="submit">Open Ticket</button>
        </form>
      )}

      <div className="ticket-workspace">
        <aside className="ticket-list-panel">
          {visibleTickets.length === 0 ? (
            <div className="ticket-empty">No tickets yet.</div>
          ) : (
            visibleTickets.map((ticket) => (
              <button
                type="button"
                key={ticket.id}
                className={
                  selectedTicket?.id === ticket.id
                    ? "ticket-list-item active"
                    : "ticket-list-item"
                }
                onClick={() => setSelectedId(ticket.id)}
              >
                <strong>{ticket.subject}</strong>
                <span>{ticket.tenantName}</span>
                <small>{ticket.status}</small>
              </button>
            ))
          )}
        </aside>

        <section className="ticket-thread">
          {!selectedTicket ? (
            <div className="ticket-empty">Select a ticket to start.</div>
          ) : (
            <>
              <div className="ticket-thread-header">
                <div>
                  <h2>{selectedTicket.subject}</h2>
                  <p>
                    {selectedTicket.category} · {selectedTicket.tenantName}
                  </p>
                </div>

                {role === "admin" ? (
                  <select value={selectedTicket.status} onChange={changeStatus}>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="ticket-status">{selectedTicket.status}</span>
                )}
              </div>

              <div className="ticket-messages">
                {selectedTicket.messages.map((item) => (
                  <div
                    className={
                      item.sender === "admin"
                        ? "ticket-message admin"
                        : "ticket-message resident"
                    }
                    key={item.id}
                  >
                    <strong>{item.sender === "admin" ? "Admin" : "Resident"}</strong>
                    <p>{item.text}</p>
                    <span>{item.createdAt}</span>
                  </div>
                ))}
              </div>

              <form className="ticket-reply" onSubmit={sendMessage}>
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write a reply"
                />
                <button type="submit">Send</button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
