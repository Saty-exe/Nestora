export default function RoomDashboard({ rooms }) {
  const totalRooms = rooms.length;

  const occupiedRooms = rooms.filter((room) => room.status === "occupied");

  const maintenanceRooms = rooms.filter(
    (room) => room.status === "maintenance",
  );

  const totalBeds = rooms.reduce((total, room) => total + room.capacity, 0);

  const occupiedBeds = rooms.reduce(
    (total, room) => total + room.occupiedBeds,
    0,
  );

  const reservedBeds = rooms.reduce(
    (total, room) => total + (room.reservedBeds || 0),
    0,
  );

  const availableBeds = totalBeds - occupiedBeds - reservedBeds;

  const occupancyRate =
    totalBeds === 0 ? 0 : ((occupiedBeds / totalBeds) * 100).toFixed(1);

  const acRooms = rooms.filter((room) => room.acType === "AC");

  const coolerRooms = rooms.filter((room) => room.acType === "Cooler");

  const monthlyRevenue = rooms.reduce(
    (total, room) => total + room.rent * room.occupiedBeds,
    0,
  );

  return (
    <div className="room-dashboard">
      <div className="room-stat">
        <span>Total Rooms</span>
        <h3>{totalRooms}</h3>
      </div>

      <div className="room-stat">
        <span>Occupied Rooms</span>
        <h3>{occupiedRooms.length}</h3>
      </div>

      <div className="room-stat">
        <span>Maintenance</span>
        <h3>{maintenanceRooms.length}</h3>
      </div>

      <div className="room-stat">
        <span>Total Beds</span>
        <h3>{totalBeds}</h3>
      </div>

      <div className="room-stat">
        <span>Occupied Beds</span>
        <h3>{occupiedBeds}</h3>
      </div>

      <div className="room-stat">
        <span>Reserved Beds</span>
        <h3>{reservedBeds}</h3>
      </div>

      <div className="room-stat">
        <span>Available Beds</span>
        <h3>{availableBeds}</h3>
      </div>

      <div className="room-stat">
        <span>Occupancy Rate</span>
        <h3>{occupancyRate}%</h3>
      </div>

      <div className="room-stat">
        <span>AC Rooms</span>
        <h3>{acRooms.length}</h3>
      </div>

      <div className="room-stat">
        <span>Cooler Rooms</span>
        <h3>{coolerRooms.length}</h3>
      </div>

      <div className="room-stat">
        <span>Monthly Revenue</span>
        <h3>₹{monthlyRevenue.toLocaleString()}</h3>
      </div>
    </div>
  );
}
