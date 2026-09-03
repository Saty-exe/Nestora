import { useState } from "react";
import RoomDashboard from "../../components/admin/roomDashboard";
import roomData from "../../data/roomData";

export default function Rooms() {
  const [roomNumber, setRoomNumber] = useState("");
  const [occupancy, setOccupancy] = useState("all");
  const [floor, setFloor] = useState("all");
  const [roomType, setRoomType] = useState("all");
  const [cooling, setCooling] = useState("all");
  const [sort, setSort] = useState("room");

  const filteredRooms = [...roomData]
    .filter((room) => {
      const searchByRoom = room.roomNumber
        .toLowerCase()
        .includes(roomNumber.toLowerCase());

      const searchByOccupancy =
        occupancy === "all"
          ? true
          : occupancy === "available"
            ? room.status === "available"
            : occupancy === "reserved"
              ? room.status === "reserved"
              : occupancy === "occupied"
                ? room.status === "occupied"
                : occupancy === "maintenance"
                  ? room.status === "maintenance"
                  : true;

      const searchByFloor =
        floor === "all" ? true : room.floor === Number(floor);

      const searchByType = roomType === "all" ? true : room.type === roomType;

      const searchByCooling =
        cooling === "all" ? true : room.acType === cooling;

      return (
        searchByRoom &&
        searchByOccupancy &&
        searchByFloor &&
        searchByType &&
        searchByCooling
      );
    })
    .sort((a, b) => {
      if (sort === "rent-low") {
        return a.rent - b.rent;
      }

      if (sort === "rent-high") {
        return b.rent - a.rent;
      }

      return Number(a.roomNumber) - Number(b.roomNumber);
    });

  return (
    <div className="rooms-page">
      {/* Dashboard */}

      <div className="rooms-dashboard">
        <RoomDashboard rooms={roomData} />
      </div>

      {/* Filters */}

      <div className="rooms-filter-section">
        <div className="rooms-filter-header">
          <div>
            <h2>Room Management</h2>
            <p>Search and filter available rooms</p>
          </div>

          <span className="rooms-count">{filteredRooms.length} rooms</span>
        </div>

        <div className="rooms-filters">
          {/* Search */}

          <div className="room-filter-group">
            <label htmlFor="roomSearch">Search Room</label>

            <input
              id="roomSearch"
              type="text"
              placeholder="Room number..."
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>

          {/* Floor */}

          <div className="room-filter-group">
            <label htmlFor="roomFloor">Floor</label>

            <select
              id="roomFloor"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            >
              <option value="all">All Floors</option>

              <option value="1">Floor 1</option>

              <option value="2">Floor 2</option>

              <option value="3">Floor 3</option>
            </select>
          </div>

          {/* Room Type */}

          <div className="room-filter-group">
            <label htmlFor="roomType">Room Type</label>

            <select
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="all">All Types</option>

              <option value="Single">Single</option>

              <option value="Double">Double</option>

              <option value="Triple">Triple</option>
            </select>
          </div>

          {/* Cooling */}

          <div className="room-filter-group">
            <label htmlFor="roomCooling">Cooling</label>

            <select
              id="roomCooling"
              value={cooling}
              onChange={(e) => setCooling(e.target.value)}
            >
              <option value="all">All</option>

              <option value="AC">AC</option>

              <option value="Cooler">Cooler</option>
            </select>
          </div>

          {/* Status */}

          <div className="room-filter-group">
            <label htmlFor="roomStatus">Status</label>

            <select
              id="roomStatus"
              value={occupancy}
              onChange={(e) => setOccupancy(e.target.value)}
            >
              <option value="all">All Status</option>

              <option value="occupied">Occupied</option>

              <option value="reserved">Reserved</option>

              <option value="available">Available</option>

              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* Sort */}

          <div className="room-filter-group">
            <label htmlFor="roomSort">Sort By</label>

            <select
              id="roomSort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="room">Room Number</option>

              <option value="rent-low">Rent: Low to High</option>

              <option value="rent-high">Rent: High to Low</option>
            </select>
          </div>

          {/* Reset */}

          <button
            className="room-reset-btn"
            onClick={() => {
              setRoomNumber("");
              setFloor("all");
              setRoomType("all");
              setCooling("all");
              setOccupancy("all");
              setSort("room");
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Room Results */}

      <div className="rooms-result-section">
        <div className="rooms-result-header"></div>

        <div className="rooms-grid">
          {roomNumber ||
          occupancy !== "all" ||
          floor !== "all" ||
          roomType !== "all" ||
          cooling !== "all" ? (
            filteredRooms.map((room) => (
              <div className="room-card" key={room.id}>
                {/* Card Header */}

                <div className="room-card-header">
                  <div className="room-number">
                    <span>ROOM</span>
                    <h2>{room.roomNumber}</h2>
                  </div>

                  <span className={`room-status ${room.status}`}>
                    {room.status}
                  </span>
                </div>

                {/* Room Information */}

                <div className="room-info">
                  <div className="room-info-item">
                    <span>Floor</span>
                    <strong>{room.floor}</strong>
                  </div>

                  <div className="room-info-item">
                    <span>Type</span>
                    <strong>{room.type}</strong>
                  </div>

                  <div className="room-info-item">
                    <span>Cooling</span>
                    <strong>{room.acType}</strong>
                  </div>

                  <div className="room-info-item">
                    <span>Rent / Bed</span>
                    <strong>₹{room.rent.toLocaleString()}</strong>
                  </div>
                </div>

                {/* Bed Information */}

                <div className="room-bed-info">
                  <div className="room-bed-item">
                    <span>Occupied</span>
                    <strong>{room.occupiedBeds}</strong>
                  </div>

                  <div className="room-bed-item">
                    <span>Reserved</span>
                    <strong>{room.reservedBeds}</strong>
                  </div>

                  <div className="room-bed-item">
                    <span>Capacity</span>
                    <strong>{room.capacity}</strong>
                  </div>
                </div>

                {/* Card Footer */}

                <div className="room-card-footer">
                  <span>
                    {room.capacity - room.occupiedBeds - room.reservedBeds}{" "}
                    available beds
                  </span>

                  <button className="room-details-btn">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
